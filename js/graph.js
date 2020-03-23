var pie_chart = null;
var bar_graph_status = null;
var trend_chart = null;
var colors = [];
var pieColors = [];

function generateColors() {

    for (let i = 0; i < count_cases_in_location.length; i++) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        stringColor = "rgba(" + r + "," + g + "," + b;
        colors[i] = stringColor + ", 0.6)";
        pieColors[i] = stringColor + ", 0.5)";
    }
}

function generateColor() {

    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = "rgba(" + r + "," + g + "," + b + ", 2)";

    return color;
}

async function drawDonut(){
    let myChart = echarts.init(document.getElementById('doughnut'));

    count_cases_in_location.sort(function(a, b){
        if (a.location < b.location) return -1;
        if (a.location > b.location) return 1;
        return 0;
    });

    let newDisplayData = count_cases_in_location.map(function(val){
        return {name: val.location, value: val.confirmed}
    });

    let displayLabel = count_cases_in_location.map(a => a.location);

    let option = {
        title: {
            text: 'Number of Cases',
            subtext: 'per Area',
            left: 'center',
            textStyle: {
                color: '#fff'
            },
        },
        toolbox: {
          show: true,
          left: 'auto',
          top: 'auto',
          bottom: 'auto',
          orient: 'horizontal',
          feature: {
              saveAsImage: {
                  show: true,
                  type: 'png',
                  title: 'Save as PNG',
                  emphasis: {
                    iconStyle: {
                        textPosition: 'right'
                    }
                  }
              }
          }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            show: false,
            align: 'left',
            type: 'scroll',
            orient: 'vertical',
            right: '1%',
            top: '15%',
            data: displayLabel,
            textStyle: {
                color: '#fff'
            }
        },
        series: [
            {
                name: 'Location',
                type: 'pie',
                radius: ['30%', '50%'],
                center: ['50%', '60%'],//['30%', '60%'],
                data: newDisplayData,
                minShowLabelAngle: 1,
                label: {
                    color: '#fff'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }

    myChart.setOption(option);
}

// Doughnut
async function drawDoughnut(){
    count_cases_in_location.sort(function(a, b){
        if (a.location < b.location) return -1;
        if (a.location > b.location) return 1;
        return 0;
    });

    let displayData = count_cases_in_location.map(a => a.confirmed);
    let displayLabel = count_cases_in_location.map(a => a.location);

    let data_colors = [];
    for(let i = 0 ; i < count_cases_in_location.length; i++){
        data_colors.push(generateColor());
    }

    let options = {
        chart: {
            height: '100%',
            type: "donut",
            foreColor: '#fff',
            toolbar: {
                autoSelected: 'zoom',
                show: true
            }
        },
        series: displayData,
        labels: displayLabel,
        colors: data_colors,
        dataLabels: {
            enabled: true,
            formatter: function(val, opt) {
                return opt.w.globals.labels[opt.seriesIndex]
            },
        },
        tooltip: {
            enabled: true,
            followCursor: false,
        },
        title: {
            text: 'Confirmed Cases by Area',
            align: 'center',
            floating: false,
            offsetY: 10
        },
        legend: {
            show: false
        },
        plotOptions: {
            pie: {
                customScale: 0.8,
                dataLabels: {
                    offset: 55,
                    minAngleToShowLabel: 1,
                },
                donut: {
                    size: '60%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '22px',
                            fontFamily: 'Rubik',
                            color: '#dfsda',
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            color: '#fff',
                            offsetY: 16,
                            formatter: function (val) {
                                return val
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total Cases',
                            color: '#fff',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                            }
                        }
                    }
                }
            }
        }   
    
    }

    let chart = new ApexCharts(document.querySelector("#doughnut"), options);
    chart.render();
}

// Timeline
async function drawTimeline(){
    let options = {
        chart: {
            type: 'area',
            stacked: true,
            height: '100%',
            foreColor: '#fff',
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom',
                tools:{
                    pan: true,
                }
            }
        },
        series: [
            {
                name: 'Confirmed',
                data: date_tested_positive
            },
            {
                name: 'Deceased',
                data: date_deceased
            },
            {
                name: 'Recovered',
                data: date_recovered
            }
        ],
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 4,
        },
        title: {
            text: 'Confirmed Cases',
            align: 'center',
            floating: false,
            offsetY: 10
        },
        legend: {
            position: 'top'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0,
                inverseColors: false,
                opacityFrom: 0,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        xaxis: {
            type: 'datetime',
            crosshairs: {
                show: false
            },
        },
        yaxis: {
            title: {
                text: 'Number of Patients'
            },
            labels: {
                formatter: function(val) {
                    return val.toFixed(0);
                },
            },
            
        },
        tooltip: {
            shared: true,
            fillSeriesColor: true,
            theme: 'dark',
        }
    }

    let chart = new ApexCharts(document.querySelector("#timeline"), options);
    chart.render();

    $('#for_validation').append("<strong>For Validation: " + for_validation_count + "</strong>");
}

// Bargraph
async function drawBargraph(){
    count_status.sort(function(a, b){
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
    });
    
    let status_categories =  count_status.map(a => a.status);
    
    let dataFemale = [
        count_sex_for_each_status_F.A, 
        count_sex_for_each_status_F.AC,
        count_sex_for_each_status_F.ASe,
        count_sex_for_each_status_F.ASt,
        count_sex_for_each_status_F.D,
        count_sex_for_each_status_F.R
    ]
    
    let dataMale = [
        count_sex_for_each_status_M.A, 
        count_sex_for_each_status_M.AC,
        count_sex_for_each_status_M.ASe,
        count_sex_for_each_status_M.ASt,
        count_sex_for_each_status_M.D,
        count_sex_for_each_status_M.R
    ]

    let options = {
        chart: {
            type: 'bar',
            stacked: true,
            height: '100%',
            foreColor: '#fff'
        },
        series: [
            {
                name: 'Female',
                data: dataFemale
            },
            {
                name: 'Male',
                data: dataMale
            }
        ],
        title: {
            text: 'Patient Status',
            align: 'center',
            floating: false,
            offsetY: 10
        },
        legend: {
            position: 'top'
        },
        xaxis: {
            categories: status_categories,
            crosshairs: {
                show: false
            },
        },
        yaxis: {
            title: {
                text: 'Number of Patients'
            },
        },
        tooltip: {
            shared: true,
            followCursor: true,
            fillSeriesColor: true,
            theme: 'dark',
        }
    }

    let chart = new ApexCharts(document.querySelector("#bargraph"), options);
    chart.render();
}
