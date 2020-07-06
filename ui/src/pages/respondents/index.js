import React, { useState, useEffect } from "react";

import SurveyView from '../../components/surveys/survey-view/index.js';

export default function BaseRespondentView({ survey, onSuccessfulSubmit }) {
    const [answersAreValid, setAnswersAreValid] = useState(true);
    const [ response, setResponse ] = useState({});

    useEffect(() => setResponse({ surveyId: survey.surveyId, responses: [] }), 
    [survey.surveyId]);

    const isPageValid = (pageNum) => {
        const questions = survey.pages[pageNum].questions.filter(q => q.mandatory).map(q => q.questionId);
        const valid = questions.map(q => {
            const index = response.responses.findIndex(r => r.question === q && ((r.answers && r.answers.length > 0) || r.other));
            return index !== -1;
        }).reduce((s, a) => s && a, true);
        return valid;
    };

    const onPageSubmit = (pageNum) => {
        if (!isPageValid(pageNum)) {
            setAnswersAreValid(false);
            return false;
        } else {
            setAnswersAreValid(true);
        }
        onSuccessfulSubmit(response);
        return true;
    };

    const addResponse = (res) => {

        let responses = response.responses;
        const index = responses.findIndex(r => r.question === res.question);

        if (index !== -1) {
            responses.splice(index, 1);
        }
        responses.push(res);
        setResponse({...response, responses: responses });
    };

    return (
        <SurveyView survey={survey} addResponse={addResponse} onPageSubmit={onPageSubmit} answersAreValid={answersAreValid} />
    );
};
