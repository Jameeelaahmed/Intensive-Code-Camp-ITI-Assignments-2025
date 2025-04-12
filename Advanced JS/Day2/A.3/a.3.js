function Box(height, width, length, material) {
    this.content = [];
    this.height = height;
    this.width = width;
    this.length = length;
    this.material = material;

    Object.defineProperty(this, 'height', {
        writable: false,
        enumerable: true,
        configurable: false,
    });

    Object.defineProperty(this, 'width', {
        writable: false,
        enumerable: true,
        configurable: false,
    });

    Object.defineProperty(this, 'length', {
        writable: false,
        enumerable: true,
        configurable: false,
    });

    Object.defineProperty(this, 'material', {
        writable: false,
        enumerable: true,
        configurable: false,
    });

    // Prevent modifications of content property
    Object.defineProperty(this, 'content', {
        writable: false,
        enumerable: false,
        configurable: false,
    });
}

Object.defineProperty(Box.prototype, 'addBook', {
    configurable: false,
    enumerable: false,
    value: function (book) {
        this.content.push(book);
    },
});

Object.defineProperty(Box.prototype, 'countBooks', {
    configurable: false,
    enumerable: false,
    value: function () {
        return this.content.length;
    },
});

Object.defineProperty(Box.prototype, 'deleteBookByTitle', {
    configurable: false,
    enumerable: false,
    value: function (title) {
        const index = this.content.findIndex(book => book.title === title);
        if (index !== -1) {
            this.content.splice(index, 1);
            return true;
        }
        return false;
    },
});

Object.defineProperty(Box.prototype, 'valueOf', {
    configurable: false,
    enumerable: false,
    value: function () {
        return this.content.length;
    },
});

function Book(title, numofChapters, author, numofPages, publisher, numofCopies) {
    this.title = title;
    this.numofChapters = numofChapters;
    this.author = author;
    this.numofPages = numofPages;
    this.publisher = publisher;
    this.numofCopies = numofCopies;

    Book.totalBooksCreated++;

    // Prevent modification of Book properties
    Object.defineProperty(this, 'title', {
        writable: false,
        enumerable: true,
        configurable: false,
    });
    Object.defineProperty(this, 'numofChapters', {
        writable: false,
        enumerable: true,
        configurable: false,
    });
    Object.defineProperty(this, 'author', {
        writable: false,
        enumerable: true,
        configurable: false,
    });
    Object.defineProperty(this, 'numofPages', {
        writable: false,
        enumerable: true,
        configurable: false,
    });
    Object.defineProperty(this, 'publisher', {
        writable: false,
        enumerable: true,
        configurable: false,
    });
    Object.defineProperty(this, 'numofCopies', {
        writable: false,
        enumerable: true,
        configurable: false,
    });
}

Book.totalBooksCreated = 0;

Object.defineProperty(Book, 'getTotalBooksCreated', {
    configurable: false,
    enumerable: false,
    value: function () {
        return Book.totalBooksCreated;
    },
});

Book.prototype.toString = function () {
    return `Title: ${this.title}, Author: ${this.author}, Pages: ${this.numofPages}`;
};

var box1 = new Box(5, 10, 20, 'dd');
var box2 = new Box(6, 12, 15, 'plastic');

box1.addBook(new Book('JS Basics', 10, 'Alice', 120, 'TechPub', 5));
box1.addBook(new Book('React Pro', 8, 'Bob', 150, 'WebPub', 3));
box2.addBook(new Book('Django Mastery', 12, 'Charlie', 180, 'PyPub', 4));

console.log("Total books created: " + Book.getTotalBooksCreated());
console.log("Books in Box1: " + box1.countBooks());
console.log("Books in Box2: " + box2.countBooks());

console.log("Deleting book from Box1:", box1.deleteBookByTitle('JS Basics'));
console.log("Books in Box1 after delete: " + box1.countBooks());

console.log("box1 + box2 = ", box1 + box2);

