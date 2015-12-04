// JavaScript Document
//heifengshui 3.0版，整体采用JSON单体写法
//API功能一览表
/*
 getByClass : 获取含className的元素
 hasClass : 检测className
 addClass : 添加className
 removeClass : 删除className
 attr :  添加属性或者获取属性
 show : 显示元素
 hide : 隐藏元素
 removeAttr : 删除属性
 getChild : 标准获取子元素，建议用非标准children
 getStyle : 获取行间非行间的样式
 cssmove : 时间版运动框架，支持CSS3，采用的是矩形阵运动，无缓存，类似transition，
 movement : 时间版运动框架
 hfs_speed ： 速度版运动框架
 hfs_spring ： 弹性运动框架，三种运动框架相互关联，支持CSS3的运动,队列运动，支持延迟
 setcss3 ： 设置CSS3的样式
 toArray ： 类数组转换成数组
 randomsort ： 数组随机排序
 randomArray ：生成k以内的随机数数组，并且长度为g
 offsetXY ：获取到BODY体的距离,忽略了边框
 toType ： 判断类型
 targrt ：判断是否是冒泡过来的事件  第一个参数是事件源判断传参   第二个参数传this
 stopBubble ：阻止事件冒泡的通用函数 参数是事件源传进来的参数 ev
 on : 绑定事件，支持事件的命名空间
 off : 解绑事件，支持事件的命名空间
 bind : 简单绑定  不存储  不支持匿名事件的解绑
 unbind ：简单绑定的解绑，不能解绑匿名事件的绑定
 delegate : 事件委托。
 trigger : 事件的主动触发
 swipe : 滑屏事件  判断是向那个方向的滑屏
 fanhui : 返回顶部框架，传值返回到那个位置  默认为0
 myLiuLanQi ：判断浏览器
 browser ：判断是否为移动端，且移动端浏览器版本
 re : 常用正则
 datatype : 获取URL中传来的参数
 getURL : 返回URL相关信息，参数为数值1-7
 Queue : 队列，出队支持延迟出队和立即出队
 Data : 缓存
 extend : 对象浅拷贝
 siblings : 获取所有兄弟节点
 prev : 获取上一个兄弟节点
 next : 获取下一个兄弟节点
 first : 获取第一个子节点
 last : 获取最后一个子节点
 deppcopy : 对象深拷贝
 stringify ： JSON对象脱离原型链深拷贝
 css ： 设置对象的CSS样式，同步运动框架所需的参数
 ajax : 向服务器提交请求，并返回数据进行回调处理
 */
 var huofengshui = {
	//获取含有class的元素集合  参数一 父级元素，即要在那个元素下获取class元素集合，  参数二 元素集合的class名称，参数三，筛选某种标签
	getByClass : function(parent,className,node){
		node ? node : node="*";
		if(parent.getElementsByClassName && node == "*"){
			return parent.getElementsByClassName(className);
		}else{
			var tagName = parent.getElementsByTagName(node);
			var classArray = [];
			var reg = new RegExp('(^|\\s)'+className+'($|\\s)');
			for (var i = 0; i < tagName.length; i++) {
				if(reg.test(tagName[i].className)){
					classArray.push(tagName[i]);
				}
			};
			return classArray;
		}
	},
	//检测obj是否有className  参数一 对象 参数二 要检测的class
	hasClass : function(obj,className){
		return obj.className.match( new RegExp( "(^|\\s)" + className + "(\\s|$)" )) ? true : false;
	},
	//为obj添加className  参数一 对象  参数二 要添加的class
	addClass : function(obj,sclass){
		var reg = new RegExp('\\b' + sclass + '\\b');
		if(!reg.test(obj.className)){
			obj.className += " " + sclass;
		}
	},
	//删除class，参数一，对象  参数二要删除的class
	removeClass : function(obj,sclass){
		var ThisClassName = obj.className;
		var reg = new RegExp('(^|\\s)' + sclass + '($|\\s)',"g");
		if(reg.test(ThisClassName)){
			obj.className = ThisClassName.replace(reg,"");
		}
	},
//获取或设置DOM元素属性  参数一 DOM元素 参数二 属性值 或者要设置的属性JSON 参数三 要设置的属性值
	attr : function(obj,key,value){
		if(key && typeof key == "object"){
			for(var shu in key){
				obj.setAttribute(shu,key[shu]);
			};
			return this;
		};
		if(value){
			obj.setAttribute(key,value);
			return this;
		};
		return obj.getAttribute(key);
	},
	removeAttr : function(obj,attr){
		obj.removeAttribute(attr);
	},
	//设置DOM节点的CSS样式，参数一  DOM   参数二 要设置的样式,除了透明度及transform ,其他要写全，不可只写数值。transform的值要分开写，与运动框架一致
	css : function(obj,json){
		for(var attr in json){
			this.setmovecss(obj,attr,json[attr]);
		};
		return this;
	},
	//显示隐藏元素时，缓存元素display值
	showhide : function(elem,bool){
		if(!this.Data.get(elem,"olddisplay")){
			var dis = this.getStyle(elem,"display");
			if(dis == "none"){
				elem.style.display = "";
				dis = this.getStyle(elem,"display");
				if(dis == "none"){
					var oD = document.createElement(elem.nodeName);
					document.body.appendChild(oD);
					dis = this.getStyle(oD,"display");
					document.body.removeChild(oD);
				}
			};
			this.Data.set(elem,"olddisplay", dis);
		};
		if(bool){
			elem.style.display = this.Data.get(elem,"olddisplay");
		}else{
			elem.style.display = "none";
		}
	},
	//显示元素	
show : function(elem){
		this.showhide(elem,true);
	},
	//隐藏元素
	hide : function(elem){
		this.showhide(elem,false);
	},
	each : function(arr,callback,arg){
		var _this = this;
		var i = 0;
		var length = arr.length;
		var value;
		var array = [];
		if(this.isArray(arr) || this.isArrayHTML(arr)){
			for(;i<length;i++){
				value = callback.call(arr[i],i,arr[i]);
				if ( value === false ) {
					break;
				}
			}
		}else{
			for(i in arr){
				value = callback.call(arr[i],i,arr[i] );
				if ( value === false ) {
					break;
				}
			}
		};
		return arr;
	},
	isArrayHTML : function(elems){
		return this.toType(elems==="HTML") && elems.length
	},
	isArray : Array.isArray || function(arr){
		return this.toType(arr) === "Array";
	},
	//标准获取子元素，建议用非标准children，参数为对象，children 在低版本IE下会算上注释节点，标准不会
	getChild : function(fu){
		var oFu = null;
		if(typeof(fu) != "string"){
			oFu = fu;
		}else{
			oFu = document.getElementById(fu);
		};
		var ozis = oFu.childNodes;
		var ozi = new Array();
		for(var i=0;i<ozis.length;i++){
			if(ozis[i].nodeType ==1){
				ozi.push(ozis[i]);
			}
		}
		return ozi;
	},
	//获取所有兄弟节点 参数一 DOM节点  参数二 如果传true 排除样式脚本等标签
	siblings : function(obj,b){
		var arr = [];
		//var childs = obj.parentNode.children;
		var childs = this.getChild(obj.parentNode);
		if(b === true){
			for(var i=0;i<childs.length;i++){
				if(obj !== childs[i] && childs[i].nodeName !== "SCRIPT" && childs[i].nodeName !== "STYLE" && childs[i].nodeName !== "LINK" && childs[i].nodeName !== "META"){
					arr.push(childs[i]);
				}
			};
		}else{
			for(var i=0;i<childs.length;i++){
				if(obj !== childs[i]){
					arr.push(childs[i]);
				}
			};
		};
		return arr;
	},
	//获取上个兄弟节点
prev : function(obj){
		if( !obj || !obj.previousSibling ){
			return null;
		};
		if( obj.previousElementSibling ){
			return obj.previousElementSibling;
		};
		if( obj.previousSibling.nodeType == 1 ){
			return obj.previousSibling;
		};
		return null;
	},
	//获取下个兄弟节点
	next : function(obj){
		if( !obj || !obj.nextSibling ){
			return null;
		};
		if( obj.nextElementSibling ){
			return obj.nextElementSibling;
		};
		if( obj.nextSibling.nodeType == 1 ){
			return obj.nextSibling;
		};
		return null;
	},
	//获取第一个子节点
	first : function(obj){
		if( !obj || !obj.firstChild ){
			return null;
		}
		return obj.firstChild.nodeType == 1 ? obj.firstChild : this.next( obj.firstChild );
	},
	//获取最后一个子节点
	last : function(obj){
		if( !obj || !obj.lastChild ){
			return null;
		}
		return obj.lastChild.nodeType == 1 ? obj.lastChild : this.prev( obj.lastChild );
	},
	//获取样式值，参数一 对象，参数二要获取的样式属性
	getStyle : function(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	},

	//时间版运动框架  css运动框架参数检测
	detection : function(times,fx,fn,delay){
		if( typeof times == 'undefined' ){
			times = 400;
			fx = 'linear';
			delay = 0;
		};
		if( typeof times == 'string' ){
			if(typeof fx == 'function'){
				if(typeof fn == 'number'){
					delay = fn;
				}else{
					delay = 0;
				}
				fn = fx;
			}else if(typeof fx == 'number'){
				delay = fx;
				fn = null;
			}else{
				delay = 0;
			}
			fx = times;
			times = 400;
		}else if(typeof times == 'function'){
			if(typeof fx == 'number'){
				delay = fx;
			}else{
				delay = 0;
			}
			fn = times;
			times = 400;
			fx = 'linear';
		}else if(typeof times == 'number'){
			if(typeof fx == 'function'){
				if(typeof fn == 'number'){
					delay = fn;
				}else{
					delay = 0;
				}
				fn = fx;
				fx = 'linear';
			}else if(typeof fx == 'undefined'){
				fx = 'linear';
				delay = 0;
			}else if(typeof fx == 'string'){
				if(typeof fn == 'number'){
					delay = fn;
					fn = null;
				}else if(typeof fn == 'function' && !delay){
					delay = 0;
				}
			}else if(typeof fx == 'number'){
				delay = fx;
				fx = 'linear';
				fn = null;
			};
		};
		return [times,fx,fn,delay];
	},
	mousewheel : function(elem,json){
		elem.onmousewheel = mouseScroll;
		if(elem.addEventListener){
			elem.addEventListener('DOMMouseScroll',mouseScroll,false);
		};
		var fnup = json.up || function(){};
		var fndown = json.down || function(){};
		function mouseScroll(e){
			var ev = e || window.event;
			var fx = ev.wheelDelta || ev.detail;
			var bDown = true;
			if( ev.detail ){
				bDown = fx > 0 ? true : false;
			}else{
				bDown = fx > 0 ? false : true;
			};
			if( bDown ){
				fndown.call(elem);
			}else{
				fnup.call(elem);
			}
			if( ev.preventDefault ){
				ev.preventDefault();
			}
			return false;
		}
	},
	//时间版运动框架，扩展了CSS3的运动，参数一对象，参数二json形式的运动属性，参数三运动持续时间，参数四运动形式，参数五，运动结束后的回调
	movement : function(obj,json,times,fx,fn,delay){
		var arr = this.detection(times,fx,fn,delay);
		this.movement_init(obj,json,arr[0],arr[1],arr[2],arr[3],false);
		return this;
	},
	//时间版运动初始化
	movement_init : function(obj,json,times,fx,fn,delay,css){
		var _this = this;
		_this.Queue.queue(obj,"fx",function(){
			if(delay > 0 && typeof delay == "number"){
				setTimeout(function(){
					_this.movement_delay(obj,json,times,fx,fn,delay,css);
				},delay);
			}else{
				_this.movement_delay(obj,json,times,fx,fn,delay,css);
			}
		});
	},
	movement_delay : function(obj,json,times,fx,fn,delay,css){
		obj.iCur = {};
		if(css){
			this.getMoveCss(obj,obj.iCur,json);
		}else{
			if(!obj.transform){
				obj.transform = {};
			};
			this.getmovecss(obj,json,obj.iCur,false);
		}
		this.movement_move(obj,json,times,fx,fn,delay);
	},
	//时间版运动开始
	movement_move : function(obj,json,times,fx,fn,delay){
		var _this = this;
		var startTime = this.movement_now();
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var changeTime = _this.movement_now();
			var t = times - Math.max(0,startTime - changeTime + times);  //0到2000     
			for(var attr in json){
				if(attr == 'transform'){
					var value = [];
					for(var i=0;i<obj.css_json[attr].length;i++){
						value[i] = Tween[fx](t,obj.iCur[attr][i],obj.css_json[attr][i]-obj.iCur[attr][i],times);
					}
				}else{
					var value = Tween[fx](t,obj.iCur[attr],json[attr]-obj.iCur[attr],times);
				}
				_this.setmovecss(obj,attr,value);
			}
			if(t == times){
				clearInterval(obj.timer);
				_this.Queue.dequeue(obj,"fx");
				if(fn){
					fn.call(obj);
				}
			}
		},13);
	},
	//返回当前时间 时间版运动用
	movement_now : function(){
		return (new Date()).getTime();
	},
	//css运动框架
	cssmove : function(obj,json,times,fx,fn,delay){
		var arr = this.detection(times,fx,fn,delay);
		this.movement_init(obj,json,arr[0],arr[1],arr[2],arr[3],true);
		return this;
	},
	//速度版运动框架，参数一为对象，参数二为运动参数，格式为json，参数三为运动结束后的回调，参数四为匀速运动时的速度，值必须是数值型，否则按缓冲运动
	hfs_speed : function(obj, json, fnEnd, delay, su){
		var _this = this;
		_this.Queue.queue(obj,"fx",function(){
			if(delay > 0 && typeof delay == "number"){
				setTimeout(function(){
					_this.speed_delay(obj, json, fnEnd,su);
				},delay);
			}else{
				_this.speed_delay(obj, json, fnEnd,su);
			};
		});
		return this;
	},
	speed_delay : function(obj, json, fnEnd,su){
		var _this = this;
		clearInterval(obj.timer);  //确保只有一个定时器
		obj.timer=setInterval(function(){
			var bStop=true;		//假设：所有值都已经到了
			for(var attr in json){   //遍历json
				obj.cur=0;        //声明变量，存储获取的属性值
				_this.speed_getcss(obj,attr);

				if(su && typeof su == "number"){ //如果传了速度值，做匀速运动
					var speed = 0;
					if(obj.cur < json[attr]){
						speed = su;
						if(obj.cur >= json[attr] || (json[attr]-obj.cur)<su){
							obj.cur = json[attr];
							speed = 0;
						}
					}
					if(obj.cur > json[attr]){
						speed= -su;
						if(obj.cur <= json[attr] || (obj.cur-json[attr])<su){
							obj.cur = json[attr];
							speed = 0;
						}
					}
				}else{
					var speed=(json[attr]-obj.cur)/6;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);
				}
				if(obj.cur!=json[attr]){
					bStop=false;
				}
				if(Math.abs(json[attr]-obj.cur)<1){
					obj.cur = json[attr];
				}
				_this.setmovecss(obj,attr,(obj.cur+speed));
			}
			if(bStop){
				clearInterval(obj.timer);
				_this.Queue.dequeue(obj,"fx");
				if(fnEnd){
					fnEnd.call(obj);
				}
			}
		},30);
	},
	//速度版运动的获取样式
	speed_getcss : function(obj,attr){
		var _this = this;
		this.get_css(obj,attr)
	},
	//根据后盾网提供的公式做的弹性摩擦运动框架，解决了高度在低版本IE下报错的问题
	/*
	 *vx += (targetX - spriteX) * spring;
	 *spriteX += (vx *= friction);
	 *这个是公式 targetX为目标点 spriteX为初始值，会在框架运动中变化  直到跟目标点相同
	 */
	//弹性运动框架，第一个参数传对象，参数二为弹动系数JSON值，参数三为运动的json形式参数，参数四运动结束后的回调函数 参数五为延迟时间
	hfs_spring : function(obj,tx,json,fnEnd,delay){
		var _this = this;
		_this.Queue.queue(obj,"fx",function(){
			if(delay > 0 && typeof delay == "number"){
				setTimeout(function(){
					_this.spring_delay(obj,tx, json, fnEnd);
				},delay);
			}else{
				_this.spring_delay(obj,tx, json, fnEnd);
			};
		});
		return this;
	},
	//弹性运动初始化
	spring_init : function(obj,json){
		var _this = this;
		if(!obj.transform){
			obj.transform = {};
		};
		_this.getmovecss(obj,json,obj.spring_startJson,true);
	},
	spring_delay : function(obj,tx,json,fnEnd){
		var _this = this;
		obj.spring_startJson = {}; //存储初始值，运动中会变化，直到跟目标值相等
		obj.spring_vxJson = {};
		obj.spring_targetJson = {};
		if(tx && typeof tx =="object"){
			_this.spring = tx.x;
			_this.friction = tx.y;
		}else{
			_this.spring = 0.8;
			_this.friction = 0.6;
		}
		_this.spring_init(obj,json);
		clearInterval(obj.dt);
		obj.dt = setInterval(function(){
			obj.spring_bStop = true;
			_this.spring_move(obj,json);
			if(obj.spring_bStop){
				clearInterval(obj.dt);
				_this.Queue.dequeue(obj,"fx");
				if(fnEnd){
					fnEnd.call(obj);
				}
			}
		},60);
	},
	//弹性运动开始运动
