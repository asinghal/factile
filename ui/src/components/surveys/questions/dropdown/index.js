import React from "react";

export default function Dropdown({ question }) {
    if (question.qType !== 'dropdown') {
        return null;
    }

    return (
        <div>
            <div><strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div>
                <select name={question.questionId}>
                    {question.options.map(option => (
                        <option key={question.questionId + "-" + option.value} value={option.value}>{option.texts[0].text}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
