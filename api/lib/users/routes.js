const express = require('express');
const router  = express.Router();
const Users = require('./');

router.put('/password', (req, res) => Users.updatePassword(req.user.email, req.body.password).then((data) => res.send(data)));

module.exports = router;
