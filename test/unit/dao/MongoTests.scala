/*
 * MongoTests.scala
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
package dao

import org.specs2.mutable._
import com.mongodb.casbah.Imports._
import play.api.test._
import play.api.test.Helpers._

import models._

class MongoSpec extends Specification {

  "Database connection" should {
    "be open" in {
      running(FakeApplication()) {
        val c = Mongo.connect("testCollection") 
        c must not beNull
      }
    }
  }

  "Serialization of survey" should {
    "work for good data" in {
      val survey = new models.Survey("abc-123", "Test Survey", "1", List("aishwarya"), "hash_string", List[Question](new PageBreak("q1")), null, 
  "intro_text", "thank_you_text", "logo", "open", null,"Draft")
      val c = Mongo.serializeAllFields(survey) 
      c must not beNull;
      c must beAnInstanceOf[DBObject];
      val m = c.asInstanceOf[DBObject].toMap;
      m.get("surveyId") must beEqualTo("abc-123")
      m.get("name") must beEqualTo("Test Survey")
      m.get("language") must beEqualTo("1")
      //m.get("owner") must beEqualTo("aishwarya")
      m.get("hash_string") must beEqualTo("hash_string")
      m.get("intro_text") must beEqualTo("intro_text")
      m.get("thank_you_text") must beEqualTo("thank_you_text")
      m.get("logo") must beEqualTo("logo")
      m.get("status") must beEqualTo("Draft")
      m.get("questions") must beAnInstanceOf[BasicDBList];
      val q = m.get("questions").asInstanceOf[BasicDBList]
      q must not be empty
    }
  }

  "DeSerialization of survey" should {
    "work for good data" in {
      val builder = MongoDBObject.newBuilder
      builder += "surveyId" -> "abc-123"
      builder += "name" -> "test survey"
      builder += "language" -> "1"

      val owner = MongoDBList.newBuilder
      owner += "aishwarya"
      builder += "owner" -> owner.result

      val list = MongoDBList.newBuilder
      list += MongoDBObject("questionId" -> "q1", "qType" -> "page")
      list += MongoDBObject("questionId" -> "q2", "qType" -> "page")
      list += MongoDBObject("questionId" -> "q3", "qType" -> "page")

      builder += "questions" -> list.result

      val survey = Mongo.deserialize(classOf[Survey], builder.result.toMap)
      survey must not beNull;
      survey must beAnInstanceOf[Survey];
      survey.questions must not be empty;
      survey.questions.size must beEqualTo(3);
      survey.name must beEqualTo("test survey");
      survey.surveyId must beEqualTo("abc-123");
      survey.language must beEqualTo("1");
      //survey.owner must beEqualTo("aishwarya");
    }

    "fail for bad data" in {
      val builder = MongoDBObject.newBuilder
      builder += "surveyId" -> "abc-123"
      builder += "name" -> "test survey"
      builder += "language" -> "1"

      val owner = MongoDBList.newBuilder
      owner += "aishwarya"
      builder += "owner" -> owner.result

      val list = MongoDBList.newBuilder
      list += MongoDBObject("questionId" -> "q1", "qType" -> "unknown")
      list += MongoDBObject("questionId" -> "q2", "qType" -> "unknown")
      list += MongoDBObject("questionId" -> "q3", "qType" -> "unknown")

      builder += "questions" -> list.result

      Mongo.deserialize(classOf[Survey], builder.result.toMap) must throwA[NoSuchElementException] 
    }
  }}