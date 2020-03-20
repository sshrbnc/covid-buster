  var data = "";    
  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/spreadsheets.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyANmru8WJwN5BpcdT9XU6ziLU19EGeKX5w");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.sheets.spreadsheets.values.batchGet({
      "spreadsheetId": "1AP8VfPAcRLv5l0zSeS6FK8_Dwqo1yXkrWPEcjlU1_g0",
      "dateTimeRenderOption": "FORMATTED_STRING",
      "majorDimension": "ROWS",
      "ranges": [
        "'reports'",
        "'not recovered'",
        "'deceased'",
        "'recovered'"
      ],
      "valueRenderOption": "UNFORMATTED_VALUE"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                // console.log("Response", response);
                data = response.result.valueRanges[0].values;
                console.log(data);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "403869365731-6c5k2kp62nbpn8epe7bb83a9a16sv8m8.apps.googleusercontent.com"});
  });