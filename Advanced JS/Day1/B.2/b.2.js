let obj =
{
    id: "SD-10",
    location: "SV",
    addr: "123 st.",
    getSetGen: function () {
        for (var i in this) {
            if (typeof this[i] != "function") {
                this["set" + i] = (function (i) {
                    return function (val) {
                        this[i] = val;
                    }
                })(i);
                this["get" + i] = (function (i) {
                    return function () {
                        return this[i];
                    }
                })(i)
            }
        }
    }
}
console.log(obj);
obj.getSetGen();
console.log(obj);
let user = { name: "Ali", age: 10 };
console.log(user);
obj.getSetGen.call(user);
console.log(user);


obj.setaddr('124')
console.log(obj.getaddr())++;

