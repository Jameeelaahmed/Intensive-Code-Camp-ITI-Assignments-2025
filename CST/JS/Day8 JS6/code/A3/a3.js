function add() {
    if (arguments.length === 0) {
        throw new Error("Function requires at least one parameter");
    }

    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] !== "number") {
            throw new Error("Function accepts only numbers");
        }
        sum += arguments[i];
    }
    return sum;
}

console.log(add(2));
console.log(add(2, 3));
// console.log(add(2, "3", 4));
console.log(add());
