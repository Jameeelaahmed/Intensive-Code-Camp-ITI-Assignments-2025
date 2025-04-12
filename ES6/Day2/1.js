//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Q1
console.log("________________ Q1 ___________________")
const set = new Set([1, 2, 3, 4, 5, 3, 2]);

console.log(set.has(3));

console.log('set after delete')
set.delete(2);
console.log(set)

const arr = Array.from(set);
console.log(arr);

console.log("_____forEach_____");
set.forEach(value => {
    console.log(value);
});

console.log("_____for_of:_____");
for (const value of set) {
    console.log(value);
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Q2

console.log("________________ Q2 ___________________")

const studentScores = new Map([
    ["Alice", 85],
    ["Bob", 90],
    ["Charlie", 78],
]);

console.log("Bob's score:", studentScores.get("Bob"));

studentScores.set("Charlie", 88);
console.log("score after update:", studentScores)

console.log("Is David in the map?", studentScores.has("David"));

console.log("_____forEach:_____");
studentScores.forEach((score, name) => {
    console.log(`${name}: ${score}`);
});

console.log("______for_of:______");
for (const [name, score] of studentScores) {
    console.log(`${name}: ${score}`);
}


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Q3

console.log('______________________Q3_____________________')

const countryPopulations = new Map([
    ["USA", 331 + ' million'],
    ["India", 1380 + ' million'],
    ["China", 1441 + ' million'],
]);

const countryObj = Object.fromEntries(countryPopulations);
console.log("Country Object:", countryObj);

const countryMap = new Map(Object.entries(countryObj));
console.log("back to Map:", countryMap);

const countrySet = new Set(countryPopulations.keys());
console.log("country names set:", countrySet);

const countryArray = Array.from(countrySet);
console.log("country names array:", countryArray);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Q4

console.log('______________________Q4_____________________')

class Employee {
    constructor(id, salary, department) {
        this.id = id;
        this.salary = salary;
        this.department = department;
    }

    getDetails() {
        return `ID: ${this.id}, Salary: $${this.salary}, Department: ${this.department}`;
    }
}

class Manager extends Employee {
    constructor(id, salary, department, teamSize) {
        super(id, salary, department);
        this.teamSize = teamSize;
    }

    getDetails() {
        return `${super.getDetails()}, Team Size: ${this.teamSize}`;
    }
}

const manager = new Manager(1, 5000, "Engineering", 10);

console.log("details:");
console.log(manager.getDetails());

manager.id = 101;

console.log("modified ID:");
console.log(manager.getDetails());

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Q5

console.log('______________________Q5_____________________')


class Temperature {
    #celsius;

    constructor(celsius) {
        this.celsius = celsius;
    }

    get celsius() {
        return this.#celsius;
    }

    set celsius(value) {
        if (value < -273.15) {
            console.log("error: temperature can't be below -273.15°C");
            return;
        }
        this.#celsius = value;
    }

    setTemperature(value) {
        if (value < -273.15) {
            return "Error: temperature can't be below -273.15°C";
        }
        this.celsius = value;
        return `temperature updated to: ${this.celsius}°C`;
    }
}

const temp = new Temperature(25);

console.log("initial temperature:", temp.celsius, "°C");

console.log(temp.setTemperature(100));
console.log("updated temperature:", temp.celsius, "°C");

console.log(temp.setTemperature(-300));


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Q6

console.log('______________________Q6_____________________')


class MathUtils {
    static PI = 3.14;

    static calculateCircumference(radius) {
        return 2 * this.PI * radius;
    }
}

const radius = 5;
const circumference = MathUtils.calculateCircumference(radius);
console.log(`circumference of circle is: ${circumference}`);



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  Q7

console.log('______________________Q7_____________________')

function firstUniqueCharacter(str) {
    const count = {};

    for (const char of str) {
        count[char] = count[char] ? count[char] + 1 : 1;
    }

    for (const char of str) {
        if (count[char] === 1) {
            return char;
        }
    }
    return 'no unique char';
}

console.log(firstUniqueCharacter("abacbd"))
console.log(firstUniqueCharacter("aabbcc"));
