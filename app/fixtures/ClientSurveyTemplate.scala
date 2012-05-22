/*
 * ClientSurveyTemplate.scala
 * 
 * Copyright (c) 2012, Aishwarya Singhal. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301  USA
 */

import models._
import models.Languages._


// refer to http://www.surveyquestions.com.au/Questionnaires/Client-Survey-Questionnaires.htm
object ClientSurveyTemplate {
	var questions = List[Question]()
  questions ::= new PlainText("q0002",List(new Text("<p>" +
	"<span>Dear Customer:&nbsp;</span><br/>" +
	"<br/>" +
	"<span>As the manager of [COMPANY], I want to thank you for giving us the opportunity to serve you. Please help us serve you better by taking a couple of minutes to tell us about the service that you have received so far. We appreciate your business and want to make sure we meet your expectations. Attached, you will find a coupon good for ...... We hope that you will accept this as a token of our good will.&nbsp;</span><br/>" +
	"<br/>" +
	"<span>Sincerely,&nbsp;</span><br/>" +
	"<br/>" +
	"<span>[MANAGER_NAME]</span></p>"
,"1")))
  questions ::= new RadioButtons("q0003",List(new Text("In thinking about your most recent experience with [COMPANY], was the quality of customer service you received: ","1")),List(new AnswerOption(List(new Text("Very Poor","1")),"o1"), new AnswerOption(List(new Text("Somewhat Unsatisfactory","1")),"o2"), new AnswerOption(List(new Text("About Average","1")),"o3"), new AnswerOption(List(new Text("Very Satisfactory","1")),"o4"), new AnswerOption(List(new Text("Superior","1")),"o5")),List(new Text("","1")),false,false)
  questions ::= new TextArea("q0004",List(new Text("If you indicated that the customer service was unsatisfactory, would you please describe what happened?","1")),false)
  questions ::= new RadioButtons("q0005",List(new Text("The process for getting your concerns resolved was: ","1")),List(new AnswerOption(List(new Text("Very Poor","1")),"o1"), new AnswerOption(List(new Text("Somewhat Unsatisfactory","1")),"o2"), new AnswerOption(List(new Text("About Average","1")),"o3"), new AnswerOption(List(new Text("Very Satisfactory","1")),"o4"), new AnswerOption(List(new Text("Superior","1")),"o5")),List(new Text("","1")),false,false)
  questions ::= new TextArea("q0006",List(new Text("Would you please take a few minutes to describe what happened?","1")),false)
  questions ::= new PageBreak("q0007")
  questions ::= new RadioButtons("q0009",List(new Text("Now please think about the features and benefits of the [PRODUCT] itself. How satisfied are you with the [PRODUCT]: ","1")),List(new AnswerOption(List(new Text("Very Poor","1")),"o1"), new AnswerOption(List(new Text("Somewhat Unsatisfactory","1")),"o2"), new AnswerOption(List(new Text("About Average","1")),"o3"), new AnswerOption(List(new Text("Very Satisfactory","1")),"o4"), new AnswerOption(List(new Text("Superior","1")),"o5")),List(new Text("","1")),false,false)
  questions ::= new TextArea("q0010",List(new Text("Would you please take a few minutes to describe why you are not satisfied with the product?","1")),false)
  questions ::= new PageBreak("q0011")
  questions ::= new PlainText("q0013",List(new Text("<p>" +
	"<b>Customer Service Representative</b></p>"
,"1")))
  questions ::= new RatingScale("q0014",List(new Text("The following questions pertain to the customer service representative you spoke with most recently. Please indicate whether you agree or disagree with the following statements.","1")),List(Dimension(List(new Text("The customer service representative was very courteous","1")),"d1"), Dimension(List(new Text("The customer service representative handled my call quickly","1")),"d2"), Dimension(List(new Text("The customer service representative was very knowledgeable","1")),"d3")),List(new AnswerOption(List(new Text("Strongly Agree","1")),"o1"), new AnswerOption(List(new Text("Agree","1")),"o2"), new AnswerOption(List(new Text("Neutral","1")),"o3"), new AnswerOption(List(new Text("Disagree","1")),"o4"), new AnswerOption(List(new Text("Strongly Disagree","1")),"o5")),List(new Text("","1")),false,false)
  questions ::= new PlainText("q0017",List(new Text("<p>" +
	"<b>The Process</b></p>"
,"1")))
  questions ::= new RatingScale("q0018",List(new Text("The following questions pertain to the process by which your most recent service contract was handled. Please indicate whether you agree or disagree with the following statements.","1")),List(Dimension(List(new Text("The waiting time for having my questions addressed was satisfactory","1")),"d1"), Dimension(List(new Text("My phone call was quickly transferred to the person who best could answer my question","1")),"d2"), Dimension(List(new Text("The automated phone system made the customer service experience more satisfying","1")),"d3")),List(new AnswerOption(List(new Text("Strongly Agree","1")),"o1"), new AnswerOption(List(new Text("Agree","1")),"o2"), new AnswerOption(List(new Text("Neutral","1")),"o3"), new AnswerOption(List(new Text("Disagree","1")),"o4"), new AnswerOption(List(new Text("Strongly Disagree","1")),"o5")),List(new Text("","1")),false,false)
  questions ::= new PageBreak("q0019")
  questions ::= new RadioButtons("q0020",List(new Text("Considering the total package offered by including customer service, [PRODUCT] features and benefits, and cost; how satisfied are you with [COMPANY]?","1")),List(new AnswerOption(List(new Text("Very Satisfied","1")),"o1"), new AnswerOption(List(new Text("Somewhat Satisfied","1")),"o2"), new AnswerOption(List(new Text("Neutral","1")),"o3"), new AnswerOption(List(new Text("Somewhat Dissatisfied","1")),"o4"), new AnswerOption(List(new Text("Very Dissatisfied","1")),"o5")),List(new Text("","1")),false,false)

	val template = new Template("Client Survey Questionnaires", "asinghal79@gmail.com", questions.reverse)
	template.save
}