
document.getElementById('btn1').addEventListener("click", event => {
    var counter = 0;
    timer = setInterval(() => {
        counter++;
        document.getElementById('p1').innerHTML += ", " + counter
    }, 1000)
})
document.getElementById('btn2').addEventListener('click', event => {
    clearInterval(timer)
})

//? workers: object that i can create another thread with 
/**
 * *
 * * Now i have 2 separated threads
 * * one of them has object from the other 
 * * through this object they can send messages 
 * */
var myWorker = new Worker('anotherJs.js')

document.getElementById('btn3').addEventListener('click', event => {
    var val1 = document.getElementById('txt1').value
    var val2 = document.getElementById('txt2').value

    myWorker.postMessage([val1, val2])
    console.log(myWorker);
})

myWorker.onmessage = function (event) {
    document.getElementById('res').innerHTML = event.data[0];
}


/**
 *
 * library in web api to support multithreading with js
 *
 */

/**
 *  ! THREE TYPES WITH WORKERS
 *  * Dedicated worker
 *  * Shared worker
 *  * Service worker (What we deal with)
 */

/**
*   *service worker is proxy layer
 */

//**
// * through service worker i can control wether the request get executed wether on server or cache
//  */

//**
// *service worker is in navigator object
// ? so it gets affeted by version
//  */