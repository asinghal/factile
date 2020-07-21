const express = require('express');
const router  = express.Router();
const { authorize } = require('../surveys/acl.js');
const SurveyResponses = require('./');

router.get('/surveys/:surveyId', (req, res) => authorize(req, res, ((survey) => SurveyResponses.findBySurveyId(req.params.surveyId).then((data) => res.send(SurveyResponses.groupByQuestions(survey, data))))));
router.get('/surveys/:surveyId/excel', (req, res) => authorize(req, res, ((survey) => SurveyResponses.findBySurveyId(req.params.surveyId).then((data) => res.send(SurveyResponses.formatForDownload(survey, data)) ))));
router.post('/surveys/:surveyId/analytics', (req, res) => authorize(req, res, ((survey) => SurveyResponses.generateReport(survey, req.body.questions, req.body.constraints).then((data) => res.send(data)))));
router.delete('/surveys/:surveyId', (req, res) => authorize(req, res, (() => SurveyResponses.deleteAll(req.params.surveyId).then((data) => res.send(data)))));
module.exports = router;
