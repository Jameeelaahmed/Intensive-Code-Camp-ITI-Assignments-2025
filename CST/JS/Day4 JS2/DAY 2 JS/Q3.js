var arr = []
for (var i = 0; i < 4; i++) {
    var x = parseInt(prompt("Enter number"));
    arr.push(x);
}

console.log(arr)

var desc = arr.sort(function (a, b) { a - b });
var ascen = arr.sort(function (a, b) { b - a });
console.log(desc);
console.log(ascen);

document.write("You have entered the values of ", arr)
console.log("/n")
document.write("Your values after being sorting ascendingly ", arr)
document.write("Your values after being sorting descendengly ", arr)

