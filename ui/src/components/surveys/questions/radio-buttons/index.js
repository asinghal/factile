import React from "react";

import './radio.css';

export default function RadioButtons({ question }) {
    if (question.qType !== 'radio') {
        return null;
    }

    const getKey = (question, option) => question.questionId + "-" + option.value;

    return (
        <div className="radio">
            <div><i className="fas fa-chevron-circle-right"></i>&nbsp;<strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div>
                {question.options.map(option => (
                    <div key={getKey(question, option) }>
                        <input type="radio" name={question.questionId} value={option.value} id={getKey(question, option)} /><label for={getKey(question, option)}>{option.texts[0].text}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};
