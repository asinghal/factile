import React from "react";

export default function Ranking({ question }) {
    if (question.qType !== 'ranking') {
        return null;
    }

    return (
        <div>
            <div><i className="fas fa-chevron-circle-right"></i>&nbsp;<strong dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></strong></div>
            <div>
                {question.options.map(option => (
                    <div key={question.questionId + "-" + option.value }>
                        <input type="text" name={question.questionId} value={option.value} /> &nbsp; {option.texts[0].text}
                    </div>
                ))}
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
