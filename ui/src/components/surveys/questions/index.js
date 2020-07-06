import React, { useState } from "react";
import Checkboxes from "./checkboxes/index.js";
import Dropdown from "./dropdown/index.js";
import PageBreak from "./pagebreak/index.js";
import PlainText from "./plain-text/index.js";
import RadioButtons from "./radio-buttons/index.js";
import Ranking from "./ranking/index.js";
import RatingsScale from "./ratings-scale/index.js";
import TextArea from "./textarea/index.js";
import TextBox from "./textbox/index.js";

import './question.css';

export default function Question({ question, saveResponse }) {

    const [ response, setResponse ] = useState({
        question : question.questionId,
        answers : [],
        other : null,
        ranking : question.qType === 'ranking'
    });

    const handleInputChange = (event) => {
        event.persist();

        const isMainAnswer = event.target.name === question.questionId;

        const name = isMainAnswer ? 'answers' : event.target.name.replace(question.questionId + '-', '');
        console.log(event.target.name, name);
        const value = isMainAnswer ? [ event.target.value ] : event.target.value;
        const newResponse = {...response, [ name ]: value};
        setResponse(newResponse);
        saveResponse(newResponse);
    };

    const persistResponse = (res) => {
        const newResponse = {...response, ...res};
        setResponse(newResponse);
        saveResponse(newResponse);
    }

    return (
        <div className="questions">
            <Checkboxes question={question} persistResponse={persistResponse} />
            <Dropdown question={question} handleInputChange={handleInputChange} />
            <PageBreak question={question} />
            <PlainText question={question} />
            <RadioButtons question={question} handleInputChange={handleInputChange} />
            <Ranking question={question} persistResponse={persistResponse} />
            <RatingsScale question={question} saveResponse={saveResponse} />
            <TextArea question={question} handleInputChange={handleInputChange} />
            <TextBox question={question} handleInputChange={handleInputChange} />
        </div>
    );
};
