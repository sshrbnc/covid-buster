var reportsData = "";

window.addEventListener("load", async () => {
    await authenticate().then(loadClient);
    await init();
});

async function init(){
    await execute();

    reportsData = reports;

    if(document.getElementById("reportsPlaceholder")){
        populateReportsTable();
    } else {
        document.querySelector("#leave_date").valueAsDate = new Date();
        getOnLeave();
        populateDevTeams();
        populateSymptoms();
        populateSymptomsPerDevTeam();
        populateDateFiled();

        countPerDevTeams();
        countPerDateFiled();
        countSymptomsPerDevTeam();
        countOnLeave();
        
        drawDonut();
        drawTimeline();
        drawBarGraph();
    }
}
