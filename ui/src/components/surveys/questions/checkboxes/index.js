import React from "react";

export default function Checkboxes({ question }) {
    if (question.qType !== 'checkbox') {
        return null;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></div>
            <div>
                {question.options.map(option => (
                    <div key={question.questionId + "-" + option.value }>
                        <input type="checkbox" name={question.questionId} value={option.value} /> &nbsp; {option.texts[0].text}
                    </div>
                ))}
            </div>
        </div>
    );
};
