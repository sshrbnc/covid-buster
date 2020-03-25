var dev_teams = [];
var date_start = [];

// Populate arrays

function populateDevTeams(){
    for(report of reports){
        if(!dev_teams.some(dev_team => dev_team.dev === report.dev)){
            dev_teams.push({dev: report.dev, count: 0});
        }
    }

}

function populateDateStart(){
    let base = +new Date('March 1, 2020');
    let one_day = 24 * 3600 * 1000;

    

    for(report of reports){
        if(!date_start.some(date_start => date_start.date === report.date_start)){
            date_start.push({date: report.date_start, count: 0});
        }
    }

    date_start.sort(function(a, b){
        if (new Date(a.date).getTime() < new Date(b.date).getTime()) return -1;
        if (new Date(a.date).getTime() > new Date(b.date).getTime()) return 1;
        return 0;
    });

    let now = new Date(base);
    let temp = [];
    while (now.getTime() <= new Date(date_start[date_start.length - 1]['date'] + ', 2020').getTime()){
        let d = now.toLocaleString('default', { month: 'long', day: 'numeric'});
        
        if(!date_start.some(date_start => date_start.date === d)){
            
            temp.push({date: d, count: 0});
        }
        
        now = new Date(base += one_day);
    }

    date_start = date_start.concat(temp);

    date_start.sort(function(a, b){
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
        "<th>ID</th>"+
        "<th>Name</th>" +
        "<th>Dev</th>" +
        "<th>Date Filed</th>" +
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
            "<td>" + report.date_filed + "</td>" +
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

function countPerDateStart(){
    for(report of reports){
        for(d of date_start){
            if(d['date'] === report.date_start){
                d['count'] += 1;
            }
        }
    }
    
}
