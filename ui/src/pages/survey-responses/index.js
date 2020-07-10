import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import SurveyManagementMenu from "../../components/surveys/survey-management-menu/index.js";

import { findSurvey, getExcelData } from './api.js';
import './survey-responses.css';
import PieChart from "../../components/charts/pie-chart/index.js";
import { writeXlsx } from "./excel.js";


export default function SurveyResponses() {
    const [surveyResponses, setSurveyResponses] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(setSurveyResponses).catch(() => history.replace('/'));
    }, [id, history]);

    const Download = (event) => {
        event.persist();
        getExcelData(id).then(writeXlsx);
    };

    return (
        <div className="container survey-responses">
            <div className="row">
                <div className="col-md-3 col-sm-12">
                    <SurveyManagementMenu surveyId={id} />
                </div>
                <div className="col-md-9 col-sm-12">
                    <div>
                        <button onClick={Download} className="base-btn submit-btn">Download in Excel</button>
                    </div>
                    <div>
                        {surveyResponses.map(surveyResponse => (
                            <div className="block" key={surveyResponse.question}>
                                <div><strong>{surveyResponse.texts.question}</strong></div>
                                {!surveyResponse.hasOptions && surveyResponse.answers.map((answer, index) => (
                                    <div className="answer" key={surveyResponse.question + "-" + index}>{answer}</div>
                                ))}
                                {surveyResponse.hasOptions && 
                                <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Option</th>
                                                <th>Count</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {surveyResponse.answers.map((answer, index) => (
                                            <tr key={surveyResponse.question + "-" + index}>
                                                <td>{answer.name}</td>
                                                <td>{answer.value}</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <PieChart data={surveyResponse.answers} key={`${surveyResponse.question}-pie`} />
                                </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
