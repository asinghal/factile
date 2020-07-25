const db = require('../../lib/db');
const surveyResponses = require('../../lib/surveyresponses');
const sinon = require('sinon');

const DUMMY_SURVEY = require('./data/survey.json');
const DUMMY_SURVEY_WITH_VARS = require('./data/survey_with_vars.json');
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
        const dummySurveyResponse = { data: []};
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
        const surveyId = 'abc1-2345-6789';
        const id = 'xyz1-2345-6789';
        const dummySurveyResponse = { data: []};
        mockDB.expects('findOne').once().resolves(dummySurveyResponse);
    
        surveyResponses.findById(surveyId, id).then(found => {
            expect(found).toBe(dummySurveyResponse);
            done();
        });
    });

    test('findByID failure', done => {
        const surveyId = 'xyz1-2345-6789';
        const id = 'abc1-2345-6789';
        mockDB.expects('findOne').once().resolves(null);
    
        surveyResponses.findById(surveyId, id).then(found => {
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
        const response = { email, responses: [surveyResponse]};
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
        const response = { email, responses: [surveyResponse]};
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
        const surveyResponse = {
            question : 'q0001',
            answers : [ 'o1' ],
            other : '',
            ranking : false
        };
        const response = { email, responses: [surveyResponse]};
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

    test('apply response data to survey with no piping variables', done => {
        const updatedSurvey = surveyResponses.applyToSurveyTexts(DUMMY_SURVEY, DUMMY_SURVEY_RESPONSES[0]);
        expect(updatedSurvey).not.toBeNull();
        expect(JSON.stringify(updatedSurvey)).toBe(JSON.stringify(DUMMY_SURVEY));
        done();
    });

    test('apply response data to survey with piping variables', done => {
        const original = JSON.stringify(DUMMY_SURVEY_WITH_VARS);
        const updatedSurvey = surveyResponses.applyToSurveyTexts(DUMMY_SURVEY_WITH_VARS, DUMMY_SURVEY_RESPONSES[0]);
        expect(updatedSurvey).not.toBeNull();
        expect(JSON.stringify(updatedSurvey)).not.toBe(original);
        expect(updatedSurvey.questions[1].texts[0].text).toBe('test some text');
        expect(updatedSurvey.questions[3].options[0].texts[0].text).toBe('b');
        expect(updatedSurvey.questions[4].options[0].texts[0].text).toBe('b');
        expect(updatedSurvey.questions[4].dimensions[1].texts[0].text).toBe('question b');
        done();
    });

    test('apply generate report when constraints provided and matched', done => {
        const questions = ['q0003', 'q0005_d2'];
        const constraints = [{
            question: 'q0004',
            value: 'o2'
        }, {
            question: 'q0005_d1',
            value: 'o5'
        }];
        mockDB.expects('find').once().resolves(DUMMY_SURVEY_RESPONSES);

        surveyResponses.generateReport(DUMMY_SURVEY, questions, constraints).then(d => {
            expect(d).not.toBeNull();
            expect(d.length).toBe(questions.length);
            expect(d[0].answers[0].name).toBe('c');
            expect(d[0].answers[0].value).toBe(1);
            expect(d[1].answers[0].name).toBe('6');
            expect(d[1].answers[0].value).toBe(1);
            done();
        });
    });

    test('apply generate report when constraints provided and but not matched', done => {
        const questions = ['q0003', 'q0005_d2'];
        const constraints = [{
            question: 'q0004',
            value: 'o1'
        }, {
            question: 'q0005_d1',
            value: 'o5'
        }];
        mockDB.expects('find').once().resolves(DUMMY_SURVEY_RESPONSES);

        surveyResponses.generateReport(DUMMY_SURVEY, questions, constraints).then(d => {
            expect(d).not.toBeNull();
            expect(d.length).toBe(0);
            done();
        });
    });

    test('apply generate report when constraints not provided', done => {
        const questions = ['q0003', 'q0005_d2'];
        const constraints = [];
        mockDB.expects('find').once().resolves(DUMMY_SURVEY_RESPONSES);

        surveyResponses.generateReport(DUMMY_SURVEY, questions, constraints).then(d => {
            expect(d).not.toBeNull();
            expect(d.length).toBe(questions.length);
            expect(d[0].answers[0].name).toBe('c');
            expect(d[0].answers[0].value).toBe(2);
            expect(d[0].answers[1].name).toBe('a');
            expect(d[0].answers[1].value).toBe(1);
            expect(d[1].answers[0].name).toBe('3');
            expect(d[1].answers[0].value).toBe(2);
            expect(d[1].answers[1].name).toBe('6');
            expect(d[1].answers[1].value).toBe(1);
            done();
        });
    });

    test('apply generate report when constraints is null', done => {
        const questions = ['q0003', 'q0005_d2'];
        const constraints = null;
        mockDB.expects('find').once().resolves(DUMMY_SURVEY_RESPONSES);

        surveyResponses.generateReport(DUMMY_SURVEY, questions, constraints).then(d => {
            expect(d).not.toBeNull();
            expect(d.length).toBe(questions.length);
            expect(d[0].answers[0].name).toBe('c');
            expect(d[0].answers[0].value).toBe(2);
            expect(d[0].answers[1].name).toBe('a');
            expect(d[0].answers[1].value).toBe(1);
            expect(d[1].answers[0].name).toBe('3');
            expect(d[1].answers[0].value).toBe(2);
            expect(d[1].answers[1].name).toBe('6');
            expect(d[1].answers[1].value).toBe(1);
            done();
        });
    });

    test('apply generate report when not responses exist', done => {
        const questions = ['q0003', 'q0005_d2'];
        const constraints = [{
            question: 'q0004',
            value: 'o1'
        }, {
            question: 'q0005_d1',
            value: 'o5'
        }];
        mockDB.expects('find').once().resolves([]);

        surveyResponses.generateReport(DUMMY_SURVEY, questions, constraints).then(d => {
            expect(d).not.toBeNull();
            expect(d.length).toBe(0);
            done();
        });
    });

});
