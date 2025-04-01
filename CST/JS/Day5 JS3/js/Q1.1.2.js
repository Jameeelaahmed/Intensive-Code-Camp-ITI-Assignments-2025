var obj = {
    nm: "ali",
    age: 10
}
function dispVal(givenObj, key) {
    if (key === 'age') {
        console.log(givenObj[key] + ' years old');
    } else {
        console.log(givenObj[key]);
    }
}
dispVal(obj, 'nm')

