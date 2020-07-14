import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { login, forgotPassword } from '../api.js';

import './login-form.css';

export default function LoginForm({setUserLoggedIn, setShowLoginForm}) {
    const [user, setUser] = useState({ email: '', password: ''});
    const [errorMessage, setErrorMessage] = useState('');

    let history = useHistory();

    const handleInputChange = (event) => {
        event.persist();
        setUser(user => ({...user, [event.target.name]: event.target.value}));
    };

    const initiateLogin = (event) => {
        login(user).then((data) => {
            if (!data || !data.token) {
                setErrorMessage('Login failed');
                return;
            }
            setErrorMessage('');
            setUserLoggedIn(true);
            return history.replace('/surveys')
        });
        event.preventDefault();
    };

    const resetPassword = (event) => {
        forgotPassword(user.email).then(console.log);
    };
    
    return (
        <div className="login-form">
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <h3>Login to get started</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-message">{errorMessage}</div>
                    </div>
                </div>
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
                        <button onClick={initiateLogin}>Login</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        Not a user yet? <a onClick={() => setShowLoginForm(false)}>Click here to register</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        Forgot password? <a onClick={() => resetPassword(false)}>Click here to reset</a>
                    </div>
                </div>
            </form>
        </div>
    );
};
