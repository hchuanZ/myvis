/*
document.getElementById("Analysis").addEventListener("click",function(){
	openwin();
});
*/

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Event listner for clicks on links in a browser action popup.
// Open the link in a new tab of the current window.


// Given an array of URLs, build a DOM list of those URLs in the
// browser action popup.

window.onload=function(){
//document.getElementById("Vis").addEventListener("click",function(){
//  openwin();
//});
//  document.getElementById("analysis").addEventListener("click",function(){
//  openwin2();
//});
//document.getElementById("Analysis").addEventListener("click",function(){
//   openwin3();
//});

	

};

function openwin() {  
        window.open("vis1.html", "111", "width=1600,height=800")  
        
    }  
 
function openwin2() {
        window.open("test2.html", "11", "width=1600,height=1050")  
    }  
function openwin3() { 
        window.open("test2_.html", "111", "width=1600,height=1050")  
    }  
function drawPaint(){
	
}
 var history_json=[];


                //console.log(data);
                //console.log(data instanceof Array);//typeof(data):Array
var lastVisTime = []; 

//----------------------------------------------------------------
    var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7 *500;
    var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
    chrome.history.search({
            'text': '',              // Return every history item....
            'startTime': oneWeekAgo,  // that was accessed less than one week ago.
             'maxResults':10000
        },
        function(historyItems) {

            //把历史记录下拉到本地保存为json格式

            for(var i=0;i<historyItems.length;i++){
                 var x=historyItems[i].lastVisitTime;
                history_json.push(historyItems[i]);
                
                history_json[i].lastVisitTime=Conversiontime(x);
                history_json[i]['lastVisitTimeTimestamp']=x;
            }
            //console.log(history_json[0]);
            //console.log(history_json[0].lastVisitTime);
            //temp = history_json[0].lastVisitTime.split("/");
        });
        
         console.log(history_json);
function Conversiontime(timestamp) {
	var finatime;
    var date = new Date(timestamp);
    Y = date.getFullYear() + '/';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    D = (date.getDate()<10?'0'+(date.getDate()):date.getDate())+'/';
    h = (date.getHours()<10?'0'+(date.getHours()):date.getHours());
    if(h>12){
    	D=D+"PM";
    	h=h-12+':';
    }
    else{
    	D=D+"AM";
    	h=h+":";
    }
    m = (date.getMinutes()<10?'0'+(date.getMinutes()):date.getMinutes())+':';
    s = (date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds());
    finatime=String(Y+M+D+h+m+s);
   // console.log(finatime);
    return finatime;}
