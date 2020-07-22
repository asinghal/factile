const express = require('express');
const router  = express.Router();
const Surveys = require('./');
const Participants = require('../participants');
const SurveyResponses = require('../surveyresponses');
const { sendResponse } = require('../utils/express-sugar');

/**
 * @apiDefine Survey
 * 
 * @apiSuccess {String} surveyId  Survey ID of the survey to be retrieved
 * @apiSuccess {String} name Survey name
 * @apiSuccess {String} accessType Survey access type (one of: Open, Email)
 * @apiSuccess {String} hash_string random string used to identify directory to keep associated artefacts
 * @apiSuccess {String} language Survey language
 * @apiSuccess {String} logo Logo URI
 * @apiSuccess {String[]} owner Array of email addresses for users that have a "write access" to this survey
 * @apiSuccess {String} status Survey status (one of: Draft, Live, Closed)
 * @apiSuccess {String} thank_you_text "Thank you" text to act as the last page of the survey
 * @apiSuccess {String} uri Friendly URI for the survey
 * @apiSuccess {String} [intro_text] Survey introduction text to be used as a "welcome" page
 * @apiSuccess {Object} layout layout details
 * @apiSuccess {String} [layout[logoAlignment]] logo position (one of: left, right, center)
 * @apiSuccess {Boolean} [layout[includeProgress]] Include progress bar
 * @apiSuccess {String} [layout[bodycolor]] Main background color
 * @apiSuccess {String} [layout[containercolor]] Background color for main survey content
 * @apiSuccess {String} [layout[textColor]] Text Color
 * @apiSuccess {String} [layout[logoBgColor]] Logo background color
 * @apiSuccess {Object} history Change history
 * @apiSuccess {String} history[created_at] Timestamp when the survey was created
 * @apiSuccess {String} history[created_by] Email address of the user who created the survey
 * @apiSuccess {String} history[updated_at] Timestamp when the survey was last updated
 * @apiSuccess {String} history[updated_by] Email address of the user who last updated the survey
 * @apiSuccess {Object[]} pages Array of pages
 * @apiSuccess {Object[]} pages[questions] Array of questions
 * @apiSuccess {String} questions[questionId] Question Id
 * @apiSuccess {Object[]} questions[texts] Array of texts
 * @apiSuccess {String} questions[texts][text] Text
 * @apiSuccess {String} questions[texts][language] Language
 * @apiSuccess {String} questions[qType] question type
 * @apiSuccess {Boolean} questions[mandatory] Indicates if an answer is required for this question
 * @apiSuccess {Object[]} [questions[dimensions]] Only applicable for "ratings" questions. These form the rows on the table and warrant an answer.
 * @apiSuccess {Object[]} [questions[options]] List of options for radio, checkbox, ranking or ratings questions. In ratings, these form the columns.
 * @apiSuccess {Boolean} [questions[hasOther]] Show an "other" option and associated text box
 * @apiSuccess {Object} [questions[otherBox]] Label for the "other" text box
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          "accessType": ".",
 *          "hash_string": ".",
 *          "history": {
 *              "created_at": ".",
 *              "created_by": ".",
 *              "updated_at": ".",
 *              "updated_by": "."
 *          },
 *          "intro_text": "",
 *          "language": ".",
 *          "layout": {
 *              "logoAlignment": ".",
 *              "includeProgress": true,
 *              "bodycolor": ".",
 *              "containercolor": ".",
 *              "textColor": ".",
 *              "logoBgColor": "."
 *          },
 *          "logo": ".",
 *          "name": ".",
 *          "owner": [
 *              ".", "."
 *          ],
 *          "status": ".",
 *          "surveyId": ".",
 *          "thank_you_text": ".",
 *          "uri": "",
 *          "pages": [
 *              {
 *                  "questions": [
 *                      {
 *                           "questionId": ".",
 *                           "texts": [
 *                              {
 *                                   "text": ".",
 *                                   "language": "."
 *                               }
 *                           ],
 *                           "mandatory": false,
 *                           "qType": "."
 *                      }
 *                  ]
 *              }
 *          ]
 *       }
 */

/**
 * @api {get} /api/public/surveys/:id/render Render Survey
 * @apiDescription Generates a renderable view of a survey with questions organized by pages. Also checks that the respondent has access to the survey. Note that this API does not check for the status as it can be used for live as well as preview modes.
 * @apiName RenderSurvey
 * @apiGroup Survey
 *
 * @apiParam {String} id Survey ID of the survey to be retrieved
 *
 * @apiUse Survey
 * 
 * @apiError {String} 403 Error message
 * @apiError {String} 404 Error message
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
 * @apiUse Survey
 *
 * @apiError {String} 404 Error message
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
