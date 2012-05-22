/*
 * FilesHelper.scala
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

object FilesHelper {

  val UPLOAD_DIR = System.getProperty("user.home") + "/factile/uploads/"

  /**
   * Uploads a file and saves on to the file system. The file is uploaded under 
   * <App Home>/public/uploads/<survey hash>/<another hash>/
   * The dual hash usage in the path is solely to increase randomness and reduce the risk of 
   * accidental overlaps between users/ surveys.
   *
   * @param hash_string: hash id of the survey with which to associate the file.
   * @param logo: multi part file information as available in the request.
   * @param existing_hash
   * @return file path under uploads
   */
  def uploadFile(hash_string: String, logo: play.api.mvc.MultipartFormData.FilePart[play.api.libs.Files.TemporaryFile], existing_hash: String = null) = {
    import java.io.File
    import java.security.SecureRandom
    import java.math.BigInteger
    val path = UPLOAD_DIR + hash_string + "/"
    new File(path).mkdirs

    var img_hash_string: String = null
    if (existing_hash == null) {
      val img_random = new SecureRandom
      img_hash_string = new BigInteger(80, img_random).toString(32)
    } else {
      img_hash_string = existing_hash
    }
    
    val filename = img_hash_string + "/" + logo.filename 
    val contentType = logo.contentType
    logo.ref.moveTo(new File(path + filename))    
    filename
  }

  /**
   * Deletes an existing logo file for a survey from the file system.
   *
   * @param s: survey data from database
   * @return hash for the existing file directory, to be used for any other uploads.
   */
  def deleteExistingLogo(s: java.util.Map[ _ <: Any,  _ <: Any]) = {
    val l = s.get("logo")
    var existing_hash: String = null
    if (l != null) {
      var filename = l.toString
      val file = new java.io.File(UPLOAD_DIR + s.get("hash_string").toString + "/" + filename)
      existing_hash = filename.substring(0, filename.lastIndexOf("/"))
      if (file.exists) file.delete
    }

    existing_hash
  }
}