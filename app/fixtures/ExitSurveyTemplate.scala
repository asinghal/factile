/*
 * ExitSurveyTemplate.scala
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


// refer to http://www.surveyquestions.com.au/exit-survey-questions.htm
object ExitSurveyTemplate {
	var questions = List[Question]()
  questions ::= new PlainText("q0002",List(new Text("<p><span>This information will be kept confidential in that no responses will be reported on individually, unless you chose to identify yourself.&nbsp;</span></p>", "1")))
  questions ::= new RatingScale("q0003",List(new Text("Please select which best describes your feeling about the following aspects of your employment: ", "1")),List(new Dimension(List(new Text("Duties of the job", "1")),"d1"), new Dimension(List(new Text("Training & development programs", "1")),"d2"), new Dimension(List(new Text("Opportunities for advancement", "1")),"d3"), new Dimension(List(new Text("Salary treatment", "1")),"d4"), new Dimension(List(new Text("Benefit programs", "1")),"d5"), new Dimension(List(new Text("Working conditions", "1")),"d6"), new Dimension(List(new Text("Working hours", "1")),"d7"), new Dimension(List(new Text("Co-workers", "1")),"d8"), new Dimension(List(new Text("Supervision", "1")),"d9"), new Dimension(List(new Text("Overall, as a place to work", "1")),"d10")),List(new AnswerOption(List(new Text("Very Satisfied", "1")),"o1"), new AnswerOption(List(new Text("Satisfied", "1")),"o2"), new AnswerOption(List(new Text("Neutral", "1")),"o3"), new AnswerOption(List(new Text("Dissatisfied", "1")),"o4"), new AnswerOption(List(new Text("Very Dissatisfied", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new PageBreak("q0004")
  questions ::= new RadioButtons("q0005",List(new Text("Please confirm your gender: ", "1")),List(new AnswerOption(List(new Text("Female", "1")),"o1"), new AnswerOption(List(new Text("Male", "1")),"o2")),List(new Text("", "1")),false,false)
  questions ::= new TextBox("q0006",List(new Text("Please confirm your department:", "1")),false)
  questions ::= new CheckBoxes("q0007",List(new Text("Please confirm your main reason(s) for leaving: (Check all that apply)", "1")),List(new AnswerOption(List(new Text("Benefits", "1")),"o1"), new AnswerOption(List(new Text("Better job opportunity", "1")),"o2"), new AnswerOption(List(new Text("Commute", "1")),"o3"), new AnswerOption(List(new Text("Family reasons", "1")),"o4"), new AnswerOption(List(new Text("Not challenged", "1")),"o5"), new AnswerOption(List(new Text("Pay", "1")),"o6"), new AnswerOption(List(new Text("Personal reasons", "1")),"o7"), new AnswerOption(List(new Text("Relocation/move/travel", "1")),"o8"), new AnswerOption(List(new Text("Return to school/study", "1")),"o9"), new AnswerOption(List(new Text("Supervision", "1")),"o10"), new AnswerOption(List(new Text("Work relationships", "1")),"o11"), new AnswerOption(List(new Text("Health", "1")),"o12"), new AnswerOption(List(new Text("Retirement", "1")),"o13")),List(new Text("", "1")),false,false)
  questions ::= new PageBreak("q0008")
  questions ::= new TextArea("q0009",List(new Text("Please expand on your main reason for leaving, in your own words:  ", "1")),false)
  questions ::= new TextArea("q0010",List(new Text("What did you like most about your role here at [COMPANY]?  ", "1")),false)
  questions ::= new TextArea("q0011",List(new Text("If you could change one thing about [COMPANY] what would it be? ", "1")),false)
  questions ::= new RatingScale("q0012",List(new Text("On a scale of 1 – 5,", "1")),List(new Dimension(List(new Text("How would you rate your overall experience with [COMPANY]?", "1")),"d1")),List(new AnswerOption(List(new Text("1", "1")),"o1"), new AnswerOption(List(new Text("2", "1")),"o2"), new AnswerOption(List(new Text("3", "1")),"o3"), new AnswerOption(List(new Text("4", "1")),"o4"), new AnswerOption(List(new Text("5", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new PageBreak("q0013")
  questions ::= new TextArea("q0014",List(new Text("Do you have any final additional comments?", "1")),false)

	val template = new Template("Exit Survey Questions", "asinghal79@gmail.com", questions.reverse)
	template.save
}