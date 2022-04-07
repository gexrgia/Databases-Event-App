var userId = 0;
/*Name for comments (?)*/
var firstName = "";
var lastName = "";

/*----------------User Access Functions------------*/
function loginUser() {
    userId = 0;
    firstName = "";
    lastName = "";
  
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    var jsonPayload = JSON.stringify({
        email:email, password:password
    });

  // var url; /*[link to API --- Depends on API]*/
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  
    try {
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var jsonObject = JSON.parse(xhr.responseText);
            userId = jsonObject.id;
  
            if(userId < 1) {
                displayError("Email/Password combination is incorrect.")
                return;
            }
  
            firstName = jsonObject.firstName;
            lastName = jsonObject.lastName;
            window.location.href = "eventFeed.html";
        }
      };
  
        xhr.send(jsonPayload);
  
    } catch(err) {
        displayError(err.message);
    }
}

function logoutUser(){}

function addUser(){}

function createRSO(){}

/*------------------Event Functions------------------*/
function searchEvent() {
  var qEventName = document.getElementById("qEventName").value;
  var qRSOName = document.getElementById("qRSO").value;
  var qDate = document.getElementById("qDate").value;
  var qLocation = document.getElementById("qLocation").value;

  var jsonPayload = JSON.stringify({eventName:qEventName,rso:qRSO,date:qDate,location:qLocation,userid:userId});
  //var url = urlBase + '/SearchEvent.php';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  document.getElementById("eventsBody").innerHTML = "";

  try {
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        var results = jsonObject.results;
        var qerr = jsonObject.error;

        if (qerr) {
          displayError(qerr);
          return;
        } else {
          displaySuccess("Successfully retrieved events");
        }

        var grid = document.getElementById("eventsBody");
        for (var i = 0; i < results.length; i++) {

          /*Create new <div id="eventRow" class="row"> */
          newRow = document.createElement( "div" );
          newRow.id = 'eventRow';
          newRow.class = 'row';

          /*Create new <div class="col-lg-10"> (holds event data)*/
          newTenCol = document.createElement( "div" );
          newTenCol.class = "col-lg-10";

          titleDiv = document.createElement( "div" );
          titleDiv.appendChild(results[i].eventName);
          newTenCol.appendChild(titleDiv);

          rsoDiv = document.createElement("div");
          rsoDiv.appendChild(results[i].rso);
          newTenCol.appendChild(rsoDiv);

          dateDiv = document.createElement("div");
          dateDiv.appendChild(results[i].date);
          newTenCol.appendChild(dateDiv);

          locDiv = document.createElement("div");
          locDiv.appendChild(results[i].location);
          newTenCol.appendChild(locDiv);

          descDiv = document.createElement("div");
          descDiv.appendChild(results[i].description);
          newTenCol.appendChild(descDiv);

          newRow.appendChild(newTenCol);

          newTwoCol = document.createElement( "div" );
          newTwoCol.class = "col-lg-2";
          newTwoCol.innerHTML = "<button id=\"viewButton\" >View</button>";
          newRow.appendChild(newTwoCol);

          grid.appendChild(newRow);
        }
      }
    };

    xhr.send(jsonPayload);

  } catch(err) {
    displayError(err.message);
  }
}

function openNewForm(){
  document.getElementById("overlay").style.display = "block";
  document.getElementById("newForm").style.display = "block";
}

function closeNewForm(){
  document.getElementById("newForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function addEvent(button){
  var eventData = button.parentNode;
  var eName = eventData.getElementById("newEventName");
  var eHost = eventData.getElementById("newEventHost");
  var eTime = eventData.getElementById("newEventTime");
  var eLocation = eventData.getElementById("newEventLoc");
  var eDescription = eventData.getElementById("newEventDesc");

  var jsonPayload = JSON.stringify({eventName:eName,rso:eHost,date:eTime,location:eLocation, description: eDescription, userid:userId});

}
function viewEvent(){}

/*------------------Event Editing Functions - form overlay------------------*/




/*----------- Comment posting/editing functions ------------*/

function readComments(){}

function newComment(){
  var showComment = document.getElementById("newCommentSection");
  showComment.style.display == "none" ? showComment.style.display = "block" : showComment.style.display = "none";
}

function postComment(){}

function openCommentEdit(button, cid) {
  curRow = button.parentNode.parentNode;
  curComment = cid;

  var cols = curRow.getElementsByTagName("div");

  document.getElementById("eComment").value = cols[0].innerHTML;

  document.getElementById("overlay").style.display = "block";
  document.getElementById("editForm").style.display = "block";
}

function closeCommentEdit() {
  curRow = null;
  curEvent = 0;

  document.getElementById("eComment").value = "";
  document.getElementById("editForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}


