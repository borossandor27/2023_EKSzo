const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
app.use(cors());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! Use of Multer
app.use(multer(
    {
        dest: './upload/',
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
        },
        onFileUploadStart: function (file) {
            console.log(file.fieldname + ' is starting ...')
        },
        onFileUploadData: function (file, data) {
            console.log(data.length + ' of ' + file.fieldname + ' arrived')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
        }
    }
));


const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'upload'
});

connection.connect();

//route for Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//@type   POST
//route for post data
app.post("/upload", upload.single('brandLogo'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
        //var insertData = `INSERT INTO images(imagesid, description, filename) VALUES (NULL, '${req.file.filename}','${imgsrc}')`;
        var insertData = `INSERT INTO images(imagesid, filename) VALUES (NULL, '?')`;
        connection.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
    }
});

app.listen(3000, console.log("Elindult"));