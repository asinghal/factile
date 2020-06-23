const db = require('../db');

const findByOwner = (owner) => db.find('surveys', { owner }, {}, { name: 1, surveyId: 1, status: 1 });

const findById = (surveyId) => db.findOne('surveys', { surveyId });

const registerRoutes = (app) => {
    app.get('/surveys', (req, res) => findByOwner('a@a.com').then((data) => res.send(data)));
    app.get('/surveys/:id', (req, res) => findById(req.params.id).then((data) => res.send(data)));
};

module.exports = { findByOwner, findById, registerRoutes };
