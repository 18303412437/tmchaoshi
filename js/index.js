/*banner 轮播 引入*/
var bannerCenter=$("#banner-center");
var shangbu=$("#shangbu");
var as=$("a",shangbu);
var dian=$("#dian");
var shuzi=$(".shuzi");
var zuobian=$("#zuobian");
var youbian=$("#youbian");
/*固定导航 引入*/
var baoguo=$("#baoguo");
var classify=$(".classify");
/*左边固定楼层  引入*/
var lou=$("#lou");
var ass=$("a",lou);
var jinkou=$(".jinkou");
/*banner 轮播*/
var num=0;
var next=0;
for(var i=1;i<as.length;i++){
	as[i].style.left="750px";
}
function autorun(){
	next++;
	if(next>=as.length){
		next=0;
	}
	as[next].style.left="750px";
	animate(as[num],{left:-750});
	animate(as[next],{left:0});
	num=next;
	for(var i=0;i<shuzi.length;i++){
		shuzi[i].style.background="rgba(0,0,0,0.9)";
		as[i].style.zIndex=0;
	}
	shuzi[next].style.background="red";
	as[next].style.zIndex=1;
}
var bannerTime=setInterval(autorun,2000);
/*移入移出事件*/
shangbu.onmouseover=function(){
	clearInterval(bannerTime);
	zuobian.style.opacity=1;
	youbian.style.opacity=1;
}
shangbu.onmouseout=function(){
	bannerTime=setInterval(autorun,2000);
	zuobian.style.opacity=0;
	youbian.style.opacity=0;
}
/*左右点击移动*/
youbian.onclick=function(){
	next--;
	if(next<=-1){
		next=as.length-1;
	}
	as[next].style.left="-750px";
	animate(as[num],{left:750});
	animate(as[next],{left:0});
	num=next;
	for(var i=0;i<shuzi.length;i++){
		shuzi[i].style.background="rgba(0,0,0,0.9)";
	}
	shuzi[next].style.background="red";
}
zuobian.onclick=function(){
	next++;
	if(next>=as.length){
		next=0;
	}
	as[next].style.left="750px";
	animate(as[num],{left:-750});
	animate(as[next],{left:0});
	num=next;
	for(var i=0;i<shuzi.length;i++){
		shuzi[i].style.background="rgba(0,0,0,0.9)";
	}
	shuzi[next].style.background="red";
}

/*点击轮播小圆点*/
for(var i=0;i<shuzi.length;i++){
	shuzi[i].index=i;
	shuzi[i].onmouseover=function(){
		as[this.index].style.left="750px";
		for(var j=0;j<as.length;j++){
			if(j>=this.index){
				as[j].style.left="750px";//放入右侧
			}else{
				as[j].style.left=0;//放入盒子中
			}		
			as[j].style.zIndex=0;
			shuzi[j].style.background="rgba(0,0,0,0.9)";
		}
		if(this.index==0){
			as[this.index].style.left=0;
			shuzi[this.index].style.background="red";
			//animate(as[as.length-1],{left:0});
		}
		/*as[as.length-1].style.left="750px";*/
		animate(as[this.index-1],{left:-750});
		as[this.index].style.zIndex=1;
		animate(as[this.index],{left:0});
		shuzi[this.index].style.background="red";
		next=this.index;
		num=this.index;
	}
}

/***********************************************************/
/*固定导航  +  左边固定楼层 */
document.onscroll=function(){
	var topss=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
	if(topss>=208){
		baoguo.id="baoguojia";
	}else{
		baoguo.id="";
	}
	if(topss>=700){//左边固定楼层
		lou.style.display="block";

	}else{
		lou.style.display="none";
	}


	/*左边楼层跳转*/
	for(var i=0;i<jinkou.length;i++){
		if(jinkou[i].offsetTop<=topss){//如果jinkou盒子的距顶部距离大于等于body距顶部距离
			for(var j=0;j<ass.length;j++){
				ass[j].style.background="#fff";
			}
			ass[i].style.background="red";
			bl=i//将i赋值给变量，保存变量
		}
	}
	//图片的按需加载
	var ch=document.documentElement.clientHeight;
	for(var i=0;i<jinkou.length;i++){
		if(jinkou[i].offsetTop<=topss+ch){
			//src=data-src;
			//获取当前楼层的所有图片
			var imgs=$("img",jinkou[i]);
			for (var j =0;j< imgs.length; j++) {
				//获取自定义属性
				var dataSrc=imgs[j].getAttribute("data-src");
				imgs[j].src=dataSrc;
			}
		}
	}
}

