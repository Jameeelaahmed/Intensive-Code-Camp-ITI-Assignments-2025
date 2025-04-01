var imgs = document.getElementsByTagName('img');
let cnt = 0;
var move;

for (let i = 0; i < imgs.length; i++) {
    imgs[i].onmouseover = stop;
    imgs[i].onmouseout = start;
}

function start() {
    move = setInterval(function () {
        imgs[cnt].src = '../assets/TaskResources/TaskResources/marbels/marble1.jpg'
        if (cnt === imgs.length - 1) {
            cnt = 0;
        } else {
            cnt++;
        }
        imgs[cnt].src = '../assets/TaskResources/TaskResources/marbels/marble3.jpg'
    }, 500);
}

function stop() {
    clearInterval(move)
}

