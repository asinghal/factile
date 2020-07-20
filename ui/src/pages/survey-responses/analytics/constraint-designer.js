import React, { useState } from "react";

export default function Constraint({ questions, first, addConstraint }) {
    const [questionId, setQuestionId] = useState('');
    const [options, setOptions] = useState([]);

    const handleFilterChange = (event) => {
        const index = event.target.value.indexOf('_');
        const qId = index === -1 ? event.target.value : event.target.value.substring(0, index);
        setQuestionId(event.target.value);
        setOptions(questions.find(q => q.questionId === qId).options);
    };

    const handleValueSelection = (event) => {
        addConstraint({ question: questionId, value: event.target.value });
    };

    return (
        <div className="row form-group">
            <div className="col-md-1">
                {!first && 
                    <span>AND</span>
                }
            </div>
            <div className="col-md-4">
                <select className="form-field" onChange={handleFilterChange}>
                    <option></option>
                    {questions.map((q, i) =>
                    <>
                    {!q.dimensions &&
                        <option value={q.questionId} key={q.questionId + '_question_' + i}>{q.texts[0].text}</option>
                    }
                    {q.dimensions && q.dimensions.map(d =>
                        <option value={q.questionId + '_' + d.value} key={q.questionId + '_question_' + i + '_' + d.value}>{[q.texts[0].text, d.texts[0].text].join(': ')}</option>
                    )}
                    </>
                    )}
                </select>
            </div>
            <div className="col-md-1">
                is
            </div>
            <div className="col-md-4">
                <select className="form-field" onChange={handleValueSelection}>
                    <option></option>
                    {options.map((o, i) =>
                        <option value={o.value} key={questionId + '_option_' + i}>{o.texts[0].text}</option>
                    )}
                </select>
            </div>
        </div>
    );
};
