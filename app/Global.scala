/*
 * Global.scala
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
import play.api._
import play.api.mvc._
import play.api.mvc.Results._

object Global extends GlobalSettings {

  override def onStart(app: Application) {
  	import models.Template

  	if(Template.all.isEmpty) {
  		ClientSurveyTemplate
  		CustomerSurveyTemplate
      ExitSurveyTemplate
      StaffSurveyTemplate
      EmployeeSurveyTemplate
      EmployeeEngagementSurveyTemplate
      SatisfactionSurveyTemplate
      TrainingSurveyTemplate
      StaffSurveyLongTemplate
      TrainingFeedbackTemplate
      CustomerSurveyShortTemplate
      EmployeeSurveyLongTemplate
  	}

    Logger.info("Application has started")
  }  
  
  override def onStop(app: Application) {
    dao.Mongo.connection.close
    Logger.info("Application shutdown...")
  }  

  override def onError(request: RequestHeader, ex: Throwable) = {
  	Logger.error("Error occurred", ex)
    InternalServerError(
      views.html.common.errorPage("error")
    )
  }  
    
}