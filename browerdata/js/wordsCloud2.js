d3.csv("data.csv",function(error,data){
	 	var dataset = data;
	 	console.log(dataset);
	 	cloud(dataset);
	 });
	
	function cloud(dataset) {
	    console.log(dataset);
	    var chart = echarts.init(document.getElementById('wordcloud'));
	
	    var newdata = new Array();
	    for(var i=0;i<dataset.length;i++){
	        newdata[i] = new Object();
	        newdata[i].name = dataset[i].name;
	        newdata[i].value = 0.001;
	    }
	
	
	    var option = {
	        tooltip: {},
	        series: [ {
	            type: 'wordCloud',
	            gridSize: 1,
	            sizeRange: [0, 45],
	            rotationRange: [0, 90],
	            rotationStep: 90,
	            shape: 'pentagon',
	            width: 800,
	            height: 800,
	            drawOutOfBound: false,
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