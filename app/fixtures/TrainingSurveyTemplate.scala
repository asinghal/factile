/*
 * TrainingSurveyTemplate.scala
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
object TrainingSurveyTemplate {
	var questions = List[Question]()
  questions ::= new PlainText("q0002",List(new Text("<p><b>A. Demographic Information&nbsp;</b></p>" +
"<p><span>Please confirm:&nbsp;</span></p>", "1")))
  questions ::= new RadioButtons("q0003",List(new Text("Your Gender ", "1")),List(new AnswerOption(List(new Text("Male", "1")),"o1"), new AnswerOption(List(new Text("Female", "1")),"o2")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0004",List(new Text("Do you have a disability ", "1")),List(new AnswerOption(List(new Text("Yes", "1")),"o1"), new AnswerOption(List(new Text("No", "1")),"o2")),List(new Text("", "1")),false,false)
  questions ::= new RadioButtons("q0005",List(new Text("Your Age ", "1")),List(new AnswerOption(List(new Text("Under 18", "1")),"o1"), new AnswerOption(List(new Text("18-24", "1")),"o2"), new AnswerOption(List(new Text("25-34", "1")),"o3"), new AnswerOption(List(new Text("35-44", "1")),"o4"), new AnswerOption(List(new Text("45-54", "1")),"o5"), new AnswerOption(List(new Text("55-64", "1")),"o6"), new AnswerOption(List(new Text("65 or Above", "1")),"o7"), new AnswerOption(List(new Text("Prefer Not to Answer", "1")),"o8")),List(new Text("", "1")),false,false)
  questions ::= new PageBreak("q0006")
  questions ::= new PlainText("q0008",List(new Text("<p><b>B. Training&nbsp;</b></p>"+
"<p><span>Please rank the following, using a scale of 1 to 5 where 1=(Not Important) to 5=(Important)</span></p>", "1")))
  questions ::= new Ranking("q0009",List(new Text("In House Training:  ", "1")),List(new AnswerOption(List(new Text("Professional Journals", "1")),"o1"), new AnswerOption(List(new Text("Web-Based Education", "1")),"o2"), new AnswerOption(List(new Text("Books", "1")),"o3"), new AnswerOption(List(new Text("Postsecondary Courses", "1")),"o4"), new AnswerOption(List(new Text("Training Provided by City or State Agencies", "1")),"o5"), new AnswerOption(List(new Text("Other", "1")),"o6")),List(new Text("If other, please specify:", "1")),true,false)
  questions ::= new Ranking("q0010",List(new Text("Customer Relations Training Needs:", "1")),List(new AnswerOption(List(new Text("Methods to improve communication", "1")),"o1"), new AnswerOption(List(new Text("Problem-solving techniques/ Conflict Resolution", "1")),"o2"), new AnswerOption(List(new Text("Negotiation Skills", "1")),"o3"), new AnswerOption(List(new Text("Collaboration", "1")),"o4"), new AnswerOption(List(new Text("Informed Choice", "1")),"o5"), new AnswerOption(List(new Text("Other", "1")),"o6")),List(new Text("If other, please specify:", "1")),true,false)
  questions ::= new PageBreak("q0011")
  questions ::= new Ranking("q0012",List(new Text("Organisational Development Training Needs:  ", "1")),List(new AnswerOption(List(new Text("Supervisory Skills", "1")),"o1"), new AnswerOption(List(new Text("Adapting to Change", "1")),"o2"), new AnswerOption(List(new Text("Leadership Skills", "1")),"o3"), new AnswerOption(List(new Text("Team Building", "1")),"o4")),List(new Text("If other, please specify:", "1")),true,false)
  questions ::= new Ranking("q0013",List(new Text("Coaching/ Mentoring:", "1")),List(new AnswerOption(List(new Text("Recruitment & Retention", "1")),"o1"), new AnswerOption(List(new Text("Performance Evaluation", "1")),"o2"), new AnswerOption(List(new Text("Other", "1")),"o3")),List(new Text("If other, please specify:", "1")),true,false)
  questions ::= new Ranking("q0014",List(new Text("Technology Training Needs:", "1")),List(new AnswerOption(List(new Text("Accessing Web Resources:", "1")),"o1"), new AnswerOption(List(new Text("Assistive Technology:", "1")),"o2"), new AnswerOption(List(new Text("Basic Computer Operation/ Orientation:", "1")),"o3"), new AnswerOption(List(new Text("Word Processing:", "1")),"o4"), new AnswerOption(List(new Text("Advice/ Support:", "1")),"o5"), new AnswerOption(List(new Text("Other:", "1")),"o6")),List(new Text("If other, please specify:", "1")),true,false)
  questions ::= new PageBreak("q0015")
  questions ::= new Ranking("q0016",List(new Text("Personnel Development Training Needs:  ", "1")),List(new AnswerOption(List(new Text("Job Development", "1")),"o1"), new AnswerOption(List(new Text("Ethics", "1")),"o2"), new AnswerOption(List(new Text("Benefits Counseling", "1")),"o3"), new AnswerOption(List(new Text("Positive Behavioral Support", "1")),"o4"), new AnswerOption(List(new Text("Knowledge of Disability Groups", "1")),"o5"), new AnswerOption(List(new Text("Dealing with Difficulty Behavior", "1")),"o6"), new AnswerOption(List(new Text("Multicultural Sensitivity Training", "1")),"o7"), new AnswerOption(List(new Text("Other", "1")),"o8")),List(new Text("If other, please specify:", "1")),true,false)
  questions ::= new Ranking("q0017",List(new Text("Preferred Methods of Training:  ", "1")),List(new AnswerOption(List(new Text("Workshops/ Seminars", "1")),"o1"), new AnswerOption(List(new Text("Self-guided study (reading, Web, video)", "1")),"o2"), new AnswerOption(List(new Text("One-on-one", "1")),"o3"), new AnswerOption(List(new Text("Classroom Instruction", "1")),"o4"), new AnswerOption(List(new Text("Teleconferences", "1")),"o5"), new AnswerOption(List(new Text("Other", "1")),"o6")),List(new Text("If other, please specify:", "1")),true,false)
  questions ::= new Ranking("q0018",List(new Text("Factors That Influence Your Participation in Training: ", "1")),List(new AnswerOption(List(new Text("Travel Distance to Training", "1")),"o1"), new AnswerOption(List(new Text("Lack of Monetary Support", "1")),"o2"), new AnswerOption(List(new Text("Lack of Agency Encouragement", "1")),"o3"), new AnswerOption(List(new Text("Not Interested in Topics", "1")),"o4"), new AnswerOption(List(new Text("Lack of Training Notification", "1")),"o5"), new AnswerOption(List(new Text("Time Not Convenient", "1")),"o6"), new AnswerOption(List(new Text("Other", "1")),"o7")),List(new Text("If other, please specify:", "1")),true,false)
  questions ::= new PageBreak("q0019")
  questions ::= new PlainText("q0021",List(new Text("<p><b>C. Overall Comments</b></p>", "1")))
  questions ::= new TextArea("q0022",List(new Text("Please tell us what you believe to be the most important training needs in your state for community rehabilitation providers: ", "1")),false)
  questions ::= new TextArea("q0023",List(new Text("Please list a few of the best trainings you've received and why you benefited from them:  ", "1")),false)
  questions ::= new TextArea("q0024",List(new Text("Other comments, ideas, or suggestions appreciated: ", "1")),false)

	val template = new Template("Training Survey Questions", "asinghal79@gmail.com", questions.reverse)
	template.save
}