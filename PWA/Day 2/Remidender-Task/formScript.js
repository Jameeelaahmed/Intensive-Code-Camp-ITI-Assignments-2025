document.addEventListener('DOMContentLoaded', () => {
    // Don't request permission immediately, wait for user interaction
});

window.addEventListener('load', event => {
    navigator.serviceWorker.register('./sw.js')
})

function showTaskNotification(task) {
    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification(task);
            }
        });
    } else if (Notification.permission === 'granted') {
        showNotification(task);
    }
}

function showNotification(task) {
    navigator.serviceWorker.getRegistration()
        .then(reg => {
            const options = {
                body: `Reminder: ${task.title}`,
                tag: task.id,
                actions: [
                    { action: 'Close', title: 'Closw' },
                ]
            };
            reg.showNotification('Task Reminder', options);
        });
}

function scheduleNotification(task) {
    const now = new Date();
    const reminderTime = new Date(task.year, task.month - 1, task.day, task.hours, task.min);
    const timeDiff = reminderTime.getTime() - now.getTime();

    if (timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000) {
        if (activeTimeouts.has(task.id)) {
            clearTimeout(activeTimeouts.get(task.id));
        }

        const timeoutId = setTimeout(() => {
            checkTaskExistsAndNotify(task.id);
            activeTimeouts.delete(task.id);
        }, timeDiff);

        activeTimeouts.set(task.id, timeoutId);
        console.log(`Scheduled notification for task ${task.id} in ${Math.round(timeDiff / 1000)} seconds`);
    }
}

function checkTaskExistsAndNotify(taskId) {
    if (!dbPromise) {
        console.error('Database not initialized');
        return;
    }

    dbPromise.then(db => {
        const tx = db.transaction('tasks', 'readonly');
        const store = tx.objectStore('tasks');

        store.get(taskId).then(task => {
            if (task) {
                console.log(`Showing notification for existing task: ${task.title}`);
                showTaskNotification(task);
                markTaskAsNotified(task.id);
            } else {
                console.log(`Task ${taskId} was deleted, skipping notification`);
            }
        }).catch(err => {
            console.error('Error checking task existence:', err);
        });
    }).catch(err => {
        console.error('Database promise error:', err);
    });
}

function checkPendingNotifications() {
    if (!dbPromise) {
        console.error('Database not initialized for checking notifications');
        return;
    }

    dbPromise.then(db => {
        const tx = db.transaction('tasks', 'readonly');
        const store = tx.objectStore('tasks');

        store.getAll().then(tasks => {
            const now = new Date();

            tasks.forEach(task => {
                const reminderTime = new Date(task.year, task.month - 1, task.day, task.hours, task.min);

                if (reminderTime.getTime() > now.getTime()) {
                    console.log(`Scheduling notification for task: ${task.title} at ${reminderTime}`);
                    scheduleNotification(task);
                } else {
                    console.log(`Task "${task.title}" reminder time has already passed`);
                }
            });
        }).catch(err => {
            console.log('Error loading tasks:', err);
        });
    }).catch(err => {
        console.log('Error accessing database:', err);
    });
}

var dbPromise;
var activeTimeouts = new Map();

function initDb() {
    return new Promise((resolve, reject) => {
        const request = idb.open('Reminder', 1, db => {
            db.createObjectStore('tasks', { keyPath: 'id' })
        });

        dbPromise = request.then(db => {
            console.log('Database initialized successfully');
            loadAndDisplayTasks();
            checkPendingNotifications();
            resolve(db);
            return db;
        }).catch(err => {
            console.error('Database initialization error:', err);
            reject(err);
        });
    });
}

function addTaskToIdb(task) {
    if (!dbPromise) {
        console.error('Database not initialized');
        return;
    }

    dbPromise.then(db => {
        const tx = db.transaction('tasks', 'readwrite')
        const store = tx.objectStore('tasks')
        store.add(task).then(() => {
            scheduleNotification(task);
            console.log('Task added successfully to IndexedDB')
        }).catch(err => {
            console.log('Error adding task:', err);
            tx.abort()
        })
    }).catch(err => {
        console.error('Database promise error:', err);
    })
}

function loadAndDisplayTasks() {
    if (!dbPromise) {
        console.error('Database not initialized for loading tasks');
        return;
    }

    dbPromise.then(db => {
        const tx = db.transaction('tasks', 'readonly');
        const store = tx.objectStore('tasks');

        store.getAll().then(tasks => {
            const remindersContainer = document.getElementById("remindersContainer");

            const existingItems = remindersContainer.querySelectorAll('.reminder-item');
            existingItems.forEach(item => item.remove());

            tasks.forEach(task => {
                createReminderElement(task);
            });

            console.log(`Loaded and displayed ${tasks.length} tasks from IndexedDB`);
        }).catch(err => {
            console.log('Error loading tasks for display:', err);
        });
    }).catch(err => {
        console.log('Error accessing database for display:', err);
    });
}

