import React, { useState, useEffect } from "react";
import SurveyManagementMenu from "../../../components/surveys/survey-management-menu";
import { useParams, useHistory } from "react-router-dom";

import { findSurvey, update, sendEmails } from '../api.js';
import '../../../components/forms/inputs.css';

export default function InviteSurveyUsers({ question }) {
    const [survey, setSurvey] = useState({});
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({ 
        participants: '',
        emailSubject: 'Survey',
        emailBody: 'Please click on {{SURVEY_LINK DO_NOT_DELETE}} to access the survey. Thank you for participating.'
    });
    const { id } = useParams();
    const history = useHistory();
    const baseURL = window.location.href.replace(window.location.pathname, '');

    const surveyLink=baseURL + '/s/' + survey.surveyId;

    useEffect(() => {
        findSurvey(id).then((survey) => {
            setSurvey({...survey});
        }).catch(() => history.replace('/'));
    }, [id, history]);

    const handleInputChange = (event) => {
        event.persist();
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const Activate = () => {
        const updated = { ...survey, status: 'Live'};
        setSurvey(updated);
        update(updated).then((d) => {
            history.replace('/surveys');
        });
    };

    const isValidEmail = (email) => !!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    const SendEmails = () => {
        formData.toAddresses = formData.participants.trim().split('\n').map(a => a.trim()).filter(a => !!a);
        const isValid = formData.toAddresses.map((e) => !e || !e.trim() || isValidEmail(e)).reduce((a, b) => a && b, true);
        if (!isValid) {
            setError(true);
            return false;
        }

        sendEmails(survey.surveyId, formData).then(history.replace('/surveys'));
    };

    return (
        <div className="new-survey container">
            <div className="row">
                <div className="col-md-3 col-sm-12">
                    <SurveyManagementMenu surveyId={survey.surveyId} />
                </div>
                <div className="col-md-9 col-sm-12">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>{survey.name}</h1>
                        </div>
                    </div>

                    { survey.accessType === 'open' && 
                    <>
                        <div className="row">
                            <div className="col-md-12">
                                <div><i>This is an open survey and can be accessed directly by opening <a href={surveyLink}>{surveyLink}</a> from anywhere.</i></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-offset-8 col-md-2">
                                <button className="base-btn submit-btn" onClick={Activate}>Activate this survey</button>
                            </div>
                        </div>
                    </>
                    }

                    <div className="row">
                        <div className="col-md-12">
                            <h3>Invite users to this survey using the form below</h3>
                        </div>
                    </div>

                    { error && 
                        <div className="row">
                            <div className="col-md-12">
                                <div className="alert alert-warning">
                                    Some of the email addresses seem to be incorrect. Please review the list before submitting the form. Please note that the email addresses must be full addresses (e.g. abc@test.com)
                                </div>
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col-md-12">
                            <p>Enter full email addresses of the participants in the box below. Please only enter<b> one email per line.</b></p>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group field">
                                <textarea name="participants" className="form-field" value={formData.participants} rows={formData.participants.split('\n').length} onChange={handleInputChange} placeholder="Participant Email addresses" />
                                <label className="form-label" htmlFor="participants">Participant Email addresses</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group field">
                                <input type="text" name="emailSubject" className="form-field" value={formData.emailSubject} onChange={handleInputChange} placeholder="Email subject" />
                                <label className="form-label" htmlFor="emailSubject">Email subject</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group field">
                                <textarea name="emailBody" className="form-field" value={formData.emailBody} rows="10" onChange={handleInputChange} placeholder="Email body" />
                                <label className="form-label" htmlFor="emailBody">Email body</label>
                            </div>
                        </div>
                    </div>

                    {formData.participants && formData.participants.length > 0 && 
                        <div className="row">
                            <div className="col-md-offset-8 col-md-2">
                                <button className="base-btn submit-btn" onClick={SendEmails}>Send emails</button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};
