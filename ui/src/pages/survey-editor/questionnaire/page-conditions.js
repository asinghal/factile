import React, { useState, useEffect } from "react";

export default function PageConditions({ question, allQuestions }) {
    const hasConditions = !!(question.conditions && question.conditions.length !== 0);
    const [ conditionMeta, setConditionMeta ] = useState({
        conditionalDisplay: hasConditions,
        selectedQuestionIndex: -1,
        options: [],
        operatorIndex: -1,
        selectedOptionIndex: -1,
        valueText: ''
    });

    const index = allQuestions.indexOf(question);
    const questionsUntilHere = allQuestions.slice(0, index).filter(q => q.qType !== 'page');
    const operators = [
        { text: 'is', value: 'eq'},
        { text: 'is not', value: 'ne'},
        { text: 'contains', value: 'like'},
        { text: 'does not contain', value: 'notlike'}
    ];

    const getAnswerOptions = (selectedQuestionIndex) => {
        if (selectedQuestionIndex === -1) {
            return [];
        }
        const selectedQuestion = questionsUntilHere[selectedQuestionIndex];

        if (!selectedQuestion.options || !selectedQuestion.options.length) {
            return [];
        }
        return selectedQuestion.options.map(o => ({ text: o.texts[0].text, value: o.value }));
    };

    useEffect(() => {
        if (hasConditions) {
            const defaultSelectedQuestionIndex = questionsUntilHere.findIndex(q => q.questionId === question.conditions[0].questionId);
            const defaultSelectedOperatorIndex = operators.findIndex(q => q.value === question.conditions[0].op);
            const options = getAnswerOptions(defaultSelectedQuestionIndex);
            const defaultSelectedOptionIndex = options.findIndex(o => o.value === question.conditions[0].value);
            setConditionMeta({
                ...conditionMeta,
                selectedQuestionIndex: defaultSelectedQuestionIndex,
                operatorIndex: defaultSelectedOperatorIndex,
                options,
                selectedOptionIndex: defaultSelectedOptionIndex,
                valueText: (defaultSelectedOptionIndex === -1) ? question.conditions[0].value : ''
            });
        }
    // eslint-disable-next-line
    }, [ question.questionId ]);

    const addConditionWhenComplete = (updatedConditionMeta) => {
        const { selectedQuestionIndex, operatorIndex, selectedOptionIndex, valueText } = updatedConditionMeta;
        if (selectedQuestionIndex !== -1 && operatorIndex !== -1 && (selectedOptionIndex !== -1 || valueText !== '')) {
            const selectedQuestion = questionsUntilHere[selectedQuestionIndex];
            const selectedOptionValue = (selectedOptionIndex !== -1) ? conditionMeta.options[selectedOptionIndex].value : valueText;
            question.conditions = [
                {
                    questionId: selectedQuestion.questionId,
                    value: selectedOptionValue,
                    op: operators[operatorIndex].value,
                    display: true
                }
            ];
        }
    };

    const resetForm = () => {
        setConditionMeta({
            conditionalDisplay: false,
            selectedQuestionIndex: -1,
            options: [],
            operatorIndex: -1,
            selectedOptionIndex:-1
        });
    }

    const handleRadioChange = (event) => {
        event.persist();
        const value = event.target.value === 'true';
        if (!value) {
            resetForm();
        } else {
            setConditionMeta({...conditionMeta, [event.target.name]: value});
        }
    };

    const handleSelectChange = (event) => {
        event.persist();
        const value = parseInt(event.target.value, 10);
        let updated = {...conditionMeta, [event.target.name]: value};
        if (event.target.name === 'selectedQuestionIndex') {
            updated = {...updated, options: getAnswerOptions(value)};
        }

        if (event.target.name === 'selectedOptionIndex') {
            updated = {...updated, valueText: ''};
        }
        setConditionMeta(updated);
        addConditionWhenComplete(updated);
    };

    const handleTextChange = (event) => {
        event.persist();
        let updated = {...conditionMeta, valueText: event.target.value, selectedOptionIndex: -1};
        setConditionMeta(updated);
        addConditionWhenComplete(updated);
    };

    if (question.qType !== 'page') {
        return null;
    }

    return (
        <div>
            <div className="choices radio">
                <form>
                    <div>
                        <input type="radio" id={`${question.questionId}_alwaysDisplay`} name="conditionalDisplay" value="false" onChange={handleRadioChange} defaultChecked={!conditionMeta.conditionalDisplay} />
                        <label htmlFor={`${question.questionId}_alwaysDisplay`}>Always show the following page</label>
                    </div>
                    <div>
                        <input type="radio" id={`${question.questionId}_conditionalDisplay`} name="conditionalDisplay" value="true" onChange={handleRadioChange} defaultChecked={conditionMeta.conditionalDisplay} />
                        <label htmlFor={`${question.questionId}_conditionalDisplay`}>Only show the following page if it meets the following conditions</label>
                    </div>
                </form>
            </div>
            { conditionMeta.conditionalDisplay && 
                <div className="row form-group">
                    <div className="col-md-4">
                        <select name="selectedQuestionIndex" onChange={handleSelectChange} value={conditionMeta.selectedQuestionIndex} className="form-field">
                            <option value="-1"></option>
                            {questionsUntilHere.map((q, index) =>
                            <option value={index} key={index}>{q.texts[0].text}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select name="operatorIndex" onChange={handleSelectChange} value={conditionMeta.operatorIndex} className="form-field">
                            <option value="-1"></option>
                            {operators.map((o, index) =>
                            <option value={index} key={index}>{o.text}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-4">
                        {(conditionMeta.options && !!conditionMeta.options.length) &&
                        <select name="selectedOptionIndex" onChange={handleSelectChange} value={conditionMeta.selectedOptionIndex} className="form-field">
                            <option value="-1"></option>
                            {conditionMeta.options.map((o, index) =>
                            <option value={index} key={index}>{o.text}</option>
                            )}
                        </select>
                        }
                        {(!conditionMeta.options || !conditionMeta.options.length) &&
                            <input type="text" name="valueText" value={conditionMeta.valueText} onChange={handleTextChange} className="form-field"/>
                        }
                    </div>
                </div>
            }
        </div>
    );
};
