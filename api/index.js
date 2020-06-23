const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const { config } = require('./config.js');
const Surveys = require('./surveys');
const Users = require('./users');

const app = express()
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 9000

app.get('/', (req, res) => res.send('OK'))

Surveys.registerRoutes(app);
Users.registerRoutes(app);

app.listen(port, () => console.log(`Factile API listening at http://localhost:${config.server.port}`))
