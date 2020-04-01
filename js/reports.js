async function submitReport() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date_filed_val = new Date();
    var date_start_val = new Date(document.getElementById("date_start").value);
    var date_end_val = new Date(document.getElementById("date_end").value);

    if (date_start_val == "Invalid Date" || date_end_val == "Invalid Date" || date_start_val == "" || date_end_val == "") {
        alert("Please fill in all required fields.");
    } else {
        var date_filed = months[date_filed_val.getMonth()] + " " + date_filed_val.getDate();
        var date_start = months[date_start_val.getMonth()] + " " + date_start_val.getDate();
        var date_end = months[date_end_val.getMonth()] + " " + date_end_val.getDate();
    
        var name = sessionStorage.getItem("displayName");
        var dev = sessionStorage.getItem("dev");
        var valid_submission = false;
        //GET VALUES
        var id = 0;
        var shortness_of_breath = false, fever = false, dry_cough = false, fatigue = false, sore_throat = false, nasal_congestion = false, runny_nose = false, diarrhea = false, others = "N/A";

        if (document.getElementById("shortness_of_breath").checked == true) {
            shortness_of_breath = true;
            valid_submission = true;
        }
        if (document.getElementById("fever").checked == true) {
            fever = true;
            valid_submission = true;
        }
        if (document.getElementById("dry_cough").checked == true) {
            dry_cough = true;
            valid_submission = true;
        }
        if (document.getElementById("fatigue").checked == true) {
            fatigue = true;
            valid_submission = true;
        }
        if (document.getElementById("sore_throat").checked == true) {
            sore_throat = true;
            valid_submission = true;
        }
        if (document.getElementById("nasal_congestion").checked == true) {
            nasal_congestion = true;
            valid_submission = true;
        }
        if (document.getElementById("runny_nose").checked == true) {
            runny_nose = true;
            valid_submission = true;
        }
        if (document.getElementById("diarrhea").checked == true) {
            diarrhea = true;
            valid_submission = true;
        }
        if (document.getElementById("others").checked == true) {
            valid_submission = true;
            others = document.getElementById("other_symptoms").value;
        }

        if (!valid_submission) {
            document.getElementById("symptom_error").innerHTML = "Specify current condition in 'Others' if no symptoms of COVID-19."
            alert("Please fill in all required fields.");
        }
        if (!checkDate(1)) {
            alert("Please enter valid date.");
        }
        if (valid_submission && checkDate(1)) {
            //GET LAST ID
            var dataBatch = gapi.client.sheets.spreadsheets.values.batchGet({
                "spreadsheetId": "1AP8VfPAcRLv5l0zSeS6FK8_Dwqo1yXkrWPEcjlU1_g0",
                "dateTimeRenderOption": "FORMATTED_STRING",
                "majorDimension": "ROWS",
                "ranges": [
                    "'reports'"
                ],
                "valueRenderOption": "UNFORMATTED_VALUE"
            }).then(function (response) {
                //WRITE TO SPREADSHEET
                data = response.result.valueRanges[0].values;
                newId = parseInt(data[data.length - 1][0]) + 1;
                size = data.length + 1;
                var thisRange = "'reports'!A" + size + ":O" + size;
                var allowDuplicate = true;

                for (var i = 0; i < data.length; i++) {
                    if (name == data[i][1]) {
                        if (Date.parse(date_start) >= Date.parse(data[i][4]) && Date.parse(date_end) <= Date.parse(data[i][5]) ||
                            Date.parse(date_start) <= Date.parse(data[i][4]) && Date.parse(date_end) >= Date.parse(data[i][4]) && Date.parse(date_end) <= Date.parse(data[i][5]) ||
                            Date.parse(date_start) >= Date.parse(data[i][4]) && Date.parse(date_start) <= Date.parse(data[i][5]) && Date.parse(date_end) >= Date.parse(data[i][5]) ||
                            Date.parse(date_start) <= Date.parse(data[i][4]) && Date.parse(date_end) >= Date.parse(data[i][5])
                        ) {
                            alert("A date you have selected is already filed for a leave.");
                            allowDuplicate = false;
                            break;
                        }
                    }
                }

                if (allowDuplicate) {
                    console.log("Leave filed on duplicate date.");
                    return gapi.client.sheets.spreadsheets.values.update({
                        "spreadsheetId": "1AP8VfPAcRLv5l0zSeS6FK8_Dwqo1yXkrWPEcjlU1_g0",
                        "range": thisRange,
                        "includeValuesInResponse": false,
                        "responseDateTimeRenderOption": "SERIAL_NUMBER",
                        "responseValueRenderOption": "UNFORMATTED_VALUE",
                        "valueInputOption": "RAW",
                        "resource": {
                            "majorDimension": "ROWS",
                            "values": [
                                [
                                    newId,
                                    name,
                                    dev,
                                    date_filed,
                                    date_start,
                                    date_end,
                                    shortness_of_breath,
                                    fever,
                                    dry_cough,
                                    fatigue,
                                    sore_throat,
                                    nasal_congestion,
                                    runny_nose,
                                    diarrhea,
                                    others
                                ]
                            ],
                            "range": thisRange
                        }
                    }).then(async function (response) {
                        await init();
                        alert("Report submitted successfully!");
                    },
                        function (err) { console.error("Execute error", err); });
                } else {
                    console.log("Leave not sent due to date duplication.");
                }

            },
                function (err) { console.error("Execute error", err); });

            clearRedfield();
        }
    }
}

