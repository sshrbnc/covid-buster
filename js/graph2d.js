var pieChart = null;

window.addEventListener("load", async () => {
    isloaded = true;
    drawPie();
});

async function drawPie(groupBy) {
    let displayData = [15, 14, 14, 5, 3, 1, 1, 2, 2, 4, 1, 1, 1];
    let displayLabel = ["San Juan", "Quezon City"];
    
    if (pieChart != null) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, {
        type: "doughnut",
        options: {
            maintainAspectRatio: true,
            plugins: {
                labels: {
                    render: 'percentage',
                    precision: 2
                }
            }
        },
        data: {
            labels: displayLabel,
            datasets: [
                {
                    data: displayData,
                    backgroundColor: "white",
                    borderColor: "blue",
                    borderWidth: 1
                }
            ]
        }
    });
}