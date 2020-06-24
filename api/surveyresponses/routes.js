const express = require('express');
const router  = express.Router();
const { authorize } = require('../surveys/acl.js');
const SurveyResponses = require('./');

router.get('/:surveyId', (req, res) => authorize(req, res, (() => SurveyResponses.findBySurveyId(req.params.surveyId).then((data) => res.send(data)))));
router.get('/:surveyId/:id', (req, res) => authorize(req, res, (() => SurveyResponses.findById(req.params.surveyId, req.params.id).then((data) => res.send(data)))));

module.exports = router;
