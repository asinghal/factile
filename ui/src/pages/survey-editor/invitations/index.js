import React, { useState, useEffect } from "react";
import SurveyManagementMenu from "../../../components/surveys/survey-management-menu";
import { useParams, useHistory } from "react-router-dom";
import classNames from "classnames";

import { findSurvey, update, sendEmails } from '../api.js';
import '../../../components/forms/inputs.css';
import { isValidEmail } from "../../../utils";
import { getAddressbook } from "../../address-book/api";
import AddressLookup from "../../../components/address-lookup";

export default function InviteSurveyUsers({ question }) {
    const [survey, setSurvey] = useState({});
    const [addressbook, setAddressbook] = useState({});
    const [overlayVisible, setOverlayVisibility] = useState(false);
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

    useEffect(() => {
        getAddressbook().then(setAddressbook).catch(() => history.replace('/'));
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

    const SendEmails = () => {
        formData.toAddresses = formData.participants.trim().split('\n').map(a => a.trim()).filter(a => !!a);
        const isValid = formData.toAddresses.map((e) => !e || !e.trim() || isValidEmail(e)).reduce((a, b) => a && b, true);
        if (!isValid) {
            setError(true);
            return false;
        }

        sendEmails(survey.surveyId, formData).then(history.replace('/surveys'));
    };

    const showAddressLookUp = (event) => {
        event.preventDefault();
        setOverlayVisibility(true);
    };

    const hideAddressLookUp = (event) => {
        event.preventDefault();
        setOverlayVisibility(false);
    };

    const addAddressesFromAddressbook = (addresses) => {
        const participants = `${formData.participants}\n${addresses.join('\n')}`;
        setFormData({...formData, participants});
    };

    return (
        <div className="new-survey container" id="top">
            <div className="row">
                <div className="col-md-4 col-lg-3 col-sm-12">
                    <SurveyManagementMenu surveyId={survey.surveyId} />
                </div>
                <div className="col-md-8 col-lg-9 col-sm-12">
                    <div className="row">
                        <div className="col-12">
                            <h1>{survey.name}</h1>

                            {survey.status === 'Draft' && 
                                <div className="alert alert-warning">This survey must be activated before it can be accessed by respondents</div>
                            }
                        </div>
                    </div>

                    { survey.accessType === 'open' && 
                    <>
                        <div className="row">
                            <div className="col-12">
                                <div><i>This is an open survey and can be accessed directly by opening <a href={surveyLink}>{surveyLink}</a> from anywhere as long as it has been activated.</i></div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-md-4 col-md-8 offset-lg-8 col-lg-4">
                                <button className="base-btn submit-btn" onClick={Activate}>Activate this survey</button>
                            </div>
                        </div>
                    </>
                    }

                    <div className="row">
                        <div className="col-12">
                            <h3>Invite users to this survey using the form below</h3>
                        </div>
                    </div>

                    { error && 
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-warning">
                                    Some of the email addresses seem to be incorrect. Please review the list before submitting the form. Please note that the email addresses must be full addresses (e.g. abc@test.com)
                                </div>
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col-12">
                            <p>Enter full email addresses of the participants in the box below. Please only enter<b> one email per line.</b></p>
                            <a href="#top" onClick={showAddressLookUp} title="Show Address Lookup"><i className="far fa-address-book"></i></a>
                        </div>
                        <div className="col-12">
                            <div className="form-group field">
                                <textarea name="participants" className="form-field" value={formData.participants} rows={formData.participants.split('\n').length} onChange={handleInputChange} placeholder="Participant Email addresses" />
                                <label className="form-label" htmlFor="participants">Participant Email addresses</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <input type="text" name="emailSubject" className="form-field" value={formData.emailSubject} onChange={handleInputChange} placeholder="Email subject" />
                                <label className="form-label" htmlFor="emailSubject">Email subject</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <textarea name="emailBody" className="form-field" value={formData.emailBody} rows="10" onChange={handleInputChange} placeholder="Email body" />
                                <label className="form-label" htmlFor="emailBody">Email body</label>
                            </div>
                        </div>
                    </div>

                    {formData.participants && formData.participants.length > 0 && 
                        <div className="row">
                            <div className="offset-md-6 col-md-6 offset-lg-8 col-lg-4">
                                <button className="base-btn submit-btn" onClick={SendEmails}>Send emails</button>
                            </div>
                        </div>
                    }

                    {overlayVisible && 
                        <AddressLookup addressbook={addressbook} close={hideAddressLookUp} onSubmit={addAddressesFromAddressbook} />
                    }

                    <div className={classNames('overlay', { 'visible': overlayVisible })}></div>

                </div>
            </div>
        </div>
    );
};
