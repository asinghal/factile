import React from "react";

import './steps-nav.css';

export default function SurveyStepsNav({ currentStepNum }) {
    return (
        <div className="steps-nav">
            <ul>
                <li>
                    <div className={"step-num " + (currentStepNum === '1' ? 'active': '')}>1</div>
                    <div className="step-details">Edit basic details</div>
                </li>
                <li>
                    <div className="connector">&nbsp;</div>
                </li>
                <li>
                    <div className={"step-num " + (currentStepNum === '2' ? 'active': '')}>2</div>
                    <div className="step-details">Add questions</div>
                </li>
                <li>
                    <div className="connector">&nbsp;</div>
                </li>
                <li>
                    <div className={"step-num " + (currentStepNum === '3' ? 'active': '')}>3</div>
                    <div className="step-details">Rollout/ Invite audience</div>
                </li>
            </ul>
        </div>
    );
};
