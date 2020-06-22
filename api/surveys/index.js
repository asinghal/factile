const db = require('../db');

const findByOwner = (owner) => db.findOne('surveys', { owner });

const findById = (surveyId) => db.findOne('surveys', { surveyId });

module.exports = { findByOwner, findById };
