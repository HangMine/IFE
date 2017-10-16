function ajax(url,fnSucc,fnFaild){
	//1创建ajax对象
	if(window.XMLHttpRequest){

		//非ie6的浏览器
		var oAjax = new XMLHttpRequest();
	}else{
		//ie6
		var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//2连接服务器
	//open(方法,文件名,异步传输)
	oAjax.open('GET',url,true);

	//3发送请求

	oAjax.send();

	//4接收返回信息
	//加载完成执行函数
	oAjax.onreadystatechange=function(){
		//浏览器和服务器之间进行到哪一步
		if(oAjax.readyState == 4){//读取完成（成功/失败）
			if(oAjax.status ==200){//http状态码,200成功
				fnSucc(oAjax.responseText);
			}else{
				//如果传递了错误参数，则执行
				if(fnFaild){
					fnFaild(oAjax.status);
				}
			}
		}
	};

}
