var dev_teams = [];
var date_filed = [];
var symptoms_per_dev_team = [];
var symptoms = [];
var series_data = [];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var on_leave_today = 0;
var all_leaves = 0;
// Populate arrays

function populateDevTeams() {
    dev_teams.length = 0;

    for (report of reports) {
        if (!dev_teams.some(dev_team => dev_team.dev === report.dev)) {
            dev_teams.push({ dev: report.dev, count: 0 });
        }
    }

}

function populateSymptoms() {
    symptoms = Object.keys(reports[0]);
    symptoms.splice(0, 6);

    for (let i = 0; i < symptoms.length; i++) {
        symptoms[i] = symptoms[i].replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
        symptoms[i] = symptoms[i].replace(/_/g, ' ');
    }

}

function populateSymptomsPerDevTeam() {
    symptoms_per_dev_team.length = 0;

    for (dev_t of dev_teams) {
        symptoms_per_dev_team.push({
            dev: dev_t.dev,
            data: []
        });
    }

}

function populateDateFiled() {
    let base = +new Date('March 1, 2020');
    let one_day = 24 * 3600 * 1000;

    date_filed.length = 0;

    for (report of reports) {
        if (!date_filed.some(date_filed => date_filed.date === report.date_filed)) {
            date_filed.push({ date: report.date_filed, count: 0 });
        }
    }

    date_filed.sort(function (a, b) {
        if (new Date(a.date).getTime() < new Date(b.date).getTime()) return -1;
        if (new Date(a.date).getTime() > new Date(b.date).getTime()) return 1;
        return 0;
    });

    let now = new Date(base);
    let temp = [];
    while (now.getTime() <= new Date(date_filed[date_filed.length - 1]['date'] + ', 2020').getTime()) {
        let d = now.toLocaleString('default', { month: 'long', day: 'numeric' });

        if (!date_filed.some(date_filed => date_filed.date === d)) {

            temp.push({ date: d, count: 0 });
        }

        now = new Date(base += one_day);
    }

    date_filed = date_filed.concat(temp);

    date_filed.sort(function (a, b) {
        if (new Date(a.date).getTime() < new Date(b.date).getTime()) return -1;
        if (new Date(a.date).getTime() > new Date(b.date).getTime()) return 1;
        return 0;
    });

}

function populateReportsTable(){
    $('#reportsPlaceholder').html("");

    let head = 
        "<table id='reportsTable' class='table table-striped' style='width:100%; background-color: lightgrey; color: #1D1128;'>" +
        "<thead>" +
        "<tr>" +
        "<th>#</th>" +
        "<th>Date Filed</th>" +
        "<th>Date Start</th>" +
        "<th>Date End</th>" +
        "<th>Symptoms"+
        "<th>Others</th>" +
        "<th>Action</th>" +
        "</tr>" +
        "</thead>";

    let body = "<tbody>";
    
    reportsData.forEach(function (report){
    if(report.name == sessionStorage.getItem("displayName")){
            body +=
                    "<tr>" +
                    "<td>" + report.id + "</td>" +
                    "<td>" + report.date_filed + "</td>" +
                    "<td>" + report.date_start + "</td>" +
                    "<td>" + report.date_end + "</td>";
                
                var conditions = "";
                if(report.shortness_of_breath){
                    conditions += "shortness of breath; ";
                }
                if(report.fever){
                    conditions += "fever; ";
                }
                if(report.dry_cough){
                    conditions += "dry cough; ";
                }
                if(report.fatigue){
                    conditions += "fatigue; ";
                }
                if(report.sore_throat){
                    conditions += "sore throat; ";
                }
                if(report.nasal_congestion){
                    conditions += "nasal congestion; ";
                }
                if(report.runny_nose){
                    conditions += "runny nose; ";
                }
                if(report.diarrhea){
                    conditions += "diarrhea; ";
                }
                if(conditions != ""){
                    body += "<td>" + conditions + "</td>";
                }else{
                    body += "<td>None</td>";
                }
                if (report.others != "N/A") {
                    body += "<td>" + report.others + "</td>";
                } else {
                    body += "<td>None</td>";
                }
                body += "<td><button onclick='fetchDetails(" + report.id + ")'><i class='fa fa-edit'></i></button></td></tr>";
            }
    });

    $('#reportsPlaceholder').html(head + body + "</tbody></table>");

    $('#reportsTable').DataTable({
        responsive: "true",
        "order": [[ 0, "desc" ]]
    });
}

function fetchDetails(reportID){
    reportsData.forEach(function (report) {
        if(report.id == reportID){
            clearRedfield();
            $('#editSickLeaveForm').modal('show');

            if(report.shortness_of_breath){
                document.getElementById("edit_shortness_of_breath").checked = true;
            }
            if(report.fever){
                document.getElementById("edit_fever").checked = true;
            }
            if(report.dry_cough){
                document.getElementById("edit_dry_cough").checked = true;
            }
            if(report.fatigue){
                document.getElementById("edit_fatigue").checked = true;
            }
            if(report.sore_throat){
                document.getElementById("edit_sore_throat").checked = true;
            }
            if(report.nasal_congestion){
                document.getElementById("edit_nasal_congestion").checked = true;
            }
            if(report.runny_nose){
                document.getElementById("edit_runny_nose").checked = true;
            }
            if(report.diarrhea){
                document.getElementById("edit_diarrhea").checked = true;
            }
            if(report.others != "N/A"){
                document.getElementById("edit_others").checked = true;
                document.getElementById("edit_other_symptoms").removeAttribute("disabled");
                document.getElementById("edit_other_symptoms").value = report.others;
            } else {
                document.getElementById("edit_others").checked = false;
                document.getElementById("edit_other_symptoms").setAttribute("disabled", "disabled");
                document.getElementById("edit_other_symptoms").value = "";
            }
            var footer = 
                "<button type='button' class='btn btn-secondary' data-dismiss='modal' onclick='clearRedfield()'>Close</button>" +
                "<button type='button' class='btn btn-primary' onclick='editThis(" + report.id + ")' style='border: none; background-color: #1D1128;'>Save Changes</button>";
            $("#edit_modal_footer").html(footer);
        }
    });
}

