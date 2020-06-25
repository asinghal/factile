import React from "react";

export default function TextBox({ question }) {
    if (question.qType !== 'textbox') {
        return null;
    }

    return (
        <div>
            <div><strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div><input type="text" name={question.questionId} /></div>
        </div>
    );
};
