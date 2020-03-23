  var data_reports;
  var data_notRecovered;
  var data_notRecovered_forValidation = [];
  var data_notRecovered_critical = [];
  var data_notRecovered_serious = [];
  var data_notRecovered_stable = [];
  var data_deceased;
  var data_recovered;
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

      // 1wdxIwD0b58znX4UrH6JJh_0IhnZP0YWn23Uqs7lHB6Q == r/covid spreadsheet
      // 1AP8VfPAcRLv5l0zSeS6FK8_Dwqo1yXkrWPEcjlU1_g0 == replica spreadsheet

      "spreadsheetId": "1AP8VfPAcRLv5l0zSeS6FK8_Dwqo1yXkrWPEcjlU1_g0",
      "dateTimeRenderOption": "FORMATTED_STRING",
      "majorDimension": "ROWS",
      "ranges": [
        "'reports'",
        "'not recovered'!A1:P338",
        "'deceased'",
        "'recovered'"
      ],
      "valueRenderOption": "UNFORMATTED_VALUE"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                data_reports = response.result.valueRanges[0].values;
                data_notRecovered = response.result.valueRanges[1].values;
                for(var i=0; i<data_notRecovered.length; i++){
                  switch(data_notRecovered[i][8]){
                    case "(For Validation)":
                      data_notRecovered_forValidation.push(data_notRecovered[i]);
                      break;
                    case "Critical":
                      data_notRecovered_critical.push(data_notRecovered[i]);
                      break;
                    case "Serious":
                      data_notRecovered_serious.push(data_notRecovered[i]);
                      break;
                    case "Stable":
                      data_notRecovered_stable.push(data_notRecovered[i]);
                      break;
                  }
                }
                data_deceased = response.result.valueRanges[2].values;
                data_recovered = response.result.valueRanges[3].values;

                // console.log("Not Recovered");
                // console.log(data_notRecovered);
                // console.log("Validation");
                // console.log(data_notRecovered_forValidation);
                // console.log("Critical");
                // console.log(data_notRecovered_critical);
                // console.log("Serious");
                // console.log(data_notRecovered_serious);
                // console.log("Stable");
                // console.log(data_notRecovered_stable);
                // console.log("Deceased");
                // console.log(data_deceased);
                // console.log("Recovered");
                // console.log(data_recovered);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "403869365731-6c5k2kp62nbpn8epe7bb83a9a16sv8m8.apps.googleusercontent.com"});
  });