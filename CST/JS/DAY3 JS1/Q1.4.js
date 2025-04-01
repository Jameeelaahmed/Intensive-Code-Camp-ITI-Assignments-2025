do {
    var x = prompt("Enter X");
} while (isNaN(x))
do {
    var y = prompt("Enter y");
} while (isNaN(x))
do {
    var z = prompt("Enter z");
} while (isNaN(x))

if (x % y === 0 && x % z !== 0) {
    console.log(x, "is divisible by", y, "only")
} else if (x % z === 0 && x % y !== 0) {
    console.log(x, "is divisible by", z, "only")
} else if (x % z === 0 && x % y === 0) {
    console.log(x, "is divisible by", y, "and", z)
} else if (x % z !== 0 && x % y !== 0) {
    console.log(x, "is not divisible by", y, "and", z)
} else if (y === 0 || z === 0) {
    console.log("X can't be divisible by 0")
}