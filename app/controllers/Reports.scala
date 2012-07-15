/*
 * Reports.scala
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
 * Controller to handle reports.
 */
object Reports extends Controller with Secured {
  
  /**
   * Inits the page
   */
  def start(id: String) = IsAuthenticated { user => implicit request => 
    val survey = Survey.findOne("surveyId" -> id, "owner" -> user).map { s => 
      val m = s.toMap
     // remove the keys we won't use and save on deserialization effort
      m.remove("history")
      m.remove("layout")
      deserialize(classOf[Survey], m)
    }
    Ok(views.html.reports.insights(user, survey.getOrElse(null)))
  }

  /**
   * Builds a report based on selected constraints and questions.
   */
  def build(id: String) = IsAuthenticated { user => implicit request => 
    val (questionTexts, survey) = getSurvey(id, user)

    val allResponses = SurveyResponse.find("surveyId" -> id)
    var responses = Map[String, Int]().withDefault(x => 0)
    val numResponses = allResponses.size
    var matchingResponses = 0
    var questions = Seq[String]()
    var constraintsList = Seq[(String, String)]()
    if (!survey.isEmpty) {
      getRequestData().foreach { implicit params =>
        questions = get("questions")
        constraintsList = get("constraint").zip(get("constraint_value"))

        allResponses.foreach { r => 
          val res = deserialize(classOf[SurveyResponse], r.toMap)
          if (res.satisfies(constraintsList)) {
            matchingResponses += 1
            collateAnswers(questions, res).foreach { o => 
              val s = o.substring(1)
              responses += (s -> (responses(s) + 1))
            }
          }
        }
      }
    }

    // get the top 5 (max) reponse combinations
    val n = if (responses.size > 5) 5 else responses.size
    val r = responses.toList.sortBy(_._2).reverse.take(n)
    Ok(views.html.reports.insights(user, survey.getOrElse(null), Some(r), questionTexts, numResponses, matchingResponses, questions, constraintsList))
  }

  /**
   * Convinience method to get survey details from the database. 
   */
  private def getSurvey(id: String, user: String) = {
    var questionTexts = Map[String, String]()
    var survey = Survey.findOne("surveyId" -> id, "owner" -> user).map { s => 
      val m = s.toMap
      // remove the keys we won't use and save on deserialization effort
      m.remove("history")
      m.remove("layout")
      questionTexts = getQuestionTexts(m)._1
      deserialize(classOf[Survey], m)
    }
    (questionTexts, survey)
  }

  /**
   * Convinience method to get a parameter's value from request as a Seq of String.
   *
   * @param name: parameter name in request
   * @param params: Implicitly passed request parameters
   * @return Seq[String]
   */
  private def get(name: String)(implicit params: Map[String, AnyRef]) = {
    params(name).asInstanceOf[Seq[String]]
  }
  
  /**
   * Collates the answers to form hyphen separated strings (for building permutations).
   */
  private def collateAnswers(questions: Seq[String], res: SurveyResponse) = {
    var str = List[String]("")
    questions.foreach { q => 
      res.responses.find( _.question == q).map { x =>
        str = addAnswer(q, x, str)
      }.getOrElse{
        str = addBlank(str)
      }
    }
    str
  }

  /**
   * Concatenates an answer to a hyphen separated string.
   */
  private def addAnswer(q: String, x: QuestionResponse, str: List[String]) = {
    var l = List[String]()
    x.answers.foreach { a =>
      str.foreach { s => l ::= (s + "-" + q.split("_")(0) + "_" + a) }
    }
    if (x.answers.isEmpty) {
      l = addBlank(str) 
    }
    l
  }

  /**
   * Add a hyphen for a missing entry.
   */
  private def addBlank(str: List[String]) = {
    var l = List[String]()
    str.foreach { s => l ::= (s + "- ") }
    l
  }
}