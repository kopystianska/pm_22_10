const xmlhttp = new XMLHttpRequest();
const url = 'data.json';
xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);

            const ctx1 = document.getElementById('myChart1').getContext('2d');
            const gradient = ctx1.createLinearGradient(0, 0, 0, 350);

            gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
            gradient.addColorStop(1, 'rgb(255, 91, 91)');

            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                    const { ctx } = chart;
                    const chartArea = chart.chartArea;
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = options.color || '#99ffff';
                    ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);

                    ctx.restore();
                }
            };

            const chart1 = new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: data.labels1,
                    datasets: [{
                        label: false,
                        data: data.values1,
                        fill: true,
                        cubicInterpolationMode: 'monotone',
                        pointStyle: 'circle',
                        pointRadius: 7,
                        pointBackgroundColor: 'rgb(237, 20, 91)',
                        pointBorderWidth: 3,
                        backgroundColor: gradient,
                        borderColor: 'rgb(255, 255, 255)',
                        tension: 0.1,
                    }]
                },
                options: {
                    plugins: {
                        legend: false,
                        customCanvasBackgroundColor: {
                            color: '#ff5b5b',
                        },
                    },
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                display: true,
                                font: {
                                    size: 23,
                                },
                            },
                        },
                        y: {
                            grid: {
                                display: false
                            },
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 25,
                                font: {
                                    size: 23,
                                },
                            },
                        },
                    },
                },
                plugins: [plugin],
            });
            const ctx2 = document.getElementById('myChart2').getContext('2d');
            const chart2 = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: false,
                    datasets: [{
                        data: data.values2,
                        backgroundColor: data.backgroundColor2,
                        borderWidth: data.borderWidth2,
                        hoverOffset: data.hoverOffset2,
                    }],
                },
            });
        } else {
            console.error('Error fetching data:', this.statusText);
        }
    }
};

xmlhttp.open('GET', url, true);
xmlhttp.send();



