import React from "react";

import '../../../forms/inputs.css';

export default function TextBox({ question, handleInputChange }) {
    if (question.qType !== 'textbox') {
        return null;
    }

    return (
        <div className="form-group field">
            <div><input type="text" name={question.questionId} className="form-field" onChange={handleInputChange} /></div>
        </div>
    );
};
