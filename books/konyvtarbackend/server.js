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
    if (Number.parseInt(req.body.publish_year)>0 && Number.parseInt(req.body.page_count)>0 && req.body.author.toString().trim().length>0 && req.body.title.toString().trim().length>0) {
        let values = [req.body.title, req.body.author, req.body.publish_year, req.body.page_count];
        let sql="INSERT INTO `books`(`id`, `title`, `author`, `publish_year`, `page_count`) VALUES (NULL,?,?,?,?)"
        connection.query(sql,values, function (err,rows) {
            if(err){
                res.status(201);
                res.send();
            } else {
                res.send(rows);
            }      
        })
            
    } else {
        res.status(401);
        res.send();
    }
})

app.listen(3000, function () {
    console.log("szerver a 3000-es porton");
})