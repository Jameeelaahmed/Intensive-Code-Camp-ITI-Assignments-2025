// function List() {
//     this.arr = [];
// }

// var list = new List()

// // * 1 - 2 enqueue & uniqueness
// List.prototype.enqueue = function (obj) {
//     if (this.arr.length === 0) {
//         this.arr.push(obj);
//     } else {
//         if (obj['val'] > this.arr[this.arr.length - 1].val) {
//             this.arr.push(obj);
//         } else {
//             throw new Error('you must insert unique greater element')
//         }
//     }
// }

// list.enqueue({ val: 5 })
// console.log('5', list)
// list.enqueue({ val: 6 })
// console.log('6', list)
// // list.enqueue({ val: 4 })
// // console.log('4', list)
// list.enqueue({ val: 7 })
// console.log('7', list)
// list.enqueue({ val: 8 })
// list.enqueue({ val: 9 })
// list.enqueue({ val: 10 })
// list.enqueue({ val: 11 })
// // list.enqueue({ val: 7 })
// // console.log('7', list)
// // list.enqueue({ val: 5 })
// // console.log('5', list)

// console.log(list)
// // * pop

// List.prototype.pop = function () {
//     if (this.arr.length === 0) {
//         throw new Error("Cannot pop from an empty list");
//     } else {
//         this.arr.pop();
//     }
//     console.log("popped: ")
//     console.log(this)
// }

// list.pop()
// console.log(list.arr.some(item => item.val === 5))

// // * Remove

// List.prototype.remove = function (obj) {
//     const index = this.arr.findIndex(item => item.val === obj.val);

//     if (index === -1) {
//         throw new Error('Obj not found');
//     } else {
//         this.arr.splice(index, 1);
//         console.log('Object removed:', obj);
//     }
// };

// list.remove({ val: 6 })

// console.log(list)

// // * Dequeue

// List.prototype.dequeue = function () {
//     if (this.arr.length === 0) {
//         throw new Error("Cannot dequeue from an empty list");
//     } else {
//         this.arr.splice(0, 1)
//     }
//     console.log('Object dequeued:', this);
// }

// list.dequeue()

// // * Display

// List.prototype.display = function () {
//     if (this.arr.length === 0) {
//         throw new Error("There is no list to display");
//     } else {
//         for (var i = 0; i < this.arr.length; i++) {
//             console.log(this.arr[i].val)
//         }
//     }
// }

// console.log('list displayed')
// list.display()

var list = {
    arr: [],
    push: function (value) {
        if (arguments.length !== 1) throw new Error('you must pass one argument')
        if (this.arr.length === 0) {
            this.arr.push({ val: value });
        } else {
            if (value > this.arr[this.arr.length - 1].val) {
                this.arr.push({ val: value });
            } else {
                throw new Error('you must insert unique greater element')
            }
        }
    },
    enqueue: function (value) {
        if (arguments.length !== 1) throw new Error('you must pass one argument')
        if (this.findEl(value)) throw new Error("Element Exist you canot duplicate values !!");
        if (this.arr.length === 0) {
            this.arr.push({ val: value });
        } else {
            if (value < this.arr[0].val) {
                this.arr.splice(0, 0, { val: value });
            } else {
                throw new Error("you must insert element smaller than the one in first index");
            }
        }
    },
    insert: function (value, ind) {
        if (arguments.length !== 2) throw new Error('You must pass two arguments');

        if (this.findEl(value)) throw new Error("Element exists; you cannot duplicate values!!");

        if (ind < 0 || ind > this.arr.length) {
            throw new Error("Invalid index");
        }

        // empty list
        if (this.arr.length === 0) {
            if (ind === 0) {
                this.arr.splice(ind, 0, { val: value });
                return;
            } else {
                throw new Error("Invalid index for empty list");
            }
        }

        // insertion at the start
        if (ind === 0) {
            if (value < this.arr[0].val) {
                this.arr.splice(ind, 0, { val: value });
            } else {
                throw new Error("the value must be less than the first element");
            }
            return;
        }

        // insertion at the end
        if (ind === this.arr.length) {
            if (value > this.arr[this.arr.length - 1].val) {
                this.arr.push({ val: value });
            } else {
                throw new Error("the value must be greater than the last element");
            }
            return;
        }

        // for insertion in the middle
        const prevVal = this.arr[ind - 1].val;
        const nextVal = this.arr[ind].val;
        if (value > prevVal && value < nextVal) {
            this.arr.splice(ind, 0, { val: value });
        } else {
            throw new Error("value must be between adjacent elements");
        }
    }
    ,
    findEl: function (val) {
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i].val === val) {
                return true;
            }
        }
        return false;
    },
    pop: function () {
        if (arguments.length !== 0) throw new Error('you must pass zero argument')
        if (this.arr.length === 0) {
            throw new Error("Cannot pop from an empty list");
        } else {
            this.arr.pop();
        }
        console.log("popped: ")
        // console.log(arr)
    },
    remove: function (value) {
        if (arguments.length !== 1) throw new Error('you must pass one argument')

        const index = this.arr.findIndex(item => item.val === value);
        if (index === -1) {
            throw new Error('Obj not found');
        } else {
            this.arr.splice(index, 1);
            console.log('Object removed:', value);
        }
    },
    dequeue: function () {
        if (arguments.length !== 0) throw new Error('you must pass zero argument')
        if (this.arr.length === 0) {
            throw new Error("Cannot dequeue from an empty list");
        } else {
            this.arr.splice(0, 1)
        }
    },
    display: function () {
        if (arguments.length !== 0) throw new Error('you must pass zero argument')
        if (this.arr.length === 0) {
            throw new Error("There is no list to display");
        } else {
            for (var i = 0; i < this.arr.length; i++) {
                console.log(this.arr[i].val)
            }
        }
    }
}


//* Push TEST
// list.push(4)
// list.push(5)
// list.push(6)
// list.push(0)

// console.log(list.arr)
// *POP TEST

// list.pop()
// list.pop()
// list.pop()
// list.pop(5)
// console.log(list.arr)
// list.pop()
// console.log(list.arr)

//* enqueue
// list.enqueue(4)
// list.enqueue(0)
// list.enqueue(-1)
// list.enqueue(0)
// console.log(list.arr)

// * DEQUEUE TEST

// list.dequeue()
// list.dequeue()
// list.dequeue()
// console.log(list.arr)
// list.dequeue()
// *INSert TEST

list.insert(0, 0)
console.log(list.arr)

// list.insert(21, 3)
// console.log(list.arr)

list.insert(7, 1)
console.log(list.arr)

list.insert(6, 1)
console.log(list.arr)

list.insert(8, 3)
console.log(list.arr)

// list.insert(3, 3)
// console.log(list.arr)





// list.insert(1, 0)
// console.log(list.arr)

// list.insert(20, 3)
// console.log(list.arr)

// list.insert(20, 4)
// console.log(list.arr)

// list.insert(0, -1)
// console.log(list.arr)

// list.insert(100, 8)
// console.log(list.arr)

// list.insert(3, 2)
// console.log(list.arr)

// list.insert(5, 1)
// console.log(list.arr)

// ??????????????????????????????

// console.log("inserted", list.arr)


// *REMOVE TEST

// list.remove(4)
// list.remove(4)
// console.log(list.arr)


// * DISPLAY TEST

// list.display();
