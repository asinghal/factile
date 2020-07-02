import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import DropdownMenu from '../../../components/dropdown-menu';
import QuestionDesigner from "./question-designer";

import { save, findSurvey } from './api.js';
import { questionTypes } from './question-types.js';

export default function Questionnaire() {
    const [survey, setSurvey] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const SaveDetails = () => {
        save(survey).then(console.log);
    };

    const onSelection = (value) => {
        survey.questions = survey.questions || [];
        survey.questions.push({qType: value});
        setSurvey({...survey});
    };

    useEffect(() => {
        findSurvey(id).then((survey) => {
            survey.questions = survey.questions || [];
            setSurvey({...survey});
        }).catch(() => history.replace('/'));
    }, [id, history]);

    return (
        <div className="new-survey container">
            <h2>{survey.name}</h2>

            <div className="row">
                <div className="offset-8 col-md-2">
                    <DropdownMenu buttonText="Add a question" options={questionTypes} onSelection={(value) => onSelection(value)} />
                </div>
                <div className="col-md-2">
                    <button onClick={SaveDetails}>Save Details</button>
                </div>
            </div>
            <div>
            {survey.questions && survey.questions.map((question, index) => 
                <QuestionDesigner key={index} questionId={question.questionId || ('q' + (index + 1))} question={question} language="1" />
            )}
            </div>
        </div>
    );
}