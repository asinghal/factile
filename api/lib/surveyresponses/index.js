const db = require('../db');
const Surveys = require('../surveys');
const uuid = require('uuid').v4;

const { removeStopWords } = require('./stop-words');

const findBySurveyId = (surveyId) => db.find('surveyresponses', { surveyId });
const findById = (surveyId, responseId) => db.findOne('surveyresponses', { surveyId, responseId });

const toArray = (obj) => Object.keys(obj).map(k => ({ name: k, value: obj[k] }));

const count = (arr) => {
    const addOrIncrement = (a, b) => {
        a[b] = a[b] ? a[b] + 1 : 1;
        return a;
    };

    return arr.reduce((grouped, item) => addOrIncrement(grouped, item), {});
}

const addCounts = (arr) => arr.map(q => {
    if (!q.hasOptions) {
        return q;
    }

    return { ...q, answers: toArray(count(q.answers)).sort((a, b) => b.value - a.value) };
});

const addWordCounts = (arr, language) => arr.map(q => {
    if (q.hasOptions) {
        return q;
    }

    const words = q.answers.map(a => removeStopWords(language, a).trim().split(' ').filter(x=> !!x.trim())).reduce((a,b) => [...a, ...b], []);
    q.words = toArray(count(words)).map(w => ({ text: w.name, value: w.value }));

    return q;
});

const addActualTexts = (responses, questionTexts) => Object.keys(responses).filter(key => !!questionTexts[key]).map(key => ({
    question: key,
    texts: questionTexts[key],
    hasOptions: !!Object.keys(questionTexts[key].options).length,
    answers: responses[key].reduce((a,b) => [ ...a, ...b ], []).map(x => questionTexts[key].options[x] || x )
}));

const sortByKey = (arr, key) => arr.sort((a, b) => {
    if (a[key] > b[key]) return 1;
    if (a[key] < b[key]) return -1;
    return 0;
});

const chain = (fn) => ({ then: (fn2) => fn2(fn()) });

const groupByQuestions = (survey, surveyResponses) => {
    const questionTexts = buildQuestionTexts(survey);
    const grouped = {};
    surveyResponses.forEach(surveyResponse => {
        surveyResponse.responses.forEach(response => {
            const accumulate = (key, answers) => {
                const question = grouped[key] || [];
                grouped[key] = question;
                question.push(answers);
            };

            accumulate(response.question, response.answers.filter(ans => !!ans));

            if (response.other) {
                accumulate(`${response.question}_other`, [response.other]);
            }
        });
    });

    const arranged = chain(() => addActualTexts(grouped, questionTexts)).then((arr) => sortByKey(arr, 'question'));

    return chain(() => addCounts(arranged)).then((arr) => addWordCounts(arr, survey.language));
};

const flatten = (arr) => (arr || []).reduce((all, o) => ({ ...all, ...o }), {});

const buildQuestionTexts = (survey) => flatten(survey.questions.filter(q => q.qType !== 'page').map(q => {
    const text = (obj) => (obj && obj.texts && obj.texts.length) ? obj.texts[0].text : null;
    const questionData = {
        question: text(q),
        options: flatten((q.options || []).map( o => ({ [o.value]: text(o) }))),
        other: text(q.otherBox) || 'Other'
    };

    if (q.dimensions && q.dimensions.length) {
        return flatten((q.dimensions || []).map( d => ({ [`${q.questionId}_${d.value}`]: ({
            question: text(d) || questionData.question,
            options: questionData.options
        }) })));
    } else {
        const updated = { [q.questionId]: questionData };

        if (q.hasOther) {
            updated[`${q.questionId}_other`] = { ...questionData, options: [], question: `${questionData.question} (${questionData.other})`};
        }
        return updated;
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
                }).join('; '),
                [`${r.question}_other`]: r.other
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

const applyToSurveyTexts = (surveyData, surveyResponse) => {
    let survey = {...surveyData};
    if (surveyResponse && surveyResponse.responses && surveyResponse.responses.length) {
        const questionTexts = buildQuestionTexts(surveyData);
        surveyResponse.responses.forEach(r => {
            const questionOptionTexts = (questionTexts[r.question] || {}).options || {};
            const answer = r.answers.map(a => questionOptionTexts[a] || a).join(', ');
            const searchParam = '{{' + r.question + '}}';
            survey.questions = survey.questions.map(q => {
                if (q.qType === 'page') {
                    return q;
                }

                const replaceVariable = (input) => {
                    if (input && input.indexOf(searchParam) !== -1) {
                        return input.replace(new RegExp(searchParam, 'g'), answer);
                    }

                    return input;
                };

                const updateText = (obj) => {
                    if (obj && obj.texts && obj.texts.length) {
                        obj.texts[0].text = replaceVariable(obj.texts[0].text);
                    }
                    return obj;
                };

                if (q.options) {
                    q.options = q.options.map(updateText);
                }

                if (q.dimensions) {
                    q.dimensions = q.dimensions.map(updateText);
                }

                return updateText(q);
            });
        });
    }

    return survey;
};

const deleteAll = (surveyId) => db.del('surveyresponses', { surveyId });

const satisfies = (response, constraints) => {
    const hasResponseForConstraint = (c) => !!response.responses.find(r => r.question === c.question && r.answers.indexOf(c.value) !== -1);
    return !constraints || !constraints.length || constraints.reduce((result, c) => result && hasResponseForConstraint(c), true);
};

const generateReport = (survey, targetQuestions, constraints) => {
    return findBySurveyId(survey.surveyId).
            then(responses => responses.filter(r => satisfies(r, constraints))).
            then((responses) => groupByQuestions(survey, responses).filter(q => targetQuestions.indexOf(q.question) !== -1 ));
};

module.exports = { findById, findBySurveyId, groupByQuestions, save, formatForDownload, applyToSurveyTexts, generateReport, deleteAll };