function checkDate(action) {
    var date_start_val = "", date_end_val = "";
    if (action == 1) {
        date_start_val = new Date(document.getElementById("date_start").value);
        date_end_val = new Date(document.getElementById("date_end").value);
    } else {
        date_start_val = new Date(document.getElementById("edit_date_start").value);
        date_end_val = new Date(document.getElementById("edit_date_end").value);
    }

    if (date_start_val > date_end_val) {
        document.getElementById("date_error").innerHTML = " Oops! End date can't be earlier than start date.";
        document.getElementById("edit_date_error").innerHTML = " Oops! End date can't be earlier than start date.";
        return false;
    } else {
        document.getElementById("date_error").innerHTML = "";
        document.getElementById("edit_date_error").innerHTML = "";
        return true;
    }
}

function clearRedfield() {
    document.getElementById("date_start").value = "";
    document.getElementById("date_end").value = "";
    document.getElementById("edit_date_start").value = "";
    document.getElementById("edit_date_end").value = "";

    var checkboxes = document.getElementsByClassName("form-check-input");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }

    document.getElementById("other_symptoms").setAttribute("disabled", "disabled");
    document.getElementById("edit_other_symptoms").setAttribute("disabled", "disabled");

    $('#sickLeaveForm').modal('hide');
}

function setOthers(action) {
    var others;
    if (action == 1) {
        others = document.getElementById("other_symptoms");
    } else {
        others = document.getElementById("edit_other_symptoms");
    }

    if (others.hasAttribute("disabled")) {
        others.removeAttribute("disabled");
    } else {
        others.setAttribute("disabled", "disabled");
    }
}

async function resetData() {
    reports.length = 0;
}

