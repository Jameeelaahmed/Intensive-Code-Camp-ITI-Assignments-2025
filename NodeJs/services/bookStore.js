const { readBooks, writeBooks } = require('../utils/filesUtils');

function getAllBooks() {
    return readBooks();
}

function getBookById(id) {
    const books = readBooks();
    return books.find(book => book.id === id);
}

function deleteBookById(id) {
    let books = readBooks();
    books = books.filter(book => book.id !== id);
    writeBooks(books);
    return books;
}

module.exports = {
    getAllBooks,
    getBookById,
    deleteBookById
};
