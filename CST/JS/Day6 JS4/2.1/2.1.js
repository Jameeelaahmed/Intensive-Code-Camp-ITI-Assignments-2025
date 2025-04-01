var sub = location.search.substring(1, location.search.length)
var data = sub.split('&')

let arr = []

for (let i = 0; i < data.length; i++) {
    arr[data[i].split('=')[0]] = data[i].split('=')[1].replace(/\+/g, ' ')
}



for (var dat in arr) {
    if (dat === 'email') {
        const value = decodeURIComponent(arr[dat].replace(/\+/g, ' '));
        arr[dat] = value;
    }
}
console.log(arr)

var dataContainer = document.getElementsByClassName('formData')[0];

// Build content using old-style concatenation
var content = "<p>Welcome " + arr['username'] + ", your job is a " + arr['job-title'] + "!</p>" +
    "<p>" +
    "Your address is: " + arr['address'] + "<br>" +
    "Phone number: " + arr['phoneNum'] + "<br>" +
    "Email: " + arr['email'] + "<br>" +
    "Gender: " + arr['gender'] +
    "</p>";

dataContainer.innerHTML = content;

// !!!!!

// var bro = navigator.userAgent
// if (!bro.includes('chrome')) {
//     alert('you should use Chrome!')
// }