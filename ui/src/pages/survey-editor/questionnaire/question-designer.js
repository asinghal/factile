import React, { useState } from "react";
import { questionTypes } from './question-types.js';

import '../../../components/forms/choices.css';
import '../../../components/forms/inputs.css';

import './questionnaire.css';

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

export default function QuestionDesigner({question, questionId, language, deleteQuestion}) {
    const qTypeMetaInfo = questionTypes.find(q => q.value === question.qType);
    const text = question.texts && question.texts.length > 0 ? question.texts[0].text : '';
    const otherBox = question.otherBox && question.otherBox.length > 0 ? question.otherBox[0].text : '';
    const options = foldTexts(question.options);
    const dimensions = foldTexts(question.dimensions);
    const [questionData, setQuestionData] = useState({text, options, dimensions, otherBox, mandatory: !!question.mandatory});

    const handleInputChange = (event) => {
        event.persist();
        setQuestionData(q => ({...q, [event.target.name]: event.target.value}));

        if (event.target.name === 'options' || event.target.name === 'dimensions') {
            question[event.target.name] = toArray(event.target.value.trim()).map((t) => toTextArray(t, language));
            question[event.target.name] = assignValues(question[event.target.name], prefixes[event.target.name]);
        } else if (event.target.name === 'text') {
            question.texts = toTextArray(event.target.value.trim(), language).texts;
        } else if (event.target.name === 'otherBox') {
            question.otherBox = toTextArray(event.target.value.trim(), language).texts;
        }
    };

    const handleChangeCheckbox = (event) => {
        event.persist();
        setQuestionData(q => ({...q, [event.target.name]: !questionData[event.target.name]}));
        question[event.target.name] = !questionData[event.target.name];
    }

    return (
        <div className={'question-block ' + (question.qType === 'page' ? 'page-break': '')}>
            <div className="row">
                <div className="col-sm-11 col-md-11">
                <h4>{qTypeMetaInfo.name}</h4>
                </div>
                <div className="col-sm-1 col-md-1">
                    <a className="delete-btn" onClick={deleteQuestion} title="delete this question" ><i className="far fa-trash-alt"></i></a>
                </div>
            </div>
            {question.qType !== 'page' &&
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group field">
                            <input type="text" name="text" className="form-field" value={questionData.text} onChange={handleInputChange} placeholder="Question text" />
                            <label className="form-label" htmlFor="text">Question text</label>
                        </div>
                    </div>
                </div>
            }
            {qTypeMetaInfo.options &&
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group field">
                            <textarea name="options" className="form-field" value={questionData.options} rows={questionData.options.split('\n').length} onChange={handleInputChange} placeholder="Options" />
                            <label className="form-label" htmlFor="options">Options</label>
                        </div>
                    </div>
                </div>
            }
            {qTypeMetaInfo.dimensions &&
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <textarea name="dimensions" className="form-field" value={questionData.dimensions} rows={questionData.dimensions.split('\n').length} onChange={handleInputChange} placeholder="Dimensions/ sub questions" />
                        <label className="form-label" htmlFor="dimensions">Dimensions/ sub questions</label>
                    </div>
                </div>
            </div>
            }

            {question.qType !== 'page' && question.qType !== 'plaintext' &&
                <div className="row">
                    <div className="col-md-12">
                        <div className="choices">
                            <input type="checkbox" id={questionId + "-mandatory"} name="mandatory" value="true" defaultChecked={questionData.mandatory} onChange={handleChangeCheckbox} /><label htmlFor={questionId + "-mandatory"}>Mandatory?</label>
                        </div>
                    </div>
                </div>
            }
            {qTypeMetaInfo.options &&
            <>
                <div className="row">
                    <div className="col-md-12">
                        <div className="choices">
                            <input type="checkbox" id={questionId + "-hasOther"} name="hasOther" value="true" defaultChecked={questionData.hasOther} onChange={handleChangeCheckbox} /><label htmlFor={questionId + "-hasOther"}>Add an "other" option and text field for user to answer?</label>
                        </div>
                    </div>
                </div>
                {questionData.hasOther &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group field">
                                <input type="text" name="otherBox" className="form-field" value={questionData.otherBox} onChange={handleInputChange} placeholder="'Other' box label" />
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
