async function displayTotal(){
    var total_confirmed = data_notRecovered.length;
    var total_deceased = data_deceased.length;
    var total_recovered = data_recovered.length;

    $('#confirmed_total').append("<strong>" + total_confirmed + "</strong>");
    $('#confirmed_total_m').append("<strong>" + total_confirmed + "</strong>");

    $('#deceased_total').append("<strong>" + total_deceased + "</strong>");
    $('#deceased_total_m').append("<strong>" + total_deceased + "</strong>");

    $('#recovered_total').append("<strong>" + total_recovered + "</strong>");
    $('#recovered_total_m').append("<strong>" + total_recovered + "</strong>");

    // var total_confirmed = 0;
    // var total_deceased = 0;
    // var total_recovered = 0;

    // var patients_total = db.collection("patients");

    // patients_total.where("status", "in", ["Admitted	-	Stable", "Admitted	-	(For Validation)", "Admitted	-	Critical", "Admitted	-	Serious"])
    //     .get()
    //     .then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             // console.log(doc.data().status);
    //             // console.log(doc.data().hospital_admitted);
    //             total_confirmed += 1;                
    //         });
        
    //     $('#confirmed_total').append("<strong>" + total_confirmed + "</strong>");
    //     $('#confirmed_total_m').append("<strong>" + total_confirmed + "</strong>");
    //     })
    
    // patients_total.where("status", "==", "Deceased")
    //     .get()
    //     .then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             total_deceased += 1;                
    //         });
        
    //     $('#deceased_total').append("<strong>" + total_deceased + "</strong>");
    //     $('#deceased_total_m').append("<strong>" + total_deceased + "</strong>");
    //     })

    // patients_total.where("status", "==", "Recovered")
    //     .get()
    //     .then(function(querySnapshot) {
    //         querySnapshot.forEach(function(doc) {
    //             total_recovered += 1;                
    //         });
        
    //     $('#recovered_total').append("<strong>" + total_recovered + "</strong>");
    //     $('#recovered_total_m').append("<strong>" + total_recovered + "</strong>");
    //     })   
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