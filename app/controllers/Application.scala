/*
 * Application.scala
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
import play.api.data._
import play.api.data.Forms._

import models._
import Validators._

object Application extends Controller with Secured {
  val loginForm = Form(
    tuple(
      "username" -> text,
      "password" -> text
    )
  )

  def login = Action { implicit request =>
  	val (username, password) = loginForm.bindFromRequest.get
  	val user = User.find("email" -> username, "password" -> User.encrypt(password))

  	if (user.isEmpty) {
      Ok(views.html.common.index("Login failed.", null))
    } else {
      Redirect(routes.Surveys.dashboard).withSession("email" -> username)
    }
  }

  /**
   * Logout and clean the session.
   */
  def logout = Action {
    Redirect(routes.Application.index).withNewSession.flashing(
      "success" -> "You've been logged out"
    )
  }

  def newuser = Action {
    Ok(views.html.users.signup())
  }

  def signup = Action { implicit request =>
  	val (username, password) = loginForm.bindFromRequest.get

    if (!isValidEmail(username) || !User.find("email" -> username).isEmpty) {
      Ok(views.html.users.signup("You have entered an invalid email address, or it is already registered."))
    } else {
  	  val user = new User(username, User.encrypt(password))
  	  user.save

      Redirect(routes.Surveys.dashboard).withSession("email" -> username)
    }
  }

  def settings = IsAuthenticated { loggedInUser => implicit request =>
    val (usernameOption, existingPassword, password) = Form(tuple("username" -> optional(text),
                                                        "existing_password" -> optional(text),
                                                        "password" -> optional(text))).bindFromRequest.get
    var message: String = null
    var error = false
    usernameOption.map { username => 
      if (!isValidEmail(username) || (username != loggedInUser && !User.find("email" -> username).isEmpty)) {
        message = "You have entered an invalid email address, or it is already registered."
        error = true
      } else {
        val user = User.findOne("email" -> username, "password" -> User.encrypt(existingPassword.getOrElse("")))
        if (user.isEmpty) {
          message = "Please check your current password and resubmit."
          error = true
        } else {
          user.map { u => User.update(u.get("_id"), "email" -> username, "password" -> User.encrypt(password.getOrElse(""))) }
          message = "Your settings have been updated."
        }
      }
    }
    Ok(views.html.users.settings(loggedInUser, message, error))
  }

  def recoverPassword = Action { implicit request =>
    val email = Form("username" -> optional(text)).bindFromRequest.get
    var message: String = null
    var error = false
    email.foreach { username => 
      if (!isValidEmail(username) || User.find("email" -> username).isEmpty) {
        message = "You have entered an invalid email address, or we could not locate your details."
        error = true
      } else {
        User.resetPassword(username) 
        message = "Your password has been regenerated and sent to your email address."
      }
    }

    Ok(views.html.users.recoverPassword(email.getOrElse(null), message, error))
  }
  
  def index = Action { implicit request => 
    Ok(views.html.common.index("Factile", Secured.getUser(request)))
  }
  
}

object Secured {

  def getUser(request: RequestHeader) = request.session.get("email").getOrElse(null)
}

/**
 * Provide security features
 */
trait Secured {
  import play.api.libs.Files.TemporaryFile
  
  /**
   * Retrieve the connected user email.
   */
  private def username(request: RequestHeader) = request.session.get("email")

  /**
   * Redirect to login if the user in not authorized.
   */
  private def onUnauthorized(request: RequestHeader) = Results.Redirect(routes.Application.index)
  
  // --
  
  /** 
   * Action for authenticated users.
   */
  def IsAuthenticated(f: => String => Request[AnyContent] => Result) = Security.Authenticated(username, onUnauthorized) { user =>
    Action(request => f(user)(request))
  }

  /** 
   * Action for authenticated users.
   */
  def IsMultipartAuthenticated(p: BodyParser[MultipartFormData[TemporaryFile]])(f: => String => Request[MultipartFormData[TemporaryFile]] => Result) = Security.Authenticated(username, onUnauthorized) { user =>
    Action(p)(request => f(user)(request))
  }

  def getRequestData[A <: AnyContent]()(implicit request: Request[A]) = {
    var requestData = Map[String, AnyRef]().withDefault(x => List(""))
    if (request.body.asFormUrlEncoded != null && !request.body.asFormUrlEncoded.isEmpty) {
      requestData = requestData ++ (request.body.asFormUrlEncoded.get)
    }
    if (request.body.asMultipartFormData != null && !request.body.asMultipartFormData.isEmpty) {
      requestData = requestData ++ (request.body.asMultipartFormData.get.asFormUrlEncoded)
    }
    requestData = requestData ++ (request.queryString)
    if (requestData.isEmpty) None else Some(requestData)
  }

}

object Validators {

  lazy val email_validator = new play.data.validation.Constraints.EmailValidator

  def isValidEmail(email: String) = email.trim != "" && email_validator.isValid(email)
}