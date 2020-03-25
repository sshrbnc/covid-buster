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

    console.log(date_start);
    
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
