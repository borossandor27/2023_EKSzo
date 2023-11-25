const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyparser=require("body-parser");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const mysqld = require("mysql");
const connection = mysqld.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "vizsga_books"
    }
);
connection.connect();

app.get('/api/books', function(req, res) {
    let sql = "SELECT `id`,`title`,`author`,`publish_year`,`page_count`  FROM `books`";
    connection.query(sql, function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
            res.end();
        }
    });
});

app.post('/api/books', function(req, res) {
    const { title, author, publish_year, page_count } = req.body;

    // Check if all fields are provided
    if (!title || !author || !publish_year || !page_count) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if publish_year is an integer
    if (!Number.isInteger(publish_year)) {
        return res.status(400).json({ error: "Publish year must be an integer" });
    }

    // Check if page_count is a positive integer
    if (!Number.isInteger(page_count) || page_count <= 0) {
        return res.status(400).json({ error: "Page count must be a positive integer" });
    }

    // Insert the new book into the database
    const sql = "INSERT INTO books (title, author, publish_year, page_count) VALUES (?, ?, ?, ?)";
    const values = [title, author, publish_year, page_count];
    connection.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to create book" });
        } else {
            const newBook = {
                id: result.insertId,
                title: title,
                author: author,
                publish_year: publish_year,
                page_count: page_count
            };
            return res.status(201).json(newBook);
        }
    });
});
app.post('/api/books/:id/rent', function(req, res) {
    const bookId = parseInt(req.params.id);
    const currentDate = new Date();
    const endDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // Add 7 days to the current date

    // Check if the book exists
    const checkBookQuery = "SELECT * FROM books WHERE id = ?";
    connection.query(checkBookQuery, [bookId], function(err, rows) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to check book" });
        } else if (rows.length === 0) {
            return res.status(404).json({ error: "Book not found" });
        } else {
            // Check if the book is already rented
            const checkRentalQuery = "SELECT * FROM rentals WHERE book_id = ? AND end_date >= ?";
            connection.query(checkRentalQuery, [bookId, currentDate], function(err, rows) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Failed to check rental" });
                } else if (rows.length > 0) {
                    return res.status(409).json({ error: "Book already rented" });
                } else {
                    // Create a new rental record
                    //-- INSERT INTO `rentals` (`id`, `book_id`, `start_date`, `end_date`) VALUES (NULL, '43',date( NOW()), DATE_ADD(date( NOW()), INTERVAL 7 DAY)); 
                    const createRentalQuery = "INSERT INTO rentals (book_id, start_date, end_date) VALUES (?, ?, ?)";
                    const values = [bookId, currentDate, endDate];
                    connection.query(createRentalQuery, values, function(err, result) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: "Failed to create rental" });
                        } else {
                            const newRental = {
                                id: result.insertId,
                                book_id: bookId,
                                start_date: currentDate.toISOString().split('T')[0],
                                end_date: endDate.toISOString().split('T')[0]
                            };
                            return res.status(201).json(newRental);
                        }
                    });
                }
            });
        }
    });
});

app.listen(3000, function () {
    console.log("szerver a 3000-es porton");
})