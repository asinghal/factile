const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const passport = require('passport');
const pino = require('pino-http')();
const Sentry = require('@sentry/node');

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

const { findOrCreateUser } = require('./lib/passport');

if (process.env.NODE_ENV === 'production') {
    Sentry.init({ dsn: config.sentry });
}

const app = express()
app.use(cors());
app.use(pino);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    cookieSession({ name: "factile-session", keys: [config.cookie_secret], maxAge: 24 * 60 * 60 * 100 })
);
  
app.use(cookieParser());
app.use(passport.initialize()); 

app.use('/api/surveys', passport.authenticate('jwt', {session: false}), surveys);
app.use('/api/surveyresponses', passport.authenticate('jwt', {session: false}), surveyResponses);
app.use('/api/participants', passport.authenticate('jwt', {session: false}), participants);
app.use('/api/userdetails', passport.authenticate('jwt', {session: false}), users);
app.use('/api/public/surveys', unsecureSurveyRoutes);
app.use('/api/public/surveyresponses', unsecureSurveyResponseRoutes);
app.use('/api/uploads', passport.authenticate('jwt', {session: false}), surveyUploads);
app.use('/api/', auth);


const onOauthSuccess = (req, res) => {
    if (req.user && req.user.emails && req.user.emails.length) {
        const email = req.user.emails[0].value;
        return findOrCreateUser(email).then(token => res.redirect(`${config.baseURL.ui}/oauth/${token}`));
    }
    return res.redirect(`${config.baseURL.ui}/`);
};

app.get('/api/auth/google',  passport.authenticate('google', { scope: ['email'] }));
app.get('/api/google', passport.authenticate('google'), onOauthSuccess);

app.get('/api/auth/facebook',  passport.authenticate('facebook', { scope: ['email'] }));
app.get('/api/facebook', passport.authenticate('facebook'), onOauthSuccess);

app.get('/api', (req, res) => res.send('OK'));
app.get('/', (req, res) => res.send('OK'));

const port = config.server.port;

app.listen(port, () => console.log(`Factile API listening at http://localhost:${port}`))
