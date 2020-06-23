import React, { useState } from "react";
import { login } from './api.js';

const initiateLogin = (user, event) => {
    login(user).then(console.log);
    event.preventDefault();
};

export default function LoginForm() {
    const [user, setUser] = useState({ email: '', password: ''});
    const handleInputChange = (event) => {
        event.persist();
        setUser(user => ({...user, [event.target.name]: event.target.value}));
    };

    return (
        <form>
            <div>
                <input type="text" id="email" name="email" value={user.email} onChange={handleInputChange} />
            </div>
            <div>
                <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} />
            </div>
            <div>
                <button onClick={(event)=> initiateLogin(user, event)}>Login</button>
            </div>
        </form>
    );
};
