var rtl = false;
var offline = false;

var surveyJson = null;

$(document).ready(function() {
	$(document).find(".sortable").each(function() {
		$(this).sortable({
			update: function(event, ui) {
				var eleOrder = $(this).sortable('toArray').toString();
				$(this).parent().find("input:hidden:first").val(eleOrder);
			}
		});
		$(this).disableSelection();
		var eleOrder = $(this).sortable('toArray').toString();
		$(this).parent().find("input:hidden:first").val(eleOrder);
	});

  if (rtl) {
		$(document).find(".row").each(function() {
			$(this).attr("style", "margin-right: 4%; float: right; direction: rtl; text-align: justify;");
		});
	}

	//navigator.onLine
});

function addQuestion(q) {
	var required = q.mandatory ? "required " : "";
	var obj = $('#response_form').find('.row:last-child');
	if (q.qType == "textbox") {
		$("<div class=\"row\"><div class=\"span12\"><b>" + q.texts[0].text + "</b> <input name=\""+ q.questionId +"\" type=\"text\" class=\"" + required + "input-xlarge\"></div><div class=\"clearfix\">&nbsp;</div><div class=\"clearfix\">&nbsp;</div></div>").insertBefore(obj);
	} else if (q.qType == "textarea") {
		$("<div class=\"row\"><div class=\"span12\"><b>" + q.texts[0].text + "</b> <textarea name=\""+ q.questionId +"\" class=\"input-xlarge\"></textarea></div><div class=\"clearfix\">&nbsp;</div><div class=\"clearfix\">&nbsp;</div></div>").insertBefore(obj);
	} else if (q.qType == "radio") {
		var options = "";
		for (var i=0; i < q.options.length; i++) {
			var o = q.options[i];
			options += "<li><input name=\""+ q.questionId +"\" type=\"radio\" value=\""+ o.value +"\" class=\"" + required + "input-xlarge\"><span> "+ o.texts[0].text +" </span><span class=\"check\">&#x2713</span></li>";
		}
		var other = "";
		if (q.hasOther) {
			other = "<span class=\"tchbtn\"><label><input name=\""+ q.questionId +"\" type=\"radio\" value=\"other\" id=\""+ q.questionId +"_other\"><span>&nbsp;</span></label> " + q.otherBox[0].text + " <input name=\""+ q.questionId +"_other\" type=\"text\" onfocus=\"$('#"+ q.questionId +"_other').attr('checked', 'checked');\"></span>";
		}
    var html = "<div class=\"row\"><div class=\"span12\"><b>" + q.texts[0].text + "</b><div id=\""+ q.questionId +"_options\" class=\"required\"><ul class=\"radioList\">"+ options +"</ul>" + other + "</div></div><div class=\"clearfix\">&nbsp;</div><div class=\"clearfix\">&nbsp;</div></div>";
    $(html).insertBefore(obj);
	} else if (q.qType == "checkbox") {
		var options = "";
		for (var i=0; i < q.options.length; i++) {
			var o = q.options[i];
			options += "<li><label><input name=\""+ q.questionId +"\" type=\"checkbox\" value=\""+ o.value +"\" class=\"" + required + "input-xlarge\"><span>&nbsp;</span><span> "+ o.texts[0].text +" </span></label></li>";
		}
		if (q.hasOther) {
			options += "<li><label><input name=\""+ q.questionId +"\" type=\"checkbox\" value=\"other\" id=\""+ q.questionId +"_other\"><span>&nbsp;</span></label> "+ q.otherBox[0].text +" <input name=\""+ q.questionId +"_other\" type=\"text\" onfocus=\"$('#"+ q.questionId +"_other').attr('checked', 'checked');\"></li>";
		}
    var html = "<div class=\"row\"><div class=\"span12\"><b>"+ q.texts[0].text +"</b><div id=\""+ q.questionId +"_options\" class=\"required tchbtn\"><ul>" + options + "</ul></div></div><div class=\"clearfix\">&nbsp;</div><div class=\"clearfix\">&nbsp;</div></div>";
    $(html).insertBefore(obj);
	} else if (q.qType == "dropdown") {
		var options = "";
		for (var i=0; i < q.options.length; i++) {
			var o = q.options[i];
			options += "<option value=\""+ o.value +"\">"+ o.texts[0].text +"</option>";
		}
		if (q.hasOther) {
			options += "<option value=\"other\">"+ q.otherBox[0].text +"</option>";
		}
    var html = "<div class=\"row\"><div class=\"span12\"><b>" + q.texts[0].text + "</b><div id=\""+ q.questionId +"_options\" class=\"" + required + "\"><select name=\""+ q.questionId +"\" id=\""+ q.questionId +"\"  class=\"" + required + " input-xlarge\">" + options + "</select></div></div><div class=\"clearfix\">&nbsp;</div><div class=\"clearfix\">&nbsp;</div></div>";
    $(html).insertBefore(obj);
	}
}

function serializeStoredData() {
  var data = "";
  for (var key in localStorage){
    if (key != 'survey') {
      if (data != "") data += "&";
      data += (key + "=" + localStorage.getItem(key));
    }
  }
  return data;
}

function addLastNote(thank_you_text) {
	var obj = $('#response_form').find('.row:last-child');
  var html = "<div class=\"row\"><div class=\"span12\">" + thank_you_text + "</div><div class=\"clearfix\">&nbsp;</div></div>";
  $(html).insertBefore(obj);
  obj.remove();
}

var hasLocalStorage = function(){
	try{
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch(err){
		return false;
	}
}

function workoffline(url) {
	$.ajax({
	  type: "GET",
	  cache: false,
	  dataType: "json",
	  url: url,
	  success: function( response) {
	  	if (!hasLocalStorage()) {
		    alert("Sorry but this feature is not available for your browser.");
	  	} else {
	  		offline = true;
	  		surveyJson = response;
	  		var ls = window.localStorage;
	  		ls.setItem("survey", JSON.stringify(response) );
	  		$('#workoffline').html("<a class='btn btn-success btn-mini' href='" + url.replace('downloadSurvey', 'surveys').replace('/offline', '') + " '>Send Responses</a>");
	  	}
	  }
	});
}

