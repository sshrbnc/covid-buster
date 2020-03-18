window.addEventListener("load", async () => {
    isloaded = true;
    await displayTotal();   
    // await displayEachTotal();
});


async function submitReport(){
    // console.log("Added Patient");

    var id = 0;
    var address = document.getElementById("user_address").value;
    var age = document.getElementById("user_age").value;
    var created = firebase.firestore.FieldValue.serverTimestamp();
    var sex = document.getElementById("user_sex").value;
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

    var report_details = {address, age, created, id, sex, symptoms};

    console.log(report_details);

    //Get the latest report count, increment it by 1, then set the sum as the new report's id
    await db.collection("counter").get().then(function (querySnapshot) {
        report_details.id = querySnapshot.docs[0].data().report_count + 1;
        querySnapshot.forEach(function (doc) {
            db.collection("counter").doc(doc.id).update({
                report_count: report_details.id
            });
        });
    });

    db.collection("reports").add(report_details);
};

async function displayTotal(){
    var total_confirmed = 0;
    var total_deceased = 0;
    var total_recovered = 0;

    var patients_total = db.collection("patients");

    patients_total.where("status", "==", "Admitted	-	Stable")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // console.log(doc.data().status);
                // console.log(doc.data().hospital_admitted);
                total_confirmed += 1;                
            });
        console.log(total_confirmed);
        $('#confirmed_total').append("<strong>" + total_confirmed + "</strong>");
        })
    
    patients_total.where("status", "==", "Deceased")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                total_deceased += 1;                
            });
        console.log(total_deceased);
        $('#deceased_total').append("<strong>" + total_deceased + "</strong>");
        })

    patients_total.where("status", "==", "Recovered")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                total_recovered += 1;                
            });
        console.log(total_recovered);
        $('#recovered_total').append("<strong>" + total_recovered + "</strong>");
        })   
};

// async function displayEachTotal(){
//     var countt = 0;
//     db.collection("patients").orderBy("hospital_admitted")
//         .get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 console.log(doc.data().hospital_admitted);
//                 countt += 1; 
//                 console.log(countt);
//             });
//         });
// };