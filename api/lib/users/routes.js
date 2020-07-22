const express = require('express');
const router  = express.Router();
const Users = require('./');
const { sendResponse } = require('../utils/express-sugar');

/**
 * @api {put} /api/userdetails/password Change password
 * @apiDescription Change password for the logged in user. This will also trigger an email notification.
 * @apiName ChangePassword
 * @apiGroup User
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 * @apiParam {String} password Password that should be set for the user profile
 *
 * @apiSuccess {String} message  static message confirming the change
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "OK"
 *     }
 *
 * @apiError {String} 400 Indicates validation failure of the inputs
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Bad Inputs"
 *     }
 */
router.put('/password', (req, res) => Users.updatePassword(req.user.email, req.body.password).then((data) => res.send({ message: 'OK' })).catch(() => sendResponse(res, 400, { message: 'Bad inputs' })));

module.exports = router;
