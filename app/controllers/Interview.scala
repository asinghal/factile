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
import helpers.ResponseStore._
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
   def response(id: String, respId: String = null) = collectResponse("surveyId", id, respId) { (s: Survey, questions: List[Question], page: Int, responseId: String, percentComplete: Int, replacements: Map[String, String], message: String) => implicit request =>
    val offlineLink = if (respId != null) "/downloadSurvey/" + id + "/" + respId + "/start" else "/downloadSurvey/" + id + "/start"
    Ok(views.html.respondents.preview(s, questions, false, page, responseId, percentComplete, offlineLink, replacements, message))
   }

   /**
    * Action to process user responses and store them in the database. But instead of taking a survey id from
    * the URL, it works on custom URI and maps them to a survey id.
    */
   def customUriResponse(id: String, respId: String = null) = collectResponse("uri", id, respId) { (s: Survey, questions: List[Question], page: Int, responseId: String, percentComplete: Int, replacements: Map[String, String], message: String) => implicit request =>
    val offlineLink = if (respId != null) "/" + id + "/" + respId + "/offline" else "/" + id + "/offline"
    Ok(views.html.respondents.preview(s, questions, false, page, responseId, percentComplete, offlineLink, replacements, message))
   }

   /**
    * Actual action that collects responses. Both survey Id and custom URI based actions invoke this.
    */
   private def collectResponse(attr: String, sid: String, respId: String = null)(f: => (Survey, List[Question], Int, String, Int, Map[String, String], String) => Request[AnyContent] => Result) = Action { implicit request =>
      var page = 1

      var responseId = ""
      var responses = List[QuestionResponse]()
      var survey: (Survey, Int) = (null, 0)
      var questions = List[Question]()

      var message = ""
      var id = ""

      Survey.findOne(attr -> sid).foreach { s =>
        val m = s.toMap
        val status = m.get("status").toString
        id = m.get("surveyId").toString

        if (status == "Live") {
          val restrict = restrictAccess(id, respId, m.get("accessType").toString, status)

          if (restrict) {
            m.remove("questions")
            survey = (deserialize(classOf[Survey], m), 100)
            message = "The access to this survey is restricted."
          } else {
            touch(sid)

            getRequestData().foreach { params =>
              page = params("pageNum").asInstanceOf[Seq[String]](0).toInt + 1
              responseId = getResponses(params) { (x, value, other, ranking) => responses ::= new QuestionResponse(x, value, other, ranking) }
            }

            if(page > 1) {
              val surveyData = deserialize(classOf[Survey], m)
              responseId = saveResponses(id, responseId, responses)
              page = findNextPage(surveyData, responseId, page)
            }
            survey = findQuestionsForPage(id, page, m) { q => questions ::= q }
            updateInterviewStatus(id, respId, m.get("accessType").toString, questions.isEmpty, responseId)
          }
        } else {
          message = if (status == "Closed") CLOSED_MSG else NOT_STARTED_MSG
          m.remove("questions")
          survey = (deserialize(classOf[Survey], m), 100)
        }
      }

      val s = survey._1
      if (s != null) {
        f(s, questions.reverse, page, responseId, survey._2, getResponseTexts(id, responseId, s.language), message)(request)
      } else {
        Logger.info("An attempt to access a survey with id " + sid + " was unsucessful.")
        NotFound(views.html.common.notfound("error"))
      }
   }

   /**
    * Get response data for a survey
    */
   def data(id: String) = IsAuthenticated { user => _ =>
     var responses = Map[String, Map[String, Double]]()
     var numberOfResponses = 0
     var texts = Map[String, String]()
     var wordClouds = Map[String, Map[String, Int]]()
     var responseSummary = Map[String, String]()

     // lets make sure the user is the rightful owner before we show him the results!
     Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s =>
      watch(id)
      texts = getQuestionTexts(s.toMap)._1

      if (s.get("status").toString != "Blocked") {
         SurveyResponse.find("surveyId" -> id).foreach { r =>
           numberOfResponses += 1
           val qResponse = deserialize(classOf[SurveyResponse], r.toMap)
           qResponse.responses.foreach { res =>
            responses = responses + flattenResponses(res, qResponse.responses.size, responses)
           }
         }
      }

      val w = getResponseSummaryAndWordCloud(responses, texts, s.get("language").toString)
      responseSummary = w._1
      wordClouds = w._2
    }

     Ok(views.html.surveys.data(id, user, responses, numberOfResponses, texts, responseSummary, wordClouds))
   }

   def dataAsJson(id: String) = Action { implicit request =>
      import com.codahale.jerkson.Json._

      val jsonStr = if (hasNew(id)) {
        reset(id)
        
        Survey.findOne("surveyId" -> id).map { s =>
          val m = s.toMap
          val status = m.get("status").toString
          if (status != "Blocked") {
            var texts = getQuestionTexts(s.toMap)._1
            var responses = Map[String, Map[String, Double]]()

            SurveyResponse.find("surveyId" -> id).foreach { r =>
             val qResponse = deserialize(classOf[SurveyResponse], r.toMap)
             qResponse.responses.foreach { res =>
              responses = responses + flattenResponses(res, qResponse.responses.size, responses)
             }
            }

            val w = getResponseSummaryAndWordCloud(responses, texts, s.get("language").toString)
            var responseSummary = w._1
            var wordClouds = w._2

            generate(responseSummary)
          } else {
            "[]"
          }
        }.getOrElse {
          "[]"
        }
      } else {
        "[]"
      }

      Ok(jsonStr)
   }

   /**
    * Exports the response data of a survey to a XLSX file.
    */
   def export(id: String) = IsAuthenticated { user => _ =>
     import java.io.File
     val file = new File("result_" + id + ".xlsx")
     helpers.SurveyExporter.excel(id, user, file)
     try {
     Ok.sendFile(
        content = file,
        fileName = _ => "result.xlsx")
     } finally {
       file.delete
     }
   }

   /**
    * Generates a JSON of a survey that can be stored on client side for offline use.
    */
   def downloadSurvey(sid: String, attr: String, respId: String = null) = Action {
      import com.codahale.jerkson.Json._

      val jsonStr = Survey.findOne(attr -> sid).map { s =>
        val m = s.toMap
        val status = m.get("status").toString
        val id = m.get("surveyId").toString
        if (status == "Live" && !restrictAccess(id, respId, m.get("accessType").toString, status)) {
          m.remove("_id")
          m.remove("owner")
          m.remove("hash_string")
          m.remove("history")
          generate(m)
        } else {
          "{\"questions\":[]}"
        }
      }.getOrElse {
        "{\"questions\":[]}"
      }

      Ok(jsonStr)
   }


   /**
    * Block a survey when reported for abuse
    *
    * @param survey id
    */
   def reportAbuseById(id: String) = reportAbuse("surveyId" -> id)

   /**
    * Block a survey when reported for abuse
    *
    * @param survey id
    */
   def reportAbuseByUri(uri: String) = reportAbuse("uri" -> uri)

   private def reportAbuse(params: (String, String)) = Action {
      var survey: Survey = null

      Survey.findOne(params).foreach { s => 
        survey = deserialize(classOf[Survey], s.toMap)
        Survey.update(s.get("_id"), "status" -> "Blocked")
        val body = views.html.emails.reportAbuse(hash_string)

        survey.owner.foreach { email =>
          // Now send an email
          helpers.Mailer.send(email, "factilenet@gmail.com", "Your survey has been reported for abuse", body.body.trim)
        }
      }
      Ok(views.html.respondents.reportAbuse(survey))
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
