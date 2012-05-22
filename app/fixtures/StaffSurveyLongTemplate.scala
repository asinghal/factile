/*
 * StaffSurveyLongTemplate.scala
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

// refer to http://www.surveyquestions.com.au/Questionnaires/Staff-Survey-Questionnaires.htm
object StaffSurveyLongTemplate {
	var questions = List[Question]()
	questions ::= new RatingScale("q0001",List(new Text("Please rate the following areas of our organisation using the scale provided: ", "1")),List(new Dimension(List(new Text("[COMPANY] offers better benefits than other companies", "1")),"d1"), 
		new Dimension(List(new Text("[COMPANY] offers excellent benefits", "1")),"d2"), 
		new Dimension(List(new Text("The benefits statement I received was clear and easy to understand", "1")),"d3"), 
		new Dimension(List(new Text("The premiums for benefits are reasonable", "1")),"d4"), 
		new Dimension(List(new Text("The benefits offered provide security for me and my family", "1")),"d5"), 
		new Dimension(List(new Text("I can speak freely to my supervisor on a variety of topics", "1")),"d6"), 
		new Dimension(List(new Text("Co-Workers are willing to listen to my ideas", "1")),"d7"), 
		new Dimension(List(new Text("My Supervisor has excellent interpersonal skills", "1")),"d8"), 
		new Dimension(List(new Text("There is good communication between me and my supervisor", "1")),"d9"), 
		new Dimension(List(new Text("There are no barriers to open and efficient communication", "1")),"d10"), 
		new Dimension(List(new Text("[COMPANY] is a good community neighbour", "1")),"d11"), 
		new Dimension(List(new Text("[COMPANY] new employee orientation includes information about our culture", "1")),"d12"), 
		new Dimension(List(new Text("[COMPANY] fosters an environment where diverse individuals can work together effectively", "1")),"d13"), 
		new Dimension(List(new Text("Employees are valued as an asset to [COMPANY]", "1")),"d14"), 
		new Dimension(List(new Text("Employees are generally friendly and willing to help you if needed", "1")),"d15"), 
		new Dimension(List(new Text("[COMPANY] focuses on providing excellent customer service", "1")),"d16"), 
		new Dimension(List(new Text("I receive good feedback from customers", "1")),"d17"), 
		new Dimension(List(new Text("Managers are focused on improving customer service", "1")),"d18"), 
		new Dimension(List(new Text("The training I receive reinforces customer focus", "1")),"d19"), 
		new Dimension(List(new Text("Service is responsive and meets the needs of customers", "1")),"d20"), 
		new Dimension(List(new Text("The grievance process used at [COMPANY] is fair and equitable", "1")),"d21"), 
		new Dimension(List(new Text("I can go to My Supervisor if I have a problem", "1")),"d22"), 
		new Dimension(List(new Text("My Supervisor effectively resolves employee problems and labour issues", "1")),"d23"), 
		new Dimension(List(new Text("Managers follow the grievance procedures", "1")),"d24"), 
		new Dimension(List(new Text("Labour and Management meet regularly to discuss important issues", "1")),"d25"), 
		new Dimension(List(new Text("I enjoy working at [COMPANY]", "1")),"d26"), new Dimension(List(new Text("I am proud to tell others I work for [COMPANY]", "1")),"d27"), 
		new Dimension(List(new Text("I receive personal satisfaction from doing a good job", "1")),"d28"), new Dimension(List(new Text("I like my work", "1")),"d29"), 
		new Dimension(List(new Text("I feel good about working in My Department", "1")),"d30"), 
		new Dimension(List(new Text("The managers keep us informed about issues at [COMPANY]", "1")),"d31"), 
		new Dimension(List(new Text("I feel manager's value honest and candid feedback", "1")),"d32"), 
		new Dimension(List(new Text("Managers are focused on improving customer service", "1")),"d33"), 
		new Dimension(List(new Text("Managers create a sense of teamwork and company spirit", "1")),"d34"), 
		new Dimension(List(new Text("Managers help create a dialog with employees", "1")),"d35"), 
		new Dimension(List(new Text("The pay offered by [COMPANY] is very competitive", "1")),"d36"), 
		new Dimension(List(new Text("[COMPANY] maintains a competitive pay and benefits package", "1")),"d37"), 
		new Dimension(List(new Text("[COMPANY] pay policy helps attract and retain high performing employees", "1")),"d38"), 
		new Dimension(List(new Text("I am satisfied with the level of pay I receive", "1")),"d39"), new Dimension(List(new Text("I am paid fairly 26", "1")),"d40"), 
		new Dimension(List(new Text("[COMPANY] encourages employees to work to the best of their abilities", "1")),"d41"), 
		new Dimension(List(new Text("I am held accountable for achieving specific results", "1")),"d42"), 
		new Dimension(List(new Text("I know how [COMPANY] measures its performance", "1")),"d43"), 
		new Dimension(List(new Text("My Department has specific performance measures", "1")),"d44"), 
		new Dimension(List(new Text("Performance measures are evaluated on a quarterly basis", "1")),"d45"), 
		new Dimension(List(new Text("I receive regular performance reviews", "1")),"d46"), 
		new Dimension(List(new Text("I trust the feedback I receive from my Supervisor", "1")),"d47"), 
		new Dimension(List(new Text("I understand how I am evaluated", "1")),"d48"), new Dimension(List(new Text("My Supervisor gives me constructive feedback", "1")),"d49"), 
		new Dimension(List(new Text("The Performance Management Process is fair", "1")),"d50"), 
		new Dimension(List(new Text("My Department focuses on solving problems instead of finding fault", "1")),"d51"), 
		new Dimension(List(new Text("My Department anticipates and resolves problems", "1")),"d52"), 
		new Dimension(List(new Text("We work to anticipate problems and develop appropriate solutions", "1")),"d53"), 
		new Dimension(List(new Text("Problems are solved at the root cause, not just at the symptom level", "1")),"d54"), 
		new Dimension(List(new Text("We work together to solve problems", "1")),"d55"), 
		new Dimension(List(new Text("I can manage information and technical resources to achieve objectives", "1")),"d56"), 
		new Dimension(List(new Text("I understand the process of allocating fiscal resources", "1")),"d57"), 
		new Dimension(List(new Text("My Supervisor uses information and technical resources to achieve objectives", "1")),"d58"), 
		new Dimension(List(new Text("My Department has adequate funding and resources to accomplish our goals", "1")),"d59"), 
		new Dimension(List(new Text("The Leadership is effective in allocating financial resources", "1")),"d60"), 
		new Dimension(List(new Text("[COMPANY] values my work", "1")),"d61"), new Dimension(List(new Text("I receive recognition when I do a good job", "1")),"d62"), 
		new Dimension(List(new Text("Employees are recognised for good work performance", "1")),"d63"), 
		new Dimension(List(new Text("My Supervisor praises me for a job well done", "1")),"d64"), 
		new Dimension(List(new Text("Performance incentives are clearly linked to standards and goals", "1")),"d65"), 
		new Dimension(List(new Text("My Supervisor tries to learn new things", "1")),"d66"), new Dimension(List(new Text("My Supervisor gives me constructive feedback", "1")),"d67"), 
		new Dimension(List(new Text("My Supervisor has a positive attitude when new changes are implemented", "1")),"d68"), 
		new Dimension(List(new Text("My Supervisor is effective in maximizing the potential of employees", "1")),"d69"), 
		new Dimension(List(new Text("My Supervisor is open to suggestions", "1")),"d70"), new Dimension(List(new Text("We work as a team at [COMPANY]", "1")),"d71"), 
		new Dimension(List(new Text("I feel I am part of the team", "1")),"d72"), new Dimension(List(new Text("Leaders promote teamwork", "1")),"d73"), 
		new Dimension(List(new Text("My Department works well together", "1")),"d74"), new Dimension(List(new Text("Information is freely shared among all team members", "1")),"d75"), 
		new Dimension(List(new Text("[COMPANY] invests in employees through training and development", "1")),"d76"), 
		new Dimension(List(new Text("[COMPANY] should offer training on how to improve effectiveness of meetings", "1")),"d77"), 
		new Dimension(List(new Text("The training I receive reinforces customer focus", "1")),"d78"), 
		new Dimension(List(new Text("I have received good training to do my job", "1")),"d79"), 
		new Dimension(List(new Text("The New Employee orientation program is very informative", "1")),"d80"), 
		new Dimension(List(new Text("[COMPANY] helps employees find an ideal balance between work and life responsibilities", "1")),"d81"), 
		new Dimension(List(new Text("[COMPANY] offers adequate telecommuting, scheduling flexibility, and childcare opportunities", "1")),"d82"), 
		new Dimension(List(new Text("[COMPANY] offers excellent parking facilities", "1")),"d83"), 
		new Dimension(List(new Text("[COMPANY] is a family-friendly place to work", "1")),"d84"), new Dimension(List(new Text("I have enough time to do my work", "1")),"d85")),
	List(new AnswerOption(List(new Text("Strongly Agree", "1")),"o1"), new AnswerOption(List(new Text("Agree", "1")),"o2"), 
		new AnswerOption(List(new Text("Neutral", "1")),"o3"), new AnswerOption(List(new Text("Disagree", "1")),"o4"), 
		new AnswerOption(List(new Text("Strongly Disagree", "1")),"o5")),List(new Text("", "1")),false,false)
	questions ::= new PageBreak("q0002")
	questions ::= new TextArea("q0003",List(new Text("Do you have any final comments or suggestions to help us improve? ", "1")),false)

	val template = new Template("Staff Survey Questionnaires", "asinghal79@gmail.com", questions.reverse)
	template.save
}