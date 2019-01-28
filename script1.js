function authentication(){
	var users = jQuery("#username").val();
	var passwd = jQuery("#passwd").val();
	if (users === "" || passwd === "") {
		alert("Both username and password needs to be inserted");
	}
	else if (users !== "Luke" && passwd!== "use the force Luke") {
		jQuery(location).attr('href', "error.html");
	}
	else {
		jQuery(location).attr('href', "map_app.html");
	}
}

function redirect() {
	jQuery(location).attr('href', "index.html");
}

