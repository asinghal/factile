/*
 * ResponseHelper.scala
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
package helpers

import java.util.Date
import java.util.Properties

import models._
import dao.Mongo._

/**
 * Utility methods for response processing.
 * 
 * @author Aishwarya Singhal
 */
object ResponseHelper {

  lazy val _stopWords = new Properties
  
  def stopWords = {
    import java.io._

    if (_stopWords.isEmpty) {
      var line = "";
      val sb = io.Source.fromInputStream(this.getClass.getClassLoader.getResourceAsStream("stopwords.properties"), "UTF-8").getLines.mkString("\n")
      _stopWords.load(new StringReader(sb))
    }

    _stopWords
  }

    /**
     * Saves the captured responses into the database. If a response document exists, it is updated 
     * with the additional information received. If it does not exist, a new one is created.
     *
     * @param survey id
     * @param responseId
     * @param list of captured responses
     * @return response id 
     */
	def saveResponses(id: String, responseId: String, responses: List[QuestionResponse]) = {
		var rId = responseId
		if (responseId != "") {
        // exists, load up
        SurveyResponse.findOne("surveyId"-> id, "responseId" -> responseId).foreach { r => 
          var questionResponses = Seq[QuestionResponse]()
          questionResponses = deserialize(classOf[SurveyResponse], r.toMap).responses
          questionResponses = questionResponses.filter( q => responses.find( r => r.question == q.question).isEmpty )
          questionResponses = questionResponses ++: responses

          SurveyResponse.update(r.get("_id"), "responses" -> questionResponses)
        }
      } else {
        // new one
        rId = SurveyResponse.nextId
        val qResponse = new SurveyResponse(rId, id, new Date, responses)
        qResponse.save
      }

      rId
	}

  /**
   * Extracts the response texts. Answer option codes are converted into their display texts.
   * 
   * @param survey id
   * @param responseId
   * @param language
   *
   * @return response texts
   */
  def getResponseTexts(id: String, responseId: String, language: String = "1") = {
    var responseTexts = Map[String, String]()
    Survey.findOne("surveyId"-> id).foreach { survey => 
      val texts = SurveyHelper.getQuestionTexts(survey.toMap)._1
      SurveyResponse.findOne("surveyId"-> id, "responseId" -> responseId).foreach { r => 
        deserialize(classOf[SurveyResponse], r.toMap).responses.foreach { response =>
          val answers = response.answers.map { a => texts.getOrElse(response.question + "_" + a, a)}
          responseTexts += (response.question -> answers.mkString(", "))
        }
      }
    }

    responseTexts
  }

  // the tokenizer pattern.
  val pattern = java.util.regex.Pattern.compile("\\{\\{(.+?)\\}\\}");

  /**
   * Recursively replaces tokens in a template string. The tokens are assumed to be of the 
   * format {{TOKEN}} where TOKEN is the name found in the replacements map. This basically 
   * used Java Regex to find and replace and perhaps should be sparingly used.
   *
   * Example:
   *        replacements = { "token1" -> "replacement1", "token2" -> "replacement2", 
   *                         "token3" -> "{{token1}} and {{token2}}" }
   *        text = "This is a {{token1}} having {{token2}}. Selected tokens are {{token3}}"
   *        result = "This is a replacement1 having replacement2. Selected tokens are replacement1 
   *                  and replacement2"
   * 
   * @param text: the template string
   * @param replacements: A map with replacement string for expected tokens.
   *
   * @return replaced string.
   */
  def replaceTokens(text: String, replacements: Map[String, String]): String = {
    import java.util.regex._

    val matcher = pattern.matcher(text)
    val buffer = new StringBuffer
    while (matcher.find()) {
      var replacement = replacements.getOrElse(matcher.group(1), null);
      if (replacement != null) {
        if (replacement.contains("{{") && replacement.contains("}}")) {
          replacement = replaceTokens(replacement, replacements)
        }
        matcher.appendReplacement(buffer, "");
        buffer.append(replacement);
      }
    }
    matcher.appendTail(buffer);
    buffer.toString;
  }

 /**
  * Checks if the access to this survey should be restricted for this user.
  * 
  * @param id
  * @param respId
  * @param accessType
  *
  * @return true if the access should be restricted.
  */
 def restrictAccess(id: String, respId: String, accessType: String) = {
  var restrict = false
  if (accessType != "open" && (respId == null || respId.trim == "")) {
    // attempt to access a restricted survey
    restrict = true
  } else if (accessType != "open") {
    val participant = Participant.findOne("surveyId" -> id, "respId" -> respId).map { p => p }.getOrElse(null)
    if (participant == null || participant.get("status").toString == "Completed") {
      restrict = true
    }
  }

  restrict
 }

  /**
   * Updates the interview status if this is a restricted access survey.
   * 
   * @param id
   * @param respId
   * @param accessType
   * @param lastPage
   */
  def updateInterviewStatus(id: String, respId: String, accessType: String, lastPage: Boolean) = {
    if (lastPage && accessType != "open") {
      Participant.findOne("surveyId" -> id, "respId" -> respId).map { p => Participant.update(p.get("_id"), "status" -> "Completed" ) }
    }
  }

  // define user agents for mobile browsers
  val browser = ".*(iPhone|iPad|BlackBerry|Android|SymbianOS|Opera Mini).*".r

  /**
   * Checks if the current requesting user agent is a mobile browser.
   */
  def isMobilePhone(implicit request: play.api.mvc.RequestHeader) = {
    val agent = request.headers.get("user-agent").getOrElse("")
    !(browser findFirstIn agent isEmpty)
  }
}