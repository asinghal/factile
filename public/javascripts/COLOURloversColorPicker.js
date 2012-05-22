	// Globals variables //
	var _stop = 1, _dragHandle = "", _dragHandleStyle, tX, tY, HSV = {0: 360,1: 0,2: 100}, hSV = 149, wSV = 140, _CLCPOffset = {x: 0, y: 0}, _canDragPicker = false, _CLCPdisplay = "none", _CLCPisDraggable = true, _CLCPposition = "absolute";
	var _hueTrackHeight = 147, _clickMouseLocale = "", _clickMouseLocaleCLCPIinnerShell = false, _refreshTimeout = 0, _CLCPinitHex = "", _CLCPabsPos = "";
	var _CLCPbasicLimits = {"CLCPbasicHex": [0,16777215],"CLCPbasicR": [0,255],"CLCPbasicG": [0,255],"CLCPbasicB": [0,255],"CLCPbasicH": [0,359],"CLCPbasicS": [0,100],"CLCPbasicV": [0,100],"CLCPbasicC": [0,100],"CLCPbasicM": [0,100],"CLCPbasicY": [0,100],"CLCPbasicK": [0,100]};

	Array.prototype.CLCPin_array = function(_needle) {
		var _i;
		for (_i=0;_i<=this.length;_i++ ) {
			if (this[_i] == _needle) {
				return true;
			}
		}
		return false;
	}

	String.prototype.CLCPpadHex = function() {
		var _str = ("000000".toString() + this.toString());
		return _str.substring((_str.length - 6),_str.length); // THANKS IE!!!!
	}

	CLCPdec2hex = function(_dec) {
		var _hexChars = "0123456789ABCDEF", _hex = "";
		while (_dec > 15) {
			_hex = (_hexChars.charAt((_dec - (Math.floor(_dec / 16)) * 16)) + _hex);
			_dec = Math.floor(_dec / 16);
		}
		return (_hexChars.charAt(_dec) + _hex);
	}

	CLCPhex2dec = function(_hex) {
		return parseInt(_hex,16);
	}

	if (typeof $G != "function") {
		$G = function(_elementID) {
			return document.getElementById(_elementID);
		}
	}

	if (typeof $S != "function") {
		$S = function(_elementID) {
			return $G(_elementID).style;
		}
	}

	CLCPisHex = function(_hex) {
		return /^[a-fA-F0-9]{6}$/.test(_hex);
	}

	CLCPdomEvent = function(_event) {
		_event = (_event) ? _event : window.event;

		// Opera hates this for some reason:
		if (!window.opera && _event.srcElement) {
			_event.target = _event.srcElement;
		}
		if (_event.keyCode) {
			_event.code = _event.keyCode;
		} else if (_event.which) {
			_event.code = _event.which;
		} else {
			_event.code = _event.charCode
		}
		return _event;
	}

	CLCPabsPos = function(_object) {
		var r = {
			x : _object.offsetLeft,
			y : _object.offsetTop
		};
		if (_object.offsetParent) {
			var v = CLCPabsPos(_object.offsetParent);
			r.x += v.x;
			r.y += v.y;
		}
		return r;
	}

	CLCPinitPicker = function() {
		document.onmousemove = CLCPMouseHandlerOnMouseMove;
		document.onmouseup = CLCPMouseHandlerOnMouseUp;

		$S("CLCP").left = 0;
		$S("CLCP").top = 0;
		$S("CLCP").width = "262px";
		$S("CLCP").height = "268px";
		$G("CLCP").innerHTML = "<div id=\"CLCPDragDiv\" class=\"CLCPDragDiv\"><div id=\"CLCPIinnerShell\" class=\"CLCPIinnerShell\"><div id=\"CLCPPicker\" class=\"CLCPPicker\"><div id=\"CLCPSatVal\" class=\"CLCPSatVal\" onmousedown=\"CLCPslide('CLCPSatValSlide','CLCPPicker',event);\"><div id=\"CLCPSatValSlide\" class=\"CLCPSatValSlide\"></div></div><div id=\"CLCPHueContainer\" class=\"CLCPHueContainer\" onmousedown=\"CLCPslide('CLCPHueSlide','CLCPPicker',event);\"><div id=\"CLCPHueSlide\" class=\"CLCPHueSlide\" style=\"top: -4px; left: -7px;\"></div><div class=\"CLCPHue\"></div></div><div id=\"CLCPSatContainer\" class=\"CLCPSatContainer\" onmousedown=\"CLCPslide('CLCPSatSlide','CLCPPicker',event);\"><div id=\"CLCPSatSlide\" class=\"CLCPSatSlide\" style=\"top: -4px; left: -7px;\"></div><div id=\"CLCPSat\" class=\"CLCPSat\"></div></div><div id=\"CLCPValContainer\" class=\"CLCPValContainer\" onmousedown=\"CLCPslide('CLCPValSlide','CLCPPicker',event);\"><div id=\"CLCPValSlide\" class=\"CLCPValSlide\" style=\"top: -4px; left: -7px;\"></div><div id=\"CLCPVal\" class=\"CLCPVal\"></div></div></div><div class=\"CLCPbPE\"><div style=\"width: 48px; margin-right: 10px; background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/hex.png) center top no-repeat;\"></div><div style=\"background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/r.png) center top no-repeat;\"></div><div style=\"background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/g.png) center top no-repeat;\"></div><div style=\"margin-right: 11px; background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/b.png) center top no-repeat;\"></div><div style=\"background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/h.png) center top no-repeat;\"></div><div style=\"background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/s.png) center top no-repeat;\"></div><div style=\"margin-right: 0; background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/v.png) center top no-repeat;\"></div><div class=\"CLCPClear CLCPNoDim\"></div><input type=\"text\" id=\"CLCPbasicHex\" maxlength=\"6\" value=\"\" style=\"width: 48px; margin-right: 12px; background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/formFieldLargeBG.png) no-repeat;\" /><input type=\"text\" id=\"CLCPbasicR\" maxlength=\"3\" /><input type=\"text\" id=\"CLCPbasicG\" maxlength=\"3\" /><input type=\"text\" id=\"CLCPbasicB\" maxlength=\"3\" style=\"margin-right: 13px;\" /><input type=\"text\" id=\"CLCPbasicH\" maxlength=\"3\" /><input type=\"text\" id=\"CLCPbasicS\" maxlength=\"3\" /><input type=\"text\" id=\"CLCPbasicV\" maxlength=\"3\" style=\"margin-right: 0;\" /><div class=\"CLCPClear\" style=\"width: 242px; height: 15px; margin: 0; font-size: 0;\"></div><div style=\"background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/c.png) center top no-repeat;\"></div><div style=\"background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/m.png) center top no-repeat;\"></div><div style=\"background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/y.png) center top no-repeat;\"></div><div style=\"background: url(http://colourlovers.com.s3.amazonaws.com/images/copaso/basic/k.png) center top no-repeat;\"></div><div class=\"CLCPClear CLCPNoDim\"></div><div><input type=\"text\" id=\"CLCPbasicC\" maxlength=\"3\" /></div><div><input type=\"text\" id=\"CLCPbasicM\" maxlength=\"3\" /></div><div><input type=\"text\" id=\"CLCPbasicY\" maxlength=\"3\" /></div><div><input type=\"text\" id=\"CLCPbasicK\" maxlength=\"3\" /></div><a href=\"http://www.colourlovers.com/\" target=\"_blank\"><img src=\"http://colourlovers.com.s3.amazonaws.com/images/floatingColorPicker/logo.png\" style=\"float: left; width: 99px; height: 20px; border: 0 none;\" title=\"COLOURlovers\" alt=\"COLOURlovers\" /></a><img src=\"http://colourlovers.com.s3.amazonaws.com/images/floatingColorPicker/closeBtn.png\" style=\"float: left; width: 13px; height: 13px; padding: 7px 0 0 12px; cursor: pointer;\" onclick=\"CLCPhidePicker();\" alt=\"Close\" /></div></div></div>";
		$G("CLCPIinnerShell").onmousedown = function(_event) {
			_clickMouseLocaleCLCPIinnerShell = true;
			_canDragPicker = false;
		}
		$G("CLCPDragDiv").onmousedown = function() {
			if (_clickMouseLocaleCLCPIinnerShell == false) {
				_canDragPicker = true;
				_CLCPOffset.x = (_mouseCoords[0] - parseInt($S("CLCP").left));
				_CLCPOffset.y = (_mouseCoords[1] - parseInt($S("CLCP").top));
			}
		}

		if ((_CLCPdisplay == "block") || (_CLCPdisplay == "none")) {
			$S("CLCP").display = _CLCPdisplay;
		}
		if (_CLCPposition != "absolute") {
			$S("CLCP").position = "relative";
		}
		_CLCPinitHex = (CLCPisHex(_CLCPinitHex)) ? _CLCPinitHex : "#FFFFFF";
		_CLCPabsPos = CLCPabsPos($G("CLCP"));
		$G("CLCPbasicHex").value = _CLCPinitHex;
		CLCPupdateBasicFromForm(null,"CLCPbasicHex");

		var _btns = ["CLCPbasicHex","CLCPbasicR","CLCPbasicG","CLCPbasicB","CLCPbasicH","CLCPbasicS","CLCPbasicV","CLCPbasicC","CLCPbasicM","CLCPbasicY","CLCPbasicK"];
		for (_i=0;_i<_btns.length;_i++) {
			if (["CLCPbasicC","CLCPbasicM","CLCPbasicY","CLCPbasicK"].CLCPin_array(_btns[_i]) == false) {
				$G(_btns[_i]).onblur = $G(_btns[_i]).onkeyup = function(_event) {
					_event = (_event) ? CLCPdomEvent(_event) : CLCPdomEvent(window.event);
					CLCPupdateBasicFromForm(_event,_event.target.id,true);
				}
			}

			$G(_btns[_i]).onkeydown = function(_event) {
				_event = (_event) ? CLCPdomEvent(_event) : CLCPdomEvent(window.event);
				var _val = $G(_event.target.id).value;
				if ([40,38].CLCPin_array(_event.code)) {
					_val = (_event.target.id == "CLCPbasicHex") ? CLCPhex2dec(_val) : parseInt(_val);
					(_event.code == 40) ? ((CLCPwithin(--_val,_CLCPbasicLimits[_event.target.id][0],_CLCPbasicLimits[_event.target.id][1])) ? "" : _val++) : ((CLCPwithin(++_val,_CLCPbasicLimits[_event.target.id][0],_CLCPbasicLimits[_event.target.id][1])) ? "" : _val--);
					_val = (_event.target.id == "CLCPbasicHex") ? CLCPdec2hex(_val).toString().CLCPpadHex() : _val;
					$G(_event.target.id).value = _val;
				}
				if ([13,40,38].CLCPin_array(_event.code)) {
					CLCPupdateBasicFromForm(_event,_event.target.id);
				}
			}
		}
	}

	CLCPDragPicker = function(_event) {
		if (_CLCPisDraggable == true) {
			var _xOffset = (_mouseCoords[0] - _CLCPOffset.x);
			if ($S("CLCP").position == "absolute") {
				_xOffset = (_xOffset < 0) ? 0 : _xOffset;
			}
			var _yOffset = (_mouseCoords[1] - _CLCPOffset.y);
			if ($S("CLCP").position == "absolute") {
				_yOffset = (_yOffset < 0) ? 0 : _yOffset;
			}
			$S("CLCP").left = (_xOffset + "px");
			$S("CLCP").top = (_yOffset + "px");
		}
	}

	CLCPMouseHandlerOnMouseMove = function(_event) {
		var _scrollTop = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
		var _scrollLeft = (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;

		_event = (_event) ? _event : event;
		_mouseCoords = (document.all) ? [event.clientX + _scrollLeft,event.clientY + _scrollTop] : [_event.pageX,_event.pageY];

		if (_clickMouseLocale == "CLCPPicker") {
			CLCPdrag(_event);
		} else if (_canDragPicker) {
			CLCPDragPicker(_event);
		}
	}

	CLCPMouseHandlerOnMouseUp = function(_event) {
		document.onselectstart = function() {
			return true;
		}

		if (_clickMouseLocale == "CLCPPicker") {
			_stop = 1;
		}
		_clickMouseLocale = "";
		_canDragPicker = false;
		_clickMouseLocaleCLCPIinnerShell = false;
	}

	CLCPshowPicker = function(_obj) {
		var _x = (_obj && _obj._x) ? _obj._x : _mouseCoords[0];
		var _y = (_obj && _obj._y) ? _obj._y : _mouseCoords[1];

		if ($S("CLCP").position == "relative") {
			_x -= _CLCPabsPos.x;
			_y -= _CLCPabsPos.y;
		}

		if (_obj && CLCPisHex(_obj._hex)) {
			$G("CLCPbasicHex").value = _obj._hex;
			CLCPupdateBasicFromForm(null,"CLCPbasicHex");
		}

		$S("CLCP").left = (_x + "px");
		$S("CLCP").top = (_y + "px");
		$S("CLCP").display = "block";
	}

	CLCPhidePicker = function() {
		$S("CLCP").display = "none";
	}

	CLCPagent = function(_agent) {
		return Math.max(navigator.userAgent.toLowerCase().indexOf(_agent),0);
	}

	CLCPslide = function(_dH,_object,_event) {
		_clickMouseLocale = "CLCPPicker";
		document.onselectstart = function() {
			return false;
		}
		if (_stop) {
			_stop = 0;

			_dragHandleStyle = $S(_dH);
			_dragHandle = _dH;
			_absolutePosition = CLCPabsPos($G(_object)), tX, tY;
			_absolutePosition.x += 7;
			_absolutePosition.y += 7;

			CLCPdrag(_event);
		}
	}

	CLCPXY = function(_event) {
		var _scrollTop = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
		var _scrollLeft = (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
		return CLCPagent("msie") ? [event.clientX + _scrollLeft,event.clientY + _scrollTop] : [_event.pageX,_event.pageY];
	}

	CLCPtXY = function(_event) {
		tY = CLCPXY(_event)[1] - _absolutePosition.y;
		tX = CLCPXY(_event)[0] - _absolutePosition.x;
	}

	CLCPckHSV = function(a,b,_dragHandle) {
		if (CLCPwithin(a,0,b)) {
			return a;
		} else if (a > b) {
			return b;
		} else if (a < 0) {
			if (_dragHandle == "CLCPbasicSatValSlide") {
				return -3;
			} else {
				return -4;
			}
		}
	}

	CLCPwithin = function(_val,_low,_high) {
		return ((_val >= _low) && (_val <= _high));
	}

	CLCPmkHSV = function(a,b,c) {
		return Math.min(a,Math.max(0,Math.ceil((parseInt(c) / b) * a)));
	}

	CLCPdrag = function(_event) {
		_event = (!_event) ? window.event : _event;
		if (!_stop) {
			CLCPtXY(_event);

			clearTimeout(_refreshTimeout);
			if (_dragHandle == "CLCPSatValSlide") {
				_dragHandleStyle.left = CLCPckHSV(tX,wSV,_dragHandle) + "px";
				_dragHandleStyle.top = CLCPckHSV(tY,wSV,_dragHandle) + "px";

				$S("CLCPSatSlide").top = Math.floor((CLCPckHSV(tX,wSV,"CLCPSatValSlide") / wSV) * _hueTrackHeight) + "px";
				$S("CLCPValSlide").top = Math.floor((CLCPckHSV(tY,wSV,"CLCPSatValSlide") / wSV) * _hueTrackHeight) + "px";
				HSV[1] = CLCPmkHSV(100,wSV,_dragHandleStyle.left);
				HSV[2] = 100 - CLCPmkHSV(100,wSV,_dragHandleStyle.top);
			} else if (_dragHandle == "CLCPHueSlide") {
				var ck = CLCPckHSV(tY,_hueTrackHeight,_dragHandle);
				_dragHandleStyle.top = (ck + "px");
				HSV[0] = CLCPmkHSV(360,_hueTrackHeight,ck);
			} else if (_dragHandle == "CLCPSatSlide") {
				var ck = CLCPckHSV(tY,_hueTrackHeight,_dragHandle);
				_dragHandleStyle.top = (ck + "px");
				$S("CLCPSatValSlide").left = Math.floor((CLCPckHSV(tY,_hueTrackHeight,"CLCPSatValSlide") / _hueTrackHeight) * wSV) + "px";
				HSV[1] = CLCPmkHSV(100,_hueTrackHeight,ck);
			} else if (_dragHandle == "CLCPValSlide") {
				var ck = CLCPckHSV(tY,_hueTrackHeight,_dragHandle);
				_dragHandleStyle.top = (ck + "px");
				$S("CLCPSatValSlide").top = Math.floor((CLCPckHSV(tY,_hueTrackHeight,"CLCPSatValSlide") / _hueTrackHeight) * wSV) + "px";
				HSV[2] = (100 - CLCPmkHSV(100,_hueTrackHeight,ck));
			}

			$S("CLCPSatVal").backgroundColor = $S("CLCPSat").backgroundColor = $S("CLCPVal").backgroundColor = ("#" + CLCPhsv2hex([HSV[0],100,100]));
			if (CLCPHandler) {
				CLCPHandler(CLCPhsv2hex(HSV));
			}
			CLCPupdateBasicFormElements();
		}
	}

	CLCPupdateBasicFormElements = function(_except) {
		if (_except != "CLCPbasicHex") {
			$G("CLCPbasicHex").value = CLCPhsv2hex(HSV);
		}

		var _rgb = CLCPhsv2rgb(HSV);
		if (_except != "CLCPbasicR") {
			$G("CLCPbasicR").value = parseInt(_rgb[0]);
		}
		if (_except != "CLCPbasicG") {
			$G("CLCPbasicG").value = parseInt(_rgb[1]);
		}
		if (_except != "CLCPbasicB") {
			$G("CLCPbasicB").value = parseInt(_rgb[2]);
		}

		if (_except != "CLCPbasicH") {
			$G("CLCPbasicH").value = parseInt(HSV[0]);
		}
		if (_except != "CLCPbasicS") {
			$G("CLCPbasicS").value = parseInt(HSV[1]);
		}
		if (_except != "CLCPbasicV") {
			$G("CLCPbasicV").value = parseInt(HSV[2]);
		}

		var _cmyk = CLCPrgb2cmyk(CLCPhsv2rgb(HSV));
		if (_except != "CLCPbasicC") {
			$G("CLCPbasicC").value = parseInt(_cmyk[0]);
		}
		if (_except != "CLCPbasicM") {
			$G("CLCPbasicM").value = parseInt(_cmyk[1]);
		}
		if (_except != "CLCPbasicY") {
			$G("CLCPbasicY").value = parseInt(_cmyk[2]);
		}
		if (_except != "CLCPbasicK") {
			$G("CLCPbasicK").value = parseInt(_cmyk[3]);
		}
	}

	CLCPupdateBasicFromForm = function(_event,_elementID) {
		if (_elementID == "") {
			_event = (_event) ? _event : window.event;
			if (_event.srcElement) {
				_event.target = _event.srcElement;
			}
			var _id = _event.target.id;
		} else {
			var _id = _elementID;
		}
		var _val = $G(_id).value, _canUpdate = false, _skipHSV = false;

		if (_id == "CLCPbasicHex") {
			if (CLCPisHex(_val)) {
				HSV = CLCPrgb2hsv(CLCPhex2rgb(_val));
				_canUpdate = true, _skipHSV = true;
			}
		} else if (_id == "CLCPbasicR") {
			_val = parseInt(_val);
			if (CLCPwithin(_val,0,255)) {
				var _rgb = CLCPhsv2rgb(HSV);
				HSV = CLCPrgb2hsv([_val,_rgb[1],_rgb[2]]);
				_canUpdate = true;
			}
		} else if (_id == "CLCPbasicG") {
			_val = parseInt(_val);
			if (CLCPwithin(_val,0,255)) {
				var _rgb = CLCPhsv2rgb(HSV);
				HSV = CLCPrgb2hsv([_rgb[0],_val,_rgb[2]]);
				_canUpdate = true;
			}
		} else if (_id == "CLCPbasicB") {
			_val = parseInt(_val);
			if (CLCPwithin(_val,0,255)) {
				var _rgb = CLCPhsv2rgb(HSV);
				HSV = CLCPrgb2hsv([_rgb[0],_rgb[1],_val]);
				_canUpdate = true;
			}
		} else if (_id == "CLCPbasicH") {
			_val = parseInt(_val);
			if (CLCPwithin(_val,0,360)) {
				HSV = [_val,HSV[1],HSV[2]]
				_canUpdate = true;
			}
		} else if (_id == "CLCPbasicS") {
			_val = parseInt(_val);
			if (CLCPwithin(_val,0,360)) {
				HSV = [HSV[0],_val,HSV[2]]
				_canUpdate = true;
			}
		} else if (_id == "CLCPbasicV") {
			_val = parseInt(_val);
			if (CLCPwithin(_val,0,360)) {
				HSV = [HSV[0],HSV[1],_val]
				_canUpdate = true;
			}
		} else if ((_id == "CLCPbasicC") || (_id == "CLCPbasicM") || (_id == "CLCPbasicY") || (_id == "CLCPbasicK")) {
			_c = parseInt($G("CLCPbasicC").value);
			_m = parseInt($G("CLCPbasicM").value);
			_y = parseInt($G("CLCPbasicY").value);
			_k = parseInt($G("CLCPbasicK").value);

			if (_id == "CLCPbasicC") {
				_c = (CLCPwithin(_c,0,100)) ? _c : 0;
			} else if (_id == "CLCPbasicM") {
				_m = (CLCPwithin(_m,0,100)) ? _m : 0;
			} else if (_id == "CLCPbasicY") {
				_y = (CLCPwithin(_y,0,100)) ? _y : 0;
			} else if (_id == "CLCPbasicK") {
				_k = (CLCPwithin(_k,0,100)) ? _k : 0;
			}
			HSV = CLCPrgb2hsv(CLCPcmyk2rgb([_c,_m,_y,_k]));
			_canUpdate = true;
		}

		if (_canUpdate) {
			var _hueSliderY = CLCPh2y(HSV[0]);
			var _satSliderY = CLCPs2y(HSV[1]);
			var _valSliderY = CLCPv2y(HSV[2]);

			$S("CLCPHueSlide").top = Math.floor(CLCPckHSV((_hueSliderY - 3),_hueTrackHeight + 3,"CLCPHueSlide")) + "px";
			$S("CLCPSatSlide").top = Math.floor(CLCPckHSV((_satSliderY - 3),_hueTrackHeight + 3,"CLCPSatSlide")) + "px";
			$S("CLCPValSlide").top = Math.floor(CLCPckHSV((_valSliderY - 3),_hueTrackHeight + 3,"CLCPValSlide")) + "px";

			$S("CLCPSatValSlide").left = Math.ceil(CLCPckHSV((_satSliderY - 7),wSV,"CLCPSatValSlide")) + "px";
			$S("CLCPSatValSlide").top = Math.ceil(CLCPckHSV((_valSliderY - 7),wSV,"CLCPSatValSlide")) + "px";
			$S("CLCPSatVal").backgroundColor = $S("CLCPSat").backgroundColor = $S("CLCPVal").backgroundColor = ("#" + CLCPhsv2hex([HSV[0],100,100]));
			var _tmp = (_skipHSV == false) ? CLCPhsv2hex(HSV) : _val;

			if (CLCPHandler) {
				CLCPHandler(_tmp);
			}
			CLCPupdateBasicFormElements(_id);
		}
	}


	/* CONVERSIONS */
	CLCPh2y = function(_hue) {
		return ((_hue / 360) * _hueTrackHeight);
	}
	CLCPs2y = function(_satVal) {
		return ((_satVal / 100) * _hueTrackHeight);
	}
	CLCPv2y = function(_valVal) {
		return (Math.abs(((_valVal / 100) * (_hueTrackHeight + 3)) - _hueTrackHeight - 3));
	}
	CLCPhsv2hex = function(h) {
		return CLCPrgb2hex(CLCPhsv2rgb(h));
	}
	CLCPtoHex = function(v) {
		v=Math.round(Math.min(Math.max(0,v),255)); return("0123456789ABCDEF".charAt((v-v%16)/16)+"0123456789ABCDEF".charAt(v%16));
	}
	CLCPhex2rgb = function(r) {
		return({0:parseInt(r.substr(0,2),16),1:parseInt(r.substr(2,2),16),2:parseInt(r.substr(4,2),16)});
	}
	CLCPrgb2hex = function(r) {
		return(CLCPtoHex(r[0])+CLCPtoHex(r[1])+CLCPtoHex(r[2]));
	}
	CLCPrgb2hsv = function(r) {
		var max=Math.max(r[0],r[1],r[2]), delta=max-Math.min(r[0],r[1],r[2]), H, S, V;
		if(max!=0) {
			S=Math.round(delta/max*100);
			if(r[0]==max) H=(r[1]-r[2])/delta; else if(r[1]==max) H=2+(r[2]-r[0])/delta; else if(r[2]==max) H=4+(r[0]-r[1])/delta; var H=Math.min(Math.round(H*60),360); if(H<0) H+=360;
		}
		return({0:H?H:0,1:S?S:0,2:Math.round((max/255)*100)});
	}
	CLCPhsv2rgb = function(r) {
		var F, R, B, G, H=r[0]/360, S=r[1]/100, V=r[2]/100;
		if(S>0) {
			if(H>=1) H=0;
			H=6*H; F=H-Math.floor(H); A=Math.round(255*V*(1-S)); B=Math.round(255*V*(1-(S*F))); C=Math.round(255*V*(1-(S*(1-F)))); V=Math.round(255*V);
			switch(Math.floor(H)) {
				case 0: R=V; G=C; B=A; break;
				case 1: R=B; G=V; B=A; break;
				case 2: R=A; G=V; B=C; break;
				case 3: R=A; G=B; B=V; break;
				case 4: R=C; G=A; B=V; break;
				case 5: R=V; G=A; B=B; break;
			}
			return([R?R:0,G?G:0,B?B:0]);
		}
		else return([(V=Math.round(V*255)),V,V]);
	}
	CLCPrgb2cmyk = function(r) {
		var C=1-(r[0]/255), M=1-(r[1]/255), Y=1-(r[2]/255), K=Math.min(Y,Math.min(M,Math.min(C,1)));
		C=Math.round((C-K)/(1-K)*100);
		C = (isNaN(C)) ? 0 : C;
		M=Math.round((M-K)/(1-K)*100);
		M = (isNaN(M)) ? 0 : M;
		Y=Math.round((Y-K)/(1-K)*100);
		Y = (isNaN(Y)) ? 0 : Y;
		K=Math.round(K*100);
		return([C?C:0,M?M:0,Y?Y:0,K]);
	}
	CLCPcmyk2rgb = function(r) {
		r[3]=r[3]/100; var R=(1-(r[0]/100*(1-r[3])+r[3]))*255, G=(1-(r[1]/100*(1-r[3])+r[3]))*255, B=(1-(r[2]/100*(1-r[3])+r[3]))*255;
		return([R,G,B]);
	}