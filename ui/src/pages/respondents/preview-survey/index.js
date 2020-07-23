import React, { useState, useEffect } from "react";
import { findSurvey, applyResponseForPreview } from '../api.js';

import { useParams, useHistory } from "react-router-dom";

import BaseRespondentView from '../index.js';

export default function PreviewSurvey() {
    const [survey, setSurvey] = useState({ layout: {} });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(setSurvey).catch(() => history.replace('/error'));
    }, [id, history]);

    const onPageSubmit = (response) => {
        applyResponseForPreview(id, response).then(setSurvey).catch(() => history.replace('/error'));
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
