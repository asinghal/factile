import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { findSurvey } from './api.js';

import './dashboard.css';

export default function ListSurveys() {
    const [survey, setSurvey] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(setSurvey).catch(() => history.replace('/'));
    }, [id, history]);

    return (
        <div className="container dashboard">
            <h2>{survey.name}</h2>
            
            <div className="row">
                <div className="col-md-12">
                    <Link to={"/surveys/" + survey.surveyId + "/preview"}>Preview</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Link to={"/surveys/" + survey.surveyId + "/responses"}>Responses</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Link to={"/surveys/" + survey.surveyId + "/participants"}>Participants</Link>
                </div>
            </div>
        </div>
    );
};
