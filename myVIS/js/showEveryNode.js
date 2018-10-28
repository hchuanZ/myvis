var dataToShow = [];
var ph = [];
	var toc = [];
	var pp = [];
	var an = [];
	var do1 = [];
function dataOfNode(argument,data) {
	// body...
	//数据处理部分
	ph = [];
	pp=[];
	an = [];
	do1 = [];
	toc = [];
	var xuhao = parseInt(argument);
	var lat = [];
	var lon = [];
	var name = [];
	var description = [];
	var setuptime = [];
	var code = [];
	console.log(data[29].name);
	console.log(typeof(argument));
	lat.push(data[xuhao].lat);
	lon.push(data[xuhao].lon);
	name.push(data[xuhao].name);
	setuptime.push(data[xuhao].setupdate);
	code.push(data[xuhao].code);
	//console.log(lat);
	//console.log(typeof(code[0]));
	//数据展示部分
	var svg = d3.select("body").select("#geo_svg");
	svg.selectAll(".info").remove();
	svg.append("text").attr("x",660).attr("y",670).text(name).attr("font-size",'20px').attr("class","info");
	svg.append("text").attr("x",660).attr("y",700).text(lat).attr("font-size",'16px').attr("class","info");
	svg.append("text").attr("x",660).attr("y",730).text(lon).attr("font-size",'16px').attr("class","info");
	svg.append("text").attr("x",660).attr("y",760).text(code).attr("font-size",'16px').attr("class","info");

//绘制右下角折线图
	
//数据准备
	d3.csv("testdata.csv",function(err,dataset){
		if(err)
			console.log(err);
		dataToShow = [];
		for(var i = 0;i<dataset.length;i++){
			if (code[0] === dataset[i].sta_id)
				dataToShow.push(dataset[i]);
		}

		
	

	
	for(var i = 0 ; i < dataToShow.length; i++){
		if(dataToShow[i].sta_ph_v >= 9999 || dataToShow[i].sta_ph_v<0){}
			else
		ph.push(parseFloat(dataToShow[i].sta_ph_v));

		if(dataToShow[i].sta_pp_v>=9999 || dataToShow[i].sta_pp_v<0){}
			else
		pp.push(parseFloat(dataToShow[i].sta_pp_v));

	if(dataToShow[i].sta_do_v >= 9999 || dataToShow[i].sta_do_v<0){}
			else
		do1.push(parseFloat(dataToShow[i].sta_do_v));

	if(dataToShow[i].sta_an_v>=9999||dataToShow[i].sta_an_v<0){}
			else
		an.push(parseFloat(dataToShow[i].sta_an_v));

	if(dataToShow[i].sta_toc_v>=9999 || dataToShow[i].sta_toc_v<0){}
			else
		toc.push(parseFloat(dataToShow[i].sta_toc_v));
	}

	d3.select("#zxchart").selectAll('.maxmin').remove();
 // 	console.log(code[0]);
	// console.log(typeof(time[0]));
	// console.log(dataToShow);
	//zhexian(ph,1,xScale);
	//zhexian(toc,2,xScale);
	//zhexian(pp,3,xScale);
	//zhexian(ph);
	//zhexian(do1,5,xScale);
});
}

function timechange(str){
	var temper=str;
	var dt = (new Date(temper.replace(/-/,"/"))).getTime();
	return dt;
}

function chuliOn(a,i){
	var num = i;
	var flag = 0;
	console.log(dataToShow);
	var test = [dataToShow[0].sta_ph_v,dataToShow[0].sta_toc_v,dataToShow[0].sta_pp_v,dataToShow[0].sta_do_v,dataToShow[0].sta_an_v];
	console.log(typeof(test[i]));
	if (parseFloat(test[i])>=9999){
		//没法展示
		console.log("没法展示");
		a.attr("fill","red");
	}else if(parseFloat(test[i])<0){
		console.log("没法展示");
		a.attr("fill","red");
	}
	else{
		a.attr("fill","blue");
		zhexian(i);
	}
}
//var datas = [];
function zhexian(num){
	var data=[];
	if(num == 0 ) data = ph;
	else if (num == 1) data = toc;
	else if (num == 2) data = pp;
	else if (num == 3) data = do1;
	else if (num == 4) data = an;

	var svg  = d3.select('#zxchart');
	console.log(typeof(data[2]));
	var height = 250;
	var width = 650;

 var svg  = d3.select("#zxchart");
	var padding={top:70, right:70, bottom: 70, left:70};
	var time = [];
	for(var i = 0;i<dataToShow.length;i++){
		time.push(parseFloat(timechange(dataToShow[i].sta_time)));
	}
	d3.select("#zxchart").selectAll(".axis").remove();
	var begin = d3.min(time);
	var end = d3.max(time);
	var xScale=d3.scale.linear()
			.domain([begin,end])
			.range([0,width-padding.left-padding.right]);

//var padding={top:70, right:70, bottom: 70, left:70};
	var xAxis=d3.svg.axis()
			.scale(xScale)
			.ticks(time.length)
			//.tickFormat(d3.format(""))
			//.tickValues([1,time.length])
			//.tickFormat(d3.format("d"))
			.orient("bottom");
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate("+(padding.left-50)+","+(height-padding.top+50)+")")
		.call(xAxis);
	var mydata = [];
	 datas = [];
	// console.log(datas);
	for(var i = 0; i < data.length;i++){
		datas.push(parseFloat(data[i]));
	}
	for(var i = 0;i<data.length;i++){
		mydata.push([time[i],datas[i]]);
	}
	
	console.log(data);

	
	var min = 0; min = d3.min(data)-0.1;
	var max = 0; max = d3.max(data)+0.1;
	var yScale=d3.scale.linear()
			.domain([max,min])
			.range([height-padding.bottom,0]);
	var linePath=d3.svg.line()//创建一个直线生成器
				.x(function(d){
					//console.log(d);
					return xScale(d[0]);
				})
				.y(function(d){
					return yScale(d[1]);
				})
				.interpolate("linear");
				;
	var yAxis=d3.svg.axis()
			.scale(yScale)
			.orient("left");

	svg.append("g")
	.attr("class","axis")
	.attr("transform","translate("+(padding.left-50)+","+(padding.top-20)+")")
	.call(yAxis);

	d3.select("#zxchart").select('path').remove();

	// svg.selectAll("path").data(mydata).enter().append("path")
	// .attr("transform","translate("+35+","+35+")")
	// .attr("d",function(d){return linePath(d)})
	// .attr("class","path1")
	// .attr("fill","none")
	// .attr("stroke-width",0.1)
	// .attr("stroke",'red');
	svg.append('path')
	.attr('d',linePath(mydata))
	.attr("stroke",'green')
	.attr("transform","translate("+(padding.left-50)+","+(padding.top-20)+")")
	.attr("stroke-width",1)
	.attr('fill','none');
	d3.selectAll('.maxmin').remove();
	svg.append("text")
	.attr("class",'maxmin')
	.attr("x",0).attr("y",50)
	.text(max-0.1);

	svg.append("text")
		.attr("class",'maxmin')
		.attr("x",0)
		.attr("y",220)
		.text(min+0.1);

	var begintime = new Date(begin);
	var endtime = new Date(end);
	svg.append('text')
	.attr("class","time")
	.attr("x",10)
	.attr("y",250)
	.text("2015.1.1");
	svg.append('text')
	.attr("class","time")
	.attr("x",480)
	.attr("y",250)
	.text("2015.1.31");
}