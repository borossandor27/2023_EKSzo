const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
app.use(cors());
const mime = require("mime-types");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const upload = multer({
  dest: "upload/",
  rename: function (fieldname, value) {
    return (
      value.replace(/\W+/g, "-").tolower() +
      Date.now() +
      mime.extension(file.mimetype)
    );
  },
  onFileUpload: function (file) {
    console.log(file.fieldname + " feltöltése...");
  },
  onFileUploadData: function (file, data) {
    console.log(file.fieldname + ": " + data.length);
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + " feltöltve a " + file.path + " mappába");
  },
});

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "upload",
});

connection.connect();

//route for Home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//@type   POST
//route for post data
app.post("/upload", upload.single("brandLogo"), (req, res) => {
  console.log(req);
  console.log();
  if (!req.file) {
    console.log("No file upload");
  } else {
    console.log(req.file.filename);
    var imgsrc =
      "/upload/" + req.file.filename + "." + mime.extension(req.file.mimetype);
    var insertData = `INSERT INTO images(imagesid, description, filename) VALUES (NULL, ?, ?)`;
    connection.query(
      insertData,
      [req.body.description, imgsrc],
      (err, result) => {
        if (err) throw err;
        console.log("file uploaded");
      }
    );
  }
});

app.listen(3000, console.log("Elindult"));
