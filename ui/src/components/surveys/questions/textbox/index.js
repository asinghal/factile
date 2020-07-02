import React from "react";

import '../../../forms/inputs.css';

export default function TextBox({ question }) {
    if (question.qType !== 'textbox') {
        return null;
    }

    return (
        <div className="form-group field">
            <div><i className="fas fa-chevron-circle-right"></i>&nbsp;<strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div><input type="text" name={question.questionId} className="form-field" /></div>
        </div>
    );
};
