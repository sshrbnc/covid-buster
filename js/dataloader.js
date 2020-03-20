// Global data
var patientData = [];
var age = [];
var date_tested_positive = [];
var date_deceased = [];
var hospital_admitted = [];
var hospital_location = [];
var patient_status = [];
var status_category = [];

var count_status = [];
var count_cases_in_location = [];
var count_sex = {M: 0, F: 0};
var count_sex_for_each_status_M = [];
var count_sex_for_each_status_F = [];

var reportsData = [];

async function getReportsData(){
    console.log("Getting data...");
    await db
        .collection("reports")
        .orderBy("id")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                reportsData.push(doc.data());
            });
        });
}

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
        if (!date_tested_positive.includes(patient.date_tested_positive)){
            date_tested_positive.push(patient.date_tested_positive);
        }
    }
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
                    case "Admitted":
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

    console.log(count_sex);

}

function countSexForEachStatus(){
    // for(patient of patientData){
    //     if (){

    //     }
    // }
}
