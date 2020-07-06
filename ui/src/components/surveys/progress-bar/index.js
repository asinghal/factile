import React from "react";

import './progress-bar.css';

export default function ProgressBar({percentage}) {

    return (
        <div id="progress-bar-wrapper">
            <div className="loading-bar">
                <div className="progress-bar" style={{width: percentage + '%'}}></div>
            </div>
            <div className="status">
                <div className="percentage">{percentage}%</div>
            </div>
        </div>
    );
};
