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

var for_validation_count = data_notRecovered_forValidation.length;
// var for_validation_count = 0;
var count_status = [];
var count_cases_in_location = [];
var count_sex = {M: 0, F: 0};

var count_sex_for_each_status_M = {ASt: 0,  A: 0, AC: 0, ASe: 0, D: 0, R: 0};
var count_sex_for_each_status_F = {ASt: 0,  A: 0, AC: 0, ASe: 0, D: 0, R: 0};

async function getPatientData(){
    console.log("Getting data...");

    patientData = data_notRecovered.concat(data_deceased, data_recovered);

    // await db
    //     .collection("patients")
    //     .orderBy("doc_id")
    //     .get()
    //     .then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {
    //             patientData.push(doc.data());
    //         });
    //     });
}

// Populate arrays 

function populateLocations(){
    for(var i=0; i<patientData.length; i++){
        if (!hospital_location.includes(patientData[i][14]) && patientData[i][14] != "(For Validation)"){
            hospital_location.push(patientData[i][14]);
            count_cases_in_location.push({location: patientData[i][14], confirmed: 0, deceased: 0, recovered: 0});
        }
    }

    // for(patient of patientData){
    //     if (!hospital_location.includes(patient.hospital_location)){
    //         hospital_location.push(patient.hospital_location);
    //         count_cases_in_location.push({location: patient.hospital_location, confirmed: 0, deceased: 0, recovered: 0});
    //     }
    // }
}

function populateHospital(){
    for(var i=0; i<patientData.length; i++){
        if (!hospital_admitted.includes(patientData[i][12])){
            hospital_admitted.push(patientData[i][12]);
        }
    }

    // for(patient of patientData){
    //     if (!hospital_admitted.includes(patient.hospital_admitted)){
    //         hospital_admitted.push(patient.hospital_admitted);
    //     }
    // }
}

function populateAge(){
    for(var i=0; i<patientData.length; i++){
        age.push(patientData[i][2]);
    }

    // for(patient of patientData){
    //     age.push(patient.age);
    // }
}

function populateDateTestedPositive(){
    for(var i=0; i<data_notRecovered.length; i++){
        if (!date_tested_positive.includes(data_notRecovered[i][10]) && data_notRecovered[i][10] != '(For Validation)'){
            date_tested_positive.push({x: new Date(data_notRecovered[i][10]).getTime(), y: 0});
        }
    }
    for(var i=0; i<data_deceased.length; i++){
        if (!date_tested_positive.includes(data_deceased[i][8]) && data_deceased[i][8] != '(For Validation)'){
            date_tested_positive.push({x: new Date(data_deceased[i][10]).getTime(), y: 0});
        }
    }
    for(var i=0; i<data_recovered.length; i++){
        if (!date_tested_positive.includes(data_recovered[i][8]) && data_recovered[i][8] != '(For Validation)'){
            date_tested_positive.push({x: new Date(data_recovered[i][8]).getTime(), y: 0});
        }
    }
    date_tested_positive.sort(function(a, b){
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;
        return 0;
    });

    // for(patient of patientData){
    //     if (!date_tested_positive.includes(patient.date_tested_positive) && patient.date_tested_positive != '(For Validation)'){
    //         date_tested_positive.push({x: new Date(patient.date_tested_positive).getTime(), y: 0});
    //     } else {
    //         for_validation_count += 1;
    //     }
    // }
    // date_tested_positive.sort(function(a, b){
    //     if (a.x < b.x) return -1;
    //     if (a.x > b.x) return 1;
    //     return 0;
    // });
}

function populateDateDeceased(){
    for(var i=0; i<data_deceased.length; i++){
        if (!date_deceased.includes(data_deceased[i][10]) && patientData[i][10] != '(For Validation)'){
            date_deceased.push({x: new Date(data_deceased[i][10]).getTime(), y: 0});
        }
    }
    date_deceased.sort(function(a, b){
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;
        return 0;
    });

    // for(patient of patientData){
    //     if (patient.hasOwnProperty('date_deceased')){
    //         if (!date_deceased.includes(patient.date_deceased) && patient.date_deceased != '(For Validation)'){
    //             date_deceased.push({x: new Date(patient.date_deceased).getTime(), y: 0});
    //         } else {
    //             for_validation_count += 1;
    //         }
    //     }
    // }
    // date_deceased.sort(function(a, b){
    //     if (a.x < b.x) return -1;
    //     if (a.x > b.x) return 1;
    //     return 0;
    // });
}

