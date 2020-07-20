import React from "react";

export default function TargetQuestions({ questions, selectedQuestions, setSelectedQuestions }) {

    const toggleCheckbox = (questionId) => {
        if (selectedQuestions.indexOf(questionId) === -1) {
            setSelectedQuestions([...selectedQuestions, questionId]);
        } else {
            setSelectedQuestions(selectedQuestions.filter(q => q !== questionId));
        }
    };

    return (
        <div className="choices checkbox">
            {questions.map((q, index) => 
                <>
                    {!q.dimensions &&
                    <div key={'q_' + index}>
                        <input type="checkbox" id={'q_' + q.questionId} onChange={() => toggleCheckbox(q.questionId)} /><label htmlFor={'q_' + q.questionId}>{q.texts[0].text}</label>
                    </div>
                    }
                    {q.dimensions &&
                        <div>{q.texts[0].text}</div>
                    }
                    {q.dimensions && q.dimensions.map(d =>
                    <div key={'q_' + index + '_' + d.value}>
                        <input type="checkbox" id={'q_' + q.questionId + '_' + d.value} onChange={() => toggleCheckbox(q.questionId + '_' + d.value)} /><label htmlFor={'q_' + q.questionId + '_' + d.value}>{d.texts[0].text || '...'}</label>
                    </div>
                    )}
                </>
            )}
        </div>
    );
};
