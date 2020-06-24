const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require('passport');

require('./passport');

const { config } = require('./config.js');
const surveys = require('./surveys/routes');
const auth = require('./users/auth');
const Users = require('./users');

const app = express()
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/surveys', passport.authenticate('jwt', {session: false}), surveys);
app.use('/', auth);

app.get('/', (req, res) => res.send('OK'))


const port = config.server.port;

app.listen(port, () => console.log(`Factile API listening at http://localhost:${port}`))
