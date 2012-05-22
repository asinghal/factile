/*
 * Addresses.scala
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
 * Controller to handle user responses.
 */
object Addresses extends Controller with Secured {

   /**
    * Action to show details of a group.
    */
   def show = IsAuthenticated { user => implicit request => 
      var addressBooks = AddressBook.find("owner" -> user).map { a =>
         deserialize(classOf[AddressBook], a.toMap)
      }.toList

      if (addressBooks.isEmpty) {
         val group = new AddressGroup("Default")
         val book = new AddressBook(user, List(group))
         book.save
         addressBooks = List(book)
      }
      Ok(views.html.addressbook.show(addressBooks, user))
   }

   def update = IsAuthenticated { user => implicit request => 
      getRequestData().foreach { params =>
         var groups = List[AddressGroup]()
         params.getOrElse("groups", null) match {
            case x: Seq[_] => {
               x.foreach { case g: String => 
                  var contacts = List[Address]()
                  var allNames = List[String]()
                  var allEmails = List[String]()
                  val names = params.getOrElse(g + "_name", "") match {
                     case n: Seq[_] => {
                        n.foreach { case name: String => allNames ::= name }
                     }
                     case _ =>
                  }

                  val emails = params.getOrElse(g + "_email", "") match {
                     case e: Seq[_] => {
                        e.foreach { case email: String => allEmails ::= email }
                     }
                     case _ =>
                  }

                  allNames.reverse.zip(allEmails.reverse).foreach { case (n: String, e: String) => contacts ::= new Address(n, e) }
                  groups ::= new AddressGroup(g, contacts.reverse)
               }
            }
            case _ => groups ::= new AddressGroup("Default")
         }
         AddressBook.find("owner" -> user).foreach { a =>
            // TODO: this assuming there's only one book per user!
            AddressBook.update(a.get("_id"), "groups" -> groups.reverse)
         }
      }

      Redirect("/addressbook")
   }

   def open = IsAuthenticated { user => implicit request =>
      var addressBooks = AddressBook.find("owner" -> user).map { a =>
         deserialize(classOf[AddressBook], a.toMap)
      }.toList
      Ok(views.html.addressbook.selector(addressBooks))
   }

}
