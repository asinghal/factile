import React, { useState, useEffect } from "react";

import Question from '../questions/index.js';

import ProgressBar from '../progress-bar/index.js';

import '../../forms/buttons.css';

const Page = ({ page, saveResponse }) => (
    <div>
        {page.questions && page.questions.map(q =>
            <Question question={q} key={q.questionId} saveResponse={(response) => saveResponse(response)} />
        )}
    </div>
);

export default function SurveyView({ survey }) {
    const [pageNum, setPageNum] = useState(0);

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
        if (survey && !survey.intro_text) {
            setPageNum(1);
        } else {
            setPageNum(0);
        }
    }, [survey.surveyId]);

    return (
        <div className="container">
            <h2>{survey.name}</h2>
            {survey.intro_text && pageNum === 0 &&
                <div>
                    <div>{survey.intro_text}</div>
                    <button onClick={(event) => NextPage(event)} className="base-btn submit-btn">Next</button>
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
            <>
                <div dangerouslySetInnerHTML={{ __html: survey.thank_you_text }}></div>
                <div><i>You can safely close this window now</i></div>
            </>
            }

        </div>
    );
};
