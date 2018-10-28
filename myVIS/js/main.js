//d3.csv = d3.dsv(",","text/csv;charset=UTF-8")
var dat = [];
console.log(dat);
// d3.select("#p1").append("text").text("");
// d3.select("#p2").append("text").text("");
// d3.select("#p3").append("text").text("");
d3.csv("infos.csv",function(err,data){
	if(err){
		console.log(err);
	}
	
	//console.log(data[0].basin);
var min_lon = 999.0;
var max_lon = 0.0;
var min_lat = 999.0;
var max_lat = 0.0;
//开始绘制地图
var width = 900;
var height = 765;
var datas = data;
//console.log(datas);
var svg = d3.select("body").select("#svg")
		.attr("id","geo_svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("g")
	    
	    .attr("transform", "translate(0,0)");
var projection = d3.geo.mercator()
    .center([105, 37])
    .scale(5000)
    .translate([width/2, height/2]);
var path = d3.geo.path()
    .projection(projection);
var color = d3.scale.category20();

svg.append("text").attr("x",600).attr("y",670).text("name:").attr("font-size",'20px');
svg.append("text").attr("x",600).attr("y",700).text("lat:").attr("font-size",'16px');
svg.append("text").attr("x",600).attr("y",730).text("lon:").attr("font-size",'16px');
svg.append("text").attr("x",600).attr("y",760).text("code:").attr("font-size",'16px');

	d3.json("china.geojson",function(error,root){
		if (error){
			console.log(error);
		}
		//console.log(root.features);
		//console.log(data);
	        
	        
	    svg.selectAll("path")
	        .data( root.features )
	        .enter()
	        .append("path")
	        .attr("stroke","#000")
	        .attr("stroke-width",1)
	        .attr("fill", function(d,i){
	            return "#666666";
	        })
	        .attr("d", path )  ; //使用地理路径生成器
	//      .on("mouseover",function(d,i){
	//                  d3.select(this)
	//                     .attr("fill","yellow");
	//              })
	//              .on("mouseout",function(d,i){
	//                  d3.select(this)
	//                     .attr("fill","#777777");
	//              });
	
//----------------标注--------------------
		var changjiang = [];
		var songhua = [];
		//var taihu = [];
		var huanghe=[];
		var haihe = [];
		//var chaohu = [];
		//var dianchi = [];
		var zhujiang = [];
		// var qiantang = [];
		var sw = [];
		var huaihe = [];
		//var hainan= [];
		var other = [];
		
		for(var i = 0;i<data.length;i++){
			dat.push(data[i]);
			if (data[i].basin === "长江"){
				changjiang.push(data[i]);
			}
			else if(data[i].basin ==="松花江"){
				songhua.push(data[i]);
			}
			else if(data[i].basin ==="黄河"){
				huanghe.push(data[i]);
			}
			else if(data[i].basin ==="淮河"){
				huaihe.push(data[i]);
			}
			else if (data[i].basin ==="海河"){
				haihe.push(data[i]);
			}
			else if (data[i].basin === "珠江"){
				zhujiang.push(data[i]);
			}
			else if (data[i].basin ==="西南诸河"){
				sw.push(data[i]);
			}
			else{
				other.push(data[i]);
			}
		}
		//console.log(changjiang);
		
		
		var circle_position = [];
		var por= [];
		//删去经纬度信息不对的节点
		for(var i = 0; i<data.length;i++){
			if(parseFloat(data[i].lon)<parseFloat(data[i].lat)){
				//console.log(i);
				//console.log(data[i]);
				//console.log(data[i]);
				
				data.splice(i,1); //这些点经纬度有明显问题
				//console.log(data[i]);
				
			}
		}
		//data.splice(31,1);
				//console.log(data);
				data.splice(67,2); //这两个点坐标不在境内
			 var flag = 0;
		for(var i = 0;i<data.length;i++){
			if(parseFloat(data[i].lat)<=min_lat)
				min_lat=parseFloat(data[i].lat);
			if(parseFloat(data[i].lat)>=max_lat)
				max_lat = parseFloat(data[i].lat);
			if(min_lon>=parseFloat(data[i].lon))
				min_lon=parseFloat(data[i].lon);
			if(max_lon<=parseFloat(data[i].lon))
				max_lon=parseFloat(data[i].lon);
		}
//		console.log(min_lon);
//		console.log(max_lon);
		for(var i = 0 ; i< data.length;i++){
			
			circle_position[i] = [parseFloat(data[i].lon),parseFloat(data[i].lat)];
			//console.log(circle_position);
			 var por = projection(circle_position[i]);
			 //console.log(por);

			if(data[i].basin==="长江"){
				svg.append("circle").attr("class","point_long")
					.attr("cx",por[0])
					.attr("cy",por[1])
					.attr("r",4)
					.attr("num",i)
					.on("mouseover",function(){
						var a= d3.select(this);
						a.attr("r",7);
						// var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						// //console.log(typeof(num));
						// dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("click",function(){
						var a= d3.select(this);
						var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						console.log(num);
						dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("mouseout",function(){
						var a = d3.select(this);
						a.attr("r",4);
					})
					.attr("fill","#0F0"); flag++;}
			else if(data[i].basin==="黄河"){
				svg.append("circle").attr("class","point_huang")
					.attr("cx",por[0])
					.attr("cy",por[1])
					.attr("r",4).attr("num",i)
					.on("mouseover",function(){
						var a= d3.select(this);
						a.attr("r",7);
						// var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						// //console.log(typeof(num));
						// dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("click",function(){
						var a= d3.select(this);
						var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						//console.log(num);
						dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("mouseout",function(){
						var a = d3.select(this);
						a.attr("r",4);
					})
					.attr("fill","yellow");flag++;}
			else if(data[i].basin==="松花江"){
				svg.append("circle").attr("class","point_song")
					.attr("cx",por[0])
					.attr("cy",por[1])
					.attr("r",4).attr("num",i)
					.on("mouseover",function(){
						var a= d3.select(this);
						a.attr("r",7);
						// var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						// //console.log(typeof(num));
						// dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("click",function(){
						var a= d3.select(this);
						var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						//console.log(num);
						dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("mouseout",function(){
						var a = d3.select(this);
						a.attr("r",4);
					})

					.attr("fill","blue");flag++;}
			else if(data[i].basin==="西南诸河"){
				svg.append("circle").attr("class","point_sw")
					.attr("cx",por[0])
					.attr("cy",por[1])
					.attr("r",4).attr("num",i)
					.on("mouseover",function(){
						var a= d3.select(this);
						a.attr("r",7);
						// var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						// //console.log(typeof(num));
						// dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("click",function(){
						var a= d3.select(this);
						var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						//console.log(num);
						dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("mouseout",function(){
						var a = d3.select(this);
						a.attr("r",4);
					})
					.attr("fill","#ff00ff");flag++;}
			else if(data[i].basin==="珠江"){
				svg.append("circle").attr("class","point_zhu")
					.attr("cx",por[0])
					.attr("cy",por[1])
					.attr("r",4).attr("num",i)
					.on("mouseover",function(){
						var a= d3.select(this);
						a.attr("r",7);
						// var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						// //console.log(typeof(num));
						// dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("click",function(){
						var a= d3.select(this);
						var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						//console.log(num);
						dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("mouseout",function(){
						var a = d3.select(this);
						a.attr("r",4);
					})
					.attr("fill","#f0f0f0");flag++;}
			else if(data[i].basin==="海河"){
				svg.append("circle").attr("class","point_hai")
					.attr("cx",por[0])
					.attr("cy",por[1])
					.attr("r",4).attr("num",i)
					.on("mouseover",function(){
						var a= d3.select(this);
						a.attr("r",7);
						// var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						// //console.log(typeof(num));
						// dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("click",function(){
						var a= d3.select(this);
						var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						//console.log(num);
						dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("mouseout",function(){
						var a = d3.select(this);
						a.attr("r",4);
					})
					.attr("fill","red");flag++;}
			else if(data[i].basin==="淮河"){
				svg.append("circle").attr("class","point_huai")
					.attr("cx",por[0])
					.attr("cy",por[1])
					.attr("r",4).attr("num",i)
					.on("mouseover",function(){
						var a= d3.select(this);
						a.attr("r",7);
						// var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						// //console.log(typeof(num));
						// dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("click",function(){
						var a= d3.select(this);
						var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						//console.log(num);
						dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("mouseout",function(){
						var a = d3.select(this);
						a.attr("r",4);
					})
					.attr("fill","purple");flag++;}
			else {
				svg.append("circle").attr("class","point_other")
					.attr("cx",por[0])
					.attr("cy",por[1])
					.attr("r",4).attr("num",i)
					.on("mouseover",function(){
						var a= d3.select(this);
						a.attr("r",7);
						// var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						// //console.log(typeof(num));
						// dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("click",function(){
						var a= d3.select(this);
						var num = a[0]["0"].attributes[4].value;//获得选中节点的序号值。
						//console.log(num);
						dataOfNode(num,data); //传出这个序号值，并处理展示。
					})
					.on("mouseout",function(){
						var a = d3.select(this);
						a.attr("r",4);
					})
					.attr("fill","#332255");flag++;}
		}
		//console.log(flag);
		var data_river1 = ['长江','黄河','松花江','西南诸河'];
		var data_river2 = ['珠江','海河','淮河','其他'];
		var data_river_color1 = ['#0F0','yellow','blue','#ff00ff'];
		var data_river_color2 = ['#f0f0f0','red','purple','#332255'];
		var wid_river = 40;
		var hei_river = 550;
		svg.selectAll(".point_marks1").data(data_river_color1).enter().append("circle").attr("class","point_marks1")
		      .attr("cx",wid_river)
		      .attr("cy",function(d,i){
		      	return hei_river+50*i+20;
		      })
		      .attr("r",4)
		      .attr("fill",function(d,i){
		      	return d;
		      }) 
		      .on('mouseover',function(d,i){
		      	d3.select(this)
		      	  .transition()
		      	  .duration(500)
		      	  .attr("r",7);
		      	
		      	//console.log(i);
		      	if(i ===0){
		      		d3.selectAll(".point_long")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",7);
		      	}
		      	else if(i===1){
		      		d3.selectAll(".point_huang")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",7);
		      	}
		      	else if(i===2){
		      		d3.selectAll(".point_song")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",7);
		      	}
		      	else {
		      		d3.selectAll(".point_sw")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",7);
		      	}
		      })
		      .on("mouseout",function(d,i){
		      	d3.select(this)
		      	  .transition()
		      	  .duration(500)
		      	  .attr("r",4);
		      	  
		      	 if(i ===0){
		      		d3.selectAll(".point_long")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",4);
		      	}
		      	else if(i===1){
		      		d3.selectAll(".point_huang")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",4);
		      	}
		      	else if(i===2){
		      		d3.selectAll(".point_song")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",4);
		      	}
		      	else {
		      		d3.selectAll(".point_sw")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",4);
		      	}
		      });
		      svg.selectAll(".point_marks2").data(data_river_color2).enter().append("circle").attr("class","point_marks2")
		      .attr("cx",wid_river+125)
		      .attr("cy",function(d,i){
		      	return hei_river+50*i+20;
		      })
		      .attr("r",4)
		      .attr("fill",function(d,i){
		      	return d;
		      })
		      .on('mouseover',function(d,i){
		      	d3.select(this)
		      	  .transition()
		      	  .duration(500)
		      	  .attr("r",7);
		      	
		      	if(i ===0){
		      		d3.selectAll(".point_zhu")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",7);
		      	}
		      	else if(i===1){
		      		d3.selectAll(".point_hai")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",7);
		      	}
		      	else if(i===2){
		      		d3.selectAll(".point_huai")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",7);
		      	}
		      	else {
		      		d3.selectAll(".point_other")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",7);
		      	}
		      })
		      .on("mouseout",function(d,i){
		      	d3.select(this)
		      	  .transition()
		      	  .duration(500)
		      	  .attr("r",4);
		      	  
		      			      	 if(i ===0){
		      		d3.selectAll(".point_zhu")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",4);
		      	}
		      	else if(i===1){
		      		d3.selectAll(".point_hai")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",4);
		      	}
		      	else if(i===2){
		      		d3.selectAll(".point_huai")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",4);
		      	}
		      	else {
		      		d3.selectAll(".point_other")
		      			.transition()
			   			.delay(function(d,i){return i*50})
			   			.duration(2000)
			   			.ease('bounce')
			   			.attr("r",4);
		      	}
		      });
		      
		svg.selectAll(".text_marks1").data(data_river1).enter().append("text")
		   .attr("class",'text_marks1')
		   .attr("x",wid_river+10)
		   .attr("y",function(d,i){
		      	return hei_river+50*i+28;
		   	
		   })
		   .attr("fill","black")
		   .attr("font-size",'18px')
		   .text(function(d,i){
		   	return d;
		   })
		  svg.selectAll(".text_marks2").data(data_river2).enter().append("text")
		   .attr("class",'text_marks2')
		   .attr("x",wid_river+135)
		   .attr("y",function(d,i){
		      	return hei_river+50*i+28;
		   	
		   })
		   .attr("fill","#000")
		   .attr("font-size",'18px')
		   .text(function(d,i){
		   	return d;
		   })
		   svg.append("text").attr("x",20).attr("y",100).attr("font-size","50px").text("各流域水质情况分析");
		//console.log(circle_position);
		var ph_l = []; //PH
		var ph_l_avg = 0.0;
		var O2_l = []; //氧
		var O2_l_avg = 0.0;
		var NH3_l = []; //氮氨
		var NH3_l_avg = 0.0;
		var MnK_l = [] //高猛酸钾
		var MnK_l_avg = 0.0;
		var C_l = []; //有机碳
		var C_l_avg = 0.0;
			//console.log(MnK_l_avg);
		
		d3.csv("testdata.csv",function(errors,testdata){
			if(errors){
				console.log(errors);
			}
			var low_toc = [];
			var allInfo = [];
			//allInfo = testdata;
			//先做数据处理
			for (var i = 0;i<testdata.length;i++){
				ph_l.push(parseInt(testdata[i].sta_ph_v));
				ph_l_avg = ph_l_avg+ph_l[i];
				O2_l.push(parseInt(testdata[i].sta_do_v));
				O2_l_avg = O2_l_avg+O2_l[i];
				NH3_l.push(parseInt(testdata[i].sta_an_v));
				NH3_l_avg = NH3_l_avg+NH3_l[i];
				MnK_l.push(parseInt(testdata[i].sta_toc_v));
				MnK_l_avg = MnK_l_avg+MnK_l[i];
				C_l.push(parseInt(testdata[i].sta_pp_v));
				C_l_avg = C_l_avg+C_l[i];
				var mis = [];
				//获得坐标信息
				for(var j = 0;j<data.length;j++){
					if(testdata[i].sta_id===data[j].code && parseInt(testdata[i].sta_toc_v)<9999){
						testdata[i]['lat'] = data[j].lat;
						testdata[i]['lon'] = data[j].lon;
						low_toc.push(testdata[i]);
					}
					
				}
				for(var j = 0;j<data.length;j++){
					if(testdata[i].sta_id===data[j].code){
						//testdata[i]['lat'] = data[j].lat;
						testdata[i]['basins'] = data[j].basin;
						allInfo.push(testdata[i]);
					}
					
				}
			}
			
				
					
				
			
			//console.log(allInfo);
			
			ph_l_avg = ph_l_avg/testdata.length;
			//console.log(ph_l_avg);
			O2_l_avg = O2_l_avg/testdata.length;
			NH3_l_avg= NH3_l_avg/testdata.length;
			MnK_l_avg = MnK_l_avg/testdata.length;
			C_l_avg = C_l_avg/testdata.length;
			//console.log(MnK_l_avg);
			//console.log(low_toc); //用于绘制一个低高猛酸盐的散点图，横纵坐标为经纬度。
			var toc_dataset = [];
			for(var i =0 ;i < low_toc.length;i++){
				toc_dataset[i] = [parseFloat(low_toc[i].lon),parseFloat(low_toc[i].lat)];
			}
			//console.log(toc_dataset);
			
//-----------得到各个流域的平均溶氧量，放在一个数组里
			
			var O2_avg = [];
			var PH_avg = [];
			var O2_chang = [];
			var O2_huang = [];
			var O2_zhu = [];
			var O2_huai = [];
			var O2_hai = [];
			var O2_sw = [];
			var O2_song = [];
			var len_O2 = [];
			var len_river = [];
			var PH_river = [];
			var len_ALL = [];
			var len_ph = [];
			var len_an = [];
			var an_avg = [];
			var an_river = [];
			for(var i = 0;i<8;i++){
				len_ALL.push(0.0);
				len_river.push(0.0);
				
			}
			for(var i = 0;i<7;i++){
				O2_avg.push(0.0);
				len_O2.push(0.0);
				len_ph.push(0.0);
				PH_river.push(0.0);
				an_river.push(0.0);
				len_an.push(0.0);
			}
			//console.log(len_O2);
			//var O2_chang = [];
			for(var i = 0; i<allInfo.length;i++){
				
			if(allInfo[i].basins==="长江"&&(parseFloat(allInfo[i].sta_do_v))>0){
				O2_chang.push(parseFloat(allInfo[i].sta_do_v));
				len_river[0]+=parseFloat(allInfo[i].sta_do_v);
				len_O2[0]++;
			}
			else if(allInfo[i].basins==="黄河"&&(parseFloat(allInfo[i].sta_do_v))>0){
				O2_huang.push(parseFloat(allInfo[i].sta_do_v));
				len_river[1]+=parseFloat(allInfo[i].sta_do_v);
				len_O2[1]++;
			}
			else if(allInfo[i].basins==="松花江"&&(parseFloat(allInfo[i].sta_do_v))>0){
				O2_song.push(parseFloat(allInfo[i].sta_do_v));
				len_river[2]+=parseFloat(allInfo[i].sta_do_v);
				len_O2[2]++;
			}
			else if(allInfo[i].basins==="西南诸河"&&(parseFloat(allInfo[i].sta_do_v))>0){
				O2_sw.push(parseFloat(allInfo[i].sta_do_v));
				len_river[3]+=parseFloat(allInfo[i].sta_do_v);
				len_O2[3]++;
			}
			else if(allInfo[i].basins==="珠江"&&(parseFloat(allInfo[i].sta_do_v))>0){
				O2_zhu.push(parseFloat(allInfo[i].sta_do_v));
				len_river[4]+=parseFloat(allInfo[i].sta_do_v);
				len_O2[4]++;
			}
			else if(allInfo[i].basins==="海河"&&(parseFloat(allInfo[i].sta_do_v))>0){
				O2_hai.push(parseFloat(allInfo[i].sta_do_v));
				len_river[5]+=parseFloat(allInfo[i].sta_do_v);
				len_O2[5]++;
			}
			else if(allInfo[i].basins==="淮河"&&(parseFloat(allInfo[i].sta_do_v))>0){
				O2_huai.push(parseFloat(allInfo[i].sta_do_v));
				len_river[6]+=parseFloat(allInfo[i].sta_do_v);
				len_O2[6]++;
			}
			else {
				//len_O2[7]++;
			}
			
			//氨
			if(allInfo[i].basins==="长江"&&(parseFloat(allInfo[i].sta_an_v))>=0&&(parseFloat(allInfo[i].sta_an_v))<1000){
				//O2_chang.push(parseFloat(allInfo[i].sta_do_v));
				an_river[0]+=parseFloat(allInfo[i].sta_an_v);
				len_an[0]++;
			}
			else if(allInfo[i].basins==="黄河"&&(parseFloat(allInfo[i].sta_an_v))>=0&&(parseFloat(allInfo[i].sta_an_v))<1000){
				//O2_huang.push(parseFloat(allInfo[i].sta_do_v));
				an_river[1]+=parseFloat(allInfo[i].sta_an_v);
				len_an[1]++;
			}
			else if(allInfo[i].basins==="松花江"&&(parseFloat(allInfo[i].sta_an_v))>=0&&(parseFloat(allInfo[i].sta_an_v))<1000){
				//O2_song.push(parseFloat(allInfo[i].sta_do_v));
				an_river[2]+=parseFloat(allInfo[i].sta_an_v);
				len_an[2]++;
			}
			else if(allInfo[i].basins==="西南诸河"&&(parseFloat(allInfo[i].sta_an_v))>=0&&(parseFloat(allInfo[i].sta_an_v))<1000){
				//O2_sw.push(parseFloat(allInfo[i].sta_do_v));
				an_river[3]+=parseFloat(allInfo[i].sta_an_v);
				len_an[3]++;
			}
			else if(allInfo[i].basins==="珠江"&&(parseFloat(allInfo[i].sta_an_v))>=0&&(parseFloat(allInfo[i].sta_an_v))<1000){
				//O2_zhu.push(parseFloat(allInfo[i].sta_do_v));
				an_river[4]+=parseFloat(allInfo[i].sta_an_v);
				len_an[4]++;
			}
			else if(allInfo[i].basins==="海河"&&(parseFloat(allInfo[i].sta_an_v))>=0&&(parseFloat(allInfo[i].sta_an_v))<1000){
				//O2_hai.push(parseFloat(allInfo[i].sta_do_v));
				an_river[5]+=parseFloat(allInfo[i].sta_an_v);
				len_an[5]++;
			}
			else if(allInfo[i].basins==="淮河"&&(parseFloat(allInfo[i].sta_an_v))>=0&&(parseFloat(allInfo[i].sta_an_v))<1000){
				//O2_huai.push(parseFloat(allInfo[i].sta_do_v));
				an_river[6]+=parseFloat(allInfo[i].sta_an_v);
				len_an[6]++;
			}
			else {
				//len_O2[7]++;
			}
			
			if(allInfo[i].basins==="长江"&&(parseFloat(allInfo[i].sta_ph_v))>0){
				//O2_chang.push(parseFloat(allInfo[i].sta_do_v));
				PH_river[0]+=parseFloat(allInfo[i].sta_ph_v);
				//len_O2[0]++;
				len_ph[0]++
			}
			else if(allInfo[i].basins==="黄河"&&(parseFloat(allInfo[i].sta_ph_v))>0){
				//O2_huang.push(parseFloat(allInfo[i].sta_do_v));
				PH_river[1]+=parseFloat(allInfo[i].sta_ph_v);
				//len_O2[1]++;
				len_ph[1]++
			}
			else if(allInfo[i].basins==="松花江"&&(parseFloat(allInfo[i].sta_ph_v))>0){
				//O2_song.push(parseFloat(allInfo[i].sta_do_v));
				PH_river[2]+=parseFloat(allInfo[i].sta_ph_v);
				//len_O2[2]++;
				len_ph[2]++;
			}
			else if(allInfo[i].basins==="西南诸河"&&(parseFloat(allInfo[i].sta_ph_v))>0){
				//O2_sw.push(parseFloat(allInfo[i].sta_do_v));
				PH_river[3]+=parseFloat(allInfo[i].sta_ph_v);
				//len_O2[3]++;
				len_ph[3]++;
			}
			else if(allInfo[i].basins==="珠江"&&(parseFloat(allInfo[i].sta_ph_v))>0){
				//O2_zhu.push(parseFloat(allInfo[i].sta_do_v));
				PH_river[4]+=parseFloat(allInfo[i].sta_ph_v);
				//len_O2[4]++;
				len_ph[4]++;
			}
			else if(allInfo[i].basins==="海河"&&(parseFloat(allInfo[i].sta_ph_v))>0){
				//O2_hai.push(parseFloat(allInfo[i].sta_do_v));
				PH_river[5]+=parseFloat(allInfo[i].sta_ph_v);
				//len_O2[5]++;
				len_ph[5]++;
			}
			else if(allInfo[i].basins==="淮河"&&(parseFloat(allInfo[i].sta_ph_v))>0){
				//O2_huai.push(parseFloat(allInfo[i].sta_do_v));
				PH_river[6]+=parseFloat(allInfo[i].sta_ph_v);
				//len_O2[6]++;
				len_ph[6]++;
			}
			else {
				//len_O2[7]++;
			}
			
			}
			for(var i = 0; i<allInfo.length;i++){
				
			if(allInfo[i].basins==="长江"){
				
				len_ALL[0]++;
			}
			else if(allInfo[i].basins==="黄河"){
				
				len_ALL[1]++;
			}
			else if(allInfo[i].basins==="松花江"){
				
				len_ALL[2]++;
			}
			else if(allInfo[i].basins==="西南诸河"){
				
				len_ALL[3]++;
			}
			else if(allInfo[i].basins==="珠江"){
				
				len_ALL[4]++;
			}
			else if(allInfo[i].basins==="海河"){
				
				len_ALL[5]++;
			}
			else if(allInfo[i].basins==="淮河"){
				
				len_ALL[6]++;
			}
			else {
				len_ALL[7]++;
			}
			}
			for(var i = 0; i<7;i++){
				O2_avg[i] = len_river[i]/len_O2[i];
				PH_avg[i] = PH_river[i]/len_ph[i];
				an_avg[i] = an_river[i]/len_an[i];
			}
			//len_O2[i]表示该流域测值数量
			
			//console.log(an_avg);
			tiaoxingtu(O2_avg,0);
			
			tiaoxingtu(an_avg,1);
			piechart(len_ALL);


			var svg_last = d3.select("#zhexianchart").append("svg").attr("width",600).attr('height',250).attr("id","zxchart");
			var rectdata= [{},{},{},{},{}];
			var rectX = 550;
			var rectY = 50
			svg_last.selectAll("rect").data(rectdata).enter().append("rect")
					.attr("x",rectX).attr("y",function(d,i){
						return rectY+20*i;
					})
					.attr("rx",3)
					.attr("ry",3)
					.attr("fill","#f58f98")
					.attr("stroke","yellow")
					.attr('stroke-width','2px')
					.attr('border-radius',' 2px')
					.on("mouseover",function(d,i){
						var a = d3.select(this);
						chuliOn(a,i);
						//zhexian(i);
					})

					.on('mouseout',function(){
						d3.select(this).attr("fill",'#f58f98');
					})
					.attr("width",15).attr("height",9);
			var textdata = ['ph','toc','pp','do','an'];
			svg_last.selectAll("text").data(textdata).enter().append("text")
					.attr("x",rectX+20)
					.attr("y",function(d,i){
						return rectY+8+20*i;
					})
					.text(function(d,i){
						return d;
					})
					.attr("font-size",'15px');


			
//-----------绘制散点图了------------------------
			// var wid = 600;
			// var hei = 400;
			// var xAxisWidth = 500;   // x轴宽度
			// var yAxisWidth = 300;   // y轴宽度
			// var a=d3.rgb(66,251,75);//浅绿
			// var b=d3.rgb(2,100,7);//深绿
			// var color=d3.interpolate(a,b);//颜色插值函数
			// var linear=d3.scale.linear()
			// 	.domain([200,1])
			// 	.range([0,1]);
			// var padding = {top: 20, right: 20, bottom:20, left:50};

			// var xScale = d3.scale.linear()
   //      		.domain([min_lon, max_lon])
   //      		.range([0, xAxisWidth]);

			// var yScale = d3.scale.linear()
   //      		.domain([min_lat, max_lat])
   //      		.range([0, yAxisWidth]);
			// var svg1 = d3.select("body").select("#san_dian")
			// 		.attr("width",wid)
			// 		.attr("height",hei);
			// var circle = svg1.selectAll("circle").data(toc_dataset)
			// 			.enter()
			// 			.append("circle")
			// 			.attr("cx",function(d,i){
			// 				return xScale(d[0])+padding.left;

			// 			})
			// 			.attr("cy",function(d,i){
			// 				return hei-padding.bottom-yScale(d[1]);

			// 			})
			// 			.attr("fill",function(d,i){
			// 				return "red";
			// 			})
			// 			.attr("r",2);
						
			// var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
			// yScale.range([yAxisWidth, 0]);
			// var yAxis = d3.svg.axis().scale(yScale).orient("left");
			
			// svg1.append("g").attr("class", "axis")
			// .attr("transform", "translate("+ padding.left +","+ (hei-padding.bottom) +")")
			// .call(xAxis);
			// svg1.append("g").attr("class", "axis")
   //          .attr("transform", "translate("+ padding.left +","+ (hei -padding.bottom- yAxisWidth) +")")
   //          .call(yAxis);


		})
	});

});