//-----------------------------------------------------------------
//          console.log(history_json[0]);
//          console.log(typeof(history_json[0].lastVisitTime));
//          String(history_json[0].lastVisitTime);
//          console.log(typeof(history_json[0].lastVisitTime));
            
            //console.log(history_json[0]);
           // console.log(history_json[0].lastVisitTime);
            //console.log(history_json);
 d3.json("history1.json",function(error,data){       	
        console.log(data[0].lastVisitTime);
        console.log(typeof(data[0].lastVisitTime));
        console.log(history_json.length);
        
        data = history_json;
        
    data.length = history_json.length;
        
        //console.log(data[0]);
       // console.log(data[110].lastVisitTime);
        //console.log(typeof(data[110].lastVisitTime));
        
        //console.log(data);
        //console.log(data[1]);
        data.sort(comparex);
        
        var Timedatax=new Array;
        Timedatax[0]=new Object();
       
        var temp = data[0].lastVisitTime.split("/");

         Timedatax[0].date=timeFormatSet(new Date(temp[0],temp[1]-1,temp[2]));
         Timedatax[0].mounts=0;

        //console.log(Timedatax[0]);
//-----------------------------------------------------------------

    for (var i=0;i<data.length;i++)
    {
        var str = data[i].url;

        if (str.search("http://")==-1 && str.search("https://")==-1)
        {
            for (var j=str.length-1;j>=0;j--)
            {
              if (str[j]=='/' && str[j+1]=='/')
              {
                   data[i].url=str.substring(j,str.length);
              }
            }
        }
        else {
          var front = str.search("http://");
          if (front==-1)
          {
            front = str.search("https://")+8;
          }
          else front+=7;

          if (front==-1)
            { 
              data.splice(i,1);
              continue;
            }

          var back;
          for (var j=12;j<str.length;j++)
          {
            if (str[j]=='/')
                {
                  back=j;
                  break;
                }
          }

          if (front!=-1 && back!=-1)
          {
            data[i].url=str.substring(front,back);
            if (data[i].url.search("www.")!=-1)
            {
             // console.log(data[i].url);
              data[i].url=data[i].url.substring(4,data[i].url.length);
            }
          }
      }

//统计每日------------------------------------------------------------------------------
        console.log(typeof(data[i].lastVisitTime));
        var temp = data[i].lastVisitTime.split("/");

        var week=timeFormatSet(new Date(temp[0],temp[1]-1,temp[2]));

        if (Timedatax[Timedatax.length-1].date==week)
        {
            Timedatax[Timedatax.length-1].mounts+=data[i].visitCount;
        }
        else
        {
            var x=Timedatax.length;
            Timedatax[x]=new Object();
            Timedatax[x].date=week;
            Timedatax[x].mounts=0;
        }
   }
  // console.log(Timedatax);

//------------------draw----------------------------------------------------
//------------------draw----------------------------------------------------
//------------------draw----------------------------------------------------
//------------------draw----------------------------------------------------
//console.log(Sorts);
var datax=GetRadarData(data);
var value = (datax[0].map(function(i, j){return i.value}));
//console.log(value);
 var config = {
    w: 300,
    h: 300,
    maxValue:d3.max(value,function(d){
      return d;
    }),
    levels: 5,
    ExtraWidthX: 300
}

     // console.log(datax);
     // console.log(data);
      RadarChart.draw("#RadarChart", datax, config);
      //RadarChart2.draw("#RadarChart2", datax, config);
      
      piecharts(data,10);
      tiaoxingtu(data);
      
      
      // d3.json("newdata.json", function(error, root) {
 		// 		if (error) throw error;
 		// 		sunburst(root);
 		// 	});

      
//------------------draw----------------------------------------------------
//------------------draw----------------------------------------------------
//------------------draw----------------------------------------------------
//------------------draw----------------------------------------------------



//-时间轴---------------------------------------------------------------------------------
//-时间轴---------------------------------------------------------------------------------
//-时间轴---------------------------------------------------------------------------------
//console.log(Timedatax);
        function TimeLine() {
            for (var i=0;i<Timedatax.length;i++)
            {
                Timedatax[i].mounts=Number(Timedatax[i].mounts);
                Timedatax[i].date=new Date(Timedatax[i].date.split("/"));
            }

            //console.log(Timedatax[Timedatax.length-1]);
            var svgFilter = d3.select("#svg-filter");

            // slider
            var sliderHeight=70;
            var sliderWidth = 650;
            var sliderMargin = {
                "top" : 68,
                "bottom" : 100,
                "left" : 50,
                "right" : 550
            };

            var timefo=d3.timeFormat("%Y/%m/%d");

            var b=Timedatax[0].date;
            var e=Timedatax[Timedatax.length-1].date;


            var xYearFirst = d3.scaleTime()
                .domain([b, e])
                .range([0, sliderWidth])
                .clamp(true);

            var  x2 = d3.scaleTime().range([0, sliderWidth]);

            var sliderYearFirst = svgFilter.append("g")
                .attr("class", "slider")
                .attr("transform", "translate(" + sliderMargin.left + "," + sliderMargin.top + ")");

            sliderYearFirst.append("line")
                .attr("class", "track")
                .attr("x1", xYearFirst.range()[0])
                .attr("x2", xYearFirst.range()[1]);


            sliderYearFirst.insert("g")
                .attr("class", "ticks")
                .attr("transform", "translate(0," + 20 + ")")
                .selectAll("text")
                .data(xYearFirst.ticks(7))
                .enter().append("text")
                .attr("font-size", "10px")
                .attr("x", xYearFirst)
                .attr("text-anchor", "middle")
                .text(function(d) { return timefo(d); });


            var context = svgFilter.append("g")
                .attr("class", "context")
                .attr("transform", "translate(" + 30 + "," + 10 + ")");


//文字--------------------------------------------------------------------------
            var xx = [sliderMargin.top-10,sliderWidth-70];

            var svgFilterText = svgFilter
                .insert("g")
                .selectAll("text")
                .data([0,1])
                .enter()
                .append("text");

            var svgFilterLabels =  svgFilterText
                .attr("x", function(d) { return xx[d]; })
                .attr("y", sliderMargin.top+35)
                .text( function (d) { return 0; })
                .attr("font-family", "sans-serif")
                .attr("font-size", "9px");

            var svgFilterDesc = svgFilter
                .insert("g")
                .selectAll("text")
                .data([2])
                .enter()
                .append("text");


//刷子----------------------------------------------------------------------------

            var Yheight=70;
            var x = d3.scaleTime().range([0, sliderWidth]),
                x2 = d3.scaleTime().range([0, sliderWidth]),
                y = d3.scaleLinear().range([Yheight, 0]),
                y2 = d3.scaleLinear().range([Yheight, 0]);

            var area2 = d3.area()
                .curve(d3.curveMonotoneX)
                .x(function(d) { return x2(d.date); })
                .y0(Yheight)
                .y1(function(d) { return y2(d.mounts); });


            x2.domain(d3.extent(Timedatax, function(d) { return d.date; }));
            y2.domain([0, d3.max(Timedatax, function(d) { return d.mounts; })]);


            var brush = d3.brushX()
                .extent([[0, 0], [sliderWidth, sliderHeight]])
                .on("brush", function(){
                    updateFilterText();
                })
                .on("end", function(){

                    Refresh(getRangeText(),data);

                });

            context.append("path")
                .attr("class", "area")
                .attr("d", area2(Timedatax))
                .attr("transform", "translate(0," + 0 + ")");

            context.append("g")
                .attr("class", "brush")
                .call(brush)
                .call(brush.move, x.range())
                .attr("transform", "translate(0," + 0 + ")");


            var handle1 = context.select(".brush").select(".handle--w");
            var handle2 = context.select(".brush").select(".handle--e");

            function brushed() {

                var s = d3.event.selection || x2.range();
                x.domain(s.map(x2.invert, x2));

            }

            function getRangeText() {
                var handle1 = context.select(".brush").select(".handle--w");


                var handle2 = context.select(".brush").select(".handle--e");

                /*       console.log(Number(handle1.attr("x"))+3);
                        console.log(Number(handle2.attr("x"))+3);*/

                var valA = xYearFirst.invert(Number(handle1.attr("x"))+3);
                var valB = xYearFirst.invert(Number(handle2.attr("x"))+3);

                //console.log(timefo(valA),timefo(valB));

                return [timefo(valA),timefo(valB)];
            }

            function updateFilterText() {
                var Timedataxx = getRangeText();
                //console.log(Timedatax);
                var valA = +Timedataxx[0];
                var valB = +Timedataxx[1]
                redrawLabel(Timedataxx);
            }

            function redrawLabel(curVal) {

                //console.log(svgFilterText);

                svgFilterLabels
                    .text(function(d) { return curVal[d]; })
            }
        }
        TimeLine();

//-时间轴---------------------------------------------------------------------------------
//-时间轴---------------------------------------------------------------------------------
//-时间轴--------------------------------------------------------------------------------- 
	  tiaoxingtu2(data);
      //tiaoxingtu3(data);
});
//刷新------------------------------------------------------------------------------------


