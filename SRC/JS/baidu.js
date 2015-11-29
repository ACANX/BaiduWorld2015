//百度2015
var baidu = {
    init : function(){
        this.countdown();
        this.yore();
    },
    //星空
    universe : function(opt){
        var _this = this;
        this.settings = {
            canvas : [],
            clientWidth : document.documentElement.clientWidth,
            clientHeight : document.documentElement.clientHeight,
            starNum: 200,
            starColor: '#FBFFAF',
            starDepth: 500
        };
        huofengshui.extend(this.settings,opt);
        this.universe_cobj = [];
        for(var i=0;i<this.settings.canvas.length;i++){
            this.universe_cobj[i] = this.settings.canvas[i].getContext('2d');
            this.settings.canvas[i].width = _this.settings.clientWidth;
            this.settings.canvas[i].height = _this.settings.clientHeight;
        }
        this.universe_setup();
    },
    universe_draw : function(point3d){
        var scale = this.settings.starDepth/(this.settings.starDepth+point3d[2]);
        var x = ( point3d[0] * scale) + this.settings.clientWidth/2;
        var y = (point3d[1] * scale)  + this.settings.clientHeight/2;
        var r = Math.abs(scale)*6;
        if(r > 10){
            r = 15;
        }
        for(var i=0;i<this.settings.canvas.length;i++) {
            this.universe_cobj[i].drawImage( this.universe_yImg , x , y , r , r );
        }
    },
    universe_render : function(){
        for(var i=0;i<this.settings.canvas.length;i++) {
            this.universe_cobj[i].clearRect(0,0,this.settings.clientWidth,this.settings.clientHeight);
        }
        for (i=0; i< this.settings.starNum; i++){
            var point3d = this.points[i];
            var z = point3d[2];
            z -= 1;
            if( z < -this.settings.starDepth ){
                z += 400;
            };
            point3d[2] = z;
            this.universe_draw(point3d);
        }
    },
    universe_setup : function(){
        var _this = this;
        this.points = [];
        for (i=0; i<_this.settings.starNum; i++){
            var point = [(Math.random()*900)-500, (Math.random()*1040)-600 , (Math.random()*900)-500 ];
            this.points.push(point);
        }
        this.universe_yImg = new Image();
        this.universe_yImg.src = 'http://baiduworld.baidu.com/2015/images2015/star.png';
        this.universe_yImg.onload = function(){
            var loop = setInterval(function(){
                _this.universe_render();
            },60);
        };

    },
    //视频播放控制
    video_play : function(){
        var oTab = $(".f-lc-video-tab li");
        var oCon = $(".f-lc-video-con li");
        oTab.each(function(index,elem){
            elem.index = index;
            $(elem).on("click",function(){
                oCon.hide();
                oTab.removeClass("active");
                $(this).addClass("active");
                oCon.eq(this.index).show().find(".f-lc-video-box").show();
                $(".f-lc-iframe").removeAttr("src");
            })
        });
        $(".f-lc-video-play").each(function(index,elem){
            $(this).on("click",function(){
                $(this).parent().hide().next().attr("src",$(this).parent().next().attr("_src"));
                //$(this).parent().hide();
            })
        });
    },
    //倒计时
    countdown : function(){
        var _this = this;
        this.countdownLi = document.getElementById("countdown").getElementsByTagName("li");
        var EndTime = new Date('2015/12/08 09:00:00'); //截止时间
        var NowTime = new Date();
        var t = EndTime.getTime() - NowTime.getTime();
        var d = Math.floor(t/1000/60/60/24);
        var h = Math.floor(t/1000/60/60%24);
        var m = Math.floor(t/1000/60%60);
        var s = Math.floor(t/1000%60);
        d < 10 ? d = "0" + d : d = "" + d;
        h < 10 ? h = "0" + h : h = "" + h;
        m < 10 ? m = "0" + m : m = "" + m;
        s < 10 ? s = "0" + s : s = "" + s;
        parseInt(d) <= 0 ? d = "0" + 0 : d = "" + d;
        parseInt(h) <= 0 ? h = "0" + 0 : h = "" + h;
        parseInt(m) <= 0 ? m = "0" + 0 : m = "" + m;
        parseInt(s) <= 0 ? s = "0" + 0 : s = "" + s;
        this.countdownLi[0].innerHTML = '<img src="http://baiduworld.baidu.com/2015/images2015/time'+ d.charAt(0)+'.png" alt=""/>';
        this.countdownLi[1].innerHTML = '<img src="http://baiduworld.baidu.com/2015/images2015/time'+ d.charAt(1)+'.png" alt=""/>';
        this.countdownLi[3].innerHTML = '<img src="http://baiduworld.baidu.com/2015/images2015/time'+ h.charAt(0)+'.png" alt=""/>';
        this.countdownLi[4].innerHTML = '<img src="http://baiduworld.baidu.com/2015/images2015/time'+ h.charAt(1)+'.png" alt=""/>';
        this.countdownLi[6].innerHTML = '<img src="http://baiduworld.baidu.com/2015/images2015/time'+ m.charAt(0)+'.png" alt=""/>';
        this.countdownLi[7].innerHTML = '<img src="http://baiduworld.baidu.com/2015/images2015/time'+ m.charAt(1)+'.png" alt=""/>';
        this.countdownLi[9].innerHTML = '<img src="http://baiduworld.baidu.com/2015/images2015/time'+ s.charAt(0)+'.png" alt=""/>';
        this.countdownLi[10].innerHTML = '<img src="http://baiduworld.baidu.com/2015/images2015/time'+ s.charAt(1)+'.png" alt=""/>';
        setTimeout(function(){
            _this.countdown();
        },1000);
    },
    yore : function(){
        var _this = this;
        this.yore_box = document.getElementById("m-lc-yore");
        this.yore_tit = huofengshui.getByClass(this.yore_box,"m-lc-yore-tit","div")[0];
        this.yore_ul = this.yore_box.getElementsByTagName("ul")[0];
        this.yore_line = huofengshui.getByClass(this.yore_box,"u-lc-yore-line","div")[0];
        this.yore_ul.obj = {
            "h" : _this.yore_ul.offsetHeight
        };
        this.yore_line.obj = {
            "h" : _this.yore_line.offsetHeight
        };
        huofengshui.css(_this.yore_ul,{"height":0,"opacity":100});
        huofengshui.css(_this.yore_line,{"height":0,"opacity":100});
        this.yore_box.btn = true;
        this.yore_box.onmouseenter = function(){
            if(this.btn){
                this.btn = false;
                huofengshui.movement(_this.yore_ul,{"height":_this.yore_ul.obj.h},300,"easeOut");
                huofengshui.movement(_this.yore_line,{"height":_this.yore_line.obj.h},300,"easeOut",function(){
                    _this.yore_box.btn = true;
                });
            }
        }
        this.yore_box.onmouseleave = function(){
            if(this.btn){
                this.btn = false;
                huofengshui.movement(_this.yore_ul,{"height":0},300,"easeOut");
                huofengshui.movement(_this.yore_line,{"height":0},300,"easeOut",function(){
                    _this.yore_box.btn = true;
                });
            }
        }
    },
    show_tan : function(){
        var _this = this;
        //大会简介
        $("#dhjj").on("click",function(){
            $("#dhjj_alert").show();
        });
        $("#dhjj_text").on("click",function(){
            $("#dhjj_alert").show();
        });

        //会议日程
        $("#hyrc").on("click",function(){
            $("#hyrc_alert").show();
            _this.scroll($("#hyrc_alert"));
        });
        $("#shangwu").on("click",function(){
            $("#hyrc_alert").show();
            _this.scroll($("#hyrc_alert"));
        });
        $("#xiawu").on("click",function(){
            $("#hyrc_alert").show();
            _this.scroll($("#hyrc_alert"));
        });
        //嘉宾介绍
        $("#jbjs").on("click",function(){
            $("#jbjs_alert").show();
            _this.scroll($("#jbjs_alert"));
        });

        $("#jbjs_ul").on("click",function(){
            $("#jbjs_alert").show();
            _this.scroll($("#jbjs_alert"));
        });
        //会务联系
        $("#hwlx").on("click",function(){
            $("#hwlx_alert").show();
        });
        //展区介绍
        $("#zqjs").on("click",function(){
            $("#zqjs_alert").show();
            _this.scroll($("#zqjs_alert"));
        });
        //精彩视频
        $("#jcsp").on("click",function(){
            $("#jcsp_alert").show();
            _this.scroll($("#jcsp_alert"));
        });

        //新闻动态
        $("#xwdt").on("click",function(){
            $("#xwdt_alert").show();
            _this.scroll($("#xwdt_alert"));
        });

        //more操作
        $("#jcsp_more").on("click",function(){
            $("#jcsp_alert").show();
            _this.scroll($("#jcsp_alert"));
        });
        $("#jb_more").on("click",function(){
            $("#jbjs_alert").show();
            _this.scroll($("#jbjs_alert"));
        });
        $("#zq_more").on("click",function(){
            $("#zqjs_alert").show();
            _this.scroll($("#zqjs_alert"));
        });
        $("#hwlx_more").on("click",function(){
            $("#hwlx_alert").show();
        });

        $(".f-jqqd").on("click",function(){
            $("#jqqd_alert").show();
        });
    },
    hide_tan : function(){
        $(".f-lc-close").on("click",function(){
            $(this).parent().parent().hide();
        });
        $(".f-lc-back").on("click",function(){
            $(this).parent().parent().hide();
        })
    },
    hwlx : function(){
        var _this = this;
        $("#hwlc_tab > li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            var name = $(this).attr("data-name");
            $("#hwlx_con").html(_this.html_a(hwlx[name]));
            _this.scroll($("#hwlx_alert"));
        });
        var names = $("#hwlc_tab > li").eq(0).attr("data-name");
        $("#hwlx_con").html(_this.html_a(hwlx[names]));
        this.scroll($("#hwlx_alert"));
    },
    html_a : function(obj){
        var str = "";
        for(var i=0;i< obj.length;i++){
            str += '<li> \
                        <div class="u-lc-left">'+ obj[i].name +'</div> \
                        <div class="u-lc-main">'+ obj[i].tel +'</div> \
                        <div class="u-lc-right">'+ obj[i].email +'</div> \
                    </li>';
        };
        return str;
    },
    news : function(){
        var str = "";
        for(var i=0;i<news.length;i++){
            str += '<li> \
                        <a href="'+ news[i].src +'" target="_blank">'+ (i+1) + '、' + news[i].title +'</a> \
                    </li>'
        }
        $("#xwdt_con").html(str);
    },
    hyrc : function(){
        var _this = this;
        $("#hyrc_tab > li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            var name = $(this).attr("data-name");
            $("#hyrc_con").html(_this.html_b(hyrc[name],name));
            _this.scroll($("#hyrc_alert"));
        });
        var names = $("#hyrc_tab > li").eq(0).attr("data-name");
        $("#hyrc_con").html(_this.html_b(hyrc[names],names));
        this.scroll($("#hyrc_alert"));
    },
    html_b : function(obj,name){
        var str = "";
        for(var i=0;i< obj.length;i++){
            var className = obj[i].className+" "+name;
            //var className = name;
            str += '<li class="'+className+'"> \
                        <div class="u-lc-left">'+ obj[i].time +'</div> \
                        <div class="u-lc-main">'+ obj[i].yicheng +'</div> \
                        <div class="u-lc-right">'+ obj[i].guests +'</div> \
                    </li>';
        }
        return str;
    },
    jcsp : function(){
        var _this = this;
        $("#jcsp_tab > li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            var name = $(this).attr("data-name");
            $("#jcsp_con").html(_this.html_s(video[name],name));
            _this.scroll($("#jcsp_alert"));
        });
        var names = $("#jcsp_tab > li").eq(0).attr("data-name");
        $("#jcsp_con").html(_this.html_s(video[names],names));
        _this.scroll($("#jcsp_alert"));
    },
    html_s : function(obj,name){
        var str = "";
        for(var i=0;i<obj.length;i++){
            str += '<li>\
                        <div class="g-lc-shipin-left">\
                            <div class="u-lc-shipin-play" data-name="'+name+'" data-index="'+i+'">\
                                <img src="http://baiduworld.baidu.com/2015/images2015/alert-play.png" alt=""/>\
                            </div>\
                            <div class="u-lc-shipin-img"><img src="'+ obj[i].src +'" alt=""/></div>\
                        </div>\
                        <div class="g-lc-shipin-right" data-name="'+name+'" data-index="'+i+'">'+ obj[i].title +'</div>\
                    </li>';
        };
        return str;
    },
    jcsp_info : function(){
        var _this = this;
        $("#jcsp_con").delegate(".u-lc-shipin-play,.g-lc-shipin-right","click",function(){
            $("#jcsp_alert").hide();
            $("#jcsp_info_alert").show();
            $("#video_play").show();
            var name = $(this).attr("data-name");
            var i = parseInt($(this).attr("data-index"));
            $("#video_info").html(video[name][i].embed);
            $("#video_tit").html(video[name][i].title)
        });
        $(".f-lc-shipin-info-back").on("click",function() {
            $("#jcsp_alert").show();
            $("#jcsp_info_alert").hide();
            _this.scroll($("#jcsp_alert"));
        });
        $("#video_info_play").on("click",function(){
            $("#video_play").hide();
        });
    },
    exhibition : function(){
        var _this = this;
        $("#zqjs_tab > li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            var name = $(this).attr("data-name");
            $("#zqjs_con").html(_this.html_c(exhibition[name]));
            _this.scroll($("#zqjs_alert"));
        });
        var names = $("#zqjs_tab > li").eq(0).attr("data-name");
        $("#zqjs_con").html(_this.html_c(exhibition[names]));
        this.scroll($("#zqjs_alert"));
    },
    html_c : function(obj){
        var str = "";
        for(var i=0;i< obj.length;i++){
            str += '<li> \
                        <div class="g-lc-exhibition-left"> \
                            <img src="' + obj[i].img + '" alt=""/> \
                        </div> \
                        <div class="g-lc-exhibition-right"> \
                            <div class="u-lc-title">' + obj[i].title + '</div> \
                            <div class="u-lc-text">' + obj[i].content + '</div> \
                        </div> \
                    </li>';
        }
        return str;
    },
    guests : function(){
        var _this = this;
        $("#jbjs_tab > li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            var name = $(this).attr("data-name");
            $("#jbjs_con").html(_this.html_d(guests[name],name));
            _this.scroll($("#jbjs_alert"));
        });
        var names = $("#jbjs_tab > li").eq(0).attr("data-name");
        $("#jbjs_con").html(_this.html_d(guests[names],names));
        this.scroll($("#jbjs_alert"));
    },
    html_d : function(obj,name){
        var str = "";
        for(var i=0;i< obj.length;i++){
            str += '<li> \
                        <div class="g-lc-guests-left"> \
                            <div class="u-lc-img"><img src="' + obj[i].img + '" alt=""/></div> \
                        </div> \
                        <div class="g-lc-guests-right"> \
                            <div class="u-lc-text">' +
                                '<div class="u-lc-name"> ' +
                                    '<span>'+ obj[i].name +'</span>' + obj[i].job +
                                '</div>'+
                                '<div class="u-lc-info">'+
                                    obj[i].info+
                                '</div> \
                            </div> \
                            <a href="javascript:;" data-name='+name+' data-index='+i+'>查看更多</a> \
                        </div> \
                    </li>';
        }
        return str;
    },
    guests_info : function(){
        var _this = this;
        $("#jbjs_con").delegate("a","click",function(){
            $("#jbjs_alert").hide();
            $("#jbjs_info_alert").show();
            var name = $(this).attr("data-name");
            var i = parseInt($(this).attr("data-index"));
            console.log(name);
            $("#jbjs_info_img").html('<img src="'+guests[name][i].img+'" alt=""/>');
            $("#jbjs_info_name").html(guests[name][i].name);
            $("#jbjs_info_job").html(guests[name][i].job);
            $("#jbjs_info_info").html(guests[name][i].info);
            _this.scroll($("#jbjs_info_alert"));
        });
        $(".f-lc-guests-info-back").on("click",function() {
            $("#jbjs_alert").show();
            $("#jbjs_info_alert").hide();
            _this.scroll($("#jbjs_alert"));
        })
    },
    scroll : function(obj){
        var oWarpBox = obj.find(".f-lc-scroll-box").get(0);
        var oWarpBar = obj.find(".f-lc-scroll-bar").get(0);
        var oScrollBox = obj.find(".f-lc-bar-box").get(0);
        var oScrollBar = obj.find(".f-lc-bar-bar").get(0);
        var clientH = oWarpBox.clientHeight;
        var scrollH = oWarpBar.scrollHeight;
        var maxH = $(oScrollBox).outerHeight();
        var t = 0;
        var h = 30;
        h = Math.floor(clientH/scrollH * maxH);
        oWarpBar.style.top = "0px";
        oScrollBar.style.top = "0px";
        if(scrollH <= clientH){
            oScrollBox.style.display = "none";
            oWarpBox.onmousewheel = null;
            return false;
        }else{
            oScrollBox.style.display = "block";
        }
        if(h < 30){
            h = 30;
        }
        oScrollBar.style.height = h + "px";

        oScrollBar.onmousedown = function(e){
            var ev = window.event || e;
            var disY = ev.clientY - this.offsetTop;
            document.onmousemove = function(e){
                var ev = window.event || e;
                t = ev.clientY - disY;
                scrollT();
                return false;
            }
            document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
            }
            return false;
        }

        oScrollBox.onmousedown = function(e){
            var ev = window.event || e;
            var disY = ev.clientY - this.offsetTop;
            var dt = null;
            dt = setInterval(function(){
                if(disY > h){
                    if(t<disY){
                        t += 5;
                        if(t >= disY - h){
                            clearInterval(dt);
                        }
                    }else{
                        t -= 5;
                        if(t <= disY){
                            clearInterval(dt);
                        }
                    }

                }else{
                    if( t > 0 ){
                        t -= 5;
                        if(t <= 0){
                            clearInterval(dt);
                        }
                    }
                }
                scrollT();
            },100);
            oScrollBox.onmouseup = oScrollBox.onmouseout = function(){
                clearInterval(dt);
            }
        }

        oWarpBox.onmousewheel = mouseScroll;
        if(oWarpBox.addEventListener){
            oWarpBox.addEventListener('DOMMouseScroll',mouseScroll,false);
        }

        function mouseScroll(e){
            var ev = e || window.event;
            var fx = ev.wheelDelta || ev.detail;
            var bDown = true;
            if( ev.detail ){
                bDown = fx > 0 ? true : false;
            }else{
                bDown = fx > 0 ? false : true;
            }
            if( bDown ){
                t += 10;
            }else{
                t -= 10;
            }
            scrollT();
            if( ev.preventDefault ){
                ev.preventDefault();
            }
            return false;
        }

        function scrollT(){
            if(t < 0){
                t = 0;
            }
            if(t > (maxH - h)){
                t = maxH - h;
            }
            oScrollBar.style.top = t + "px";
            oWarpBar.style.top = (clientH - scrollH)*(t/(maxH-h)) + "px";
        }
    }
}

