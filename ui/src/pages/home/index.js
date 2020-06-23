import React from "react";

import './home.css';

export default function Home() {
    return (
        <div>
            <div className="hero">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-7 col-md-6">
                        <div className="slider_text ">
                            <h3>Factile</h3>
                            <p>Understand your audience with free surveys!</p>
                        </div>
                    </div>
                    <div className="col-xl-5 col-md-6">
                        <div>
                            login form
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <section className="features">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h3>Free Online Surveys</h3>
                            <p>Design and share unlimited surveys at zero cost (100% free). This free online survey tool provides many advanced features as flow logic, offline survey capability, mobile/ iPad support - features that other tools would charge for! </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <h3>Powerful Analytics and Easy Insights</h3>
                            <p>There are pretty cool analysis tools too! Build pie charts, bar charts, or look at a word tag cloud to get quick insights. Or, just group questions and define filters and let this free online survey tool tell you the top 5 audience picked combinations!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <h3>Surveys that Work Anywhere</h3>
                            <p>You design the questionnaire, and we deliver an online survey that runs anywhere. Your audience may take the survey on a mobile phone, or a laptop, or a tablet. Oh, did we mention your audience could take the surveys in transit, even when they have a flaky internet connection? All that just comes naturally!</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
