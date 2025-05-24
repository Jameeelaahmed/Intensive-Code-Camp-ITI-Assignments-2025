const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'books.json');

function readBooks() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function writeBooks(books) {
    fs.writeFileSync(filePath, JSON.stringify(books));
}

module.exports = { readBooks, writeBooks };
