const db = require('../db');
const Surveys = require('../surveys');
const ObjectID = require('mongodb').ObjectID;
const uuid = require('uuid').v1;

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

const generateNewResponseId = () => uuid();

const save = (surveyId, responseIdFromReq, surveyResponse) => {
    return Surveys.findById(surveyId).then(survey => {
        if (survey.status !== 'Live') {
            throw new Error('Can not save responses for a survey that is not live');
        }
        return survey;
    }).then(survey => {
        const responseId = responseIdFromReq || surveyResponse.responseId || generateNewResponseId();
        surveyResponse.responseId = responseId;
        surveyResponse.created_at = new Date();
        surveyResponse.surveyId = surveyId;

        return db.save('surveyresponses', surveyResponse, 'responseId');
    });
};

module.exports = { findById, findBySurveyId, groupByQuestions, save };
