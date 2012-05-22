/*
 * ResponseHelperSpec.scala
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
package helpers

import org.specs2.mutable._
import com.mongodb.casbah.Imports._
import play.api.test._
import play.api.test.Helpers._

class ResponseHelperSpec extends Specification {

  "replaceTokens" should {
    "replace all variables in a string" in {
      val text = "a quick {{color}} fox jumps {{position}} the lazy dog. {{color}} looks great! And testing is not a {{position}}head."
      val replacements = Map[String, String]("color" -> "brown", "position" -> "over")
      val replaced = ResponseHelper.replaceTokens(text, replacements)

      replaced must beEqualTo("a quick brown fox jumps over the lazy dog. brown looks great! And testing is not a overhead.")
    }

    "recursively replace all variables in a string" in {
      val text = "a quick {{color}} fox jumps {{position}} the lazy dog. {{combo}} looks great! And testing is not a {{position}}head."
      val replacements = Map[String, String]("color" -> "brown", "position" -> "over", "combo" -> "{{color}}")
      val replaced = ResponseHelper.replaceTokens(text, replacements)

      replaced must beEqualTo("a quick brown fox jumps over the lazy dog. brown looks great! And testing is not a overhead.")
    }
  }
}