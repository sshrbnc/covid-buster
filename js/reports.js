var reportsData = "";

window.addEventListener("load", async () => {
    await authenticate().then(loadClient);
    await init();
});

async function init(){
    reportsData = "";
    await execute();
    reportsData = reports;
    populateReportsTable();
}

function populateReportsTable(){
    $('#reportsPlaceholder').html("");

    let head = 
        "<table id='reportsTable' class='table table-striped' style='width:100%; background-color: lightgrey; color: #1D1128;'>" +
        "<thead>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>Name</th>" +
        "<th>Dev</th>" +
        "<th>Date Start</th>" +
        "<th>Date End</th>" +
        "<th>Shortness of Breath</th>" +
        "<th>Fever</th>" +
        "<th>Dry Cough</th>" +
        "<th>Fatigue</th>" +
        "<th>Sore Throat</th>" +
        "<th>Nasal Congestion</th>" +
        "<th>Runny Nose</th>" +
        "<th>Diarrhea</th>" +
        "<th>Others</th>" +
        "</tr>" +
        "</thead>";

    let body = "<tbody>";

    reportsData.forEach(function (report){
        body +=
            "<tr>" +
            "<td>" + report.id + "</td>" +
            "<td>" + report.name + "</td>" +
            "<td>" + report.dev + "</td>" +
            "<td>" + report.date_start + "</td>" +
            "<td>" + report.date_end + "</td>" +
            "<td>" + report.shortness_of_breath + "</td>" +
            "<td>" + report.fever + "</td>" +
            "<td>" + report.dry_cough + "</td>" +
            "<td>" + report.fatigue + "</td>" +
            "<td>" + report.sore_throat + "</td>" +
            "<td>" + report.nasal_congestion + "</td>" +
            "<td>" + report.runny_nose + "</td>" +
            "<td>" + report.diarrhea + "</td>" +
            "<td>" + report.others + "</td>" +
            "</tr>";
    });

    $('#reportsPlaceholder').html(head + body + "</tbody></table>");

    $('#reportsTable').DataTable({
        responsive: true
    });
}

async function submitReport(){
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date_start_val = new Date(document.getElementById("date_start").value);
    var date_end_val = new Date(document.getElementById("date_end").value);

    var date_start = months[date_start_val.getMonth()] + " " + date_start_val.getDate();
    var date_end = months[date_end_val.getMonth()] + " " + date_end_val.getDate();
    var name = "Matthew Murdock";
    var dev = "Dev D";

    if(date_start==""  || date_end == ""){
        alert("Please fill in all required fields.");
    } else {
        //GET VALUES
        var id = 0;
        var shortness_of_breath=false, fever=false,	dry_cough=false,	fatigue=false,	sore_throat=false,	nasal_congestion=false,	runny_nose=false,	diarrhea=false,	others="N/A";

        if(document.getElementById("shortness_of_breath").checked == true){
            shortness_of_breath = true;
        }
        if(document.getElementById("fever").checked == true){
            fever = true;
        }
        if(document.getElementById("dry_cough").checked == true){
            dry_cough = true;
        }
        if(document.getElementById("fatigue").checked == true){
            fatigue = true;
        }
        if(document.getElementById("sore_throat").checked == true){
            sore_throat = true;
        }
        if(document.getElementById("nasal_congestion").checked == true){
            nasal_congestion = true;
        }
        if(document.getElementById("runny_nose").checked == true){
            runny_nose = true;
        }
        if(document.getElementById("diarrhea").checked == true){
            diarrhea = true;
        }
        if(document.getElementById("others").checked == true){
            others = document.getElementById("other_symptoms").value;
        }
        
        //ESTABLISH CONNECTION
        // await authenticate().then(loadClient);
        // await execute();

        //GET LAST ID
        var dataBatch = gapi.client.sheets.spreadsheets.values.batchGet({
            "spreadsheetId": "1AP8VfPAcRLv5l0zSeS6FK8_Dwqo1yXkrWPEcjlU1_g0",
            "dateTimeRenderOption": "FORMATTED_STRING",
            "majorDimension": "ROWS",
            "ranges": [
              "'reports'"
            ],
            "valueRenderOption": "UNFORMATTED_VALUE"
        }).then(function(response) {
            //WRITE TO SPREADSHEET
            data = response.result.valueRanges[0].values;
            newId = parseInt(data[data.length - 1][0]) + 1;
            size = data.length + 1;
            var thisRange = "'reports'!A" + size + ":N" + size;

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
            }).then(async function(response) {
                await init();
                alert("Report submitted successfully!");
            },
            function(err) { console.error("Execute error", err); });
        },
        function(err) { console.error("Execute error", err); });

        clearRedfield();
    }
}

function clearRedfield(){
    document.getElementById("date_start").value = "";
    document.getElementById("date_end").value = "";

    var checkboxes = document.getElementsByClassName("form-check-input");
    for(var i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = false;
    }

    $('#exampleModalScrollable').modal('hide');
}

function setOthers(){
    var others = document.getElementById("other_symptoms");
    if(others.hasAttribute("disabled")){
        others.removeAttribute("disabled");
    } else {
        others.setAttribute("disabled", "disabled");
    }
}