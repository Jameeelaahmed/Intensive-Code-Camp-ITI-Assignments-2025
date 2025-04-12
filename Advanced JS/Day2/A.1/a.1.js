
function Rectangle(w, h) {
    this.width = w;
    this.height = h;
}

Rectangle.prototype.perimeter = function () {
    return (this.height + this.width) * 2;
}
Rectangle.prototype.area = function () {
    return this.height * this.width
}
Rectangle.prototype.displayInfo = function () {
    console.log('width:', this.width, '\n', 'height:', this.height, '\n', "area:", this.area(), '\n', "perimeter:", this.perimeter())
}
let rec = new Rectangle(5, 8);

rec.displayInfo()