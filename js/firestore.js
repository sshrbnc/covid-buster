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
