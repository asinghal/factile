import React from "react";
import { Link } from "react-router-dom";

import './header.css';

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
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/surveys">Surveys</Link>
                                    </li>
                                    <li>
                                        <Link to="/surveys/new">New Survey</Link>
                                    </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                            <div className="Appointment">
                                <div className="book_btn d-none d-lg-block">
                                    <a href="#">Login/ Logout</a>
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
