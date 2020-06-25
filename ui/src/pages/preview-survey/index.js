import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams, useHistory } from "react-router-dom";

import Question from '../../components/surveys/questions/index.js';

export default function PreviewSurvey() {
    const [survey, setSurvey] = useState({questions: []});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(setSurvey).catch(() => history.replace('/'));
    }, []);

    return (
        <div className="container">
            <h2>{survey.name}</h2>
            <div></div>{survey.intro_text}
            {survey.questions.map(q => 
                <Question question={q} key={q.questionId} />
            )}

            <div dangerouslySetInnerHTML={{ __html: survey.thank_you_text }}></div>
        </div>
    );
};
