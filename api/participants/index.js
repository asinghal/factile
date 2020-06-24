const db = require('../db');

const findBySurveyId = (surveyId) => db.find('participants', { surveyId });

module.exports = { findBySurveyId };
