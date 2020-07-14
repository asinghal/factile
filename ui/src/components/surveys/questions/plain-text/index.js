import React from "react";

export default function PlainText({ question }) {
    if (question.qType !== 'plaintext') {
        return null;
    }

    return (
        <div>
        </div>
    );
};
