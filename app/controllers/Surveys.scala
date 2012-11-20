/*
 * Surveys.scala
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
import play.api.data._
import play.api.data.Forms._
import play.api.data.validation.Constraints._

import models._
import models.Languages._
import java.security.SecureRandom
import java.math.BigInteger
import java.util.Date

/**
 * A Controller  for managing survey related operations.
 *
 * @author Aishwarya Singhal
 */
object Surveys extends Controller with Secured {
  import dao.Mongo._
  import helpers.SurveyHelper._
  import helpers.FilesHelper._

  /**
   * The survey form data as expected from the front end.
   */
  val surveyForm = Form(
    tuple(
      "surveyname" -> nonEmptyText,
      "language" -> text,
      "introText" -> text,
      "thankyouText" -> text,
      "accessType" -> text,
      "bodycolor" -> text,
      "containercolor" -> text,
      "textColor" -> text,
      "logoBgColor" -> text,
      "includeProgress" -> text,
      "surveyURI" -> text,
      "logoAlignment" -> text
    ) verifying("Please select a different survey link as this one already exists.", fields => fields match { 
      case (_, _, _, _, _, _, _, _, _, _, uri, _) => uri == null || uri.trim == "" || Survey.find("uri" -> uri).toList.isEmpty
    })
  )
   
  /**
   * Shows all surveys for the current user.
   */
   def dashboard = IsAuthenticated { user => _ =>
     var surveys = Survey.find("owner" -> user).map { x => 
       val m = x.toMap
       // remove the keys we won't use and save on deserialization effort
       m.remove("questions")
       m.remove("layout")
       deserialize(classOf[Survey], m) 
     }.toList.sortWith(_.history.updated_at after _.history.updated_at)
      Ok(views.html.users.dashboard(surveys, user))
   }

  /**
   * Opens up a page that allows survey creation.
   */
   def newsurvey = IsAuthenticated { user => _ =>
      Ok(views.html.surveys.newsurvey(user))
   }

  /**
   * Load a survey so it can be editted.
   *
   * @param survey id
   */
   def editinfo(id: String) = IsAuthenticated { user => _ =>
      val survey = Survey.findOne("surveyId" -> id, "owner" -> user).map { s => 
        val m = s.toMap
       // remove the keys we won't use and save on deserialization effort
        m.remove("questions")
        deserialize(classOf[Survey], m)
      }
      Ok(views.html.surveys.edit(user, survey.getOrElse(null)))
   }

  /**
   * Creates a new survey
   *
   * @param survey id
   */
   def create = IsAuthenticated(parse.multipartFormData) { user => implicit request => 
     surveyForm.bindFromRequest.fold(
       formWithErrors => BadRequest(views.html.surveys.newsurvey(user, formWithErrors.errors)),
       form => {
          val (surveyname, language, introText, thankyouText, accessType, bodycolor, containercolor, textColor, 
             logoBgColor, includeProgress, surveyURI, logoAlignment) = form

          val id = Survey.nextId
          val random = new SecureRandom
          val hash_string = new BigInteger(80, random).toString(32)
          var logoFile: String = null

          request.body.file("logo").map { logo => logoFile = uploadFile(hash_string, logo) }

          val history = new History(new Date, user, new Date, user)
          val layout = new SurveyLayout(logoAlignment, includeProgress.toBoolean, bodycolor, containercolor, textColor, logoBgColor)
          new Survey(id, surveyname, language, List(user), hash_string, null, history, introText, thankyouText, logoFile, accessType, layout, surveyURI).save

          Redirect(routes.Surveys.edit(id))
        }
      )
   }

