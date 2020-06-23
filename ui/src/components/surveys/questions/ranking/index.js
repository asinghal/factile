import React from "react";

export default function Ranking({ question }) {
    if (question.qType !== 'ranking') {
        return null;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></div>
            <div>
                {question.options.map(option => (
                    <div key={question.questionId + "-" + option.value }>
                        <input type="text" name={question.questionId} value={option.value} /> &nbsp; {option.texts[0].text}
                    </div>
                ))}
            </div>
        </div>
    );
};
