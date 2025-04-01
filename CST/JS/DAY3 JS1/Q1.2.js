var sum = 0
do {
    var y = Number(prompt("Enter number"));
    var isValidInput = isFinite(y);
    if (!isValidInput) {
        alert("Please enter a number.");
    } else {
        sum += y;
    }
} while (sum <= 100 && y !== 0)
console.log(sum)