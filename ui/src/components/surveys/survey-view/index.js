import React, { useState, useEffect } from "react";

import Question from '../questions/index.js';

import ProgressBar from '../progress-bar/index.js';

import '../../forms/buttons.css';
import './survey-view.css';

const Page = ({ page, saveResponse }) => (
    <div>
        {page.questions && page.questions.map(q =>
            <Question question={q} key={q.questionId} saveResponse={(response) => saveResponse(response)} />
        )}
    </div>
);

export default function SurveyView({ survey, addResponse, onPageSubmit, answersAreValid }) {
    const [pageNum, setPageNum] = useState(0);

    const NextPage = (event) => {
        if (pageNum > 0) {
            if (!onPageSubmit(pageNum - 1)) {
                return false;
            }
        }
        if (survey.pages && pageNum <= survey.pages.length) {
            setPageNum(pageNum + 1);
        }
        event.preventDefault();
        return true;
    };

    const hasSurveyFinished = () => {
        return survey.pages && pageNum > survey.pages.length;
    };

    const saveResponse = (answer) => {
        addResponse(answer);
    };

    useEffect(() => {
        if (survey && !survey.intro_text) {
            setPageNum(1);
        } else {
            setPageNum(0);
        }
    }, [survey.surveyId]);

    return (
        <div className="main-wrapper" style={{ backgroundColor: survey.layout.bodycolor }}>
            <div className="container survey" style={{ backgroundColor: survey.layout.containercolor, color: survey.layout.textColor }}>
                <h2>{survey.name}</h2>

                {!answersAreValid &&
                <div className="error">Please answer all questions marked with **</div>
                }
                {survey.intro_text && pageNum === 0 &&
                    <div>
                        <div>{survey.intro_text}</div>
                        <button onClick={(event) => NextPage(event)} className="base-btn submit-btn">Next</button>
                    </div>
                }
                <div>
                    {pageNum > 0 && survey.pages && survey.pages[pageNum-1] && 
                    <div>
                        <p><i>Questions marked with ** are mandatory</i></p>
                        <Page page={survey.pages[pageNum-1]} saveResponse={saveResponse} />
                        <button onClick={(event) => NextPage(event)} className="base-btn submit-btn">Next</button>
                    </div>
                    }
                </div>

                {hasSurveyFinished() &&
                <>
                    <div dangerouslySetInnerHTML={{ __html: survey.thank_you_text }}></div>
                    <div><i>You can safely close this window now</i></div>
                </>
                }

                {survey.layout.includeProgress && 
                <div>
                    <ProgressBar percentage="50" />
                </div>
                }

            </div>
        </div>
    );
};
