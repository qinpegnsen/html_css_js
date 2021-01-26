//1.兼容的通过类名获取元素  注意：用的时候要要先获取obj，传参的时候也不加引号
function getClass(classname,obj){	
     //第一个参数就是变量，任何字母都可以，
     //第二个是第一个变量的父类，为了缩小范围，任何字母也可以。
	var obj=obj||document; 		//短路原则优先使用小范围的，如果没有就是默认的document
	if(obj.getElementsByClassName){    //进行判断如果支持className获取，就是用这种方式，否则
		return obj.getElementsByClassName(classname); //返回支持的类名

	}else{		//双路结构，肯定会执行一条
		var arr=obj.getElementsByTagName('*'); //如果不支持就全部获取，
		var newarr=[];		//新建一个数组，最好用数组来声明，因为获取出来就是数组
		for(var i=0;i<arr.length;i++){	//把全部获取的循环
			if(arr[i].className===classname){	//如果循环出来的某个类名就和传进来的实参一样
				newarr.push(arr[i]);		//那个类名放到新建的数组里面
			}
		}
		return newarr;	//返回这个数组，因为调用的时候要用到
	}
}
// "aa bb cc" "aa"
function check(class1,class2){    //因为上诉代码将这种情况排除在外，
	//所以要把这种情况筛选出来，因为他也是。传入两个参数都是类名，第二个类名是我们
	//想要的类名.
	var arr=class1.split(" "); //要把传入的类名去掉空格，遍历出来，如果和我们要的类名一样
	//，那么我们返回真，否则假。加的话上面的代码就不执行。
	for(var i=0;i<arr.length;i++){
		if(arr[i]===class2){
			return true;
		}else{
			return false;
		}
	}
}

//2、兼容的获取元素的样式
//obj 元素    attr属性，传入的时候会带引号
function getStyle(obj,attr){
	//这里不用写var obj=obj||document，因为它就是针对某一个标签对象的，不是文档
	if(obj.currentStyle){
		return obj.currentStyle[attr];
		//方括号的原因是因为传入一个字符串
	}else{
		return getComputedStyle(obj,null)[attr]
	}

}

// 3.兼容的获取元素的内容
		// 一个参数获取元素的内容
		// 两个参数设置元素的内容 把后面的额值付给前面的内容
function getText(obj,val){
	if(val==undefined){
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}else{
		if(obj.innerText){
			obj.innerText=val;
		}else{
			obj.textContent=val;

		}
	}
}
// 4.$封装 两个功能 1获取选择器  2获取回调函数，3.创建一个元素标签不用window.onload了
function $(selector,obj){
	var obj=obj||document;
	if(typeof selector==="string"){ 		//检测参数的类型
		selector=selector.replace(/^\s*|\s*$/g,"")  //去掉开头和结尾
		if(selector.charAt(0)==="."){			//检测.开头的
			return getClass(selector.slice(1),obj);
		}else if(selector.charAt(0)==="#"){
			return document.getElementById(selector.slice(1));

		}else if(/^[a-zA-Z][a-z0-6A-Z]{0,8}$/.test(selector)){//判断标签
			return obj.getElementsByTagName(selector,obj);
		}else if(/^<[a-zA-Z][a-z0-6A-Z]{0,8}>$/.test(selector)){//判断标签
			return document.createElement(selector.slice(1,-1));
		}
	}else if(typeof selector==="function"){
		window.onload=function(){
			selector();  //这里的selector就是函数，加载后开始运
		}
	}
}
// 5.获取所有节点
	function getChilds(obj,type){
		var type=type||"no";
		//先做个初始状态，默认的就是no，获取元素节点,判断要不要文本。
		var childs=obj.childNodes;
		//获取所有的节点集合
		var arr=[];
		//因为返回的结果是个数组，所以声明一个数组，将最后的值返回到里面
		for(var i=0;i<childs.length;i++){
			if(type=="no"){
			//对type进行判断如果是'no',获取元素
				if(childs[i].nodeType==1){
					arr.push(childs[i]);
				}
			}else if(type=="yes"){
			
			//如果是yes，获取所有的元素节点和文本节点
			
				//&&的优先级大于||的优先级
				if(childs[i].nodeType==1||childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")){
					//获取obj下所有的元素节点或者文本节点。
					arr.push(childs[i]);					
				}
				
			}
			
		}
		return arr;
	}
	//获取第一个	
	function getFirst(obj,type){
		var type=type||'no'
		if(type=="no"){
			return getChilds(obj,"no")[0];
		}
		if(type=="yes"){
			return getChilds(obj,"yes")[0];
		}
	}
	//获取最后一个
	function getLast(obj,type){
		var type=type||'no'
		if(type=="no"){
			return getChilds(obj,"no")[getChilds(obj,"no").length-1];
		}
		if(type=="yes"){
			return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
		}
	}
	//获取第num个
	function getNum(obj,num,type){
		//num大于0，指的是第几个字符，不是下标
		var type=type||'no'
		if(type=="no"){
			return getChilds(obj,"no")[num-1];
		}
		if(type=="yes"){
			return getChilds(obj,"yes")[num-1];
		}
	}
