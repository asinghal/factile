/*
 * Question.scala
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

trait Element

abstract class Question(val qType: String, questionId: String, texts: Seq[Text] = null) extends Element {
  def id = questionId

  def getTexts = texts
}

case class RadioButtons(questionId: String, texts: Seq[Text], options: Seq[AnswerOption], otherBox: Seq[Text], hasOther: Boolean, 
  mandatory: Boolean) extends Question("radio", questionId, texts) 

case class DropDown(questionId: String, texts: Seq[Text], options: Seq[AnswerOption], otherBox: Seq[Text], hasOther: Boolean, 
  mandatory: Boolean) extends Question("dropdown", questionId, texts) 

case class CheckBoxes(questionId: String, texts: Seq[Text], options: Seq[AnswerOption], otherBox: Seq[Text], hasOther: Boolean, 
  mandatory: Boolean) extends Question("checkbox", questionId, texts)

case class Ranking(questionId: String, texts: Seq[Text], options: Seq[AnswerOption], otherBox: Seq[Text], hasOther: Boolean, 
  mandatory: Boolean) extends Question("ranking", questionId, texts)

case class RatingScale(questionId: String, texts: Seq[Text], dimensions: Seq[Dimension], options: Seq[AnswerOption], 
  otherBox: Seq[Text], hasOther: Boolean, mandatory: Boolean) extends Question("rating", questionId, texts)

case class TextBox(questionId: String, texts: Seq[Text], mandatory: Boolean) extends Question("textbox", questionId, texts)

case class TextArea(questionId: String, texts: Seq[Text], mandatory: Boolean) extends Question("textarea", questionId, texts)

case class PlainText(questionId: String, texts: Seq[Text]) extends Question("plaintext", questionId, texts)

case class AnswerOption(texts: Seq[Text], value: String) extends Element

case class Dimension(texts: Seq[Text], value: String) extends Element

case class Text(text: String, language: String) extends Element

case class Condition(questionId: String, value: String, op: String, display: Boolean) extends Element

case class PageBreak(questionId: String, conditions: Seq[Condition] = List[Condition]()) extends Question("page", questionId)

case class History(created_at: Date, created_by: String, updated_at: Date, updated_by: String) extends Element

object Languages {
  val all = Map( "English" -> "1", "French" -> "2", "German" -> "3", "Spanish" -> "4", 
    "Arabic" -> "5", "Chinese" -> "6", "Japanese" -> "7", "Hebrew" -> "8", "Hindi" -> "9", "Russian" -> "10" ).toList.sortBy {_._1}

  def getTexts(texts: (String, String)*) = {
    var list = List[Text]()
    texts.foreach {case (language, value) => list ::= new Text(value, language) }
    list
  }
}
