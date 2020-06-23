import React from "react";

export default function PageBreak(question) {
    if (question.qType !== 'page') {
        return null;
    }

    return (
        <div>
        </div>
    );
};
