import React from "react";
import { Link } from "react-router-dom";

import './footer.css';

export default function Footer() {
    return (
        <footer className="footer" data-testid="footer">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="footer_logo">
                        <a href="/">
                            Factile
                        </a>
                    </div>
                    <p>
                        Free and opensource survey tool. <br />Made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="http://asinghal.github.io/" target="_blank" rel="noopener noreferrer">Aishwarya Singhal</a> 
                    </p>
                    <div className="social_links">
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/Factile/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook"></i> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/asinghal/factile">
                                    <i className="fab fa-github"></i> Github
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-4">
                    <h3 className="footer_title">
                            About Factile
                    </h3>
                    <ul>
                        <li><Link to="/static/features">Features</Link></li>
                        <li><Link to="/static/faq">FAQs</Link></li>
                        <li><Link to="/static/help">Help</Link></li>
                        <li><Link to="/static/termsandconditions">Terms and conditions</Link></li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <h3 className="footer_title">
                            Useful Links
                    </h3>
                    <ul>
                        <li><Link to="/static/contactus">Contact Us</Link></li>
                        <li><a href="http://developers.factile.net:81/" target="_blank" rel="noopener noreferrer">API Docs</a></li>
                        <li><a href="https://status.factile.net" target="_blank" rel="noopener noreferrer">Service Status</a></li>
                        <li><a href="https://github.com/asinghal/factile" target="_blank" rel="noopener noreferrer">Github</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="container copy-right_text">
            <div className="footer_border"></div>
            <div className="row">
                <div className="col-xl-12">
                    <p className="copy_right text-center">
                        Copyright © 2020 All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
    );
};
