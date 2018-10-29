function X(dataset) {
   // console.log(dataset);
    var chart = echarts.init(document.getElementById('wordcloud'));

    var newdata = new Array();
    for(var i=0;i<dataset.length;i++){
        newdata[i] = new Object();
        newdata[i].name = dataset[i].name;
        newdata[i].value = dataset[i].value;
    }


    var option = {
        tooltip: {},
        series: [ {
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [20, 60],
            rotationRange: [-90, 90],
            shape: 'pentagon',
            width: 700,
            height: 350,
            drawOutOfBound: true,
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data:[]
        } ]
    };
    option.series[0].data = newdata;

    console.log(option.series[0].data);

    chart.setOption(option);

   window.onresize = chart.resize;
}