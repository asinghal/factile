const crypto = require('crypto');
const db = require('../db');
const mail = require('../mail');

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

const login = (email, password) => db.findOne('users', { email, password: encrypt(password) }, { password: 0 });

const resetPassword = (email) => {
    const newPass = randomPassword();
    return findByEmail(email).then(user => db.save('users', { ...user, password: encrypt(newPass) }, 'email') ).then((data) => {
        mail.send(email, null, null, null, 'Your temporary password', `Your temporary password is ${newPass}`);
        return data;
    });
};

const create = (user) => {
    return db.save('users', { ...user, password: encrypt(user.password) }, 'email').then((data) => {
        mail.send(user.email, null, null, null, 'Welcome to Factile', `Your account has been created`);
        return data;
    });
};

module.exports = { findByEmail, findById, login, resetPassword, create };