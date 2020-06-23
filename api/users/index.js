const db = require('../db');
const crypto = require('crypto');

const ObjectID = require('mongodb').ObjectID;

const findByEmail = (email) => db.findOne('users', { email });

const findById = (id) => db.findOne('users', { _id: new ObjectID(id) });

const encrypt = (password) => {
    const hash = crypto.createHash('sha512');
    hash.update(password);

    return hash.digest('utf8');
};

const randomPassword = () => 
    Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);

const login = (email, password) => db.findOne('users', { email, password: encrypt(password) });

const resetPassword = () => randomPassword();

const registerRoutes = (app) => {
    app.post('/login', (req, res) => {
        const { email, password } = req.body;
        return login(email, password).then((data) => {
            if (!data) {
                res.status(403);
            }
            return res.send(data || {});
        })
    });
};

module.exports = { findByEmail, findById, login, resetPassword, registerRoutes };
