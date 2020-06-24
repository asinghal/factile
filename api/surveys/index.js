const db = require('../db');

const findByOwner = (owner) => db.find('surveys', { owner }, {}, { name: 1, surveyId: 1, status: 1 });

const findById = (owner, surveyId) => db.findOne('surveys', { owner, surveyId });

module.exports = { findByOwner, findById };
