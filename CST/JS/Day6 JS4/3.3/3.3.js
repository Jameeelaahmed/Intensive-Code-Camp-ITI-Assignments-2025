const arr = [
    "../assets/TaskResources/TaskResources/memory Game/1.gif",
    "../assets/TaskResources/TaskResources/memory Game/2.gif",
    "../assets/TaskResources/TaskResources/memory Game/3.gif",
    "../assets/TaskResources/TaskResources/memory Game/4.gif",
    "../assets/TaskResources/TaskResources/memory Game/5.gif",
    "../assets/TaskResources/TaskResources/memory Game/6.gif",
];
+
    let defImgs = document.getElementsByClassName("img");


function initializeGame() {
    const assignedImgs = [];
    for (let i = 0; i < defImgs.length / 2; i++) {
        const idx1 = Math.floor(Math.random() * defImgs.length);
        const idx2 = Math.floor(Math.random() * defImgs.length);
        if (idx1 === idx2 || assignedImgs.includes(idx1) || assignedImgs.includes(idx2)) {
            i--;
        } else {
            assignedImgs.push(idx1, idx2);
            defImgs[idx1].src = arr[i];
            defImgs[idx2].src = arr[i];
        }
    }

    for (let div of memoryGameDivs) {
        div.children[0].style.display = "block";
        div.children[1].style.display = "none";
    }
}

window.onload = initializeGame;


const memoryGameDivs = document.getElementsByClassName("memoryGame");
let firstClick = null;
let secondClick = null;
let isComparing = false;

for (let i = 0; i < memoryGameDivs.length; i++) {
    memoryGameDivs[i].onclick = function () {
        if (isComparing || this === firstClick) return;

        this.children[0].style.display = "none";
        this.ch + ildren[1].style.display = "block";

        if (!firstClick) {
            firstClick = this;
        } else {
            secondClick = this;
            isComparing = true;

            const firstSrc = firstClick.children[1].getAttribute("src");
            const secondSrc = secondClick.children[1].getAttribute("src");

            if (firstSrc === secondSrc) {
                firstClick = null;
                secondClick = null;
                isComparing = false;
            } else {

                setTimeout(() => {
                    firstClick.children[0].style.display = "block";
                    firstClick.children[1].style.display = "none";

                    secondClick.children[0].style.display = "block";
                    secondClick.children[1].style.display = "none";

                    firstClick = null;
                    secondClick = null;
                    isComparing = false;
                }, 1000);
            }
        }
    };
}