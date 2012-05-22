/*
 * UserSpec.scala
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

import org.specs2.mutable._
import com.mongodb.casbah.Imports._
import play.api.test._
import play.api.test.Helpers._

import dao.Mongo._

class UserSpec extends Specification {

  "save a user" should {
    "insert a document in database" in {
      running(FakeApplication()) {
        val count = connect("users").find.size
        val user = new User("abc@test.com", "password", "aishwarya", "singhal")
        user.save

        connect("users").find.size must beEqualTo(count + 1);
        val u = connect("users").find(MongoDBObject("email" -> "abc@test.com")).toList 
        u must not be empty
      }
    }
  }

  "update a user" should {
    "update an existing document in database" in {
      running(FakeApplication()) {
        val u1 = connect("users").find(MongoDBObject("email" -> "abc@test.com")).toList(0) 
        val id = u1.toMap.get("_id")

        User.update(id, "firstName" -> "Aishwarya1", "lastName" -> "Singhal1")
        val u = connect("users").findOne(MongoDBObject("_id" -> id)).get
        u.toMap.get("firstName").toString must beEqualTo("Aishwarya1")
        u.toMap.get("lastName").toString must beEqualTo("Singhal1")
      }
    }
  }

  "get users" should {
    "fetch all documents from database" in {
      running(FakeApplication()) {
        User.all must not be empty
      }
    }
    "fetch all documents from database based on criteria" in {
      running(FakeApplication()) {
        User.find("email" -> "abc@test.com") must not be empty
      }
    }
    "fetch just one document matching criteria from database" in {
      running(FakeApplication()) {
        val u1 = connect("users").find(MongoDBObject("email" -> "abc@test.com")).toList(0) 
        val id = u1.toMap.get("_id")
        User.findOne("_id" -> id) must not be empty
      }
    }
  }

  "remove users" should {
    "delete a user" in {
      running(FakeApplication()) {
        val u1 = connect("users").find(MongoDBObject("email" -> "abc@test.com")).toList(0) 
        val id = u1.toMap.get("_id")
        User.delete(id)
        connect("users").findOne(MongoDBObject("_id" -> id)) must be empty
      }
    }
  }

  "password encrption" should {
    "work" in {
      val enc = User.encrypt("password1") 

      // encrypted value should not be the same
      enc must not be equalTo("password1");
      //and encryption should be consistent
      enc must beEqualTo(User.encrypt("password1"));
    }
  }
}