import React from "react";
import '../../../forms/inputs.css';

export default function TextArea({ question, handleInputChange }) {
    if (question.qType !== 'textarea') {
        return null;
    }

    return (
        <div className="form-group field">
            <div><i className="fas fa-chevron-circle-right"></i>&nbsp;<strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div><textarea name={question.questionId} rows="5" onChange={handleInputChange} /></div>
        </div>
    );
};
