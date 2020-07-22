const express = require('express');
const router  = express.Router();
const { authorize } = require('../surveys/acl.js');
const SurveyResponses = require('./');

/**
 * @api {get} /api/surveyresponses/surveys/:surveyId Get Responses
 * @apiDescription Get existing survey responses
 * @apiName Get Responses
 * @apiGroup Responses
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 * @apiError {String} 403 The logged in user does not have access to this survey
 */
router.get('/surveys/:surveyId', (req, res) => authorize(req, res, ((survey) => SurveyResponses.findBySurveyId(req.params.surveyId).then((data) => res.send(SurveyResponses.groupByQuestions(survey, data))))));

/**
 * @api {get} /api/surveyresponses/surveys/:surveyId/excel Export View
 * @apiDescription Organize responses such that they can be exported to MS Excel
 * @apiName Responses Export View
 * @apiGroup Responses
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 * @apiError {String} 403 The logged in user does not have access to this survey
 */
router.get('/surveys/:surveyId/excel', (req, res) => authorize(req, res, ((survey) => SurveyResponses.findBySurveyId(req.params.surveyId).then((data) => res.send(SurveyResponses.formatForDownload(survey, data)) ))));

/**
 * @api {post} /api/surveyresponses/surveys/:surveyId/analytics Generate Analytics
 * @apiDescription Get a list of survey participants. Note that this will only have data in case of "email" access surveys
 * @apiName Generate Analytics
 * @apiGroup Responses
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 * @apiError {String} 403 The logged in user does not have access to this survey
 */
router.post('/surveys/:surveyId/analytics', (req, res) => authorize(req, res, ((survey) => SurveyResponses.generateReport(survey, req.body.questions, req.body.constraints).then((data) => res.send(data)))));

/**
 * @api {delete} /api/surveyresponses/surveys/:surveyId Delete Responses
 * @apiDescription Delete all responses for a survey
 * @apiName Delete Responses
 * @apiGroup Responses
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 * @apiError {String} 403 The logged in user does not have access to this survey
 */
router.delete('/surveys/:surveyId', (req, res) => authorize(req, res, (() => SurveyResponses.deleteAll(req.params.surveyId).then((data) => res.send(data)))));
module.exports = router;
