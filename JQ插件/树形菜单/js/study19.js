var container = document.getElementById("container");
var str = [];
var inputArr = document.getElementsByTagName("input");

function dataSort(data) {
  data.sort(
    function(a, b) {
    return a - b;
  });
  return data;
}

function leftPush(num) {
  var num = document.getElementById("textarea").value;
  var arr = num.split(/[^0-9]+/).filter(function(item){
    if(item != null && item > 0){return true;} else {return false;}
  });
  str = str.concat(arr);
  str = dataSort(str);
  render(str);
  }
  search = document.getElementById("search");
  searchValue = document.getElementById("searchValue");
  function render(str){
    var str2 = str.map(function(item){
      return "<div style='height:" + item + "px;'></div>";
    })
    container.innerHTML = str2.join("");
    }

  search.onclick = function(){
    var str2 = str.map(function(item){
      if(searchValue.value.length>0){
        if(searchValue.value = item){
        return "<div style='height:" + item + "px;background-color:green;'></div>";}
      }
      return "<div style='height:" + item + "px;'></div>";
    })
    container.innerHTML = str2.join("");
  }

function rightPush(num) {
  var num = document.getElementById("textarea").value;
  if (str.length <= 60) {
    if ((/^[0-9]+$/).test(num)) {
      if (parseInt(num) >= 10 && parseInt(num) <= 100) {
        str.push(num); //push之后必须放入新的对象str2里
        str = dataSort(str);
        str2 = str.map(function(item) {
          return "<div style='height:" + item + "px;'></div>";
        });
        container.innerHTML = str2.join("");
        alert(num + "right in ");
        // str = str2;
        // return str;
      } else {
        alert("reinput a number in 10-100!");
      }
    } else {
      alert("reinput a number!");
    }

  } else {
    alert("number > 60!");
  }
}

function leftPop() {
  if (str.length !== 0) {
    str.shift();
    str = dataSort(str);
    str2 = str.map(function(item) {
      return "<div style='height:" + item + "px;'></div>";
    });
    container.innerHTML = str2.join("");
    alert("left pop success!");
  } else {
    alert("is empty!");
  }
}

function rightPop() {
  if (str.length !== 0) {
    str.pop();
    str = dataSort(str);
    str2 = str.map(function(item) {
      return "<div style='height:" + item + "px;'></div>";
    });
    container.innerHTML = str2.join("");
    alert("left pop success!");
  } else {
    alert("is empty!");
  }
}
// function addEvent(element, event, listener) {
//     if (element.addEventListener) {
//         element.addEventListener(event, listener, false);
//     }
//     else if (element.attachEvent) {
//         element.attachEvent("on" + event, listener);
//     }
//     else {
//         element["on" + event] = listener;
//     }
// }
// addEvent(inputArr[1], "click", function(){leftPush()});
inputArr[0].addEventListener("click", leftPush);
inputArr[1].addEventListener("click", rightPush);
inputArr[2].addEventListener("click", leftPop);
inputArr[3].addEventListener("click", rightPop);
