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

const saveOrUpdate = (owner, survey) => {
    if (!survey.surveyId) {
        survey.surveyId = generateNewSurveyId();
    }

    survey.owner = survey.owner || [ owner ];

    return db.save('surveys', survey, 'surveyId');
}

module.exports = { findByOwner, findById, groupByPages, saveOrUpdate };
