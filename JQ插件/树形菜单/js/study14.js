var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

(function () {
 var filterResult=aqiData.filter(
   function(item,index,array){
     return (item[1]>60);
   }
 );
  document.getElementById("aqi-list").innerHTML=filterResult;


})();
