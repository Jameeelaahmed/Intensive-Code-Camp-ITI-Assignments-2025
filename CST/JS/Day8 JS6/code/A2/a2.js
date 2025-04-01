function add(a, b) {
    if (arguments.length !== 2) {
        throw new Error("Function accepts only 2 parameters");
    }
    return a + b;
}

console.log(add(2, 3));
// console.log(add(2));
console.log(add(2, 3, 4));
