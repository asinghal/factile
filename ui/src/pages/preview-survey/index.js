import React, { useState, useEffect } from "react";
import { findSurvey } from './api.js';

import { useParams, useHistory } from "react-router-dom";

import Question from '../../components/surveys/questions/index.js';

import ProgressBar from '../../components/surveys/progress-bar/index.js';

import '../../components/forms/buttons.css';

const Page = ({ page, saveResponse }) => (
    <div>
        {page.questions && page.questions.map(q =>
            <Question question={q} key={q.questionId} saveResponse={(response) => saveResponse(response)} />
        )}
    </div>
);

export default function PreviewSurvey() {
    const [survey, setSurvey] = useState({ layout: {} });
    const [pageNum, setPageNum] = useState(0);
    const { id } = useParams();
    const history = useHistory();

    const NextPage = (event) => {
        if (survey.pages && pageNum <= survey.pages.length) {
            setPageNum(pageNum + 1);
        }
        event.preventDefault();
    };

    const hasSurveyFinished = () => {
        return survey.pages && pageNum > survey.pages.length;
    };

    const saveResponse = (answer) => {
        console.log(answer);
    };

    useEffect(() => {
        findSurvey(id).then((survey) => {
            if (survey && !survey.intro_text) {
                setPageNum(1);
            }
            setSurvey(survey);
        }).catch(() => history.replace('/'));
    }, [id, history]);

    return (
        <div className="container">
            <h2>{survey.name}</h2>
            {survey.intro_text &&
                <div>
                    <div>{survey.intro_text}</div>
                    <button onClick={(event) => NextPage(event)}>Next</button>
                </div>
            }
            <div>
                {pageNum > 0 && survey.pages && survey.pages[pageNum-1] && 
                <div>
                    <Page page={survey.pages[pageNum-1]} saveResponse={saveResponse} />
                    <button onClick={(event) => NextPage(event)} className="base-btn submit-btn">Next</button>
                </div>
                }
            </div>

            {survey.layout.includeProgress && 
            <div>
                <ProgressBar percentage="50" />
            </div>
            }

            {hasSurveyFinished() &&
                <div dangerouslySetInnerHTML={{ __html: survey.thank_you_text }}></div>
            }

        </div>
    );
};
