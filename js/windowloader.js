window.addEventListener("load", async () => {
    await getPatientData();
    populateLocations();
    populateAge();
    populateDateTestedPositive();
    populateStatus();
    countStatus();

    generateColors();
    drawPie();
    drawVisualization2d();
});