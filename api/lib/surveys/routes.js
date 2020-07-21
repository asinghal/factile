const express = require('express');
const router  = express.Router();
const Surveys = require('./');
const { authorize } = require('./acl');

router.get('/', (req, res) => Surveys.findByOwner(req.user.email).then((data) => res.send(data)));
router.get('/:id', (req, res) => Surveys.findByIdAndOwner(req.user.email, req.params.id).then((data) => res.send(data)));
router.post('/', (req, res) => Surveys.saveOrUpdate(req.user.email, req.body).then((data) => res.send(data)));
router.put('/:surveyId', (req, res) => authorize(req, res, (() => Surveys.saveOrUpdate(req.user.email, req.body).then((data) => res.send(data)))));
router.delete('/:surveyId', (req, res) => authorize(req, res, (() => Surveys.deleteMe(req.params.surveyId).then((data) => res.send(data)))));
router.post('/:id/invite', (req, res) => Surveys.findByIdAndOwner(req.user.email, req.params.id).then((data) => {
    if (!data) {
        res.status(401);
        return res.send('error');
    }
    Surveys.saveOrUpdate(req.user.email, {...data, status: 'Live' }).then(() => {
        Surveys.invite(req.user.email, req.params.id, data.accessType === 'open', req.body);
        return res.send({ message: 'sent' });
    });
}).catch(e => {
    res.status(500);
    return res.send('error');
}));

module.exports = router;
