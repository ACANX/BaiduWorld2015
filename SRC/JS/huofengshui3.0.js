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
	
