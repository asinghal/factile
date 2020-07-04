import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import '../../../components/forms/inputs.css';
import './new-survey.css';

import { save } from './api.js';

export default function NewSurvey() {
    const [survey, setSurvey] = useState({ layout: {} });
    const history = useHistory();

    const handleInputChange = (event) => {
        event.persist();
        setSurvey(survey => ({...survey, [event.target.name]: event.target.value}));
    };

    const handleLayoutInputChange = (event) => {
        event.persist();
        const layout = {...survey.layout, [event.target.name]: event.target.value};
        setSurvey(survey => ({...survey, layout}));
    };

    const SaveDetails = () => {
        save(survey).then((d) => {
            survey.surveyId = survey.surveyId || d.surveyId;
            history.replace('/surveys/' + survey.surveyId + '/questions');
        });
    };

    return (
        <div className="new-survey container">
            <h2>New Survey</h2>

            <div className="row">
                <div className="offset-10 col-md-2">
                    <button onClick={SaveDetails}>Save Details</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="text" name="name" className="form-field" value={survey.name || ''} onChange={handleInputChange} placeholder="Survey Name" />
                        <label htmlFor="name" className="form-label">Survey Name</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    Language
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    Logo image
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    Share mode
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    Logo position
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    Show Progress Bar
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="text" name="bodycolor" className="form-field" value={survey.layout.bodycolor || ''} onChange={handleLayoutInputChange} placeholder="Page Background Color" />
                        <label htmlFor="bodycolor" className="form-label">Page Background Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="text" name="containercolor" className="form-field" value={survey.layout.containercolor || ''} onChange={handleLayoutInputChange} placeholder="Survey Name" />
                        <label htmlFor="containercolor" className="form-label">Survey Box Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="text" name="logoBgColor" className="form-field" value={survey.layout.logoBgColor || ''} onChange={handleLayoutInputChange} placeholder="Logo Background Color" />
                        <label htmlFor="logoBgColor" className="form-label">Logo Background Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="text" name="textColor" className="form-field" value={survey.layout.textColor || ''} onChange={handleLayoutInputChange} placeholder="Text Color" />
                        <label htmlFor="textColor" className="form-label">Text Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <textarea name="intro_text" className="form-field" value={survey.intro_text || ''} onChange={handleInputChange}  placeholder="Introductory Message (optional)"/>
                        <label htmlFor="intro_text" className="form-label">Introductory Message (optional)</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <textarea name="thank_you_text" className="form-field" value={survey.thank_you_text || ''} onChange={handleInputChange}  placeholder="'Thank you' text"/>
                        <label htmlFor="thank_you_text" className="form-label">'Thank you' text</label>
                    </div>
                </div>
            </div>

        </div>
    );
};
