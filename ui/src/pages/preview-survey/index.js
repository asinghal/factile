import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams, useHistory } from "react-router-dom";

import SurveyView from '../../components/surveys/survey-view/index.js';

export default function PreviewSurvey() {
    const [survey, setSurvey] = useState({ layout: {} });
    const [ response, setResponse ] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then((survey) => {
            setSurvey(survey);
            setResponse({ surveyId: survey.surveyId, responses: [] });
        }).catch(() => history.replace('/'));
    }, [id, history]);

    const onPageSubmit = () => {
        console.log(response);
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
        <SurveyView survey={survey} addResponse={addResponse} onPageSubmit={onPageSubmit} />
    );
};
