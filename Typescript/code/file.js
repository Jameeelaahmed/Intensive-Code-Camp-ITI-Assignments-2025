"use strict";
(function () {
    const User = {
        name: "jameela",
    };
    console.log(`only name : ${User.name}`);
    const obj = {
        username: "jameela",
        email: "jameela@gmail.com",
    };
    console.log(`optioal props => 'username' : ${obj.username} , 'email' : ${obj.email} `);
    const colors = {
        red: "#FF0000",
        green: "#008000",
        blue: "#0000ff",
    };
    console.log(colors.red);
    const Person = {
        name: "jameela",
        email: "jameela@gmail.com",
    };
    console.log(`'name' : ${Person.name} , 'email' : ${Person.email}`);
    const test = {
        name: "jameela",
        email: "jameela@gmail.com",
    };
    console.log(test);
    const allowdColors = "blue";
    const notAllowedColor = "yellow";
    const allowdColors1 = "blue";
    const allowdColors2 = "red";
    const notAllowedColor2 = "yellow";
    const notAllowedColor3 = "green";
    const isItString = "jameela";
    const isItNull = null;
    const isItUndefined = undefined;
})();
