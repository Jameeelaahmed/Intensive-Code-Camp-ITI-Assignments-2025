var btn = document.getElementById("btn");

function createCookie(key, value, expireDays) {
    try {
        Validate('key', key, arguments);
    }
    catch (error) {
        console.error("Validation error:", error.message);
        return;
    }

    var cookieString = key + "=" + value;
    if (typeof expireDays !== "undefined") {
        var date = new Date();
        date.setDate(date.getDate() + expireDays);
        cookieString += "; expires=" + date.toUTCString();
    }

    document.cookie = cookieString;
}

btn.addEventListener("click", function () {
    var key = document.getElementById("key").value;
    var value = document.getElementById("value").value;
    var expireDaysInput = document.getElementById("date").value;
    var expireDays = parseInt(expireDaysInput, 10);
    if (!isNaN(expireDays)) {
        createCookie(key, value, expireDays);
    } else {
        createCookie(key, value);
    }
});


function getAllCookies() {
    var associativeArray = [];
    var arrCookie = document.cookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var splitted = arrCookie[i].split("=");
        associativeArray[splitted[0]] = splitted[1];
    }
    return associativeArray;
}

var allCookies = getAllCookies();
console.log(allCookies)

function getCookie(key) {
    //? Validate('key',key, arguments);
    if (!key || typeof key !== "string") {
        throw new Error("Key is must be a non-empty string.");
    }
    var associativeArray = getAllCookies();
    return associativeArray[key] !== undefined
        ? associativeArray[key]
        : "not found"; // null , or -1
}

var getCookie = getCookie('jam')
console.log('cookie is :', getCookie)

function hasCookie(key) {
    //? Validate('key',key, arguments);
    var associativeArray = getAllCookies();
    return associativeArray[key] !== undefined;
}

var hasCookie = hasCookie('jammm');

if (hasCookie) {
    console.log('Cookie is found')
} else {
    console.log('not found')
}

function deleteCookie(key) {
    createCookie(key, "", -1);
}

deleteCookie('jam')

console.log(allCookies)

function Validate(fieldType, value) {
    switch (fieldType) {
        case "key":
            if (!value || typeof value !== "string") {
                throw new Error("Key must be a non-empty string.");
            }
            if (value.length < 3) {
                throw new Error("Key must be at least 3 characters long.");
            }
            break;

        case "value":
            if (!value || typeof value !== "string") {
                throw new Error("Value must be a non-empty string.");
            }
            break;
    }
}