  /**
   * Updates a survey information.
   *
   * @param survey id
   */
   def updateinfo(id: String) = IsAuthenticated(parse.multipartFormData) { user => implicit request => 
     surveyForm.bindFromRequest.fold(
       formWithErrors => {
        val survey = Survey.findOne("surveyId" -> id, "owner" -> user).map { s => 
          val m = s.toMap
          // remove the keys we won't use and save on deserialization effort
          m.remove("questions")
          deserialize(classOf[Survey], m)
        }
        BadRequest(views.html.surveys.edit(user, survey.getOrElse(null), formWithErrors.errors))
       },
       form => {
          val (surveyname, language, introText, thankyouText, accessType, bodycolor, containercolor, textColor, 
             logoBgColor, includeProgress, surveyURI, logoAlignment) = form

          Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
            val layout = new SurveyLayout(logoAlignment, includeProgress.toBoolean, bodycolor, containercolor, textColor, logoBgColor)
            // Update history
            var history = deserialize(classOf[History], s.get("history").asInstanceOf[com.mongodb.BasicDBObject].toMap)
            history = new History(history.created_at, history.created_by, new Date, user)
            Survey.update(s.get("_id"), "name" -> surveyname, "language" -> language, "intro_text" -> introText, "thank_you_text" -> thankyouText, 
              "layout" -> layout, "accessType" -> accessType, "history" -> history, "uri" -> surveyURI)

            var logoFile: String = null
            request.body.file("logo").map { logo => 
              // first delete existing logo
              val existing_hash = deleteExistingLogo(s.toMap)
              logoFile = uploadFile(s.get("hash_string").toString, logo, existing_hash) 
              Survey.update(s.get("_id"), "logo" -> logoFile)
            }
         }

         Redirect(routes.Surveys.edit(id))
        }
      )
   }

  /**
   * Load a questionnaire so it can be editted.
   *
   * @param survey id
   */
   def edit(id: String) = IsAuthenticated { user => _ => 
      var survey: Survey = null
      var q = 0
      var pageIds = List[String]()
      Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
        survey = deserialize(classOf[Survey], s.toMap)
        if (survey.questions != null && !survey.questions.isEmpty) { 
        import com.mongodb._
          s.toMap.get("questions").asInstanceOf[BasicDBList].toArray.foreach { case m: BasicDBObject => 
              val data = m.toMap
              val questionId = data.get("questionId").asInstanceOf[String]
              val i = questionId.substring(1).toInt 
              if (i > q) q = i
              data.get("qType").asInstanceOf[String] match {
                case "page"=> pageIds ::= questionId
                case _ =>
              }
            }
        }
      }
      Ok(views.html.surveys.questions(id, user, q, survey, pageIds.reverse))
   }

  /**
   * Updates the questionnaire and/ or the status of the survey.
   *
   * @param survey id
   */
   def update(id: String) = IsAuthenticated { user => implicit request => 
     var questions: Seq[Question] = null

    var status = ""

    var accessType = "open"

     Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
       val language = s.get("language").toString
       accessType = s.get("accessType").toString

       getRequestData().foreach { params =>
         val conditions = deserialize(classOf[Survey], s.toMap).questions.filter(q => q.qType == "page").map { case (p: PageBreak) => (p.questionId -> p.conditions)}.toMap
         questions = getQuestions(conditions)(params, language)
         val statuses = params("survey_status").asInstanceOf[Seq[String]]
         status = if (statuses.isEmpty) "" else statuses(0)
       }

      // Update history
      var history = deserialize(classOf[History], s.get("history").asInstanceOf[com.mongodb.BasicDBObject].toMap)
      history = new History(history.created_at, history.created_by, new Date, user)

       Survey.update(s.get("_id"), "questions" -> questions, "history" -> history)
      if (status != "") {
        Survey.update(s.get("_id"), "status" -> status)
      }
     }

     if (status == "Live") {
      Redirect(routes.Participants.invite(id))
     } else {
      Redirect(routes.Surveys.dashboard)
     }
   }

  /**
   * Updates the survey status to 'Closed' so that it can no longer be accessed by survey participants.
   * This allows for a freeze on response capturing.
   *
   * @param survey id
   */
   def close(id: String) = IsAuthenticated { user => implicit request => 
     Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
      // Update history
      var history = deserialize(classOf[History], s.get("history").asInstanceOf[com.mongodb.BasicDBObject].toMap)
      history = new History(history.created_at, history.created_by, new Date, user)

      Survey.update(s.get("_id"), "status" -> "Closed", "history" -> history)
     }

      Redirect(routes.Surveys.dashboard)
   }

  /**
   * Delete a survey and all responses associated. Also delete any uploaded files for this survey.
   *
   * @param survey id
   */
   def delete(id: String) = IsAuthenticated { user => implicit request => 
    deleteSurvey(id, user, false)

    Redirect(routes.Surveys.dashboard)
   }

  /**
   * Delete all responses associated with a survey
   *
   * @param survey id
   */
   def flush(id: String) = IsAuthenticated { user => implicit request => 
    deleteSurvey(id, user, true)

    Redirect(routes.Surveys.dashboard)
   }

   def template(id: String, tid: String) = IsAuthenticated { user => implicit request => 
     Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
       Template.findOne("_id" -> new org.bson.types.ObjectId(tid)).foreach { t => 
         val template = deserialize(classOf[Template], t.toMap)
         Survey.update(s.get("_id"), "questions" -> template.questions)
       }
     }
    Redirect(routes.Surveys.edit(id))
   }

  /**
   * Generates a preview of the survey. The survey questions are rendered exactly as they would on a 
   * live survey but the responses are not processed.
   *
   * @param survey id
   */
   def preview(id: String) = IsAuthenticated { user => implicit request => 
      var page = 1

      getRequestData().foreach { params =>
        page = params("pageNum").asInstanceOf[Seq[String]](0).toInt + 1
      }

      var questions = List[Question]()
      var survey: (Survey, Int) = (null, 0)

      Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
        survey = findQuestionsForPage(id, page, s.toMap) { q => questions ::= q }
      }

      val s = survey._1
      Ok(views.html.respondents.preview(s, questions.reverse, true, page, null, survey._2))
   }

  /**
   * Allows for editting of the flow of a survey.
   *
   * @param survey id
   */
   def flow(id: String) = IsAuthenticated { user => implicit request => 

     var pages = List[Question]()

      Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
        val survey = deserialize(classOf[Survey], s.toMap)
        val breaks = survey.questions.filter(q => q.qType == "page")
        pages :::= breaks.toList
      }

      Ok(views.html.surveys.flow(user, id, pages))
   }

  /**
   * Allows for editting of the flow of a survey.
   *
   * @param survey id
   */
   def updateflow(id: String) = IsAuthenticated { user => implicit request => 

     var pages = List[Question]()

      Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
        val survey = deserialize(classOf[Survey], s.toMap)
        var questions = List[Question]()
        getRequestData().foreach { params => 
          var prevConditions = List[Condition]()
          survey.questions.foreach { question =>
            question match {
              case page: PageBreak =>
                      var conditions = List[Condition]() 
                      val q = params(page.id + "_q").asInstanceOf[Seq[String]]
                      val included = params(page.id + "_included").asInstanceOf[Seq[String]]
                      if (!included.isEmpty && included(0) != "" && included(0).toBoolean) {
                        conditions = prevConditions
                      }
                      if (!q.isEmpty && q(0) != "") {
                        val display = params(page.id + "_display").asInstanceOf[Seq[String]]
                        val op = params(page.id + "_op").asInstanceOf[Seq[String]]
                        val ans = params(page.id + "_ans").asInstanceOf[Seq[String]]
                        val texts = params(page.id + "_text").asInstanceOf[Seq[String]]
                        var t = -1
                        q.zipWithIndex.foreach {
                          case (qid, i) =>
                          val value = if (ans(i) != "") ans(i) else { t += 1; texts(t) }
                          conditions ::= (new Condition(qid, value, op(i), display(i) == "show"))
                        }
                      }
                      prevConditions = conditions
                      questions ::= new PageBreak(page.questionId, conditions)
              case _ => questions ::= question
            }
          }
        }

        // Update history
        var history = deserialize(classOf[History], s.get("history").asInstanceOf[com.mongodb.BasicDBObject].toMap)
        history = new History(history.created_at, history.created_by, new Date, user)

        Survey.update(s.get("_id"), "questions" -> questions.reverse, "history" -> history)
      }

      Redirect(routes.Surveys.flow(id))
   }

   def questions(id: String, qId: String) = IsAuthenticated { user => implicit request => 

     def toJson(id: String, text: String, options: String = "") = {
       "{\"id\": \"" + id +"\", \"text\": \"" + text.replace("\"", "'") + "\"" + options + "}"
     }

    var allQuestions = List[Question]()
    var json = "{\"questions\": __QUESTIONS__ }"
    var qt = "[ "
     Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
        val survey = deserialize(classOf[Survey], s.toMap)
        var found = false
        survey.questions.map(q => q match {
          case p: PageBreak => if (p.questionId == qId) { found = true }
          case p: PlainText => 
          case _ => if (!found) { 
                      allQuestions ::= q
                      if (qt != "[ ") {
                        qt += ", "
                      }
                      var options = ", \"options\": ["
                      q match {
                        case x: RadioButtons => options += x.options.map { a => toJson(a.value, a.texts(0).text) }.mkString(", ")
                        case x: DropDown => options += x.options.map { a => toJson(a.value, a.texts(0).text) }.mkString(", ")
                        case x: CheckBoxes => options += x.options.map { a => toJson(a.value, a.texts(0).text) }.mkString(", ")
                        case x: Ranking => options += x.options.map { a => toJson(a.value, a.texts(0).text) }.mkString(", ")
                        case x: RatingScale => {
                                                  options += x.options.map { a => toJson(a.value, a.texts(0).text) }.mkString(", ")
                                                  options += "]"
                                                  qt += x.dimensions.map { d => toJson(q.id + "_" + d.value, d.texts(0).text, options) }.mkString(", ")
                                                }
                        case x: TextBox =>
                        case x: TextArea =>
                      }
                      if (!q.isInstanceOf[RatingScale]) {
                        options += "]"
                        qt += ("{ \"id\": \"" + q.id + "\", \"text\": \"" + q.getTexts(0).text + "\"" + options + "}")
                      }
                    }
          })
      }
      qt += " ]"
     Ok(json.replace("__QUESTIONS__", qt))
   }

  /**
   * Allows for editting of the owners of a survey.
   *
   * @param survey id
   */
   def collaborate(id: String) = IsAuthenticated { user => implicit request => 
     var pages = List[Question]()
     var owners = Seq[String]()

      Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
        getRequestData().foreach { params => 
          owners = params("owners").asInstanceOf[Seq[String]]
          Survey.update(s.get("_id"), "owner" -> owners)
        }

        if (owners.isEmpty) {
          val survey = deserialize(classOf[Survey], s.toMap)
          owners = survey.owner
        }
      }
      Ok(views.html.surveys.collaborate(id, owners, user))
   }

   def uriexists(uri: String) = IsAuthenticated { user => implicit request => 
     val json = "{ \"exists\": " + !Survey.find("uri" -> uri).toList.isEmpty + " }"
     Ok(json)
   }

   def export(id: String) = IsAuthenticated { user => implicit request => 
    import util.pdf.PDF
    import java.io._

    val file = new File("survey_" + id + ".pdf")
    Survey.findOne("surveyId" -> id, "owner" -> user).map { s => 
      val fos = new FileOutputStream(file)
      val survey = deserialize(classOf[Survey], s.toMap)
      fos.write(PDF.toBytes(views.html.surveys.export(survey)))
      fos.close
    }.getOrElse {
      val fos = new FileOutputStream(file)
      fos.write("This survey does not exist, or you may not have access to it.".getBytes)
      fos.close
    }
    try {
     Ok.sendFile(
        content = file,
        fileName = _ => "survey.pdf")
     } finally {
       file.delete
     }
   }

  /**
   * Delete a survey and/ or all responses associated. Also delete any uploaded files for this survey.
   */
   private def deleteSurvey(id: String, user: String, dataOnly: Boolean = false) = {
    Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
      SurveyResponse.deleteAll("surveyId" -> id)
      Participant.deleteAll("surveyId" -> id)
      if (!dataOnly) {
        val hash_string = s.get("hash_string").toString
        val path = UPLOAD_DIR + hash_string + "/"
        deleteDirectory(new java.io.File(path))
        Survey.delete(s.get("_id"))
      }
    }
   }
}