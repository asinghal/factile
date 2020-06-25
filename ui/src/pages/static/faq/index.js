import React from "react";

import './faq.css';

export default function FAQ() {
    return (
        <div className="container">
            <h1>Frequently Asked Questions</h1>

            <section className="section">
                <h2 className="heading">General</h2>
                <div>
                    <div className="question">
                            <div>
                                <strong>
                                    <i className="blue fas fa-question-circle"></i>&nbsp;What is Factile?
                                </strong>
                            </div>
                            <div>
                                Factile is an online survey creation tool. You can create questionnaires, share them with your
                                targetted audience, have them fill up the forms and you can study the results. An online survey
                                capability helps collate valuable perceptions and leads to valuable insights.
                            </div>
                    </div>
                    <div className="question">
                            <div>
                                <strong>
                                    <i className="blue fas fa-question-circle"></i>&nbsp;Why should I use Factile?
                                </strong>
                            </div>
                            <div>
                                There are many very fine products out there that provide online survey capability. However, while
                                basic features come for free, free options of a full fledged system are fairly limited. Plus, you
                                may need to deploy the survey tool on your premises, inside your own firewall. Factile is free and
                                you can download and install it as you like. It is open source, so you or your technical teams can
                                make changes to the code and make it work just as you would want! Not that you should need to,
                                Factile is a fairly versatile system in itself.
                            </div>
                    </div>
                    <div className="question">
                            <div>
                                <strong>
                                    <i className="blue fas fa-question-circle"></i>&nbsp;Why is it free? What's the caveat?
                                </strong>
                            </div>
                            <div>
                                There is no caveat! Factile is absolutely free to its users. I pay for the domain space and hosting
                                costs, and I use my free time to build it. Ofcourse, if you wanted to donate any money/ resource to
                                aid the project, it would be more than welcome! By the way, if you do like Factile, please do not
                                forget to <b>Tweet</b> or/ and like on <b>Facebook</b> on the <a href="/">homepage</a>.
                            </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <h2 className="heading">Surveys</h2>
                For a feature list, please refer to the <a href='/static/features'>'Learn more'</a> page.
                <div>
                    <div className="question">
                            <div>
                                <strong>
                                    <i className="blue fas fa-question-circle"></i>&nbsp;How do I create a survey?
                                </strong>
                            </div>
                            <div>
                                <ol>
                                    <li>Login to Factile and click on 'New Survey' on the top header.</li>
                                    <li>Fill up the survey information and define the color scheme.</li>
                                    <li>Click on 'Save Details' on the top right corner.</li>
                                    <li>On the questionnaire page, either choose a template, or add questions on your own.</li>
                                    <li>Preview the survey.</li>
                                    <li>Once you are happy with it, 'Activate' it so others can use it.</li>
                                </ol>
                            </div>
                    </div>
                    <div className="question">
                            <div>
                                <strong>
                                    <i className="blue fas fa-question-circle"></i>&nbsp;What does 'Collaborate' do?
                                </strong>
                            </div>
                            <div>
                                'Collaborate' allows you to add other users as owners of the survey. This is particularly useful
                                when you are working in a team and multiple people may need to make changes to the questionnaire.
                            </div>
                    </div>
                    <div className="question">
                            <div>
                                <strong>
                                    <i className="blue fas fa-question-circle"></i>&nbsp;I have to share the questionnaire in multiple languages. How do I do that?
                                </strong>
                            </div>
                            <div>
                                At the moment, you can only add one language at a time. However, I am looking at building this
                                capability pretty soon. For the time being, you can copy the questionnaire for each language.
                            </div>
                    </div>
                    <div className="question">
                            <div>
                                <strong>
                                    <i className="blue fas fa-question-circle"></i>&nbsp;What options do I have for sharing the survey?
                                </strong>
                            </div>
                            <div>
                                You can either create an 'Open' survey so anybody with the link to it can fill it, or you can have a
                                'Email' survey. In the latter case, only people you invite through Factile will be able to fill up
                                the survey. Also, in latter, one person can only fill the survey once.
                            </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