//获取下一个兄弟元素
	function getNext(obj,type){
		var type=type||"no";
		var next=obj.nextSibling;
		if(next==null){
			return false;				
		}
		if(type=="no"){
			//x下一个兄弟 节点为注释节点或者是文本节点的情况下会继续往下找，直到为空或者是元素节点的情况下停止
			while(next.nodeType==3||next.nodeType==8){
				next=next.nextSibling;
				//如果下一个节点是不为空的文本节点或者是注释节点进入循环，现在的next就是注释节点或者是不为空的文本节点，所以不要，把当前next的下一个节点附给next，也就是找下一个的下一个节点
				if(next==null){
					return false;				
				}
				
			}
		}else if(type=="yes"){
			//下一个兄弟节点为注释节点或者是空文本节点的情况下，会继续往下找，知道为空或者不为空文本的情况下停止
			while(next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
				next=next.nextSibling;
				if(next=null){
					return false;				
				}
				
			}
		}
		return next;
	}
// 上一个兄弟元素
	function getPrev(obj,type){
		var type=type||"no";
		var prev=obj.previousSibling;
		if(prev==null){
			return false;				
		}
		if(type=="no"){
			//x下一个兄弟 节点为注释节点或者是文本节点的情况下会继续往下找，直到为空或者是元素节点的情况下停止
			while(prev.nodeType==3||prev.nodeType==8){
				prev=prev.previousSibling;
				//如果下一个节点是不为空的文本节点或者是注释节点进入循环，现在的prev就是注释节点或者是不为空的文本节点，所以不要，把当前prev的下一个节点附给prev，也就是找下一个的下一个节点
				if(prev==null){
					return false;				
				}
				
			}
		}else if(type=="yes"){
			//下一个兄弟节点为注释节点或者是空文本节点的情况下，会继续往下找，知道为空或者不为空文本的情况下停止
			while(prev.nodeType==3&&!prev.nodeValue.replace(/^\s*|\s*$/g,"")||prev.nodeType==8){
				prev=prev.previousSibling;
				if(prev=null){
					return false;				
				}
				
			}
		}
		return prev;
	}
// insertBefore插入在某个元素之前
function insertBefore(newObj,beforeObj){
	var parent=beforeObj.parentNode; //获取被插入元素的父元素，因为要用父元素调用
	parent.insertBefore(newObj,beforeObj);
}

