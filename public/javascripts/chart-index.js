$(() => {

    // 基于准备好的dom，初始化echarts实例
    let myBarChart = echarts.init(document.getElementById('bar'));
    let myLineChart = echarts.init(document.getElementById('line'));
    let myPieChart = echarts.init(document.getElementById('pie'));
    let xdata = [];
    let area = [];
    let value = [];
    let params = {};

    $.ajax({
        data: params,
        url: 'http://localhost:3030/data',
        type: 'get',
        dataType: 'json',
        cache: false,
        timeout: 5000,
        success: function(data) {
            var data = $.parseJSON(data);

            for (let tmp of data) {
                xdata.push(tmp.region);
                value.push(tmp.rent);
                area.push(tmp.area);
            }
            //Ajax获取数据，填充至options
            // 指定图表的配置项和数据

            var piePatternImg = new Image();
            piePatternImg.src = '/images/bg.jpeg';
            var bgPatternImg = new Image();
            bgPatternImg.src = '/images/bg2.jpeg';

            var itemStyle = {
                normal: {
                    opacity: 0.7,
                    color: {
                        image: piePatternImg,
                        repeat: 'repeat'
                    },
                    borderWidth: 3,
                    borderColor: '#235894'
                }
            };
            let pieOption = {
                backgroundColor: {
                    image: bgPatternImg,
                    repeat: 'repeat'
                },
                title: {
                    text: '',
                    textStyle: {
                        color: '#235894'
                    }
                },
                tooltip: {},
                series: [{
                    name: 'pie',
                    type: 'pie',
                    selectedMode: 'single',
                    selectedOffset: 30,
                    clockwise: true,
                    label: {
                        normal: {
                            textStyle: {
                                fontSize: 18,
                                color: '#235894'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#235894'
                            }
                        }
                    },
                    data: [
                        { value: 335, name: '房租>15000' },
                        { value: 310, name: '房租>10000' },
                        { value: 234, name: '房租>5000' },
                        { value: 135, name: '房租>2000' },
                    ],
                    itemStyle: itemStyle
                }]
            };
            let lineOption = {
                title: {
                    text: '房租面积分布图',
                    subtext: '数据来自链家网',
                    x: 'center',
                    align: 'right'
                },
                grid: {
                    bottom: 80
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                legend: {
                    data: ['房租', '面积'],
                    x: 'left'
                },
                dataZoom: [{
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 20
                }, {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 20
                }],
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    data: xdata,
                }],
                yAxis: [{
                    name: '房租(￥/月)',
                    type: 'value',
                    max: 20000
                }, {
                    name: '面积(m2)',
                    nameLocation: 'start',
                    max: 200,
                    type: 'value',
                    inverse: true
                }],
                series: [{
                    name: '房租',
                    type: 'line',
                    animation: false,
                    areaStyle: {
                        normal: {}
                    },
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    markArea: {
                        silent: true,
                        data: [
                            [{
                                xAxis: '2009/9/12\n7:00'
                            }, {
                                xAxis: '2009/9/22\n7:00'
                            }]
                        ]
                    },
                    data: value
                }, {
                    name: '面积',
                    type: 'line',
                    yAxisIndex: 1,
                    animation: false,
                    areaStyle: {
                        normal: {}
                    },
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    },
                    markArea: {
                        silent: true,
                        data: [
                            [{
                                xAxis: '2009/9/10\n7:00'
                            }, {
                                xAxis: '2009/9/20\n7:00'
                            }]
                        ]
                    },
                    data: area
                }]
            };

            let barOption = {
                tooltip: {},
                legend: {
                    data: ['房租']
                },
                xAxis: {
                    data: xdata,
                    axisLabel: {
                        show: true,
                        // 强制显示所有标签
                        interval: 5,
                        // {number}  
                        // rotate: 45,
                        // margin: 8  

                    }
                },
                yAxis: {},
                series: [{
                    name: '房租',
                    type: 'bar',
                    data: value,
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myBarChart.setOption(barOption);
            myLineChart.setOption(lineOption);
            myPieChart.setOption(pieOption);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        },
    })

})
