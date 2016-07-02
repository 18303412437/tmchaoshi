//2016.4.28 
//1.解决类名的兼容函数
//classname: 所要找的类名
//father: 通过父元素来找这个类名
function getClass(classname,father){//兼容函数
    father=father||document;
    //1. 判断浏览器
    if(father.getElementsByClassName){//条件为真时，代表就是FF和chrome
        return father.getElementsByClassName(classname);
    }else{//条件为假时，代表是IE
      //ID  Tag  name
      var all=father.getElementsByTagName("*");//所有的
      /*[<html></html>,<head></head>,<body></body>,<div class="box"></div>,<div class="one">111</div>,<div class="one">222</div>,<div class="one">333</div>]*/
      var newarr=[];
      //遍历数组
      for (var i = 0; i < all.length; i++) {
      	//"one fi".split()["one","fi"]  "one"
      	  //if(all[i].className==classname){//如果条件相等，表示找见了
      	  if(checkRep(all[i].className,classname)){
            newarr.push(all[i]);
      	  }
      };
      return newarr;
    }
  }
  function checkRep(str,classname){//"two one three" "one"  ["two","fi","three"]  判断str与classname是否一样
    var arr=str.split(" ");//以空格做分隔符转换数组
    for(var i in arr){//遍历数组
    	if(arr[i]==classname){//判断元素与classname是否相同，相同时返回true
    		return true;
    	}
    }
    return false;// 所有比较以后，没有找到返回false
  }


  /**************************************************/
  //2016.5.3
  //纯文本的兼容函数
  //obj:对象
  //val：要设置的内容（纯文本）
  function getText(obj,val){
    if(val==undefined){//第二个参数没有传，为获取
        //获取功能
        if(obj.textContent){
        //FF/chrom
          return obj.textContent;
        }else{//IE
          return obj.innerText;
        }
    }else{
        //设置功能
        if(obj.innerText){//IE
          return obj.innerText=val;
        }else{//FF/chrom;
          return obj.textContent=val;
        }
    }
  }

  /***************************************************/
  //获取样式的兼容函数
  //obj:对象；
  //atte:属性；
  function getStyle(obj,attr){
    if(obj.currentSytle){//ie
      return parseInt(obj.currentStyle[attr]);//将字符串类型转换为数字类型
    }else{//ff
      return parseInt(getComputedStyle(obj,null)[attr]);
    }
  }

/*******************************************************************/
//获取元素的兼容函数
/*$(".box")/、获取时必须为字符串
$("#box")
$("li")*/
//selector:标识选择器与css的选择器一样
function $(selector,father){
  father=father||document;//给father设置默认值，为document;
  //对selector做判断
  if(typeof selector=="string"){//是字符串
    selector=selector.replace(/^\s*|\s*$/g,"");//删除字符串中的空格
    if(selector.charAt(0)=="."){//条件为真时，字符串为类名
      return getClass(selector.slice(1),father);//截取“.”之后的内容
    }else if(selector.charAt(0)=="#"){
      return father.getElementById(selector.slice(1));
      //   /正则内容/，^开始，$结束，[]表示或  test判断内容是否为正则范围内
    }else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){
      return father.getElementsByTagName(selector);
    }
  }else if(typeof selector=="function"){
    window.onload=function(){selector()};
  }
}

/********************************************************/
//2016.5.6
//5、获取子节点的元素节点的兼容函数
function getChild(father,type){
  type=type||"a";
  var all=father.childNodes;//通过父节点获取到的子节点集合
  var arr=[];//申明一个数组，放新的结果
  for(var i=0;i<all.length;i++){//遍历子节点集合
    if(type=="a"){//如果type值为a时，只输出标签节点
      if(all[i].nodeType==1){//如果这个子节点的类型为元素节点（1为元素节点）
      arr.push(all[i]);//将这个节点添加到新的数组中
      }
    }else if(type=="b"){
      if(all[i].nodeType==1||(all[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""&&all[i].nodeType==3)){
        arr.push(all[i]);
      }
    }
    
  }
  return arr;//返回新数组
}

/******************************************************************************************/
//6、获得子节点的第一个的兼容函数
function getFirst(father,type){
    return getChild(father,type)[0];
  }
/**************************************************************************************/
//7、获得子节点的最后一个的兼容函数
function getLast(father,type){
   return getChild(father,type)[getChild(father).length-1]
}
/***********************************************************************************/
//8、通过指定下下标来获得子节点中的一个的兼容函数
function getii(father,type,num){
  return getChild(father,type)[num];
}
/**************************************************************************************/
//2016.5.7
//9、获取上一个兄弟节点的兼容函数
//obj:一个元素节点
function getUp(obj){
  var up=obj.previousSibling;//获取上一个兄弟节点
  if(up==null){
    return false;
  }
  //条件为注释节点或者文本中为空字符串时，条件满足
  while(up.nodeType==8||(up.nodeType==3&&up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//不知道循环次数用while，条件满足时接着再找
      up=up.previousSibling;
      if(up==null){
       return false;
      }
  }
  return up;
}
/*************************************************************************************/
//10、获取下一个兄弟节点的兼容函数
function getNext(obj){
  var next=obj.nextSibling;
  if(next==null){
    return false;
  }
  while(next.nodeType==8||(next.nodeType==3&&next.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//不知道循环次数用while，条件满足时接着再找
    next=next.nextSibling;
    if(next==null){
      return false;
    }
  }
  return next;
}
/***************************************************************************************/
//11、插入到某个对象之后
//newNode:是新的，要添加的节点
//obj：是原来的节点，要在他的后面添加新的节点
function insertAfter(father,newNode,obj){
  var next=getNext(obj);//获取obj的下一个节点
  if(next){//如果next有值，就添加到obj的下一个之后
    father.insertBefore(newNode,obj);
  }else{//如果nxet没有值，就直接添加父元素的最后一个
    father.appendChild(newNode);
  }
}

/********************************************************************************/
//2016.5.9
//12、事件绑定兼容函数
//event：事件
function addEvent(obj,event,fun){
  if(obj.addEventListener){
    obj.addEventListener(event,fun,false);
  }else{
    obj.attachEvent("on"+event,function(){fun.call(obj)},false);
  }
}
/**********************************************************************************/
//13、事件移除兼容函数
function deleteEvent(obj,event,fun){
  if(obj.removeEventListener){
    obj.removeEventListener(event,fun,false);
  }else{
    obj.detachEvent("on"+event,fun);
  }
}
/***********************************************************************************/
//14、滚轮事件
function mouseWheel(obj,up,down){
  if(obj.attachEvent){
    obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
  }else if(obj.addEventListener){
    obj.addEventListener("mousewheel",scrollFn,false);
    //chrome,safari -webkit-
    obj.addEventListener("DOMMouseScroll",scrollFn,false);
    //firefox -moz-
  }

  function scrollFn(e){
    var ev=e||window.event;//兼容，获取滚轮对象
    //阻止浏览器的默认行为
    if (ev.preventDefault ){
      ev.preventDefault(); //阻止默认浏览器动作(W3C)
    }else{
      ev.returnValue = false;//IE中阻止函数器默认动作的方式
    }
    var val=ev.detail||ev.wheelDelta;//兼容，获取事件属性
    if(val==-3||val==120){//-3和120为固定值（浏览器默认值）
      if(up){//判断第二个参数是否传了，如果传了，输出向上函数
        up();//向上
      } 
    }else if(val==3||val==-120){
      if(down){//判断第二个参数是否传了，如果传了，输出向下函数
        down();//向下
      }
    }
  }
}


/****************************************************************************************/
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
 /*************************************************************************************/