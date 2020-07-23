const { config } = require('../config');
const passport = require('passport');
const { findOrCreateUser } = require('../passport');

const onOauthSuccess = (req, res) => {
    if (req.user && req.user.emails && req.user.emails.length) {
        const email = req.user.emails[0].value;
        return findOrCreateUser(email).then(token => res.redirect(`${config.baseURL.ui}/oauth/${token}`));
    }
    return res.redirect(`${config.baseURL.ui}/`);
};

const routes = (app) => {

    /**
     * @api {get} /api/auth/google Google Initiator
     * @apiDescription Calls Google resulting in a transfer of authentication control to Google, hence showing the Google login page
     * @apiName Google Initiator
     * @apiGroup Authentication
     */
    app.get('/api/auth/google',  passport.authenticate('google', { scope: ['email'] }));

    /**
     * @api {get} /api/google Google Redirect
     * @apiDescription Receives the login result from Google, generates an authentication token and redirects the response to {UI}/oauth/{token} such that the token can be stored by the UI for subsequent API calls.
     * @apiName Google Redirect
     * @apiGroup Authentication
     */
    app.get('/api/google', passport.authenticate('google'), onOauthSuccess);

    /**
     * @api {get} /api/auth/facebook Facebook Initiator
     * @apiDescription Calls Facebook resulting in a transfer of authentication control to Facebook, hence showing the Facebook login page
     * @apiName Facebook Initiator
     * @apiGroup Authentication
     */
    app.get('/api/auth/facebook',  passport.authenticate('facebook', { scope: ['email'] }));

    /**
     * @api {get} /api/facebook Facebook Redirect
     * @apiDescription Receives the login result from Facebook, generates an authentication token and redirects the response to {UI}/oauth/{token} such that the token can be stored by the UI for subsequent API calls.
     * @apiName Facebook Redirect
     * @apiGroup Authentication
     */
    app.get('/api/facebook', passport.authenticate('facebook'), onOauthSuccess);
};

module.exports = routes;