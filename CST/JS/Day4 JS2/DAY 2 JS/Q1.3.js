// "this is a javascript demo"
function three(str) {
    var cnt = 0;
    var index = "";
    var max = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === " ") {
            if (cnt > max) {
                max = cnt;
                index = i;
            }
            cnt = 0;
        } else {
            cnt++;
        }
    }
    console.log(str.substr(index - max, max))
}

three("this is a mmmmmmmmmm javascript demo")
three("abc abcd abcdef ab abcdef")