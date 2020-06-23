const express = require('express');
const cors = require('cors')

const { config } = require('./config.js');
const Surveys = require('./surveys');

const app = express()
app.use(cors());

const port = 9000

app.get('/', (req, res) => res.send('OK'))

Surveys.registerRoutes(app);

app.listen(port, () => console.log(`Factile API listening at http://localhost:${config.server.port}`))
