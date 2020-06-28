const db = require('../../db');
const surveyResponses = require('../../surveyresponses');
const sinon = require('sinon');
const ObjectID = require('mongodb').ObjectID;

describe('survey responses model tests', () => {
    let mockDB;

    beforeEach(() => {
        mockDB = sinon.mock(db);
    });
    
    afterEach(() => {
        mockDB.verify();
        mockDB.restore();
    });
    
    test('findBySurveyId where owner matches the input', done => {
        const surveyId = 'abc1-2345-6789';
        const dummySurveyResponse = { _id: new ObjectID(), data: []};
        mockDB.expects('find').once().resolves([ dummySurveyResponse ]);
    
        surveyResponses.findBySurveyId(surveyId).then(found => {
            expect(found).not.toBeNull();
            expect(found.length).toBe(1);
            expect(found[0]).toBe(dummySurveyResponse);
            done();
        });
    });
    
    test('findBySurveyId where owner does not match the input', done => {
        const surveyId = 'xyz1-2345-6789';
        mockDB.expects('find').once().resolves([]);
    
        surveyResponses.findBySurveyId(surveyId).then(found => {
            expect(found).not.toBeNull();
            expect(found.length).toBe(0);
            done();
        });
    });
    
    test('findByID success', done => {
        const id = 'abc1-2345-6789';
        const dummySurveyResponse = { _id: new ObjectID(), data: []};
        mockDB.expects('findOne').once().resolves(dummySurveyResponse);
    
        surveyResponses.findById(id).then(found => {
            expect(found).toBe(dummySurveyResponse);
            done();
        });
    });

    test('findByID failure', done => {
        const id = 'xyz1-2345-6789';
        mockDB.expects('findOne').once().resolves(null);
    
        surveyResponses.findById(id).then(found => {
            expect(found).toBeNull();
            done();
        });
    });
});
