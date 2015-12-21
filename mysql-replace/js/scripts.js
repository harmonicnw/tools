$(document).ready(function() {
	$("#replace").initForm();
});

$.fn.initForm = function() {
	$("#tableName").val('wp_posts');
	$("#fieldName").val('post_content');

	$(this).submit( function(e){
		var tableName = $("#tableName").val();
		var fieldName = $("#fieldName").val();
		var stringToFind = $("#stringToFind").val();
		var stringToReplace = $("#stringToReplace").val();
		
		$("#results").html( "update " + tableName + " set " + fieldName + " = replace(" + fieldName + ", '" + stringToFind + "','" + stringToReplace + "');" ).show();
		
		e.preventDefault();
	});
}