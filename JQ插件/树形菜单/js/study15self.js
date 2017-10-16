function getData() {
  var data = new Array();
  var lists = document.getElementsByTagName("li");
  for (var i = 0; i < lists.length; i++) {
    var city = lists[i].firstChild.nodeValue.slice(0, 2);
    var aqi = lists[i].getElementsByTagName("b")[0].firstChild.nodeValue;
    var temp = new Array();
    temp.push(city);
    temp.push(aqi);
    data.push(temp);
  }
  return data;
}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
  data.sort(
    function(a, b) {
      return a[1] - b[1];
    }
  );
  return data;
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
  for (var i = 0; i < data.length; i++) {
    var left = document.createTextNode("第" + (i + 1) + "名：" + data[i][0] + ",");
    var right = document.createTextNode(data[i][1]);
    var b = document.createElement("b");
    var li = document.createElement("li");
    b.appendChild(right);
    li.appendChild(left);
    li.appendChild(b);
    document.getElementById("resort").appendChild(li);
  }
}

function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}


function init() {

  document.getElementById("sort-btn").onclick = btnHandle;

}

init();
