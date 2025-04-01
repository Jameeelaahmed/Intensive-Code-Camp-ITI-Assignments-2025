var str = prompt("Enter String");
var ch = prompt("Enter character");
var confirm = confirm("Should the check be case-sensitive ");

if (confirm === false) {
    str = str.toLowerCase()
    ch = ch.toLowerCase();
}

var cnt = 0;

for (var i = 0; i < str.length; i++) {
    if (str[i] === ch) {
        cnt++;
    }
}

console.log(cnt);
//hellLo

// console.log(str.split(ch).length - 1)