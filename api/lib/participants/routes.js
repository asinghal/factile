const express = require('express');
const router  = express.Router();
const Participants = require('./');
const { authorize } = require('../surveys/acl.js');

/**
 * @api {get} /api/participants/:surveyId Get Participants
 * @apiDescription Get a list of survey participants. Note that this will only have data in case of "email" access surveys
 * @apiName Get Participants
 * @apiGroup Participants
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 * @apiError {String} 403 The logged in user does not have access to this survey
 */
router.get('/:surveyId', (req, res) => authorize(req, res, () => Participants.findBySurveyId(req.params.surveyId).then((data) => res.send(data))));

module.exports = router;
