/*
 * QueryOn.scala
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

import com.mongodb.casbah.Imports._
import dao.Mongo

trait QueryOn[T <: Model[T]] {
  private var _collectionName = ""

  lazy val indexedFields = List[String]()

  lazy val table = Mongo.connect(collectionName, indexedFields)

  def collectionName = { 
    val e = getClass

    if (_collectionName == "") {
      _collectionName = e.getSimpleName.toLowerCase.replace("$", "") + "s"
    }

    _collectionName
  }
  
  def all = {
  	table.find
  }

  def find[A <: String, B](q: (A, B)*) = {
    table.find(MongoDBObject(List(q: _*)))
  }

  def findOne[A <: String, B](q: (A, B)*) = {
    table.findOne(MongoDBObject(List(q: _*)))
  }

  def update(id: Any, allUpdates: (String, Any)*) = {
    var list = List[(String, Any)]()
    allUpdates.foreach { case (node, updates) => 
      list ::= (node -> Mongo.serialize(updates))
    }
    val updateQ = $set (list: _*)
    table.update(MongoDBObject("_id" -> id), updateQ) 
  }

  def delete(id: Any) = {
    table -= MongoDBObject("_id" -> id)
  }

  def deleteAll[A <: String, B](q: (A, B)*) = {
    table.remove(MongoDBObject(List(q: _*)))
  }
}