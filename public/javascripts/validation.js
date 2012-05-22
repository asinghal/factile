$(document).ready(function() {
  $("#response_form").submit(function() {
    var valid = true;
    var first = true;
    $("#response_form").find("input.required:text").each(function() {
    	if (!$(this).val() || $(this).val() == "") {
    		valid = false;
    		$(this).attr('class', $(this).attr('class') + ' error');
        if (first) {
          $(this).focus();
          first = false;
        }
    	} else {
    		$(this).attr('class', $(this).attr('class').replace(' error', ''));
    	}
    });

    $("#response_form").find("textarea.required").each(function() {
    	if (!$(this).val() || $(this).val() == "") {
    		valid = false;
    		$(this).attr('class', $(this).attr('class') + ' error');
    	} else {
    		$(this).attr('class', $(this).attr('class').replace(' error', ''));
    	}
    });

    $("#response_form").find("input.required:radio").each(function() {
    	valid = validateOptions($(this).parent(), 'input:radio') && valid;
    });

    $("#response_form").find("input.required:checkbox").each(function() {
    	valid = validateOptions($(this).parent(), 'input:checkbox') && valid;
    });

    $("#response_form").find("select.required").each(function() {
    	var x = false;
    	$(this).find("option").each(function() {
    		if (!x && $(this).attr("selected") == "selected" && $(this).val() != "" ) {
    		  x = true;
    		}
    	});
  		var parent = $(this).parent();
    	if (!x) {
    		valid = false;
    		parent.attr('class', parent.attr('class') + ' error');
    	} else {
    		parent.attr('class', parent.attr('class').replace(' error', ''));
    	}
    });

    if(!valid) {
      $('#errorNotice').attr('class', "alert alert-error");
      $('#errorNotice').html("Please provide answers to the highlighted questions below.");
    } else {
      $('#errorNotice').attr('class', "");
      $('#errorNotice').html("");
    }

    return valid;
  });
});

function validateOptions(parent, inputtype) {
	var x = false;
	parent.find(inputtype).each(function() {
		if (!x && $(this).attr("checked")) {
			x = true;
		}
	});

  if (!x) {
	  parent.attr('class', parent.attr('class') + ' error');
  } else {
	  parent.attr('class', parent.attr('class').replace(' error', ''));
  }

  return x;
}
