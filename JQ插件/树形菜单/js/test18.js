var container = document.getElementById("container");
var str = [];
var inputArr = document.getElementsByTagName("input");
function leftPush(num){
  var num = inputArr[0].value;
  if((/^[0-9]+$/).test(num)){
  str.unshift(num); //push之后必须放入新的对象str2里
  str2 = str.map(function(item){return "<div>" + item + "</div>" ;});
  container.innerHTML = str2;
  alert(num + "left in ");
  }
  else{
    alert("reinput a number!")
  }
}
function rightPush(num){
  var num = inputArr[0].value;
  if((/^[0-9]+$/).test(num)){
  str.push(num); //push之后必须放入新的对象str2里
  str2 = str.map(function(item){return "<div>" + item + "</div>" ;});
  container.innerHTML = str2;
  alert(num + "num right in ");
  }
  else{
    alert("reinput a number!")
  }
}
function leftPop(){
if(str.length !== 0){
  str.shift();
  str2 = str.map(function(item){return "<div>" + item + "</div>" ;});
  container.innerHTML = str2;
  alert("left pop success!");
    }
else{
  alert("is empty!")
    }
  }

  function rightPop(){
  if(str.length !== 0){
    str.pop();
    str2 = str.map(function(item){return "<div>" + item + "</div>" ;});
    container.innerHTML = str2;
    alert("left pop success!");
      }
  else{
    alert("is empty!")
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
inputArr[1].addEventListener("click",leftPush);
inputArr[2].addEventListener("click",rightPush);
inputArr[3].addEventListener("click",leftPop);
inputArr[4].addEventListener("click",rightPop);
