var pieChart = null;
var colors = [];
var pieColors = [];

window.addEventListener("load", async () => {
    isloaded = true;
    generateColors();
    drawPie();
});

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
    
    if (pieChart != null) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, {
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