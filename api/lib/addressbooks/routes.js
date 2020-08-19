const express = require('express');
const router  = express.Router();
const AdressBooks = require('./');

/**
 * @api {get} /api/addressbooks Get Addressbook
 * @apiDescription Get an existing addressbook for the logged in user
 * @apiName Get Addressbook
 * @apiGroup Addressbook
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 *
 * @apiSuccess {Object} addressbook Addressbook
 * @apiSuccess {String} addressbook[owner] Owner email address of the addressbook
 * @apiSuccess {Object[]} addressbook[groups] Array of groups
 * @apiSuccess {String} groups[name] Name of the group
 * @apiSuccess {Object[]} groups[addresses] List of addresses
 * @apiSuccess {String} addresses[name] Name of the contact
 * @apiSuccess {String} addresses[email] Email address of the contact
 */
router.get('/', (req, res) => AdressBooks.findByOwner(req.user.email).then((data) => res.send(data || {})));

/**
 * @api {get} /api/addressbooks/groups Get Address Groups
 * @apiDescription Get group names in an existing addressbook for the logged in user
 * @apiName Get Address Groups
 * @apiGroup Addressbook
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 *
 * @apiSuccess {String[]} groups Array of group names
 */
router.get('/groups', (req, res) => AdressBooks.findGroupsByOwner(req.user.email).then((data) => res.send(data || [])));

/**
 * @api {get} /api/addressbooks/groups/:name Get Addresses for Group
 * @apiDescription Get all address entries associated with a group name in an existing addressbook for the logged in user
 * @apiName Get Addresses for Group
 * @apiGroup Addressbook
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 *
 * @apiSuccess {Object[]} addresses Array of addresses
 * @apiSuccess {String} addresses[name] Name of the contact
 * @apiSuccess {String} addresses[email] Email address of the contact
 */
router.get('/groups/:name', (req, res) => AdressBooks.findAddressesByOwnerAndGroup(req.user.email, req.params.name).then((data) => res.send(data || {})));

/**
 * @api {post} /api/addressbooks Save Addressbook
 * @apiDescription Creates or updates an addressbook for the logged in user
 * @apiName Save Addressbook
 * @apiGroup Addressbook
 *
 * @apiHeader {String} Authorization "Bearer token" where token is the value returned by Login API
 *
 * @apiSuccess {Object} confirmation static conformation message
 */
router.post('/', (req, res) => AdressBooks.saveOrUpdate(req.user.email, req.body).then((data) => res.send(data)));

module.exports = router;
