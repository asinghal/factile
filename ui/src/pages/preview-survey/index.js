import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams } from "react-router-dom";

import Question from '../../components/surveys/questions/index.js';

export default function PreviewSurvey() {
    const [survey, setSurvey] = useState({questions: []});
    let { id } = useParams();

    useEffect(() => {
        findSurvey(id).then(setSurvey)
    }, []);

    return (
        <div className="container">
            <h2>{survey.name}</h2>
            {survey.questions.map(q => 
                <Question question={q} key={q.questionId} />
            )}

            <div dangerouslySetInnerHTML={{ __html: survey.thank_you_text }}></div>
        </div>
    );
};
