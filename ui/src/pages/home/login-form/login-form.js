import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { login } from '../api.js';

import './login-form.css';

export default function LoginForm() {
    const [user, setUser] = useState({ email: '', password: ''});
    const [errorMessage, setErrorMessage] = useState('');

    let history = useHistory();

    const handleInputChange = (event) => {
        event.persist();
        setUser(user => ({...user, [event.target.name]: event.target.value}));
    };

    const initiateLogin = (user, event) => {
        login(user).then((data) => {
            if (!data || !data.token) {
                setErrorMessage('Login failed');
                return;
            }
            setErrorMessage('');
            return history.replace('/surveys')
        });
        event.preventDefault();
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
                        <input type="text" id="email" name="email" value={user.email} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={(event)=> initiateLogin(user, event)}>Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
