function fun1() {
    return [].reverse.call(arguments);
}

function fun2() {
    return [].reverse.bind(arguments);
}

const callReverse = fun1(1, 2, 3);
console.log("First call:", callReverse); // Output: [3, 2, 1] (reversed)
console.log("Second call:", callReverse); // Output: [3, 2, 1] (same result)
const boundReverse = fun2(1, 2, 3, 4);
console.log("First bound call:", boundReverse()); // Output: [3, 2, 1] (reversed)
console.log("Second bound call:", boundReverse()); // Output: [1, 2, 3] (re-reversed!)