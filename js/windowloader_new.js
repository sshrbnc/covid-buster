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
        populateDevTeams();
        populateDateFiled();

        countPerDevTeams();
        countPerDateFiled();

        drawDonut();
        drawTimeline();
    }
}
