const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

const findBySurveyId = (surveyId) => db.find('surveyresponses', { surveyId });
const findById = (surveyId, id) => db.findOne('surveyresponses', { surveyId, _id: new ObjectID(id) });

module.exports = { findById, findBySurveyId };
