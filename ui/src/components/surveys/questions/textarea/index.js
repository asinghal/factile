import React from "react";
import '../../../forms/inputs.css';

export default function TextArea({ question, handleInputChange }) {
    if (question.qType !== 'textarea') {
        return null;
    }

    return (
        <div className="form-group field">
            <div><textarea name={question.questionId} rows="5" onChange={handleInputChange} /></div>
        </div>
    );
};
