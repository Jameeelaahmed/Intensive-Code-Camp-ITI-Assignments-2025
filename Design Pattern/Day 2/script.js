// Task 1 - Decorator Pattern
class Teacher {
    constructor(name) {
        this.name = name
        this.info = []
    }
}

function setSalary(teacher, amount) {
    teacher.salary = amount
    teacher.info.push(`Salary: ${amount}`)
    return teacher
}

function setNationality(teacher, country) {
    teacher.nationality = country
    teacher.info.push(`From: ${country}`)
    return teacher
}

function setStreet(teacher, address) {
    teacher.street = address
    teacher.info.push(`Lives at: ${address}`)
    return teacher
}

console.log("=== Task 1: Decorator Pattern ===")
let teacher = new Teacher("Sarah")
setSalary(teacher, 8000)
setNationality(teacher, "Canadian")
setStreet(teacher, "Oak Avenue")
console.log(teacher)
console.log("Info:", teacher.info)

// Task 2 - Proxy Pattern
class DataService {
    getData() {
        console.log("Loading data from server...")
        return ["Canada", "France", "Japan", "Brazil"]
    }
}

class CacheProxy {
    constructor() {
        this.dataService = new DataService()
        this.cachedData = null
        this.isCached = false
    }

    getData() {
        if (this.isCached) {
            console.log("Using cached data")
            return this.cachedData
        }
        this.cachedData = this.dataService.getData()
        this.isCached = true
        return this.cachedData
    }
}

console.log("\n=== Task 2: Proxy Pattern ===")
let cache = new CacheProxy()
console.log("First call:", cache.getData())
console.log("Second call:", cache.getData())

// Task 3 - Bridge Pattern
class AudioDevice {
    constructor() {
        this.level = 50
    }
    increaseVolume() {
        this.level += 5
    }
    decreaseVolume() {
        this.level -= 5
    }
}

class Television extends AudioDevice {
    constructor() {
        super()
        this.type = "TV"
    }

    mute() {
        this.level = 0
        console.log("TV muted")
    }

    status() {
        return `${this.type} volume: ${this.level}`
    }
}

class SoundBox extends AudioDevice {
    constructor() {
        super()
        this.type = "Speaker"
        this.level = 30
    }

    status() {
        return `${this.type} volume: ${this.level}`
    }
}

console.log("\n=== Task 3: Bridge Pattern ===")
let myTV = new Television()
console.log(myTV.status())
myTV.increaseVolume()
console.log(myTV.status())
myTV.mute()
console.log(myTV.status())

let mySpeaker = new SoundBox()
console.log(mySpeaker.status())
mySpeaker.decreaseVolume()
console.log(mySpeaker.status())

// Task 4 - Composite Pattern
class Item {
    constructor(name, pages) {
        this.name = name
        this.pages = pages
    }

    getPageCount() {
        return this.pages
    }

    display(level = 0) {
        console.log("-".repeat(level) + this.name + ` [${this.pages} pages]`)
    }
}

class Container {
    constructor(title) {
        this.title = title
        this.items = []
    }

    addItem(item) {
        this.items.push(item)
    }

    getPageCount() {
        let total = 0
        for (let item of this.items) {
            total += item.getPageCount()
        }
        return total
    }

    display(level = 0) {
        console.log("-".repeat(level) + this.title)
        for (let item of this.items) {
            item.display(level + 2)
        }
    }
}

console.log("\n=== Task 4: Composite Pattern ===")
let mainFolder = new Container("My Books")
let book1 = new Item("Python Guide", 250)
let book2 = new Item("Web Development", 180)
let subFolder = new Container("Advanced Topics")
subFolder.addItem(new Item("Machine Learning", 320))
subFolder.addItem(new Item("Data Science", 290))

mainFolder.addItem(book1)
mainFolder.addItem(book2)
mainFolder.addItem(subFolder)

mainFolder.display()
console.log("Total pages in collection:", mainFolder.getPageCount())