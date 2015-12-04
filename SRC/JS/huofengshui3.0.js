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
spring_move : function(obj,json){
		var _this = this;
		for(var attr in json){
			if(Math.abs(obj.spring_targetJson[attr] - obj.spring_startJson[attr]) < 0.1){
				obj.spring_startJson[attr] = obj.spring_targetJson[attr];
			}else{
				obj.spring_vxJson[attr] += (obj.spring_targetJson[attr] - obj.spring_startJson[attr]) * _this.spring;
				obj.spring_startJson[attr] += (obj.spring_vxJson[attr] *= _this.friction);
			};
			if(obj.spring_startJson[attr] != obj.spring_targetJson[attr]){
				obj.spring_bStop = false;
			};
			if(attr == "height" && obj.spring_startJson[attr]<0){
				obj.spring_startJson[attr] = 0;
			};
			if(attr == "width" && obj.spring_startJson[attr]<0){
				obj.spring_startJson[attr] = 0;
			};
			if(attr == "scaleX" && obj.spring_startJson[attr]<0){
				obj.spring_startJson[attr] = 1;
			};
			if(attr == "scaleY" && obj.spring_startJson[attr]<0){
				obj.spring_startJson[attr] = 1;
			};
			_this.setmovecss(obj,attr,obj.spring_startJson[attr]);

		}
	},
	//css3获取矩形阵
	getMoveCss : function(obj,start_json,target_json){
		obj.css_json = {};
		for(var attr in target_json){
			start_json[attr] = 0;
			if( attr == 'opacity' ){
				start_json[attr] = Math.round(this.getStyle(obj,attr)*100);
			}else if(attr == 'transform'){
				this.elem_style(obj,start_json);
				var oDiv = document.createElement("DIV");
				oDiv.style.transform = target_json[attr];
				oDiv.style["msTransform"] = target_json[attr];
				document.body.appendChild(oDiv);
				this.elem_style(oDiv,obj.css_json);
				document.body.removeChild(oDiv);
			}else{
				start_json[attr] = parseInt(this.getStyle(obj,attr));
			}
		}
	},
	//匹配矩形阵，存储数组，运动框架中用
	elem_style : function(elem,json){
		var css_matrix = /matrix(3d)?\((.+)\)/;
		var css_number = /(-?\d+(\.\d+)?)/;
		var str = this.getStyle(elem,'transform');
		if(!str){
			str = this.getStyle(elem,"msTransform");
		};
		if(css_matrix.test(str)){
			json['transform'] = str.match(css_matrix)[2].split(",");
		};
		for(var i=0;i<json['transform'].length;i++){
			json['transform'][i] = Number(json['transform'][i].match(css_number)[1]);
		}
	},
	//运动框架用的获取样式值
	getmovecss : function(obj,json,json1,b){
		var _this = this;
		for(var attr in json){
			_this.get_css(obj,attr,json1);
			if(b){
				obj.spring_vxJson[attr] = 0;
				obj.spring_targetJson[attr] = json[attr];
			}
		}
	},
	//运动框架用的设置样式
	setmovecss : function(obj,attr,zhi){
		var _this = this;
		if(!obj.transform){
			obj.transform = {};
		};
		var btn = false;
		switch(attr){
			case "opacity" :
				obj.style.filter = 'alpha(opacity:'+(zhi)+')';
				obj.style.opacity = zhi/100;
				break;
			case "rotate":
			case "rotateX":
			case "rotateY":
			case "rotateZ":
			case "skewX":
			case "skewY":
			case "skewZ":
				obj.transform[attr] = attr + "(" + (zhi) + "deg)";
				obj[attr] = zhi;
				btn = true;
				break;
			case "translateX":
			case "translateY":
			case "translateZ":
				obj.transform[attr] = attr + "(" + (zhi) + "px)";
				obj[attr] = zhi;
				btn = true;
				break;
			case "scaleX":
			case "scaleY":
			case "scaleZ":
				obj.transform[attr] = attr + "(" + (zhi)/100 + ")";
				obj[attr] = zhi/100;
				btn = true;
				break;
			case "transform":
				if(zhi instanceof Array){
					var matrix = zhi.join(",");
					if(zhi.length == 6){
						this.setcss3(obj,{"transform":"matrix("+ matrix +")"});
					}else{
						this.setcss3(obj,{"transform":"matrix3d("+ matrix +")"});
					};
					return;
				}
				break;
			default :
				if(typeof zhi === "number" && attr != "zIndex"){
					obj.style[attr] = zhi + 'px';
				}else{
					obj.style[attr] = zhi;
				}
				break;
		};
		var str = '';
		if(attr == "transform"){
			str = zhi;
			_this.setcss3(obj,{"transform":str});
			return this;
		};
		if(btn){
			for(var trans in obj.transform){
				str += " " + obj.transform[trans];
			};
			_this.setcss3(obj,{"transform":str});
		};

	},
	//运动框架用获取样式值
	get_css : function(obj,attr,json1){
		var _this = this;
		switch(attr){
			case "rotate":
			case "rotateX":
			case "rotateY":
			case "rotateZ":
			case "translateX":
			case "translateY":
			case "translateZ":
			case "skewX":
			case "skewY":
			case "skewZ":
				if(obj[attr] && typeof obj[attr] == "number"){
					if(json1){
						json1[attr] = obj[attr];
					}
					obj.cur = obj[attr];
				}else{
					if(json1){
						json1[attr] = 0;
					}
					obj.cur = 0;
				}
				break;
			case "scaleX":
			case "scaleY":
			case "scaleZ":
				if(obj[attr] && typeof obj[attr] == "number" || obj[attr] === 0){
					if(json1){
						json1[attr] = obj[attr]*100;
					}
					obj.cur = obj[attr]*100;
				}else{
					if(json1){
						json1[attr] = 100;
					}
					obj.cur = 100;
				}
				break;
			case "opacity":
				if(json1){
					json1[attr] = Math.round(parseFloat(_this.getStyle(obj,attr))*100);
				}
				obj.cur=Math.round(parseFloat(_this.getStyle(obj,attr))*100); //取透明度的小数，乘以100后，用四舍五入法取整
				break;
			default :
				if(json1){
					json1[attr] = parseInt(_this.getStyle(obj,attr));
				}
				obj.cur=parseInt(_this.getStyle(obj,attr));
				break;
		}
	},
	//设置CSS3的属性，第一个参数传对象，第二个参数传要设置的CSS3属性跟值，为json格式
	setcss3 : function(obj,josn){
		for(var attr in josn){
			var newattr = attr.indexOf("-");
			if(newattr != -1){
				newattr = attr.replace(attr.substr(attr.indexOf("-"),2),attr.charAt(attr.indexOf("-")+1).toUpperCase());
			}else{
				newattr = attr;
			}
			var attrnew = newattr;
			newattr = newattr.replace(newattr.charAt(0),newattr.charAt(0).toUpperCase());
			obj.style['webkit'+newattr] = josn[attr];
			obj.style['Moz'+newattr] = josn[attr];
			obj.style['ms'+newattr] = josn[attr];
			obj.style['o'+newattr] = josn[attr];
			obj.style[attrnew] = josn[attr];
		};
		return this;
	},

	//队列，不依赖缓存
	//参数一 元素对象，需要在此绑定队列，参数二，队列名称，为字符串，默认为"fx",  
	//参数三 队列的值  为函数  数组  参数四 是否自动出队第一个 默认是出队的  
	Queue_elem : {
		//进队
		queue : function(element,queueName,value,boolean){
			var elem = element?element:document;
			var queue_name = queueName ? queueName : "fx";
			elem.queue ? elem.queue = elem.queue : elem.queue = {};
			elem.queue[queue_name] ? elem.queue[queue_name] = elem.queue[queue_name] : elem.queue[queue_name] = [];
			if(value instanceof Array){
				for(var i=0;i<value.length;i++){
					elem.queue[queue_name].push(value[i]);
				}
			}else{
				elem.queue[queue_name].push(value);
			}
			boolean === false ? boolean = false : boolean = true;
			if(boolean && elem.queue[queue_name][0] != "mask"){
				this.dequeue(element,queueName);
			}
			return this;
		},
		//延迟出队
		delay : function(element,queueName,delayNum){
			var _this = this;
			var dt = setTimeout(function(){
				clearTimeout(dt);
				_this.dequeue(element,queueName);
			},delayNum)
		},
		//出队
		dequeue : function(element,queueName){
			var elem = element?element:document;
			var queue_name = queueName ? queueName : "fx";
			elem.queue ? elem.queue = elem.queue : elem.queue = {};
			elem.queue[queue_name] ? elem.queue[queue_name] = elem.queue[queue_name] : elem.queue[queue_name] = [];
			var fn = elem.queue[queue_name].shift();
			if(fn == "mask"){
				fn = elem.queue[queue_name].shift();
			}
			if(fn){
				elem.queue[queue_name].unshift("mask");
				fn.call(element);
			}
			return this;
		}
	},
	//应用缓存的队列  参数一 缓存名，参数二，队列名称，为字符串，默认为"fx",  参数三 队列的值  为函数  数组  参数四 是否自动出队第一个 默认是出队的 
	Queue : {
		//进队
		queue : function(elem,queueName,value,boolean){
			var queue_name = queueName ? queueName : "fx";
			huofengshui.Data.set(elem,queueName,value);
			boolean === false ? boolean = false : boolean = true;
			if(boolean && huofengshui.Data.get(elem,queueName)[0] != "mask"){
				this.dequeue(elem,queueName);
			}
			return this;
		},
		//延迟出队
		delay : function(element,queueName,delayNum){
			var _this = this;
			var dt = setTimeout(function(){
				clearTimeout(dt);
				_this.dequeue(element,queueName);
			},delayNum)
		},
		//出队
		dequeue : function(elem,queueName){
			var queue_name = queueName ? queueName : "fx";
			var queue = huofengshui.Data.get(elem,queueName);
			if(!queue){
				return this;
			}
			var fn =  queue.shift();
			if(fn == "mask"){
				fn =  queue.shift();
			}
			if(fn){
				queue.unshift("mask");
				fn.call(elem);
			}
			return this;
		}
	},
	//缓存  
	/*
	 设置缓存，缓存格式为 Data : {
	 //缓存库
	 cache : {
	 缓存名为字符串 : {
	 队列名 : [],
	 队列名 : [],
	 }
	 },
	 //设置缓存
	 set : function(缓存名，队列名，队列值){},
	 //获取缓存
	 get : function(缓存名，队列名){}
	 }
	 */
	Data : {
		//缓存库
		cache : {},
		//设置缓存 参数一 缓存名  参数二 队列名  参数二 队列值
		set : function(elem,queueName,value){
			if(typeof elem ==="object" && elem){
				if(!elem.cache){
					elem.cache = new Date().getTime() + Math.random();
				};
				var cacheName = elem.cache;
			}else{
				var cacheName = elem;
			}

			if(!this.cache[cacheName]){
				this.cache[cacheName] = {};
			};
			if(!this.cache[cacheName][queueName]){
				this.cache[cacheName][queueName] = [];
			}
			if(value instanceof Array){
				if(value.length === 0){  //如果传入空数组，则清除队列
					this.cache[cacheName][queueName] = [];
				}else{
					for(var i=0;i<value.length;i++){
						this.cache[cacheName][queueName].push(value[i]);
					}
				}
			}else{
				this.cache[cacheName][queueName].push(value);
			}
		},
		//获取缓存   参数一 缓存名  参数二 队列名
		get : function(elem,queueName){
			if(typeof elem ==="object" && elem){
				var cacheName = elem.cache;
			}else{
				var cacheName = elem;
			}
			if(!this.cache[cacheName]){
				return false;
			};
			if(!this.cache[cacheName][queueName]){
				return false;
			};
			return this.cache[cacheName][queueName];
		}
	},
	//后盾网的缓存
	Data_hdw : {
		cache : {},
		stamp : new Date().getTime(),
		setData : function(elem,key,val){
			var id = elem[this.stamp];
			if(!id){
				id = this.stamp;
				elem[this.stamp] = this.stamp;
			};
			if(!this.cache[id]){
				this.cache[id] = {};
			}
			if(!this.cache[id][key]){
				this.cache[id][key] = [];
			}
			if(val){
				this.cache[id][key].push(val);
			};
			return this.cache[id][key];
		}
	},

	//对象浅拷贝 参数一 默认对象即被拷贝对象  参数二 配置对象即要拷贝的对象  
	extend : function(obj1,obj2){
		for(var attr in obj2){
			obj1[attr] = obj2[attr];
		}
	},
	//对象深拷贝，参数传要复制的json，返回新的json对象
	deppcopy : function(json){
		var _this = this;
		var newjson = json.constructor == Object?{}:[];
		for(var attr in json){
			if(typeof json[attr] === "object"){
				newjson[attr] = _this.deppcopy(json[attr]);
			}else{
				newjson[attr] = json[attr];
			}
		}
		return newjson;
	},
	//JSON类型深拷贝，脱离原型链
	stringify : function(json1){
		var str = JSON.stringify(json1);
		return JSON.parse(str);
	},
	//类数组转换成数组，参数为要转换的类数组
	toArray : function(elems){
		var arr = [];
		for(var i=0;i<elems.length;i++){
			arr.push(elems[i]);
		}
		return arr;
	},

	//数组随机排序 参数传数组
	randomsort : function(arr){
		return arr.sort(function(){
			return Math.random()>0.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
		})
	},

	//生成k以内的随机数数组，并且长度为g
	randomArray : function(k,g){
		var arr = [];
		for(var i=0;i<g;i++){
			var l = Math.floor(Math.random()*k);
			if(arr.indexOf(l) != -1){
				i--;
				continue;
			}else{
				arr.push(l);
			}
		};
		return arr;
	},

	//获取到BODY体的距离,忽略了边框
	offsetXY : function(obj){
		var offset = {"left":obj.offsetLeft,"top":obj.offsetTop};
		while(obj.offsetParent){
			obj = obj.offsetParent;
			offset.left += obj.offsetLeft;
			offset.top += obj.offsetTop;
		}
		return offset;
	},

	//判断类型 参数为要判断的元素
	toType : function(a){
		if ( a == null ) {
			return String( a );
		}
		var str = "";
		try{
			str = a.constructor;
		}catch(e){
			str = Object.prototype.toString.call(a);
		}
		var reg = /Number|String|Boolean|Array|Object|Function|Null|Undefined|Date|HTML|Document/;
		var as = reg.exec(str);
		if(reg.test(str)){
			return as[0];
		}else{
			return typeof a;
		}
	},

	//判断是否是冒泡过来的事件  第一个参数是事件源判断传参   第二个参数传this
	targrt : function(e,t){
		var ev = e || window.event;
		var _this = ev.srcElement?ev.srcElement:ev.target;
		if(t.nodeName == "#document" && _this.nodeName == "BODY"){   //document事件
			return true;
		}else if(_this == t){   //其他节点
			return true;
		}else{
			return false;
		}
	},

	//阻止事件冒泡的通用函数 参数是事件源传进来的参数 ev  
	stopBubble : function(e){
		if(e&&e.stopPropagation){
			//标准浏览器支持W3C的stopPropagation()方法  
			e.stopPropagation();
		}else{
			//老版本的IE使用ie的方法来取消事件冒泡  
			window.event.cancelBubble = true;
		}
	},

	//绑定事件  参数一  对象  参数二 绑定的事件,支持事件的命名空间  参数三 绑定的函数
	on : function(obj,type,fn){
		var _this = this;
		var Anonymous = /^function\s?\(/;  //匹配匿名函数
		var Named = /(\w+)(\.\w+)?/;  //匹配命名空间及事件类型
		var FunctionName = /^(function)\s+?(\w+)\(/;  //匹配函数名
		var Nameds = type.match(Named);
		if(!obj.fnName){
			obj.fnName = {};
		}
		if(!obj.fnName[Nameds[1]]){
			obj.fnName[Nameds[1]] = [];
		};
		var func = function(){        //将函数专为匿名函数并改变this指向 低版本ie下的必然操作  标准下如此操作没有副作用
			fn.apply(obj,arguments);
		};
		var json = {};
		if(Nameds[2]){
			json[Nameds[2]] = func;
		}else{
			if(Anonymous.test(fn)){   //如果为真 说明传入的是匿名函数
				json[new Date().getTime()] = func;
			}else{
				json[fn.toString().match(FunctionName)[2]] = func;
			}
		}
		obj.fnName[Nameds[1]].push(json);
		for(var i=0;i<obj.fnName[Nameds[1]].length;i++){
			for(var attr in obj.fnName[Nameds[1]][i]){
				_this.bind(obj,Nameds[1],obj.fnName[Nameds[1]][i][attr]);
			}
		};
		return this;
	},

	//解绑事件   参数一  对象  参数二 解绑的事件  参数三 解绑的函数,参数一必传，参数二可传事件类型或者事件命名，若不穿参数二三，则解绑所有事件
	off : function(obj,type,fn){
		var _this = this;
		if(!obj.fnName){
			return this;
		}
		if(arguments.length == 3){
			if(obj.fnName[type]){
				for(var i=0;i<obj.fnName[type].length;i++){
					for(var attr in obj.fnName[type][i]){
						if(obj.fnName[type][i][attr] == fn){
							_this.unbind(obj,type,obj.fnName[type][i][attr]);
							obj.fnName[type].splice(i,1);
						}
					}
				};
			}
			return this;
		};
		if(arguments.length == 2){
			if(/^\w+$/.test(type)){
				if(obj.fnName[type]){
					for(var i=0;i<obj.fnName[type].length;i++){
						for(var attr in obj.fnName[type][i]){
							_this.unbind(obj,type,obj.fnName[type][i][attr]);
						}
					}
					obj.fnName[type] = []
				}
				return this;
			};
			if(/^\.\w+$/.test(type)){
				for(var attr in obj.fnName){
					for(var i=0;i<obj.fnName[attr].length;i++){
						for(var atr in obj.fnName[attr][i]){
							if(atr == type){
								_this.unbind(obj,attr,obj.fnName[attr][i][atr]);
								obj.fnName[attr].splice(i,1);
								i--;
							}
						};
					}
				}
				return this;
			}
			if(/^\w+\.\w+$/.test(type)){
				var Nameds = type.match(/^(\w+)(\.\w+)$/);
				if(obj.fnName[Nameds[1]]){
					for(var i=0;i<obj.fnName[Nameds[1]].length;i++){
						for(var atr in obj.fnName[Nameds[1]][i]){
							if(atr == Nameds[2]){
								_this.unbind(obj,Nameds[1],obj.fnName[Nameds[1]][i][atr]);
								obj.fnName[Nameds[1]].splice(i,1);
								i--;
							}
						};
					};
				}
				return this;
			}
			return this;
		};
		if(arguments.length == 1){
			for(var attr in obj.fnName){
				for(var i=0;i<obj.fnName[attr].length;i++){
					for(var atr in obj.fnName[attr][i]){
						_this.unbind(obj,attr,obj.fnName[attr][i][atr]);
					}
				};
			};
			obj.fnName = {};
			return this;
		};
		return this;
	},
	//绑定事件，不存储，不考虑解绑
	bind : function(obj,type,fn){
		if(window.attachEvent){
			obj.attachEvent("on" + type, fn );
		}else{
			obj.addEventListener(type, fn, false);
		};
		return this;
	},
	//解绑bind绑定的实名函数，匿名函数不能解绑
	unbind : function(obj,type,fn){
		if (obj.attachEvent) {
			obj.detachEvent("on"+type,fn);
		} else {
			obj.removeEventListener(type,fn,false);
		};
		return this;
	},
	//参数一 父元素，为原生DOM节点   参数二 父元素下的子元素  支持原生节点 ID名  类名  标签 标签类名 标签ID  
	//参数三事件类型 参数四触发的函数，参数五为true时修改this指向为父元素即参数一；
	delegate: function (oFu,oZi,type,fn,end) {
		var _this = this;
		var tagName = /^\w+$/;
		var className = /^\.(\w+)$/;
		var id = /^#(\w+)$/;
		var classTag = /^(\w+)\.(\w+)$/;
		var idTag = /^(\w+)#(\w+)$/;
		this.bind(oFu,type,function(e){
			var ev = window.event || e;
			var oTarget = ev.srcElement || ev.target;
			var parentTarget = ev ? ev.currentTarget : this; //修改this指向为oFu;
			if(typeof oZi != "string"){
				if(_this.toType(oZi) == "HTML"){
					while(oTarget!= oZi && oTarget != oFu){
						oTarget = oTarget.parentNode;
					}
					if (oTarget == oZi && oTarget != oFu) {
						fn.call(end === true ? parentTarget : oTarget);
					};
					return _this;
				}else{
					return _this;
				}
			}else{
				if(tagName.test(oZi)){
					while(oTarget.tagName.toLowerCase() != oZi && oTarget != oFu){
						oTarget = oTarget.parentNode;
					}
					if (oTarget.tagName.toLowerCase() == oZi && oTarget != oFu) {
						fn.call(end === true ? parentTarget : oTarget);
					};
					return _this;
				};
				if(className.test(oZi)){
					var sclass = oZi.match(className);
					while(!_this.hasClass(oTarget,sclass[1]) && oTarget != oFu){
						oTarget = oTarget.parentNode;
					};
					if(_this.hasClass(oTarget,sclass[1]) && oTarget != oFu){
						fn.call(end === true ? parentTarget : oTarget);
					};
					return _this;
				};
				if(id.test(oZi)){
					var sid = oZi.match(id);
					while(oTarget.id != sid[1] && oTarget != oFu){
						oTarget = oTarget.parentNode;
					};
					if(oTarget.id == sid[1] && oTarget != oFu){
						fn.call(end === true ? parentTarget : oTarget);
					};
					return _this;
				};
				if(classTag.test(oZi)){
					var sClassTag = oZi.match(classTag);
					var btn = true;
					while(btn && oTarget != oFu){
						if(oTarget.tagName.toLowerCase() == sClassTag[1] && _this.hasClass(oTarget,sClassTag[2]) && oTarget != oFu){
							btn = false;
							fn.call(end === true ? parentTarget : oTarget);
						}else{
							oTarget = oTarget.parentNode;
						}
					};
					return _this;
				};
				if(idTag.test(oZi)){
					var sidTag = oZi.match(idTag);
					var btn = true;
					while(btn && oTarget != oFu){
						if(oTarget.tagName.toLowerCase() == sidTag[1] && oTarget.id == sidTag[2] && oTarget != oFu){
							btn = false;
							fn.call(end === true ? parentTarget : oTarget);
						}else{
							oTarget = oTarget.parentNode;
						}
					};
					return _this;
				};
			};
		});
	},
	//主动触发事件，参数一触发事件元素  参数二被触发事件元素  参数三 触发事件类型
	trigger : function(element,elem,type){
		this.bind(element,type,function(ev){
			if(document.createEventObject){
				return elem.fireEvent('on'+type);
			}else{
				var ev = document.createEvent('HTMLEvents');
				ev.initEvent(type,true,true); //参数一 事件类型  参数二是否冒泡  参数三是否阻止浏览器默认事件
				return !elem.dispatchEvent(ev);
			}
		});
	},
	//滑屏函数， 参数一 DOM对象  参数二 json值 对应的left  right up down是滑屏的方向 
	swipe : function(obj,opt){
		var _this = this;
		this.swipe_settings = {
			left : function(){},
			right : function(){},
			up : function(){},
			down : function(){}
		};
		this.extend(this.swipe_settings,opt);
		this.on(obj,"touchstart",function(ev){
			var touchs = ev.changedTouches[0];
			obj.startX = touchs.pageX;
			obj.startY = touchs.pageY;
		});
		this.on(obj,"touchend",function(ev){
			var touchs = ev.changedTouches[0];
			if(Math.abs(touchs.pageX - obj.startX) > Math.abs(touchs.pageY - obj.startY) && Math.abs(touchs.pageX - obj.startX) > 30){
				if(touchs.pageX > obj.startX){
					_this.swipe_settings.right.call(obj,ev);
					return false;
				}
				if(touchs.pageX < obj.startX){
					_this.swipe_settings.left.call(obj,ev);
					return false;
				}
			};
			if(Math.abs(touchs.pageX - obj.startX) < Math.abs(touchs.pageY - obj.startY) && Math.abs(touchs.pageY - obj.startY) > 30){
				if(touchs.pageY > obj.startY){
					_this.swipe_settings.down.call(obj,ev);
					return false;
				}
				if(touchs.pageX < obj.startY){
					_this.swipe_settings.up.call(obj,ev);
					return false;
				}
			}
		});
	},
	//返回顶部框架  参数一是返回到的位置  参数二运动形式，为tween的有效值，参数三持续时间
	fanhui : function(number,ease,time){
		if(number && typeof number == "number"){
			var attr = number;
		}else{
			var attr = 0;
		};
		var _this = this;
		this.scrollTop_timer = null;
		_this.fanhuiMove(attr,ease,time)
	},
	//返回顶部的运动
	fanhuiMove : function(attr,fx,time){
		var _this = this;
		var startTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
		var startTime = _this.movement_now();
		clearInterval(_this.scrollTop_timer);
		_this.scrollTop_timer = setInterval(function(){
			var changeTime = _this.movement_now();
			var t = time - Math.max(0,startTime - changeTime + time);  //0到2000 
			var value = 0;
			var cur = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
			if(fx && time){
				var speed = Tween[fx](t,startTop,attr-startTop,time);
				value = speed;
			}else{
				var speed=(attr-cur)/8;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				value = cur+speed;
			};
			if(cur == attr || Math.abs(cur-attr)<1){
				clearInterval(_this.scrollTop_timer);
			};
			document.documentElement.scrollTop = value;
			document.body.scrollTop = value;
		},15);
	},

	//判断浏览器
	myLiuLanQi : function(){
		var ua = navigator.userAgent;
		ua = ua.toLowerCase();
		var match = /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];
		switch(match[1]){
			case "msie":      //ie
				if (parseInt(match[2]) == 6){    //ie6
					alert("您的浏览器版本过低，无法显示网页");
					window.location.href="http://windows.microsoft.com/zh-cn/internet-explorer/ie-10-worldwide-languages";
					document.body.innerHTML = "";
					return "ie6";
				}else if(parseInt(match[2]) == 7){    //ie7
					if(confirm("您的浏览器版本过低，是否进行升级？")){
						window.location.href="http://windows.microsoft.com/zh-cn/internet-explorer/ie-10-worldwide-languages";
					};
					return "ie7";
				}else if(parseInt(match[2]) == 8){    //ie8
					return "ie8";
				}else if(parseInt(match[2]) == 9){    //ie9
					return "ie9";
				}else if(parseInt(match[2]) == 10){    //ie10
					return "ie10";
				}else if(parseInt(match[2]) == 11){    //ie11
					return "ie11";
				};
				break;
			case "webkit":     //safari or chrome
				return "safari or chrome";
				break;
			case "opera":      //opera
				return "opera";
				break;
			case "mozilla":    //Firefox
				return "Firefox";
				break;
			default:
				if(this.browser.versions.mobile){
					return "移动终端";
				}
				return "未知浏览器";
				break;
		}
	},

	//判断是否为移动端，且移动端浏览器版本 返回布尔值
