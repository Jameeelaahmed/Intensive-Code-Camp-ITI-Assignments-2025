self.addEventListener('notificationclick', event => {
    const notification = event.notfication;
    console.log(notification);
    const action = event.action
    console.log(action);
    if (action == 'explore') {
        clients.openWindow('openPage.html')
    } else {
        notification.close()
    }
})