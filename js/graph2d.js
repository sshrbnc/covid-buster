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

async function drawPie() {
    count_cases_in_location.sort(function(a, b){
        if (a.location < b.location) return -1;
        if (a.location > b.location) return 1;
        return 0;
    });

    let displayData = count_cases_in_location.map(a => a.confirmed);
    let displayLabel = count_cases_in_location.map(a => a.location);
    
    if (pie_chart != null) {
        pie_chart.destroy();
    }

    pie_chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: displayLabel,
            datasets: [
                {   
                    data: displayData,
                    backgroundColor: pieColors,
                    borderColor: colors,
                    borderWidth: 1
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Confirmed Cases by Area',
                fontSize: 16,
                fontStyle: 'bold',
                fontFamily: 'times',
                boxWidth: 0
            },
            maintainAspectRatio: false,
            legend: {
                display: false,
                position: 'left'
            },
            plugins: {
                labels: {
                    render: 'label',
                    fontColor: 'white',
                    position: 'outside'
                }
            }
        }
    });
}

async function drawVisualization2d() {
    count_status.sort(function(a, b){
        if (a.status < b.status) return -1;
        if (a.status > b.status) return 1;
        return 0;
    });
    
    let displayLabel =  count_status.map(a => a.status);
    //let displayData =  count_status.map(a => a.count);
    
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

    let colorF = generateColor();
    let colorM = generateColor();

    if (bar_graph_status != null) {
        bar_graph_status.destroy();
    }

    bar_graph_status = new Chart(ctx_bargraph, {
        type: 'bar',
        data: {
            labels: displayLabel,
            datasets: [
                {
                    label: 'Female',
                    data: dataFemale,
                    backgroundColor: colorF,
                    borderColor: colorF,
                    borderWidth: 1,
                },
                {
                    label: 'Male',
                    data: dataMale,
                    backgroundColor: colorM,
                    borderColor: colorM,
                    borderWidth: 1,
                },
            // {
            //     label: 'Patient Status',
            //     data: displayData,
            //     backgroundColor: pieColors,
            //     borderColor: colors,
            //     borderWidth: 1,
            // }
        ]
        },
        options: {
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Patient Status by Sex',
                fontSize: 16,
                fontStyle: 'bold',
                fontFamily: 'times',
                boxWidth: 0
            },
            legend: {
                position: 'top',
                labels: {
                    fontSize: 16,
                    fontStyle: 'bold',
                    fontFamily: 'times',
                    boxWidth: 15
                }
            },
            scales: {
                yAxes: [{
                    stacked: true,
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        //max: displayMax
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Patients',
                        fontSize: 14,
                        ticks: {
                            beginAtZero: true,
                            //max: displayMax
                        },
                    }
                }],
                xAxes: [{
                    stacked: true,
                    scaleLabel: {
                        fontSize: 14,
                        display: true,
                        labelString: 'Status'
                    }
                }]
            },
            plugins: {
                labels: false
            }
            // events: false,
            // tooltips: {
            //     enabled: false
            // },
            // hover: {
            //     animationDuration: 0
            // },
            // animation: {
            //     duration: 700,
            //     onComplete: function () {
            //         var chartInstance = this.chart,
            //         ctx = chartInstance.ctx;
            //         ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            //         ctx.textAlign = 'center';
            //         ctx.textBaseline = 'bottom';

            //         this.data.datasets.forEach(function (dataset, i) {
            //             var meta = chartInstance.controller.getDatasetMeta(i);
            //             meta.data.forEach(function (bar, index) {
            //                 var data = dataset.data[index];                            
            //                 ctx.fillText(data, bar._model.x, bar._model.y - 5);
            //             });
            //         });
            //     }
            // }
        }
    });
}

function drawVisualizationTimeline(){
    
    let options = {
        series: [
            {
                name: 'XYZ MOTORS',
                data: [
                    {
                        x: new Date('March 18').getTime(),
                        y: 76
                    },
                    {
                        x: new Date('March 20').getTime(),
                        y: 25
                    },
                    {
                        x: new Date('March 21').getTime(),
                        y: 76
                    }
                ]
            },
            {
                name: 'Series II',
                data: [
                    {
                        x: new Date('March 18').getTime(),
                        y: 52
                    },
                    {
                        x: new Date('March 19').getTime(),
                        y: 20
                    }, 
                    {
                        x: new Date('March 21').getTime(),
                        y: 24
                    }
                ]
            }
        ],
        chart: {
            type: 'area',
            stacked: false,
            height: "90%",
            zoom: {
              type: 'x',
              enabled: true,
              autoScaleYaxis: true
            },
            toolbar: {
              autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 4,
        },
        title: {
            text: 'Stock Price Movement',
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            // labels: {
            //     formatter: function (val) {
            //         return (val / 1000000).toFixed(0);
            //     },
            // },
            title: {
                text: 'Price'
            },
        },
        xaxis: {
            type: 'datetime',
        },
        tooltip: {
            shared: true,
            fillSeriesColor: true,
            theme: 'dark',
            // y: {
            //     formatter: function (val) {
            //         return (val / 1000000).toFixed(0);
            //     }
            // }
        }
    };
  
    var chart = new ApexCharts(document.querySelector("#timeline"), options);
    chart.render();
}

function drawVisualizationTrend(){

    if(trend_chart != null){
        trend_chart.destroy();
    }

    trend_chart = new Chart(ctx_trend, {
        type: 'line',
        data: {
            labels: ["x", "", "", "", "","", "", "y"],
            datasets: [
                {
                    label: "Test", // Name the series
                    data: [13, 14, 15, 16, 21, 13, 11, 12], // Specify the data values array
                    fill: false,
                    borderColor: generateColor(), // Add custom color border (Line)
                    backgroundColor: generateColor(), // Add custom color background (Points and Fill)
                    borderWidth: 1.5 // Specify bar border width
                },
                {
                    label: "Test II", // Name the series
                    data: [13, 14, 13, 11, 12], // Specify the data values array
                    fill: false,
                    borderColor: generateColor(), // Add custom color border (Line)
                    backgroundColor: generateColor(), // Add custom color background (Points and Fill)
                    borderWidth: 1.5 // Specify bar border width
                }
            ],
        },
        options: {
            responsive: true, // Instruct chart js to respond nicely.
            maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height
            title: {
                display: true,
                text: "Trend",
                position: 'top',
                fontSize: 16,
                fontStyle: 'bold',
                fontFamily: 'helvetica neue'
            },
            legend: {
                position: 'top',
                labels: {
                    fontSize: 12,
                    fontStyle: 'bold',
                    fontFamily: 'arial',
                    boxWidth: 15
                }
            },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        stepSize: 1,
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Patients',
                        fontSize: 12
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        fontSize: 14,
                        display: true,
                    }
                }]
            },
        }
    });

}