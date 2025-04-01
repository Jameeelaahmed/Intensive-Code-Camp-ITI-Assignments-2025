let win;
let scrollInterval;

function openAndScroll() {
    win = open('demo.html', '', "width=800,height=300");

    win.onload = function () {
        scrollInterval = setInterval(() => {
            win.scrollBy(0, 5);

            const scrolledTo = win.scrollY + win.innerHeight;
            if (scrolledTo >= win.document.documentElement.scrollHeight) {
                clearInterval(scrollInterval);
                win.close();
                console.log("Reached bottom!");
            }
        }, 50);
    };
}

// !!!!!!!!!!