function baiduMap(){
    var json = markerArr[0];
    var iconImg = createIcon(json.icon);
    var i=0;
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point();
    var targetPoint = new BMap.Point(116.465799, 39.915672);//中国大饭店
    map.centerAndZoom(targetPoint, 17);
    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
    map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));  //右上角，仅包含平移和缩放按钮
    var marker1 = new BMap.Marker(new BMap.Point(116.465822, 39.915625),{icon:iconImg});  // 创建标注
    var iw = createInfoWindow(0);
    var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
    marker1.setLabel(label);
    map.addOverlay(marker1);
    label.setStyle({
        borderColor:"#808080",
        color:"#333",
        cursor:"pointer"
    });
    (function(){
        var index = i;
        var _iw = createInfoWindow(i);
        var _marker = marker1;
        _marker.addEventListener("click",function(){
            this.openInfoWindow(_iw);
        });
        _iw.addEventListener("open",function(){
            _marker.getLabel().hide();
        })
        _iw.addEventListener("close",function(){
            _marker.getLabel().show();
        })
        label.addEventListener("click",function(){
            _marker.openInfoWindow(_iw);
        })
        if(!!json.isOpen){
            label.hide();
            _marker.openInfoWindow(_iw);
        }
    })()

}

//标注点数组
var markerArr = [{title:"中国大饭店",content:"我的备注",point:"116.465799|39.915672",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}];
//创建InfoWindow
function createInfoWindow(i){
    var json = markerArr[i];
    var opts = {enableMessage:false};
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>",opts);
    return iw;
}
//创建一个Icon
function createIcon(json){
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png",
        new BMap.Size(json.w,json.h),
        {imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)}
    )
    return icon;
}
