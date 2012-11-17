$(document).ready(function() {
	$(".radioList").each(function(){
		$(this).find("li").click(function() {
			$(this).find("input:radio:first").attr("checked", "checked");
            $(this).parent().find("li").each(function() {
              $(this).find("input:radio:first").attr("checked") ? $(this).addClass("selected") : $(this).removeClass("selected");
            })
		})
	})
});