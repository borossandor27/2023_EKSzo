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
})

app.listen(3000, function () {
    console.log("szerver a 3000-es porton");
})