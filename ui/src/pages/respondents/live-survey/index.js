import React, { useState, useEffect } from "react";
import { findSurvey, saveResponse, applyResponse } from '../api.js';

import { useParams, useHistory } from "react-router-dom";

import BaseRespondentView from '../index.js';

export default function LiveSurvey() {
    const [survey, setSurvey] = useState({ layout: {} });
    const [responseId, setResponseId] = useState(null);
    const { id, respId } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id, respId).then((survey) => {
            if (survey.status !== 'Live') {
                throw Error('This survey is not accepting inputs');
            }
            setSurvey(survey);
        }).catch(() => history.replace('/error'));
    }, [id, history, respId]);

    const onPageSubmit = (response) => {
        saveResponse(id, responseId, response).then((data) => {
            setResponseId(data.responseId);
            applyResponse(id, data.responseId).then(d => {
                setSurvey(d);
            });
        });
    };

    return (
        <BaseRespondentView survey={survey} onSuccessfulSubmit={onPageSubmit} />
    );
};
