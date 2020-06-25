import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { getSurveys } from './api.js';

function ShowSurveyRow({ survey }) {
    return (
    <div>
        <Link to={"/surveys/" + survey.surveyId + "/preview"}>{survey.name}</Link>
    </div>
    );
}

export default function ListSurveys() {
    const [surveys, setSurveys] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getSurveys().then(setSurveys).catch(() => history.replace('/'))
    }, []);

    return (
        <div className="container">
            <h2>Surveys</h2>
            {surveys.map(survey => 
            <ShowSurveyRow survey={survey} key={survey.surveyId + '-' + survey.status}/>
            )}
        </div>
    );
};
