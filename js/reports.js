var reportsData = "";

window.addEventListener("load", async () => {
    await authenticate().then(loadClient);
    await execute();
    reportsData = data;
    console.log(reportsData);
    populateReportsTable();
});

function populateReportsTable(){
    $('#reportsPlaceholder').html("");

    let head = 
        "<table id='reportsTable' class='table table-striped' style='width:100%; background-color: lightgrey; color: #1D1128;'>" +
        "<thead>" +
        "<tr>" +
        "<th>ID</th>" +
        "<th>Age</th>" +
        "<th>Sex</th>" +
        "<th>Address</th>" +
        "<th>Admitted?</th>" +
        "<th>Symptoms</th>"
        "</thead>";

    let body = "<tbody>";

    reportsData.forEach(function (report){
        body +=
            "<tr>" +
            "<td>" + report[0] + "</td>" +
            "<td>" + report[1] + "</td>" +
            "<td>" + report[2] + "</td>" +
            "<td>" + report[3] + "</td>" +
            "<td>" + report[4] + "</td>" +
            "<td>" + report[5] + "</td>" +
            "</tr>";
    });

    $('#reportsPlaceholder').html(head + body + "</tbody></table>");

    $('#reportsTable').DataTable({
        responsive: true
    });
}