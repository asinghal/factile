import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import classNames from "classnames";

import DropdownMenu from '../../../components/dropdown-menu';
import QuestionDesigner from "./question-designer";
import SurveyManagementMenu from "../../../components/surveys/survey-management-menu";

import { update, findSurvey } from '../api.js';
import { questionTypes } from './question-types.js';

import '../../../components/forms/buttons.css';
import './questionnaire.css';

export default function Questionnaire() {
    const [survey, setSurvey] = useState({});
    const [overlayVisible, setOverlayVisibility] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const SaveDetails = () => {
        setOverlayVisibility(true);
        update(survey).then(() => setTimeout(() => {
            // slow down the save to avoid flicker on screen that may only confuse the user
            setOverlayVisibility(false);
        }, 300));
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
    
    const KeyActions = ({ index }) => {
        return (
            <div className="row">
                <div className="col-md-6 col-lg-4">
                    <DropdownMenu buttonText="Add a question" options={questionTypes} onSelection={(value) => onSelection(value)} testId={"add-questions-" + index} />
                </div>
                <div className="col-md-6 col-lg-4">
                    <button className="base-btn submit-btn" onClick={SaveDetails} data-testid={"btn-save-details-" + index} >Save Details</button>
                </div>
            </div>
        );
    };

    return (
        <div className="new-survey container">
            <div className="row">
                <div className="col-md-4 col-lg-3 col-sm-12">
                    <SurveyManagementMenu surveyId={survey.surveyId} />
                </div>
                <div className="col-md-8 col-lg-9 col-sm-12">
                    <h2 data-testid="survey-title">{survey.name}</h2>

                    <div className={classNames('overlay', { 'visible': overlayVisible })}></div>

                    {survey.status === 'Draft' && 
                        <div className="alert alert-warning">This survey must be activated on the Invitations page before it can be accessed by respondents</div>
                    }

                    <KeyActions index="0" />
                    <div>
                    {survey.questions && survey.questions.map((question, index) => 
                        <QuestionDesigner key={index} questionId={question.questionId || ('q' + (index + 1))} question={question} allQuestions={survey.questions} language={survey.language || '1'} deleteQuestion={() => deleteQuestion(index)} />
                    )}
                    </div>
                    {survey.questions && !!survey.questions.length &&
                        <KeyActions index="1" />
                    }
                </div>
            </div>
        </div>
    );
}