const express = require('express');
const app = express();
const path = require('path');;

app.listen(3000); //-- 1024 - 65536

app.get('/', function(req, res){
    res.end('Welcome sanyi');
})

app.get('/tavasz', function(req, res){
    res.sendFile(path.join(__dirname, 'tavasz.html'));
})