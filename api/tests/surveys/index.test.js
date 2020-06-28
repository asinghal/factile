const db = require('../../db');
const surveys = require('../../surveys');
const sinon = require('sinon');
const ObjectID = require('mongodb').ObjectID;

describe('survey model tests', () => {
    let mockDB;

    beforeEach(() => {
        mockDB = sinon.mock(db);
    });
    
    afterEach(() => {
        mockDB.verify();
        mockDB.restore();
    });
    
    test('findByOwner where owner matches the input', done => {
        const name = 'Test Survey';
        const owner = 'a@a.com';
        const surveyId = 'abc1-2345-6789';
        const dummySurvey = { _id: new ObjectID(), name, surveyId, owner};
        mockDB.expects('find').once().resolves([ dummySurvey ]);
    
        surveys.findByOwner(owner).then(found => {
            expect(found).not.toBeNull();
            expect(found.length).toBe(1);
            expect(found[0]).toBe(dummySurvey);
            done();
        });
    });
    
    test('findByOwner where owner does not match the input', done => {
        const owner = 'a@a.com';
        mockDB.expects('find').once().resolves([]);
    
        surveys.findByOwner(owner).then(found => {
            expect(found).not.toBeNull();
            expect(found.length).toBe(0);
            done();
        });
    });
    
    test('findByID success', done => {
        const name = 'Test Survey';
        const surveyId = 'abc1-2345-6789';
        const owner = 'a@a.com';
        const dummySurvey = { _id: new ObjectID(), name, surveyId, owner};
        mockDB.expects('findOne').once().resolves(dummySurvey);
    
        surveys.findById(surveyId).then(found => {
            expect(found).toBe(dummySurvey);
            done();
        });
    });

    test('findByID failure', done => {
        const surveyId = 'xyz1-2345-6789';
        mockDB.expects('findOne').once().resolves(null);
    
        surveys.findById(surveyId).then(found => {
            expect(found).toBeNull();
            done();
        });
    });
});
