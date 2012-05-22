/*
 * BasicFormHelper.scala
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

import play.api.templates.Html

/**
 * Utility methods for generating a form.
 *
 * @author Aishwarya Singhal
 */
object BasicFormHelper {

  class OptionWrapper[T](val option : Option[T]) { def getString(f: (T) => String, m: String = "") = option.flatMap{ s: T => Some(f(s)) }.getOrElse(m) }

  implicit def wrapOption[T](option: Option[T]) = new OptionWrapper[T](option)


   /**
    * Helper for generating HTML code for a form.
    *
    * @param action
    * @param html body of form elements
    */
   def form_for(action: String, id: String, options: (String, String)* )(f: => Html ) = {
   	val inner = f.body
    val optionsstr = options.foldLeft("") { (s, o) => s + (o._1 + "=\"" + o._2 + "\" ")}
   	new Html("<form method=\"POST\" action=\"" + action + "\" id=\"" + id + "\" " + optionsstr.trim +">" + inner + "</form>")
   }

   /**
    * Helper for generating HTML code for a text box.
    *
    * @param name
    * @param value
    * @param placeholder text
    * @param password: indicates if this is a password field
    * @param className CSS
    */
   def text_field(name: String, value: String, placeholder: String, className: String, password: Boolean = false) = {
   	val inputType = if (password) "password" else "text"
   	val valueString = if (value != null) "value=\"" + value + "\"" else ""
    val css = if (className != "") " class=\"" + className + "\""

   	new Html("<input type=\""+ inputType + "\" name=\"" + name + "\" id=\"" + name + "\" " + valueString + " placeholder=\"" + placeholder + "\"" + css + " />")
   }

   /**
    * Helper for generating HTML code for a text box.
    *
    * @param name
    * @param value
    * @param className CSS
    * @param ckeditor - indicates whether this field should be enabled for CKEditor
    * @param options - any additional html options.
    */
   def text_area(name: String, value: String, className: String, ckeditor: Boolean = true, rows: Int = 0) = {
     val ckString = if (ckeditor) "ckeditor " else ""
    val rowstr = if (rows != 0) " rows = " + rows else ""
    new Html("<textarea class=\"" + ckString + className + "\" name=\"" + name + "\" id=\"" + name + "\"" + rowstr +">" + value + "</textarea>")
   }

   /**
    * Helper for generating HTML code for a hidden field.
    *
    * @param name
    * @param value
    */
   def hidden_field(name: String, value: String) = {
    val valueString = if (value != null) "value=\"" + value + "\"" else ""

    new Html("<input type=\"hidden\" name=\"" + name + "\" id=\"" + name + "\" " + valueString + " />")
   }

   /**
    * Helper for generating HTML code for a combo box.
    *
    * @param name
    * @param value
    * @param options (text -> value) pairs
    * @param selectMultiple: allow a multi select combo box
    * @param className CSS
    */
   def dropdown(name: String, value: String, options: Seq[(String, String)], selectMultiple: Boolean = false, className: String) = {
   	val multiple = if(selectMultiple) "multiple=\"multiple\"" else ""
    val css = if (className != "") " class=\"" + className + "\""
   	var html = "<select name=\"" + name + "\" id=\"" + name + "\" " + multiple + css + ">"
   	options.foreach { case (t, v) => 
       var selected = "";
       if (v == value) {
         selected = " selected=\"selected\"";
       }
       html += "<option value=\"" + v + "\"" + selected + ">" + t + "</option>" 
     } 
   	html += "</select>"

   	new Html(html)
   }

   /**
    * Helper for generating HTML code for radio buttons.
    *
    * @param name
    * @param value
    * @param options (text -> value) pairs
    * @param className CSS
    */
   def radio_buttons(name: String, value: String, options: Seq[(String, String)], className: String, inline: Boolean = true) = {
    val css = if (className != "") " class=\"" + className + "\""
     var html = ""
     var i = 0
     val sep = if(inline) "&nbsp;" else "<br>"
     options.foreach { case (t, v) => 
       var checked = "";
       i += 1
       if (v == value || (value == "" && i == 1)) {
         checked = " checked=\"checked\"";
       }
       html += "<input type=\"radio\" name=\"" + name + "\" id=\"" + name + "_" + i + "\" value=\"" + v + "\"" + checked + "" + css + "/>&nbsp;" + t + sep
     } 

     new Html(html)
   }

   /**
    * Helper for generating HTML code for a file upload text box.
    *
    * @param name
    * @param value
    * @param placeholder text
    * @param className CSS
    */
   def file_field(name: String, value: String, placeholder: String, className: String) = {
     val valueString = if (value != null) "<a href=\"" + value + "\" target=\"_blank\">"+ value.substring(value.lastIndexOf("/") + 1) + "</a>&nbsp;" else ""
    val css = if (className != "") " class=\"" + className + "\""

     new Html(valueString + "<input type=\"file\" name=\"" + name + "\" id=\"" + name + "\" " + " placeholder=\"" + placeholder + "\"" + css + " />")
   }
}