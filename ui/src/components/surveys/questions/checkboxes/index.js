import React, { useState } from "react";

import '../../../forms/choices.css';

export default function Checkboxes({ question, persistResponse }) {
    const [ selected, setSelected ] = useState({});

    const [ response, setResponse ] = useState({
        answers: [],
        other: null
    })

    if (question.qType !== 'checkbox') {
        return null;
    }

    const persist = (res) => {
        setResponse(res);
        persistResponse(res);
    };

    const getKey = (question, option) => question.questionId + "-" + option.value;

    const onChange = (event) => {
        event.persist();
        const updated = {...selected, [event.target.id]: !selected[event.target.id]};
        setSelected(updated);
        // filter and recompute instead of push and splice as it will be cleaner even though slightly less performant
        const filtered = Object.keys(updated).filter((key) => !!updated[key]).map(key => key.replace(question.questionId + '-', ''));
        persist({ ...response, answers: filtered });
    };

    const handleTextChange = (event) => {
        event.persist();
        persist({ ...response, other: event.target.value });
    }

    return (
        <div className="choices checkbox">
            <div>
                {question.options.map(option => (
                    <div key={getKey(question, option)}>
                        <input type="checkbox" name={question.questionId} value={option.value} id={getKey(question, option)} onChange={onChange} /> <label htmlFor={getKey(question, option)}>{option.texts[0].text}</label>
                    </div>
                ))}

                {question.hasOther &&
                <div>
                    <input type="checkbox" name={question.questionId} value='other' id={getKey(question, {value: 'other'})} onChange={onChange} /> <label htmlFor={getKey(question, {value: 'other'})}>{question.otherBox[0].text}</label>
                </div>
                }
            </div>
            {question.hasOther &&
            <div className="form-group field">
                <div><input type="text" name={question.questionId + "-other"} className="form-field" onChange={handleTextChange} /></div>
            </div>
            }
        </div>
    );
};
