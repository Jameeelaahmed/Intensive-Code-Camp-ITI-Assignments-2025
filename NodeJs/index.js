const http = require('http');
const { getAllBooks, getBookById, deleteBookById } = require('./services/bookStore');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const id = req.url.split('/')[2];
    // GET
    if (req.method === 'GET' && id === undefined) {
        const books = getAllBooks();
        res.writeHead(200);
        res.end(JSON.stringify(books));
    }

    // GET 
    else if (req.method === 'GET' && id !== undefined) {
        const book = getBookById(parseInt(id));
        if (book) {
            res.writeHead(200);
            res.end(JSON.stringify(book));
        } else {
            res.writeHead(404);
            res.end('Book not found');
        }
    }

    // DELETE 
    else if (req.method === 'DELETE' && id !== undefined) {
        const book = getBookById(parseInt(id));
        if (!book) {
            res.writeHead(404);
            res.end('Book not found');
        } else {
            const updated = deleteBookById(parseInt(id));

            res.writeHead(200);
            res.end(JSON.stringify(updated));
        }
    }

    // Not Found
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
