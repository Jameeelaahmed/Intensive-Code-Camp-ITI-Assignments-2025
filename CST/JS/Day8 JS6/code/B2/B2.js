
function handleClick() {
    var foot = document.createElement('img');
    foot.src = './dom.jpg';
    foot.alt = 'Description of image';
    document.body.appendChild(foot);

    var headPic = document.getElementById("header");
    headPic.style.position = "absolute";
    headPic.style.right = 0;
    headPic.style.top = 0;

    foot.style.position = "absolute";
    foot.style.left = 0;
    foot.style.bottom = 0;

    var navigation = document.getElementById('navigation');

    navigation.style.position = "absolute";
    navigation.style.left = 50 + '%';
    navigation.style.top = 50 + '%';
    navigation.style.transform = "translate(" + -50 + '%,' + -50 + '%' + ")";

    nav.style.listStyle = 'circle'
}

var link = document.getElementsByTagName('a');

for (var i = 0; i < link.length; i++) {
    link[i].addEventListener('click', handleClick)
}