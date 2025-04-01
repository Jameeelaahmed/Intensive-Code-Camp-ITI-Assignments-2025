
mul(1, 10)
function mul(x, y) {
    var sum = 0;
    for (var i = x; i <= y; i++) {
        if (i % 3 === 0) {
            console.log("Numbers divisile by 3: ", i);
        }
        if (i % 5 === 0) {
            console.log("Numbers divisible by 5: ", i)
        }
        if (i % 3 === 0 && i % 5 !== 0) {
            sum += i;
        } else if (i % 3 !== 0 && i % 5 === 0) {
            sum += i;
        } else if (i % 3 === 0 && i % 5 === 0) {
            sum += i;
        }
    }
    console.log(sum)
}