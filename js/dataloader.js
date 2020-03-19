// Global data
var patientData = [];
var age = [];
var date_tested_positive = [];
var date_deceased = [];
var hospital_location = [];
var sex = [];
var patient_status = [];
var status_category = [];

var count_status = [];

var reportsData = [];

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

    let statuses = count_status.map(a => a.count);
    console.log(statuses);
}

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

