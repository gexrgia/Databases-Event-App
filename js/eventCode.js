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

function newComment(){
  var showComment = document.getElementById("newCommentSection");
  showComment.style.display == "none" ? showComment.style.display = "block" : showComment.style.display = "none";
}
function postComment(){}
function searchEvent(){}
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