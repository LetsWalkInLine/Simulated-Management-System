const inputPwd = document.getElementById("userPwd");
const inputName = document.getElementById("userName");
const inputRepeat = document.getElementById("repeatPwd");
const fufu1 = document.getElementById("fufu1");
const fufu2 = document.getElementById("fufu2");

inputPwd.onclick = function(){
	// console.log("1");
	if(fufu1.src.match("/images/fufu1_open.png")){
		fufu1.src = "/images/fufu1_close.png";
	}
	if(fufu2.src.match("/images/fufu2_open.png")){
		fufu2.src = "/images/fufu2_close.png";
	}
}
			
inputName.onclick = function(){
	// console.log("2");
	if(fufu1.src.match("/images/fufu1_close.png")){
		fufu1.src = "/images/fufu1_open.png";
	}
	if(fufu2.src.match("/images/fufu2_close.png")){
		fufu2.src = "/images/fufu2_open.png";
	}
}

inputRepeat.onclick = function(){
	if(fufu1.src.match("/images/fufu1_open.png")){
		fufu1.src = "/images/fufu1_close.png";
	}
	if(fufu2.src.match("/images/fufu2_open.png")){
		fufu2.src = "/images/fufu2_close.png";
	}
}