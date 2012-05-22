/*
 * SatisfactionSurveyTemplate.scala
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

// refer to http://www.surveyquestions.com.au/satisfaction-survey-questions.htm
object SatisfactionSurveyTemplate {
	var questions = List[Question]()
  questions ::= new RadioButtons("q0001",List(new Text("What is your definition of satisfaction?", "1")),List(new AnswerOption(List(new Text("Superior quality and durability", "1")),"o1"), new AnswerOption(List(new Text("Effective support services and good presentation", "1")),"o2"), new AnswerOption(List(new Text("Good quantity and excellent performance", "1")),"o3"), new AnswerOption(List(new Text("Affordable price", "1")),"o4")),List(new Text("If any other, please mention", "1")),true,false)
  questions ::= new RadioButtons("q0002",List(new Text("Are you satisfied with our products /services?", "1")),List(new AnswerOption(List(new Text("Yes. Fully satisfied", "1")),"o1"), new AnswerOption(List(new Text("Somewhat satisfied", "1")),"o2"), new AnswerOption(List(new Text("Not satisfied", "1")),"o3")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0003",List(new Text("If you encounter any problem, whom would you like to complain?", "1")),List(new AnswerOption(List(new Text("Customer care", "1")),"o1"), new AnswerOption(List(new Text("Concerned sales person", "1")),"o2"), new AnswerOption(List(new Text("Senior concerned authority", "1")),"o3")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0004",List(new Text("How did you find our process of complaint sorting?", "1")),List(new AnswerOption(List(new Text("Easy", "1")),"o1"), new AnswerOption(List(new Text("Comfortable", "1")),"o2"), new AnswerOption(List(new Text("Difficult", "1")),"o3")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0005",List(new Text("How often do you change your brands?", "1")),List(new AnswerOption(List(new Text("I believe in sticking to one brand", "1")),"o1"), new AnswerOption(List(new Text("Once in six month", "1")),"o2"), new AnswerOption(List(new Text("Once in a year", "1")),"o3"), new AnswerOption(List(new Text("More than this", "1")),"o4")),List(new Text("", "1")),false,false)
  questions ::= new PageBreak("q0006")
  questions ::= new TextArea("q0007",List(new Text("What factors do you consider the most while buying a product/service? ", "1")),false)
  questions ::= new TextArea("q0008",List(new Text("If we could do one thing to improve your satisfaction with our company, what would it be? ", "1")),false)

	val template = new Template("Satisfaction Survey Questions", "asinghal79@gmail.com", questions.reverse)
	template.save
}