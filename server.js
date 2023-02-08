const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use (express.json());
app.use('/api', require('./routes/api'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});