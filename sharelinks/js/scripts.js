$(document).ready(function() {
	notRequired = $("#subject, #body"); // set inputs that are not required
	
	updateFromUrlVars();
	initTypeSelect();
	showResults();
	
	// init validation
	$("#shareInfo").validate();
});

var selectedTypes = {};
var notRequired;

function getQueryString() {
	var inputs = $("#shareInfo").find("input[type=text]:visible, input[type=hidden], textarea:visible");
	var queryString = "?";
	inputs.each( function(i) {
		if ( i > 0 ) queryString += "&";
		queryString += $(this).prop("name") + "=" + encodeURIComponent( $(this).val() );
		console.log( "getQueryString: name = " + $(this).prop("name") + ", val = " + $(this).val() + ", encoded val = " + encodeURIComponent( $(this).val() ) );
	});
	return queryString;
}

function gup( name ) {
  //if (name == undefined) { return false };
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return null;
  else
    return results[1];
}

function initTypeSelect() {
	//console.log("initTypeSelect");
	
	var links = $(".linkTypeSelect > li > a");
	
	links.each( function() {
		$(this).click( function(e) {
			if ( $(this).parent("li").hasClass("active") ) {
				$(this).parent("li").removeClass("active");
			} else {
				$(this).parent("li").addClass("active");
			}
			updateForm();
			
			e.preventDefault();
			$(this).blur();
		});
	});
	
	$("#shareInfo").submit(function(e) {
		if ( $(this).valid() ) {
			var qVars = getQueryString();
			var newLocation = window.location.protocol + "//" + window.location.host + window.location.pathname + qVars;
			console.log("new location = " + newLocation);
			window.location = newLocation;
		}
		
		e.preventDefault();
		$(this).blur();
	});
	
	updateForm(true);
}

function showResults() {
	var resultsTable = $("<table class='resultsTable' />");

	if ( selectedTypes.hasOwnProperty("facebook") ) {
		var url = gup("url");
		var title = gup("title");
		selectedTypes.facebook.class = "facebook";
		selectedTypes.facebook.label = "Facebook";
		selectedTypes.facebook.url = "http://www.facebook.com/sharer.php?u=" + url + "&t=" + title;
		//resultsTable.addResultRow("facebook", selectedTypes.facebook.url);
	}
	
	if ( selectedTypes.hasOwnProperty("twitter") ) {
		var tweet = gup("tweet");
		selectedTypes.twitter.class = "twitter";
		selectedTypes.twitter.label = "Twitter";
		selectedTypes.twitter.url = "http://twitter.com/intent/tweet?text=" + tweet;
	}
	
	if ( selectedTypes.hasOwnProperty("linkedin") ) {
		var url = gup("url");
		var title = gup("title");
		var description = gup("description");
		selectedTypes.linkedin.class = "linkedin";
		selectedTypes.linkedin.label = "LinkedIn";
		selectedTypes.linkedin.url = "http://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title + "&summary=" + description;
	}
	
	if ( selectedTypes.hasOwnProperty("email") ) {
		var to = gup("to");
		var subject = gup("subject");
		var body = gup("body");
		selectedTypes.email.class = "email";
		selectedTypes.email.label = "Email";
		selectedTypes.email.url = "mailto:" + to + "?";
		if (subject != "") {
			selectedTypes.email.url += "subject=" + subject + "&";
		}
		if (body != "") {
			 selectedTypes.email.url += "body=" + body;
		}
	}
	
	var resultsTable = $("<table class='resultsTable' cellpadding='0' cellspacing='0' />");
	for (var key in selectedTypes) {
		if (selectedTypes.hasOwnProperty(key)) {
			if ( key == "email" ) {
				var target = "";
			} else {
				var target = " target='_blank'";
			}
			resultsTable.append("<tr class='" + selectedTypes[key].class + "'><td class='service' valign='middle'><img src='images/spacer.png' width='36' height='36' /></td><td class='link' valign='middle'>" + selectedTypes[key].url + "</td><td class='demo'><a href='" + selectedTypes[key].url + "'" + target + " valign='middle'>Click to test</a></td></tr>");
		}
	}	
	if (resultsTable.find("tr").length > 0) {
		resultsTable.find("tr:even").addClass("alt");
		$(".results").empty().append( resultsTable );
		initToggleGenerator();
	} else {		
		// if nothing is selected, select facebook and twitter and linkedin
		if ( $(".linkTypeSelect li.active").length == 0 ) {
			$(".linkTypeSelect").find("li.facebook, li.twitter, li.linkedin").addClass("active");
		}
		updateForm(true);
	}
}

