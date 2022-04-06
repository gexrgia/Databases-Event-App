/* JavaScript functions-json to php */
var userId = 0;
/*Name for comments (?)*/
var firstName = "";
var lastName = "";

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
          newRow = document.createElement( "div" );
          newRow.id = 'eventRow';
          newRow.class = 'row';
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
function addEvent(){}
function viewEvent(){}

function openEdit(button, cid) {
  curRow = button.parentNode.parentNode;
  curEvent = cid;

  var cols = curRow.getElementsByTagName("div");
  var group = cols[0].getElementsByTagName("div");

  document.getElementById("eName").value = group[0].innerHTML;
  document.getElementById("eDate").value = group[1].innerHTML;
  document.getElementById("eLocation").value = group[2].innerHTML;
  document.getElementById("eDescription").value = group[3].innerHTML;


  document.getElementById("overlay").style.display = "block";
  document.getElementById("editForm").style.display = "block";
}

function closeEdit() {
  curRow = null;
  curEvent = 0;

  document.getElementById("eName").value = "";
  document.getElementById("eDate").value = "";
  document.getElementById("eLocation").value = "";
  document.getElementById("eDescription").value = "";

  document.getElementById("editForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function newComment(){
  var showComment = document.getElementById("newCommentSection");
  showComment.style.display == "none" ? showComment.style.display = "block" : showComment.style.display = "none";
}
function postComment(){}

