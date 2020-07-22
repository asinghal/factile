const express = require('express');
const router  = express.Router();
const Surveys = require('./');
const { authorize } = require('./acl');
const { sendResponse } = require('../utils/express-sugar');

/**
 * @api {get} /api/surveys List surveys
 * @apiDescription Get a list of all surveys for the logged in user
 * @apiName List Surveys
 * @apiGroup Survey
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 *
 * @apiSuccess {Object[]} surveys List of surveys
 * @apiSuccess {String} survey[name] Survey name
 * @apiSuccess {String} survey[status] Survey status (one of: Draft, Live, Closed)
 * @apiSuccess {String} survey[surveyId] Survey ID of the survey to be retrieved
 * @apiSuccess {Object} survey[history] Change history
 * @apiSuccess {String} history[created_at] Timestamp when the survey was created
 * @apiSuccess {String} history[created_by] Email address of the user who created the survey
 * @apiSuccess {String} history[updated_at] Timestamp when the survey was last updated
 * @apiSuccess {String} history[updated_by] Email address of the user who last updated the survey
 */
router.get('/', (req, res) => Surveys.findByOwner(req.user.email).then((data) => res.send(data)));

/**
 * @api {get} /api/surveys/:id Get Survey by ID
 * @apiDescription Find a survey by survey id
 * @apiName Get Survey
 * @apiGroup Survey
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 */
router.get('/:id', (req, res) => Surveys.findByIdAndOwner(req.user.email, req.params.id).then((data) => res.send(data)));

/**
 * @api {post} /api/surveys Create Survey
 * @apiDescription Create a new survey
 * @apiName Create Survey
 * @apiGroup Survey
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 */
router.post('/', (req, res) => Surveys.saveOrUpdate(req.user.email, req.body).then((data) => res.send(data)));

/**
 * @api {put} /api/:surveyId Update Survey
 * @apiDescription Update a survey
 * @apiName Update Survey
 * @apiGroup Survey
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 */
router.put('/:surveyId', (req, res) => authorize(req, res, (() => Surveys.saveOrUpdate(req.user.email, req.body).then((data) => res.send(data)))));

/**
 * @api {delete} /api/:surveyId Delete Survey
 * @apiDescription Delete a survey
 * @apiName Delete Survey
 * @apiGroup Survey
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 */
router.delete('/:surveyId', (req, res) => authorize(req, res, (() => Surveys.deleteMe(req.params.surveyId).then((data) => res.send(data)))));

/**
 * @api {post} /api/:id/invite Invite audience
 * @apiDescription Invite audience to the survey and send emails
 * @apiName Invite Audience
 * @apiGroup Survey
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 */
router.post('/:id/invite', (req, res) => Surveys.findByIdAndOwner(req.user.email, req.params.id).then((data) => {
    if (!data) {
        res.status(401);
        return res.send('error');
    }
    Surveys.saveOrUpdate(req.user.email, {...data, status: 'Live' }).then(() => {
        Surveys.invite(req.user.email, req.params.id, data.accessType === 'open', req.body);
        return res.send({ message: 'sent' });
    });
}).catch(e => sendResponse(res, 500, 'error')));

module.exports = router;
