import React, { useState } from "react";
import ReactWordcloud from 'react-wordcloud';

import PieChart from "../../../components/charts/pie-chart/index.js";
import BarChart from "../../../components/charts/bar-chart/index.js";

export default function SurveyResponseBlock({ surveyResponse, chartWidth }) {

    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="block">
            <div className="question-header">
                <div>
                    <strong>{surveyResponse.texts.question}</strong>
                </div>
                <div>
                    {!collapsed &&
                        <i className="icon fas fa-chevron-circle-up" onClick={() => setCollapsed(!collapsed)}></i>
                    }
                    {collapsed &&
                        <i className="icon fas fa-chevron-circle-down" onClick={() => setCollapsed(!collapsed)}></i>
                    }
                </div>
            </div>
            {!collapsed &&
            <>
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
            </>
            }
        </div>
    );
};
