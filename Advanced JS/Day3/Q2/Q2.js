//!!!!!! Vehicle

function Vehicle(speed, color) {
    if (typeof (speed) !== "number") {
        throw new Error("Speed must be a number");
    }
    if (typeof (color) !== "string") {
        throw new Error("Color must be a string");
    }

    Object.defineProperty(this, 'speed', {
        value: speed,
        writable: false,
        configurable: false,
        enumerable: true,
    });

    Object.defineProperty(this, 'color', {
        value: color,
        writable: false,
        configurable: false,
        enumerable: true,
    });

    // *METHODS

    Object.defineProperty(this, 'turnLeft', {
        value: function () {
            console.log('Turn left');
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });

    Object.defineProperty(this, 'turnRight', {
        value: function () {
            console.log('Turn right');
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });

    Object.defineProperty(this, 'start', {
        value: function () {
            console.log('Starting the vehicle');
            return true;
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });

    Object.defineProperty(this, 'stop', {
        value: function () {
            console.log('Stopping the vehicle');
            return true;
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });

    Object.defineProperty(this, 'goBackward', {
        value: function (speed, accel) {
            if (typeof speed !== 'number' || typeof accel !== 'number') {
                throw new Error("Both speed and acceleration must be numbers");
            }
            console.log(`Backward speed: ${speed} and acceleration: ${accel}`);
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });

    Object.defineProperty(this, 'goForward', {
        value: function (speed, accel) {
            if (typeof speed !== 'number' || typeof accel !== 'number') {
                throw new Error("Both speed and acceleration must be numbers");
            }
            console.log(`Forward speed: ${speed} and acceleration: ${accel}`);
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });

    // Getters
    Object.defineProperty(this, 'getSpeed', {
        configurable: false,
        enumerable: true,
        get: function () {
            return this.speed;
        },
    });

    Object.defineProperty(this, 'getColor', {
        configurable: false,
        enumerable: true,
        get: function () {
            return this.color;
        },
    });
}

Vehicle.prototype.toString = function () {
    return `Speed: ${this.getSpeed}\nColor: ${this.getColor}\n`;
};

Vehicle.prototype.valueOf = function () {
    return this.getSpeed;
};

//!!!!!! Bicycle

function Bicycle(speed, color) {
    Vehicle.call(this, speed, color);
}

Bicycle.prototype = Object.create(Vehicle.prototype);
Bicycle.prototype.constructor = Bicycle;

Object.defineProperty(Bicycle.prototype, 'ringBell', {
    value: function () {
        console.log('Bell rung');
    },
    writable: false,
    configurable: false,
    enumerable: false,
});

//!!!!!! MotorVehicle

function MotorVehicle(sizeOfEngine, licencePlate, speed, color) {
    if (typeof sizeOfEngine !== "number") {
        throw new Error("Size of engine must be a number");
    }
    if (typeof licencePlate !== "string") {
        throw new Error("Licence plate must be a string");
    }
    Vehicle.call(this, speed, color); // Call the Vehicle constructor
    this.sizeOfEngine = sizeOfEngine;
    this.licencePlate = licencePlate;
}

MotorVehicle.prototype = Object.create(Vehicle.prototype);
MotorVehicle.prototype.constructor = MotorVehicle;

// Getters for MotorVehicle
Object.defineProperty(MotorVehicle.prototype, 'getSizeOfEngine', {
    configurable: false,
    enumerable: false,
    get: function () {
        return this.sizeOfEngine;
    },
});

Object.defineProperty(MotorVehicle.prototype, 'getLicencePlate', {
    configurable: false,
    enumerable: false,
    get: function () {
        return this.licencePlate;
    },
});

//!!!!!! DumpTruck

function DumpTruck(loadCapacity, numWheels, weight, speed, color, sizeOfEngine, licencePlate) {
    if (typeof loadCapacity !== "number") {
        throw new Error("Load capacity must be a number");
    }
    if (typeof numWheels !== "number") {
        throw new Error("Number of wheels must be a number");
    }
    if (typeof weight !== "number") {
        throw new Error("Weight must be a number");
    }

    MotorVehicle.call(this, sizeOfEngine, licencePlate, speed, color); // Call the MotorVehicle constructor
    this.loadCapacity = loadCapacity;
    this.numWheels = numWheels;
    this.weight = weight;
}

DumpTruck.prototype = Object.create(MotorVehicle.prototype);
DumpTruck.prototype.constructor = DumpTruck;

Object.defineProperty(DumpTruck.prototype, 'lowerLoad', {
    value: function () {
        console.log('Lowering load');
    },
    writable: false,
    configurable: false,
    enumerable: false,
});

Object.defineProperty(DumpTruck.prototype, 'raiseLoad', {
    value: function () {
        console.log('Raising load');
    },
    writable: false,
    configurable: false,
    enumerable: false,
});

// Getters for DumpTruck
Object.defineProperty(DumpTruck.prototype, 'getLoadCapacity', {
    configurable: false,
    enumerable: false,
    get: function () {
        return this.loadCapacity;
    },
});

//!!!!!! Car

function Car(numOfDoors, numWheels, weight, speed, color, sizeOfEngine, licencePlate) {
    if (typeof numOfDoors !== "number") {
        throw new Error("Number of doors must be a number");
    }
    if (typeof numWheels !== "number") {
        throw new Error("Number of wheels must be a number");
    }
    if (typeof weight !== "number") {
        throw new Error("Weight must be a number");
    }

    MotorVehicle.call(this, sizeOfEngine, licencePlate, speed, color); // Call the MotorVehicle constructor
    this.numOfDoors = numOfDoors;
    this.numWheels = numWheels;
    this.weight = weight;
}

Car.prototype = Object.create(MotorVehicle.prototype);
Car.prototype.constructor = Car;

Object.defineProperty(Car.prototype, 'switchOnAirCon', {
    value: function () {
        console.log('Switching on air conditioning');
    },
    writable: false,
    configurable: false,
    enumerable: false,
});

// Getters for Car
Object.defineProperty(Car.prototype, 'getNumOfDoors', {
    configurable: false,
    enumerable: false,
    get: function () {
        return this.numOfDoors;
    },
});

////////////
var v = new Vehicle(100, 'red');
var mV = new MotorVehicle(2500, 'ABC123', 120, 'blue');
var bi = new Bicycle(20, 'green');
var dump = new DumpTruck(5000, 8, 8000, 100, 'yellow', 4000, 'XYZ987');
var car = new Car(4, 4, 1500, 180, 'black', 3000, 'LMN345');

console.log(v.toString());
console.log(mV.toString());
console.log(bi.toString());
console.log(dump.toString());
console.log(car.toString());
