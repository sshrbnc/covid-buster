window.addEventListener("load", async () => {
    isloaded = true;
    await displayTotal();   
    // await displayEachTotal();
});


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
        var id = 0;

        var address = ""
        if(home_address != ""){
            address = home_address;
        } else {
            address = hospital_address;
        }
    
        var admitted = "";
        if(admitted_true.checked == true){
            admitted = true;
        } else if(admitted_false.checked == true){
            admitted = false;
        }
    
        var created = firebase.firestore.FieldValue.serverTimestamp();
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
    
        var report_details = {address, admitted, age, created, id, sex, symptoms};
    
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
    
        clearRedfield();
    }
};

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
function setOthers(){
    var others = document.getElementById("user_other-symptoms");
    if(others.hasAttribute("disabled")){
        others.removeAttribute("disabled");
    } else {
        others.setAttribute("disabled", "disabled");
    }
}
