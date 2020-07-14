const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./lib/passport');

const { config } = require('./lib/config.js');
const surveys = require('./lib/surveys/routes');
const surveyUploads = require('./lib/surveys/upload');
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

app.use('/api/surveys', passport.authenticate('jwt', {session: false}), surveys);
app.use('/api/surveyresponses', passport.authenticate('jwt', {session: false}), surveyResponses);
app.use('/api/participants', passport.authenticate('jwt', {session: false}), participants);
app.use('/api/userdetails', passport.authenticate('jwt', {session: false}), users);
app.use('/api/public/surveys', unsecureSurveyRoutes);
app.use('/api/public/surveyresponses', unsecureSurveyResponseRoutes);
app.use('/api/uploads', passport.authenticate('jwt', {session: false}), surveyUploads);
app.use('/api/', auth);

app.get('/', (req, res) => res.send('OK'))


const port = config.server.port;

app.listen(port, () => console.log(`Factile API listening at http://localhost:${port}`))
