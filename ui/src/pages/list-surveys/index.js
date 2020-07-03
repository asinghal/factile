import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { getSurveys } from './api.js';

import './list-surveys.css';

const formatDateTime = (dateTime) => {
    const d = new Date(dateTime);
    return d.toLocaleDateString();
}

function ShowSurveyRow({ survey }) {
    return (
    <div className="row survey-row">
        <div className="col-md-4"><Link to={"/surveys/" + survey.surveyId}>{survey.name}</Link></div>
        <div className="col-md-2">{survey.status}</div>
        <div className="col-md-2">{formatDateTime(survey.history.created_at)}</div>
        <div className="col-md-2">{survey.history.created_by}</div>
        <div className="col-md-2">&nbsp;</div>
    </div>
    );
}

export default function ListSurveys() {
    const [surveys, setSurveys] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getSurveys().then(setSurveys).catch(() => history.replace('/'))
    }, [history]);

    return (
        <div className="container my-surveys">
            <h2>Surveys</h2>
            <div className="row survey-header-row">
                <div className="col-md-4">Name</div>
                <div className="col-md-2">Status</div>
                <div className="col-md-2">Created on</div>
                <div className="col-md-2">Created by</div>
                <div className="col-md-2">&nbsp;</div>
            </div>
            {surveys.map(survey => 
            <ShowSurveyRow survey={survey} key={survey.surveyId + '-' + survey.status}/>
            )}
        </div>
    );
};
