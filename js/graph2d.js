var pie_chart = null;
var bar_graph_status = null;
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

async function drawPie() {
    count_cases_in_location.sort(function(a, b){
        if (a.location < b.location) return -1;
        if (a.location > b.location) return 1;
        return 0;
    });

    let displayData = count_cases_in_location.map(a => a.confirmed != 0);
    let displayLabel = count_cases_in_location.map(a => a.location);
    
    if (pie_chart != null) {
        pie_chart.destroy();
    }

    pie_chart = new Chart(ctx, {
        type: "doughnut",
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
            maintainAspectRatio: false,
            legend: {
                position: 'left'
            },
            // plugins: {
            //     labels: {
            //         render: 'percentage',
            //         precision: 2
            //     }
            // }
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
    let displayData =  count_status.map(a => a.count);

    if (bar_graph_status != null) {
        bar_graph_status.destroy();
    }

    bar_graph_status = new Chart(ctx_bargraph, {
        type: 'bar',
        data: {
            labels: displayLabel,
            datasets: [{
                label: "Patient Status",
                data: displayData,
                backgroundColor: pieColors,
                borderColor: colors,
                borderWidth: 1,
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                position: 'top',
                labels: {
                    fontSize: 16,
                    fontStyle: 'bold',
                    fontFamily: 'times',
                    boxWidth: 0
                }
            },
            scales: {
                yAxes: [{
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
                    scaleLabel: {
                        fontSize: 14,
                        display: true,
                        labelString: 'Status'
                    }
                }]
            },
            events: false,
            tooltips: {
                enabled: false
            },
            hover: {
                animationDuration: 0
            },
            animation: {
                duration: 700,
                onComplete: function () {
                    var chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];                            
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    });
                }
            }
        }
    });
}