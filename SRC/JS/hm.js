(function() {
	var h = {},
		mt = {},
		c = {
			id: "5eb852824af747a85246ddf8101f89ae",
			dm: ["baiduworld.baidu.com"],
			js: "tongji.baidu.com/hm-web/js/",
			etrk: [],
			icon: '',
			ctrk: false,
			align: -1,
			nv: -1,
			vdur: 1800000,
			age: 31536000000,
			rec: 0,
			rp: [],
			trust: 0,
			vcard: 0,
			qiao: 0,
			lxb: 0,
			conv: 0,
			comm: 0,
			apps: ''
		};
	var r = !0,
		s = null,
		t = !1;
	mt.i = {};
	mt.i.S = /msie (\d+\.\d+)/i.test(navigator.userAgent);
	mt.i.ta = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? document.documentMode || +RegExp.$1 : void 0;
	mt.i.cookieEnabled = navigator.cookieEnabled;
	mt.i.javaEnabled = navigator.javaEnabled();
	mt.i.language = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "";
	mt.i.za = (window.screen.width || 0) + "x" + (window.screen.height || 0);
	mt.i.colorDepth = window.screen.colorDepth || 0;
	mt.cookie = {};
	mt.cookie.set = function(a, b, f) {
		var d;
		f.G && (d = new Date, d.setTime(d.getTime() + f.G));
		document.cookie = a + "=" + b + (f.domain ? "; domain=" + f.domain : "") + (f.path ? "; path=" + f.path : "") + (d ? "; expires=" + d.toGMTString() : "") + (f.Wa ? "; secure" : "")
	};
	mt.cookie.get = function(a) {
		return (a = RegExp("(^| )" + a + "=([^;]*)(;|$)").exec(document.cookie)) ? a[2] : s
	};
	mt.s = {};
	mt.s.Oa = function(a) {
		return document.getElementById(a)
	};
	mt.s.Pa = function(a, b) {
		for (b = b.toUpperCase();
			(a = a.parentNode) && 1 == a.nodeType;)
			if (a.tagName == b) return a;
		return s
	};
	(mt.s.xa = function() {
		function a() {
			if (!a.A) {
				a.A = r;
				for (var b = 0, e = d.length; b < e; b++) d[b]()
			}
		}

