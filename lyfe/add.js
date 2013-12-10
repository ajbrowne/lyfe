
var status = 0;
var username;

function submit(){
   $("button").click(function() {
        //alert(this.id); // or alert($(this).attr('id'));
        //addMessage(this.id);
    });
}

function addLove(){
  addMessage("loveButton");
  
}

function addHate(){
 addMessage("hateButton"); 
}

function addMessage(id){
  //alert("Handle is "+document.getElementById("handle").value);
  if(document.getElementById("handle").value==""){
	document.getElementById("modalBody").innerHTML="Please enter a twitter handle!";
	//document.getElementById("continue").prop('disabled', true);
}else{
Parse.initialize("BnGiWDWDjLiOakfubnazWrs60ToHwgHy40lspsjt", "0xW4A6mq0vl0H29GaApu9xHu9MBaARcua2pB6Bur");
	var Message = Parse.Object.extend("Jobs");
	username=Parse.User.current().get("username");
 	var message = new Message();
 	//var add = document.getElementById("message").value;
 	//alert(username);
    the_handle = (document.getElementById("handle").value).replace("@","");
    message.set("userId",username);
    message.set("receiver","@"+the_handle);
    var type;
    if(id=="loveButton"){
      message.set("type","0");
      type="loving";
    }
    else{
      message.set("type","1");
      type="hateful";
    }

      message.save(null, {
  		success: function(message) {
		  document.getElementById("modalBody").innerHTML="@"+the_handle+" has been set up to recieve "+type+" tweets!";
		  //forward();
    		//alert('Your submission is pending approval.');
		//window.location.replace("./add.html");
  		},
  		error: function(message, error) {
   			//alert('Failed to create new object, with error code: ' + error.description);
  		}
	});
}
}

function forward(){
  //if(document.getElementById("handle").innerHTML!="")
  if ((document.getElementById("modalBody").innerHTML) == "Please enter a twitter handle!"){
    window.location.reload();
  }
  else{
     window.location.replace("./main.html");
  }
}

function setCompliment(){
  status=0;
  //alert("COMPLIMENT SET");
}

function setInsult(){
  status=1;
  //alert("INSULT SET");
}