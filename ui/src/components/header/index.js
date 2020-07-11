import React, { useState } from "react";
import { Link } from "react-router-dom";

import { isLoggedIn, removeToken } from '../../authentication.js';

import './header.css';

export default function Header({userLoggedIn, setUserLoggedIn}) {

    const [ showMenu, setShowMenu ] = useState(false);

    const Logout = () => {
        removeToken();
        setUserLoggedIn(false);
    };

    const isUserLoggedIn = () => userLoggedIn && isLoggedIn();

    const SecureAccess = (props) => {
        if (!userLoggedIn || !isLoggedIn()) {
            return null;
        }
        return props.children;
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <header>
        <div className="header">
            <div id="sticky-header" className="main-header-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xs-4">
                            <i className="fas fa-bars" onClick={toggleMenu}></i>
                        </div>
                        <div className="col-xs-8 col-sm-1 col-md-1">
                            <div className="logo">
                                <a href="/">Factile</a>
                            </div>
                        </div>
                        <div className="hidden-xs col-sm-9 col-md-9">
                            <div className="main-menu">
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
                        <div className="hidden-xs col-sm-2 col-md-2">
                            <div>
                                <div>
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
                    {showMenu && 
                    <div className="side-menu">
                        <ul>
                            <li className="left-menu-header">
                                <span>&nbsp;</span><span onClick={() => setShowMenu(false)}><i className="fas fa-times"></i></span>
                            </li>
                            <SecureAccess>
                                <li>
                                    <Link to="/surveys" onClick={() => setShowMenu(false)}><i className="fas fa-clipboard-list"></i>&nbsp;My Surveys</Link><i className="fas fa-chevron-right"></i>
                                </li>
                            </SecureAccess>
                            <SecureAccess>
                                <li>
                                    <Link to="/surveys/new" onClick={() => setShowMenu(false)}><i className="far fa-edit"></i>&nbsp;New Survey</Link><i className="fas fa-chevron-right"></i>
                                </li>
                            </SecureAccess>
                            <SecureAccess>
                            <li>
                                <Link to="/user/preferences" onClick={() => setShowMenu(false)}><i className="fas fa-sliders-h"></i>&nbsp;Settings</Link><i className="fas fa-chevron-right"></i>
                            </li>
                            </SecureAccess>
                            <li>
                                <Link to="/static/help" onClick={() => setShowMenu(false)}><i className="fas fa-question"></i>&nbsp;Help</Link><i className="fas fa-chevron-right"></i>
                            </li>
                            <li>
                                {!isUserLoggedIn() &&
                                    <Link to="/"><i className="fas fa-user"></i>&nbsp;Login</Link>
                                }
                                {isUserLoggedIn() &&
                                    <Link to="/" onClick={Logout}><i className="fas fa-user"></i>&nbsp;Logout</Link>
                                }
                            </li>
                        </ul>
                    </div>
                    }
                </div>
            </div>
        </div>
    </header>
    );
};