function populateDateRecovered(){
    for(var i=0; i<data_recovered.length; i++){
        if (!date_recovered.includes(data_recovered[i][10]) && patientData[i][10] != '(For Validation)'){
            date_recovered.push({x: new Date(data_recovered[i][10]).getTime(), y: 0});
        }
    }
    date_recovered.sort(function(a, b){
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;
        return 0;
    });

    // for(patient of patientData){
    //     if (patient.hasOwnProperty('date_recovered')){
    //         if (!date_recovered.includes(patient.date_recovered) && patient.date_recovered != '(For Validation)'){
    //             date_recovered.push({x: new Date(patient.date_recovered).getTime(), y: 0});
    //         } else {
    //             for_validation_count += 1;
    //         }
    //     }
        
    // }
    // date_recovered.sort(function(a, b){
    //     if (a.x < b.x) return -1;
    //     if (a.x > b.x) return 1;
    //     return 0;
    // });
}

function populateStatus(){
    var status = "";
    for(var i=0; i<patientData.length; i++){
        if(patientData[i][6] == "Admitted"){
            status = "Admitted - " + patientData[i][8];
        } else {
            status = patientData[i][6];
        }
        patient_status.push(status);
        if (!status_category.includes(status)){
            status_category.push(status);
            count_status.push({status: status, count: 0});
        }
    }

    // for(patient of patientData){
    //     patient_status.push(patient.status);
    //     if (!status_category.includes(patient.status)){
    //         status_category.push(patient.status);
    //         count_status.push({status: patient.status, count: 0});
    //     }
    // }
}

// Populate arrays end

// Counters

function countStatus(){
    var status = "";
    for(var i=0; i<patientData.length; i++){
        if(patientData[i][6] == "Admitted"){
            status = "Admitted - " + patientData[i][8];
        } else {
            status = patientData[i][6];
        }
        for(let j = 0; j < count_status.length; j++){
            if (count_status[j]["status"] === status){
                count_status[j]["count"] += 1;
            }
        }
    }

    // for(patient of patientData){
    //     for(let i = 0; i < count_status.length; i++){
    //         if (count_status[i]["status"] === patient.status){
    //             count_status[i]["count"] += 1;
    //         }
    //     }
    // }
}

function countCasesInLocation(){
    var status = "";
    for(var i=0; i<patientData.length; i++){
        if(patientData[i][6] == "Admitted"){
            status = "Admitted - " + patientData[i][8];
        } else {
            status = patientData[i][6];
        }
        for(let j = 0; j < count_cases_in_location.length; j++){
            if (count_cases_in_location[j]["location"] === patientData[i][14]){
                switch(status){
                    case "Admitted - Stable":
                    case "Admitted - (For Validation)":
                    case "Admitted - Critical":
                    case "Admitted - Serious":
                        count_cases_in_location[j]["confirmed"] += 1;
                        break;
                    case "Deceased":
                        count_cases_in_location[j]["deceased"] += 1;
                        break;
                    case "Recovered":
                        count_cases_in_location[j]["recovered"] += 1;
                        break;
                }
            }
        }
    }

    // for(patient of patientData){
    //     for(let i = 0; i < count_cases_in_location.length; i++){
    //         if (count_cases_in_location[i]["location"] === patient.hospital_location){
    //             switch(patient.status){
    //                 case "Admitted	-	Stable":
    //                 case "Admitted	-	(For Validation)":
    //                 case "Admitted	-	Critical":
    //                 case "Admitted	-	Serious":
    //                     count_cases_in_location[i]["confirmed"] += 1;
    //                     break;
    //                 case "Deceased":
    //                     count_cases_in_location[i]["deceased"] += 1;
    //                     break;
    //                 case "Recovered":
    //                     count_cases_in_location[i]["recovered"] += 1;
    //                     break;
    //             }
    //         }
    //     }
    // }
}

function countSex(){
    for(var i=0; i<patientData.length; i++){
        switch(patientData[i][4]){
            case "M":
                count_sex.M += 1;
                break;
            case "F":
                count_sex.F += 1;
                break;
        }
    }

    // for(patient of patientData){
    //     switch(patient.sex){
    //         case "M":
    //             count_sex.M += 1;
    //             break;
    //         case "F":
    //             count_sex.F += 1;
    //             break;
    //     }
    // }
}

function countDateTestedPositive(){
    for(var i=0; i<data_notRecovered.length; i++){
        if(data_notRecovered[i][10] != '(For Validation)') {
            for(let j = 0; j < date_tested_positive.length; j++){
                if (date_tested_positive[j]["x"] === (new Date(data_notRecovered[i][10]).getTime()) ){
                    date_tested_positive[j]["y"] += 1;
                }
            }
        }
    }
    
    for(var k=0; k<data_deceased.length; k++){
        if(data_deceased[k][8] != '(For Validation)') {
            for(let l = 0; l < date_tested_positive.length; l++){
                if (date_tested_positive[l]["x"] === (new Date(data_deceased[k][8]).getTime()) ){
                    date_tested_positive[l]["y"] += 1;
                }
            }
        }
    }

    for(var m=0; m<data_recovered.length; m++){
        if(data_recovered[m][8] != '(For Validation)') {
            for(let n = 0; n < date_tested_positive.length; n++){
                if (date_tested_positive[n]["x"] === (new Date(data_recovered[m][8]).getTime()) ){
                    date_tested_positive[n]["y"] += 1;
                }
            }
        }
    }

    // for(patient of patientData){
    //     for(let i = 0; i < date_tested_positive.length; i++){
    //         if (date_tested_positive[i]["x"] === (new Date(patient.date_tested_positive).getTime()) ){
    //             date_tested_positive[i]["y"] += 1;
    //         }
    //     }
    // }
}

