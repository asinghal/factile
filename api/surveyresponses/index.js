const db = require('../db');

const findBySurveyId = (surveyId) => db.findOne('surveyresponses', { surveyId });

module.exports = { findByOwner, findBySurveyId };
