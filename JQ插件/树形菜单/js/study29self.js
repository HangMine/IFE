$(".prove").click(function(event) {
  var input = $(".nameinput").val();
  if(input.length < 4){
    $(".output").text("姓名不能为空");
    $(".nameinput").focus();
    $(".nameinput").css("border","solid 1px red");
  } else if (input.length < 17){
    $(".output").text("名称格式正确") ;
    $(".nameinput").focus();
    $(".nameinput").css("border","solid 1px green");

  }
  else{
    $(".output").text("名称长度超过16字符")
  }
});