function countDateDeceased(){
    for(var i=0; i<data_deceased.length; i++){
        if(data_deceased[i][10] != "(For Validation)"){
            for(let j = 0; j < date_deceased.length; j++){
                if (date_deceased[j]["x"] === (new Date(data_deceased[i][10]).getTime()) ){
                    date_deceased[j]["y"] += 1;
                }
            }
        }
    }

    // for(patient of patientData){
    //     if (patient.hasOwnProperty('date_deceased')){
    //         for(let i = 0; i < date_deceased.length; i++){
    //             if (date_deceased[i]["x"] === (new Date(patient.date_deceased).getTime()) ){
    //                 date_deceased[i]["y"] += 1;
    //             }
    //         }
    //     }
    // }
}

function countDateRecovered(){
    for(var i=0; i<data_recovered.length; i++){
        if(data_recovered[i][10] != "(For Validation)"){
            for(let j = 0; j < date_recovered.length; j++){
                if (date_recovered[j]["x"] === (new Date(data_recovered[i][10]).getTime()) ){
                    date_recovered[j]["y"] += 1;
                }
            }
        }
    }

    // for(patient of patientData){
    //     if (patient.hasOwnProperty('date_recovered')){
    //         for(let i = 0; i < date_recovered.length; i++){
    //             if (date_recovered[i]["x"] === (new Date(patient.date_recovered).getTime()) ){
    //                 date_recovered[i]["y"] += 1;
    //             }
    //         }
    //     }
    // }
}

function countSexForEachStatus(){
    var status = "";
    for(var i=0; i<patientData.length; i++){
        if(patientData[i][6] == "Admitted"){
            status = "Admitted - " + patientData[i][8];
        } else {
            status = patientData[i][6];
        }
        if (patientData[i][4] === "F"){
            switch(status){
                case "Admitted - Stable": 
                    count_sex_for_each_status_F.ASt += 1;
                    break;
                case "Admitted - (For Validation)":
                    count_sex_for_each_status_F.A += 1;
                    break;
                case "Admitted - Critical":
                    count_sex_for_each_status_F.AC += 1;
                    break;
                case "Admitted - Serious":
                    count_sex_for_each_status_F.ASe += 1;
                    break;
                case "Deceased":
                    count_sex_for_each_status_F.D += 1;
                    break;
                case "Recovered":
                    count_sex_for_each_status_F.R += 1;
                    break;
            }
        } else if (patientData[i][4] === "M"){
            switch(status){
                case "Admitted - Stable": 
                    count_sex_for_each_status_M.ASt += 1;
                    break;
                case "Admitted - (For Validation)":
                    count_sex_for_each_status_M.A += 1;
                    break;
                case "Admitted - Critical":
                    count_sex_for_each_status_M.AC += 1;
                    break;
                case "Admitted - Serious":
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
    // for(patient of patientData){
    //     if (patient.sex === "F"){
    //         switch(patient.status){
    //             case "Admitted	-	Stable": 
    //                 count_sex_for_each_status_F.ASt += 1;
    //                 break;
    //             case "Admitted	-	(For Validation)":
    //                 count_sex_for_each_status_F.A += 1;
    //                 break;
    //             case "Admitted	-	Critical":
    //                 count_sex_for_each_status_F.AC += 1;
    //                 break;
    //             case "Admitted	-	Serious":
    //                 count_sex_for_each_status_F.ASe += 1;
    //                 break;
    //             case "Deceased":
    //                 count_sex_for_each_status_F.D += 1;
    //                 break;
    //             case "Recovered":
    //                 count_sex_for_each_status_F.R += 1;
    //                 break;
    //         }
    //     } else if (patient.sex === "M"){
    //         switch(patient.status){
    //             case "Admitted	-	Stable": 
    //                 count_sex_for_each_status_M.ASt += 1;
    //                 break;
    //             case "Admitted	-	(For Validation)":
    //                 count_sex_for_each_status_M.A += 1;
    //                 break;
    //             case "Admitted	-	Critical":
    //                 count_sex_for_each_status_M.AC += 1;
    //                 break;
    //             case "Admitted	-	Serious":
    //                 count_sex_for_each_status_M.ASe += 1;
    //                 break;
    //             case "Deceased":
    //                 count_sex_for_each_status_M.D += 1;
    //                 break;
    //             case "Recovered":
    //                 count_sex_for_each_status_M.R += 1;
    //                 break;
    //         }
    //     }
    // }
}