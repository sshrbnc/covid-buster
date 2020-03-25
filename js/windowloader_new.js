window.addEventListener("load", async () => {
    await authenticate().then(loadClient);
    await execute();
});