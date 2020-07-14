const express = require('express');
const router  = express.Router();
const SurveyResponses = require('./');

router.post('/surveys/:surveyId/responses', (req, res) => SurveyResponses.save(req.params.surveyId, null, req.body).then((data) => res.send(data)).catch(e => { res.status(400); return res.send('error'); }));
router.put('/surveys/:surveyId/responses/:responseId', (req, res) => SurveyResponses.save(req.params.surveyId, req.params.responseId, req.body).then((data) => res.send(data)).catch(e => { res.status(400); return res.send('error'); }));

module.exports = router;
