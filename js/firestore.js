let config = {
    apiKey: "AIzaSyDhHun-d9dhgGigsYJ28Q_yX3nMCy3dIcM",
    authDomain: "covid19-buster.firebaseapp.com",
    databaseURL: "https://covid19-buster.firebaseio.com",
    projectId: "covid19-buster",
    storageBucket: "covid19-buster.appspot.com",
    messagingSenderId: "326943197156",
    appId: "1:326943197156:web:d098fda79ca67b7877a9f1",
    measurementId: "G-TGYYR36DCW"
};

firebase.initializeApp(config);
let db = firebase.firestore();
console.log("Cloud Firestores Loaded");
sessionStorage.setItem("isLoaded", false);