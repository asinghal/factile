const db = require('../db');

const findByOwner = (owner) => db.find('surveys', { owner }, {}, { name: 1, surveyId: 1, status: 1 });

const findById = (surveyId) => db.findOne('surveys', { surveyId });

module.exports = { findByOwner, findById };
