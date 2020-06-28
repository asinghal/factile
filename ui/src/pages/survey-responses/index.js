import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams, useHistory } from "react-router-dom";

import './survey-responses.css';

export default function SurveyResponses() {
    const [surveyResponses, setSurveyResponses] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(setSurveyResponses).catch(() => history.replace('/'));
    }, [id, history]);

    return (
        <div className="container survey-responses">
            {surveyResponses.map(surveyResponse => (
                <div className="block" key={surveyResponse.question}>
                    <div><strong>{surveyResponse.question}</strong></div>
                    {surveyResponse.answers.map((answerList, index) => ( answerList.map((answer, index2) => (
                        <div className="answer" key={surveyResponse.question + "-" + index}>{answer}</div>
                    ))))}
                </div>
            ))}
        </div>
    );
};
