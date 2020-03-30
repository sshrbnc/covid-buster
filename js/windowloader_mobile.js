window.addEventListener("load", async () => {
    await authenticate().then(loadClient);
    await execute();

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
});