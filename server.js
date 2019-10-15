const express = require('express');
const youtubedl = require('youtube-dl');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 80;
const WORDS = JSON.parse(fs.readFileSync('words.json'))

app.use(express.static('videos'));
app.use(express.static('imgs'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/post', (req, res) => {
    if ('url' in req.query && /https?:\/\/\S+\.\S+/.test(req.query['url'])) {
        var video = youtubedl(req.query['url']);
        var name = getFileName();

        video.pipe(fs.createWriteStream(path.join('videos/' + name + '.mp4')));

        video.on('error', function(err) {
            res.send(`<script>alert('THERE IS A ERROR NERD')</script>`);
        });

        video.on('end', function() {
            res.send(`<script>window.open('/${name}.mp4', '_self')</script>`);
        });
    } else {
        res.send(`<script>alert('INVALID STUFF COME ON MAN YOU NERD')</script>`);
    }
});

function getFileName() {
    var adj = WORDS['adjectives'][Math.floor(Math.random() * Object.keys(WORDS['adjectives']).length)];
    var verb = WORDS['nouns'][Math.floor(Math.random() * Object.keys(WORDS['nouns']).length)];
    var name = adj + verb;

    if (`${name}.mp4` in fs.readdirSync('videos')) {
        return getFileName();
    }

    return name;
}

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));