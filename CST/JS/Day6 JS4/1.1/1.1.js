let timer
function openWindow() {
    win = open('demo.html', '', "width=300px,height=150px")
    timer = setInterval(moveWindow, 100);
}

let step = 20;

function moveWindow() {
    if (!win || win.closed) {
        return;
    }
    var y = win.screenY + step;
    win.focus()
    if (y >= screen.availHeight - win.outerHeight || y < 0) {
        step = -step;
    }
    win.moveBy(0, step)
}

function stop() {
    clearInterval(timer)
}