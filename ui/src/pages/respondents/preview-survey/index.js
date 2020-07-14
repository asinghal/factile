import React, { useState, useEffect } from "react";
import { findSurvey } from '../api.js';

import { useParams, useHistory } from "react-router-dom";

import BaseRespondentView from '../index.js';

export default function PreviewSurvey() {
    const [survey, setSurvey] = useState({ layout: {} });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then((survey) => {
            setSurvey(survey);
        }).catch(() => history.replace('/error'));
    }, [id, history]);

    const onPageSubmit = (response) => {
        console.log(response);
    };

    return (
        <>
            <div className="container">
                <div>&nbsp;</div>
                <div className="alert alert-info">This is a preview mode. Responses will not be saved.</div>
            </div>
            <BaseRespondentView survey={survey} onSuccessfulSubmit={onPageSubmit} />
        </>
    );
};
