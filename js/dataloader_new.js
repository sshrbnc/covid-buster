var dev_teams = [];
var date_filed = [];

// Populate arrays

function populateDevTeams(){
    dev_teams = [];
    for(report of reports){
        if(!dev_teams.some(dev_team => dev_team.dev === report.dev)){
            dev_teams.push({dev: report.dev, count: 0});
        }
    }

}

function populateDateFiled(){
    let base = +new Date('March 1, 2020');
    let one_day = 24 * 3600 * 1000;
    date_filed = [];
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

   
    //console.log(date_filed);
    
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

    console.log(reportsData);
    
    reportsData.forEach(function (report){
        body +=
            "<tr>" +
            "<td>" + report.date_filed + "</td>" +
            "<td>" + report.date_start + "</td>" +
            "<td>" + report.date_end + "</td>";
        
        var conditions = "";
        if(report.shortness_of_breath == "true" ){
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
