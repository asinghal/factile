import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { findSurvey, update, deleteResponses, deleteSurvey } from "../api";
import SurveyManagementMenu from "../../../components/surveys/survey-management-menu";

export default function SurveySettings() {
    const [survey, setSurvey] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then((survey) => {
            setSurvey({...survey});
        }).catch(() => history.replace('/'));
    }, [id, history]);

    const updateStatus = (event, status) => {
        event.preventDefault();
        update({...survey, status}).then(findSurvey(id).then((survey) => {
            setSurvey({...survey});
        })).catch(() => history.replace('/'));
    };

    const deleteAllResponses = (event) => {
        deleteResponses(id).then(() => history.replace('/surveys')).catch(() => history.replace('/'));
    };

    const deleteThisSurvey = (event) => {
        deleteResponses(id).then(() => deleteSurvey(id)).then(() => history.replace('/surveys')).catch(() => history.replace('/'));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-lg-3 col-sm-12">
                    <SurveyManagementMenu surveyId={survey.surveyId} />
                </div>
                <div className="col-md-8 col-lg-9 col-sm-12">
                    <div className="row">
                        <div className="col-12">
                            <h1>{survey.name}: Advanced Settings</h1>
                        </div>
                    </div>

                    {survey.status === 'Live' &&
                        <div className="row vertical-margin">
                            <div className="col-md-8 col-lg-9">
                                <div>
                                    <h4>Close this survey</h4>
                                    <em>Stop further responses to this survey. Already collected responses will not be deleted.</em>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <button className="base-btn submit-btn" onClick={e => updateStatus(e, 'Closed')}>Mark as Closed</button>
                            </div>
                        </div>
                    }

                    {survey.status === 'Closed' &&
                        <div className="row vertical-margin">
                            <div className="col-md-8 col-lg-9">
                                <div>
                                    <h4>Reopen this survey</h4>
                                    <em>Enable this survey to start collecting responses. Already collected responses will not be deleted and new responses will be added to existing ones.</em>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <button className="base-btn submit-btn" onClick={e => updateStatus(e, 'Live')}>Reopen</button>
                            </div>
                        </div>
                    }

                    <div className="row vertical-margin">
                        <div className="col-md-8 col-lg-9">
                            <div>
                                <h4>Delete existing responses</h4>
                                <em>Delete any responses captured so far for this survey.</em>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3">
                            <button className="base-btn submit-btn" onClick={deleteAllResponses}>Delete</button>
                        </div>
                    </div>

                    <div className="row vertical-margin">
                        <div className="col-md-8 col-lg-9">
                            <div>
                                <h4>Delete this survey</h4>
                                <em>Delete this survey and any responses captured so far.</em>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3">
                            <button className="base-btn submit-btn" onClick={deleteThisSurvey}>Delete</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
