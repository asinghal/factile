const mongodb = require('mongodb');
const sinon = require('sinon');

const db = require('../lib/db');

describe('db tests', () => {

    test('list', done => {
        const findStub = sinon.stub(mongodb.Collection.prototype, 'find').returns({
            toArray: sinon.stub().yields(null, [{a: 1}])
        });

        db.list('somecollection').then(d => {
            expect(d.length).toBe(1);
            findStub.restore();
            done();
        });
    });

    test('find', done => {
        const findStub = sinon.stub(mongodb.Collection.prototype, 'find').returns({
            toArray: sinon.stub().yields(null, [{a: 1}])
        });

        db.find('somecollection').then(d => {
            expect(d.length).toBe(1);
            findStub.restore();
            done();
        });
    });

    test('findOne', done => {
        const findStub = sinon.stub(mongodb.Collection.prototype, 'findOne').yields(null, {a: 1});

        db.findOne('somecollection').then(d => {
            expect(d).not.toBeNull();
            expect(d.a).toBe(1);
            findStub.restore();
            done();
        });
    });

    test('save', done => {
        const replaceStub = sinon.stub(mongodb.Collection.prototype, 'replaceOne').resolves({});

        db.save('somecollection', {a: 1, b: 2}, 'a').then(d => {
            expect(d).not.toBeNull();
            replaceStub.restore();
            done();
        });
    });
});