import React from "react";

import '../../../forms/choices.css';

export default function Checkboxes({ question }) {
    if (question.qType !== 'checkbox') {
        return null;
    }

    const getKey = (question, option) => question.questionId + "-" + option.value;

    return (
        <div className="choices checkbox">
            <div><i className="fas fa-chevron-circle-right"></i>&nbsp;<strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div>
                {question.options.map(option => (
                    <div key={getKey(question, option)}>
                        <input type="checkbox" name={question.questionId} value={option.value} id={getKey(question, option)} /> <label htmlFor={getKey(question, option)}>{option.texts[0].text}</label>
                    </div>
                ))}

                {question.hasOther &&
                <div>
                    <input type="checkbox" name={question.questionId} value='other' id={getKey(question, 'other')} /> <label htmlFor={getKey(question, 'other')}>{question.otherBox[0].text}</label>
                </div>
                }
            </div>
            {question.hasOther &&
            <div>
                <div><input type="text" name={question.questionId + "-other"} /></div>
            </div>
            }
        </div>
    );
};
