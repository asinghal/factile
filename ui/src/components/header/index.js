import React from "react";
import { Link } from "react-router-dom";

import { isLoggedIn, removeToken } from '../../authentication.js';

import './header.css';

const SecureAccess = (props) => {
    if (!isLoggedIn()) {
        return null;
    }
    return props.children;
};

export default function Header() {

    const Logout = () => removeToken();
    
    return (
        <header>
        <div className="header">
            <div id="sticky-header" className="main-header-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-1">
                            <div className="logo">
                                <a href="/">Factile</a>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="main-menu d-none d-lg-block">
                                <nav>
                                    <ul id="navigation">
                                        <SecureAccess>
                                            <li>
                                                <Link to="/surveys">My Surveys</Link>
                                            </li>
                                        </SecureAccess>
                                        <SecureAccess>
                                            <li>
                                                <Link to="/surveys/new">New Survey</Link>
                                            </li>
                                        </SecureAccess>
                                        <SecureAccess>
                                        <li>
                                            <Link to="/user/preferences">Settings</Link>
                                        </li>
                                        </SecureAccess>
                                        <li>
                                            <Link to="/static/help">Help</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-md-2 d-none d-lg-block">
                            <div className="Appointment">
                                <div className="book_btn d-none d-lg-block">
                                    {!isLoggedIn() && 
                                        <Link to="/"><i className="fas fa-user"></i>&nbsp;Login</Link>
                                    }
                                    {isLoggedIn() && 
                                        <Link to="/" onClick={Logout}><i className="fas fa-user"></i>&nbsp;Logout</Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header>
    );
};
