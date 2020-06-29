const db = require('../db');
const uuid = require('uuid').v1;

const findByOwner = (owner) => db.find('surveys', { owner }, {}, { name: 1, surveyId: 1, status: 1 });

const findById = (owner, surveyId) => db.findOne('surveys', { owner, surveyId });

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

const saveOrUpdate = (owner, survey) => {
    if (!survey.surveyId) {
        survey.surveyId = generateNewSurveyId();
    }

    survey.owner = survey.owner || [ owner ];

    if (survey.questions) {
        const baseQuestionNum = findMaxQuestionId(survey.questions) + 1;
        let count = 0;
        survey.questions.forEach(q => {
            if (!q.questionId) {
                q.questionId = 'q' + padLeft(baseQuestionNum + count, 4);
                count++;
            }
        });
    }

    return db.save('surveys', survey, 'surveyId');
}

module.exports = { findByOwner, findById, groupByPages, saveOrUpdate };
