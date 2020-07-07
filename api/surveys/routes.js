const express = require('express');
const router  = express.Router();
const Surveys = require('./');

router.get('/', (req, res) => Surveys.findByOwner(req.user.email).then((data) => res.send(data)));
router.get('/:id', (req, res) => Surveys.findByIdAndOwner(req.user.email, req.params.id).then((data) => res.send(data)));
router.get('/:id/render', (req, res) => Surveys.findByIdAndOwner(req.user.email, req.params.id).then((data) => res.send(Surveys.groupByPages(data))));
router.post('/', (req, res) => Surveys.saveOrUpdate(req.user.email, req.body).then((data) => res.send(data)));
router.put('/:id', (req, res) => Surveys.saveOrUpdate(req.user.email, req.body).then((data) => res.send(data)));

module.exports = router;
