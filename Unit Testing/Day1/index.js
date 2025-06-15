
//~problem 1
//* input: "hamada" ===> output: HAMADA. expect
//* input: 12 ===> output: "".   expect

export const capitalizeText = (input) => {
    if (typeof input !== "string") {
        throw new TypeError("parameter should be string")
    };
    return input.toUpperCase();
};

//? test that the function takes a string  it will return a string 
//? test that the function takes a string and return it after capitalize it



//& problem 2
//* input number 3 ==> output should be [0,1,2]

export const createArray = (number) => {
    const myArray = Array.from(Array(number).keys());
    return myArray;
};

//? test that the return value of type array
//? test if we pass 3 it will return array of length 3 and test it's include 1
//? try to delay the testing process 5 seconds
//? try to use different styles (expect , should , assert)
//? after finishing your test process try to  run it on a browser//bonus
//? make pending test case

//^ createArray(3)>>>>>[0,1,2]
//^ createArray(5)>>>[0,1,2,3,4]
