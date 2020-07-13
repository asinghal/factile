import React, { useState, useEffect } from "react";

export default function PageConditions({ question, allQuestions }) {
    const hasConditions = question.conditions && question.conditions.length;
    const [ conditionMeta, setConditionMeta ] = useState({
        conditionalDisplay: hasConditions,
        selectedQuestionIndex: -1,
        options: [],
        operatorIndex: -1,
        selectedOptionIndex:-1
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
                selectedOptionIndex: defaultSelectedOptionIndex
            });
        }
    }, [ question.questionId ]);

    const addConditionWhenComplete = (updatedConditionMeta) => {
        const { selectedQuestionIndex, operatorIndex, selectedOptionIndex } = updatedConditionMeta;
        if (selectedOptionIndex !== -1 && operatorIndex !== -1 && selectedOptionIndex !== -1) {
            const selectedQuestion = questionsUntilHere[selectedQuestionIndex];
            const selectedOption = conditionMeta.options[selectedOptionIndex];
            question.conditions = [
                {
                    questionId: selectedQuestion.questionId,
                    value: selectedOption.value,
                    op: operators[operatorIndex].value,
                    display: true
                }
            ];
        }
    };

    const resetForm = () => {
        setConditionMeta({
            ...conditionMeta, 
            selectedQuestionIndex: -1,
            options: [],
            operatorIndex: -1,
            selectedOptionIndex:-1
        });
    }

    const handleRadioChange = (event) => {
        event.persist();
        const value = event.target.value === 'true';
        setConditionMeta({...conditionMeta, [event.target.name]: value});
        if (!value) {
            resetForm();
        }
    };

    const handleInputChange = (event) => {
        event.persist();
        const value = parseInt(event.target.value, 10);
        let updated = {...conditionMeta, [event.target.name]: value}
        if (event.target.name === 'selectedQuestionIndex') {
            updated = {...updated, options: getAnswerOptions(value)};
        }
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
                        <input type="radio" id={`${question.questionId}_alwaysDisplay`} name="conditionalDisplay" value={false} onChange={handleRadioChange} checked={!conditionMeta.conditionalDisplay} />
                        <label htmlFor={`${question.questionId}_alwaysDisplay`}>Always show the following page</label>
                    </div>
                    <div>
                        <input type="radio" id={`${question.questionId}_conditionalDisplay`} name="conditionalDisplay" value={true} onChange={handleRadioChange} checked={conditionMeta.conditionalDisplay} />
                        <label htmlFor={`${question.questionId}_conditionalDisplay`}>Only show the following page if it meets the following conditions</label>
                    </div>
                </form>
            </div>
            { conditionMeta.conditionalDisplay && 
                <div className="row form-group">
                    <div className="col-md-4">
                        <select name="selectedQuestionIndex" onChange={handleInputChange} value={conditionMeta.selectedQuestionIndex} className="form-field">
                            <option value="-1"></option>
                            {questionsUntilHere.map((q, index) =>
                            <option value={index} key={index}>{q.texts[0].text}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select name="operatorIndex" onChange={handleInputChange} value={conditionMeta.operatorIndex} className="form-field">
                            <option value="-1"></option>
                            {operators.map((o, index) =>
                            <option value={index} key={index}>{o.text}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select name="selectedOptionIndex" onChange={handleInputChange} value={conditionMeta.selectedOptionIndex} className="form-field">
                            <option value="-1"></option>
                            {conditionMeta.options.map((o, index) =>
                            <option value={index} key={index}>{o.text}</option>
                            )}
                        </select>
                    </div>
                </div>
            }
        </div>
    );
};
