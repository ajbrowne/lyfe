var myList = [{"name" : "abc", "age" : 50},
{"age" : "25", "hobby" : "swimming"},
{"name" : "xyz", "hobby" : "programming"}];


var theResult;
function parse(){
    Parse.initialize("BnGiWDWDjLiOakfubnazWrs60ToHwgHy40lspsjt", "0xW4A6mq0vl0H29GaApu9xHu9MBaARcua2pB6Bur");
    var TestObject = Parse.Object.extend("Pending");
    /*var testObject = new TestObject();
    testObject.set("userId","Alex");
    testObject.save(null, {
    success: function(testObject) {
        alert("yay! it worked");
        },
    error: function(testObject, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and description.
        alert('Failed to create new object, with error code: ' + error.description);
        }
    });*/
var query = new Parse.Query(TestObject);
query.find({
  success: function(results) {
   theResult=results;
    //alert("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    
    for (var i = 0; i < results.length; i++) { 
      var object = results[i];
      //alert(object.id + ' - ' + object.get('userId'));
  }
    //buildHtmlTable();
    insertTable();
},
error: function(error) {
    alert("Error: " + error.code + " " + error.message);
}

});

//alert("completed");
}

function insertTable()
{

    var num_rows = theResult.length;
    var num_cols = 2;
    var width = 400;
    var theader = "<table border=\"1\" id='table1' width = ' "+ width +"% '>";
    var tbody = "";

    theader += "<th>Message</th>";
    theader += "<th>Type</th>";
    theader += "<th>Add</th>";
    theader += "<th>Delete</th>";

    for(var i = 0; i < num_rows; i++)
    {
        tbody += "<tr>";
        var object = theResult[i];
        tbody += "<td>";
        tbody += object.get('Message');
        tbody += "</td>"
        tbody += "<td>";
        if(object.get('type')==0)
            tbody += "Compliment";
        else
            tbody += "Insult";
        tbody += "</td>"
        tbody += "<td>";
        tbody += "<button id="+"add-"+object.id+">Add</button>";
        tbody += "</td>"
        tbody += "<td>";
        tbody += "<button id="+"del-"+object.id+">Delete</button>";
        tbody += "</td>"
        
        tbody += "</tr>";
    }
    var tfooter = "</table>";
    document.getElementById('theTable').innerHTML = theader + tbody + tfooter;
    $("button").click(function() {
       // alert(this.id); // or alert($(this).attr('id'));
        var res = (this.id).split("-");
        var Pend = Parse.Object.extend("Pending");
        var query = new Parse.Query(Pend);
        query.get(res[1], {
          success: function(gameScore) {
         // The object was retrieved successfully.
        },
        error: function(object, error) {
         // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
        }
        });
        if (res[0] == 'add'){
          //  alert("add");
            var query = new Parse.Query("Pending");
            query.get(res[1], {
                success: function(gameScore) {
                // The object was retrieved successfully.
                var message;
                if (gameScore.get("type") == 0){
                    var Message = Parse.Object.extend("Compliments");
                    message = new Message();
                    var add = gameScore.get("Message");
                    message.set("compliment", add);
                }
                else{
                    var Message = Parse.Object.extend("Insults");
                    message = new Message();
                    var add = gameScore.get("Message");
                    message.set("Insult", add);
                }

                message.save(null, {
                    success: function(message) {
                //        alert('Your submission is pending approval.');
                    },
                    error: function(message, error) {
                  //      alert('Failed to create new object, with error code: ' + error.description);
                    }
                });
                gameScore.destroy({
                    success: function(gameScore) {
                          // The object was deleted from the Parse Cloud.
                    //      alert("Works");
                      },
                      error: function(gameScore, error) {
                          // The delete failed.
                          // error is a Parse.Error with an error code and description.
                          alert("doesn't work");
                      }
                  });
            },
            error: function(object, error) {
                alert("YOU FAIL");
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
            }
        });
}
if (res[0] == 'del'){
    var query = new Parse.Query("Pending");
    query.get(res[1], {
        success: function(gameScore) {
                // The object was retrieved successfully.
              //  alert("THIS IS SUCCESS");
                gameScore.destroy({
                    success: function(gameScore) {
                          // The object was deleted from the Parse Cloud.
                //          alert("Works");
                      },
                      error: function(gameScore, error) {
                          // The delete failed.
                          // error is a Parse.Error with an error code and description.
                          alert("doesn't work");
                      }
                  });
            },
            error: function(object, error) {
                alert("YOU FAIL");
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
            }
        });
}

});
}

// Builds the HTML Table out of myList.
function buildHtmlTable() {
    //parse();
   // alert("Passed test");
   // alert("The result is "+theResult);
    var columns = addAllColumnHeaders(theResult);
   // alert("Columns is "+columns);

    for (var i = 0 ; i < theResult.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = myList[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#excelDataTable").append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(myList)
{
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0 ; i < myList.length ; i++) {
        var rowHash = myList[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1){
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $("#excelDataTable").append(headerTr$);

    return columnSet;
}
