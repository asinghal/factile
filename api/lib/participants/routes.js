const express = require('express');
const router  = express.Router();
const Participants = require('./');
const { authorize } = require('../surveys/acl.js');

router.get('/:surveyId', (req, res) => authorize(req, res, () => Participants.findBySurveyId(req.params.surveyId).then((data) => res.send(data))));

module.exports = router;
