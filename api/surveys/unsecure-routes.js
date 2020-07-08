const express = require('express');
const router  = express.Router();
const Surveys = require('./');

router.get('/:id/render', (req, res) => Surveys.findById(req.params.id).then((data) => {
    if (!data) {
        res.status(404);
        return res.send('error');
    }
    return res.send(Surveys.groupByPages(data));
}));

module.exports = router;
