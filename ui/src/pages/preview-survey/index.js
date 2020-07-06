import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams, useHistory } from "react-router-dom";

import SurveyView from '../../components/surveys/survey-view/index.js';

export default function PreviewSurvey() {
    const [survey, setSurvey] = useState({ layout: {} });
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then((survey) => {
            setSurvey(survey);
        }).catch(() => history.replace('/'));
    }, [id, history]);

    return (
        <SurveyView survey={survey} />
    );
};
