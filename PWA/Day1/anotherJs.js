console.log(this);
var sum = 0
onmessage = function (event) {
    console.log(event);
    // let parsedArray = parseInt(event.data)
    let arr = event.data;
    arr.map((idx) => {
        sum += parseInt(idx)
    })
    console.log(sum);
    this.postMessage([sum]);
}
