import React, { useState } from "react";
import { questionTypes } from './question-types.js';

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

export default function QuestionDesigner({question, language}) {
    const qTypeMetaInfo = questionTypes.find(q => q.value === question.qType);
    const text = question.texts && question.texts.length > 0 ? question.texts[0].text : '';
    const options = foldTexts(question.options);
    const dimensions = foldTexts(question.dimensions);
    const [questionData, setQuestionData] = useState({text, options, dimensions});

    const handleInputChange = (event) => {
        event.persist();
        setQuestionData(q => ({...q, [event.target.name]: event.target.value}));

        if (event.target.name === 'options' || event.target.name === 'dimensions') {
            question[event.target.name] = toArray(event.target.value.trim()).map((t) => toTextArray(t, language));
            question[event.target.name] = assignValues(question[event.target.name], prefixes[event.target.name]);
        } else {
            question.texts = toTextArray(event.target.value.trim(), language).texts;
        }
    };

    return (
        <div className="question-block">
            <h4>{qTypeMetaInfo.name}</h4>
            <div className="row">
                <div className="col-md-12">
                    <div className="form__group field">
                        <input type="text" name="text" className="form__field" value={questionData.text} onChange={handleInputChange} placeholder="Question text" />
                        <label className="form__label" htmlFor="qText">Question text</label>
                    </div>
                </div>
            </div>
            {qTypeMetaInfo.options && 
                <div className="row">
                    <div className="col-md-12">
                        <div className="form__group field">
                            <textarea name="options" className="form__field" value={questionData.options} rows={questionData.options.split('\n').length} onChange={handleInputChange} placeholder="Options" />
                            <label className="form__label" htmlFor="qOptions">Options</label>
                        </div>
                    </div>
                </div>
            }
            {qTypeMetaInfo.dimensions && 
            <div className="row">
                <div className="col-md-12">
                    <div className="form__group field">
                        <textarea name="dimensions" className="form__field" value={questionData.dimensions} rows={questionData.dimensions.split('\n').length} onChange={handleInputChange} placeholder="Dimensions/ sub questions" />
                        <label className="form__label" htmlFor="qDimensions">Dimensions/ sub questions</label>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
