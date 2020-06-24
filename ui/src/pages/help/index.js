import React from "react";

export default function Help() {
    return (
        <div className="container">
	    	<div className="row">
	    		<div className="span3">
	    			<div className="well sidebar-nav">
            <ul className="nav nav-list">
              <li className="nav-header">Index</li>
              <li className="active"><a href="#designing">Designing a survey</a></li>
              <li><a href="#logic">Defining Logic</a></li>
              <li><a href="#preview">Preview the survey</a></li>
              <li><a href="#share">Distribute/ Share</a></li>
              <li><a href="#analyse">Analyse Data</a></li>
              <li><a href="#manage">Manage Surveys</a></li>
              <li><a href="#qtype">Question Types</a></li>
              <li><a href="#mobile">Mobile Devices</a></li>
            </ul>
          </div>
	    		</div>
	    		<div className="span9">
						<h1>Tutorials</h1>
            <p>Watch a quick video <iframe width="560" height="315" title="factile introduction" src="http://www.youtube.com/embed/IXgl27L6mo4" frameborder="0" allowfullscreen></iframe></p>
						<div className="imageRow">
						  	<div className="set">
						      <div className="clearfix" id="designing">&nbsp;</div>
						  		<h3><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Designing a survey</h3>
						  		<p>To create a new survey:
						  			<ol>
						  				<li>Click on New Survey link on top menu.</li>
						  				<li>Define the survey settings as needed along with the color scheme.</li>
						  				<li>Click on 'Save Details'.</li>
						  				<li>On the questionnaire page, either 'Use Template' to use a predefined template, or 'Add Question' or 'Add Page' to add questions or pages respectively.</li>
						  				<li>Select an appropriate question type in 'Add Question' menu.</li>
						  				<li>You can move questions, copy a question or delete a question/ page on the questionnaire page.</li>
						  				<li>Click on 'Save Draft' button often to keep saving your changes. </li>
						  				<li>Click on 'Preview' button to see what the survey would look like.</li>
						  			</ol>
						  			Some screenshots are captured here:
						  		</p>
						  	  <div className="single first">
						  		  <a href="/assets/html/lightbox/images/screenshots/designer1.png" rel="lightbox[factile]" title="Creating a new survey"><img src="/assets/html/lightbox/images/screenshots/designer1.png" alt="Factile Designer"/></a>
						  		</div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/designer2.png" rel="lightbox[factile]" title="Creating a new survey (Multi lingual support)"><img src="/assets/html/lightbox/images/screenshots/designer2.png" alt="Factile Designer"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/questions1.png" rel="lightbox[factile]" title="Multiple question types"><img src="/assets/html/lightbox/images/screenshots/questions1.png" alt="Factile Designer"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/questions2.png" rel="lightbox[factile]" title="Add questions"><img src="/assets/html/lightbox/images/screenshots/questions2.png" alt="Factile Designer"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/move.png" rel="lightbox[factile]" title="Moving questions (Select the question after which this one should be moved)"><img src="/assets/html/lightbox/images/screenshots/move.png" alt="Factile Flow"/></a>
						      </div>
						      <div className="clearfix" id="logic">&nbsp;</div>
						  		<h3><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Defining Logic</h3>
						  		<p>Factile provides for 2 types of logic control:
						  			<dl className="dl-horizontal">
						  				<dt>Flow control</dt><dd>Control the appearance of pages on the basis of user's responses.</dd>
						  				<dt>Answer Piping</dt><dd>Use answers of questions to form questions/ answer options in other questions.</dd>
						  			</dl>
						  			<ol>
						  				<li>Click on 'Flow' button on the questionnaire page to control the flow.</li>
						  				<li>Click on the gear/ cog icon to add a condition.</li>
						  				<li>Click on 'Save' once done.</li>
						  				<li>For piping, click on the chevron next to question/ options box. Select the question to pipe from the menu.</li>
						  			</ol>
						  			Some screenshots are captured here:</p>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/flow.png" rel="lightbox[factile]" title="Manage survey flow"><img src="/assets/html/lightbox/images/screenshots/flow.png" alt="Factile Flow"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/piping.png" rel="lightbox[factile]" title="Piping - Use anwsers from one question in another"><img src="/assets/html/lightbox/images/screenshots/piping.png" alt="Factile Flow"/></a>
						      </div>
						      <div className="clearfix" id="preview">&nbsp;</div>
						  		<h3><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Preview the survey</h3>
						  		<p>Before you send out the survey, you should test what it would look like. A quick and easy way is to click on 'Preview' button on the questionnaire page.
						  			The preview works exactly the same way as the actual survey would, so you can test the color scheme, logic and mandatory checks easily.

						  			Some screenshots are captured here:</p>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/preview1.png" rel="lightbox[factile]" title="Preview the survey"><img src="/assets/html/lightbox/images/screenshots/preview1.png" alt="Factile Survey Preview"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/preview2.png" rel="lightbox[factile]" title="Preview the survey"><img src="/assets/html/lightbox/images/screenshots/preview2.png" alt="Factile Survey Preview"/></a>
						      </div>
						      <div className="clearfix" id="share">&nbsp;</div>
						  		<h3><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Distribute/ Share</h3>
						  		<p>To distribute/ share a survey:
						  			<ol>
						  				<li>Click on 'View/ Edit' button on the dashboard.</li>
						  				<li>Click on 'Share' button on the survey page.</li>
						  				<li>If this is an open survey, the link would be shown on top. You can share this link with anyone you would like to take the survey.</li>
						  				<li>You can invite participants by email by filling up the invitation list and email details.</li>
						  				<li>You can also use the addressbook to build the invitee list (go to settings -> address book to add/ remove addresses).</li>
						  				<li>You may want to have different groups on the address book to help build different target audiences.</li>
						  			</ol>
						  			Some screenshots are captured here:</p>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/invite.png" rel="lightbox[factile]" title="Invite participants through email"><img src="/assets/html/lightbox/images/screenshots/invite.png" alt="Factile Survey Data"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/using_addressbook.png" rel="lightbox[factile]" title="Using the addressbook"><img src="/assets/html/lightbox/images/screenshots/using_addressbook.png" alt="Factile Survey Data"/></a>
						      </div>
						      <div className="clearfix" id="analyse">&nbsp;</div>
						  		<h3><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Analyse Data</h3>
						  		<p>To analyze the survey responses:
						  			<ol>
						  				<li>Click on 'View Responses' button on the dashboard.</li>
						  				<li>This will present all questions along with a cumulative view of their answers.</li>
						  				<li>You can look at pie charts/ bar charts per question.</li>
						  				<li>Each of these charts can be exported to PDF/ saved as images.</li>
						  				<li>You can also download the responses into an Excel sheet.</li>
						  			</ol>
						  			Some screenshots are captured here:</p>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/data1.png" rel="lightbox[factile]" title="View response data"><img src="/assets/html/lightbox/images/screenshots/data1.png" alt="Factile Survey Data"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/data2.png" rel="lightbox[factile]" title="Build a Pie chart or a Bar chart"><img src="/assets/html/lightbox/images/screenshots/data2.png" alt="Factile Survey Data"/></a>
						      </div>
						      <div className="clearfix" id="manage">&nbsp;</div>
						  		<h3><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Manage Surveys</h3>
						  		<p>You can view/ edit a survey, review its responses or delete just the responses/ the questionnaire as well from the dashboard.
						  			Some screenshots are captured here:</p>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/dashboard.png" rel="lightbox[factile]" title="Dashboard"><img src="/assets/html/lightbox/images/screenshots/dashboard.png" alt="Factile Survey Dashboard"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/delete.png" rel="lightbox[factile]" title="Deleting a survey/ data."><img src="/assets/html/lightbox/images/screenshots/delete.png" alt="Factile Delete Survey"/></a>
						      </div>
						      <div className="clearfix" id="qtype">&nbsp;</div>
						  		<h3><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Question Types</h3>
						  		<p>There are many question types that are supported by Factile.
						  			<dl>
						  				<dt>Text Box</dt><dd>Small text boxes for free text. Typically used for capturing simple information like name/ department.</dd>
						  				<dt>Single Choice</dt><dd>Radio buttons that allow user to select one of a given set of choices. You can also add a 'Other' option so users could specify a free text answer as an alternative to the given choices. When accessed on mobile devices, each radio button would appear as a big bar that the user could touch/ click to select.</dd>
						  				<dt>Multiple Choice</dt><dd>Checkboxes that allow user to select one or more of a given set of choices. You can also add a 'Other' option so users could specify a free text answer as an alternative to the given choices. When accessed on mobile devices, each checkbox would appear as a on/off switch that the user could touch/ click to select.</dd>
						  				<dt>Ranking</dt><dd>Some times, you want users to be able to rank a given list of options in their order of preference. Ranking questions give a drag and drop interface that allow users to rearrange the options.</dd>
						  				<dt>Dropdowns</dt><dd>These are combo boxes that allow users to select one from a given set of options. These are typically more useful when the list is large and help keep the page clean.</dd>
						  				<dt>Rating Scale</dt><dd>Predefined scale on which users can rate different 'dimensions'. Each Dimension is a question for the user in itself. These questions are presented as a matrix of single choice questions. You can also add a 'Other' box to each dimension.</dd>
						  				<dt>Plain Text</dt><dd>Fixed/ instructional text that you would want to present on a page.</dd>
						  				<dt>Large Text/ Essay</dt><dd>Large text boxes that are suitable for free text answers, like comments/ thoughts.</dd>
						  			</dl>
						  			
						  			Some screenshots are captured here:</p>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/question_plain.png" rel="lightbox[factile]" title="Plain Text"><img src="/assets/html/lightbox/images/screenshots/question_plain.png" alt="Factile Survey Dashboard"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/question_single.png" rel="lightbox[factile]" title="Single Choice"><img src="/assets/html/lightbox/images/screenshots/question_single.png" alt="Factile Survey Dashboard"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/question_largetext.png" rel="lightbox[factile]" title="Large Text Box"><img src="/assets/html/lightbox/images/screenshots/question_largetext.png" alt="Factile Survey Dashboard"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/question_rating.png" rel="lightbox[factile]" title="Rating Scale"><img src="/assets/html/lightbox/images/screenshots/question_rating.png" alt="Factile Survey Dashboard"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/question_ranking.png" rel="lightbox[factile]" title="Ranking (drag and drop ordering)"><img src="/assets/html/lightbox/images/screenshots/question_ranking.png" alt="Factile Survey Dashboard"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/question_multiple.png" rel="lightbox[factile]" title="Multiple Choice"><img src="/assets/html/lightbox/images/screenshots/question_multiple.png" alt="Factile Survey Dashboard"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/question_textbox.png" rel="lightbox[factile]" title="Text Box"><img src="/assets/html/lightbox/images/screenshots/question_textbox.png" alt="Factile Survey Dashboard"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/question_dropdown.png" rel="lightbox[factile]" title="Dropdown"><img src="/assets/html/lightbox/images/screenshots/question_dropdown.png" alt="Factile Delete Survey"/></a>
						      </div>
						      <div className="clearfix" id="mobile">&nbsp;</div>
						  		<h3><i className="fas fa-chevron-circle-right blue"></i>&nbsp;Mobile Devices</h3>
						  		<p>Factile has full support for mobile devices and makes it easy for users to take surveys from where ever they are.
						  			Some screenshots are captured here:</p>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/survey_iphone1.png" rel="lightbox[factile]" title="Survey Page"><img src="/assets/html/lightbox/images/screenshots/survey_iphone1.png" alt="Factile Mobile Support"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/survey_iphone2.png" rel="lightbox[factile]" title="Rating Scale with on/off switches"><img src="/assets/html/lightbox/images/screenshots/survey_iphone2.png" alt="Factile Mobile Support"/></a>
						      </div>
						      <div className="single">
						  		  <a href="/assets/html/lightbox/images/screenshots/survey_iphone3.png" rel="lightbox[factile]" title="Single Choice Questions"><img src="/assets/html/lightbox/images/screenshots/survey_iphone3.png" alt="Factile Mobile Support"/></a>
						      </div>
						      <div className="single last">
						  		  <a href="/assets/html/lightbox/images/screenshots/survey_iphone4.png" rel="lightbox[factile]" title="Multiple Choice Questions."><img src="/assets/html/lightbox/images/screenshots/survey_iphone4.png" alt="Factile Mobile Support"/></a>
						      </div>
						  	</div>
						  </div>
	    		</div>
	    	</div>


	    </div>

    );
};
