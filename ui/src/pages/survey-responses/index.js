import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams, useHistory } from "react-router-dom";

import Question from '../../components/surveys/questions/index.js';

export default function SurveyResponses() {
    const [surveyResponses, setSurveyResponses] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(setSurveyResponses).catch(() => history.replace('/'));
    }, []);

    return (
        <div className="container">
            Found {surveyResponses.length} responses
        </div>
    );
};
