Parse.initialize("BnGiWDWDjLiOakfubnazWrs60ToHwgHy40lspsjt", "0xW4A6mq0vl0H29GaApu9xHu9MBaARcua2pB6Bur");

function parse(){
	username=Parse.User.current().get("username");
	var User = Parse.Object.extend("User");
	var query = new Parse.Query(User);
	query.equalTo("username", username);
	query.first({
		success: function(result) {
			if (result.get("alias") != null){
				document.getElementById("alias").value=result.get("alias");
			}
			if (result.get("first_name") != null){
				document.getElementById("fn").value=result.get("first_name");
			}
			if (result.get("last_name") != null){
				document.getElementById("ln").value=result.get("last_name");
			}
			if (result.get("motto") != null){
				document.getElementById("motto").value=result.get("motto");
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});

}

function update(){
	username=Parse.User.current().get("username");
	var User = Parse.Object.extend("User");
	var user = new Parse.Query(User);
	user.equalTo("username", username);
	user.first({
		success: function(object) {
			alert(object.get("alias"));
			if (document.getElementById("alias").value != null){
				object.set("alias", document.getElementById("alias").value);
			}
			if (document.getElementById("fn").value != null){
				object.set("first_name", document.getElementById("fn").value);
			}
			if (document.getElementById("ln").value != null){
				object.set("last_name", document.getElementById("ln").value);
			}
			if (document.getElementById("motto").value != null){
				object.set("motto", document.getElementById("motto").value);
			}
			object.save();
			alert("success");
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}