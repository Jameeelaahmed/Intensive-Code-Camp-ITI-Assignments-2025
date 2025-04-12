//* SHAPE

function Shape() {
    if (new.target === Shape) {
        throw new Error("Shape is abstract.");
    }
    this.permeter = function () {
        throw new Error('this function should be impemented');
    }
    this.area = function () {
        throw new Error('this function should be impemented');
    }
}



//*RECtangle
function Rectangle(length, height) {
    if (Rectangle._instanceExists) {
        throw new Error("only one rectangle is allowed.");
    }
    Shape.call(this);

    Object.defineProperty(this, 'length', {
        value: length,
        writable: false,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(this, 'height', {
        value: height,
        writable: false,
        enumerable: false,
        configurable: false
    });
    Rectangle._instanceExists = true;
}
Rectangle._instanceExists = false;

Rectangle.prototype = Object.create(Shape.prototype)
Rectangle.prototype.constructor = Rectangle;


Object.defineProperty(Rectangle.prototype, 'perimeter', {
    get: function () {
        return (this.length + this.height) * 2
    }
})

Object.defineProperty(Rectangle.prototype, 'area', {
    get: function () {
        return (this.length * this.height)
    }
})

Rectangle.prototype.toString = function () {
    return "length is :" + this.length + '\n' + "height is: " + this.height + '\n'
        + "perimeter is " + this.perimeter + '\n' + "area is:" + this.area;
}

Rectangle.prototype.valueOf = function () {
    return this.area;
};

// *SQUARE


function Square(length) {
    Rectangle.call(this, length, length)
    // if (Square._instanceExists) {
    //     throw new Error("only one square is allowed.");
    // }
    Object.defineProperty(this, 'length', {
        value: length,
        writable: false,
        enumerable: false,
        configurable: false
    });
    Square.count++;
    Square._instanceExists = true;
}

Square._instanceExists = false;

Square.count = 0;

Square.prototype = Object.create(Rectangle.prototype)
Square.prototype.constructor = Square;


Object.defineProperty(Square.prototype, 'perimeter', {
    get: function () {
        return this.length * 4;
    }
})
Object.defineProperty(Square.prototype, 'area', {
    get: function () {
        return this.length * this.length;
    }
})

Square.prototype.toString = function () {
    return "length is :" + this.length + '\n'
        + "perimeter is " + this.perimeter + '\n' + "area is:" + this.area;
}

// var sh = new Shape()
var rec1 = new Rectangle(6, 5)
var rec2 = new Rectangle(10, 15)
var sq = new Square(6);
var sq1 = new Square(6);
var sq2 = new Square(6);

console.log("_________________RECTANGLE 1______________")
console.log(rec1.toString())
console.log("_________________RECTANGLE 2______________")
console.log(rec2.toString())
console.log("_________________Square______________")
console.log(sq.toString())
console.log("Numbers of squars created: ", Square.count)


console.log("sum: ", rec1 + rec2)
if (rec1 >= rec2) {
    console.log("diff: ", rec1 - rec2)
} else {
    console.log("diff: ", rec2 - rec1)
}





