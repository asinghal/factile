const db = require('../../lib/db');
const participants = require('../../lib/participants');
const sinon = require('sinon');

describe('participants model tests', () => {
    let mockDB;

    beforeEach(() => {
        mockDB = sinon.mock(db);
    });
    
    afterEach(() => {
        mockDB.verify();
        mockDB.restore();
    });
    
    test('findBySurveyId where data is found', done => {
        const surveyId = 'abc1-2345-6789';
        const participant = { email: 'a@a.com' };
        mockDB.expects('find').once().resolves([ participant ]);
    
        participants.findBySurveyId(surveyId).then(found => {
            expect(found).not.toBeNull();
            expect(found.length).toBe(1);
            expect(found[0]).toBe(participant);
            done();
        });
    });
    
    test('findBySurveyId where data is not found', done => {
        const surveyId = 'abc1-2345-6789';
        mockDB.expects('find').once().resolves([]);
    
        participants.findBySurveyId(surveyId).then(found => {
            expect(found).not.toBeNull();
            expect(found.length).toBe(0);
            done();
        });
    });

    test('insert a survey participant', done => {
        const email = 'a@a.com';
        const surveyId = 'abc1-2345-6789';
        mockDB.expects('save').once().resolves("ok");

        participants.save(surveyId, email).then(d => {
            expect(d).not.toBeNull();
            done();
        });
    });

    test('update a survey participant', done => {
        const email = 'a@a.com';
        const surveyId = 'abc1-2345-6789';
        const respId = 'xyz-2345-6789';
        mockDB.expects('save').once().resolves("ok");

        participants.update(surveyId, email, respId, 'Completed').then(d => {
            expect(d).toBe("ok");
            done();
        });
    });

});
