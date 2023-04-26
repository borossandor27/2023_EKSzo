const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.end('Welcome!');
})

app.get('/tel', function (req, res) {
    res.sendFile("tel.html");
});

app.get('/nyar', function (req, res) {
    res.sendFile("public/nyar.html");
})
app.listen(3000);
