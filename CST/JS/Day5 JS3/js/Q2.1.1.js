var win;
var step = 20;
var timer;
function openWindow() {
    win = open('', '', "width=300,height=150")
    timer = setInterval(moveWindow, 100)
}

function moveWindow() {
    if (!win || win.closed) { //opened or 
        return;
    }

    var y = win.screenY + step;
    // console.log(win.screenY)
    const maxY = screen.availHeight - win.outerHeight;
    win.focus()
    if (y >= maxY || y < 0) {
        step = -step;
    }
    win.moveBy(step, step)
}

function stop() {
    clearInterval(timer)
}