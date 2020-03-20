async function submitReport(){
    var home_address = document.getElementById("user_home-address").value;
    var hospital_address = document.getElementById("user_hospital-address").value;
    var admitted_true = document.getElementById("admitted_true");
    var admitted_false = document.getElementById("admitted_false");
    var age = document.getElementById("user_age").value;
    var sex = document.getElementById("user_sex").value;

    if(home_address=="" && hospital_address=="" || admitted_true.checked==false && admitted_false.checked==false || age=="" || sex==""){
        alert("Please fill in all required fields.");
    } else {

        //GET VALUES
        var id = 0;
        var address = ""
        if(home_address != ""){
            address = home_address;
        } else {
            address = hospital_address;
        }
    
        var admitted = "";
        if(admitted_true.checked == true){
            admitted = "Yes";
        } else if(admitted_false.checked == true){
            admitted = "No";
        }

        var symptoms = [];
    
        if(document.getElementById("symptom_cough").checked == true){
            symptoms.push("Cough");
        }
        if(document.getElementById("symptom_fever").checked == true){
            symptoms.push("Fever");
        }
        if(document.getElementById("symptom_pneumonia").checked == true){
            symptoms.push("Pneumonia");
        }
        if(document.getElementById("symptom_sore-throat").checked == true){
            symptoms.push("Sore Throat");
        }
        if(document.getElementById("symptom_others").checked == true){
            symptoms.push(document.getElementById("user_other-symptoms").value);
        }
        
        //ESTABLISH CONNECTION
        await authenticate().then(loadClient);
        await execute();

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
            var thisRange = "'reports'!A" + size + ":F" + size;

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
                            age,
                            sex,
                            address,
                            admitted,
                            symptoms.toString()
                        ]
                    ],
                    "range": thisRange
                }
            }).then(function(response) {
                alert("Report submitted successfully!");
            },
            function(err) { console.error("Execute error", err); });
        },
        function(err) { console.error("Execute error", err); });

        clearRedfield();
    }
}

function clearRedfield(){
    document.getElementById("user_home-address").value = "";
    document.getElementById("user_hospital-address").value = "";
    document.getElementById("user_age").value = "";
    document.getElementById("user_sex").value = "";

    var checkboxes = document.getElementsByClassName("form-check-input");
    for(var i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = false;
    }
    document.getElementById("address_hospital").setAttribute("hidden", "hidden");
    document.getElementById("address_home").setAttribute("hidden", "hidden");
    $('#exampleModalScrollable').modal('hide');
}

function handleClick(admitted){
    if(!admitted){
        document.getElementById("address_home").removeAttribute("hidden");
        document.getElementById("address_hospital").setAttribute("hidden", "hidden");
        document.getElementById("user_hospital-address").value = "";    
    } else {
        document.getElementById("address_hospital").removeAttribute("hidden");
        document.getElementById("address_home").setAttribute("hidden", "hidden");
        document.getElementById("user_home-address").value = "";
    }

    db.collection("reports").add(report_details);
}

async function displayTotal(){
    var total_confirmed = 0;
    var total_deceased = 0;
    var total_recovered = 0;

    var patients_total = db.collection("patients");

    patients_total.where("status", "in", ["Admitted	-	Stable", "Admitted", "Admitted	-	Critical", "Admitted	-	Serious"])
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // console.log(doc.data().status);
                // console.log(doc.data().hospital_admitted);
                total_confirmed += 1;                
            });
        console.log(total_confirmed);
        $('#confirmed_total').append("<strong>" + total_confirmed + "</strong>");
        $('#confirmed_total_m').append("<strong>" + total_confirmed + "</strong>");
        })
    
    patients_total.where("status", "==", "Deceased")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                total_deceased += 1;                
            });
        console.log(total_deceased);
        $('#deceased_total').append("<strong>" + total_deceased + "</strong>");
        $('#deceased_total_m').append("<strong>" + total_deceased + "</strong>");
        })

    patients_total.where("status", "==", "Recovered")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                total_recovered += 1;                
            });
        console.log(total_recovered);
        $('#recovered_total').append("<strong>" + total_recovered + "</strong>");
        $('#recovered_total_m').append("<strong>" + total_recovered + "</strong>");
        })   
}

async function displayEachTotal(){
    for(cases of count_cases_in_location){
        if(!cases["confirmed"] == 0){
            $("#confirmed_card_list").append('<li>' + cases["location"] + '<span>' + cases["confirmed"] + '</span></li>');
        }

        if(!cases["deceased"] == 0){
            $("#deceased_card_list").append('<li>' + cases["location"] + '<span>' + cases["deceased"] + '</span></li>');
        }

        if(!cases["recovered"] == 0){
            $("#recovered_card_list").append('<li>' + cases["location"] + '<span>' + cases["recovered"] + '</span></li>');
        }
    }
}

function setOthers(){
    var others = document.getElementById("user_other-symptoms");
    if(others.hasAttribute("disabled")){
        others.removeAttribute("disabled");
    } else {
        others.setAttribute("disabled", "disabled");
    }
}
