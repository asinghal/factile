import React from "react";
import { Link } from "react-router-dom";

import './footer.css';

export default function Footer() {
    return (
        <footer className="footer">
        <div className="footer_top">
            <div className="container">
                <div className="row">
                    <div className="col-xl-4 col-md-6 col-lg-4">
                        <div className="footer_widget">
                            <div className="footer_logo">
                                <a href="/">
                                    Factile
                                </a>
                            </div>
                            <p>
                                Firmament morning sixth subdue darkness
                                creeping gathered divide.
                            </p>
                            <div className="social_links">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i className="ti-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="ti-twitter-alt"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="col-xl-2 offset-xl-1 col-md-6 col-lg-3">
                        <div className="footer_widget">
                            <h3 className="footer_title">
                                    Services
                            </h3>
                            <ul>
                                <li><Link to="/static/features">Features</Link></li>
                                <li><Link to="/static/faq">FAQs</Link></li>
                            </ul>

                        </div>
                    </div>
                    <div className="col-xl-2 col-md-6 col-lg-2">
                        <div className="footer_widget">
                            <h3 className="footer_title">
                                    Useful Links
                            </h3>
                            <ul>
                                <li><Link to="/static/help">Help</Link></li>
                                <li><Link to="/static/contactus">Contact Us</Link></li>
                                <li><Link to="/static/termsandconditions">Terms and conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 col-lg-3">
                        <div className="footer_widget">
                            <h3 className="footer_title">
                                    Downloads
                            </h3>
                            <ul>
                                <li>
                                    <a href="#">
                                        Download from Apple Store

                                    </a>
                                </li>
                                <li><a href="#">
                                        Download from Play Store
                                    </a>
                                </li>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copy-right_text">
            <div className="container">
                <div className="footer_border"></div>
                <div className="row">
                    <div className="col-xl-12">
                        <p className="copy_right text-center">
Copyright ©<script>document.write(new Date().getFullYear());</script>2020 All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
};
