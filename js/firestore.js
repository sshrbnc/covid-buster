// var firebaseConfig = {
//     apiKey: "AIzaSyDhHun-d9dhgGigsYJ28Q_yX3nMCy3dIcM",
//     authDomain: "covid19-buster.firebaseapp.com",
//     databaseURL: "https://covid19-buster.firebaseio.com",
//     projectId: "covid19-buster",
//     storageBucket: "covid19-buster.appspot.com",
//     messagingSenderId: "326943197156",
//     appId: "1:326943197156:web:d098fda79ca67b7877a9f1",
//     measurementId: "G-TGYYR36DCW"
// };

var firebaseConfig = {
    apiKey: "AIzaSyChb2EIMA1ViNSuOiRr_gw0jJy2rVWnR-0",
    authDomain: "covid-busterii-58e31.firebaseapp.com",
    databaseURL: "https://covid-busterii-58e31.firebaseio.com",
    projectId: "covid-busterii-58e31",
    storageBucket: "covid-busterii-58e31.appspot.com",
    messagingSenderId: "829069424014",
    appId: "1:829069424014:web:baf67c6f8bf2e09fd860df",
    measurementId: "G-CSG2RCG6J5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
console.log("Cloud Firestores Loaded");

let db = firebase.firestore();


async function logIn(e) {
  e.preventDefault();
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
      location.href = "reports.html";
      
    } else {
      // User is signed out.
      // ...
      //console.log("out")
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
    var emailAddress = "apsolinap@up.edu.ph";

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      // Email sent.
      document.getElementById("forgot-username").innerHTML = "enter email <span style='color:green'>Check your email to reset the password.</span>";
    }).catch(function(err) {
      // An error happened. User doesn't exist in DB.
      document.getElementById("forgot-username").innerHTML = "enter email <span style='color:red'>Oh no! You're not in our records.</span>";
        
    });
}
function logOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      location.href = "login.html";
    }).catch(function(error) {
      // An error happened.
      alert("ERR")
    });
}
