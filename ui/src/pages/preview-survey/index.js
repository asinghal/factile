import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams, useHistory } from "react-router-dom";

import SurveyView from '../../components/surveys/survey-view/index.js';

export default function PreviewSurvey() {
    const [survey, setSurvey] = useState({ layout: {} });
    const [answersAreValid, setAnswersAreValid] = useState(true);
    const [ response, setResponse ] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then((survey) => {
            setSurvey(survey);
            setResponse({ surveyId: survey.surveyId, responses: [] });
        }).catch(() => history.replace('/'));
    }, [id, history]);

    const isPageValid = (pageNum) => {
        const questions = survey.pages[pageNum].questions.filter(q => q.mandatory).map(q => q.questionId);
        const valid = questions.map(q => {
            const index = response.responses.findIndex(r => r.question === q && ((r.answers && r.answers.length > 0) || r.other));
            return index !== -1;
        }).reduce((s, a) => s && a, true);
        return valid;
    }

    const onPageSubmit = (pageNum) => {
        if (!isPageValid(pageNum)) {
            setAnswersAreValid(false);
            return false;
        } else {
            setAnswersAreValid(true);
        }
        console.log(response);
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
