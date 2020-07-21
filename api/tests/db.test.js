const mongodb = require('mongodb');
const sinon = require('sinon');

const db = require('../lib/db');

describe('db tests', () => {

    let methodStub, clientConnectStub, clientDbStub;

    beforeEach(() => {
        clientConnectStub = sinon.stub(mongodb.MongoClient.prototype, 'connect').yields(null);
        clientDbStub = sinon.stub(mongodb.MongoClient.prototype, 'db').returns({collection: (name) => mongodb.Collection.prototype});
    });

    afterEach(() => {
        if (methodStub) {
            methodStub.restore();
        }

        clientConnectStub.restore();
        clientDbStub.restore();
    });

    test('list', done => {
        methodStub = sinon.stub(mongodb.Collection.prototype, 'find').returns({
            toArray: sinon.stub().yields(null, [{a: 1}])
        });

        db.list('somecollection').then(d => {
            expect(d.length).toBe(1);
            done();
        });
    });

    test('find', done => {
        methodStub = sinon.stub(mongodb.Collection.prototype, 'find').returns({
            toArray: sinon.stub().yields(null, [{a: 1}])
        });

        db.find('somecollection').then(d => {
            expect(d.length).toBe(1);
            done();
        });
    });

    test('findOne', done => {
        methodStub = sinon.stub(mongodb.Collection.prototype, 'findOne').yields(null, {a: 1});

        db.findOne('somecollection').then(d => {
            expect(d).not.toBeNull();
            expect(d.a).toBe(1);
            done();
        });
    });

    test('save', done => {
        methodStub = sinon.stub(mongodb.Collection.prototype, 'replaceOne').resolves({});

        db.save('somecollection', {a: 1, b: 2}, 'a').then(d => {
            expect(d).not.toBeNull();
            done();
        });
    });

    test('del', done => {
        methodStub = sinon.stub(mongodb.Collection.prototype, 'deleteMany').resolves({});

        db.del('somecollection', {a: 1, b: 2}).then(d => {
            expect(d).not.toBeNull();
            done();
        });
    });

    test('del without filters should fail', done => {
        methodStub = sinon.stub(mongodb.Collection.prototype, 'deleteMany').resolves({});

        db.del('somecollection', {}).catch(e => {
            expect(e).not.toBeNull();
            done();
        });
    });

    test('del with bad filters should fail', done => {
        methodStub = sinon.stub(mongodb.Collection.prototype, 'deleteMany').resolves({});

        db.del('somecollection', { a: null }).catch(e => {
            expect(e).not.toBeNull();
            done();
        });
    });
});