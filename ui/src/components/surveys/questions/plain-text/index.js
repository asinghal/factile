import React from "react";

export default function PlainText({ question }) {
    if (question.qType !== 'plaintext') {
        return null;
    }

    return (
        <div>
            <i className="fas fa-chevron-circle-right"></i>&nbsp;<span dangerouslySetInnerHTML={{ __html: question.texts[0].text }}></span>
        </div>
    );
};
