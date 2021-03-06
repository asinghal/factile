const crypto = require('crypto');
const db = require('../db');
const mail = require('../mail');
const { validateInputs } = require('../utils/validation');

const findByEmail = (email) => db.findOne('users', { email });

const encrypt = (password) => {
    const hash = crypto.createHash('sha512');
    hash.update(password);

    return hash.digest('utf8');
};

const randomPassword = () => 
    Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);

const login = (email, password) => db.findOne('users', { email, password: encrypt(password) }, { password: 0 });

const _updatePassword = (email, password, sendMail) => {
    return validateInputs([email, password], () => {
        return findByEmail(email).then(user => db.save('users', { ...user, password: encrypt(password) }, 'email') ).then((data) => {
            sendMail();
            return data;
        });
    });
};

const resetPassword = (email) => {
    const newPass = randomPassword();
    return _updatePassword(email, newPass, () => {
        mail.send(email, null, null, null, 'Your temporary password', 'forgotPassword', { newPass });
    });
};

const updatePassword = (email, password) => {
    return _updatePassword(email, password, () => {
        mail.send(email, null, null, null, 'Your password has been changed', 'changePassword', {});
    });
};

const create = (user) => {
    return validateInputs([user, user.email, user.password], () => {
        return db.save('users', { ...user, password: encrypt(user.password) }, 'email').then((data) => {
            mail.send(user.email, null, null, null, 'Welcome to Factile', 'newUser', {});
            return data;
        });
    });
};

module.exports = { findByEmail, login, resetPassword, updatePassword, create, randomPassword };
