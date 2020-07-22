const express = require('express');
const router  = express.Router();
const Surveys = require('./');
const Participants = require('../participants');
const SurveyResponses = require('../surveyresponses');
const { sendResponse } = require('../utils/express-sugar');

/**
 * @api {get} /api/public/surveys/:id/render Render Survey
 * @apiDescription Generates a renderable view of a survey with questions organized by pages. Also checks that the respondent has access to the survey. Note that this API does not check for the status as it can be used for live as well as preview modes.
 * @apiName RenderSurvey
 * @apiGroup Survey
 *
 * @apiParam {String} id Survey ID of the survey to be retrieved
 *
 * @apiUse SurveyView
 * 
 * @apiError {String} 403 The respondent does not have permissions to access this survey
 * @apiError {String} 404 Survey not found
 *
 * @apiErrorExample Error-Response-403:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "Unauthorized access"
 *     }
 * @apiErrorExample Error-Response-404:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "error"
 *     }
 */
router.get('/:id/render', (req, res) => Surveys.findById(req.params.id).then((data) => {
    if (!data) {
        return sendResponse(res, 404, { error: 'error' });
    }

    const id = req.params.id;
    const respId = req.query.respId;
    const sendSurvey = () => res.send(Surveys.groupByPages(data));

    if (data.accessType === 'email') {
        return Participants.findBySurveyIdAndRespId(id, respId).then(participant => {
            if (!participant || participant.status === 'Completed') {
                throw Error('either the response id does not exist or the participant has already completed the survey');
            }
            return sendSurvey();
        }).catch(e => sendResponse(res, 403, { error: 'Unauthorized access' }));
    }

    return sendSurvey();
}));

/**
 * @api {get} /api/public/surveys/:id/apply/responses/:responseId Answer Piping
 * @apiDescription Applies the responses captures so far to fulfil any questions expecting answer piping. Delivers a renderable view of a survey with questions organized by pages.
 * @apiName Answer Piping
 * @apiGroup Survey
 *
 * @apiParam {String} id Survey ID of the survey to be retrieved
 * @apiParam {String} responseId Response ID for the session in progress
 *
 * @apiUse SurveyView
 *
 * @apiError {String} 404 Survey not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "error"
 *     }
 */
router.get('/:id/apply/responses/:responseId', (req, res) => Surveys.findById(req.params.id).then((data) => {
    if (!data) {
        res.status(404);
        return res.send('error');
    }

    return SurveyResponses.findById(req.params.id, req.params.responseId).then((surveyResponse) => {
        const survey = SurveyResponses.applyToSurveyTexts(data, surveyResponse);
        return res.send(Surveys.groupByPages(survey));
    });
}));

module.exports = router;
