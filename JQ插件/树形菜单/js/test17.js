//获取特定日期格式 的字符串
function getDateStr(dat){
  var y = dat.getFullYear();
  var m = dat.getMonth()+1;
  var d = dat.getDate();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? "0" + d : d;
  return y + "-"  + m + "-" + d;
}
//编写随机生成数据的函数
function randomBuildData(seed){
  var returnData={};
  var dat=new Date("2016-01-01");
  var datStr = '';
  for (var i=0;i<92;i++){
    datStr=getDateStr(dat);
    returnData[datStr]=Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}
//申明aqiSourceData对象，用于存放随机生成的数据
var aqiSourceData={
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};
//对aqiSourceData数据进行处理，并得到周和月的数据
function initAqiChartData(){
  var week = {}, count = 0, singleWeek = {},
      month = {}, mcount = 0, singleMonth = {};
      for(var key in aqiSourceData){
        var tempcity = aqiSourceData[key];
        var keyArr = Object.getOwnPropertyNames(tempcity);
        var tempMonth = keyArr[0].slice(5,7); //标记当前月份
        var weekInit = 4, weekCount = 0;
        for(var i=0; i<keyArr.length; i++){
          count += tempcity[keyArr[i]];
          mcount += tempcity[keyArr[i]];
          weekCount++;
          weekInit++;
          if( (weekInit + 1) % 7 == 0 || i == keyArr.length - 1  || keyArr[i+1].slice(5,7) !== tempMonth){
            var tempKey = keyArr[i].slice(0, 7) + "月第" + (Math.floor(weekInit/7) + 1) + "周";
            singleWeek[tempKey] = Math.floor(count / weekCount);
            if(keyArr[i+1].slice(5,7) !== tempMonth && i !== keyArr.length - 1){
              weekInit = weekCount % 7;
            }
            count = 0;
            weekCount = 0;
            if(keyArr[i+1].slice(5,7) !== tempMonth || i == keyArr.length - 1){
              tempMonth = (i == keyArr.length - 1) ? keyArr[i].slice(5,7) : keyArr[i+1].slice(5,7);
              var tempMKey=keyArr[i].slice(0, 7) + "月";
              var tempDays=keyArr[i].slice(-2);
              singleMonth[tempMKey] = Math.floor(mcount / tempDays);
              mcount = 0;
            }
          }
        }
        week[key]=singleWeek;
        month[key]=singleMonth;
        singleWeek={};
        singleMonth={};
      }
  chartData.day=aqiSourceData;
  chartData.week=week;
  chartData.month=month;
  renderChart();
}
//——————————————————————————————————————————————————————————
var pageState = {
  nowSelectCity : -1,
  nowGraTime : "北京"
};
function getWidth(width,len){
  var posobj = {};
  posobj.width = Math.floor( width / (len * 2) ) ;
  posobj.left = Math.floor((width / len));
  posobj.offsetLeft = (width - posobj.left * (len - 1) - posobj.width * len) / 2;
  return posobj;
}
function getTitle(){
  switch (pageState.nowGraTime){
    case "day":
      return "每日";
    case "week":
      return "每周";
    case "month":
      return "每月";
  }
}
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];
function renderChart(){
  var wrapper = document.getElementById("aqi-chart-wrap");
  var innerHTML = "",i = 0;
  var width = wrapper.clientWidth;
  var selectedData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
  var len = Object.keys(selectedData).length;
  var posObj = getWidth(width,len);
  innerHTML += "<div class='title'>" + pageState.nowSelectCity + "市01-03月" + getTitle() + "平均空气质量报告</div>";
  for(var key in selectedData){
    innerHTML += "<div calss='aqi-bar' style='height:" + selectedData[key] + "px;width:" + posObj.width + "px;left:" + posObj.left * i +posObj.offsetLeft + "px;background:" + colors[Math.floor(Math.random() * 11)] +  ";'></div>";
    innerHTML += "<div calss='aqi-hint' style='bottom:" + (selectedData[key] + 10) + "px;left:" + posObj.left * i +posObj.offsetLeft  + "px;'>" +key +"</br>" +"[AQI]" + selectedData[key] +"</div>";
  }
  wrapper.innerHTML = innerHTML;
}
function addEventHandler(ele, event, hanlder){
  ele.addEventListener(event,hanlder);
}
function initGraTimeForm(){
  var radio = document.getElementsByName("gra-time");
  for(var i=0;i<radio.length;i++){
  (function(m){
  addEventHandler(radio[m],click,function(){graTimeChange(radio[m]);} );
    })(i);
  }
}
function graTimeChange(radio){
  var value = radio.value;
  var items = document.getElementsByTagName("span");
  for (var i = 0; i<items.length;i++){
    items[i].className="";
  }
  var item = radio.previousElementSibling;
  item.className = "selected";
  if(value !== pageState.nowGraTime){
    pageState.nowGraTime = value;
    renderChart();
  }
}
  function initCitySelector(){
    var cityArr = Object.getOwnPropertyNames(aqiSourceData);
    var select = document.getElementById("city-select");
    var htmlArr = cityArr.map(function(item){
      return "<option>"  + item +  "</option>";
    });
    select.innerHTML = htmlArr.join("");
    pageState.nowSelectCity = cityArr[0];
    addEventHandler(select,change,citySelectChange);
  }
  function citySelectChange(){
    var city = this.value;
    if(this.value !== pageState.nowSelectCity){
      pageState.nowSelectCity = this.value ;
      renderChart();
    }
  }
 function init(){
   initAqiChartData();
   initCitySelector();
   initGraTimeForm();
 }
 init();
