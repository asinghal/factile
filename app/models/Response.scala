/*
 * Response.scala
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
package models

import java.util.Date

case class SurveyResponse(responseId: String, surveyId: String, created_at: Date, responses: Seq[QuestionResponse], email: String = null) extends Model[SurveyResponse] { }

object SurveyResponse extends QueryOn[SurveyResponse] { 
  import java.util.UUID
  override lazy val indexedFields = List[String]("surveyId")

  def nextId = {
  	SurveyResponse.synchronized {
  	  UUID.randomUUID.toString
    }
  }
}

case class QuestionResponse(question: String, answers: Seq[String], other: String = null, ranking: Boolean = false) extends Element {}
