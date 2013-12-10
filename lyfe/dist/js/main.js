var myList = [{"name" : "abc", "age" : 50},
              {"age" : "25", "hobby" : "swimming"},
              {"name" : "xyz", "hobby" : "programming"}];

google.load("visualization", "1", {packages:["corechart"]});
var theResult;
var TestObject
var username;
var loveNum=0;
var hateNum=0;
function parse(){
    Parse.initialize("BnGiWDWDjLiOakfubnazWrs60ToHwgHy40lspsjt", "0xW4A6mq0vl0H29GaApu9xHu9MBaARcua2pB6Bur");
    TestObject = Parse.Object.extend("Jobs");
    username=Parse.User.current().get("username");
    document.getElementById("welcome").innerHTML="Welcome, "+username+"!";
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
query.equalTo("userId", username);
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


var pieQueryLove = new Parse.Query(TestObject);
pieQueryLove.equalTo("type","1");
pieQueryLove.find({
  success: function(results) {
    //alert("Successfully retrieved " + results.length + " hate scores.");
    // Do something with the returned Parse.Object values
    hateNum=results.length
    var pieQueryHate = new Parse.Query(TestObject);
pieQueryHate.equalTo("type","0");
pieQueryHate.find({
  success: function(results) {
    //alert("Successfully retrieved " + results.length + " love scores.");
    // Do something with the returned Parse.Object values
    loveNum=results.length
    drawChart();
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});



//loadChart(loveNum,hateNum);

//alert("completed");
}



    
      google.setOnLoadCallback(parse);
      
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Type', 'Number of jobs'],
          ['Love',     loveNum],
          ['Hate',      hateNum]
        ]);

        var options = {
          title: 'Our userbase',
          legend:{position:'bottom'},
          colors:['#b8b8b8','black']
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }



function insertTable()
{
    
    var num_rows = theResult.length;
    var num_cols = 4;
    var width = 100;
    var theader = "<table border=\"1\" id='table1' width = ' "+ width +"% '>";
    var tbody = "";

    //theader += "<th>Date Added</th>";
    theader += "<th><center>Recipient</center></th>";
    theader += "<th><center>Type</center></th>";
    theader += "<th><center>Delete</center></th>";

    for(var i = 0; i < num_rows; i++)
    {
        tbody += "<tr>";
            var object = theResult[i];
            //tbody += "<td>";
            //tbody += object.get('createdAt') ;
            //tbody += "</td>"
            tbody += "<td>";
            tbody += object.get('receiver');
            tbody += "</td>"
            tbody += "<td>";
            if(object.get('type')==0)
                tbody += "Compliment";
            else
                tbody += "Hateful";
            tbody += "</td>"
            tbody += "<td>";
            tbody += "<center><button id="+object.id+">Delete</button></center>";
            tbody += "</td>"
        
        tbody += "</tr>";
    }
    var tfooter = "</table>";
    document.getElementById('theTable').innerHTML = theader + tbody + tfooter;
    $("button").click(function() {
        //alert(this.id); // or alert($(this).attr('id'));
        var query = new Parse.Query(TestObject);
        query.get(this.id, {
            success: function(gameScore) {
                // The object was retrieved successfully.
                //alert("THIS IS SUCCESS");
                    gameScore.destroy({
                        success: function(gameScore) {
                          // The object was deleted from the Parse Cloud.
                          //alert("Works");
                          window.location.replace("./main.html");
                        },
                        error: function(gameScore, error) {
                          // The delete failed.
                          // error is a Parse.Error with an error code and description.
                          //alert("doesn't work");
                        }
                    });
                },
            error: function(object, error) {
                alert("YOU FAIL");
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and description.
            }
        });
    });
    
    
}

// Builds the HTML Table out of myList.
function buildHtmlTable() {
    //parse();
alert("Passed test");
alert("The result is "+theResult);
    var columns = addAllColumnHeaders(theResult);
alert("Columns is "+columns);

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