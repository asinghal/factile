import React from "react";

import './features.css';

export default function Features() {
    return (
        <div className="container">
	    	<div className="row margin-below">
	    		<div className="col-12">
						<h1>The Coolest Surveying Tool Available!</h1>
						
						<h2>So what's so cool anyways?</h2>
						<div>Do you need a good looking survey? Quick? Wouldn't you need to analyse the data? Well, this tool gives you: 
							<dl>
								<li><b>Performance:</b> A highly performant interface that promises quick turnaround of surveys. Design and share surveys just as fast as you can type!</li>
								<li><b>Ease of Use:</b> Surveys and market research are complex matters anyways! Build a survey here with a very intuitive interface in the smallest number of clicks.</li>
								<li><b>Flexibility:</b> sufficient to design surveys with logic and layouts as you see fit, and analyse the results per your need.</li>
							</dl>
							Obviously, it's being free to use also means the following:
								<dl>
									<li><b>It is free:</b> Oh yea! Free as in free. There is zero usage cost.</li>
									<li><b>Downloadable:</b> Worried about security? Would you like your own set up? Download it, customize it, do what ever with it. Just give me the credit and share your experience with your friends and colleagues.</li>
								</dl>
								Please also look at <a href="/static/help">our tutorials</a>.
						</div>
	    		</div>
	    	</div>

	    	<div className="row">
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-tags"></i> <strong>Various Question Types</strong>
	    			<div>Design a survey with multiple pages and multiple questions, just as fast as you can type :-). The different question types that are available are:
						<ol>
							<li>Text boxes</li>
							<li>Radio buttons</li>
							<li>Check boxes</li>
							<li>Combo boxes (dropdowns)</li>
							<li>Large Text areas</li>
							<li>Rating scales</li>
							<li>Ranking</li>
							<li>Plain texts</li>
						</ol>
					</div>
	    		</div>
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-globe"></i> <strong>Surveys That Run Anywhere</strong>
	    			<div>
							<ol>
								<li>Natural and adaptive support for various computer screen resolutions.</li>
								<li>Support for iPhone/ iPads</li>
								<li>Support for Blackberry handhelds.</li>
								<li>Support for most other mobile devices!</li>
							</ol>
	    			</div>
	    		</div>
	    	</div>
	    	<div className="row"><div className="col-12 clearfix">&nbsp;</div></div>
	    	<div className="row">
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-chart-pie"></i> <strong>Analyse The Captured Data </strong>
	    			<div>
							<ol>
								<li>Build charts for individual questions.</li>
								<li>Export the data as Excel.</li>
								<li>Analyze textual responses via word clouds.</li>
								<li>Group questions and build charts for the cumulative view.</li>
								<li>Draw insights on grouped questions.</li>
							</ol>
	    			</div>
	    		</div>
	    		<div className="col-md-6 feature-block">
                    <i className="far fa-edit"></i> <strong>Customize the Survey Look and Feel </strong>
	    			<div>
							<ol>
								<li>Add your logo.</li>
								<li>Define your color scheme.</li>
								<li>Define whether you want a progress bar or not.</li>
							</ol>
	    			</div>
	    		</div>
	    	</div>
	    	<div className="row"><div className="col-12 clearfix">&nbsp;</div></div>
	      <div className="row">
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-wifi"></i> <strong>Surveys That Work Offline</strong>
	    			<p>Even if the participants take your survey in transit (trains/ air planes/ etc) and do not have a proper network, they can fill in the survey. They just need to click on "Work Offline" link on the survey, fill in the survey and then click on "Send Responses" once they are back on network. As simple as that!</p>
	    		</div>
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-chart-line"></i> <strong>Powerful Analysis</strong>
	    			<p>Draw insights easily with Factile's powerful analytical ability. Group a set of questions and generate a report on most preferred answer combinations, across different permutations!</p>
	    		</div>
	    	</div>
	    	<div className="row"><div className="col-12 clearfix">&nbsp;</div></div>
	      <div className="row">
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-project-diagram"></i> <strong>Manage The Survey Flow</strong>
	    			<p>Allows you to define simple jump logic (e.g. go to page 10 if user clicks x, or skip page 5 if user's answer to a question has a perticular word/ phrase).</p>
	    		</div>
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-code"></i> <strong>Start With A Template</strong>
	    			<p>Use one of the predefined questionnaires as a starting point and customize it to suit your needs.</p>
	    		</div>
	    	</div>
	    	<div className="row"><div className="col-12 clearfix">&nbsp;</div></div>
	      <div className="row">
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-language"></i> <strong>Multiple Languages</strong>
	    			<div>Support for 10 languages. 
	    				<ol>
	    					<li>Build the survey in any language.</li>
	    					<li>Survey layout detection for right to left languages like Arabic and Hebrew.</li>
	    					<li>Fully customizable survey text.</li>
	    				</ol>
  					</div>
	    		</div>
	    		<div className="col-md-6 feature-block">
                    <i className="fab fa-apple"></i> <strong>Special Design For Smart Phones</strong>
	    			<p>Radio buttons, checkboxes, ranking or rating scales that look like iPhone and work easily with touch phones.</p>
	    		</div>
	    	</div>
	    	<div className="row"><div className="col-12 clearfix">&nbsp;</div></div>
	    	<div className="row">
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-camera"></i> <strong>Preview Survey Before Sending It Out.</strong>
	    			<p>See for yourself what the survey would look like, just while you design it!</p>
	    		</div>
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-mail-bulk"></i> <strong>Sharing Made Easy</strong>
	    			<p>Invite participants through email, or make it an open survey and just share the link on Facebook/ Twitter/ anywhere!</p>
	    		</div>
	    	</div>
	    	<div className="row"><div className="col-12 clearfix">&nbsp;</div></div>
	      <div className="row">
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-users"></i> <strong>Collaborate</strong>
	    			<p>Add other collaborators to your survey so they could make changes or view data as well.</p>
	    		</div>
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-address-book"></i> <strong>Address Book</strong>
	    			<p>Maintain an address book of frequently used email addresses.</p>
	    		</div>
	    	</div>
	    	<div className="row"><div className="col-12 clearfix">&nbsp;</div></div>
	      <div className="row">
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-shield-alt"></i> <strong>Security</strong>
	    			<p>The survey and its data are safely secured by Factile. Multiple checks and encryption ensure that only the intended users have access to your data.</p>
	    		</div>
	    		<div className="col-md-6 feature-block">
                    <i className="fas fa-download"></i> <strong>Download Me!</strong>
	    			<p>This is free software and you can download and install on your infrastructure.</p>
	    		</div>
	    	</div>
	    	<div className="row"><div className="col-12 clearfix">&nbsp;</div></div>
	    </div>
    );
};