function Refresh(DataRange,data){

           var x= data.slice(0,data.length);
           var newdata;

           newdata=RefreshData(DataRange,x);

         /*  console.log(DataRange);
           console.log(newdata);*/

           piecharts(newdata,10);
           tiaoxingtu(newdata);
		   tiaoxingtu2(newdata);
			//tiaoxingtu3(newdata);
           var datax=GetRadarData(newdata);


            var value = (datax[0].map(function(i, j){return i.value}));
            var config = {
                  w: 300,
                  h: 300,
                  maxValue:d3.max(value,function(d){
                    return d;
                  }),
                  levels: 5,
                  ExtraWidthX: 300
              }
           RadarChart.draw("#RadarChart", datax, config);

           }

function RefreshData(DataRangex,originalData)
        {

          var DataRange_start = DataRangex[0].split("/");

          var DataRange_end = DataRangex[1].split("/");

/*           console.log(originalData);
           console.log(data);*/
            var x1=0;
            var x2=0;

            for(var i=0;i<originalData.length;i++)
            {

              var temp=originalData[i].lastVisitTime.split("/");
              if (timeFormatSet(new Date(DataRange_start[0],DataRange_start[1],DataRange_start[2]))<=timeFormatSet(new Date(temp[0],temp[1],temp[2])))
              {
                  x1=i;
/*                  console.log(DataRange_start);
                  console.log(originalData[i]);
                  console.log(x1);*/
                  break;
              }
            }

           for(var i=0;i<originalData.length;i++)
            {

              var temp=originalData[i].lastVisitTime.split("/");
                if (timeFormatSet(new Date(DataRange_end[0],DataRange_end[1],DataRange_end[2]))<timeFormatSet(new Date(temp[0],temp[1],temp[2])))
              {
                  x2=i; 
/*                  console.log(DataRange_end);
                  console.log(originalData[i]);
                  console.log(originalData[i+1]);
                  console.log(i);*/
                  break;
              }
            }
            if (x2==0)
              x2=originalData.length;

         //   console.log(x1,x2);
           return originalData.slice(x1,x2);

}
function GetRadarData(data)
{
     var Sorts=new Array;

         Sorts["Entertainment"]=new Object;
         Sorts["Society"]=new Object;
         Sorts["Shopping"]=new Object;
         Sorts["Search"]=new Object;
         Sorts["News"]=new Object;
         Sorts["Education"]=new Object;
         Sorts["undefined"]=new Object;

         Sorts["Entertainment"].times=0;
         Sorts["Society"].times=0;
         Sorts["Shopping"].times=0;
         Sorts["Search"].times=0;
         Sorts["News"].times=0;
         Sorts["Education"].times=0;
         Sorts["undefined"].times=0;

         Sorts["Entertainment"].content=new Array;
         Sorts["Society"].content=new Array;
         Sorts["Shopping"].content=new Array;
         Sorts["Search"].content=new Array;
         Sorts["News"].content=new Array;
         Sorts["Education"].content=new Array;
         Sorts["undefined"].content=new Array;
		//console.log(Typedata.length);
         var times=new Array;
           for (var i=0;i<Typedata.length;i++)
          {
            times[Typedata[i].Name] = new Object;
            times[Typedata[i].Name].type=Typedata[i].Type;
            times[Typedata[i].Name].ifexist=0;
          }

           for (var i=0;i<data.length;i++)
          {

        //分类--------------------------------------------------------------------------
                //console.log(Sorts);
                if (times[data[i].url]!=undefined)
                {

                    var x=times[data[i].url].type;
                    Sorts[x].times++; 
                }
                else 
                {
                    times[data[i].url] = new Object;
                    times[data[i].url].type="undefined";
                    times[data[i].url].ifexist=0;
                }
                 if (times[data[i].url].ifexist==0 &&  Sorts[x]!=undefined){

                    Sorts[x].content.push(data[i].url);
                    times[data[i].url].ifexist=1;
                   }
          }

           var datax=[];
            datax[0]=new Array;

            for(var i=0;i<6;i++)
              datax[0][i] = new Object;

            datax[0][0].area="Education";
            datax[0][1].area="Entertainment";
            datax[0][2].area="News";
            datax[0][3].area="Search";
            datax[0][4].area="Shopping";
            datax[0][5].area="Society";

            datax[0][0].value=Sorts["Education"].times ;
            datax[0][1].value=Sorts["Entertainment"].times;
            datax[0][2].value=Sorts["News"].times;
            datax[0][3].value=Sorts["Search"].times;
            datax[0][4].value=Sorts["Shopping"].times;
            datax[0][5].value=Sorts["Society"].times;
						
						//console.log(datax[0][1].value);
						//对数据取对数  修改：数据可能为0，需要对数据+1 取对数
						for (var i = 0; i < 6; i++){
							datax[0][i].value =parseInt(Math.log(datax[0][i].value+1));
						}						
            return datax;

    }

var timeFormatSet=d3.timeFormat("%Y/%m/%d");
var comparex = function (obj1, obj2) 
                  {
                    var time1=obj1.lastVisitTime.split("/");
                    var val1=timeFormatSet( new Date(Number(time1[0]),Number(time1[1])-1,Number(time1[2]) ) );

                    var time2=obj2.lastVisitTime.split("/");
                    var val2=timeFormatSet( new Date(Number(time2[0]),Number(time2[1])-1,Number(time2[2])) );
                    
                          if (val1 < val2) {
                              return -1;
                          } else if (val1 > val2) {
                             
                              return 1;
                          } else {
                              return 0;
                          }
                   }            
 
