/*
 * ExternalAuthentication.scala
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

import play.api.libs.json._

import java.net._
import java.io._
import scala.io.Source

/**
 * A Controller for managing authentication via external systems (viz FaceBook and Google).
 *
 * @author Aishwarya Singhal
 */
object ExternalAuthentication extends Controller {

  private val facebook_auth_url = "https://graph.facebook.com/oauth/access_token?client_id=" + "287505401344847"+"&redirect_uri=" +
            "http://www.factile.net/facebook" + "&client_secret=" + "8626e035fd19960bbb3257d6e46c221f" + "&code="
  private val facebook_profile_url = "https://graph.facebook.com/me?access_token="

  private val google_auth_url = "https://accounts.google.com/o/oauth2/token"
  private val google_profile_url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="
  private val google_client_id = "1064263236398.apps.googleusercontent.com"
  private val google_client_secret = "quAU2KN0XNsfKJfOl8MTT43_"

  /**
   *
   */
  def facebook = Action { implicit request =>
    val code = request.queryString.getOrElse("code", List("")).asInstanceOf[Seq[String]](0)
    var email = ""

    if (code.trim != "") {
      val url = new URL(facebook_auth_url + code)
      readURL(url).split("&").foreach { k =>
        val pair = k.split("=")
        val key = pair(0)
        key match {
          case "access_token" => {
            val token = pair(1)
            val jsonString = readURL(new URL(facebook_profile_url + token))
            val json: JsValue = Json.parse(jsonString)
            email = (json \ "email").asOpt[String].getOrElse("")
          }
          case "expires" => // TODO: should we use this ?!
        }
      }
    }

    if (email == "") {
      Ok(views.html.common.index("Login failed.", null))
    } else {
      Redirect(routes.Surveys.dashboard).withSession("email" -> email)
    }
  }

  /**
   *
   */
  def google = Action { implicit request =>
    val code = request.queryString.getOrElse("code", List("")).asInstanceOf[Seq[String]](0)
    var email = ""

    if (code.trim != "") {
      val url = new URL(google_auth_url)
      val j = Json.parse(postData(url, "code" -> code, "client_id" -> google_client_id, "client_secret" -> google_client_secret, 
        "redirect_uri" -> "http://www.factile.net/google", "grant_type" -> "authorization_code"))

      val token = (j \ "access_token").asOpt[String].getOrElse("")
      if (token != "") {
        val jsonString = readURL(new URL(google_profile_url + token))
        val json: JsValue = Json.parse(jsonString)
        email = (json \ "email").asOpt[String].getOrElse("")
      }
    }

    if (email == "") {
      Ok(views.html.common.index("Login failed.", null))
    } else {
      Redirect(routes.Surveys.dashboard).withSession("email" -> email)
    }
  }

  private def postData(url: URL, params: (String, String)*) = {
    val data = params.map( x => URLEncoder.encode(x._1, "UTF-8") + "=" + URLEncoder.encode(x._2, "UTF-8") ).mkString("&");

    // Send data
    val conn = url.openConnection();
    conn.setDoOutput(true);
    val wr = new OutputStreamWriter(conn.getOutputStream());
    wr.write(data);
    wr.flush();

    // Get the response
    val sb = Source.fromInputStream(conn.getInputStream).getLines().mkString
    wr.close();

    sb
  }

  private def readURL(url: URL) = {
    Source.fromURL(url).getLines().mkString
  }

}