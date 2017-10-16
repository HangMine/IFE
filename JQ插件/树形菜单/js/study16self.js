var aqiData = {};
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim();
    var flag = 0;
    for (var i = 0; i < city.length; i++) {
        if (!(city.charAt(i) >= 'a' && city.charAt(i) >= 'z' || city.charAt(i) >= 'A' && city.charAt(i) >= 'Z')) {
            alert("城市名必须为中英文字符");
            flag = 1;
        }
    }
    var value = document.getElementById("aqi-value-input").value.trim();
    if (!(parseInt(value) == value)) {
        alert("空气质量指数必须为整数");
        flag = 1;
    }
    if (flag == 0){
        aqiData[city] = value;
        alert("添加成功!");}
}
function renderAqiList() {
    var table = document.getElementById("aqi-table");
    var trs = document.getElementsByTagName("tr");
    var len = trs.length;
    for (var i = 0; i < len; i++)
        table.removeChild(trs[0]);
    if (JSON.stringify(aqiData) != "{}") {
        var data11 = document.createTextNode("城市");
        var data12 = document.createTextNode("空气质量");
        var data13 = document.createTextNode("操作");
        var td11 = document.createElement("td");
        td11.appendChild(data11);
        var td12 = document.createElement("td");
        td12.appendChild(data12);
        var td13 = document.createElement("td");
        td13.appendChild(data13);
        var tr = document.createElement("tr");
        tr.appendChild(td11);
        tr.appendChild(td12);
        tr.appendChild(td13);
        table.appendChild(tr);
    }
    for (var p in aqiData) {
        var data1 = document.createTextNode(p);
        var data2 = document.createTextNode(aqiData[p]);
        var data3 = document.createTextNode("删除");
        var buttons = document.createElement("button");
        var td1 = document.createElement("td");
        td1.appendChild(data1);
        var td2 = document.createElement("td");
        td2.appendChild(data2);
        buttons.appendChild(data3);
        var td3 = document.createElement("td");
        td3.appendChild(buttons);
        var tr = document.createElement("tr");
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }
}
function addBtnHandle() {
    addAqiData();
    renderAqiList();
    var buttons = document.getElementsByTagName("button");
    //对所有的删除按钮增加点击事件
    for (var i = 1; i < buttons.length; i++)
        buttons[i].onclick = function() {delBtnHandle(this);alert("删除成功");};
}
function delBtnHandle(param) {
    var node = param.parentNode.previousSibling.previousSibling.firstChild.nodeValue;//获取要删除的城市名
    delete aqiData[node];
    renderAqiList();
    var buttons = document.getElementsByTagName("button");
    for (var i = 1; i < buttons.length; i++)
        buttons[i].onclick = function() {delBtnHandle(this);};
}

function init() {
    document.getElementById("add-btn").onclick = addBtnHandle;
}

init();