/*点击滑动效果*/
var bl=0;//申明变量，用来保存下标
var ojb=document.body.scrollTop?document.body:document.documentElement;
for(var i=0;i<ass.length;i++){
	ass[i].index=i;
	ass[i].onclick=function(){
		bl=this.index;//当前下标
		//ojb.scrollTop=jinkou[this.index].offsetTop;//点击后，将jinkou盒子的距顶部距离赋值给body的距顶部距离
		animate(ojb,{scrollTop:jinkou[this.index].offsetTop-50},600,Tween.Linear);
	}
	ass[i].onmouseover=function(){
		for(var j=0;j<ass.length;j++){
			if(j!=bl){//当前下标不等于j时；也就说说除了当前的事件
				ass[j].style.background="#fff";
			}
		}
		this.style.background="red";
	}
	ass[i].onmouseout=function(){
		if(this.index!=bl){//除了当前的事件
			this.style.background="#fff";
		}
		
	}
}
/************************************************************/
//下拉菜单函数
//ffobj:移入时发生事件的事件源
//ssobj:下拉菜单的内容ul
function carte(ffobj,ssobj){
	for(var i=0;i<ffobj.length;i++){
		ffobj[i].index=i;
		hover(ffobj[i],function(){
			var lis=$("li",ssobj[this.index]);
			var h=getStyle(lis[0],"height");
				ssobj[this.index].style.height=h*lis.length+"px";
				animate(ssobj[this.index],{height:h*lis.length})
			},function(){
				//移除
				animate(ssobj[this.index],{height:0})
			})
	}
}
/***********************************************************/
//导航右边    下拉菜单
var taobao=$(".taobao");
var xiala=$(".xiala");
/*for(var i=0;i<taobao.length;i++){
	taobao[i].index=i;
	hover(taobao[i],function(){
		var lis=$("li",xiala[this.index]);
		var h=getStyle(lis[0],"height");
			xiala[this.index].style.height=h*lis.length+"px";
			animate(xiala[this.index],{height:h*lis.length})
		},function(){
			//移除
			animate(xiala[this.index],{height:0})
		})
}*/
carte(taobao,xiala);
/*************************************************************/
//购物车     下拉菜单
var classifyRight=$(".classify-right")[0];
var gowuchebox=$(".gowuchebox");
var denglu=$(".denglu");
carte(gowuchebox,denglu);
/*************************************************************/
//banner左边     左划菜单
var zhucaidan=$(".zhucaidan");
var box=$(".box");
for(var i=0;i<zhucaidan.length;i++){
	zhucaidan[i].index=i;
	hover(zhucaidan[i],function(){
			animate(box[this.index],{display:"block"},50);
		},function(){
			//移除
			animate(box[this.index],{display:"none"},50)
		})
}
/*banner右边****************************************************************************/
var goWuChe=$(".gowuche")[0];
var dd=$("#dd");
hover(  goWuChe,function(){
	  goWuChe.style.right="30px";
	  goWuChe.style.width="255px";
	   goWuChe.style.background="#e00024";
	   dd.style.right="30px";
},function(){
	  goWuChe.style.width="240px";
	  goWuChe.style.right="0px";
	   goWuChe.style.background="#fff";
	   dd.style.right="0px";

})
/*右边固定****************************************************************************/
var fangkuai=$(".fangkuangbox");
var shan=$(".shan");
for (var i = 0; i < fangkuai.length; i++) {
	fangkuai[i].index=i;
	fangkuai[i].onmouseover=function(){
		shan[this.index].style.display="block";
		fangkuai[this.index].style.background="#c40000";
		animate(shan[this.index],{right:35},200)
	}
	fangkuai[i].onmouseout=function(){
		fangkuai[this.index].style.background="#000";
		shan[this.index].style.display="none";
		animate(shan[this.index],{right:45},200)
	}
};
/**************************************************************************/