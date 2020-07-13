const db = require('../db');
const uuid = require('uuid').v4;

const findBySurveyId = (surveyId) => db.find('participants', { surveyId });
const findBySurveyIdAndRespId = (surveyId, respId) => db.findOne('participants', { surveyId, respId });

const generateId = () => uuid();

const save = (surveyId, email) => {
    const respId = generateId();
    const participant = {
        surveyId, email,
        status: 'Pending',
        respId
    };

    return db.save('participants', participant, 'respId').then(() => respId);
};

const update = (surveyId, email, respId, status) => db.save('participants', {
    surveyId,
    email,
    respId,
    status
}, 'respId');

module.exports = { findBySurveyId, save, update, findBySurveyIdAndRespId };
