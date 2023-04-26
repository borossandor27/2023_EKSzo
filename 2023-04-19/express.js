const express = require('express');
const app = express();
const path = require('path');
//app.use(express.static('public'));
const mysql = require('mysql');


app.get('/nyar', function (req, res) {
    res.sendFile('nyar.html', {root: 'public'});
})
app.get('/tel', function (req, res) {
    res.sendFile('tel.html', {root: 'public'});
})

app.listen(3000);