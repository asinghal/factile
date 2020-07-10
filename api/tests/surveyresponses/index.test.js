const db = require('../../lib/db');
const surveyResponses = require('../../lib/surveyresponses');
const sinon = require('sinon');
const ObjectID = require('mongodb').ObjectID;

const DUMMY_SURVEY = require('./data/survey.json');
const DUMMY_SURVEY_RESPONSES = require('./data/surveyresponses.json');

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

    test('insert a survey response', done => {
        const email = 'a@a.com';
        const surveyId = 'abc1-2345-6789';
        const surveyResponse = {
            question : 'q0001',
            answers : [ 'o1' ],
            other : '',
            ranking : false
        };
        const response = { _id: new ObjectID(), email, responses: [surveyResponse]};
        mockDB.expects('findOne').once().resolves({ status: 'Live' });
        mockDB.expects('save').once().resolves("ok");

        surveyResponses.save(surveyId, null, response).then(d => {
            expect(d).toBe("ok");
            expect(response.surveyId).not.toBeUndefined();
            expect(response.surveyId).toBe(surveyId);
            expect(response.responseId).not.toBeUndefined();
            expect(response.responseId).not.toBeNull();
            expect(response.created_at).not.toBeUndefined();
            done();
        });
    });

    test('attempting to insert a survey response for a survey in Draft should fail', done => {
        const email = 'a@a.com';
        const surveyId = 'abc1-2345-6789';
        const surveyResponse = {
            question : 'q0001',
            answers : [ 'o1' ],
            other : '',
            ranking : false
        };
        const response = { _id: new ObjectID(), email, responses: [surveyResponse]};
        mockDB.expects('findOne').once().resolves({ status: 'Draft' });

        surveyResponses.save(surveyId, null, response).catch(e => {
            expect(e).not.toBeUndefined();
            expect(response.surveyId).toBeUndefined();
            expect(response.responseId).toBeUndefined();
            expect(response.created_at).toBeUndefined();
            done();
        });
    });

    test('update a survey response', done => {
        const email = 'a@a.com';
        const surveyId = 'abc1-2345-6789';
        const responseId = 'xyz1-2345-6789';
        const surveyResponse = {
            question : 'q0001',
            answers : [ 'o1' ],
            other : '',
            ranking : false
        };
        const response = { _id: new ObjectID(), email, responses: [surveyResponse]};
        mockDB.expects('findOne').once().resolves({ status: 'Live' });
        mockDB.expects('save').once().resolves("ok");

        surveyResponses.save(surveyId, null, response).then(d => {
            expect(d).toBe("ok");
            expect(response.surveyId).not.toBeUndefined();
            expect(response.surveyId).not.toBeNull();
            expect(response.responseId).not.toBeUndefined();
            expect(response.responseId).not.toBeNull();
            done();
        });
    });

    test('format a survey response for download', done => {
        const formatted = surveyResponses.formatForDownload(DUMMY_SURVEY, DUMMY_SURVEY_RESPONSES);
        expect(formatted).not.toBeNull();
        expect(formatted.surveyName).toBe('Test');
        expect(formatted.headers).not.toBeUndefined();
        expect(formatted.rows).not.toBeUndefined();
        expect(formatted.headers.length).toBe(8);
        expect(formatted.rows.length).toBe(3);
        expect(formatted.headers[0].key).not.toBeUndefined();
        done();
    });

    test('group survey responses by questions', done => {
        const formatted = surveyResponses.groupByQuestions(DUMMY_SURVEY, DUMMY_SURVEY_RESPONSES);
        expect(formatted).not.toBeNull();
        expect(formatted.length).toBe(7);
        expect(formatted[0].hasOptions).toBe(false);
        expect(formatted[2].hasOptions).toBe(true);
        expect(formatted[2].answers).not.toBeUndefined();
        expect(formatted[0].answers.length).toBe(3);
        expect(formatted[2].answers.length).toBe(2);
        expect(formatted[2].answers[0].name).toBe('b');
        expect(formatted[2].answers[0].value).toBe(2);
        done();
    });

});
