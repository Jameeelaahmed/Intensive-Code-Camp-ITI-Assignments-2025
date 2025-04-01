var first = document.getElementsByClassName('first')[0];
var second = document.getElementsByClassName('second')[0];
var third = document.getElementsByClassName('third')[0];
var stopBtn = document.getElementById('stopBtn');

first.style.left = "0px";
second.style.top = '0px';
third.style.left = 660 + "px";

let isAnimating = true;
let animationInterval = setInterval(animateElements, 80);
let firstpos = document.getElementById('firstPos')
let secondpos = document.getElementById('secondPos')
let thirdpos = document.getElementById('thirdPos')
function animateElements() {
    // First element animation
    var currentFirstLeft = parseInt(first.style.left);
    currentFirstLeft += 10;
    first.style.left = currentFirstLeft + 'px';
    firstpos.innerHTML = currentFirstLeft + 'px';
    if (currentFirstLeft > 660) {
        first.style.left = -first.offsetWidth + 'px';
    }

    // Second element animation
    var currentSecondTop = parseInt(second.style.top);
    currentSecondTop += 10;

    second.style.top = currentSecondTop + 'px';
    secondpos.innerHTML = currentSecondTop + 'px';
    if (currentSecondTop > 460) {
        second.style.top = -second.offsetHeight + 'px';
    }

    // Get initial position PROPERLY
    let currentThirdLeft = parseInt(third.style.left);
    currentThirdLeft -= 10;
    third.style.left = currentThirdLeft + 'px';
    thirdpos.textContent = currentThirdLeft + 'px';

    if (currentThirdLeft + third.offsetWidth < 0) {
        currentThirdLeft = 660;
        third.style.left = '660px';
        thirdpos.textContent = '660px';
    }

}

stopBtn.addEventListener('click', function () {
    if (isAnimating) {
        clearInterval(animationInterval);
        stopBtn.textContent = 'Go';
    } else {
        animationInterval = setInterval(animateElements, 80);
        stopBtn.textContent = 'Stop';
    }
    isAnimating = !isAnimating;
});

document.getElementById('resetBtn').addEventListener('click', function () {
    first.style.left = "0px";
    second.style.top = "0px";
    third.style.left = 660 + "px";

    // if (!isAnimating) {
    //     stopBtn.click();
    // }
});