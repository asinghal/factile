/*
 * TrainingFeedbackTemplate.scala
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

// refer to http://www.surveyquestions.com.au/training-feedback-survey-questions.htm
object TrainingFeedbackTemplate {
	var questions = List[Question]()
  questions ::= new RadioButtons("q0001",List(new Text("This training program level was useful for you:", "1")),List(new AnswerOption(List(new Text("Agree", "1")),"o1"), new AnswerOption(List(new Text("Indifferent", "1")),"o2"), new AnswerOption(List(new Text("Disagree", "1")),"o3")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0002",List(new Text("Do you agree that it was easy to follow the training instructions?", "1")),List(new AnswerOption(List(new Text("Strongly agree", "1")),"o1"), new AnswerOption(List(new Text("Somewhat agree", "1")),"o2"), new AnswerOption(List(new Text("Neutral agree", "1")),"o3"), new AnswerOption(List(new Text("Disagree", "1")),"o4")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0003",List(new Text("Was the content and language in which the instructors communicated to you, understandable?", "1")),List(new AnswerOption(List(new Text("Yes", "1")),"o1"), new AnswerOption(List(new Text("No", "1")),"o2")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0004",List(new Text("Was the training programme organised in an effective manner?", "1")),List(new AnswerOption(List(new Text("Yes, it was.", "1")),"o1"), new AnswerOption(List(new Text("No", "1")),"o2"), new AnswerOption(List(new Text("Could have been better", "1")),"o3")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0005",List(new Text("Would you like to attend another program from our organisation in future?", "1")),List(new AnswerOption(List(new Text("Yes", "1")),"o1"), new AnswerOption(List(new Text("May be", "1")),"o2"), new AnswerOption(List(new Text("No", "1")),"o3")),List(new Text("", "1")),false,false)
  questions ::= new TextArea("q0006",List(new Text(" If you have any suggestions regarding this training program, please provide them here:", "1")),false)

	val template = new Template("Training Survey Questions", "asinghal79@gmail.com", questions.reverse)
	template.save
}