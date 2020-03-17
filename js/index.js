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