var flag = 0;

d3.csv("918.csv",function(err,data){
	if(err)
	console.log(err);
	console.log(data);
	var i='1';
	a2 = Array.prototype.slice.call(data[2])
	console.log(data[2]);
	console.log(a2);
})



function sandianchart(datasets){

//--数据处理

	var dataset = [];
	for(var i = 0 ; i< datasets.length;i++){
		dataset[i] = [];
		dataset[i].push(parseInt(datasets[i].All_OnlineCount));
		dataset[i].push(parseFloat(datasets[i].Weekend_Ratio));

	}
	//console.log(dataset);
	d3.select("#lefttopchart").select("svg").remove();

	var padding={left:30, right:30, top:30, bottom:30};
	var width = 500;
	var height = 300;
	var svg = d3.select("#lefttopchart").append("svg")
		.attr("width",width)
		.attr("height",height);

var rectdata= [{},{},{}];
	var color = ["red","orange","green"];
	var rectX = 250;
			var rectY = 20;
	svg.selectAll("rect").data(rectdata).enter().append("rect")
					.attr("x",rectX).attr("y",function(d,i){
						return rectY+20*i;
					})
					.attr("rx",3)
					.attr("ry",3)
					.attr("fill",function(d,i){
						return color[i];
					})
					.attr("stroke","yellow")
					.attr('stroke-width','2px')
					.attr('border-radius',' 2px')
					// .on("mouseover",function(d,i){
					// 	console.log(datasets);
					// 	var a = d3.select(this);
					// 	//chuliOn(a,i);
					// 	//zhexian(i);
					// })

					// .on('mouseout',function(){
					// 	d3.select(this).attr("fill",'#f58f98');
					// })
					.attr("width",15).attr("height",9);
		svg.append("rect")
			.attr("x",rectX)
			.attr("y",function(d,i){
						return rectY+20*3;
					})
					.attr("rx",3)
					.attr("ry",3)
					.attr("fill","blue"
					)
					.attr("height",9)
					.attr("width",15)
					.attr("stroke","yellow")
					.attr('stroke-width','2px')
					.attr('border-radius',' 2px')
					.on("click",function(d,i){
						chulion(datasets,data_yuan);
					});

		var textdata = ['周末上网占比不正常','上网量偏大或偏小','常规'];
			svg.selectAll("text").data(textdata).enter().append("text")
					.attr("x",rectX+20)
					.attr("y",function(d,i){
						return rectY+8+20*i;
					})
					.text(function(d,i){
						return d;
					})
					.attr("fill","#FFF")
					.attr("font-size",'15px');


			svg.append("text").attr("x",rectX+20)
					.attr("y",function(d,i){
						return rectY+8+20*3;
					})
					.text("点击筛出/导入特殊数据")
					.attr("fill","#FFF")
					.attr("font-size",'15px');

				svg.append("text").attr("x",50)
					.attr("y",function(d,i){
						return 20;
					})
					.text("周末上网量的占比")
					.attr("fill","#FFF")
					.attr("font-size",'15px');

				svg.append("text").attr("x",350)
					.attr("y",function(d,i){
						return 240;
					})
					.text("总上网量")
					.attr("fill","#FFF")
					.attr("font-size",'15px');
	var xScale=d3.scale.linear()
			.domain([0,1.2*d3.max(dataset,function(d){
					return d[0];
			})])
			.range([0,width-padding.left-padding.right]);
	var yScale=d3.scale.linear()
					.domain([0,1.2*d3.max(dataset,function(d){
						return d[1];
					})])
					.range([height-padding.top-padding.bottom,0]);
	var circle=svg.selectAll("circle")
					.data(dataset)
					.enter()
					.append("circle")
					//.attr("fill","black")
					.attr("cx",function(d){
						return padding.left+xScale(d[0]);//设置圆心x坐标
					})
					.attr("cy",function(d){
						
						
						//console.log(yScale(d[1]));
						return yScale(d[1])+padding.bottom;
						//调节y的值  调了好久 
						//需要与设置的y轴的坐标相对应
					})
					.attr("r",1)//半径
					.attr("fill",function(d,i){
						if(d[0]>3000)
							return "orange";
						if(d[0]<300&&(d[1]>0.4||d[1]<0.1))
							return "red";
						if(d[0]<300)
							return "orange";
						return "green";
					});
	//定义x轴
	var xAxis=d3.svg.axis()
				.scale(xScale)
				.orient("bottom");//坐标轴方向
	//定义Y轴
	var yAxis=d3.svg.axis()
				.scale(yScale)
				.orient("left");
	 
	//添加X轴
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate("+padding.left+","+(height-padding.bottom)+")")
		.attr("fill","#FFF")
		.call(xAxis);
	 
	//添加y轴
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate("+padding.left+","+padding.top+")")
		// .attr("transform","translate("+padding.left+(height-padding.bottom-yAxisWidth)+")")
		.attr("fill","#FFF")
		.call(yAxis);
	

}
