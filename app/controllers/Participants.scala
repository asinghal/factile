/*
 * Participants.scala
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

import models._
import models.Languages._
import java.security.SecureRandom
import java.math.BigInteger
import java.util.Date

/**
 * A Controller  for managing survey participant related operations.
 *
 * @author Aishwarya Singhal
 */
object Participants extends Controller with Secured {
  import dao.Mongo._
  import helpers.SurveyHelper._
  import helpers.FilesHelper._

   /**
    * Invite participants to this survey
    *
    * @param survey id
    */
   def invite(id: String) = IsAuthenticated { user => implicit request =>
      var accessType = "open"
      var surveyURI: String = null
       Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
         accessType = s.get("accessType").toString
         surveyURI = if (s.get("uri") != null) s.get("uri").toString.trim else null
       }
      val surveyLink = getSurveyLink(id, surveyURI, null)
      Ok(views.html.respondents.invite(id, user, accessType, surveyLink))
   }

   /**
    * Send email to invited participants for this survey
    *
    * @param survey id
    */
   def email(id: String) = IsAuthenticated { user => implicit request =>
     val (respondentList, fromAddress, mailtype, subject, mailBody, text_body) = Form(tuple(
       "respondentListBox" -> text,
       "from_address" -> text,
       "mailtype" -> text,
       "subject" -> text,
       "mailBody" -> text,
       "text_body" -> text
       )).bindFromRequest.get

     val htmlFormat = if (mailtype == "html") true else false

     var open = true
     var surveyURI: String = null
     Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
       open = s.get("accessType").toString == "open"
       surveyURI = if (s.get("uri") != null) s.get("uri").toString.trim else null
     }

     var surveyLink = ""
     respondentList.split("\n").foreach { toAddress =>
       if (open) {
         surveyLink = getSurveyLink(id, surveyURI, null)
       } else {
         val participant = new Participant(id, Participant.nextId, toAddress)
         participant.save
         surveyLink = getSurveyLink(id, surveyURI, participant)
       }
       val body = if (htmlFormat) mailBody.replace("{{survey_link}}", surveyLink) else text_body.replace("{{survey_link}}", surveyLink)
       helpers.Mailer.send(toAddress, fromAddress, subject, body, htmlFormat)
     }
     Redirect("/dashboard")
   }

   private def getSurveyLink(id: String, surveyURI: String, participant: Participant = null)(implicit request: Request[AnyContent]) = {
     var surveyLink = ""
     if (participant == null) {
       surveyLink = if (surveyURI != null && surveyURI.trim != "") "http://" + request.host + "/" + surveyURI.trim else "http://" + request.host + "/surveys/" + id + "/start"
     } else {
       surveyLink = if (surveyURI != null && surveyURI.trim != "") "http://" + request.host + "/" + surveyURI.trim + "/" + participant.respId else "http://" + request.host + "/surveys/" + id + "/" + participant.respId + "/start"
     }
     surveyLink
   }
}