var firebaseConfig = {
    apiKey: "AIzaSyDhHun-d9dhgGigsYJ28Q_yX3nMCy3dIcM",
    authDomain: "covid19-buster.firebaseapp.com",
    databaseURL: "https://covid19-buster.firebaseio.com",
    projectId: "covid19-buster",
    storageBucket: "covid19-buster.appspot.com",
    messagingSenderId: "326943197156",
    appId: "1:326943197156:web:d098fda79ca67b7877a9f1",
    measurementId: "G-TGYYR36DCW"
};

// var firebaseConfig = {
//     apiKey: "AIzaSyChb2EIMA1ViNSuOiRr_gw0jJy2rVWnR-0",
//     authDomain: "covid-busterii-58e31.firebaseapp.com",
//     databaseURL: "https://covid-busterii-58e31.firebaseio.com",
//     projectId: "covid-busterii-58e31",
//     storageBucket: "covid-busterii-58e31.appspot.com",
//     messagingSenderId: "829069424014",
//     appId: "1:829069424014:web:baf67c6f8bf2e09fd860df",
//     measurementId: "G-CSG2RCG6J5"
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
console.log("Cloud Firestores Loaded");

let db = firebase.firestore();


async function logIn(e) {
  e.preventDefault();
    await authenticate().then(loadClient);
    var email = document.getElementById("login-username").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(error.message + " " + error.code)
        if((error.code == "auth/user-not-found" )||( error.code == "auth/wrong-password")){
          $("#login-password-label").html("email <span style='color:red'>email and password don't match.</span>");
        }
    });

}
async function checkStateOut(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user)
      var docRef = firebase.firestore().collection("users").doc(user.uid);

      docRef.get().then(function(doc) {
          if (doc.exists) {
              sessionStorage.setItem("displayName",doc.data().name);
              sessionStorage.setItem("dev", doc.data().dev);
              sessionStorage.setItem("userType", doc.data().user_type);
              sessionStorage.setItem("email", user.email);
          }
          location.href = "reports.html";
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      
    } else {
      // User is signed out.
      // ...
      //console.log("out")
      sessionStorage.clear()
      //location.href = "login.html";
    }
  });  
}
async function checkStateIn(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.      
    } else {
      // User is signed out.
      location.href = "login.html";
    }
  });  
}
async function sendEmail(e){
    e.preventDefault();
    var auth = firebase.auth();
    var emailAddress = $("#forgot-username").val()

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
      document.getElementById("forgot-username-label").innerHTML = "email <span style='color:green'>Check your email.</span>";
    }).catch(function(err) {
      // An error happened. User doesn't exist in DB.
      document.getElementById("forgot-username-label").innerHTML = "email <span style='color:red'>Oh no! You're not in our records.</span>";
        
    });
}

function logOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      sessionStorage.clear();
      location.href = "login.html";
    }).catch(function(error) {
      // An error happened.
      alert("ERR")
    });
}

function getDisplayName(){
 document.getElementById("userName").innerHTML = sessionStorage.getItem("displayName");
}

async function changePassword(){
  var user = firebase.auth().currentUser;
  var newPassword = document.getElementById("newPassword").value;
  var oldPassword = document.getElementById("oldPassword").value;
  var email = sessionStorage.getItem("email");
  console.log(email + " " + oldPassword)
  if(newPassword.length <= 7){
    alert("Password must be 7 characters or longer.")
  }else{
    if((newPassword.trim() == "") || (newPassword == null)){
      alert("Enter a valid password.")
      document.getElementById("newPasswordError").innerHTML = "enter a valid password";
  }
  else{
    const credential = firebase.auth.EmailAuthProvider.credential(
        email, 
        oldPassword
    );

    // Prompt the user to re-provide their sign-in credentials

    user.reauthenticateWithCredential(credential).then(function() {
      // User re-authenticated.
      user.updatePassword(newPassword).then(function() {
      // Update successful.
      document.getElementById("oldPasswordError").innerHTML = "";
      document.getElementById("newPasswordError").innerHTML = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("oldPassword").value = "";
      alert("Password has been changed successfully!");
      $("#changePassForm").modal("hide");
    }).catch(function(error) {
      // An error happened.
    });
    }).catch(function(error) {
      // An error happened.
      alert("Invalid password.")
      document.getElementById("oldPasswordError").innerHTML = "invalid password"
    });
  }
  }
}

function clearAddUser(){
  document.getElementById("new-user-email").value = "";
  document.getElementById("new-user-name").value = "";
  document.getElementById("new-user-dev").value = "";
  document.getElementById("new-user-email-error").innerHTML = ""
}
function clearChangePass(){
      document.getElementById("oldPasswordError").innerHTML = "";
      document.getElementById("newPasswordError").innerHTML = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("oldPassword").value = "";
}

async function pushUser(id){
  var name = document.getElementById("new-user-name").value;
  var newDev = document.getElementById("new-user-dev").value;
  var user_type = "employee"
  db.collection("users").doc(id).set({
    name: name,
    uid: id,
    dev: newDev,
    user_type: "employee"
  })
  .then(function() {
    clearAddUser();
    alert("User successfully added!");
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}

async function addUser(){
  var email = document.getElementById("new-user-email").value;
  var password = "Awsys#123"
  var name = document.getElementById("new-user-name").value;
  var newDev = document.getElementById("new-user-dev").value;
  document.getElementById("new-user-email-error").innerHTML = ""
  
  if((name  == "") || (newDev == "" ) || (email == "")){
      alert("Fill in all required fields!");
  }else{  
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(
    (user)=>{
    
     pushUser(user.user.uid)
    })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + " " + errorMessage);
    alert("Invalid email format");
    // ...
  });
  }

}
