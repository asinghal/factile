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
    const [percentageCompletion, setPercentageCompletion] = useState(0);

    const findNextDisplayablePage = (totalPages) => {
        let nextPageNum = pageNum + 1;

        for (; nextPageNum <= totalPages; nextPageNum++) {
            if (!survey.pages[nextPageNum - 1].conditions || survey.pages[nextPageNum - 1].conditions.map(c => c.result === undefined || c.result).reduce((a, b) => a && b, true)) {
                break;
            }
        }

        return nextPageNum;
    };

    const NextPage = (event) => {
        event.preventDefault();
        if (pageNum > 0) {
            if (!onPageSubmit(pageNum - 1)) {
                return false;
            }
        }
        if (survey.pages && pageNum <= survey.pages.length) {
            const nextPageNum = findNextDisplayablePage(survey.pages.length);
            if (nextPageNum > survey.pages.length) {
                setPercentageCompletion(100);
            } else {
                setPercentageCompletion((nextPageNum / survey.pages.length) * 100);
            }
            setPageNum(nextPageNum);
        }
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
            // if there is a page with intro text, first page with questions needs to be pushed out
            setPageNum(1);
        } else {
            setPageNum(0);
        }
    // eslint-disable-next-line
    }, [survey.surveyId]);

    return (
        <div className="main-wrapper" style={{ backgroundColor: survey.layout.bodycolor }}>
            <div className="container survey" style={{ backgroundColor: survey.layout.containercolor, color: survey.layout.textColor }}>
                {!!survey.logo && 
                    <div className={"survey-logo" + (!!survey.layout.logoAlignment ? ` img-${survey.layout.logoAlignment}` : '')} style={{backgroundColor: survey.layout.logoBgColor}}>
                        <img src={`/uploads/${survey.hash_string}/${survey.logo}`} alt={survey.name} />
                    </div>
                }
                <h2>{survey.name}</h2>

                {!answersAreValid &&
                <div className="alert alert-danger">Please answer all questions marked with **</div>
                }
                {survey.intro_text && pageNum === 0 &&
                <>
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <div>{survey.intro_text}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-sm-4 col-md-4">
                            <button onClick={(event) => NextPage(event)} className="base-btn submit-btn">Next</button>
                        </div>
                    </div>
                </>
                }
                <div>
                    {pageNum > 0 && survey.pages && survey.pages[pageNum-1] && 
                    <>
                        <div className="row">
                            <div className="col-12 col-md-12">
                                <p><i>Questions marked with ** are mandatory</i></p>
                                <Page page={survey.pages[pageNum-1]} saveResponse={saveResponse} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 col-sm-4 col-md-4">
                                <button onClick={(event) => NextPage(event)} className="base-btn submit-btn">Next</button>
                            </div>
                        </div>
                    </>
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
                    <ProgressBar percentage={percentageCompletion} />
                </div>
                }

            </div>
        </div>
    );
};
