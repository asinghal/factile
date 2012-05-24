/*
 * SurveyHelper.scala
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

import java.util.LinkedHashMap

import scala.collection.mutable.ListBuffer

import models._
import models.Languages._

object SurveyHelper {

    /**
     * Get questions from the request parameters.
     *
     * @param request params
     */
	def getQuestions(conditions: Map[String, Seq[Condition]] = Map[String, Seq[Condition]]())(implicit params: Map[String, Any], language: String) = {
		var questions = new ListBuffer[Question]
		params.getOrElse("question[]", "") match {
			case p: Seq[_] => { 
				p.foreach { case (q: String) =>
			      val qText = getParam[String](q + "_q")
			      val qType = params(q + "_t")

			      val options = params.getOrElse(q + "_options", null)
            val dimensions = params.getOrElse(q + "_dimensions", null)
            val allow_other = getParam(q + "_allow_other", "false").toBoolean
            val mandatory = getParam(q + "_m", "false").toBoolean
            val other_text = getParam(q + "_other_text", "")
			      qType.asInstanceOf[Seq[_]].foreach { 
			      	_ match {
			      	  case "radio" => questions += new RadioButtons(q, getTexts(language -> qText), extractOptions(options), getTexts(language -> other_text), 
                  allow_other, mandatory)
			      	  case "checkbox" => questions += new CheckBoxes(q, getTexts(language -> qText), extractOptions(options), getTexts(language -> other_text), 
                  allow_other, mandatory)
                case "ranking" => questions += new Ranking(q, getTexts(language -> qText), extractOptions(options), getTexts(language -> other_text), 
                  allow_other, mandatory)
			      	  case "dropdown" => questions += new DropDown(q, getTexts(language -> qText), extractOptions(options), getTexts(language -> other_text), 
                  allow_other, mandatory)
                case "rating" => questions += new RatingScale(q, getTexts(language -> qText), extractDimensions(dimensions), extractOptions(options), 
                  getTexts(language -> other_text), allow_other, mandatory)
			      	  case "text" => questions += new TextBox(q, getTexts(language -> qText), mandatory)
			      	  case "info" => questions += new PlainText(q, getTexts(language -> qText))
			      	  case "textarea" => questions += new TextArea(q, getTexts(language -> qText), mandatory)
			      	  case "page" => {
                  val c = conditions.getOrElse(q, List[Condition]())
                  questions += new PageBreak(q, c)
                }
			        }
			      }
		      }
		    }
		    case _ =>
		   }
		questions.toList
	}

  /**
   * Gets a parameter from the (implict) request parameters. It assumes that the request 
   * object has a list and extracts the first element. If the element is not present, an 
   * error is thrown.
   *
   * @param name: name of the parameter to get
   * @param params: request parameters
   */
  def getParam[T](name: String)(implicit params: Map[String, Any]) : T = {
    params(name).asInstanceOf[Seq[T]](0)
  }

  /**
   * Gets a parameter from the (implict) request parameters. It assumes that the request 
   * object has a list and extracts the first element. If the element is not present, a 
   * default value is returned.
   *
   * @param name: name of the parameter to get
   * @param elseValue: default value of the parameter in case it is not found.
   * @param params: request parameters
   */
  def getParam[T](name: String, elseValue: T)(implicit params: Map[String, Any])  : T = {
    params.getOrElse(name, List(elseValue)).asInstanceOf[Seq[T]](0)
  }

  /**
   * Extracts the different options entered by splitting the lines.
   *
   * @param options
   */
	def extractOptions(options: Any)(implicit language: String) = {
		var e = new ListBuffer[AnswerOption]
		var count = 0
		options match {
			case o: Seq[_] => o.foreach { x => x.toString.trim.split("\n").foreach { s =>
				  count += 1
				  e += new AnswerOption(getTexts(language -> s.trim), "o" + count)
				} 
			}
			case _ => 
		}

		e.toList
	}

  /**
   * Extracts the different options entered by splitting the lines.
   *
   * @param options
   */
  def extractDimensions(dimensions: Any)(implicit language: String) = {
    var e = new ListBuffer[Dimension]
    var count = 0
    dimensions match {
      case o: Seq[_] => o.foreach { x => x.toString.trim.split("\n").foreach { s =>
          count += 1
          e += new Dimension(getTexts(language -> s.trim), "d" + count)
        } 
      }
      case _ => 
    }

    e.toList
  }

  /**
   * Extracts the different options entered by splitting the lines.
   *
   * @param options
   */
	def findQuestionsForPage(id: String, page: Int, s: java.util.Map[ _ <: Any,  _ <: Any])(f: (Question) => Unit ) = {
      var survey = dao.Mongo.deserialize(classOf[Survey], s)

      var completed = 0
      var total = 0

      var currentPage = 1
      survey.questions.foreach { q => 
        q match {
          case x: PageBreak=> currentPage += 1
          case _ => { 
            total += 1
            if (currentPage == page) f(q) else if (currentPage < page) completed += 1
          }
        }
      } 

      if (total == 0) total = 1

      (survey, ((completed * 100)/ total))
    }

    /**
     * Extracts the question (and its options) texts for presentation.
     *
     * @param survey
     */
    def getQuestionTexts(survey: java.util.Map[ _ <: Any,  _ <: Any], buildQList: Boolean = false) = {	
      import com.mongodb._

      def getText(data: java.util.Map[ _ <: Any,  _ <: Any]) = { 
        val texts = data.get("texts")
        if (texts != null) { 
          val t = texts.asInstanceOf[BasicDBList].get(0).asInstanceOf[BasicDBObject].toMap.get("text")
          if (t != null) t.asInstanceOf[String] else ""
        } else {
          ""
        }          
      }
    
      var texts = Map[String, String]()
      var qTexts = List[(String, String)]()
      if (survey.get("questions") != null) {
        survey.get("questions").asInstanceOf[BasicDBList].toArray.foreach { case m: BasicDBObject => 
          val data = m.toMap
          val questionId = data.get("questionId").asInstanceOf[String]
          val text = getText(data)
          texts = texts + ( questionId -> text )
          val qType = data.get("qType").asInstanceOf[String]
          if (buildQList && qType != "page" && qType != "plaintext") {
            qTexts ::= (questionId -> text)
          }

          qType match {
            case "radio" | "dropdown" | "checkbox" | "rating" | "ranking" =>  {
              data.get("options").asInstanceOf[BasicDBList].toArray.foreach { case m1: BasicDBObject => 
                val ans = m1.toMap
                val oId = ans.get("value").asInstanceOf[String]
                texts = texts + ( (questionId + "_" + oId) -> getText(ans) )
              }

              val hasOther = data.get("hasOther").asInstanceOf[Boolean]
              val otherText = if (buildQList && hasOther) data.get("otherBox").asInstanceOf[BasicDBList].get(0).asInstanceOf[BasicDBObject].toMap.get("text").toString else ""
              if (buildQList && qType != "rating" && hasOther) {
                qTexts ::= (questionId + "_other" -> otherText)
              }

              if (qType == "rating") {
                data.get("dimensions").asInstanceOf[BasicDBList].toArray.foreach { case m1: BasicDBObject => 
                  val ans = m1.toMap
                  val oId = ans.get("value").asInstanceOf[String]
                  val dText = getText(ans)
                  texts = texts + ( (questionId + "_" + oId) -> dText )
                  if (buildQList) {
                    qTexts ::= ((questionId + "_" + oId) -> dText)
                    if (hasOther) {
                      qTexts ::= ((questionId + "_" + oId + "_other") -> otherText)
                    }
                  }
                }
              }

            }
            case _ =>
          }
        }
      }

      (texts, qTexts.reverse)
    }

    /**
     * Delete a directory
     */
    def deleteDirectory(path: java.io.File): Boolean = {
      if( path.exists ) {
        val files = path.listFiles
        files.foreach { file =>
           if(file.isDirectory) { deleteDirectory(file) } else { file.delete }
        }
      }
      return path.delete 
  }
}