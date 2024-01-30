const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vizsga_books'
})
connection.connect(err => {
    if (err) {
        console.log(err);
        process.exit(1);
    } else {
        console.log('Connected to MySQL')
    }
});
app.get('/api/books', (req, res) => {
    connection.query('SELECT * FROM books', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.status(200).json(rows);
        }
    })
});

app.post('/api/books', (req, res) => {
    const book = req.body;
    //-- adatok ellenörzése(validálása) --
    if (!book.title || !book.author || !book.publish_year || !book.page_count) {
        res.status(400).send({ error: "Missing data" });
        return;
    }
    if (book.page_count < 1) {
        res.status(400).send('Invalid page count');
        return;
    }
    if (book.publish_year < 1) {
        res.status(400).send("Invalid publish year");
        return;
    }

    connection.query('INSERT INTO books SET ?', book, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.status(201).send({ id: result.insertId.toString(), ...book });
        }
    });
});


app.post('/api/books/:id/rent', letezoKonyv, kolcsonozheto, (req, res) => {
    const bookId = req.params.id;
    let start_date = new Date().toISOString().slice(0, 10);
    let end_date = new Date();
    end_date.setDate(end_date.getDate() + 7);
    end_date = end_date.toISOString().slice(0, 10)
    const rent = {bookId: bookId, start_date: start_date, end_date: end_date};

    let sql = mysql.format('INSERT INTO `rentals` (`book_id`, `start_date`, `end_date`) VALUES ?', [[Object.values(rent)]]);
    connection.query(sql, rent, (err, result)=> {
        if(err) {
            console.error(err);
            res.status(500).send({message:"Internal Error"})
        }else{
            res.status(201).send({id: result.insertId.toString(), ...rent});
        }
        
    })
    

})

function letezoKonyv(req, res, next) {
    const bookId = req.params.id;
    connection.query('SELECT * FROM books WHERE id=?', bookId, (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Database error');
        } else if (rows.length === 0) {
            res.status(404).send('Book not found');
        } else {
            next();
        }
    });
}

function kolcsonozheto(req, res, next) {
    const bookId = req.params.id;
    let sql = mysql.format('SELECT * FROM `rentals` WHERE book_id = ? AND curdate() BETWEEN start_date AND end_date;', bookId);
    console.log(sql);
    connection.query(sql, bookId, (err, rows) => {
        if(err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }else if(rows.length > 0) {
        res.status(409).send('Book is alredy rented')
    }else {
        next();
    }
});
}


app.listen(port, () => console.log(`Server is running on port ${port}`));