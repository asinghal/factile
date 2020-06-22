const db = require('../db');

test('list', done => {
    db.list('users').then(users => {
        expect(users.length).not.toBe(0);
        done();
    });
});

test('find', done => {
    db.find('users', { email: 'a@a.com'}).then(users => {
        expect(users.length).not.toBe(0);
        expect(users[0].email).toBe('a@a.com');
        done();
    });
});

test('findOne', done => {
    db.findOne('users', { email: 'a@a.com'}).then(users => {
        expect(users.email).toBe('a@a.com');
        done();
    });
});