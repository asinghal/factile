const express = require('express');
const router  = express.Router();
const Surveys = require('./');
const Participants = require('../participants');
const participants = require('../participants');

router.get('/:id/render', (req, res) => Surveys.findById(req.params.id).then((data) => {
    if (!data) {
        res.status(404);
        return res.send('error');
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
        }).catch(e => {
            res.status(401);
            return res.send('Unauthorized access');
        });
    }

    return sendSurvey();
}));

module.exports = router;
