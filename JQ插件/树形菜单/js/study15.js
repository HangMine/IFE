function getData() {
    var data = new Array();
    var lists = document.getElementsByTagName("li");
    for (var i = 0; i < lists.length; i++) {
        var city = lists[i].firstChild.nodeValue.slice(0,2);
        // getElementsByTagName返回的是一个数组对象，所以后面必须加[0]
        var aqi = lists[i].getElementsByTagName("b")[0].firstChild.nodeValue;
        var temp = new Array();
        temp.push(city);
        temp.push(aqi);
        data.push(temp);
    }
    return data;
}
function sortAqiData(data) {
    data.sort(
        function(a, b) {
            return a[1] - b[1];
        }
    );
    return data;
}
function render(data) {
    for (var i = 0; i < data.length; i++) {
        var title = document.createTextNode("第" + (i + 1) + "名：" + data[i][0] + "空气质量：");
        var content = document.createTextNode(data[i][1]);
        var b = document.createElement("b");
        var li = document.createElement("li");
        b.appendChild(content);
        li.appendChild(title);
        li.appendChild(b);
        document.getElementById("resort").appendChild(li);
    }
}
function btnHandle() {
    var aqiData = getData();
    aqiData = sortAqiData(aqiData);
    render(aqiData);
}
//为按钮绑定点击事件并执行本函数，可在buttom属性里里增加onclick事件
function init() {
    document.getElementById("sort-btn").onclick = btnHandle;
}
init();
