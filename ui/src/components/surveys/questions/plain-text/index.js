import React from "react";

export default function PlainText({ question }) {
    if (question.qType !== 'plaintext') {
        return null;
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: question.texts[0].text }}>
        </div>
    );
};
