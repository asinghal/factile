import React, { useState, useEffect } from "react";
import { questionTypes } from './question-types.js';

import '../../../components/forms/choices.css';
import '../../../components/forms/inputs.css';

import './questionnaire.css';
import PageConditions from "./page-conditions.js";

const toTextArray = (text, language) => ({ texts: [ { text, language } ]});
const toArray = (text) => text.split('\n');

const assignValues = (array, prefix) => array.map((o, index) => {
    o.value = prefix + (index + 1);
    return o;
})

const prefixes = {
    options: 'o',
    dimensions: 'd'
};

const foldTexts = (arr) => arr ? arr.map((item) => item.texts[0].text).reduce((s, o) => s + "\n" + o, "").trim() : "";

export default function QuestionDesigner({question, allQuestions, questionId, language, deleteQuestion}) {
    const qTypeMetaInfo = questionTypes.find(q => q.value === question.qType);
    const text = question.texts && question.texts.length > 0 ? question.texts[0].text : '';
    const otherBox = question.otherBox && question.otherBox.length > 0 ? question.otherBox[0].text : '';
    const options = foldTexts(question.options);
    const dimensions = foldTexts(question.dimensions);
    const [questionData, setQuestionData] = useState({text, options, dimensions, otherBox, mandatory: !!question.mandatory});
    const [answerPipingData, setAnswerPipingData] = useState({ questions: [], display: false, field: null });

    useEffect(() => {
        if (allQuestions && question && question.questionId && question.qType !== 'page') {
            const thisIndex = allQuestions.findIndex(q => q.questionId === question.questionId);
            const questionsUntilThis = allQuestions.slice(0, thisIndex);
            const pagesUntilThis = questionsUntilThis.filter(q => q.qType === 'page');
            if (pagesUntilThis.length) {
                const lastPage = pagesUntilThis[pagesUntilThis.length -1];
                const lastPageIndex = questionsUntilThis.findIndex(q => q.questionId === lastPage.questionId);
                const qsForPipiping = questionsUntilThis.slice(0, lastPageIndex).filter(q => q.qType !== 'page');
                setAnswerPipingData({...answerPipingData, questions: qsForPipiping});
            }
        }
    // eslint-disable-next-line
    }, [ question.questionId, allQuestions ]);

    const updateQuestionData = (name, value) => {
        setQuestionData({...questionData, [name]: value});

        if (name === 'options' || name === 'dimensions') {
            question[name] = toArray(value.trim()).map((t) => toTextArray(t, language));
            question[name] = assignValues(question[name], prefixes[name]);
        } else if (name === 'text') {
            question.texts = toTextArray(value.trim(), language).texts;
        } else if (name === 'otherBox') {
            question.otherBox = toTextArray(value.trim(), language).texts;
        }
    };

    const showPipingOptions = (field) => {
        setAnswerPipingData({...answerPipingData, display: true, field});
    };

    const hidePipingOptions = () => setAnswerPipingData({...answerPipingData, display: false});

    const addAnswerPipingToQuestion = (event) => {
        event.persist();
        const text = `${questionData[answerPipingData.field].trim()} {{${event.target.value}}}`;
        updateQuestionData(answerPipingData.field, text);
        setAnswerPipingData({...answerPipingData, display: false});
    };

    const handleInputChange = (event) => {
        event.persist();
        updateQuestionData(event.target.name, event.target.value);
    };

    const handleChangeCheckbox = (event) => {
        event.persist();
        setQuestionData(q => ({...q, [event.target.name]: !questionData[event.target.name]}));
        question[event.target.name] = !questionData[event.target.name];
    };

    const HelpText = ({ text }) => (
        <div className="help-text">
            <i className="fas fa-info-circle"></i>&nbsp;{text}
        </div>
    );

    return (
        <div className={'question-block ' + (question.qType === 'page' ? 'page-break': '')} data-testid={"question-block-" + questionId}>
            {answerPipingData.display &&
                <div className="answer-piping form-group" onMouseOut={hidePipingOptions} onBlur={hidePipingOptions}>
                    <select className="form-field" onChange={addAnswerPipingToQuestion}>
                        <option>Please select the question to pipe</option>
                        {answerPipingData.questions.map((q, index) => 
                            <option key={index} value={q.questionId}>{q.texts[0].text}</option>
                        )}
                    </select>
                </div>
            }
            <div className="row">
                <div className="col-11">
                <h4>{qTypeMetaInfo.name}</h4>
                </div>
                <div className="col-1">
                    <span className="delete-btn" onClick={deleteQuestion} title="delete this question" ><i className="far fa-trash-alt"></i></span>
                </div>
            </div>
            {question.qType === 'page' &&
                <PageConditions question={question} allQuestions={allQuestions} />
            }
            {question.qType !== 'page' &&
                <div className="row">
                    <div className="col-11">
                        <div className="form-group field">
                            <input type="text" name="text" className="form-field" value={questionData.text || ''} onChange={handleInputChange} placeholder="Question text" />
                            <label className="form-label" htmlFor="text">Question text</label>
                        </div>
                        <HelpText text="Main text that will initiate this section" />
                    </div>
                    <div className="col-1">
                        {answerPipingData.questions.length > 0 &&
                            <span className="answer-piping-icon" onClick={() => showPipingOptions('text')}><i className="fas fa-chevron-left"></i></span>
                        }
                    </div>
                </div>
            }
            {qTypeMetaInfo.options &&
                <div className="row">
                    <div className="col-11">
                        <div className="form-group field">
                            <textarea name="options" className="form-field" value={questionData.options} rows={questionData.options.split('\n').length} onChange={handleInputChange} placeholder="Options (one per line)" />
                            <label className="form-label" htmlFor="options">Options (one per line)</label>
                        </div>
                        <HelpText text="Answer options. Please ensure that you enter only one per line." />
                    </div>
                    <div className="col-1">
                        {answerPipingData.questions.length > 0 &&
                            <span className="answer-piping-icon" onClick={() => showPipingOptions('options')}><i className="fas fa-chevron-left"></i></span>
                        }
                    </div>
                </div>
            }
            {qTypeMetaInfo.dimensions &&
            <div className="row">
                <div className="col-11">
                    <div className="form-group field">
                        <textarea name="dimensions" className="form-field" value={questionData.dimensions} rows={questionData.dimensions.split('\n').length} onChange={handleInputChange} placeholder="Dimensions/ sub questions (one per line)" />
                        <label className="form-label" htmlFor="dimensions">Dimensions/ sub questions (one per line)</label>
                    </div>
                    <HelpText text="Sub questions, or rows in the table. These are the dimensions respondents will be 'rating' on. Please ensure that you enter only one per line." />
                </div>
                <div className="col-1">
                    {answerPipingData.questions.length > 0 &&
                        <span className="answer-piping-icon" onClick={() => showPipingOptions('dimensions')}><i className="fas fa-chevron-left"></i></span>
                    }
                </div>
            </div>
            }

            {question.qType !== 'page' && question.qType !== 'plaintext' &&
                <div className="row">
                    <div className="col-12">
                        <div className="choices">
                            <input type="checkbox" id={questionId + "-mandatory"} name="mandatory" value="true" defaultChecked={questionData.mandatory} onChange={handleChangeCheckbox} /><label id={"label-" + questionId + "-mandatory"} htmlFor={questionId + "-mandatory"}>Mandatory?</label>
                        </div>
                        <HelpText text="When checked, respondents will be asked for provide an answer for this question before proceeding." />
                    </div>
                </div>
            }
            {qTypeMetaInfo.options &&
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="choices">
                            <input type="checkbox" id={questionId + "-hasOther"} name="hasOther" value="true" defaultChecked={questionData.hasOther} onChange={handleChangeCheckbox} /><label id={"label-" + questionId + "-hasOther"} htmlFor={questionId + "-hasOther"}>Add an "other" option and text field for user to answer?</label>
                        </div>
                        <HelpText text="When checked, it shows a text box where users can present a free text answer if none of the given options match their expectations." />
                    </div>
                </div>
                {questionData.hasOther &&
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <input type="text" name="otherBox" className="form-field" value={questionData.otherBox || ''} onChange={handleInputChange} placeholder="'Other' box label" />
                                <label className="form-label" htmlFor="otherBox">'Other' box label</label>
                            </div>
                        </div>
                    </div>
                }
            </>
            }
        </div>
    );
}
