import React, { useState } from "react";

export default function Dropdown({ question, handleInputChange }) {
    const [ otherSelected, setOtherSelected ] = useState(false);

    if (question.qType !== 'dropdown') {
        return null;
    }

    const onChange = (event) => {
        event.persist();
        setOtherSelected(event.target.name === question.questionId && event.target.value === 'other');
        handleInputChange(event);
    };

    return (
        <div>
            <div className="form-group field">
                <div><i className="fas fa-chevron-circle-right"></i>&nbsp;<strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
                <div>
                    <select name={question.questionId} className="form-field" onChange={onChange}>
                        <option value=''></option>
                        {question.options.map(option => (
                            <option key={question.questionId + "-" + option.value} value={option.value}>{option.texts[0].text}</option>
                        ))}

                        {question.hasOther &&
                            <option value='other'>Other</option>
                        }
                    </select>
                </div>
            </div>

            {question.hasOther && otherSelected &&
                <div className="form-group field margin-on-top">
                    <div>
                        <input type="text" name={question.questionId + "-other"} id={question.questionId + "-other"} onChange={handleInputChange} className="form-field" placeholder={question.otherBox[0].text} />
                        <label htmlFor={question.questionId + "-other"} className="form-label">{question.otherBox[0].text}</label>
                    </div>

                </div>
            }
        </div>
    );
};