function createReminderElement(task) {
    const reminderItem = document.createElement("div");
    reminderItem.className = "reminder-item";
    reminderItem.setAttribute("data-task-id", task.id);

    if (task.notified) {
        reminderItem.classList.add("notified");
    }

    reminderItem.innerHTML = `
        <div class="reminder-details">
            <div class="reminder-text">${task.title}</div>
            <div class="reminder-date">${task.month}/${task.day}/${task.year}</div>
        </div>
        <div class="reminder-actions">
            <div class="reminder-time">${task.hours}:${task.min}</div>
            <button class="delete-btn" onclick="deleteTask(${task.id})" title="Delete Task">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    const emptyState = document.querySelector(".empty-state");
    if (emptyState) {
        emptyState.remove();
    }

    document.getElementById("remindersContainer").prepend(reminderItem);
}

function deleteTask(taskId) {
    if (!dbPromise) {
        console.error('Database not initialized');
        return;
    }

    if (activeTimeouts.has(taskId)) {
        clearTimeout(activeTimeouts.get(taskId));
        activeTimeouts.delete(taskId);
        console.log(`Cancelled scheduled notification for task ${taskId}`);
    }

    dbPromise.then(db => {
        const tx = db.transaction('tasks', 'readwrite');
        const store = tx.objectStore('tasks');

        store.delete(taskId).then(() => {
            console.log(`Task ${taskId} deleted successfully from IndexedDB`);

            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            if (taskElement) {
                taskElement.remove();
            }

            checkEmptyState();

        }).catch(err => {
            console.error('Error deleting task:', err);
        });
    }).catch(err => {
        console.error('Database promise error:', err);
    });
}

function clearAllTasks() {
    if (!dbPromise) {
        console.error('Database not initialized');
        return;
    }

    if (confirm('Are you sure you want to delete all reminders?')) {
        activeTimeouts.forEach((timeoutId, taskId) => {
            clearTimeout(timeoutId);
            console.log(`Cancelled scheduled notification for task ${taskId}`);
        });
        activeTimeouts.clear();

        dbPromise.then(db => {
            const tx = db.transaction('tasks', 'readwrite');
            const store = tx.objectStore('tasks');

            store.clear().then(() => {
                console.log('All tasks cleared from IndexedDB');

                const taskElements = document.querySelectorAll('.reminder-item');
                taskElements.forEach(element => element.remove());

                showEmptyState();

            }).catch(err => {
                console.error('Error clearing tasks:', err);
            });
        }).catch(err => {
            console.error('Database promise error:', err);
        });
    }
}

function checkEmptyState() {
    const remindersContainer = document.getElementById("remindersContainer");
    const taskElements = remindersContainer.querySelectorAll('.reminder-item');

    if (taskElements.length === 0) {
        showEmptyState();
    }
}

function showEmptyState() {
    const remindersContainer = document.getElementById("remindersContainer");
    const existingEmptyState = remindersContainer.querySelector('.empty-state');

    if (!existingEmptyState) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-calendar-check"></i>
            <p>No reminders yet</p>
            <p>Add your first reminder to get started!</p>
        `;
        remindersContainer.appendChild(emptyState);
    }
}

function markTaskAsNotified(taskId) {
    if (!dbPromise) {
        console.error('Database not initialized');
        return;
    }

    dbPromise.then(db => {
        const tx = db.transaction('tasks', 'readwrite');
        const store = tx.objectStore('tasks');

        store.get(taskId).then(task => {
            if (task) {
                task.notified = true;

                store.put(task).then(() => {
                    console.log(`Task ${taskId} marked as notified in IndexedDB`);

                    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
                    if (taskElement) {
                        taskElement.classList.add("notified");
                    }

                }).catch(err => {
                    console.error('Error updating task notification status:', err);
                });
            }
        }).catch(err => {
            console.error('Error getting task for notification update:', err);
        });
    }).catch(err => {
        console.error('Database promise error:', err);
    });
}

initDb()

document.getElementById("clearAllBtn").addEventListener("click", clearAllTasks);

document.getElementById("reminderForm").addEventListener("submit", (e) => {
    e.preventDefault();


    var title = document.getElementById("title").value;
    var hours = document.getElementById("hours").value || "00";
    var min = document.getElementById("min").value || "00";
    var day = document.getElementById("day").value || "01";
    var month = document.getElementById("month").value || "01";
    var year = document.getElementById("year").value || "2023";

    hours = hours.padStart(2, "0");
    min = min.padStart(2, "0");

    const taskObject = {
        id: Date.now(),
        title: title,
        hours: hours,
        min: min,
        day: day,
        month: month,
        year: year,
        createdAt: new Date().toISOString(),
        notified: false // Track if notification has been shown
    };

    addTaskToIdb(taskObject);

    createReminderElement(taskObject);

    document.getElementById("reminderForm").reset();

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.value = "Added!";
    submitBtn.style.background =
        "linear-gradient(to right, #6ceb6c, #2ecc71)";

    setTimeout(() => {
        submitBtn.value = "Add reminder";
        submitBtn.style.background =
            "linear-gradient(to right, #FF7EB9, #7AF0FF)";
    }, 1500);
});