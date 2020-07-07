import React, { useState, useEffect } from "react";
import { findSurvey, saveResponse } from '../api.js';

import { useParams, useHistory } from "react-router-dom";

import BaseRespondentView from '../index.js';

export default function LiveSurvey({ setRespondentView }) {
    const [survey, setSurvey] = useState({ layout: {} });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        setRespondentView(true);
        findSurvey(id).then((survey) => {
            setSurvey(survey);
        }).catch(() => history.replace('/'));
    }, [id, history]);

    const onPageSubmit = (response) => {
        saveResponse(id, response);
    };

    return (
        <BaseRespondentView survey={survey} onSuccessfulSubmit={onPageSubmit} />
    );
};
