abstract class Vehicle {
  String? name;
  Vehicle(this.name);
  void start();
}

class Car extends Vehicle {
  String? fuelType;
  Car(String name, this.fuelType) : super(name = name);

  @override
  void start() {
    print("Starting car '$name' with fuel type: $fuelType.");
  }
}

class Truck extends Vehicle {
  double? loadCapacity;
  Truck(String name, this.loadCapacity) : super(name = name);
  @override
  void start() {
    print("Starting truck '$name' with load capacity: $loadCapacity tons.");
  }
}

class Bike extends Vehicle {
  String? engineType;
  Bike(String name, this.engineType) : super(name = name);
  @override
  void start() {
    print("Starting bike '$name' with engine type: $engineType.");
  }
}
