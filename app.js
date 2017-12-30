const express = require('express');
const app = express();
const Bot = require('./config/bot-config');

Bot();

app.listen(3000, () => {
    console.log('Server started on port 3000...')
});