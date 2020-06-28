import React from "react";
import { Link } from "react-router-dom";

import { isLoggedIn } from '../../authentication.js';

import './header.css';

const SecureAccess = (props) => {
    if (!isLoggedIn()) {
        return null;
    }
    return props.children;
};

export default function Header() {
    return (
        <header>
        <div className="header">
            <div id="sticky-header" className="main-header-area">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-xl-3 col-lg-2">
                            <div className="logo">
                                <a href="/">Factile</a>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
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
                        <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                            <div className="Appointment">
                                <div className="book_btn d-none d-lg-block">
                                    <a href="/">Login/ Logout</a>
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
