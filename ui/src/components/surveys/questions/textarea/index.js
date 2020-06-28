import React from "react";

export default function TextArea({ question }) {
    if (question.qType !== 'textarea') {
        return null;
    }

    return (
        <div>
            <div><i className="fas fa-chevron-circle-right"></i>&nbsp;<strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div><textarea name={question.questionId} rows="5" cols="100" /></div>
        </div>
    );
};
