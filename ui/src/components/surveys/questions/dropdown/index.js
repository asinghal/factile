import React from "react";

export default function Dropdown({ question }) {
    if (question.qType !== 'dropdown') {
        return null;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></div>
            <div>
                <select name={question.questionId}>
                    {question.options.map(option => (
                        <option value={option.value}>{option.texts[0].text}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
