import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { findSurvey, update } from '../api.js';
import SurveyManagementMenu from "../../../components/surveys/survey-management-menu/index.js";

export default function SurveyCollaborators() {
    const [survey, setSurvey] = useState({});
    const [newCollaborator, setNewCollaborator] = useState('');
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        findSurvey(id).then((survey) => {
            setSurvey({...survey});
        }).catch(() => history.replace('/'));
    }, [id, history]);

    const handleInputChange = (event) => {
        event.persist();
        setNewCollaborator(event.target.value);
    };

    const Save = () => {
        const owners = [ ...survey.owner, newCollaborator ];
        const updated = { ...survey, owner: owners};
        setSurvey(updated);
        update(updated).then(console.log);
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
                            <h1>{survey.name}: Manage Collaborators</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {survey.owner && survey.owner.map((o, index) => 
                                <div key={index}>{o}</div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            &nbsp;
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group field">
                                <input type="email" name="newCollaborator" className="form-field" value={newCollaborator} onChange={handleInputChange} placeholder="New Collaborator" />
                                <label className="form-label" htmlFor="newCollaborator">New Collaborator</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-lg-4">
                            <button className="base-btn submit-btn" onClick={Save}>Add collaborator</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
