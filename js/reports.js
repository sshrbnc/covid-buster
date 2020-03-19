tempReports = [];

window.addEventListener("load", async () => {
    await getReportsData();
    tempReports = reportsData;
    populateReportsTable();
});

async function populateReportsTable(){
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

    tempReports.forEach(function (report){
        body +=
            "<tr>" +
            "<td>" + report.id + "</td>" +
            "<td>" + report.age + "</td>" +
            "<td>" + report.sex + "</td>" +
            "<td>" + report.address + "</td>";
        
        if(report.admitted == true){
            body += "<td>Yes</td>";
        } else {
            body += "<td>No</td>";
        }
        
        if(report.symptoms == ""){
            body += "<td>Asymptomatic (No symptoms)</td>";
        } else {
            body += "<td>" + report.symptoms + "</td>";
        }
        body += "</tr>";
    });

    $('#reportsPlaceholder').html(head + body + "</tbody></table>");

    $('#reportsTable').DataTable({
        responsive: true
    });
}