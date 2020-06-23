import React from "react";

export default function RadioButtons({ question }) {
    if (question.qType !== 'radio') {
        return null;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></div>
            <div>
                {question.options.map(option => (
                    <div key={question.questionId + "-" + option.value }>
                        <input type="radio" name={question.questionId} value={option.value} /> &nbsp; {option.texts[0].text}
                    </div>
                ))}
            </div>
        </div>
    );
};