// Counting functions

function countPerDevTeams() {
    for (report of reports) {
        for (dev_team of dev_teams) {
            if (dev_team['dev'] === report.dev) {
                dev_team['count'] += 1;
            }
        }
    }

}

function countPerDateFiled() {
    for (report of reports) {
        for (d of date_filed) {
            if (d['date'] === report.date_filed) {
                d['count'] += 1;
            }
        }
    }

}

function countSymptomsPerDevTeam() {
    series_data.length = 0;

    for (sd of symptoms_per_dev_team) {
        let sb = 0, fe = 0, dc = 0, fa = 0, st = 0, nc = 0, rn = 0, d = 0, o = 0;
        for (report of reports) {
            if (sd['dev'] === report.dev) {
                if (report.shortness_of_breath) sb += 1;
                if (report.fever) fe += 1;
                if (report.dry_cough) dc += 1;
                if (report.fatigue) fa += 1;
                if (report.sore_throat) st += 1;
                if (report.nasal_congestion) nc += 1;
                if (report.runny_nose) rn += 1;
                if (report.diarrhea) d += 1;
                if (report.others != 'N/A') o += 1;
            }
        }
        sd['data'].push(sb, fe, dc, fa, st, nc, rn, d, o);


        series_data.push({
            name: sd['dev'],
            type: 'bar',
            stack: 'symptoms',
            label: {
                show: false,
                position: 'insideTop'
            },
            data: sd['data']
        });
    }
}

function countOnLeave() {
    on_leave_today = 0;
    all_leaves = 0;
    var today_val = new Date();
    var 今日 = Date.parse(months[today_val.getMonth()] + " " + today_val.getDate());
    for (report of reports) {
        var from = Date.parse(report.date_start);
        var to = Date.parse(report.date_end);
        if (今日 >= from && 今日 <= to) {
            on_leave_today++;
        }
        all_leaves++;
    }
    $('#sl_today').html(on_leave_today);
    $('#sl_today_m').html(on_leave_today);
    $('#total_sl').html(all_leaves);
    $('#total_sl_m').html(all_leaves);
}


function getOnLeave() {
    $('#employee_list').html("");

    var base_date_val = new Date(document.getElementById("leave_date").value);

    var base_date = Date.parse(months[base_date_val.getMonth()] + " " + base_date_val.getDate());

    let head =
        "<table id='employee_table' class='table display nowrap table-striped' style='width:100%;'>" +
        "<thead><tr>" +
        "<th style='width:250px!important'>Name</th>" +
        "<th style='width:50px!important'>Dev</th>" +
        "<th>Date Filed</th>" +
        "<th>Date Start</th>" +
        "<th>Date End</th>" +
        "<th>Symptoms" +
        "<th>Others</th>" +
        "</tr></thead>";

    let body = "<tbody style='max-height:300px;overflow-y:scroll'>";

    for (report of reports) {
        var from = Date.parse(report.date_start);
        var to = Date.parse(report.date_end);
        if (base_date >= from && base_date <= to) {

            body +=
                "<tr>" +
                "<td>" + report.name + "</td>" +
                "<td>" + report.dev + "</td>" +
                "<td>" + report.date_filed + "</td>" +
                "<td>" + report.date_start + "</td>" +
                "<td>" + report.date_end + "</td>";

            var conditions = "";
            if (report.shortness_of_breath) {
                conditions += "shortness of breath; ";
            }
            if (report.fever) {
                conditions += "fever; ";
            }
            if (report.dry_cough) {
                conditions += "dry cough; ";
            }
            if (report.fatigue) {
                conditions += "fatigue; ";
            }
            if (report.sore_throat) {
                conditions += "sore throat; ";
            }
            if (report.nasal_congestion) {
                conditions += "nasal congestion; ";
            }
            if (report.runny_nose) {
                conditions += "runny nose; ";
            }
            if (report.diarrhea) {
                conditions += "diarrhea; ";
            }
            if (conditions != "") {
                body += "<td>" + conditions + "</td>";
            } else {
                body += "<td>None</td>";
            }
            if (report.others != "N/A") {
                body += "<td>" + report.others + "</td></tr>";
            } else {
                body += "<td>None</td></tr>";
            }
        }
    }

    $('#employee_list').html(head + body + "</table>");
    $.extend($.fn.dataTable.defaults, {
        responsive: true
    });
    $('#employee_table').DataTable({

        "bFilter": false,
        "bInfo": false,
        "lengthChange": false,
        scrollY: "235px",
        paging: false,
        columnDefs: [
            { 'width': '300px', 'targets': 0 },
            { 'width': '150px', 'targets': 1 },
            { 'width': '230px', 'targets': 2 },
            { 'width': '130px', 'targets': 3 },
            { 'width': '130px', 'targets': 4 },
            { 'width': '130px', 'targets': 5 },
            { 'width': '130px', 'targets': 6 }
        ],
        //fixedColumns: true
    });
}
