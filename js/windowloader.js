window.addEventListener("load", async () => {
    var element = document.getElementById("reportsPageLabel");
 
    
    if(typeof(element) != 'undefined' && element != null){
        // IN THE REPORTS PAGE
        await getReportsData();
        populateReportsTable();
    } else {
        // IN THE DASHBOARD
        await getPatientData();
        populateLocations();
        populateHospital();
        populateAge();
        populateDateTestedPositive();
        populateStatus();
        countStatus();
        countCasesInLocation();

        await displayTotal();
        await displayEachTotal();
        
        generateColors();
        drawPie();
        drawVisualization2d();
    }
});

