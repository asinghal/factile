/*
 * User.scala
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

import java.security.MessageDigest

case class User(email: String, password: String, status: String = "Active", firstName: String = "", lastName: String = "") extends Model[User] { }

object User extends QueryOn[User] {
  override lazy val indexedFields = List[String]("email")

  def encrypt(p: String) = {
    val m = MessageDigest.getInstance("SHA-512")
    val b = p.getBytes("UTF-8")
    new String(m.digest(b))
  }

  def resetPassword(email: String) = {
    import java.security.SecureRandom
    import java.math.BigInteger
    import com.mongodb.casbah.Imports._

    val random = new SecureRandom
    val hash_string = new BigInteger(30, random).toString(32)

    val updateQ = $set ("password" -> encrypt(hash_string))
    table.update(MongoDBObject("email" -> email), updateQ)

    val body = views.html.emails.recover(hash_string)

    //TODO : Now send an email
    helpers.Mailer.send(email, "factilenet@gmail.com", "Your password has been reset", body.body.trim)
  }
}