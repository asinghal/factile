import React from "react";

export default function RatingsScale({ question }) {
    if (question.qType !== 'rating') {
        return null;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></div>
            <table>
                <tr>
                    <td></td>
                    {question.options.map(option => (
                    <td>
                        {option.texts[0].text}
                    </td>
                    ))}
                </tr>

                {question.dimensions.map(dimension => (
                    <tr>
                        <td>{dimension.texts[0].text}</td>
                        {question.options.map(option => (
                        <td>
                            <input type="radio" name={question.questionId + "-" + dimension.value} value={option.value} />
                        </td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    );
};
