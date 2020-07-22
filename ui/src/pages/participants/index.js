import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import SurveyManagementMenu from "../../components/surveys/survey-management-menu/index.js";

import { findSurvey } from './api.js';

export default function Participants() {
    const [participants, setParticipants] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        findSurvey(id).then(setParticipants).catch(() => history.replace('/'));
    }, [id, history]);

    const invite = (event) => {
        event.preventDefault();
        history.replace('/surveys/' + id + '/invite');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-lg-3 col-sm-12">
                    <SurveyManagementMenu surveyId={id} />
                </div>
                <div className="col-md-8 col-lg-9 col-sm-12">
                    <div className="row">
                        <div className="col-3">
                            <button className="base-btn submit-btn" onClick={invite}>Invite audience</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {participants.map((participant, index) => (
                                        <tr key={"participant" + index}>
                                            <td>{participant.email}</td>
                                            <td>{participant.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
