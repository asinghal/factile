const express = require('express');
const router  = express.Router();
const Users = require('./');
const { sendResponse } = require('../utils/express-sugar');

router.put('/password', (req, res) => Users.updatePassword(req.user.email, req.body.password).then((data) => res.send(data)).catch(() => sendResponse(res, 400, { message: 'Bad inputs' })));

module.exports = router;
