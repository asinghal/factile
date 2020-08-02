import React from "react";

import './help-text.css';

export default function HelpText({ text }) {
    return (
        <div className="help-text">
            <i className="fas fa-info-circle"></i>&nbsp;{text}
        </div>
    );
};