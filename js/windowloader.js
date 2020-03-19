window.addEventListener("load", async () => {
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
});