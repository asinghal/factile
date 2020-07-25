const db = require('../../lib/db');
const users = require('../../lib/users');
const mail = require('../../lib/mail');

const sinon = require('sinon');

describe('user model tests', () => {
    let mockDB, mockMail;

    beforeEach(() => {
        mockDB = sinon.mock(db);
        mockMail = sinon.mock(mail);
    });
    
    afterEach(() => {
        mockDB.verify();
        mockDB.restore();
        mockMail.verify();
        mockMail.restore();
    });

    describe('find user', () => {
        
        test('findByEmail', done => {
            const email = 'a@a.com';
            const dummyUser = { email };
            mockDB.expects('findOne').once().resolves(dummyUser);
        
            users.findByEmail(email).then(found => {
                expect(found.email).toBe(email);
                expect(found).toBe(dummyUser);
                done();
            });
        });
    });

    describe('login', () => {
        test('successful login', done => {
            const email = 'a@a.com';
            const password = 'testdummy01';
            const dummyUser = { email };
            mockDB.expects('findOne').once().resolves(dummyUser);

            users.login(email, password).then(found => {
                expect(found).toBe(dummyUser);
                done();
            });
        });

        test('failed login', done => {
            const email = 'a@a.com';
            const password = 'testdummy02';
            const dummyUser = { email };
            mockDB.expects('findOne').once().resolves(null);

            users.login(email, password).then(found => {
                expect(found).toBe(null);
                done();
            });
        });
    });

    describe('forgot password', () => {
        test('resetPassword', done => {
            const email = 'a@test.com';
            const dummyUser = { email };
            mockDB.expects('findOne').once().resolves(dummyUser);
            mockDB.expects('save').once().resolves({message: 'OK'});
            mockMail.expects('send').once().returns(null);

            users.resetPassword(email).then((data) => {
                expect(data).not.toBe(null);
                done();
            });
        });

        test('resetPassword should fail without valid inputs', done => {

            users.resetPassword(null).catch((e) => {
                expect(e).not.toBe(null);
                done();
            });
        });
    });

    describe('create user', () => {
        test('create a new user', done => {
            const user = { email: 'a@test.com', password: 'password' };
            mockDB.expects('save').once().resolves({message: 'OK'});
            mockMail.expects('send').once().returns(null);

            users.create(user).then((data) => {
                expect(data).not.toBe(null);
                done();
            });
        });

        test('create a new user should fail without valid inputs', done => {
            const user = { email: 'a@test.com' };

            users.create(user).catch((e) => {
                expect(e).not.toBe(null);
                done();
            });
        });
    });
});
