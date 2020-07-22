const express = require('express');
const router  = express.Router();
const SurveyResponses = require('./');


/**
 * @api {post} /api/public/surveyresponses/surveys/:surveyId/responses Save responses
 * @apiDescription Save survey responses
 * @apiName Save responses
 * @apiGroup Responses
 */
router.post('/surveys/:surveyId/responses', (req, res) => SurveyResponses.save(req.params.surveyId, null, req.body).then((data) => res.send(data)).catch(e => { res.status(400); return res.send('error'); }));

/**
 * @api {put} /api/public/surveyresponses/surveys/:surveyId/responses/:responseId Update Responses
 * @apiDescription Update survey responses by id
 * @apiName Update Responses
 * @apiGroup Responses
 */
router.put('/surveys/:surveyId/responses/:responseId', (req, res) => SurveyResponses.save(req.params.surveyId, req.params.responseId, req.body).then((data) => res.send(data)).catch(e => { res.status(400); return res.send('error'); }));

module.exports = router;
