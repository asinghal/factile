import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import SurveyManagementMenu from "../../components/surveys/survey-management-menu/index.js";

import { findSurvey } from './api.js';
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
            <div className="row">
                <div className="col-md-3 col-sm-12">
                    <SurveyManagementMenu surveyId={id} />
                </div>
                <div className="col-md-9 col-sm-12">
                    {surveyResponses.map(surveyResponse => (
                        <div className="block" key={surveyResponse.question}>
                            <div><strong>{surveyResponse.question}</strong></div>
                            {surveyResponse.answers.map((answerList, index) => ( answerList.map((answer, index2) => (
                                <div className="answer" key={surveyResponse.question + "-" + index}>{answer}</div>
                            ))))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
