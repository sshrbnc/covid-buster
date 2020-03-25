function populateReportsTable(){
    $('#reportsPlaceholder').html("");

    let head = 
        "<table id='reportsTable' class='table table-striped' style='width:100%; background-color: lightgrey; color: #1D1128;'>" +
        "<thead>" +
        "<tr>" +
        "<th>ID</th>"+
        "<th>Name</th>" +
        "<th>Dev</th>" +
        "<th>Date Start</th>" +
        "<th>Date End</th>" +
        "<th>Shortness of Breath</th>" +
        "<th>Fever</th>" +
        "<th>Dry Cough</th>" +
        "<th>Fatigue</th>" +
        "<th>Sore Throat</th>" +
        "<th>Nasal Congestion</th>" +
        "<th>Runny Nose</th>" +
        "<th>Diarrhea</th>" +
        "<th>Others</th>" +
        "</tr>" +
        "</thead>";

    let body = "<tbody>";

    reportsData.forEach(function (report){
        body +=
            "<tr>" +
            "<td>" + report.id + "</td>" +
            "<td>" + report.name + "</td>" +
            "<td>" + report.dev + "</td>" +
            "<td>" + report.date_start + "</td>" +
            "<td>" + report.date_end + "</td>" +
            "<td>" + report.shortness_of_breath + "</td>" +
            "<td>" + report.fever + "</td>" +
            "<td>" + report.dry_cough + "</td>" +
            "<td>" + report.fatigue + "</td>" +
            "<td>" + report.sore_throat + "</td>" +
            "<td>" + report.nasal_congestion + "</td>" +
            "<td>" + report.runny_nose + "</td>" +
            "<td>" + report.diarrhea + "</td>" +
            "<td>" + report.others + "</td>" +
            "</tr>";
    });

    $('#reportsPlaceholder').html(head + body + "</tbody></table>");

    $('#reportsTable').DataTable({
        responsive: true
    });
}