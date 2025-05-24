abstract class Shape {
  void calculateArea();
}

mixin PerimeterMixin {
  void perimeter();
}
mixin VolumeMixin {
  void volume();
}

class Rectangle extends Shape with PerimeterMixin {
  double _length;
  double _width;

  Rectangle(this._length, this._width);

  @override
  void calculateArea() {
    double area = _length * _width;
    print("Area of Rectangle is $area");
  }

  @override
  void perimeter() {
    double peri = 2 * (_length + _width);
    print("Perimeter of Rectangle is $peri");
  }
}

class Circle extends Shape with PerimeterMixin {
  double _radius;
  Circle(this._radius);

  @override
  void calculateArea() {
    double area = 3.14 * _radius * _radius;
    print("Area of Circle is $area");
  }

  @override
  void perimeter() {
    double circum = 2 * 3.14 * _radius;
    print("Circumference of Circle is $circum");
  }
}

class Triangle extends Shape with PerimeterMixin {
  double _base;
  double _height;
  double _side1;
  double _side2;

  Triangle(this._base, this._side1, this._side2, this._height);

  bool isValidTriangele() {
    return (_base + _side1 > _side2 &&
        _base + _side2 > _side1 &&
        _side1 + _side2 > _base);
  }

  @override
  void calculateArea() {
    if (isValidTriangele()) {
      double area = 0.5 * _base * _height;
      print("Area of Triangle is $area");
    } else {
      print(
        "This is not a trangle the sum of t0 side length shoud be greater than the third one",
      );
    }
  }

  @override
  void perimeter() {
    if (isValidTriangele()) {
      double peri = _side1 + _side2 + _base;
      print("Perimeter of Triangle is $peri");
    } else {
      print(
        "This is not a trangle the sum of t0 side length shoud be greater than the third one",
      );
    }
  }
}

class Cube extends Shape with VolumeMixin {
  double _side;

  Cube(this._side);

  @override
  void calculateArea() {
    double surfaceArea = 6 * _side * _side;
    print("Surface Area of Cube is $surfaceArea");
  }

  @override
  void volume() {
    double vol = _side * _side * _side;
    print("Volume of Cube is $vol");
  }
}
