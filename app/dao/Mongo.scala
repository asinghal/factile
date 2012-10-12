/*
 * Mongo.scala
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

import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoConnection
import play.Play

import models._

/**
 * Mongo interaction related utilities.
 */
object Mongo {

  lazy val config = Play.application.configuration
  lazy val host = config.getString("mongo.db.host")
  lazy val port = config.getInt("mongo.db.port")
  lazy val database = config.getString("mongo.db.database")

  lazy val connection = MongoConnection(host, port)

  /**
   * Connect to the Mongo database and open a required collection.
   */
  def connect(collection: String, indexedFields: Seq[String] = List[String]()) = { 
     val db = connection(database)
     val col = db(collection) 
     indexedFields.foreach { key => col.ensureIndex(MongoDBObject(key -> 1)) }
     col
  }

  /**
   * Serialize a wrapper object and all its member attributes into Mongo's formats.
   *
   * @param object
   */
  def serializeAllFields(o: Any) = {
    val builder = MongoDBObject.newBuilder
    def ser(f: java.lang.reflect.Field) {
      if (!f.getName.contains("collectionName") && f.getName != "table" && !f.getName.startsWith("bitmap")) {
        f.setAccessible(true)
        val v = f.get(o)
        builder += (f.getName -> serialize(v)) 
      }
    }
    o.getClass.getDeclaredFields.foreach { ser }
    o.getClass.getSuperclass.getDeclaredFields.foreach { ser }

    builder.result.asDBObject
  }

  /**
   * Serialize an object into Mongo's formats.
   *
   * @param object
   */
  def serialize(o : Any) : Any = {
    var res: Any = null
    o match {
      case s: Seq[_] =>
        val builder = MongoDBList.newBuilder
        s.foreach { e => 
          builder += serialize(e)
        }
        res = builder.result
      case s: Element => {
        res = serializeAllFields(o).result.asDBObject
      }

      case _ => res = o
    }

    res
  }

  val identifiers = Map("questions" -> "qType")
  val mappings = Map(
    "radio" -> classOf[RadioButtons],
    "textbox" -> classOf[TextBox],
    "checkbox" -> classOf[CheckBoxes],
    "ranking" -> classOf[Ranking],
    "rating" -> classOf[RatingScale],
    "dropdown" -> classOf[DropDown],
    "textarea" -> classOf[TextArea],
    "responses" -> classOf[QuestionResponse],
    "history" -> classOf[History],
    "groups" -> classOf[AddressGroup],
    "addresses" -> classOf[Address],
    "plaintext" -> classOf[PlainText],
    "page" -> classOf[PageBreak],
    "options" -> classOf[AnswerOption],
    "dimensions" -> classOf[Dimension],
    "texts" -> classOf[Text],
    "conditions" -> classOf[Condition],
    "layout" -> classOf[SurveyLayout],
    "otherBox" -> classOf[Text]
    )

  val defaultValues = Map("questions" -> List[Question](), "responses" -> List[QuestionResponse](), 
    "groups" -> List[AddressGroup](), "addresses" -> List[Address](), "conditions" -> List[Condition](), "texts" -> List[Text]() )

  /**
   * Recursively binds the data contained in a Mongo DB object onto an appropriate model object.
   *
   * @param options
   */
  def deserialize[T](clazz: Class[T], contents: java.util.Map[ _ <: Any,  _ <: Any]): T = {
    import com.mongodb._
    import scala.collection.mutable.ListBuffer

    var o = new ListBuffer[AnyRef]
    clazz.getDeclaredFields.foreach { f => 
        if (!f.getName.contains("collectionName") && f.getName != "table" && !f.getName.startsWith("bitmap")) {
          val value = contents.get(f.getName)
          if (value == null) {
            o += defaultValues.getOrElse(f.getName, null)
          } else {
            value match {
              case x: BasicDBList =>  {
                var l = new ListBuffer[AnyRef]
                x.toArray.foreach { case x: BasicDBObject => { l += deserializeDBObject(x, f.getName) } case x: AnyRef => l += x }

                if (x.isEmpty) { o += defaultValues.getOrElse(f.getName, null) } else { o += l.toList }
              }
              case x: BasicDBObject =>  o += deserializeDBObject(x, f.getName)
              case x: AnyRef => o += x
            }
          }
        }
    }

    clazz.getDeclaredConstructors()(0).newInstance(o.toList: _*).asInstanceOf[T]
  }

  /**
   * Binds the data contained in a Mongo DB object onto an appropriate model object.
   *
   * @param options
   */
  private def deserializeDBObject(x: BasicDBObject, field: String) = {
    var c = mappings.getOrElse(field, null)
    if (c == null) {
      val n = x.toMap.get(identifiers(field)).asInstanceOf[String]
      c = mappings(n)
    }
    deserialize(c, x.toMap).asInstanceOf[AnyRef]
  }
}