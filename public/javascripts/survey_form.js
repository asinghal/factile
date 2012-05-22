var colorRegex =/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
var initial_hex = "#FFFFFF";

function applyColor(field, colorType, color) {
  if ( color != "" && colorRegex.test(color)) {
    if (colorType == "background-color") {
      $('#' + field).css({
        "background-color": color
      });
    } else {
      $('#' + field).css({
        "color": color
      });
    }
  }
}

function applyBodycolor() {
  var color = $('#bodycolor').val();
  applyColor("bodycolor", 'background-color', color);
}

function applyContainercolor() {
  var color = $('#containercolor').val();
  applyColor("containercolor", 'background-color', color);
}

function applyTextColor() {
  var color = $('#textColor').val();
  applyColor("textColor", 'color', color);
  applyColor("textColor", 'background-color', $('#containercolor').val());
}

function applyLogoBgColor() {
  var color = $('#logoBgColor').val();
  applyColor("logoBgColor", 'background-color', color);
}

function validateColor(id) {
  var valid = true;

  if ($('#' + id).val() == "" || !(colorRegex.test($('#' + id).val()))) {
    $('#' + id).attr("class", "input-xlarge error");
    $('#errorNotice').attr("style", "display: block;");
    valid = false;
  }
  return valid;
}

$(document).ready(function() {
  $('#survey_form').submit(function() {
    var valid = true;
    if ($('#surveyname').val() == "") {
      $('#surveyname').attr("class", "input-xlarge error");
      $('#errorNotice').attr("style", "display: block;");
      valid = false;
    }

    valid = validateColor('bodycolor') && valid;
    valid = validateColor('containercolor') && valid;
    valid = validateColor('textColor') && valid;
    valid = validateColor('logoBgColor') && valid;
    return valid;
  });
  applyBodycolor();
  applyContainercolor();
  applyTextColor();
  applyLogoBgColor();

  $('#bodycolor').blur(function() { applyBodycolor(); });
  $('#containercolor').blur(function() { applyContainercolor(); });
  $('#textColor').blur(function() { applyTextColor(); });
  $('#logoBgColor').blur(function() { applyLogoBgColor(); });
  $('#bodycolor').focus(function() { _whichField = 'bodycolor'; $('#CLCP').hide(); });
  $('#containercolor').focus(function() { _whichField = 'containercolor'; $('#CLCP').hide(); });
  $('#textColor').focus(function() { _whichField = 'textColor'; $('#CLCP').hide(); });
  $('#logoBgColor').focus(function() { _whichField = 'logoBgColor'; $('#CLCP').hide(); });

  // --------- Color picker
  _whichField = "bodycolor";
  CLCPHandler = function(_hex) {
    // This function gets called by the picker when the sliders are being dragged. The variable _hex contains the current hex value from the picker
    // This code serves as an example only, here we use it to do three things:
    // Here we simply drop the variable _hex into the input field, so we can see what the hex value coming from the picker is:
    document.getElementById(_whichField).value = "#" + _hex;
    if (_whichField == 'textColor') {
      document.getElementById(_whichField).style.color = "#" + _hex;
    } else {
      document.getElementById(_whichField).style.background = "#" + _hex;
    }
    // Here is where we color the BG of a div to preview the color:
    if (document.getElementById("CLCPUpdateDiv")) {
      document.getElementById("CLCPUpdateDiv").style.background = ("#" + _hex);
    }
    // Giving you control over this function really puts the reigns in your hands. Rewrite this function as you see fit to really take control of this color picker.
  }
  // Settings:
  _CLCPdisplay = "none"; // Values: "none", "block". Default "none"
  _CLCPisDraggable = true; // Values: true, false. Default true
  _CLCPposition = "absolute"; // Values: "absolute", "relative". Default "absolute"
  _CLCPinitHex = initial_hex; // Values: Any valid hex value. Default "FFFFFF"
  CLCPinitPicker();
});
