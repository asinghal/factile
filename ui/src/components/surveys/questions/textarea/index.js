import React from "react";

export default function TextArea({ question }) {
    if (question.qType !== 'textarea') {
        return null;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></div>
            <div><textarea name={question.questionId} rows="5" cols="100" /></div>
        </div>
    );
};
