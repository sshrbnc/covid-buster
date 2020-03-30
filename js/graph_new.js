function generateRandomColor() {

    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = "rgba(" + r + "," + g + "," + b + ", 2)";

    return color;
}

function generateColor(r, g, b) {
    let color = "rgba(" + r + "," + g + "," + b + ", 2)";

    return color;
}

function drawDonut(){
    let my_chart = echarts.init(document.getElementById('doughnut'));

    dev_teams.sort(function(a, b){
        if (a.dev < b.dev) return -1;
        if (a.dev > b.dev) return 1;
        return 0;
    });

    let display_data = dev_teams.map(function(val){
        return {name: val.dev, value: val.count}
    });
    let display_label = dev_teams.map(a => a.dev);
    
    let title_color = '#1D1128';//generateRandomColor(); //generateColor(123, 34, 35);
    let legend_color = '#1D1128';//generateRandomColor(); //generateColor(13, 34, 35);
    let series_color = '#1D1128';//generateRandomColor(); //generateColor(12, 34, 35);

    let option = {
        title: {
            text: 'Filed Sick Leaves',
            subtext: 'per Development Team',
            left: 'center',
            textStyle: {
                color: title_color
            },
        },
        legend: {
            show: true,
            align: 'left',
            type: 'scroll',
            orient: 'vertical',
            right: '1%',
            top: '15%',
            data: display_label,
            textStyle: {
                color: legend_color
            }
        },
        series: [
            {
                name: 'Development Team',
                type: 'pie',
                radius: ['30%', '50%'],
                center: ['50%', '60%'],
                data: display_data,
                minShowLabelAngle: 1,
                label: {
                    color: series_color
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        toolbox: {
          show: true,
          right: 'auto',
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
                        textPosition: 'left'
                    }
                  }
              }
          }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
    }

    my_chart.setOption(option);
}

function drawTimeline(){
    let my_chart = echarts.init(document.getElementById('timeline'));

    let display_data = date_filed.map(a => a.count);
    let display_label = date_filed.map(a => a.date);

    let title_color = '#1D1128';//generateRandomColor(); //generateColor(123, 34, 35);
    let series_color = '#1D1128';//generateRandomColor(); //generateColor(12, 34, 35);

    let option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: 'Sick Leave',
            subtext: 'per Day',
            textStyle: {
                color: title_color
            }
        },
        toolbox: {
            show: true,
            right: 'auto',
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
                          textPosition: 'left'
                      }
                    }
                }
            }
          },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: display_label
        },
        yAxis: {
            name: 'Leave Count',
            nameLocation: 'middle',
            nameGap: 50,
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            }, 
            {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }
        ],
        series: [
            {
                name: 'SLs filed',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: series_color
                },
                data: display_data
            },
        ]
    }

    my_chart.setOption(option);
}

function drawBarGraph(){
    let my_chart = echarts.init(document.getElementById('bargraph'));
    
    let display_label = dev_teams.map(a => a.dev);
    
    let title_color = '#1D1128';//generateRandomColor(); //generateColor(123, 34, 35);
    let legend_color = '#1D1128';//generateRandomColor(); //generateColor(13, 34, 35);

    let option = {
        width: '80%',
        title: {
            left: 'center',
            text: 'Symptoms',
            subtext: 'per Development Team',
            textStyle: {
                color: title_color
            }
        },
        toolbox: {
            show: true,
            right: 'auto',
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
                            textPosition: 'left'
                        }
                    }
                }
            }
        },
        tooltip: {
            position: ['85%', '3%'],
            trigger: 'axis',
            axisPointer: {           
                type: 'shadow'        
            }
        },
        legend: {
            show: true,
            align: 'left',
            type: 'scroll',
            orient: 'vertical',
            right: '0%',
            top: '15%',
            data: display_label,
            textStyle: {
                color: legend_color
            }
        },
        grid: {
            left: '0%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            width: '80%',
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: symptoms
            
        },
        series: series_data
    }

    my_chart.setOption(option);
}