// insertAfter 插入在某个元素之后
function insertAfter(newObj,beforeObj){
	var next=getNext(beforeObj,"yes")   //获取被插元素的下一个兄弟节点
	var parent=beforeObj.parentNode;//获取父元素，待会如果没有兄弟元素要查到父元素最后
	if(next){
		//如果有下一个节点，就是插入到下一个兄弟节点之前
		insertBefore(newObj,next)
	}else{
		//如果没有下一个节点，之间查到父元素最后		
		parent.appendChild(newObj);
	}
}
//添加事件
function addEvent(obj,event,fun){
	//event 不要on，fun不要（）
	if(obj.addEventListener){
		//绑定在obj身上的是funEvent。
		obj.addEventListener(event,funEvent,false);
			//ie678指针指向有问题
			//传入一个参数e，事件对象 在事件触发的时候，js创建了一个对象，
			// 用来保存和事件相关的所有的信息.  e（w3c） window.event（ie）
			//（）这就代表函数的运行
			//这里的指针要做一下处理，因为可能指向window和obj，让指向obj		
	}else{
		obj.attachEvent("on"+event,funEvent)
	}
	return	funEvent;
	function funEvent(e){
		//兼容事件对象
		var ev=e||window.event;
		fun.call(obj,ev)
		//改变元素指针
	}
}
//删除事件
function removeEvent(obj,event,fun){
	if(obj.addEventListener){
		//绑定在obj身上的是funEvent。
		//删除的也是
		obj.removeEventListener(event,fun,false);
	}else{
		obj.detachEvent("on"+event,fun);
	}
}

// 
function mousewheel(obj,upFun,downFun){
	//第一步添加mousewheel事件
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",fun)  //调用下面函数  ie
	}else{
		obj.addEventListener("mousewheel",fun,false)  //谷歌
		obj.addEventListener("DOMMouseScroll",fun,false)  //火狐
	}
	//判断向上滚还是会向下滚
	function fun(e){

		var ev=e||window.event;
		//下面这句话的意思是消除滚轮事件是浏览器的默认操作，比如鼠标向下滚，滚动条会动，想想滚轮事件
		if(ev.returnValue){
			ev.returnValue=false;  //ie
		}else{
			e.preventDefault()   //翻译为预防故障
		}
		var num=ev.wheelDelta||ev.detail;
		if(num==-120||num==3){  //向下滚动
			downFun.call(obj);  //这里this指向的是window，所以要改变指针的指向，call后的指针指向变成了
			//传入的参数。牢记5种指向。
		}else if(num==120||num==-3){
			upFun.call(obj);  //向上滚动
	
		}
	}
}




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
// 设置cookie
function setCookie(attr,value,time){
	// attr 键 value 值 time 时间单位秒，因为下面是计算机的元年
	if(time){
		var nowtime=new Date();
		nowtime.setTime(nowtime.getTime()+time*1000);
		//这句话的结果就是time秒后的结果
		document.cookie=attr+'='+value+";expires="+nowtime.toGMTString()
		//用加号来链接，这是一串字符串
//		这是有生命周期的cookie
	}else{
		document.cookie=attr+"="+value;
//		这是临时性的cookie
	}
}
//aa=bb; bb=bb; dd=ee
// ["aa=bb","bb=aa","dd=ee"] arr
// ["aa","bb"] brr
// 获取cookie
//split的一个代表分隔符，第二个代表截取的长度
function getCookie(attr){
	var cookies=document.cookie;
	var arr=cookies.split("; ");
	for(var i=0;i<arr.length;i++){
		var brr=arr[i].split("=");
		if(brr[0]==attr){
			return brr[1];
		}
	}
	return false;
}
// 删除cookie
	function delCookie(attr){
		var nowtime =new Date();
		nowtime.setTime(nowtime.getTime()-1);
		//让时间回到以前就立马删除了
		document.cookie=attr+"=hehe;expires="+nowtime.toGMTString();
		//这里的hehe随便写就好，因为反正要删除，要注意字符串
		//这里hehe随便写一个值就把上面的attr真正的值给覆盖了，这时候在给他一个过去的时间，就把attr给删除了
	}
	




