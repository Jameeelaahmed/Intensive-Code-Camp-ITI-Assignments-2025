function numericalSequence(start, end, step) {
    let sequenceList = [];

    function makingSequence() {
        if (step === 0) {
            throw new Error('step cant be zero');
        }
        for (let i = start; i <= end; i += step) {
            sequenceList.push(i);
        }
    }

    function duplicate(val) {
        return sequenceList.includes(val);
    }

    makingSequence();

    Object.defineProperty(this, 'getSequance', {
        configurable: false,
        enumerable: false,
        get: function () {
            return sequenceList;
        },
    });

    Object.defineProperty(this, 'append', {
        configurable: false,
        enumerable: false,
        value: function (val) {
            if (duplicate(val)) {
                throw new Error('you cant duplicate values');
            } else {
                if (val === sequenceList[sequenceList.length - 1] + step) {
                    sequenceList.push(val);
                } else {
                    throw new Error('value isnt within the sequence');
                }
            }
        },
    });

    Object.defineProperty(this, 'prepend', {
        configurable: false,
        enumerable: false,
        value: function (val) {
            if (duplicate(val)) {
                throw new Error('you cant duplicate values');
            } else {
                if (val === sequenceList[0] - step) {
                    sequenceList.unshift(val);
                } else {
                    throw new Error('value isnt within the sequence');
                }
            }
        },
    });

    Object.defineProperty(this, 'dequeue', {
        configurable: false,
        enumerable: false,
        value: function () {
            if (sequenceList.length === 0) {
                throw new Error('Sequence is empty');
            } else {
                sequenceList.shift();
            }
        },
    });

    Object.defineProperty(this, 'pop', {
        configurable: false,
        enumerable: false,
        value: function () {
            if (sequenceList.length === 0) {
                throw new Error('Sequence is empty');
            } else {
                sequenceList.pop();
            }
        },
    });

    Object.defineProperty(this, 'sequenceList', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: sequenceList,
    });
}

var mySeq = new numericalSequence(2, 10, 2);

mySeq.prepend(0);
mySeq.append(12);
console.log(mySeq.getSequance);

mySeq.dequeue();
console.log(mySeq.getSequance);

mySeq.pop();
console.log(mySeq.getSequance);

mySeq.pop();
mySeq.pop();
mySeq.pop();
mySeq.pop();
mySeq.pop();
mySeq.pop();

// console.log(mySeq.getSequance);

// mySeq.pop(); // Error: Sequence is empty

//value thats not part of the sequence
// mySeq.append(13); // Error: value isn't within the sequence

