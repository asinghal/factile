import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { login, forgotPassword } from '../api.js';

import './login-form.css';
import { isValidEmail } from "../../../utils.js";

export default function LoginForm({setUserLoggedIn, setShowLoginForm}) {
    const [user, setUser] = useState({ email: '', password: ''});
    const [errorMessage, setErrorMessage] = useState('');

    let history = useHistory();

    const handleInputChange = (event) => {
        event.persist();
        setUser(user => ({...user, [event.target.name]: event.target.value}));
    };

    const initiateLogin = (event) => {
        event.preventDefault();
        if (!user || !user.email || !user.password || !isValidEmail(user.email)) {
            setErrorMessage('Please enter a valid email address and password');
            return;
        }
        login(user).then((data) => {
            if (!data || !data.token) {
                setErrorMessage('Login failed');
                return;
            }
            setErrorMessage('');
            setUserLoggedIn(true);
            return history.replace('/surveys')
        });
    };

    const resetPassword = (event) => {
        event.preventDefault();
        if (!user || !user.email || !isValidEmail(user.email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }
        forgotPassword(user.email).then(console.log);
    };

    const showRegistrationForm = (event) => {
        event.preventDefault();
        setShowLoginForm(false);
    };

    const initiateGoogleAuth = (event) => {
        event.preventDefault();
        window.open('/api/auth/google', '_self');
    };

    const initiateFacebookAuth = (event) => {
        event.preventDefault();
        window.open('/api/auth/facebook', '_self');
    };

    return (
        <div className="login-form">
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Login to get started</h3>
                    </div>
                </div>
                {!!errorMessage &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-danger" data-testid="login-error">{errorMessage}</div>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="col-md-12">
                        <input type="text" id="email" name="email" value={user.email} placeholder="email" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <input type="password" id="password" name="password" value={user.password} placeholder="password" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={initiateLogin} data-testid="login-btn">Login</button>
                        <span className="oauth-button">
                            <i onClick={initiateGoogleAuth} className="fab fa-google"></i>
                        </span>
                        <span className="oauth-button">
                            <i onClick={initiateFacebookAuth} className="fab fa-facebook"></i>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        Not a user yet? <a href="/" onClick={showRegistrationForm}>Click here to register</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        Forgot password? <a href="/" onClick={resetPassword} data-testid="reset-password">Click here to reset</a>
                    </div>
                </div>
            </form>
        </div>
    );
};
