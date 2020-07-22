import React from "react";

import './help.css';

export default function Help() {
    return (
        <div className="container help">
			<div className="row">
				<div className="col-12 col-md-3">
					<nav id="side-nav" className="navbar navbar-dark bg-dark">
						<a className="navbar-brand" href="#">Index</a>
						<nav className="nav nav-pills flex-column">
							<a className="nav-link active" href="#designing">Designing a survey</a>
							<a className="nav-link" href="#logic">Defining Logic</a>
							<a className="nav-link" href="#preview">Preview the survey</a>
							<a className="nav-link" href="#share">Distribute/ Share</a>
							<a className="nav-link" href="#analyse">Analyse Data</a>
							<a className="nav-link" href="#manage">Manage Surveys</a>
							<a className="nav-link" href="#qtype">Question Types</a>
							<a className="nav-link" href="#mobile">Mobile Devices</a>
						</nav>
					</nav>
				</div>
				<div className="col-12 col-md-9">
					<h1>Tutorials</h1>
					<p>Watch a quick video</p>
					<iframe width="560" height="315" title="factile introduction" src="http://www.youtube.com/embed/IXgl27L6mo4"
						frameBorder="0" allowFullScreen></iframe>
					<div>
						<div>
							<div className="topic">
								<h3 id="designing"><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Designing a survey
								</h3>
								<div>To create a new survey:
									<ol>
										<li>Click on New Survey link on top menu.</li>
										<li>Define the survey settings as needed along with the color scheme.</li>
										<li>Click on 'Save Details'.</li>
										<li>On the questionnaire page, either 'Use Template' to use a predefined template, or
											'Add Question' or 'Add Page' to add questions or pages respectively.</li>
										<li>Select an appropriate question type in 'Add Question' menu.</li>
										<li>You can move questions, copy a question or delete a question/ page on the
											questionnaire page.</li>
										<li>Click on 'Save Draft' button often to keep saving your changes. </li>
										<li>Click on 'Preview' button to see what the survey would look like.</li>
									</ol>
								</div>

							</div>
							<div className="topic">
								<h3 id="logic"><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Defining Logic</h3>
								<div>Factile provides for 2 types of logic control:
									<dl>
										<dt>Flow control</dt>
										<dd>Control the appearance of pages on the basis of user's responses.</dd>
										<dt>Answer Piping</dt>
										<dd>Use answers of questions to form questions/ answer options in other questions.</dd>
									</dl>
									<ol>
										<li>Click on 'Flow' button on the questionnaire page to control the flow.</li>
										<li>Click on the gear/ cog icon to add a condition.</li>
										<li>Click on 'Save' once done.</li>
										<li>For piping, click on the chevron next to question/ options box. Select the question
											to pipe from the menu.</li>
									</ol>
								</div>

							</div>
							<div className="topic">
								<h3 id="preview"><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Preview the survey
								</h3>
								<p>Before you send out the survey, you should test what it would look like. A quick and easy way
									is to click on 'Preview' button on the questionnaire page.
									The preview works exactly the same way as the actual survey would, so you can test the color
									scheme, logic and mandatory checks easily.

								</p>

							</div>
							<div className="topic">
								<h3 id="share"><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Distribute/ Share</h3>
								<div>To distribute/ share a survey:
									<ol>
										<li>Click on 'View/ Edit' button on the dashboard.</li>
										<li>Click on 'Share' button on the survey page.</li>
										<li>If this is an open survey, the link would be shown on top. You can share this link
											with anyone you would like to take the survey.</li>
										<li>You can invite participants by email by filling up the invitation list and email
											details.</li>
										<li>You can also use the addressbook to build the invitee list (go to settings ->
											address book to add/ remove addresses).</li>
										<li>You may want to have different groups on the address book to help build different
											target audiences.</li>
									</ol>
								</div>

							</div>
							<div className="topic">
								<h3 id="analyse"><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Analyse Data</h3>
								<div>To analyze the survey responses:
									<ol>
										<li>Click on 'View Responses' button on the dashboard.</li>
										<li>This will present all questions along with a cumulative view of their answers.</li>
										<li>You can look at pie charts/ bar charts per question.</li>
										<li>Each of these charts can be exported to PDF/ saved as images.</li>
										<li>You can also download the responses into an Excel sheet.</li>
									</ol>
								</div>

							</div>
							<div className="topic">
								<h3 id="manage"><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Manage Surveys</h3>
								<p>You can view/ edit a survey, review its responses or delete just the responses/ the
									questionnaire as well from the dashboard.</p>

							</div>
							<div className="topic">
								<h3 id="qtype"><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Question Types</h3>
								<div>There are many question types that are supported by Factile.
									<dl>
										<dt>Text Box</dt>
										<dd>Small text boxes for free text. Typically used for capturing simple information like
											name/ department.</dd>
										<dt>Single Choice</dt>
										<dd>Radio buttons that allow user to select one of a given set of choices. You can also
											add a 'Other' option so users could specify a free text answer as an alternative to
											the given choices. When accessed on mobile devices, each radio button would appear
											as a big bar that the user could touch/ click to select.</dd>
										<dt>Multiple Choice</dt>
										<dd>Checkboxes that allow user to select one or more of a given set of choices. You can
											also add a 'Other' option so users could specify a free text answer as an
											alternative to the given choices. When accessed on mobile devices, each checkbox
											would appear as a on/off switch that the user could touch/ click to select.</dd>
										<dt>Ranking</dt>
										<dd>Some times, you want users to be able to rank a given list of options in their order
											of preference. Ranking questions give a drag and drop interface that allow users to
											rearrange the options.</dd>
										<dt>Dropdowns</dt>
										<dd>These are combo boxes that allow users to select one from a given set of options.
											These are typically more useful when the list is large and help keep the page clean.
										</dd>
										<dt>Rating Scale</dt>
										<dd>Predefined scale on which users can rate different 'dimensions'. Each Dimension is a
											question for the user in itself. These questions are presented as a matrix of single
											choice questions. You can also add a 'Other' box to each dimension.</dd>
										<dt>Plain Text</dt>
										<dd>Fixed/ instructional text that you would want to present on a page.</dd>
										<dt>Large Text/ Essay</dt>
										<dd>Large text boxes that are suitable for free text answers, like comments/ thoughts.
										</dd>
									</dl>
								</div>

							</div>
							<div className="topic">
								<h3 id="mobile"><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Mobile Devices</h3>
								<p>Factile has full support for mobile devices and makes it easy for users to take surveys from
									where ever they are.
									Some screenshots are captured here:</p>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
    );
};
