// service.js 

var books = [
    { id: 1, title: "Bumi Manusia", author: "Pramoedya Ananta Toer", year: 1980 },
    { id: 2, title: "Laskar Pelangi", author: "Andrea Hirata", year: 2005 },
    { id: 3, title: "Filosofi Teras", author: "Henry Manampiring", year: 2018 }
];

function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

function findAll() {
    return delay(150).then(function () {
        return books;
    });
}

function findById(id) {
    return delay(100).then(function () {
        for (var i = 0; i < books.length; i++) {
            if (books[i].id === id) {
                return books[i];
            }
        }
        return null;
    });
}

function create(newBook) {
    return delay(200).then(function () {
        var id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
        var book = { id: id, title: newBook.title, author: newBook.author, year: newBook.year };
        books.push(book);
        return book;
    });
}

function update(id, updatedData) {
    return delay(250).then(function () {
        for (var i = 0; i < books.length; i++) {
            if (books[i].id === id) {
                if (updatedData.title) books[i].title = updatedData.title;
                if (updatedData.author) books[i].author = updatedData.author;
                if (updatedData.year) books[i].year = updatedData.year;
                return books[i];
            }
        }
        return null;
    });
}

function remove(id) {
    return delay(300).then(function () {
        for (var i = 0; i < books.length; i++) {
            if (books[i].id === id) {
                var deleted = books[i];
                books.splice(i, 1);
                return deleted;
            }
        }
        return null;
    });
}

module.exports = { findAll, findById, create, update, remove };