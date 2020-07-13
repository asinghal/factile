const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./lib/passport');

const { config } = require('./lib/config.js');
const surveys = require('./lib/surveys/routes');
const unsecureSurveyRoutes = require('./lib/surveys/unsecure-routes');
const surveyResponses = require('./lib/surveyresponses/routes');
const unsecureSurveyResponseRoutes = require('./lib/surveyresponses/unsecure-routes');
const participants = require('./lib/participants/routes');
const auth = require('./lib/users/auth');
const users = require('./lib/users/routes');

const app = express()
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/surveys', passport.authenticate('jwt', {session: false}), surveys);
app.use('/surveyresponses', passport.authenticate('jwt', {session: false}), surveyResponses);
app.use('/participants', passport.authenticate('jwt', {session: false}), participants);
app.use('/userdetails', passport.authenticate('jwt', {session: false}), users);
app.use('/public/surveys', unsecureSurveyRoutes);
app.use('/public/surveyresponses', unsecureSurveyResponseRoutes);
app.use('/', auth);

app.get('/', (req, res) => res.send('OK'))


const port = config.server.port;

app.listen(port, () => console.log(`Factile API listening at http://localhost:${port}`))
