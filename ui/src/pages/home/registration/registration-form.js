import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { login, register } from '../api.js';

import '../login-form/login-form.css';
import { isValidEmail } from "../../../utils.js";

export default function RegistrationForm({setUserLoggedIn, setShowLoginForm}) {
    const [user, setUser] = useState({ email: '', password: ''});
    const [errorMessage, setErrorMessage] = useState('');

    let history = useHistory();

    const handleInputChange = (event) => {
        event.persist();
        setUser(user => ({...user, [event.target.name]: event.target.value}));
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (!user || !user.email || !user.password || !isValidEmail(user.email)) {
            setErrorMessage('Please enter a valid email address and password');
            return;
        }
        register(user).then(() => login(user)).then((data) => {
            if (!data || !data.token) {
                setErrorMessage('Login failed');
                return;
            }
            setErrorMessage('');
            setUserLoggedIn(true);
            return history.replace('/surveys')
        });
    };

    const showLoginForm = (event) => {
        event.preventDefault();
        setShowLoginForm(true);
    };
    
    return (
        <div className="login-form">
            <form>
                <div className="row">
                    <div className="col-12">
                        <h3>Sign up</h3>
                    </div>
                </div>
                {!!errorMessage &&
                    <div className="row">
                        <div className="col-12">
                            <div className="alert alert-danger">{errorMessage}</div>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-12">
                        <input type="text" id="email" name="email" value={user.email} placeholder="email" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input type="password" id="password" name="password" value={user.password} placeholder="password" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <button onClick={submitForm}>Register</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                    Already a user? <a href="/" onClick={showLoginForm}>Click here to login</a>
                    </div>
                </div>
            </form>
        </div>
    );
};
