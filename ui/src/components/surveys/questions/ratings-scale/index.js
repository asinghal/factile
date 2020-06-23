import React from "react";

export default function RatingsScale({ question }) {
    if (question.qType !== 'rating') {
        return null;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></div>
            <table>
                <thead>
                <tr>
                    <td></td>
                    {question.options.map(option => (
                    <td key={question.questionId + "-" + option.value}>
                        {option.texts[0].text}
                    </td>
                    ))}
                </tr>
                </thead>

                <tbody>

                {question.dimensions.map(dimension => (
                    <tr key={question.questionId + "-" + dimension.value}>
                        <td>{dimension.texts[0].text}</td>
                        {question.options.map(option => (
                        <td key={question.questionId + "-" + dimension.value + "-" + option.value}>
                            <input type="radio" name={question.questionId + "-" + dimension.value} value={option.value} />
                        </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
