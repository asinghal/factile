const passport = require('passport');
const express = require('express');
const router  = express.Router();
const Users = require('./');

const { generateJWT } = require('../passport');
const { sendResponse } = require('../utils/express-sugar');

/**
 * @api {post} /login Login
 * @apiDescription Login a user using email and password.
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} email Email address
 * @apiParam {String} password Password
 *
 * @apiSuccess {String} token  JWT (Token) required for accessing protected resources
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "xxxxxxxx"
 *     }
 *
 * @apiError {String} Error message
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Login failed"
 *     }
 */
router.post('/login', function (req, res) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'Login failed'
            });
        }

        req.login(user, {session: false}, (err) => {
           if (err) {
               res.status(401);
               return res.send({ error: 'Login failed' });
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = generateJWT(user);
           return res.json({ token });
        });
    })(req, res);
});

/**
 * @api {post} /users Registration
 * @apiDescription Register a new user
 * @apiName Registration
 * @apiGroup User
 *
 * @apiParam {String} email Email address
 * @apiParam {String} password Password
 *
 * @apiSuccess {String} message Static message to confirm successful registration
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "OK"
 *     }
 *
 * @apiError {String} Error message
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Bad inputs"
 *     }
 */
router.post('/users', (req, res) => Users.create(req.body).
                                            then(() => sendResponse(res, 201, { message: 'OK'})).
                                            catch(() => sendResponse(res, 400, { message: 'Bad inputs' })));

/**
 * @api {post} /users/forgotpassword Reset password
 * @apiDescription Reset password for a given email address and set password to a temporary token
 * @apiName Forgot Password
 * @apiGroup User
 *
 * @apiParam {String} email Email address
 *
 * @apiSuccess {String} message Static message to confirm successful reset
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "OK"
 *     }
 *
 * @apiError {String} Error message
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Bad inputs"
 *     }
 */
router.post('/users/forgotpassword', (req, res) => Users.resetPassword(req.body.email).
                                                        then(() => res.send({ message: 'OK'})).
                                                        catch(() => sendResponse(res, 400, { message: 'Bad inputs' })));

module.exports = router;
