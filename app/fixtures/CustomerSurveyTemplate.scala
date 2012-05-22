/*
 * CustomerSurveyTemplate.scala
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

// refer to http://www.surveyquestions.com.au/customer-survey-questions.htm
object CustomerSurveyTemplate {
	var questions = List[Question]()
  questions ::= new PlainText("q0001",List(new Text("<p>" +
	"<span>In [COMPANY], we would like to know what you think of our work. Please complete this short survey to provide us with feedback.</span></p>", "1")))

  questions ::= new RadioButtons("q0002",List(new Text("What is your overall satisfaction with [COMPANY] products and services?  ", "1")),List(new AnswerOption(List(new Text("Very satisfied", "1")),"o1"), new AnswerOption(List(new Text("Satisfied", "1")),"o2"), new AnswerOption(List(new Text("Neutral", "1")),"o3"), new AnswerOption(List(new Text("Dissatisfied", "1")),"o4"), new AnswerOption(List(new Text("Very dissatisfied", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new TextArea("q0003",List(new Text("If you are dissatisfied, why?", "1")),false)
  questions ::= new RadioButtons("q0004",List(new Text("How often do you use [COMPANY] products and services?", "1")),List(new AnswerOption(List(new Text("Daily", "1")),"o1"), new AnswerOption(List(new Text("About once a week", "1")),"o2"), new AnswerOption(List(new Text("About once a month", "1")),"o3"), new AnswerOption(List(new Text("Several times a year", "1")),"o4"), new AnswerOption(List(new Text("Once a year", "1")),"o5")),List(new Text("Other, please specify:", "1")),true,false)
  questions ::= new RadioButtons("q0005",List(new Text("How long have you been using [COMPANY]'s products and services?", "1")),List(new AnswerOption(List(new Text("Less than 1 month", "1")),"o1"), new AnswerOption(List(new Text("1 to 6 months", "1")),"o2"), new AnswerOption(List(new Text("6 months to 1 year", "1")),"o3"), new AnswerOption(List(new Text("1 to 3 years", "1")),"o4"), new AnswerOption(List(new Text("More than 3 years", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0006",List(new Text("What is the main reason you originally selected [COMPANY]'s products and services?", "1")),List(new AnswerOption(List(new Text("Value for price", "1")),"o1"), new AnswerOption(List(new Text("Quality", "1")),"o2"), new AnswerOption(List(new Text("Design and appearance", "1")),"o3"), new AnswerOption(List(new Text("Was recommended it", "1")),"o4"), new AnswerOption(List(new Text("On sale", "1")),"o5")),List(new Text("Other, please specify:", "1")),true,false)
  questions ::= new PageBreak("q0007")
  questions ::= new RatingScale("q0008",List(new Text("How satisfied are you with [COMPANY] products and services in the following areas:", "1")),List(new Dimension(List(new Text("Value for price", "1")),"d1"), new Dimension(List(new Text("Quality", "1")),"d2"), new Dimension(List(new Text("Usage experience", "1")),"d3"), new Dimension(List(new Text("Ability to meet needs", "1")),"d4"), new Dimension(List(new Text("Design and appearance", "1")),"d5")),List(new AnswerOption(List(new Text("Very satisfied", "1")),"o1"), new AnswerOption(List(new Text("Satisfied", "1")),"o2"), new AnswerOption(List(new Text("Neutral", "1")),"o3"), new AnswerOption(List(new Text("Dissatisfied", "1")),"o4"), new AnswerOption(List(new Text("Very dissatisfied", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new RatingScale("q0009",List(new Text("How satisfied are you with your relationships with [COMPANY] in the following areas:", "1")),List(new Dimension(List(new Text("Flexibility of pricing", "1")),"d1"), new Dimension(List(new Text("Flexibility of terms and/or agreements", "1")),"d2"), new Dimension(List(new Text("Flexibility of partner and/or affiliate programs", "1")),"d3"), new Dimension(List(new Text("After-sale support", "1")),"d4"), new Dimension(List(new Text("Purchase experience", "1")),"d5"), new Dimension(List(new Text("Repeat purchase experience", "1")),"d6"), new Dimension(List(new Text("Sales representatives and support", "1")),"d7")),List(new AnswerOption(List(new Text("Very satisfied", "1")),"o1"), new AnswerOption(List(new Text("Satisfied", "1")),"o2"), new AnswerOption(List(new Text("Neutral", "1")),"o3"), new AnswerOption(List(new Text("Dissatisfied", "1")),"o4"), new AnswerOption(List(new Text("Very dissatisfied", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new PageBreak("q0010")
  questions ::= new RadioButtons("q0011",List(new Text("Compared to the alternative products and services available on the market, how do you estimate [COMPANY] products and services: ", "1")),List(new AnswerOption(List(new Text("Much better", "1")),"o1"), new AnswerOption(List(new Text("Somewhat better", "1")),"o2"), new AnswerOption(List(new Text("About the same", "1")),"o3"), new AnswerOption(List(new Text("Worse", "1")),"o4"), new AnswerOption(List(new Text("Much worse", "1")),"o5"), new AnswerOption(List(new Text("Don't know", "1")),"o6")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0012",List(new Text("Based on your recent experience, will you continue purchasing products or services from [COMPANY] in future? ", "1")),List(new AnswerOption(List(new Text("Definitely", "1")),"o1"), new AnswerOption(List(new Text("Probably", "1")),"o2"), new AnswerOption(List(new Text("Probably not", "1")),"o3"), new AnswerOption(List(new Text("Definitely not", "1")),"o4"), new AnswerOption(List(new Text("Not sure", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new TextArea("q0013",List(new Text("If no, why not?", "1")),false)
  questions ::= new RadioButtons("q0014",List(new Text("Would you purchase additional or related products or services from [COMPANY]?", "1")),List(new AnswerOption(List(new Text("Definitely", "1")),"o1"), new AnswerOption(List(new Text("Probably", "1")),"o2"), new AnswerOption(List(new Text("Probably not", "1")),"o3"), new AnswerOption(List(new Text("Definitely not", "1")),"o4"), new AnswerOption(List(new Text("Not sure", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0015",List(new Text("Would you recommend [COMPANY] products or services to your friend or affiliate?", "1")),List(new AnswerOption(List(new Text("Definitely", "1")),"o1"), new AnswerOption(List(new Text("Probably", "1")),"o2"), new AnswerOption(List(new Text("Probably not", "1")),"o3"), new AnswerOption(List(new Text("Definitely not", "1")),"o4"), new AnswerOption(List(new Text("Not sure", "1")),"o5")),List(new Text("", "1")),false,false)
  questions ::= new PageBreak("q0016")
  questions ::= new RadioButtons("q0017",List(new Text("What is the most convenient way for you to purchase products or services from [COMPANY]?", "1")),List(new AnswerOption(List(new Text("Mail order", "1")),"o1"), new AnswerOption(List(new Text("Internet", "1")),"o2"), new AnswerOption(List(new Text("Phone", "1")),"o3"), new AnswerOption(List(new Text("Fax", "1")),"o4")),List(new Text("Other, please specify:", "1")),true,false)
  questions ::= new RadioButtons("q0018",List(new Text("Did you experience any problems using [COMPANY] products or services?  ", "1")),List(new AnswerOption(List(new Text("Yes, quite often", "1")),"o1"), new AnswerOption(List(new Text("Yes, but rarely", "1")),"o2"), new AnswerOption(List(new Text("No, I don't remember", "1")),"o3")),List(new Text("", "1")),false,false)
  questions ::= new TextArea("q0019",List(new Text("If you did, what kind of problems?", "1")),false)
  questions ::= new PageBreak("q0020")
  questions ::= new TextArea("q0021",List(new Text("What could we undertake to increase your level of satisfaction with [COMPANY]?", "1")),false)
  questions ::= new TextArea("q0022",List(new Text("If you have any additional comments or wishes in regard with [COMPANY] products or services, please share them:", "1")),false)
  questions ::= new TextArea("q0023",List(new Text("Finally, do you know anyone else that [COMPANY] may be able to assist? Please click here [ new window opens ] to view our 'Customer Referral Rewards' program details.", "1")),false)
  questions ::= new TextArea("q0024",List(new Text("Please submit your contact information if you have any additional questions and would like us to contact you.", "1")),false)

	val template = new Template("Customer Survey Questions (Standard)", "asinghal79@gmail.com", questions.reverse)
	template.save
}