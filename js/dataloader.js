// Global data
var patientData = [];
var age = [];
var date_tested_positive = [];
var date_deceased = [];
var date_recovered = [];
var hospital_admitted = [];
var hospital_location = [];
var patient_status = [];
var status_category = [];
var dates = [];

var for_validation_count = 0;
var count_status = [];
var count_cases_in_location = [];
var count_sex = {M: 0, F: 0};

var count_sex_for_each_status_M = {ASt: 0,  A: 0, AC: 0, ASe: 0, D: 0, R: 0};
var count_sex_for_each_status_F = {ASt: 0,  A: 0, AC: 0, ASe: 0, D: 0, R: 0};

// var reportsData = [];

// async function getReportsData(){
//     console.log("Getting data...");
//     await db
//         .collection("reports")
//         .orderBy("id")
//         .get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 reportsData.push(doc.data());
//             });
//         });
// }

async function getPatientData(){
    console.log("Getting data...");
    await db
        .collection("patients")
        .orderBy("doc_id")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                patientData.push(doc.data());
            });
        });
}

// Populate arrays 

function populateLocations(){
    for(patient of patientData){
        if (!hospital_location.includes(patient.hospital_location)){
            hospital_location.push(patient.hospital_location);
            count_cases_in_location.push({location: patient.hospital_location, confirmed: 0, deceased: 0, recovered: 0});
        }
    }
}

function populateHospital(){
    for(patient of patientData){
        if (!hospital_admitted.includes(patient.hospital_admitted)){
            hospital_admitted.push(patient.hospital_admitted);
        }
    }
}

function populateAge(){
    for(patient of patientData){
        age.push(patient.age);
    }
}

function populateDateTestedPositive(){
    for(patient of patientData){
        if (!date_tested_positive.includes(patient.date_tested_positive) && patient.date_tested_positive != '(For Validation)'){
            date_tested_positive.push({x: new Date(patient.date_tested_positive).getTime(), y: 0});
        } else {
            for_validation_count += 1;
        }
    }
    date_tested_positive.sort(function(a, b){
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;
        return 0;
    });
}

function populateDateDeceased(){
    for(patient of patientData){
        if (patient.hasOwnProperty('date_deceased')){
            if (!date_deceased.includes(patient.date_deceased) && patient.date_deceased != '(For Validation)'){
                date_deceased.push({x: new Date(patient.date_deceased).getTime(), y: 0});
            } else {
                for_validation_count += 1;
            }
        }
    }
    date_deceased.sort(function(a, b){
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;
        return 0;
    });
}

function populateDateRecovered(){
    for(patient of patientData){
        if (patient.hasOwnProperty('date_recovered')){
            if (!date_recovered.includes(patient.date_recovered) && patient.date_recovered != '(For Validation)'){
                date_recovered.push({x: new Date(patient.date_recovered).getTime(), y: 0});
            } else {
                for_validation_count += 1;
            }
        }
        
    }
    date_recovered.sort(function(a, b){
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;
        return 0;
    });
    
}

function populateStatus(){
    for(patient of patientData){
        patient_status.push(patient.status);
        if (!status_category.includes(patient.status)){
            status_category.push(patient.status);
            count_status.push({status: patient.status, count: 0});
        }
    }
}

function populateReportsTable(){
    $('#reportsPlaceholder').html("");

    let head = 
        "<table id='reportsTable' class='table table-striped' style='width:100%; background-color: lightgrey; color: #1D1128;'>" +
        "<thead>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>Age</th>" +
        "<th>Sex</th>" +
        "<th>Address</th>" +
        "<th>Admitted?</th>" +
        "<th>Symptoms</th>"
        "</thead>";

    let body = "<tbody>";

    reportsData.forEach(function (report){
        body +=
            "<tr>" +
            "<td>" + report.id + "</td>" +
            "<td>" + report.age + "</td>" +
            "<td>" + report.sex + "</td>" +
            "<td>" + report.address + "</td>";
        
        if(report.admitted == true){
            body += "<td>Yes</td>";
        } else {
            body += "<td>No</td>";
        }
        
        if(report.symptoms == ""){
            body += "<td>Asymptomatic (No symptoms)</td>";
        } else {
            body += "<td>" + report.symptoms + "</td>";
        }
        body += "</tr>";
    });

    $('#reportsPlaceholder').html(head + body + "</tbody></table>");

    $('#reportsTable').DataTable({
        responsive: true
    });
}

