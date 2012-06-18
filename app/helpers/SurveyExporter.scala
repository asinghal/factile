/*
 * SurveyExporter.scala
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

import dao.Mongo._
import models._
import helpers.ResponseHelper._
import helpers.SurveyHelper._

object SurveyExporter {

  /**
   * Exports a surveys responses to Excel.
   *
   * @param id
   * @param user
   */
  def excel(id: String, user: String, file: java.io.File) = {
    import java.io.FileOutputStream
    import org.apache.poi.xssf.usermodel._

    Survey.findOne("surveyId" -> id, "owner" -> user).foreach { s => 
      val qtexts = getQuestionTexts(s.toMap, true)
      val texts = qtexts._1

      val isOpen = s.get("accessType").toString == "open"

      val wb = new XSSFWorkbook();
      val fileOut = new FileOutputStream(file);
      val sheet = wb.createSheet("Responses")

      var rNum = 0
      var row = sheet.createRow(rNum.toShort)

      var cNum = 0
      if (!isOpen) {
        val cell = row.createCell(cNum)
        cell.setCellValue("Email")
        cNum += 1
      }
      val qIds = qtexts._2.map { case (q, t) =>
        val cell = row.createCell(cNum)
        cell.setCellValue(t)
        cNum += 1
        q
      }

       SurveyResponse.find("surveyId" -> id).foreach { r => 
         val qResponse = deserialize(classOf[SurveyResponse], r.toMap)
         rNum += 1
         cNum = 0
         row = sheet.createRow(rNum.toShort)
         if (!isOpen) {
           val cell = row.createCell(cNum)
           cell.setCellValue(qResponse.email)
           cNum += 1
         }
         var responses = Map[String, QuestionResponse]()
         qResponse.responses.foreach { res =>
           responses += (res.question -> res)
         }

         qIds.foreach { q =>
           val res = responses.getOrElse(q, null)
           val cell = row.createCell(cNum)
           var answer: String = null
           if (res != null)  {
             val option = if (res.question.indexOf("_") != -1) res.question.split("_")(0) else res.question
             answer = res.answers.map { a => 
                 var text = if (res.ranking) (a.replace(res.question + "_", "")) else a
                 texts.getOrElse(option + "_" + text, text) }.mkString("\n")
           } else if (q.endsWith("_other")) {
             val q1 = q.replace("_other", "")
             val res1 = responses.getOrElse(q1, null)
             if (res1 != null)  {
               answer = res1.other
             }
           }
           cell.setCellValue(answer)
           cNum += 1
         }
       }

      wb.write(fileOut);
      fileOut.close();
    }
  }
}