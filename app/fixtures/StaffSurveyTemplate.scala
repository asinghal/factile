/*
 * StaffSurveyTemplate.scala
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

// refer to http://www.surveyquestions.com.au/staff-survey-questions.htm
object StaffSurveyTemplate {
	var questions = List[Question]()
  questions ::= new PlainText("q0002",List(new Text("<p><font>The following staff survey questions could be included in larger staff satisfaction survey. It is likely that to meet the goals for a survey of this kind, additional questions should be created.&nbsp;</font></p>", "1")))
  questions ::= new RatingScale("q0003",List(new Text("", "1")),List(new Dimension(List(new Text("I believe I am fairly paid for what I do.", "1")),"d1"), new Dimension(List(new Text("I believe I am fairly paid for what I do compared to those in similar jobs in other companies.", "1")),"d2"), new Dimension(List(new Text("I believe that the benefits package offered by ABC Company is attractive.", "1")),"d3"), new Dimension(List(new Text("I believe that the benefits package offered by ABC Company is attractive compared to other organisations.", "1")),"d4"), new Dimension(List(new Text("I am proud to work for the ABC Company.", "1")),"d5"), new Dimension(List(new Text("My supervisor or manager is available to me when I have questions or need help.", "1")),"d6"), new Dimension(List(new Text("I receive feedback (formally or informally) at least once per month.", "1")),"d7"), new Dimension(List(new Text("When I perform well, I receive recognition on a timely basis.", "1")),"d8"), new Dimension(List(new Text("My job is enjoyable.", "1")),"d9"), new Dimension(List(new Text("I like the people I work with.", "1")),"d10"), new Dimension(List(new Text("If it weren't for the people I work with, I would consider leaving my job.", "1")),"d11"), new Dimension(List(new Text("If it weren't for the job itself, I would consider leaving this organisation.", "1")),"d12"), new Dimension(List(new Text("I receive training to help me do my job better.", "1")),"d13"), new Dimension(List(new Text("I believe that the ABC company offers a quality product (service).", "1")),"d14"), new Dimension(List(new Text("I believe that this organisation cares about me.", "1")),"d15"), new Dimension(List(new Text("I believe that this organisation is committed to my professional development.", "1")),"d16"), new Dimension(List(new Text("It is clear to me how I contribute to the organisation's success.", "1")),"d17"), new Dimension(List(new Text("I believe that the ABC company does a good job communicating about changes or decisions that affect employees.", "1")),"d18"), new Dimension(List(new Text("Career paths exist for someone like me in this company.", "1")),"d19"), new Dimension(List(new Text("I am expected to find new and better ways to get the job done.", "1")),"d20")),List(new AnswerOption(List(new Text("Strongly Agree", "1")),"o1"), new AnswerOption(List(new Text("Agree", "1")),"o2"), new AnswerOption(List(new Text("Neutral", "1")),"o3"), new AnswerOption(List(new Text("Disagree", "1")),"o4"), new AnswerOption(List(new Text("Strongly Disagree", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0004",List(new Text("What is your overall level of satisfaction with your job at present?", "1")),List(new AnswerOption(List(new Text("Highly Satisfied", "1")),"o1"), new AnswerOption(List(new Text("Satisfied", "1")),"o2"), new AnswerOption(List(new Text("Neutral", "1")),"o3"), new AnswerOption(List(new Text("Dissatisfied", "1")),"o4"), new AnswerOption(List(new Text("Highly Dissatisfied", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new PageBreak("q0005")
  questions ::= new TextArea("q0006",List(new Text("Do you have any final comments or suggestions in relation to how your current job satisfaction could be improved?", "1")),false)

	val template = new Template("Staff Survey Questions (Standard)", "asinghal79@gmail.com", questions.reverse)
	template.save
}