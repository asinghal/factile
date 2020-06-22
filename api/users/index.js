const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

const findByEmail = (email) => db.findOne('users', { email });

const findById = (id) => db.findOne('users', { _id: new ObjectID(id) });

const login = (email, password) => db.findOne('users', { email, password });

module.exports = { findByEmail, findById, login };
