function tiaoxingtu(d,id){
	var dataset = [];
	var data = [];
	data = d;
	if(id == 0){
	for(var i = 0 ;i < data.length;i++){
		dataset.push(data[i]*data[i]);
	}}
	else{
		dataset = d;
	}
	
	var tooltip = d3.select("body").append("div").attr("class", "toolTip");
	var text_my = ["各流域平均溶氧量的平方",'各流域平均氨氮量'];
	var color = ["#0F0","yellow","blue","#ff00ff","#f0f0f0","red","purple"];
	var name = ['长江','黄河','松花江','西南诸河','珠江','海河','淮河','其他'];
	var padding={top:20,right:30,bottom:20,left:40};
		    var rectWidth=25;
		    var width=310;
		    var height=210;
		    
	var svg=d3.select("#tiaoxingchart")
		    			.append("svg")
		    			.attr("class",'tiaochart')
		                .attr("width",width)
		                .attr("height",height);
		                
	svg.append("text").attr("font-size","12px")
			.text(text_my[id])
			.attr("transform","translate("+45+","+15+")");
			
	
	
	var xScale = d3.scale.ordinal()
		.domain(d3.range(dataset.length))
		.rangeRoundBands([0, width - padding.left - padding.right]);
		
	var yScale = d3.scale.linear()
		.domain([0,d3.max(dataset)])
		.range([height - padding.top - padding.bottom, 0]);
	
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
	
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");
	var rectPadding = 10;
	
	var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class","MyRect")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.on("mouseover",function(d,i){
			 tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html(name[i]+"<br>"+d.toFixed(3));
		})
		.on('mouseout',function(d,i){
			tooltip.style("display",'none');
		})
		.attr("x", function(d,i){
			return xScale(i) + rectPadding/2;
		} )
		.attr("y",height - padding.top - padding.bottom)
		.transition()
			   .delay(function(d,i){
			   	return 200*i;
			   })
			   .duration(2000)
			   .ease('bounce')
		.attr("y",function(d){
			return yScale(d);
		})
		.attr("fill",function(d,i){
			return color[i];
		})
		
		.attr("width", xScale.rangeBand() - rectPadding )
		.attr("height", function(d){
			return height - padding.top - padding.bottom - yScale(d);
		})
		;

		svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
		.call(xAxis); 
		

		svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.call(yAxis);


}
