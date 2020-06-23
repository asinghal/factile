import React from "react";
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

export default function Question({ question }) {
    return (
        <div className="questions">
            <Checkboxes question={question} />
            <Dropdown question={question} />
            <PageBreak question={question} />
            <PlainText question={question} />
            <RadioButtons question={question} />
            <Ranking question={question} />
            <RatingsScale question={question} />
            <TextArea question={question} />
            <TextBox question={question} />
        </div>
    );
};
