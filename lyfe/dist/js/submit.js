
var status = -1;

function check(){
	//$('input[type="radio"]:checked').parent('good').addClass('active');
}

function addMessage(){
Parse.initialize("BnGiWDWDjLiOakfubnazWrs60ToHwgHy40lspsjt", "0xW4A6mq0vl0H29GaApu9xHu9MBaARcua2pB6Bur");
if(document.getElementById("message").value==""){
	document.getElementById("modalBody").innerHTML="Please enter your suggestion!";
	//document.getElementById("continue").prop('disabled', true);
} else if(status==-1){
	document.getElementById("modalBody").innerHTML="Please select a suggestion type!";
	//$('continue').prop('disabled', true);
}else{
	var Message = Parse.Object.extend("Pending");
 	var message = new Message();
 	var add = document.getElementById("message").value;
 	
    message.set("type", ""+status);

 	message.set("Message", add);

 	message.save(null, {
  		success: function(message) {
    		//alert('Your submission is pending approval.');
		document.getElementById("modalBody").innerHTML="Congratulations, your submission is being approved!";
		//window.location.replace("./submit.html");
  		},
  		error: function(message, error) {
   			//alert('Failed to create new object, with error code: ' + error.description);
			document.getElementById("modalBody").innerHTML='Failed to create new object, with error code: ' + error.description;
  		}
	});
	//alert("test");
}
}

function forward(){
	window.location.replace("./submit.html");
}

function setCompliment(){
  status=0;
  //alert("COMPLIMENT SET");
}

function setInsult(){
  status=1;
  //alert("INSULT SET");
}