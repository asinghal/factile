import React, { useState } from "react";

export default function RatingsScale({ question, saveResponse }) {
    const [ responses, setResponses ] = useState({});

    if (question.qType !== 'rating') {
        return null;
    }

    const buildResponseObject = (dimensionId, value) => {
        const obj = responses[dimensionId] || {
            question : dimensionId,
            answers : [],
            other : null,
            ranking : false
        };

        return { ...obj, answers: [value] };
    }

    const handleInputChange = (event) => {
        event.persist();
        const updated = {...responses, [event.target.name]: buildResponseObject(event.target.name, event.target.value)};
        setResponses(updated);
        saveResponse(updated[event.target.name]);
    };

    return (
        <div>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th></th>
                    {question.options.map(option => (
                    <th key={question.questionId + "-" + option.value}>
                        {option.texts[0].text}
                    </th>
                    ))}
                </tr>
                </thead>

                <tbody>

                {question.dimensions.map(dimension => (
                    <tr key={question.questionId + "-" + dimension.value}>
                        <td>{dimension.texts[0].text}</td>
                        {question.options.map(option => (
                        <td key={question.questionId + "-" + dimension.value + "-" + option.value}>
                            <input type="radio" name={question.questionId + "-" + dimension.value} value={option.value} onChange={handleInputChange} />
                        </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
