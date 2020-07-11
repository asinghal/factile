import React from "react";
import { Link } from "react-router-dom";

import './survey-menu.css';

export default function SurveyManagementMenu({ surveyId }) {
    if (!surveyId) {
        return null;
    }
    return (
        <div className="survey-menu">
            <ul>
                <li>
                    <Link to={"/surveys/" + surveyId + "/edit"}>Basic Survey Data</Link>
                </li>

                <li>
                    <Link to={"/surveys/" + surveyId + "/questions"}>Questions</Link>
                </li>

                <li>
                    <Link to={"/surveys/" + surveyId + "/invite"}>Invite audience</Link>
                </li>

                <li>
                    <Link to={"/surveys/" + surveyId + "/preview"} target="_blank">Preview</Link>
                </li>

                <li>
                    <Link to={"/surveys/" + surveyId + "/responses"}>Responses Captured</Link>
                </li>

                <li>
                    <Link to={"/surveys/" + surveyId + "/participants"}>Participants</Link>
                </li>
            </ul>
        </div>
    );
};
