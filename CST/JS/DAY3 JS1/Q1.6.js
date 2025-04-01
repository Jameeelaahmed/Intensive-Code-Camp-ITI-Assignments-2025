stars(8)
function stars(x) {
    for (var i = 0; i < x; i++) {
        var row = "";
        for (var j = 0; j <= i; j++) {
            row += '*'
        }
        console.log(row)
    }
}