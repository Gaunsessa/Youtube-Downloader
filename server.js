var express = require('express');
var app = express();
var youtubedl = require('youtube-dl');

const PORT = 80;

app.get('/', function(req, res) {
    res.send('yeet227');
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));