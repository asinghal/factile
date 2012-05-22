var rtl = false;

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
});
