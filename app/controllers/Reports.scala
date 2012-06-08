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

	def build(id: String) = IsAuthenticated { user => implicit request => 
		var questionTexts = Map[String, String]()
		val survey = Survey.findOne("surveyId" -> id, "owner" -> user).map { s => 
      val m = s.toMap
     // remove the keys we won't use and save on deserialization effort
      m.remove("history")
      m.remove("layout")
      questionTexts = getQuestionTexts(m)._1
      deserialize(classOf[Survey], m)
    }

    val allResponses = SurveyResponse.find("surveyId" -> id)
  	var responses = Map[String, Int]().withDefault(x => 0)
  	var numResponses = allResponses.size
  	var questions = Seq[String]()
    if (!survey.isEmpty) {
      getRequestData().foreach { params =>
      	//val groups = params("groups").asInstanceOf[Seq[String]].head.split(",")
      	//val questions = groups.map(params(_).asInstanceOf[Seq[String]].head)
      	questions = params("questions").asInstanceOf[Seq[String]]
	      allResponses.foreach { r => 
	      	val res = deserialize(classOf[SurveyResponse], r.toMap)
	      	var str = List[String]("")
	      	questions.foreach { q => 
	      		res.responses.find( _.question == q).map { x =>
	      			var l = List[String]()
	      			x.answers.foreach { a =>
	      				str.foreach { s => l ::= (s + "-" + q.split("_")(0) + "_" + a) }
	      			}
	      			str = l
	      		}
	      	}

	      	str.foreach { o => 
	      		val s = o.substring(1)
	      		responses += (s -> (responses(s) + 1))
	      	}
	      }
      }
    }

    // get the top 5 (max) reponse combinations
    val n = if (responses.size > 5) 5 else responses.size
    val r = responses.toList.sortBy(_._2).reverse.take(n)
    Ok(views.html.reports.insights(user, survey.getOrElse(null), Some(r), questionTexts, numResponses, questions))
	}
}