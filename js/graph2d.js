var pie_chart = null;
var bar_graph_status = null;
var colors = [];
var pieColors = [];

function generateColors() {

    for (let i = 0; i < 13; i++) {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        stringColor = "rgba(" + r + "," + g + "," + b;
        colors[i] = stringColor + ", 0.6)";
        pieColors[i] = stringColor + ", 0.5)";
    }
}

async function drawPie() {
    let displayData = [15, 14, 14, 5, 3, 1, 1, 2, 2, 4, 1, 1, 1];
    let displayLabel = [
        "San Juan", 
        "Quezon City", 
        "Makati", 
        "Taguig", 
        "Mandaluyong", 
        "Pampanga",
        "Bataan",
        "Laguna",
        "Batangas",
        "Cavite",
        "Rizal",
        "Negros Oriental",
        "Bohol",
    ];
    
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
    let displayLabel =  count_status.map(a => a.status);
    let displayData =  count_status.map(a => a.count);

    console.log(displayLabel);
    console.log(displayData);

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
            maintainAspectRatio: true,
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
                        labelString: 'Count',
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
                        //labelString: labelStr
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