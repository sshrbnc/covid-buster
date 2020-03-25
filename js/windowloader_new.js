var reportsData = "";

window.addEventListener("load", async () => {
    await authenticate().then(loadClient);
    await init();
});

async function init(){
    reportsData = "";
    await execute();

    populateDevTeams();
    populateDateStart();

    countPerDevTeams();
    countPerDateStart();

    drawDonut();
    drawTimeline();

    reportsData = reports;

    if(document.getElementById("reportsPlaceholder")){
        populateReportsTable();
    } else {
        console.log("Not found");
    }
}
