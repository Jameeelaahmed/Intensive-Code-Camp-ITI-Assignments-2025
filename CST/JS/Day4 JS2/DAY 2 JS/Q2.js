var rad = parseFloat(prompt("Enter Radius"));
var squ = parseFloat(prompt("Enetr value (Square root)"));
var angle = parseFloat(prompt("Enter Angle"))

var area = Math.PI * rad ** 2;
alert(area);

var squRes = Math.sqrt(squ);
alert(squRes);

var radian = angle * (Math.PI / 180);
var cos = Math.cos(radian);
console.log(cos)