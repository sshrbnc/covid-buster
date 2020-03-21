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
        populateDateDeceased();
        populateDateRecovered();
        populateStatus();
        
        countStatus();
        countCasesInLocation();
        countSex();
        countSexForEachStatus();
        countDateTestedPositive();
        countDateDeceased();
        countDateRecovered();

        await displayTotal();
        await displayEachTotal();
        
        //generateColors();
        drawDoughnut();
        drawTimeline();
        drawBargraph();
        //drawPie();
        //drawVisualization2d();
        //drawVisualizationTrend();
        //drawVisualizationTimeline();
    }
});

