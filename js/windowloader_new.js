window.addEventListener("load", async () => {
    await authenticate().then(loadClient);
    await execute();

    populateDevTeams();
    populateDateStart();

    countPerDevTeams();
    countPerDateStart();

    drawDonut();
    drawTimeline();
});