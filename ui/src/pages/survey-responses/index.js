import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams, useHistory } from "react-router-dom";

export default function SurveyResponses() {
    const [surveyResponses, setSurveyResponses] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(setSurveyResponses).catch(() => history.replace('/'));
    }, [id, history]);

    return (
        <div className="container">
            Found {surveyResponses.length} responses
        </div>
    );
};
