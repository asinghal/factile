const db = require('../db');

const findBySurveyId = (surveyId) => db.findOne('participants', { surveyId });

module.exports = { findByOwner, findBySurveyId };
