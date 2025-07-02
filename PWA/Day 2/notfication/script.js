Notification.requestPermission(status => {
    console.log('notfication permistion requested');
})

window.addEventListener('load', event => {
    navigator.serviceWorker.register('./sw.js')
})

document.getElementById('btn').addEventListener('click', event => {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration()
            .then(reg => {
                const option = {
                    body: 'any message',
                    actions: [
                        { action: 'explore', title: 'open page' },
                        { action: 'close', title: 'close' }
                    ]
                }
                reg.showNotification('Hellow world', option)
            })
    } else {
        alert('please allow notfications')
    }
})