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

    test('groupByPages', done => {

        const survey = {
            surveyId: 'abc-123-456-789',
            questions: [
                { qType: 'radio' },
                { qType: 'text' },
                { qType: 'page', conditions: [ { a: 1 } ] },
                { qType: 'textarea' },
                { qType: 'ranking' },
                { qType: 'rating' },
                { qType: 'page', conditions: [ { b: 1 } ] },
                { qType: 'plaintext' }
            ]
        };

        const another = surveys.groupByPages(survey);

        expect(another).not.toBeNull();
        expect(another.surveyId).toBe(survey.surveyId);
        expect(survey.pages).toBeUndefined();
        expect(another.pages).not.toBeUndefined();
        expect(another.questions).toBeUndefined();
        expect(another.pages.length).toBe(3);
        expect(another.pages[0].questions.length).toBe(2);
        expect(another.pages[1].questions.length).toBe(3);
        expect(another.pages[1].conditions).toBe(survey.questions[2].conditions);
        expect(another.pages[2].questions.length).toBe(1);
        expect(another.pages[2].conditions).toBe(survey.questions[6].conditions);

        done();
    });

    test('groupByPages when no page breaks present', done => {

        const survey = {
            surveyId: 'abc-123-456-789',
            questions: [
                { qType: 'radio' },
                { qType: 'text' },
                { qType: 'textarea' },
                { qType: 'ranking' },
                { qType: 'rating' },
                { qType: 'plaintext' }
            ]
        };

        const another = surveys.groupByPages(survey);

        expect(another).not.toBeNull();
        expect(another.surveyId).toBe(survey.surveyId);
        expect(survey.pages).toBeUndefined();
        expect(another.pages).not.toBeUndefined();
        expect(another.questions).toBeUndefined();
        expect(another.pages.length).toBe(1);
        expect(another.pages[0].questions.length).toBe(6);

        done();
    });

    test('groupByPages with only 1 question', done => {

        const survey = {
            surveyId: 'abc-123-456-789',
            questions: [
                { qType: 'radio' }
            ]
        };

        const another = surveys.groupByPages(survey);

        expect(another).not.toBeNull();
        expect(another.surveyId).toBe(survey.surveyId);
        expect(survey.pages).toBeUndefined();
        expect(another.pages).not.toBeUndefined();
        expect(another.questions).toBeUndefined();
        expect(another.pages.length).toBe(1);
        expect(another.pages[0].questions.length).toBe(1);

        done();
    });

    test('groupByPages with only 1 page break and no questions', done => {

        const survey = {
            surveyId: 'abc-123-456-789',
            questions: [
                { qType: 'page' }
            ]
        };

        const another = surveys.groupByPages(survey);

        expect(another).not.toBeNull();
        expect(another.surveyId).toBe(survey.surveyId);
        expect(survey.pages).toBeUndefined();
        expect(another.pages).not.toBeUndefined();
        expect(another.questions).toBeUndefined();
        expect(another.pages.length).toBe(2);
        expect(another.pages[0].questions.length).toBe(0);
        expect(another.pages[1].questions.length).toBe(0);

        done();
    });

    test('insert a survey', done => {
        const name = 'Test Survey';
        const owner = 'a@a.com';
        const survey = { _id: new ObjectID(), name};
        mockDB.expects('save').once().resolves("ok");

        surveys.saveOrUpdate(owner, survey).then(d => {
            expect(d).toBe("ok");
            expect(survey.surveyId).not.toBeUndefined();
            expect(survey.owner).not.toBeUndefined();
            expect(survey.owner.length).toBe(1);
            expect(survey.owner[0]).toBe(owner);
            done();
        });
    });

    test('insert a survey and retain owner', done => {
        const name = 'Test Survey';
        const owner = 'a@a.com';
        const anotherOwner = 'b@a.com';
        const survey = { _id: new ObjectID(), name, owner: [anotherOwner]};
        mockDB.expects('save').once().resolves("ok");

        surveys.saveOrUpdate(owner, survey).then(d => {
            expect(d).toBe("ok");
            expect(survey.surveyId).not.toBeUndefined();
            expect(survey.owner).not.toBeUndefined();
            expect(survey.owner.length).toBe(1);
            expect(survey.owner[0]).toBe(anotherOwner);
            done();
        });
    });

    test('update a survey', done => {
        const name = 'Test Survey';
        const surveyId = 'abc1-2345-6789';
        const owner = 'a@a.com';
        const survey = { _id: new ObjectID(), name, surveyId, owner};
        mockDB.expects('save').once().resolves("ok");

        surveys.saveOrUpdate(owner, survey).then(d => {
            expect(d).toBe("ok");
            done();
        });
    });

    test('update a survey and assign question numbers', done => {
        const name = 'Test Survey';
        const surveyId = 'abc1-2345-6789';
        const owner = 'a@a.com';
        const survey = { _id: new ObjectID(), name, surveyId, owner, questions: [ {questionId: 'q0001', qType: 'plaintext'}, {qType: 'radio'}]};
        mockDB.expects('save').once().resolves("ok");

        surveys.saveOrUpdate(owner, survey).then(d => {
            expect(d).toBe("ok");
            expect(survey.questions[0].questionId).toBe('q0001');
            expect(survey.questions[1].questionId).toBe('q0002');
            done();
        });
    });
});
