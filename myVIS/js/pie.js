function piechart(argument) {
	var dataset = [];
	dataset = argument;
	console.log(dataset);
	var textdata = [];
	var all = 0;
	for(var i = 0; i < dataset.length;i++){
		textdata[i] = 0.0;
		all+=dataset[i];
	}
	for(var i = 0; i<dataset.length;i++){
		textdata[i] = (dataset[i]/all*100).toPrecision(3)+"%";
	}
	var innerR = 50;
	var outR = 130;

	var height = 300;
	var width = 300;
	var padding={top:20,right:30,bottom:20,left:40};
	var svg = d3.select("body").select("#piechart")
	 			.append("svg")
	 			.attr("width",width)
	 			.attr("height",height)
	 			.attr("class","myPieChart");

	var color = ["#0F0","yellow","blue","#ff00ff","#f0f0f0","red","purple",'#332255'];
	var name = ['长江','黄河','松花','西南','珠江','海河','淮河','其他'];
	svg.append("text").attr("font-size","12px")
			.text("各流域统计数据量")
			.attr("transform","translate("+45+","+15+")");

	var pie = d3.layout.pie();
	var piedata = pie(dataset);
	var arc = d3.svg.arc()
			.innerRadius(innerR)
			.outerRadius(outR);

	var arcs = svg.selectAll("g").data(piedata)
				.enter()

				.append("g")
				.attr("transform","translate("+width/2+","+(width/2+10)+")");

	arcs.append("path")
		.attr("fill",function(d,i){
			return color[i];
		})
		.attr("d",function(d){
			return arc(d);
		})
		.on("mouseover",function(d,i){
			d3.select('.centertext').remove();
			svg.append("text")				
				.attr("class","centertext")
				.attr("x",width/2-40)
				.attr('y',height/2+15)
				.attr("fill",'#0F0')
				.text(name[i]+":"+textdata[i]);

			var arc1 = d3.svg.arc().innerRadius(innerR).outerRadius(outR+10);
			d3.select(this).attr("d",arc1(d));
		})
		.on("mouseout",function(d,i){
			d3.select(this).attr("d",arc(d));
		});
		svg.append("text")
				
				.attr("class","centertext")
				.attr("x",width/2-35)
				.attr('y',height/2+14)
				.text("mouseover");
	//  arcs.append("text")
	// // 	.attr("transform",function(d){
	// 		return "translate("+arc.centroid(d)+")";
	// 	})
	// 	.attr("text-anchor","middle")
	// 	.text(function(d,i){
	// 		return textdata[i];
	// 	});
}