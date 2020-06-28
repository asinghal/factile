const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

const findBySurveyId = (surveyId) => db.find('surveyresponses', { surveyId });
const findById = (surveyId, id) => db.findOne('surveyresponses', { surveyId, _id: new ObjectID(id) });

const groupByQuestions = (surveyResponses) => {
    const grouped = {};
    surveyResponses.forEach(surveyResponse => {
        surveyResponse.responses.forEach(response => {
            const question = grouped[response.question] || [];
            grouped[response.question] = question;
            const allAnswers = response.answers;
            allAnswers.push(response.other)
            const answers = allAnswers.filter(ans => ans !== null && ans !== undefined && ans !== "");
            question.push(answers);
        })
    });

    const arranged = Object.keys(grouped).map(key => ({
        question: key,
        answers: grouped[key]
    }));

    return arranged;
};

module.exports = { findById, findBySurveyId, groupByQuestions };
