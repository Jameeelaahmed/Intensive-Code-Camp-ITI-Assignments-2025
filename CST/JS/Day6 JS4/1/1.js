let win;

function openWin() {
    win = window.open('../demo.html', '', 'width=500px,height=200px');

    win.onload = function () {
        const text = "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"

        const outputElement = win.document.getElementById('output');

        startTyping(text, outputElement);
    };
}

function startTyping(text, outputElement) {
    let index = 0;

    const typeWriter = () => {
        outputElement.textContent = text.substring(0, index);
        index++;

        if (index > text.length) {
            clearInterval(typingInterval);
            win.close();
        }
    };

    const typingInterval = setInterval(typeWriter, 100);
}

// !!!!!!