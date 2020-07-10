const db = require('../db');
const Surveys = require('../surveys');
const ObjectID = require('mongodb').ObjectID;
const uuid = require('uuid').v4;

const findBySurveyId = (surveyId) => db.find('surveyresponses', { surveyId });
const findById = (surveyId, id) => db.findOne('surveyresponses', { surveyId, _id: new ObjectID(id) });


const toArray = (obj) => Object.keys(obj).map(k => ({ name: k, value: obj[k] }));

const addCounts = (arr) => arr.map(q => {
    if (!q.hasOptions) {
        return q;
    }

    const addOrIncrement = (a, b) => {
        a[b] = a[b] ? a[b] + 1 : 1;
        return a;
    };

    const answers = q.answers.reduce((groupedAnswers, ans) => addOrIncrement(groupedAnswers, ans), {});

    return { ...q, answers: toArray(answers).sort((a, b) => b.value - a.value) };
});

const groupByQuestions = (survey, surveyResponses) => {
    const questionTexts = buildQuestionTexts(survey);
    const grouped = {};
    surveyResponses.forEach(surveyResponse => {
        surveyResponse.responses.forEach(response => {
            const question = grouped[response.question] || [];
            grouped[response.question] = question;
            const allAnswers = response.answers;
            allAnswers.push(response.other)
            const answers = allAnswers.filter(ans => !!ans);
            question.push(answers);
        });
    });

    const arranged = Object.keys(grouped).filter(key => !!questionTexts[key]).map(key => ({
        question: key,
        texts: questionTexts[key],
        hasOptions: !!Object.keys(questionTexts[key].options).length,
        answers: grouped[key].reduce((a,b) => [ ...a, ...b ], []).map(x => questionTexts[key].options[x] || x )
    }));

    return addCounts(arranged);
};

const flatten = (arr) => (arr || []).reduce((all, o) => ({ ...all, ...o }), {});

const buildQuestionTexts = (survey) => flatten(survey.questions.filter(q => q.qType !== 'page').map(q => {
    const text = (obj) => (obj && obj.texts && obj.texts.length) ? obj.texts[0].text : null;
    const questionData = {
        question: text(q),
        options: flatten((q.options || []).map( o => ({ [o.value]: text(o) }))),
        other: text(q.otherBox)
    };

    if (q.dimensions && q.dimensions.length) {
        return flatten((q.dimensions || []).map( d => ({ [`${q.questionId}_${d.value}`]: ({
            question: text(d) || questionData.question,
            options: questionData.options
        }) })));
    } else {
        return ({
            [q.questionId]: questionData
        });
    }
}));

const formatForDownload = (survey, surveyResponses) => {
    const questionTexts = buildQuestionTexts(survey);

    const data = { surveyName: survey.name, headers: [], rows: [] };
    data.headers = Object.keys(questionTexts).map(key => ({ key, header: questionTexts[key].question }));
    data.rows = surveyResponses.map(response => 
        flatten(response.responses.filter(r => !!questionTexts[r.question]).map(r => 
            ({
                [r.question]: r.answers.map(a => {
                    const q = questionTexts[r.question];
                    return q.options[a] || a;
                }).join('; ')
            })
        )));

    return data;
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

module.exports = { findById, findBySurveyId, groupByQuestions, save, formatForDownload };
