//**************Q1 */
function delayedMessage() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello, World!");
        }, 3000);
    });
}

delayedMessage().then((message) => {
    console.log(message);
});

//**************Q2 */

function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 2000);
    });
}

fetchData()
    .then((data) => {
        console.log("data:", data);
        return data.toUpperCase();
    })
    .then((uppercasedData) => {
        console.log("uppercased:", uppercasedData);
    });

//**************Q3 */

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccessful = Math.random() > 0.5;
            isSuccessful ? resolve("data received") : reject(new Error("network error"));
        }, 2000);
    });
}

async function getData() {
    try {
        const result = await fetchData();
        console.log("success:", result);
        const uppercased = result.toUpperCase();
        console.log("uppercased:", uppercased);
    } catch (error) {
        console.log("error:", error.message);
    }
}

getData();

