$(() => {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    let xdata = [];
    let value = [];
    let params = {

    }

    $.ajax({
        data: params,
        url: 'http://localhost:3000/data',
        type: 'get',
        dataType: 'json',
        cache: false,
        timeout: 5000,
        success: function(data) {
            var data = $.parseJSON(data);

            for (let tmp of data) {
                xdata.push(tmp.region);
                value.push(tmp.rent);
            }
            //Ajax获取数据，填充至options
            // 指定图表的配置项和数据
            var option = {
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: xdata
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: value,
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        },
    })

})
