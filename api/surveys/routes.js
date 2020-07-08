const express = require('express');
const router  = express.Router();
const Surveys = require('./');

router.get('/', (req, res) => Surveys.findByOwner(req.user.email).then((data) => res.send(data)));
router.get('/:id', (req, res) => Surveys.findByIdAndOwner(req.user.email, req.params.id).then((data) => res.send(data)));
router.get('/:id/render', (req, res) => Surveys.findByIdAndOwner(req.user.email, req.params.id).then((data) => {
    if (!data) {
        res.status(404);
        return res.send('error');
    }
    return res.send(Surveys.groupByPages(data));
}));
router.post('/', (req, res) => Surveys.saveOrUpdate(req.user.email, req.body).then((data) => res.send(data)));
router.put('/:id', (req, res) => Surveys.saveOrUpdate(req.user.email, req.body).then((data) => res.send(data)));
router.post('/:id/invite', (req, res) => Surveys.findByIdAndOwner(req.user.email, req.params.id).then((data) => {
    if (!data) {
        res.status(401);
        return res.send('error');
    }
    Surveys.invite(req.user.email, req.params.id, req.body);
    return res.send({ message: 'sent' });
}).catch(e => {
    res.status(500);
    return res.send('error');
}));

module.exports = router;
