import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReactWordcloud from 'react-wordcloud';

import SurveyManagementMenu from "../../components/surveys/survey-management-menu/index.js";

import { findSurvey, getExcelData } from './api.js';
import './survey-responses.css';
import PieChart from "../../components/charts/pie-chart/index.js";
import { writeXlsx } from "./excel.js";
import BarChart from "../../components/charts/bar-chart/index.js";


export default function SurveyResponses() {
    const [surveyResponses, setSurveyResponses] = useState([]);
    const [chartWidth, setChartWidth] = useState(0);
    const { id } = useParams();
    const history = useHistory();

    const ref = useRef(null);

    useEffect(() => {
        setChartWidth(ref.current ? (ref.current.offsetWidth * 0.9) : 0);
    }, [ref.current]);


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
                <div ref={ref} className="col-md-9 col-sm-12">
                    <div>
                        <button onClick={Download} className="base-btn submit-btn">Download in Excel</button>
                    </div>
                    <div>
                        {surveyResponses.map(surveyResponse => (
                            <div className="block" key={surveyResponse.question}>
                                <div><strong>{surveyResponse.texts.question}</strong></div>
                                {!surveyResponse.hasOptions &&
                                <div style={{ height: 400, width: chartWidth }}>
                                    <ReactWordcloud words={surveyResponse.words} />
                                </div>
                                }
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
                                    {surveyResponse.answers && surveyResponse.answers.length < 6 &&
                                        <PieChart data={surveyResponse.answers} key={`${surveyResponse.question}-pie`} width={chartWidth} />
                                    }
                                    {surveyResponse.answers && surveyResponse.answers.length >= 6 &&
                                        <BarChart data={surveyResponse.answers} key={`${surveyResponse.question}-bar`} width={chartWidth} />
                                    }
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
