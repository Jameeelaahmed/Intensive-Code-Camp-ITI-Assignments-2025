
const submitBtn = document.querySelector('input[type="submit"]');

submitBtn.addEventListener('click', function () {
    const checkedRadio = document.querySelector('input[name="type"]:checked');
    const message = document.getElementById('message').value;

    if (!checkedRadio) {
        alert("Please select a card design!");
        return;
    }

    if (!message.trim()) {
        alert("Please enter a personal message!");
        return;
    }

    const selectedImg = checkedRadio.parentElement.querySelector('img');
    const imgSrc = selectedImg.src;


    generateCard(imgSrc, message);
});

var win;

function generateCard(imageSrc, message) {
    console.log("Generating card with:", imageSrc, message);
    win = open('demo.html', '', 'width=500px,height=800px')
    win.onload = function () {
        win.document.querySelector('.messageTitle').textContent = message;
        win.document.querySelector('.imgMessage').src = imageSrc;
        win.document.querySelector('.imgMessage').alt = "Get Well Soon Card";
        win.document.getElementById('close').onclick = function () {
            win.close();
        };
    };
}


var cardHolders = document.getElementsByClassName('cardHolder');
for (var i = 0; i < cardHolders.length; i++) {
    cardHolders[i].addEventListener('click', function () {
        for (var j = 0; j < cardHolders.length; j++) {
            cardHolders[j].style.border = 'none';
        }
        this.style.border = '5px solid rgb(0, 141, 141)';
    });
}