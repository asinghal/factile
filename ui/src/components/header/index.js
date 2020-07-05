import React from "react";
import { Link } from "react-router-dom";

import { isLoggedIn, removeToken } from '../../authentication.js';

import './header.css';

export default function Header({userLoggedIn, setUserLoggedIn}) {

    const Logout = () => {
        removeToken();
        setUserLoggedIn(false);
    };

    const isUserLoggedIn = () => userLoggedIn && isLoggedIn();

    const SecureAccess = (props) => {
        if (!userLoggedIn || !isLoggedIn()) {
            // in case the token has expired, we would best record a logout
            setUserLoggedIn(false);
            return null;
        }
        return props.children;
    };

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
                                    {!isUserLoggedIn() &&
                                        <Link to="/"><i className="fas fa-user"></i>&nbsp;Login</Link>
                                    }
                                    {isUserLoggedIn() &&
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
