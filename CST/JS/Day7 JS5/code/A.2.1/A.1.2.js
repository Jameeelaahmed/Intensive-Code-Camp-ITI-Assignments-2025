// Form submission handler
const formm = document.getElementsByTagName('form')[0];
formm.addEventListener('submit', function (e) {
    if (!confirm('Do you want to confirm?')) {
        e.preventDefault();
    }
});

let timeoutId;

function resetTimer() {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        const event = new CustomEvent('custEvent', {
            detail: {
                message: "30 seconds of inactivity detected!",
            }
        });
        document.dispatchEvent(event);
    }, 3000);
}

document.addEventListener('input', resetTimer);
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);

resetTimer();

document.addEventListener('custEvent', function (e) {
    alert(`${e.detail.message}\n`);
});