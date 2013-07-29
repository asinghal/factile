/*
 * ResponseStore.scala
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

import models._

object ResponseStore {

	var _store = Map[String, Boolean]()

	def watch(qId: String) {
		_store = _store.updated(qId, false)
	}

	def touch(qId: String) {
		if (_store.contains(qId)) {
			_store = _store.updated(qId, true)
		}
	}

	def reset(qId: String) {
	    _store = _store.updated(qId, false)	
	}

	def hasNew(qId: String) = _store.getOrElse(qId, false)
}
