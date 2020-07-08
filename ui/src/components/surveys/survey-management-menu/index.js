import React from "react";
import { Link } from "react-router-dom";

import './survey-menu.css';

export default function SurveyManagementMenu({ surveyId }) {
    if (!surveyId) {
        return null;
    }
    return (
        <div class="survey-menu">
            <ul>
                <li>
                    <Link to={"/surveys/" + surveyId + "/edit"}>Edit Survey Data</Link>
                </li>

                <li>
                    <Link to={"/surveys/" + surveyId + "/questions"}>Edit Questions</Link>
                </li>

                <li>
                    <Link to={"/surveys/" + surveyId + "/invite"}>Invite audience</Link>
                </li>

                <li>
                    <Link to={"/surveys/" + surveyId + "/responses"}>Responses</Link>
                </li>

                <li>
                    <Link to={"/surveys/" + surveyId + "/preview"}>Preview</Link>
                </li>

                <li>
                    <Link to={"/surveys/" + surveyId + "/participants"}>Participants</Link>
                </li>
            </ul>
        </div>
    );
};
