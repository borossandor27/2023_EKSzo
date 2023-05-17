const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'menhely'
});

connection.connect();

app.get('/', function (req, res) {
    //res.send('hello world!');

});

app.get('/allat/:id', function (req, res) {
    let sql = 'SELECT * FROM `allatok` where allatid = ' + req.params.id;
    connection.query(sql, function (err, rows) {
        res.send(rows);
    })
    console.log(req.params)
})
app.delete('/allat/:id', function (req, res) {
    let sql = 'DELETE FROM `allatok` where allatid = ' + req.params.id;
    connection.query(sql, function (err, rows) {
        res.send(rows);
    })
    console.log(req.params)
})
app.post('/allat/', function (req, res) {
    let sql = 'INSERT INTO allat VALUES (...' + req.params.id ;
    connection.query(sql, function (err, rows) {
        res.send(rows);
    })
    console.log(req.params)
})
app.put('/allat/:id', function (req, res) {
    let sql = 'UPDATE .... where allatid = ' + req.params.id;
    connection.query(sql, function (err, rows) {
        res.send(rows);
    })
    console.log(req.params)
})
app.get('/allatAll', function (req, res) {
    let sql = 'SELECT * FROM `allatok`';
    connection.query(sql, function (err, rows) {
        res.send(rows);
    });
    console.log('Összes állat')
})


app.listen(3000, () => {
    console.log('listening on port 3000');
});
