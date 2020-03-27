var dev_teams = [];
var date_filed = [];
var symptoms_per_dev_team = [];
var symptoms = [];
var series_data = [];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var on_leave_today = 0;
var all_leaves = 0;
// Populate arrays

function populateDevTeams(){
    dev_teams.length = 0;

    for(report of reports){
        if(!dev_teams.some(dev_team => dev_team.dev === report.dev)){
            dev_teams.push({dev: report.dev, count: 0});
        }
    }

}

function populateSymptoms(){
    symptoms = Object.keys(reports[0]);
    symptoms.splice(0, 6);

    for(let i = 0; i < symptoms.length; i++){
        symptoms[i] = symptoms[i].replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
        symptoms[i] = symptoms[i].replace(/_/g, ' ');
    }

}

function populateSymptomsPerDevTeam(){
    symptoms_per_dev_team.length = 0;

    for(dev_t of dev_teams){
        symptoms_per_dev_team.push({
            dev: dev_t.dev,
            data: []
        });
    }

}

function populateDateFiled(){
    let base = +new Date('March 1, 2020');
    let one_day = 24 * 3600 * 1000;
    
    date_filed.length = 0;

    for(report of reports){
        if(!date_filed.some(date_filed => date_filed.date === report.date_filed)){
            date_filed.push({date: report.date_filed, count: 0});
        }
    }

    date_filed.sort(function(a, b){
        if (new Date(a.date).getTime() < new Date(b.date).getTime()) return -1;
        if (new Date(a.date).getTime() > new Date(b.date).getTime()) return 1;
        return 0;
    });

    let now = new Date(base);
    let temp = [];
    while (now.getTime() <= new Date(date_filed[date_filed.length - 1]['date'] + ', 2020').getTime()){
        let d = now.toLocaleString('default', { month: 'long', day: 'numeric'});
        
        if(!date_filed.some(date_filed => date_filed.date === d)){
            
            temp.push({date: d, count: 0});
        }
        
        now = new Date(base += one_day);
    }

    date_filed = date_filed.concat(temp);

    date_filed.sort(function(a, b){
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
        "<th>Date Filed</th>" +
        "<th>Date Start</th>" +
        "<th>Date End</th>" +
        "<th>Symptoms"+
        "<th>Others</th>" +
        "</tr>" +
        "</thead>";

    let body = "<tbody>";
    
    reportsData.forEach(function (report){
        body +=
            "<tr>" +
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
        if(report.others != "N/A"){
            body += "<td>" + report.others + "</td></tr>";
        }else{
            body += "<td>None</td></tr>";
        }
    });

    $('#reportsPlaceholder').html(head + body + "</tbody></table>");

    $('#reportsTable').DataTable({
        responsive: "true",
        "order": [[ 0, "desc" ]]
    });
}

// Counting functions

function countPerDevTeams(){
    for(report of reports){
        for(dev_team of dev_teams){
            if(dev_team['dev'] === report.dev){
                dev_team['count'] += 1;
            }
        }
    }
    
}

function countPerDateFiled(){
    for(report of reports){
        for(d of date_filed){
            if(d['date'] === report.date_filed){
                d['count'] += 1;
            }
        }
    }
    
}

function countSymptomsPerDevTeam(){ 
    series_data.length = 0;

    for(sd of symptoms_per_dev_team){
        let sb = 0, fe = 0, dc = 0, fa = 0, st = 0, nc = 0, rn = 0, d = 0, o = 0;
        for(report of reports){
            if (sd['dev'] === report.dev){
                if(report.shortness_of_breath) sb += 1;
                if(report.fever) fe += 1;
                if(report.dry_cough) dc += 1;
                if(report.fatigue) fa += 1;
                if(report.sore_throat) st += 1;
                if(report.nasal_congestion) nc += 1;
                if(report.runny_nose) rn += 1;
                if(report.diarrhea) d += 1;
                if(report.others != 'N/A') o += 1;
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

function countOnLeave(){
    on_leave_today = 0;
    all_leaves = 0;
    var today_val = new Date();
    var 今日 = Date.parse(months[today_val.getMonth()] + " " + today_val.getDate());
    for(report of reports){
        var from = Date.parse(report.date_start);
        var to = Date.parse(report.date_end);
        if(今日 >= from && 今日 <= to){
            on_leave_today++;
        }
        all_leaves++;
    }
    $('#sl_today').html(on_leave_today);
    $('#total_sl').html(all_leaves);
}

function getOnLeave() {
    $('#employee_list').html("");

    var base_date_val = new Date(document.getElementById("leave_date").value);

    var base_date = Date.parse(months[base_date_val.getMonth()] + " " + base_date_val.getDate());

    let head = 
        "<table id='employee_table' class='table display nowrap table-striped' style='width:100%;'>" +
        "<thead><tr>"+
            "<th style='width:270px!important'>Name</th>" +
            "<th style='width:50px!important'>Dev</th>" +
            "<th>Date Filed</th>" +
            "<th>Date Start</th>" +
            "<th>Date End</th>" +
            "<th>Symptoms"+
            "<th>Others</th>" +
        "</tr></thead>";
    
    let body = "<tbody style='max-height:300px;overflow-y:scroll'>";

    for(report of reports){
        var from = Date.parse(report.date_start);
        var to = Date.parse(report.date_end);
        if(base_date >= from && base_date <= to){

            body += 
                "<tr style='overflow: auto;'>" +
                    "<td>" + report.name + "</td>" +
                    "<td>" + report.dev + "</td>" +
                "</tr>";
        }
    }

    $('#employee_list').html(head + body + "</table>");
}
