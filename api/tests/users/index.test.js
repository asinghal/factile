const db = require('../../db');
const users = require('../../users');
const sinon = require('sinon');
const ObjectID = require('mongodb').ObjectID;

describe('user model tests', () => {
    let mockDB;

    beforeEach(() => {
        mockDB = sinon.mock(db);
    });
    
    afterEach(() => {
        mockDB.verify();
        mockDB.restore();
    });
    
    test('findByEmail', done => {
        const email = 'a@a.com';
        const dummyUser = { _id: new ObjectID(), email};
        mockDB.expects('findOne').once().resolves(dummyUser);
    
        users.findByEmail(email).then(found => {
            expect(found.email).toBe(email);
            expect(found).toBe(dummyUser);
            done();
        });
    });
    
    test('findByID', done => {
        const email = 'a@a.com';
        const id = 'abc123456789';
        const dummyUser = { _id: new ObjectID(id), email};
        mockDB.expects('findOne').once().resolves(dummyUser);
    
        users.findById(id).then(found => {
            expect(found).toBe(dummyUser);
            done();
        });
    });

    test('successful login', done => {
        const email = 'a@a.com';
        const password = 'testdummy01';
        const dummyUser = { _id: new ObjectID(), email};
        mockDB.expects('findOne').once().resolves(dummyUser);

        users.login(email, password).then(found => {
            expect(found).toBe(dummyUser);
            done();
        });
    });

    test('failed login', done => {
        const email = 'a@a.com';
        const password = 'testdummy02';
        const dummyUser = { _id: new ObjectID(), email};
        mockDB.expects('findOne').once().resolves(null);

        users.login(email, password).then(found => {
            expect(found).toBe(null);
            done();
        });
    });

    test('resetPassword dummy placeholder', done => {
        const newPassword = users.resetPassword();
        expect(newPassword).not.toBe(null);
        expect(newPassword.length).toBe(12);
        expect(/[A-Za-z0-9]*/.test(newPassword)).toBeTruthy();
        done();
    });
});
