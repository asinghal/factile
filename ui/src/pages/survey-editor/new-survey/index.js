import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import '../../../components/forms/inputs.css';
import '../../../components/forms/buttons.css';
import './new-survey.css';

import { save, update, findSurvey, upload } from '../api.js';
import { languages } from './languages.js';
import SurveyManagementMenu from "../../../components/surveys/survey-management-menu";
import SurveyStepsNav from "../../../components/surveys/survey-steps-nav";
import HelpText from "../../../components/help-text";

const DEFAULT_SURVEY = { 
    language: '1', 
    layout: { 
        logoAlignment: 'left', bodycolor: '#FFFFFF', containercolor: '#FFFFFF', logoBgColor: '#FFFFFF', textColor: '#333333' 
    },
    thank_you_text: 'Thank you for participating.',
    accessType: 'open' 
};

export default function NewSurvey() {
    const [survey, setSurvey] = useState(DEFAULT_SURVEY);
    const [logoImg, setLogoImg] = useState(null);
    const [statusAlert, setStatusAlert] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    const { id } = useParams();
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

    const onFileChange = (event) => {
        event.persist();
        setLogoImg(event.target.files[0]);
    };

    const uploadLogo = (surveyId) => {
        if (!logoImg) {
            // hack! unfortunately a simple promise as a return is not good and there seems to be no simple solution
            return { then: (fn) => fn() };
        }
        return upload(surveyId, 'logoImg', logoImg);
    };

    const SaveDetails = (event) => {
        event.preventDefault();
        if (!survey.name || !survey.name.trim()) {
            setErrorMessage('Please provide a survey name');
            return;
        }
        const nextPath = () => '/surveys/' + survey.surveyId + '/questions';
        if (!survey.surveyId) {
            save(survey).then((d) => {
                survey.surveyId = d.surveyId;
                uploadLogo(d.surveyId).then(() => history.replace(nextPath()));
            });
        } else {
            update(survey).then(() => {
                uploadLogo(survey.surveyId).then(() => history.replace(nextPath()));
            });
        }
    };

    const statusCssClasses = {
        Draft: {
            css: 'warning',
            msg: 'This survey is in draft mode and is not accessible to respondents.'
        },
        Live: {
            css: 'success',
            msg: 'This survey is live and can be accessed by respondents.'
        },
        Closed: {
            css: 'info',
            msg: 'This survey has been closed and is not accepting responses any more.'
        }
    };

    useEffect(() => {
        if (id) {
            findSurvey(id).then((survey) => {
                survey.questions = survey.questions || [];
                setSurvey({...survey});
                const surveyStatus = statusCssClasses[survey.status] || {};
                setStatusAlert({
                    css: surveyStatus.css || 'danger',
                    msg: surveyStatus.msg || `Current status of this survey is ${survey.status}`
                });
            }).catch(() => history.replace('/'));
        } else {
            setSurvey(DEFAULT_SURVEY);
        }
    // eslint-disable-next-line
    }, [id, history]);

    return (
        <div className="new-survey container">
            <div className="row">
                <div className="col-md-4 col-lg-3 col-sm-12">
                    <SurveyManagementMenu surveyId={survey.surveyId} />
                </div>
                <div className="col-md-8 col-lg-9 col-sm-12">
                    <div className="row">
                        <div className="col-12">
                            <SurveyStepsNav currentStepNum="1" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            {!id && 
                                <h2>New Survey</h2>
                            }
                            {id && 
                                <h2>Edit Survey</h2>
                            }
                        </div>
                    </div>

                    {!!errorMessage &&
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-danger" id="errorMessage">{errorMessage}</div>
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="offset-md-6 offset-lg-8 col-md-6 col-lg-4">
                            <button className="base-btn submit-btn" id="save-details" onClick={SaveDetails}>Save Details</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {!!survey.surveyId && 
                                <div className={'alert alert-' + statusAlert.css}>{statusAlert.msg}</div>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h4 className="subsection"><i className="fas fa-chevron-circle-right blue" aria-hidden="true"></i>&nbsp;Basic setup</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <input type="text" name="name" id="survey-name" className="form-field" value={survey.name || ''} onChange={handleInputChange} placeholder="Survey Name" />
                                <label htmlFor="name" className="form-label">Survey Name</label>
                            </div>
                            <HelpText text="Mandatory field. This is the title of the survey that will be displayed to the respondents on every page. Also it acts as a reference for you to look up in your list of surveys." />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <select id="language" name="language" value={survey.language} className="form-field" onChange={handleInputChange}>
                                    {languages.map((language, index) => 
                                    <option key={index} value={language.value}>{language.name}</option>
                                    )}
                                </select>
                                <label htmlFor="language" className="form-label">Language</label>
                            </div>
                            <HelpText text="The language of the survey" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div>
                                <strong>Who can take this survey?</strong>
                            </div>
                            <div className="choices radio">
                                <div><input name="accessType" type="radio" id="openAccess" value="open" onChange={handleInputChange} checked={survey.accessType === 'open'} /><label htmlFor="openAccess" data-testid="openAccess">Anyone with the link</label></div>
                                <div><input name="accessType" type="radio" id="emailAccess" value="email" onChange={handleInputChange} checked={survey.accessType === 'email'} /><label htmlFor="emailAccess">By invitation</label></div>
                            </div>
                            <HelpText text="Mandatory field. Defines the visibility of this survey. An open access means anyone can access and the responses will always be anonymous. Access by invitation provides a degree of privacy to the survey, especially as these can not be automatically mapped by search engines like Google." />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="choices">
                                <input type="checkbox" id="includeProgress" name="includeProgress" value="true" defaultChecked={survey.layout.includeProgress} onChange={handleChangeLayoutCheckbox} /><label htmlFor="includeProgress">Show Progress Bar</label>
                            </div>
                            <HelpText text="When checked, display a progress tracker to the respondents of the survey" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <h4 className="subsection"><i className="fas fa-chevron-circle-right blue" aria-hidden="true"></i>&nbsp;Introductory texts</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <textarea name="intro_text" className="form-field" value={survey.intro_text || ''} onChange={handleInputChange}  placeholder="Introductory Message (optional)"/>
                                <label htmlFor="intro_text" className="form-label">Introductory Message (optional)</label>
                            </div>
                            <HelpText text="When specified, this becomes the first page of the survey. This can be very useful in setting context, or sharing instructions with the audience." />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <textarea name="thank_you_text" className="form-field" value={survey.thank_you_text || ''} onChange={handleInputChange}  placeholder="'Thank you' text"/>
                                <label htmlFor="thank_you_text" className="form-label">'Thank you' text</label>
                            </div>
                            <HelpText text="This appears on the final page of the survey after the respondent has submitted answers to all questions, and indicates that the respondent can safely close the window." />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <h4 className="subsection"><i className="fas fa-chevron-circle-right blue" aria-hidden="true"></i>&nbsp;Layout and Appearance</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <input type="file" className="form-field" name="logoFile" onChange={onFileChange} />
                                <label htmlFor="logoFile" className="form-label">Logo image</label>
                            </div>
                            <HelpText text="(Optional) An image/ picture that should be displayed on top of every page in the survey" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div>
                                <strong>Logo position</strong>
                            </div>
                            <div className="choices radio">
                                <div><input name="logoAlignment" type="radio" id="leftPos" value="left" onChange={handleLayoutInputChange} checked={survey.layout.logoAlignment === 'left'} /><label htmlFor="leftPos" data-testid="leftPos">Left</label></div>
                                <div><input name="logoAlignment" type="radio" id="centerPos" value="center" onChange={handleLayoutInputChange} checked={survey.layout.logoAlignment === 'center'} /><label htmlFor="centerPos" >Center</label></div>
                                <div><input name="logoAlignment" type="radio" id="rightPos" value="right" onChange={handleLayoutInputChange} checked={survey.layout.logoAlignment === 'right'} /><label htmlFor="rightPos" >Right</label></div>
                            </div>
                            <HelpText text="The position of the above mentioned image/ picture on the page." />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <input type="color" className="form-field" name="bodycolor" value={survey.layout.bodycolor || defaultBgColor} onChange={handleLayoutInputChange} placeholder="Page Background Color" />
                                <label htmlFor="bodycolor" className="form-label">Page Background Color</label>
                            </div>
                            <HelpText text="Base background color of the survey that will only appear as side ribbons" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <input type="color" className="form-field" name="containercolor" value={survey.layout.containercolor || defaultBgColor} onChange={handleLayoutInputChange} placeholder="Survey Name" />
                                <label htmlFor="containercolor" className="form-label">Survey Box Color</label>
                            </div>
                            <HelpText text="Background color of the main content of the survey" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <input type="color" className="form-field" name="logoBgColor" value={survey.layout.logoBgColor || defaultBgColor} onChange={handleLayoutInputChange} placeholder="Logo Background Color" />
                                <label htmlFor="logoBgColor" className="form-label">Logo Background Color</label>
                            </div>
                            <HelpText text="Background color for the uploaded logo image" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <input type="color" className="form-field" name="textColor" value={survey.layout.textColor || defaultTextColor} onChange={handleLayoutInputChange} placeholder="Text Color" />
                                <label htmlFor="textColor" className="form-label">Text Color</label>
                            </div>
                            <HelpText text="Color of texts and lines in the survey" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