function editThis(reportID) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date_start_val = new Date(document.getElementById("edit_date_start").value);
    var date_end_val = new Date(document.getElementById("edit_date_end").value);

    if (date_start_val == "Invalid Date" || date_end_val == "Invalid Date" || date_start_val == "" || date_end_val == "") {
        alert("Please fill in all required fields.");
    } else {
        var date_start = months[date_start_val.getMonth()] + " " + date_start_val.getDate();
        var date_end = months[date_end_val.getMonth()] + " " + date_end_val.getDate();
    
        var name = sessionStorage.getItem("displayName");
        var dev = sessionStorage.getItem("dev");
        var valid_submission = false;
        //GET VALUES
        var id = 0;
        var shortness_of_breath = false, fever = false, dry_cough = false, fatigue = false, sore_throat = false, nasal_congestion = false, runny_nose = false, diarrhea = false, others = "N/A";

        if (document.getElementById("edit_shortness_of_breath").checked == true) {
            shortness_of_breath = true;
            valid_submission = true;
        }
        if (document.getElementById("edit_fever").checked == true) {
            fever = true;
            valid_submission = true;
        }
        if (document.getElementById("edit_dry_cough").checked == true) {
            dry_cough = true;
            valid_submission = true;
        }
        if (document.getElementById("edit_fatigue").checked == true) {
            fatigue = true;
            valid_submission = true;
        }
        if (document.getElementById("edit_sore_throat").checked == true) {
            sore_throat = true;
            valid_submission = true;
        }
        if (document.getElementById("edit_nasal_congestion").checked == true) {
            nasal_congestion = true;
            valid_submission = true;
        }
        if (document.getElementById("edit_runny_nose").checked == true) {
            runny_nose = true;
            valid_submission = true;
        }
        if (document.getElementById("edit_diarrhea").checked == true) {
            diarrhea = true;
            valid_submission = true;
        }
        if (document.getElementById("edit_others").checked == true) {
            valid_submission = true;
            others = document.getElementById("edit_other_symptoms").value;
        }

        if (!valid_submission) {
            document.getElementById("edit_symptom_error").innerHTML = "Specify current condition in 'Others' if no symptoms of COVID-19."
            alert("Please fill in all required fields.");
        }
        if (!checkDate(2)) {
            alert("Please enter valid date.");
        }

        if (valid_submission && checkDate(2)) {
            //GET LAST ID
            var dataBatch = gapi.client.sheets.spreadsheets.values.batchGet({
                "spreadsheetId": "1AP8VfPAcRLv5l0zSeS6FK8_Dwqo1yXkrWPEcjlU1_g0",
                "dateTimeRenderOption": "FORMATTED_STRING",
                "majorDimension": "ROWS",
                "ranges": [
                    "'reports'"
                ],
                "valueRenderOption": "UNFORMATTED_VALUE"
            }).then(function (response) {
                //WRITE TO SPREADSHEET
                data = response.result.valueRanges[0].values;
                var row = reportID + 1;
                var thisRange = "'reports'!E" + row + ":O" + row;
                var allowDuplicate = true;

                for (var i = 0; i < data.length; i++) {
                    if (name == data[i][1] && dev == data[i][2]) {
                        if (Date.parse(date_start) >= Date.parse(data[i][4]) && Date.parse(date_end) <= Date.parse(data[i][5]) ||
                            Date.parse(date_start) <= Date.parse(data[i][4]) && Date.parse(date_end) >= Date.parse(data[i][4]) && Date.parse(date_end) <= Date.parse(data[i][5]) ||
                            Date.parse(date_start) >= Date.parse(data[i][4]) && Date.parse(date_start) <= Date.parse(data[i][5]) && Date.parse(date_end) >= Date.parse(data[i][5]) ||
                            Date.parse(date_start) <= Date.parse(data[i][4]) && Date.parse(date_end) >= Date.parse(data[i][5])
                        ) {
                            alert("A date you have selected is already filed for a leave.");
                            allowDuplicate = false;
                            break;
                        }
                    }
                }

                if (allowDuplicate) {
                    return gapi.client.sheets.spreadsheets.values.update({
                        "spreadsheetId": "1AP8VfPAcRLv5l0zSeS6FK8_Dwqo1yXkrWPEcjlU1_g0",
                        "range": thisRange,
                        "includeValuesInResponse": false,
                        "responseDateTimeRenderOption": "SERIAL_NUMBER",
                        "responseValueRenderOption": "UNFORMATTED_VALUE",
                        "valueInputOption": "RAW",
                        "resource": {
                            "majorDimension": "ROWS",
                            "values": [
                                [
                                    date_start,
                                    date_end,
                                    shortness_of_breath,
                                    fever,
                                    dry_cough,
                                    fatigue,
                                    sore_throat,
                                    nasal_congestion,
                                    runny_nose,
                                    diarrhea,
                                    others
                                ]
                            ],
                            "range": thisRange
                        }
                    }).then(async function (response) {
                        await init();
                        alert("Report edited successfully!");
                        $('#editSickLeaveForm').modal('hide');
                        clearRedfield();
                    },
                        function (err) { console.error("Execute error", err); });
                } else {
                    console.log("Leave application not edited due to date duplication.");
                }
            },
                function (err) { console.error("Execute error", err); });
        }
    }
}
