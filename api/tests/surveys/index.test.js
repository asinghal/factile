const db = require('../../lib/db');
const mail = require('../../lib/mail');
const surveys = require('../../lib/surveys');
const sinon = require('sinon');
const ObjectID = require('mongodb').ObjectID;

describe('survey model tests', () => {
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
    
    test('findByIdAndOwner success', done => {
        const name = 'Test Survey';
        const surveyId = 'abc1-2345-6789';
        const owner = 'a@a.com';
        const dummySurvey = { _id: new ObjectID(), name, surveyId, owner};
        mockDB.expects('findOne').once().resolves(dummySurvey);
    
        surveys.findByIdAndOwner(owner, surveyId).then(found => {
            expect(found).toBe(dummySurvey);
            done();
        });
    });

    test('findByIdAndOwner failure', done => {
        const surveyId = 'xyz1-2345-6789';
        const owner = 'a@a.com';
        mockDB.expects('findOne').once().resolves(null);
    
        surveys.findByIdAndOwner(owner, surveyId).then(found => {
            expect(found).toBeNull();
            done();
        });
    });

    test('findById success', done => {
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

    test('findById failure', done => {
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
            expect(survey.history).not.toBeNull();
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
            expect(survey.history).not.toBeNull();
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
            expect(survey.history).not.toBeNull();
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
            expect(survey.history).not.toBeNull();
            done();
        });
    });

    test('insert a survey and add a hash_string', done => {
        const name = 'Test Survey';
        const owner = 'a@a.com';
        const survey = { _id: new ObjectID(), name, owner };
        mockDB.expects('save').once().resolves("ok");

        surveys.saveOrUpdate(owner, survey).then(d => {
            expect(d).toBe("ok");
            expect(survey.surveyId).not.toBeUndefined();
            expect(survey.hash_string).not.toBeUndefined();
            expect(survey.hash_string).not.toBeNull();
            expect(survey.hash_string.length).toBe(16);
            expect(survey.history).not.toBeNull();
            done();
        });
    });

    test('update a survey and retain the hash_string', done => {
        const name = 'Test Survey';
        const surveyId = 'abc1-2345-6789';
        const owner = 'a@a.com';
        const hash_string = 'abcdefgh01234567'
        const survey = { _id: new ObjectID(), name, surveyId, owner, hash_string};
        mockDB.expects('save').once().resolves("ok");

        surveys.saveOrUpdate(owner, survey).then(d => {
            expect(d).toBe("ok");
            expect(survey.hash_string).toBe(hash_string);
            expect(survey.history).not.toBeNull();
            done();
        });
    });

    test('recordChangeHistory', done => {
        const survey = {};
        const owner = 'a@a.com';
        const history = surveys.recordChangeHistory(survey, owner);
        expect(history).not.toBeNull();
        expect(history.created_at).not.toBeUndefined();
        expect(history.created_by).toBe(owner);
        expect(history.updated_at).not.toBeUndefined();
        expect(history.updated_by).toBe(owner);
        done();
    });

    test('invite users to open survey', done => {
        const owner = 'a@a.com';
        const surveyId = 'abc1-2345-6789';
        mockMail.expects('send').twice().returns(null);

        surveys.invite(owner, surveyId, true, {
            toAddresses: [ 'a@a.com', 'b@a.com' ],
            emailSubject: 'Survey',
            emailBody: 'Test mail'
        });

        setTimeout(() => {
            done();
        }, 300);
    });

    test('invite users to open survey but remove duplicates', done => {
        const owner = 'a@a.com';
        const surveyId = 'abc1-2345-6789';
        mockMail.expects('send').twice().returns(null);

        surveys.invite(owner, surveyId, true, {
            toAddresses: [ 'a@a.com', 'a@a.com', 'b@a.com', 'b@a.com', 'a@a.com', 'a@a.com' ],
            emailSubject: 'Survey',
            emailBody: 'Test mail'
        });

        setTimeout(() => {
            done();
        }, 300);
    });

    test('invite users to email survey', done => {
        const owner = 'a@a.com';
        const surveyId = 'abc1-2345-6789';
        mockDB.expects('save').twice().resolves("ok");
        mockMail.expects('send').twice().returns(null);

        surveys.invite(owner, surveyId, false, {
            toAddresses: [ 'a@a.com', 'b@a.com' ],
            emailSubject: 'Survey',
            emailBody: 'Test mail'
        });

        setTimeout(() => {
            done();
        }, 300);
    });

    test('invite users to open survey and handle case when no participant emails defined', done => {
        const owner = 'a@a.com';
        const surveyId = 'abc1-2345-6789';

        surveys.invite(owner, surveyId, true, {
            toAddresses: null,
            emailSubject: 'Survey',
            emailBody: 'Test mail'
        });

        setTimeout(() => {
            done();
        }, 300);
    });

});
