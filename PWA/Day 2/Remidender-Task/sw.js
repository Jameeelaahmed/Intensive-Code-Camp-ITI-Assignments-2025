self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const action = event.action;
    const taskId = notification.tag;

    console.log('Notification clicked:', { action, taskId });

    if (action === 'Close') {
        console.log(`Marking task ${taskId} as complete`);
        notification.close();
    }
});