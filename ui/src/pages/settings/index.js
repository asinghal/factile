import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { update } from './api.js';

export default function Settings () {
    const [ formData, setFormData ] = useState({});
    const [ error, hasError ] = useState(false);
    let history = useHistory();

    const onChange = (event) => {
        event.persist();
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const Save = (event) => {
        event.persist();
        const isValid = (formData.password && formData.newPassword && formData.password === formData.newPassword);
        if (!isValid) {
            hasError(true);
        } else {
            hasError(false);
            update(formData.password).then(history.replace('/surveys'));
        }
    };

    return (
        <div className="container">
            {error &&
            <>
                <div className="row">
                    <div className="col-md-12">
                        <span className="alert alert-danger">There was an error. Please check the inputs and try again.</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        &nbsp;
                    </div>
                </div>
            </>
            }
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="password" name="password" id="password" className="form-field" onChange={onChange} placeholder="New Password" />
                        <label htmlFor="password" className="form-label">New Password</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group field">
                        <input type="password" name="newPassword" id="newPassword" className="form-field" onChange={onChange} placeholder="Please enter the new Password again" />
                        <label htmlFor="newPassword" className="form-label">Please enter the new Password again</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6 col-sm-4 col-md-4">
                    <button className="base-btn submit-btn" onClick={Save}>Save</button>
                </div>
            </div>
        </div>
    )
};