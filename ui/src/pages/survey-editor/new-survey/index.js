import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import '../../../components/forms/inputs.css';
import '../../../components/forms/buttons.css';
import './new-survey.css';

import { save } from './api.js';
import { languages } from './languages.js';

export default function NewSurvey() {
    const [survey, setSurvey] = useState({ language: '1', layout: {} });
    const history = useHistory();

    const defaultBgColor = '#FFFFFF';
    const defaultTextColor = '#333333';

    const handleInputChange = (event) => {
        event.persist();
        setSurvey({...survey, [event.target.name]: event.target.value});
    };

    const handleLayoutInputChange = (event) => {
        event.persist();
        const layout = {...survey.layout, [event.target.name]: event.target.value};
        setSurvey({...survey, layout});
    };

    const handleChangeLayoutCheckbox = (event) => {
        event.persist();
        const layout = {...survey.layout, [event.target.name]: !survey.layout[event.target.name]};
        setSurvey({...survey, layout});
    }

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
                    <button className="base-btn submit-btn" onClick={SaveDetails}>Save Details</button>
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
                    <div className="form-group field">
                        <select id="language" name="language" value={survey.language} className="form-field" onChange={handleInputChange}>
                            {languages.map((language, index) => 
                            <option key={index} value={language.value}>{language.name}</option>
                            )}
                        </select>
                        <label htmlFor="language" className="form-label">Language</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="file" className="form-field" name="logoFile" />
                        <label htmlFor="logoFile" className="form-label">Logo image</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div>
                        <strong>Who can take this survey?</strong>
                    </div>
                    <div className="choices radio">
                        <div><input name="accessType" type="radio" id="openAccess" value="open" onChange={handleInputChange} /><label htmlFor="openAccess" >Anyone with the link</label></div>
                        <div><input name="accessType" type="radio" id="emailAccess" value="email" onChange={handleInputChange} /><label htmlFor="emailAccess" >By invitation</label></div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div>
                        <strong>Logo position</strong>
                    </div>
                    <div className="choices radio">
                        <div><input name="logoAlignment" type="radio" id="leftPos" value="left" onChange={handleLayoutInputChange} /><label htmlFor="leftPos" >Left</label></div>
                        <div><input name="logoAlignment" type="radio" id="centerPos" value="center" onChange={handleLayoutInputChange} /><label htmlFor="centerPos" >Center</label></div>
                        <div><input name="logoAlignment" type="radio" id="rightPos" value="right" onChange={handleLayoutInputChange} /><label htmlFor="rightPos" >Right</label></div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="choices">
                        <input type="checkbox" id="includeProgress" name="includeProgress" value="true" defaultChecked={survey.layout.includeProgress} onChange={handleChangeLayoutCheckbox} /><label htmlFor="includeProgress">Show Progress Bar</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="color" className="form-field" name="bodycolor" value={survey.layout.bodycolor || defaultBgColor} onChange={handleLayoutInputChange} placeholder="Page Background Color" />
                        <label htmlFor="bodycolor" className="form-label">Page Background Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="color" className="form-field" name="containercolor" value={survey.layout.containercolor || defaultBgColor} onChange={handleLayoutInputChange} placeholder="Survey Name" />
                        <label htmlFor="containercolor" className="form-label">Survey Box Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="color" className="form-field" name="logoBgColor" value={survey.layout.logoBgColor || defaultBgColor} onChange={handleLayoutInputChange} placeholder="Logo Background Color" />
                        <label htmlFor="logoBgColor" className="form-label">Logo Background Color</label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="color" className="form-field" name="textColor" value={survey.layout.textColor || defaultTextColor} onChange={handleLayoutInputChange} placeholder="Text Color" />
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
