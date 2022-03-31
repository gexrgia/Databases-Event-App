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