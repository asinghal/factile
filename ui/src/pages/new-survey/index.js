import React, { useState } from "react";

import './new-survey.css';

import { save } from './api.js';

export default function NewSurvey() {
    const [survey, setSurvey] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        setSurvey(survey => ({...survey, [event.target.name]: event.target.value}));
    };

    const SaveDetails = () => {
        save(survey).then(console.log);
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
                    <div className="form__group field">
                        <input type="text" name="name" className="form__field" value={survey.name || ''} onChange={handleInputChange} placeholder="Survey Name" />
                        <label htmlFor="name" className="form__label">Survey Name</label>
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
                    <div className="form__group field">
                        <input type="text" name="bodycolor" className="form__field" value={survey.bodycolor || ''} onChange={handleInputChange} placeholder="Page Background Color" />
                        <label htmlFor="bodycolor" className="form__label">Page Background Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form__group field">
                        <input type="text" name="containercolor" className="form__field" value={survey.containercolor || ''} onChange={handleInputChange} placeholder="Survey Name" />
                        <label htmlFor="containercolor" className="form__label">Survey Box Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form__group field">
                        <input type="text" name="logoBgColor" className="form__field" value={survey.logoBgColor || ''} onChange={handleInputChange} placeholder="Logo Background Color" />
                        <label htmlFor="logoBgColor" className="form__label">Logo Background Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form__group field">
                        <input type="text" name="textColor" className="form__field" value={survey.textColor || ''} onChange={handleInputChange} placeholder="Text Color" />
                        <label htmlFor="textColor" className="form__label">Text Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form__group field">
                        <textarea name="intro_text" className="form__field" value={survey.intro_text || ''} onChange={handleInputChange}  placeholder="Introductory Message (optional)"/>
                        <label htmlFor="intro_text" className="form__label">Introductory Message (optional)</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form__group field">
                        <textarea name="thank_you_text" className="form__field" value={survey.thank_you_text || ''} onChange={handleInputChange}  placeholder="'Thank you' text"/>
                        <label htmlFor="thank_you_text" className="form__label">'Thank you' text</label>
                    </div>
                </div>
            </div>

        </div>
    );
};
