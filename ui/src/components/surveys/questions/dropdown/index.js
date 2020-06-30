import React from "react";

export default function Dropdown({ question }) {
    if (question.qType !== 'dropdown') {
        return null;
    }

    return (
        <div>
            <div><i className="fas fa-chevron-circle-right"></i>&nbsp;<strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div>
                <select name={question.questionId}>
                    {question.options.map(option => (
                        <option key={question.questionId + "-" + option.value} value={option.value}>{option.texts[0].text}</option>
                    ))}

                    {question.hasOther &&
                        <option value='other'></option>
                    }
                </select>
            </div>

            {question.hasOther &&
                <div>
                    <div>{question.otherBox[0].text}</div>
                    <div><input type="text" name={question.questionId + "-other"} /></div>
                </div>
            }
        </div>
    );
};
