import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import DropdownMenu from '../../../components/dropdown-menu';
import QuestionDesigner from "./question-designer";

import { save, findSurvey } from './api.js';
import { questionTypes } from './question-types.js';

import '../../../components/forms/buttons.css';

export default function Questionnaire() {
    const [survey, setSurvey] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const SaveDetails = () => {
        save(survey);
    };

    const onSelection = (value) => {
        survey.questions = survey.questions || [];
        survey.questions.push({qType: value});
        setSurvey({...survey});
    };

    const deleteQuestion = (index) => {
        survey.questions.splice(index, 1);
        setSurvey({...survey});
        SaveDetails();
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
                <div className="col-md-6">
                    <DropdownMenu buttonText="Add a question" options={questionTypes} onSelection={(value) => onSelection(value)} />
                </div>
                <div className="col-md-6">
                    <button className="base-btn submit-btn" onClick={SaveDetails}>Save Details</button>
                </div>
            </div>
            <div>
            {survey.questions && survey.questions.map((question, index) => 
                <QuestionDesigner key={index} questionId={question.questionId || ('q' + (index + 1))} question={question} language="1" deleteQuestion={() => deleteQuestion(index)} />
            )}
            </div>
        </div>
    );
}