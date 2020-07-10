const express = require('express');
const router  = express.Router();
const { authorize } = require('../surveys/acl.js');
const SurveyResponses = require('./');

router.get('/surveys/:surveyId', (req, res) => authorize(req, res, ((survey) => SurveyResponses.findBySurveyId(req.params.surveyId).then((data) => res.send(SurveyResponses.groupByQuestions(survey, data))))));
router.get('/surveys/:surveyId/excel', (req, res) => authorize(req, res, ((survey) => SurveyResponses.findBySurveyId(req.params.surveyId).then((data) => res.send(SurveyResponses.formatForDownload(survey, data)) ))));
router.get('/surveys/:surveyId/:id', (req, res) => authorize(req, res, (() => SurveyResponses.findById(req.params.surveyId, req.params.id).then((data) => res.send(data)))));
router.post('/surveys/:surveyId/responses', (req, res) => SurveyResponses.save(req.params.surveyId, null, req.body).then((data) => res.send(data)).catch(e => { res.status(400); return res.send('error'); }));
router.put('/surveys/:surveyId/responses/:responseId', (req, res) => SurveyResponses.save(req.params.surveyId, req.params.responseId, req.body).then((data) => res.send(data)).catch(e => { res.status(400); return res.send('error'); }));

module.exports = router;
