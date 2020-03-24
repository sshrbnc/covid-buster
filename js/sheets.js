  var reports = [];

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

      // 1AP8VfPAcRLv5l0zSeS6FK8_Dwqo1yXkrWPEcjlU1_g0 == replica spreadsheet

      "spreadsheetId": "1AP8VfPAcRLv5l0zSeS6FK8_Dwqo1yXkrWPEcjlU1_g0",
      "dateTimeRenderOption": "FORMATTED_STRING",
      "majorDimension": "ROWS",
      "ranges": [
        "'reports'"
      ],
      "valueRenderOption": "UNFORMATTED_VALUE"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                var temp_reports = response.result.valueRanges[0].values;

                var id = 0, name = "", dev = "", date_start = "", date_end = "", shortness_of_breath = "", fever = false, dry_cough = false, fatigue = false, sore_throat = false, nasal_congestion = false, runny_nose = false, diarrhea = false, others = false;
                for(var i=1; i<temp_reports.length; i++){
                  var report_details = { id, name, dev, date_start, date_end, shortness_of_breath, fever, dry_cough, fatigue, sore_throat, nasal_congestion, runny_nose, diarrhea, others }
                
                  report_details.id = temp_reports[i][0];
                  report_details.name = temp_reports[i][1];
                  report_details.dev = temp_reports[i][2];
                  report_details.date_start = temp_reports[i][3];
                  report_details.date_end = temp_reports[i][4];
                  report_details.shortness_of_breath = temp_reports[i][5];
                  report_details.fever = temp_reports[i][6];
                  report_details.dry_cough = temp_reports[i][7];
                  report_details.fatigue = temp_reports[i][8];
                  report_details.sore_throat = temp_reports[i][9];
                  report_details.nasal_congestion = temp_reports[i][10];
                  report_details.runny_nose = temp_reports[i][11];
                  report_details.diarrhea = temp_reports[i][12];
                  report_details.others = temp_reports[i][13];
                  reports.push(report_details);
                }
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "403869365731-6c5k2kp62nbpn8epe7bb83a9a16sv8m8.apps.googleusercontent.com"});
  });