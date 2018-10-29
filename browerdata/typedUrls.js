////  history_json=[];
////  history_jsons=[];
//function onAnchorClick(event) {
//chrome.tabs.create({
//  selected: true,
//  url: event.srcElement.href
//});
//return false;
//}
//console.log("1");
//// Search history to find up to ten links that a user has typed in,
//// and show those links in a popup.
//function buildTypedUrlList(divName) {
//      // To look for history items visited in the last week,
//      // subtract a week of microseconds from the current time.
//      var microsecondsPerWeek = 1000 * 60 * 60 * 24 * 7*10;
//      var oneWeekAgo = (new Date).getTime() - microsecondsPerWeek;
//      var urlArray = [];
//var titleArray = [];
//var visitCountArray = [];
//var timeArray=[];
//// Track the number of callbacks from chrome.history.getVisits()
//// that we expect to get.  When it reaches zero, we have all results.
//var numRequestsOutstanding = 0;
// // console.log("1");
//chrome.history.search({
//    'text': '',              // Return every history item....
//    'startTime': oneWeekAgo  // that was accessed less than one week ago.
//  },
//  function(historyItems) {
// // console.log(historyItems);
// // console.log(historyItems[0]);
//    // For each history item, get details on all visits.
//    for (var i = 0; i < historyItems.length; ++i) {
//      var url = historyItems[i].url;
//
//     // noinspection JSAnnotator
//        function  processVisitsWithUrl(url)  {
//        // We need the url of the visited item to process the visit.
//        // Use a closure to bind the  url into the callback's args.
//        return function(visitItems) {
//         // console.log(visitItems);
//          processVisits(url, visitItems);
//        };
//      }
//
//      chrome.history.getVisits({url: url}, processVisitsWithUrl(url));
//      numRequestsOutstanding++;
//    }
//  /*  if (!numRequestsOutstanding) {
//      onAllVisitsProcessed();
//    }*/
//
//
//    //将historyItems里面的url装进urlArry
//      // 将historyItem里面的titie装进titleArry
//      for(var i=0;i<historyItems.length;++i){
//        urlArray.push(historyItems[i].url);
//        visitCountArray.push(historyItems[i].visitCount);
//        timeArray.push(historyItems[i].lastVisitTime);
//        if(historyItems[i].title!="") {
//            titleArray.push(historyItems[i].title);
//        }
//        else{
//          titleArray.push(historyItems[i].url);
//        }
//      }
//				//console.log(urlArray);        
//				//console.log(urlArray[0]);
//      //把历史记录下拉到本地保存为json格式
//      
//      for(var i=0;i<historyItems.length;i++){
//        history_json.push(historyItems[i]);
//          //var str_cookie = JSON.stringify(str_cookie);
//         // setCookie("sxrxq", str);
//      }
//      //history_jsons = historyItems;
//      //console.log(history_json);
//      //console.log(history_jsons);
//      //console.log(history_json[0]);
//      
//     // console.log(history_jsons[0]);
//     // console.log(typeof(history_json));
//     // return history_jsons;
////      ajson = JSON.stringify(history_json);
////      console.log(ajson);
//      
//  });
//	//history_json = eval("("+history_json+")");
//	 //console.log(history_jsons[0]);
//	//console.log(history_json);
//      //console.log(history_json[0]);
//      //console.log(typeof(history_json));
//      
//// Maps URLs to a count of the number of times the user typed that URL into
//// the omnibox.
//var urlToCount = {};
//
//// Callback for chrome.history.getVisits().  Counts the number of
//// times a user visited a URL by typing the address.
//var processVisits = function(url, visitItems) {
// // console.log(visitItems);
//  for (var i = 0, ie = visitItems.length; i < ie; ++i) {
//    // Ignore items unless the user typed the URL.
//    /*if (visitItems[i].transition != 'typed') { //只要用户从地址栏输入而得到的页面
//      continue;
//    }*/
//
//    if (!urlToCount[url]) {
//      urlToCount[url] = 0;
//    }
//
//    urlToCount[url]++;
//  }
//
//  // If this is the final outstanding call to processVisits(),
//  // then we have the final results.  Use them to build the list
//  // of URLs to show in the popup.
// /* if (!--numRequestsOutstanding) {
//    onAllVisitsProcessed();
//  }*/
//};
//
//// This function is called when we have the final list of URls to display.
///*var onAllVisitsProcessed = function() {
//  // Get the top scorring urls.
//
//  // for (var url in urlToCount) {
//  //   urlArray.push(url);
//  // }
//
//// Sort the URLs by the number of times the user typed them.按照访问次数排列出url
//  urlArray.sort(function(a, b) {
//    return urlToCount[b] - urlToCount[a];
//  });
//
//  //buildPopupDom(divName, urlArray.slice(0, 10));//分割出前10个
//     buildPopupDom(divName , urlArray , titleArray,visitCountArray,timeArray);//全部切分出来
//};*/
// 		
//}
//var JSstring;
//var history2 ;
//document.addEventListener('DOMContentLoaded', function () {
//  buildTypedUrlList("popup");
//  //JSstring = JSON.stringify(history_json);
//	//history2 = JSON.parse(history_json);
////console.log(JSstring);
//	//console.log(history2);
//});
//
//
//
