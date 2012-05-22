/*
 * Interview.scala
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
package controllers

import play.api._
import play.api.mvc._

import dao.Mongo._
import models._
import helpers.ResponseHelper._
import helpers.SurveyHelper._

/**
 * Controller to handle user responses.
 */
object Interview extends Controller with Secured {

  val CLOSED_MSG = "The survey is no longer available for responses."
  val NOT_STARTED_MSG = "The survey is not available for responses yet."

   /**
    * Action to process user responses and store them in the database.
    */
   def response(id: String, respId: String = null) = Action { implicit request =>
      var page = 1

      var responseId = ""
      var responses = List[QuestionResponse]()
      var survey: (Survey, Int) = (null, 0)
      var questions = List[Question]()

      var message = ""

      Survey.findOne("surveyId" -> id).foreach { s => 
        val m = s.toMap
        val status = m.get("status").toString

          if (status == "Live") {
            val restrict = restrictAccess(id, respId, m.get("accessType").toString)

            if (restrict) {
              survey = findQuestionsForPage(id, -1, s.toMap) { q => questions ::= q }
              message = "The access to this survey is restricted."
            } else {
              getRequestData().foreach { params =>
                page = params("pageNum").asInstanceOf[Seq[String]](0).toInt + 1
                responseId = getResponses(params) { (x, value, other, ranking) => responses ::= new QuestionResponse(x, value, other, ranking) }
              }

              if(page > 1) responseId = saveResponses(id, responseId, responses)
              survey = findQuestionsForPage(id, page, s.toMap) { q => questions ::= q }
              updateInterviewStatus(id, respId, m.get("accessType").toString, questions.isEmpty)
            }
          } else {
            message = if (status == "Closed") CLOSED_MSG else NOT_STARTED_MSG
            survey = findQuestionsForPage(id, -1, s.toMap) { q => questions ::= q }
          }
      }

      val s = survey._1
      Ok(views.html.respondents.preview(s, questions.reverse, page, responseId, survey._2, getResponseTexts(id, responseId, s.language), message))
   }

   def data(id: String) = IsAuthenticated { user => _ => 
   	var responses = Map[String, Map[String, Double]]()
   	var numberOfResponses = 0
    var texts = Map[String, String]()
    var responseSummary = Map[String, String]()
   	// lets make sure the user is the rightful owner before we show him the results!
   	Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 

      texts = getQuestionTexts(s.toMap)._1

   	  SurveyResponse.find("surveyId" -> id).foreach { r => 
   	  	numberOfResponses += 1
   	  	val qResponse = deserialize(classOf[SurveyResponse], r.toMap)
   	  	qResponse.responses.foreach { res =>
  	      var q = responses.getOrElse(res.question, Map[String, Double]()) 
          var rank = 0
          val size = res.answers.size
  	      res.answers.foreach { ans => 
            var text = if (res.ranking) (ans.replace(res.question + "_", "")) else ans
            rank += 1
            val inc = if (res.ranking) (1d * size * (size - rank + 1) / qResponse.responses.size) else 1d
  	      	q = q.updated(text, q.getOrElse(text, 0d) + inc)
  	      }
          responses = responses + (res.question -> q)
   	  	}
   	  }

      responses.foreach { case (q, res) => 
        var summary = ""
        res.foreach { case (name, count) =>
          if (summary != "") summary += ", "
          summary += "['" + texts.getOrElse(q.split("_")(0) + "_" + name, name) + "', " + count + "]"
        }
        responseSummary = responseSummary + (q -> summary)
      }
    }

   	Ok(views.html.surveys.data(id, user, responses, numberOfResponses, texts, responseSummary))
   }

   def export(id: String) = IsAuthenticated { user => _ =>
     import java.io.File 
     val file = new File("result.xlsx") 
     helpers.SurveyExporter.excel(id, user, file)
     Ok.sendFile( 
        content = file, 
        fileName = _ => "result.xlsx") 
   }

   /**
    * Extracts the responses from request parameters.
    */
   private def getResponses(params: Map[String, Any])(build: (String, Seq[String], String, Boolean) => Unit) = {
    val reg = "(q.*)".r
	  var responseId = ""

    params foreach { case (name, value) => 
      name match {
        case reg(x) => { 
          if (!x.endsWith("_other") && !x.endsWith("_type")) { 
            val other = params.getOrElse(x + "_other", List("")).asInstanceOf[Seq[String]](0)
            val qType = params.getOrElse(x + "_type", List("")).asInstanceOf[Seq[String]](0)
            var v = value.asInstanceOf[Seq[String]]
            var ranking = false;
            if (qType == "ranking" && !v.isEmpty) {
              v = v(0).split(",").toList.map(s => s.trim)
              ranking = true;
            }
            build(x, v, other, ranking) 
          } 
        }
        case "responseId" => { 
          val list = value.asInstanceOf[Seq[String]]
          responseId = if (!list.isEmpty) list(0) else ""
        }
        case _ =>
      }
    }
    responseId
   }

}
