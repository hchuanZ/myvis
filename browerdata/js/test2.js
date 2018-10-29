
    d3.json("history_json",function(error,data){

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
  }

  //console.log(data);

    var top=20;

    var compare = function (obj1, obj2) {
    var val1 = obj1.url;
    var val2 = obj2.url;
    if (val1 < val2) {
        return -1;
    } else if (val1 > val2) {
        return 1;
    } else {
        return 0;
    }            
} 

    data.sort(compare);
   // console.log(d);
    var history=new Array(); 

    var count=0;
    var Nowurl=data[0].url;
    var NowTitle=data[0].title;
    history[count]=new Object();
    history[count].url=Nowurl;
    history[count].mounts=data[0].visitCount;
    history[count].title=data[0].title;
   // console.log(history);

    for (var i=1;i<data.length;i++)
    {
        if (Nowurl==data[i].url)
        {
          history[count].mounts+=data[i].visitCount;
                //  console.log(history);
        }
        else
        {
          count++;
          Nowurl=data[i].url;
          NowTitle=data[i].title;
          history[count]=new Object();
          history[count].url=Nowurl;
          history[count].title=NowTitle;
          history[count].mounts=data[0].visitCount;

                  //console.log(history);
        }

    }

    var compare2 = function (obj1, obj2) {
    var val1 = obj1.mounts;
    var val2 = obj2.mounts;
    if (val1 > val2) {
        return -1;
    } else if (val1 < val2) {
        return 1;
    } else {
        return 0;
    }            
};

    history.sort(compare2);
    history=history.splice(0,top);
 //   console.log(history);



    /*-----------------------词云----------------------------*/
    d3.csv("words.csv",function (error,data) {
      //delete by sm@20180525
            if(error) throw error;
      //delete by sm@20180525
            var words = data;
            //console.log(words[0].name);
            //console.log(words);
             X(words);
             WordsCloudReport(words);
        });


    /*-----------------------词云----------------------------*/


    /*----------------------------处理数据-----------------*/
        var hours = new Array(25).join(Number(0)).split('');

        var each_day=new Array();
        for(var j=1;j<=12;j++){
          each_day[j]=new Array(33).join(Number(0)).split('');
        for(var k=0;k<33;k++){
          each_day[j][k]=new Array(8).join(Number(0)).split('');
        }
       }



      for (var i=0;i<data.length;i++){
        var temp = String(data[i].lastVisitTime).split("/")[3].split(":");

        var tempday = String(data[i].lastVisitTime).split("/");
        //console.log( data[i].lastVisitTime);
        var hour = temp[0];
        if (hour[0]=='A')
          hour =Number(hour.substring(2,hour.length));
        else 
          hour = (Number(hour.substring(2,hour.length))+12)%24;


        if(hour==0 && each_day[tempday[1]][tempday[2]][0]==0){
          each_day[tempday[1]][tempday[2]][0]=Number(each_day[tempday[1]][tempday[2]][0])+Number(1);
        }
         if(hour==1 && each_day[tempday[1]][tempday[2]][1]==0){
          each_day[tempday[1]][tempday[2]][1]=Number(each_day[tempday[1]][tempday[2]][1])+Number(1);
        }
         if(hour==2 && each_day[tempday[1]][tempday[2]][2]==0){
          each_day[tempday[1]][tempday[2]][2]=Number(each_day[tempday[1]][tempday[2]][2])+Number(1);
        }
         if(hour==3 && each_day[tempday[1]][tempday[2]][3]==0){
          each_day[tempday[1]][tempday[2]][3]=Number(each_day[tempday[1]][tempday[2]][3])+Number(1);
        }
         if(hour==4 && each_day[tempday[1]][tempday[2]][4]==0){
          each_day[tempday[1]][tempday[2]][4]=Number(each_day[tempday[1]][tempday[2]][4])+Number(1);
        }
         if(hour==5 && each_day[tempday[1]][tempday[2]][5]==0){
          each_day[tempday[1]][tempday[2]][5]=Number(each_day[tempday[1]][tempday[2]][5])+Number(1);
        }
         if(hour==6 && each_day[tempday[1]][tempday[2]][6]==0){
          each_day[tempday[1]][tempday[2]][6]=Number(each_day[tempday[1]][tempday[2]][6])+Number(1);
        }
      }
      var record=new Array();
        for(var i=1;i<13;i++){
        for(var j=0;j<33;j++){

          var temp_level=0;
          for(var k=0;k<7;k++){
            temp_level=Number(temp_level)+Number(each_day[i][j][k]);
          }

          var day={};
           day.date="2017"+"/"+i+"/"+j;
           day.level=temp_level;
           record.push(day);
        }
     }
     //日历图
     Calender(record);
    //    console.log(record);



      var day_section = daytime(data);
      //console.log(day_section[0].times);


        /*-------------------------report---------------------------*/
        function WordsCloudReport(data) {
            var w1,w2,w3;
            w1 = history[0].url;
            w2 = history[1].url;
            w3 = history[2].url;
            var word1,word2,word3;
            word1 = data[0].name;
            word2 = data[1].name;
            word3 = data[2].name;
            var kind;
            for(var i=0;i<Typedata.length;i++){
                if(w1==Typedata[i].Name){
                    kind = Typedata[i].Type;
                }
            }
            var repoet = "词云呈现了您这一段时间以来访问网站的关键词。" +"可以看出您的关键词是："+word1+" 、"+word2+" 、"+word3+" 。"+"您最喜欢访问的网站类型" +
                "是："+kind;
            document.getElementById("Wreport").innerHTML = repoet;
        }
        //WordsCloudReport();

        function DaytimeReport() {
            var timeSection;
            var maxCount = getSection();
            //console.log(maxCount);
            for(var i=0;i<day_section.length;i++) {
                if (maxCount == day_section[i].times) {
                    timeSection = day_section[i].section;
                    break;
                }
            }
            var repoet = "环形时间轴图中可以看出您每一天不同时间段访问网站的次数，您使用电脑访问网站的时间大致在  "+timeSection+"  这一时间段较多。";
            if(timeSection=="night"||timeSection=="midnight"){
                repoet+=" 晚上或深夜不要使用电脑太久，注意休息。"
            }
            document.getElementById("Treport").innerHTML = repoet;
        }
        DaytimeReport();
        function getSection() {
            var maxCount = d3.max(day_section,function(d) {
                                                return d.times;}
                                 );
            return maxCount;
        }


        function CalenderReport() {
            var date = getCalenderTime();
            var repoet = "日历图代表了您每一天的熬夜程度，这段时间以来，您在 ";
            for (var i=0;i<date.length;i++){
                repoet+=date[i].date+" ";
            }
            repoet+=" 中经常熬夜，请注意调整生活作息。"
            document.getElementById("Creport").innerHTML = repoet;
            //console.log(date);
        }
        CalenderReport();

        function getCalenderTime() {
            var date = new Array();
            for(var i=0;i<record.length;i++){
                if(record[i].level>1){
                    date.push(record[i]);
                }
            }
            return date;
        }





});


