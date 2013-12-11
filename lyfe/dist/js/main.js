Parse.initialize("BnGiWDWDjLiOakfubnazWrs60ToHwgHy40lspsjt", "0xW4A6mq0vl0H29GaApu9xHu9MBaARcua2pB6Bur");

function parse(){
  username=Parse.User.current().get("username");
  var name = username.split("@");
  document.getElementById("username").innerHTML=name[0];
  var User = Parse.Object.extend("User");
  var user = new Parse.Query(User);
  user.equalTo("username", username);
  user.first({
    success: function(object) {
      document.getElementById("motto").innerHTML=object.get("motto");
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

function post(){
  var Note = Parse.Object.extend("Posts");
  var note = new Note();

  message = document.getElementById("message").value;
  note.set("content", message);

  note.save(null, {
  success: function(note) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + note.id);
  },
  error: function(note, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and description.
    alert('Failed to create new object, with error code: ' + note.description);
  }
});
}




