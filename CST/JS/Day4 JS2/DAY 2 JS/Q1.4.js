var color = prompt("Enter Color (Red-Green-Blue)");

function getValidInput(message, reg) {
    var input;
    do {
        input = prompt(message);
    } while (!reg.test(input));
    return input;
}

function validationMessage(validMessage) {
    console.log("%c" + validMessage + "color: ${color}; font-size: 18px;");
}

// ! NAME
var name = getValidInput("Enter your name", /^[A-Za-z\s]+$/);
validationMessage("Name is Valid");

// ! Phone Number
var phoneNum = getValidInput("Enter your Phone Number", /^\d{8}$/);
validationMessage("Phone Number is Valid");

// ! Mobile Number 
var mobNum = getValidInput("Enter your Mobile Number", /^(010|011|012|015)\d{8}$/);
validationMessage("Mobile Number is Valid");

// ! Email
var email = getValidInput("Enter your Email", /^[a-zA-Z\d._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/);
validationMessage("Email is Valid");
