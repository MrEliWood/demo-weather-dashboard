const express = require('express');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// api keys
var apiKeys = [{
    googleApiKey: process.env.GOOGLE_API_KEY,
    weatherApiKey: process.env.WEATHER_API_KEY
}];

// serve api keys
app.get('/apikeys', (req, res) =>
    res.json(apiKeys)
);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));