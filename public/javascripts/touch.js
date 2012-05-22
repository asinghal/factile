$(document).ready(function() {
	$(".radioList").each(function(){
		$(this).find("li").click(function() {
			$(this).find("input:radio:first").attr("checked", "checked");
		})
	})
});