function initToggleGenerator() {
	$(".toggleGenerator").show();
	var link = $(".toggleGenerator").find("a");
	var target = $("#generator");
	var linkShowText = link.text();
	var linkHideText = "Hide Link Generator &#187;";
	
	link.click( function() {
		if (target.is(":visible")) {
			target.slideUp(300);
			link.html(linkShowText);
		} else {
			target.slideDown(300);
			link.html(linkHideText);
		}
	});
	
	target.hide();
}

function updateForm() {
	if (arguments[0]) {
		var firstTime = true;
	} else {
		var firstTime = false;
	}

	/*selectedTypes.email = $(".linkTypeSelect > li.email").hasClass("active");
	selectedTypes.facebook = $(".linkTypeSelect > li.facebook").hasClass("active");
	selectedTypes.linkedin = $(".linkTypeSelect > li.linkedin").hasClass("active");
	selectedTypes.twitter = $(".linkTypeSelect > li.twitter").hasClass("active");*/
	if ( $(".linkTypeSelect > li.email").hasClass("active") ) selectedTypes.email = {}; else delete selectedTypes.email;
	if ( $(".linkTypeSelect > li.facebook").hasClass("active") ) selectedTypes.facebook = {}; else delete selectedTypes.facebook;
	if ( $(".linkTypeSelect > li.linkedin").hasClass("active") ) selectedTypes.linkedin = {}; else delete selectedTypes.linkedin;
	if ( $(".linkTypeSelect > li.twitter").hasClass("active") ) selectedTypes.twitter = {}; else delete selectedTypes.twitter;
	
	// url
	if (selectedTypes.facebook || selectedTypes.linkedin) {
		$("#shareInfo .rowUrl").showFormRow( firstTime );
	} else {
		$("#shareInfo .rowUrl").hideFormRow( firstTime );
	}
	
	// title
	if (selectedTypes.facebook || selectedTypes.linkedin) {
		$("#shareInfo .rowTitle").showFormRow( firstTime );
	} else {
		$("#shareInfo .rowTitle").hideFormRow( firstTime );
	}
	
	// description
	if (selectedTypes.facebook || selectedTypes.linkedin) {
		$("#shareInfo .rowDescription").showFormRow( firstTime );
	} else {
		$("#shareInfo .rowDescription").hideFormRow( firstTime );
	}
	
	// subject, body
	if (selectedTypes.email) {
		$("#shareInfo .rowTo").showFormRow( firstTime );
		$("#shareInfo .rowSubject").showFormRow( firstTime );
		$("#shareInfo .rowBody").showFormRow( firstTime );
	} else {
		$("#shareInfo .rowTo").hideFormRow( firstTime );
		$("#shareInfo .rowSubject").hideFormRow( firstTime );
		$("#shareInfo .rowBody").hideFormRow( firstTime );
	}
	
	// tweet 
	if (selectedTypes.twitter) {
		$("#shareInfo .rowTweet").showFormRow( firstTime );
	} else {
		$("#shareInfo .rowTweet").hideFormRow( firstTime );
	}
	
	// set hidden input that keeps track of selected types
	var typesArr = [];
	if (selectedTypes.email) typesArr.push("email");
	if (selectedTypes.facebook) typesArr.push("facebook");
	if (selectedTypes.linkedin) typesArr.push("linkedin");
	if (selectedTypes.twitter) typesArr.push("twitter");
	var types = typesArr.join(",");
	
	$("#shareInfo #types").val(types);
}

function updateFromUrlVars() {
	$("#shareInfo").find("input[type=text], input[type=hidden], textarea").each( function() {
		var newValue = gup( $(this).prop("name") );
		//console.log("my new val is " + newValue);
		if (newValue !== null) {
			$(this).val( decodeURIComponent( newValue ) );
		} else {
			$(this).val( $(this).prop("value") );
		}
	});
	updateTypesFromUrlVar( decodeURIComponent( gup( "types" ) ) );
}

function updateTypesFromUrlVar( list ) {
	var listTypesArr = list.split(",");
	for (var i = 0; i < listTypesArr.length; i++) {
		$(".linkTypeSelect ." + listTypesArr[i]).addClass("active");
	}
}

$.fn.showFormRow = function( firstTime ) {
	if (firstTime) {
		$(this).show();
	} else {
		$(this).slideDown(300);
	}
	
	// add validation
	$(this).find("input[type=text], textarea").not( notRequired ).addClass("required");
}
$.fn.hideFormRow = function( firstTime ) {
	if (firstTime) {
		$(this).hide();
	} else {
		$(this).slideUp(300);
	}
	
	// remove validation
	$(this).find("input[type=text], textarea").not( notRequired ).removeClass("required");
}