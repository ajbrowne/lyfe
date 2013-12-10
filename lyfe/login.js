Parse.initialize("BnGiWDWDjLiOakfubnazWrs60ToHwgHy40lspsjt", "0xW4A6mq0vl0H29GaApu9xHu9MBaARcua2pB6Bur");

  var currentUser = Parse.User.current();

  if(currentUser){
    window.location.replace('./main.html');
  }

function login(){
	var username = document.getElementById("email").value;
	var pass = document.getElementById("pass").value;
	Parse.User.logIn(username, pass, {
    	success: function(user) 
    	{
    		window.location.replace('./main.html');

    	},
    	error: function(user, error) {
        if(error.code == 101){
          // The login failed. Check error to see why.
          $('#myModal').modal('show');
        }
    	}
  	});
}

function register(){
  var newUser = new Parse.User();
  var username = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  newUser.set("username", username);
  newUser.set("password", pass);
  newUser.signUp(null, {
    success: function(user){
     // alert('success');
      window.location.replace('./main.html');
    },
    error: function(user, error){
      // The login failed. Check error to see why.
      alert('error '+error.code +"  "+error.message);
    }
  });
}
