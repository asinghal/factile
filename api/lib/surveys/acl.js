const Surveys = require('./');

const authorize = (req, res, fn) => Surveys.findByIdAndOwner(req.user.email, req.params.surveyId).then((survey) => {
    if (!survey || !survey.surveyId) {
        return res.status(403).send({error: 'Unauthorized access'});
    }
    return fn(survey);
});

module.exports = { authorize };
