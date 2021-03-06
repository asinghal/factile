import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

import SurveyManagementMenu from "../../../components/surveys/survey-management-menu/index.js";

import { findSurvey, getExcelData } from '../api.js';
import './survey-responses.css';
import { writeXlsx } from "./excel.js";
import SurveyResponseBlock from "./response-block.js";


export default function SurveyResponses() {
    const [surveyResponses, setSurveyResponses] = useState([]);
    const [chartWidth, setChartWidth] = useState(0);
    const { id } = useParams();
    const history = useHistory();

    const ref = useRef(null);

    useEffect(() => {
        setChartWidth(ref.current ? (ref.current.offsetWidth * 0.9) : 0);
    }, []);


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
                <div className="col-md-4 col-lg-3 col-sm-12">
                    <SurveyManagementMenu surveyId={id} />
                </div>
                <div ref={ref} className="col-md-8 col-lg-9 col-sm-12">
                    <div className="row">
                        <div className="col-6 col-lg-4">
                            <button onClick={Download} className="base-btn submit-btn">Download in Excel</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {surveyResponses && surveyResponses.map(surveyResponse => (
                                <SurveyResponseBlock surveyResponse={surveyResponse} chartWidth={chartWidth} key={surveyResponse.question} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
