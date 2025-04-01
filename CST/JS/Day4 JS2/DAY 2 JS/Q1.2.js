var str = prompt("Enter a word:");

function isPalindrome(str) {
    var isCaseSensitive = confirm("Should the check be case-sensitive?");
    var len = str.length - 1;

    if (!isCaseSensitive) {
        str = str.toLowerCase();
    }

    for (var i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[len--]) {
            return false;
        }
    }
    return true;
}

var result = isPalindrome(str);

if (result) {
    console.log("Word is a palindrome");
} else {
    console.log("Word is not a palindrome");
}
