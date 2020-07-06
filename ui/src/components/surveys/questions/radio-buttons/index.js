import React, { useState } from "react";

import '../../../forms/choices.css';

export default function RadioButtons({ question, handleInputChange }) {
    const [ otherSelected, setOtherSelected ] = useState(false);

    if (question.qType !== 'radio') {
        return null;
    }

    const onChange = (event) => {
        event.persist();
        setOtherSelected(event.target.name === question.questionId && event.target.value === 'other');
        handleInputChange(event);
    };

    const getKey = (question, option) => question.questionId + "-" + option.value;

    return (
        <div className="choices radio">
            <div><i className="fas fa-chevron-circle-right"></i>&nbsp;<strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div>
                {question.options.map(option => (
                    <div key={getKey(question, option) }>
                        <input type="radio" name={question.questionId} value={option.value} id={getKey(question, option)} onChange={onChange} /><label htmlFor={getKey(question, option)}>{option.texts[0].text}</label>
                    </div>
                ))}

                {question.hasOther &&
                    <div>
                        <input type="radio" name={question.questionId} value='other' id={getKey(question, {value: 'other'})} onChange={onChange} /> <label htmlFor={getKey(question, {value: 'other'})}>{question.otherBox[0].text}</label>
                    </div>
                }
            </div>

            {question.hasOther && otherSelected &&
            <div className="form-group field" >
                <div><input type="text" name={question.questionId + "-other"} onChange={handleInputChange} className="form-field"  /></div>
            </div>
            }
        </div>
    );
};
