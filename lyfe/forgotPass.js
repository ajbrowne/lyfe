Parse.initialize("BnGiWDWDjLiOakfubnazWrs60ToHwgHy40lspsjt", "0xW4A6mq0vl0H29GaApu9xHu9MBaARcua2pB6Bur");

function resetPass(){
	var username = document.getElementById("email").value;
	Parse.User.requestPasswordReset(username, {
  		success: function() {
   			// Password reset request was sent successfully
    		$('#myModal').modal('show');
  		},
  		error: function(error) {
    		// Show the error message somewhere
    		alert("Error: " + error.code + " " + error.message);
  		}
	});
}
