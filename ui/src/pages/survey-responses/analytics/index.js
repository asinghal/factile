import React, { useState, useEffect } from "react";
import SurveyManagementMenu from "../../../components/surveys/survey-management-menu";
import { useParams, useHistory } from "react-router-dom";
import { findSurvey } from "../../survey-editor/api";
import Constraint from "./constraint-designer";
import { generateReport } from "../api";
import SurveyResponseBlock from "../summary/response-block";
import TargetQuestions from "./target-questions";

export default function SurveyAnalytics() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [surveyResponses, setSurveyResponses] = useState([]);
    const [constraints, setConstraints] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(survey => {
            setQuestions(survey.questions.filter(q => !!q.options));
            addConstraint({ question: '', value: '' });
        }).catch(() => history.replace('/'));
    }, [id, history]);

    const addConstraint = (constraint) => {
        const list = constraints.filter(c => c.question !== constraint.question);
        setConstraints([ ...list, constraint ]);
    };

    const generate = () => {
        generateReport(id, {
            questions: selectedQuestions,
            constraints: constraints.filter(c => c.question)
        }).then(setSurveyResponses);
    };

    return (
        <div className="container survey-responses">
            <div className="row">
                <div className="col-md-3 col-sm-12">
                    <SurveyManagementMenu surveyId={id} />
                </div>
                <div className="col-md-9 col-sm-12">
                    <div className="row">
                        <h3>Questions</h3>
                        <p className="alert alert-info">Select the questions below to form groups and generate most preferred answer combinations.</p>
                        <TargetQuestions questions={questions} selectedQuestions={selectedQuestions} setSelectedQuestions={setSelectedQuestions} />
                    </div>

                    <div className="row">
                        <h3>Filters/ Constraints</h3>
                        <p className="alert alert-info">Build constraints to be applied on the data set, <em>before</em> it is aggregated to generate the report.</p>
                        <strong>When</strong>
                        {constraints.map( (c, index) =>
                            <Constraint questions={questions} first={index === 0} addConstraint={addConstraint} key={'constraint_' + index}/>
                        )}
                    </div>

                    <div className="row">
                        <button className="base-btn submit-btn" onClick={generate}>Generate</button>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-12">
                            {surveyResponses && surveyResponses.map(surveyResponse => (
                                <SurveyResponseBlock surveyResponse={surveyResponse} chartWidth={600} key={surveyResponse.question} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
