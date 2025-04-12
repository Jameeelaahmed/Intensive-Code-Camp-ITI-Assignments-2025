// *******Q1
let numbers = [42, 85, 13, 64, 29, 99, 56, 7];

let sortedAsc = [...numbers].sort((a, b) => a - b);
console.log("ascending:", sortedAsc);

let sortedDesc = [...numbers].sort((a, b) => b - a);
console.log("descending:", sortedDesc);

let filtered = numbers.filter(num => num > 50);
console.log("numbers > 50:", filtered);

let max = Math.max(...numbers);
let min = Math.min(...numbers);
console.log("Max:", max);
console.log("Min:", min);

// ********Q2

function calculate(operation, ...numbers) {
    let result;
    switch (operation) {
        case "sum":
            result = numbers.reduce((a, b) => a + b);
            break;
        case "subtract":
            result = numbers.reduce((a, b) => a - b);
            break;
        case "multiply":
            result = numbers.reduce((a, b) => a * b);
            break;
        case "divide":
            result = numbers.reduce((a, b) => a / b);
            break;
        default:
            return { error: "operation is not valid" };
    }

    return {
        operation,
        numbers,
        result
    };
}

let output = calculate("multiply", 3, 1, 6, 3);
console.log(`${output.operation} of ${output.numbers.join(",")} is ${output.result}`);


// ********Q3

const projectId = prompt("Enter Project ID:");
const projectName = prompt("Enter Project Name:");
const duration = prompt("Enter Project Duration:");

const project = {
    projectId,
    projectName,
    duration,
    printData: function () {
        console.log(`Project ID: ${this.projectId}`);
        console.log(`Project Name: ${this.projectName}`);
        console.log(`Duration: ${this.duration}`);
    }
};

project.printData();

// ********Q4

let arr1 = [5, 12, 8, 21, 5, 33];
let arr2 = [8, 42, 12, 99, 21];

let mergedArr = [...arr1, ...arr2];

let unique = [...new Set(mergedArr)];

let sorted = unique.sort((a, b) => a - b);

console.log("arr", sorted);

// ********Q5


const user = {
    name: "Jameela",
    age: 23,
    address: {
        city: "Cairo",
        country: "Egypt"
    },
    hobbies: ["coding", "knitting"]
};

const { name, age, address: { city, country }, hobbies } = user;

console.log(`data:
    Name: ${name}
    Age: ${age}
    City: ${city}
    Country: ${country}
    Hobbies:${hobbies}`
)


