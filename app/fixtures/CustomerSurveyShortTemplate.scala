/*
 * CustomerSurveyShortTemplate.scala
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

// refer to http://www.surveyquestions.com.au/Questionnaires/Customer-Survey-Questionnaires.htm
object CustomerSurveyShortTemplate {
  var questions = List[Question]()
  questions ::= new PlainText("q0002",List(new Text("<p><span>Dear Customer,&nbsp;</span><br /><br /><span>Our goal is to provide our customers with the best service possible. Please take a few minutes to complete the following customer service questionnaire. Your comments will enable us to see how we&#39;re doing overall and find out how we can improve.</span></p>", "1")))
  questions ::= new RatingScale("q0003",List(new Text("", "1")),List(new Dimension(List(new Text("Staff were available in a timely manner.", "1")),"d1"), new Dimension(List(new Text("Staff greeted you and offered to help you.", "1")),"d2"), new Dimension(List(new Text("Staff were friendly and cheerful throughout.", "1")),"d3"), new Dimension(List(new Text("Staff answered all of your questions.", "1")),"d4"), new Dimension(List(new Text("Staff showed sufficient knowledge of our products/services.", "1")),"d5"), new Dimension(List(new Text("Staff offered pertinent advice.", "1")),"d6"), new Dimension(List(new Text("Staff were courteous throughout.", "1")),"d7")),List(new AnswerOption(List(new Text("Strongly Agree", "1")),"o1"), new AnswerOption(List(new Text("Agree", "1")),"o2"), new AnswerOption(List(new Text("Neutral", "1")),"o3"), new AnswerOption(List(new Text("Disagree", "1")),"o4"), new AnswerOption(List(new Text("Strongly Disagree", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new PageBreak("q0004")
  questions ::= new RadioButtons("q0005",List(new Text("Overall, how would you rate our customer service?  ", "1")),List(new AnswerOption(List(new Text("Excellent", "1")),"o1"), new AnswerOption(List(new Text("Good", "1")),"o2"), new AnswerOption(List(new Text("Average", "1")),"o3"), new AnswerOption(List(new Text("Fair", "1")),"o4"), new AnswerOption(List(new Text("Poor", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new TextArea("q0007",List(new Text("What did you like best about our customer service?  ", "1")),false)
  questions ::= new TextArea("q0008",List(new Text("How could we improve our customer service?  ", "1")),false)
  questions ::= new PlainText("q0010",List(new Text("<p><span>Is there a staff person you would like to commend?&nbsp;</span></p>", "1")))
  questions ::= new TextBox("q0011",List(new Text("Name", "1")),false)
  questions ::= new TextArea("q0013",List(new Text("Reason", "1")),false)
  questions ::= new PageBreak("q0015")
  questions ::= new TextArea("q0016",List(new Text("Do you have any final comments regarding your experience with us?", "1")),false)

  val template = new Template("Customer Survey Questionnaires", "asinghal79@gmail.com", questions.reverse)
  template.save
}