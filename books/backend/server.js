const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 5000;

const mysql = require("mysql");
const { log } = require("console");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vizsga_books",
});

connection.connect(function (err) {
  if (err) {
    console.log(`Az adatbázis szerver nem elérhető `);
    console.log(`Hibakód: `, err.errno);
    process.exit(1);
  } else {
    connection.query("SELECT 1", function (err) {
      if (err) {
        console.log(`Az adatbázis kapcsolat nem elérhető `);
        console.log(`Hibakód: `, err.errno);
        process.exit(1);
      } else {
        console.log(`adatbázis kapcsolat létrejött!`);
      }
    });
  }
});

app.get("/api/books", function (req, res) {
  connection.query(
    "SELECT `id`,`title`,`author`,`publish_year`,`page_count` FROM `books`",
    function (err, results, fields) {
      if (err) return res.status(204);
      else {
        res.status(200);
        res.send(results);
      }
    }
  );
});

function validationBookData(params) {
  errorMessage = null;
  if (trim(params.title).length < 1) {
    errorMessage += "Érvénytelen szerző adat\n";
  }

  console.log(params);
  return errormessage === null ? true : false;
}
app.post("/api/books", function (req, res, err) {
  try {
    let book = {
      title: req.body.title,
      author: req.body.author,
      publish_year: req.body.publish_year,
      page_count: req.body.page_count,
    };
    const validAdat = validationBookData(book);
    if (validAdat) {
      let values = [
        book.title,
        book.author,
        book.publish_year,
        book.page_count,
      ];
      //- https://github.com/mysqljs/mysql#escaping-query-values
      let sql = mysql.format(
        "INSERT INTO `books`( `title`, `author`, `publish_year`, `page_count`) VALUES (?)",
        [values]
      );
      connection.query(sql, function (err, result) {
        if (err) {
          console.log("hiba: ", err);
          res.send({ errorCode: 402, errorMessage: "Sikertelen rögzítés" });
        } else {
          res.send(result);
        }
      });
    } else {
      res.send(validAdat);
    }
  } catch (error) {
    console.log(error);
    res.send({ errorCode: 401, errorMessage: "Sikertelen rögzítés" });
  }
});

//-- Könyv kölcsönzése
app.post("/api/books/:id/rent", letezoKonyv, kolcsonozheto, function ( req, res) {
  try {
    let bookId = req.params.id;
    //-- a könyv létezik és nincs kikölcsönözve!

    let startDate = new Date().toISOString().slice(0, 10); //-- aktuális dátum
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    endDate = endDate.toISOString().slice(0, 10); //-- kölcsönzés lejár 7 nap múlva
    //-- kölcsönzés rögzítése az adatbázisba
    let values = [bookId, startDate, endDate];
    let sql = mysql.format(
      "INSERT INTO `rentals` (`book_id`, `start_date`, `end_date`) VALUES (?)",
      [values]
    );
    connection.query(sql, function (err, result) {
      if (err) {
        console.log("hiba: ", err);
        res.send({
          errorCode: 403,
          errorMessage: "Nem sikerült az adatbázisba írás!",
        });
      } else {
        let insertedRecord = result[0]; // Assuming the newly inserted record is the first element in the result array
        res.send(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ errorCode: 401, errorMessage: "Sikertelen rögzítés" });
  }
});

function letezoKonyv(req, res, next) {
  let bookId = req.params.id;
  //-- megvizsgáljuk létezik-e ilyen könyv
  let sql = mysql.format("SELECT * FROM `books` WHERE `id`=?", [bookId]);
  connection.query(sql, function (err, result) {
    if (result.length == 1) {
      //-- a könyv létezik
      next();
    } else {
      res.send({ errorCode: 404, errorMessage: "Nem létező könyv!" });
    }
  });
}

function kolcsonozheto(req, res, next) {
  let bookId = req.params.id;
  //-- megvizsgáljuk van-e az adott könyre kölcsönzés
  let sql = mysql.format(
    "SELECT * FROM `rentals` WHERE `book_id`=? AND CURDATE() BETWEEN `start_date` AND `end_date`",
    [bookId]
  );
  connection.query(sql, function (err, result) {
    if (result.length == 0) {
      //-- a könyvre nics kölcsönzés
      next();
    } else {
      res.send({ errorCode: 409, errorMessage: "A könyv ki van kölcsönözve!" });
      console.log(result[0]);
    }
  });
}

//-- figyelést elindítja
app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port:", PORT);
});
