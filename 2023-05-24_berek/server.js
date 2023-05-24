//-- middleware deklarálás
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const express = require('express');
const app = express();
//-- pontosítjuk a middleware-ket
app.use(express.static(path.join(__dirname, 'masik')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'berek'
    }
);
connection.connect();

//-- végpontok megadása ---
/**
 * Gyökér könyvtár jelzése
 */
app.get('/', (req, res) => {
    //    let file = __dirname + "\\" + "masik" + "\\" + "masik.html";
    let file = path.join(__dirname, "masik", "masik.html");
    console.log(file);
    res.type('html')
    res.sendFile(file);
})
app.get('/dolgozok', (req, res) => {
    let sql = "SELECT * FROM berek";
    connection.query(sql,function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
            res.end();
        }
    });
})

app.listen(3000, function () {
    console.log('listening on port 3000');
})
