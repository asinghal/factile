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

    const data = [ ];

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
                                <div><strong>{surveyResponse.question}</strong></div>
                                {surveyResponse.answers.map((answerList, index) => ( answerList.map((answer, index2) => (
                                    <div className="answer" key={surveyResponse.question + "-" + index}>{answer}</div>
                                ))))}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <PieChart data={data} />
                </div>
            </div>
        </div>
    );
};
