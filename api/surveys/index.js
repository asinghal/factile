const db = require('../db');
const uuid = require('uuid').v1;

const findByOwner = (owner) => db.find('surveys', { owner }, {}, { name: 1, surveyId: 1, status: 1, history: 1 });

const findByIdAndOwner = (owner, surveyId) => db.findOne('surveys', { owner, surveyId });
const findById = (surveyId) => db.findOne('surveys', { surveyId });

/*
 * consolidate questions by pages - by default it is a flat list for legacy reasons
 */
const groupByPages = (survey) => {
    let another = { ...survey };
    let pages = [];
    let page = { questions: [] };

    pages.push(page);

    another.questions.forEach((q) => {
        if (q.qType != 'page') {
            page.questions.push(q);
        } else {
            page = { conditions: q.conditions, questions: [] };
            pages.push(page);
        }
    });

    delete another.questions;

    another.pages = pages;

    return another;
};

const generateNewSurveyId = () => uuid();

const findMaxQuestionId = (questions) => questions.map(q => q.questionId ? parseInt(q.questionId.substr(1), 10): 0).sort().reverse().shift();
const padLeft = (num, size) => {
    const str = '' + num;
    let s = str;
    for (var i=str.length; i<size; i++) {
        s = '0' + s;
    }
    return s;
}

const recordChangeHistory = (survey, email) => {
    const now = new Date();
    let history = survey.history || { created_at: now, created_by: email };
    const updated = { updated_at: now, updated_by: email };
    history = { ...history, ...updated };
    return history;
};

const generateRandomString = () => Math.random().toString(36).substring(2, 10);
const generateHashString = () => ['', ''].map(generateRandomString).join('');

const assignQuestionIds = (questions) => {
    if (questions) {
        const baseQuestionNum = findMaxQuestionId(questions) + 1;
        let count = 0;
        questions.forEach(q => {
            if (!q.questionId) {
                q.questionId = 'q' + padLeft(baseQuestionNum + count, 4);
                count++;
            }
        });
    }

    return questions;
};

const saveOrUpdate = (owner, survey) => {
    if (!survey.surveyId) {
        survey.surveyId = generateNewSurveyId();
    }

    survey.owner = survey.owner || [ owner ];
    survey.status = survey.status || 'Draft';
    survey.history = recordChangeHistory(survey, owner);
    survey.hash_string = survey.hash_string || generateHashString();

    if (survey.questions) {
        survey.questions = assignQuestionIds(survey.questions);
    }

    return db.save('surveys', survey, 'surveyId');
}

module.exports = { findByOwner, findByIdAndOwner, findById, groupByPages, saveOrUpdate, recordChangeHistory };
