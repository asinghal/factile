/*
 * Survey.scala
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

case class Survey(surveyId: String, name: String, language: String, owner: List[String], hash_string: String, questions: Seq[Question], history: History, 
	intro_text: String, thank_you_text: String, logo: String, accessType: String, layout: SurveyLayout, status: String ="Draft"
	) extends Model[Survey] { }

case class SurveyLayout(logoAlignment: String = "left", includeProgress: Boolean = false, bodycolor: String = "#FFFFFF", 
	containercolor: String = "#FFFFFF", textColor: String = "#555555", logoBgColor: String = "#FFFFFF") extends Element {}

object Survey extends QueryOn[Survey] { 
  import java.util.UUID
  override lazy val indexedFields = List[String]("owner", "surveyId")

  def nextId = {
  	Survey.synchronized {
  	  UUID.randomUUID.toString
    }
  }
}