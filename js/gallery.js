window.onload=function(){
	init();
}

function g(selector){
    return selector.substring(0, 1) == '.' ? document.getElementsByClassName(selector.substring(1)) : document.getElementById(selector.substring(1));
}
//添加图片到wrap
function init(){
	var str="";
	var nav="<div class=\"nav\" id='nav'>";
	for (var i = 0; i < data.length; i++) {
		str+='<div class="photo photo_center" id="p'+ i +'">';
		str+='<div class="photo-wrap">';
		str+=	'<div class="side side-front">';
		str+=		'<p class="img"><img src="img/'+ data[i].img +'"/></p>';
		str+=		'<p class="caption">'+ data[i].caption +'</p>';
		str+=	'</div>';
		str+=	'<div class="side side-back">';
		str+=		'<p class="desc">'+ data[i].desc +'</p>';
		str+=	'</div>';
		str+='</div>';
		str+='</div>';
		nav += '<i id="i'+ i +'"></i>';
	}
	nav +="</div>";
	document.querySelector(".wrap").innerHTML=str+nav;
	
	turn();
	var range=[0,data.length];
	rsort(random(range));
}
//添加控制
function turn(){
	var plist=document.querySelectorAll(".photo");
	for (var i=0;i<plist.length;i++) {
		plist[i].onclick=function(){
			if(this.classList.contains("photo_center")){
				this.classList.toggle("photo_back");
				g("#i"+this.getAttribute("id").substr(1)).classList.toggle("back");
			}else{
				rsort(this.getAttribute("id").substr(1));
			}
		}
	}
	var _nav=document.querySelectorAll("i");
	for (var j=0;j<_nav.length;j++) {
		_nav[j].onclick=function(){
			if(this.classList.contains("cur")){
				this.classList.toggle("back");
				g("#p"+this.getAttribute("id").substr(1)).classList.toggle("photo_back");
			}else{
				rsort(this.getAttribute("id").substr(1));
			}
			
		}
	}
	g("#nav").style.marginLeft = "-" + g("#nav").clientWidth/2 + "px"
	
}
//产生随机数
function random(range){
	var max = Math.max(range[0],range[1]);
	var min = Math.min(range[0],range[1]);
	var num = Math.ceil(Math.random()*(max-min)+min);
	//console.log(num);
	return num;
}
//排序海报
function rsort(n){
	var _photo = document.querySelectorAll(".photo");
	var _nav=document.querySelectorAll("i");
	var photos = [];
	for (var i = 0; i < _photo.length; i++) {
		_photo[i].style=""
		_photo[i].classList.remove("photo_center");
		_photo[i].classList.remove("photo_back");
		photos.push(_photo[i]);
		_nav[i].classList.remove("cur")
	}
	g("#p"+n).classList.add("photo_center");
	g('#i'+n).classList.add('cur');
	
	var photocenter = photos.splice(n,1)[0];
	var pleft = photos.splice(0,Math.ceil(photos.length/2));
	var pright = photos;
	
	var rag = range();
	for(var j in pleft){
		var photo = pleft[j];
		photo.style.left = random(rag.left.x)+"px";
		photo.style.top = random(rag.left.y)+"px";
		photo.style['-webkit-transform'] = 'rotate('+ random([-150,150]) +'deg)';
	}
	for(var t in pright){
		var photo = pright[t];
		photo.style.left = random(rag.right.x)+"px";
		photo.style.top = random(rag.right.y)+"px";
		photo.style['-webkit-transform'] = 'rotate('+ random([-150,150]) +'deg)';
	}
}
//计算分区范围
function range(){
	var range = {left:{x:[],y:[]},right:{x:[],y:[]}}
	var wrap={
		w:g("#wrap").clientWidth,
		h:g("#wrap").clientHeight
	}
	var pht ={
		w:g(".photo")[0].clientWidth,
		h:g(".photo")[0].clientHeight
	}
	
	range.left.x = [0,wrap.w/2 - pht.w/2];
	range.left.y = [0,wrap.h-pht.h/2];
	range.right.x = [wrap.w/2 + pht.w/2 , wrap.w];
	range.right.y = range.left.y;
	
	return range;
}