  	var a = [{
        "id": "3343",
        "lastVisitTime": "2017/6/24/PM7:03:11",
        "lastVisitTimeTimestamp": 1498302191122.8271,
        "title": "百度一下，你就知道",
        "typedCount": 0,
        "url": "https://www.baidu.com/#ie=UTF-8&wd=sublime%20%E5%87%BD%E6%95%B8%E9%AB%94%E8%A1%93",
        "visitCount": 1
    },
    {
        "id": "3342",
        "lastVisitTime": "2017/6/24/PM7:00:49",
        "lastVisitTimeTimestamp": 1498302049253.264,
        "title": "QQ邮箱",
        "typedCount": 0,
        "url": "https://mail.qq.com/cgi-bin/frame_html?sid=jhVOr6GyFiJsfTxl&t=newwin_frame&url=%2fcgi-bin%2freadmail%3fmailid%3dC1TF0DDCF0B%26need_textcontent%3dtrue%26s%3dnotify%26newwin%3Dtrue%26t%3dreadmail_conversation&r=023347fa060b68ea635ed9408e491cbf",
        "visitCount": 1
    }]
  	var x=[];
		 d3.json("newdata.json",function(error,data){

		 	console.log(data);
		 	x=data.slice(0,data.length);
		 });

		 setTimeout(function(){console.log(x);}, 300 ); //在指定的毫秒数后调用指定的函数或计算表达式