// Populate arrays end

// Counters

function countStatus(){
    for(patient of patientData){
        for(let i = 0; i < count_status.length; i++){
            if (count_status[i]["status"] === patient.status){
                count_status[i]["count"] += 1;
            }
        }
    }
}

function countCasesInLocation(){
    for(patient of patientData){
        for(let i = 0; i < count_cases_in_location.length; i++){
            if (count_cases_in_location[i]["location"] === patient.hospital_location){
                switch(patient.status){
                    case "Admitted	-	Stable":
                    case "Admitted	-	(For Validation)":
                    case "Admitted	-	Critical":
                    case "Admitted	-	Serious":
                        count_cases_in_location[i]["confirmed"] += 1;
                        break;
                    case "Deceased":
                        count_cases_in_location[i]["deceased"] += 1;
                        break;
                    case "Recovered":
                        count_cases_in_location[i]["recovered"] += 1;
                        break;
                }
            }
        }
    }

}

function countSex(){
    for(patient of patientData){
        switch(patient.sex){
            case "M":
                count_sex.M += 1;
                break;
            case "F":
                count_sex.F += 1;
                break;
        }
    }

}

function countDateTestedPositive(){
    for(patient of patientData){
        for(let i = 0; i < date_tested_positive.length; i++){
            if (date_tested_positive[i]["x"] === (new Date(patient.date_tested_positive).getTime()) ){
                date_tested_positive[i]["y"] += 1;
            }
        }
    }

}

function countDateDeceased(){
    for(patient of patientData){
        if (patient.hasOwnProperty('date_deceased')){
            for(let i = 0; i < date_deceased.length; i++){
                if (date_deceased[i]["x"] === (new Date(patient.date_deceased).getTime()) ){
                    date_deceased[i]["y"] += 1;
                }
            }
        }
    }

}

function countDateRecovered(){
    for(patient of patientData){
        if (patient.hasOwnProperty('date_recovered')){
            for(let i = 0; i < date_recovered.length; i++){
                if (date_recovered[i]["x"] === (new Date(patient.date_recovered).getTime()) ){
                    date_recovered[i]["y"] += 1;
                }
            }
        }
    }
    
}

function countSexForEachStatus(){
    for(patient of patientData){
        if (patient.sex === "F"){
            switch(patient.status){
                case "Admitted	-	Stable": 
                    count_sex_for_each_status_F.ASt += 1;
                    break;
                case "Admitted	-	(For Validation)":
                    count_sex_for_each_status_F.A += 1;
                    break;
                case "Admitted	-	Critical":
                    count_sex_for_each_status_F.AC += 1;
                    break;
                case "Admitted	-	Serious":
                    count_sex_for_each_status_F.ASe += 1;
                    break;
                case "Deceased":
                    count_sex_for_each_status_F.D += 1;
                    break;
                case "Recovered":
                    count_sex_for_each_status_F.R += 1;
                    break;
            }
        } else if (patient.sex === "M"){
            switch(patient.status){
                case "Admitted	-	Stable": 
                    count_sex_for_each_status_M.ASt += 1;
                    break;
                case "Admitted	-	(For Validation)":
                    count_sex_for_each_status_M.A += 1;
                    break;
                case "Admitted	-	Critical":
                    count_sex_for_each_status_M.AC += 1;
                    break;
                case "Admitted	-	Serious":
                    count_sex_for_each_status_M.ASe += 1;
                    break;
                case "Deceased":
                    count_sex_for_each_status_M.D += 1;
                    break;
                case "Recovered":
                    count_sex_for_each_status_M.R += 1;
                    break;
            }
        }

    }

}


