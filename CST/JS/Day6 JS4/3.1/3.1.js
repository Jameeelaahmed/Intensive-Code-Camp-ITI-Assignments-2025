var imgArr = ['../assets/TaskResources/TaskResources/SlideShow/1.jpg', '../assets/TaskResources/TaskResources/SlideShow/2.jpg', '../assets/TaskResources/TaskResources/SlideShow/3.jpg', '../assets/TaskResources/TaskResources/SlideShow/4.jpg', '../assets/TaskResources/TaskResources/SlideShow/5.jpg', '../assets/TaskResources/TaskResources/SlideShow/6.jpg']
var img = document.getElementById('img')
img.src = imgArr[0];

var cnt = 1
function next() {
    if (cnt < 5) img.src = imgArr[cnt++];
    else return;
}

function previous() {
    if (cnt >= 0) img.src = imgArr[cnt--];
    else return;
}

var slider;
function startSlide() {
    slider = setInterval(function () {
        if (cnt < 5) img.src = imgArr[cnt++];
        else cnt = 0;
    }, 1000)
}

function stop() {
    clearInterval(slider)
}