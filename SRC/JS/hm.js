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

		function b() {
			try {
				document.documentElement.doScroll("left")
			} catch (d) {
				setTimeout(b, 1);
				return
			}
			a()
		}
		var f = t,
			d = [],
			e;
		document.addEventListener ? e = function() {
			document.removeEventListener("DOMContentLoaded", e, t);
			a()
		} : document.attachEvent && (e = function() {
			"complete" === document.readyState && (document.detachEvent("onreadystatechange", e), a())
		});
		(function() {
			if (!f)
				if (f = r, "complete" === document.readyState) a.A = r;
				else if (document.addEventListener) document.addEventListener("DOMContentLoaded",
				e, t), window.addEventListener("load", a, t);
			else if (document.attachEvent) {
				document.attachEvent("onreadystatechange", e);
				window.attachEvent("onload", a);
				var d = t;
				try {
					d = window.frameElement == s
				} catch (n) {}
				document.documentElement.doScroll && d && b()
			}
		})();
		return function(b) {
			a.A ? b() : d.push(b)
		}
	}()).A = t;
	mt.event = {};
	mt.event.c = function(a, b, f) {
		a.attachEvent ? a.attachEvent("on" + b, function(b) {
			f.call(a, b)
		}) : a.addEventListener && a.addEventListener(b, f, t)
	};
	mt.event.preventDefault = function(a) {
		a.preventDefault ? a.preventDefault() : a.returnValue = t
	};
	mt.l = {};
	mt.l.parse = function() {
		return (new Function('return (" + source + ")'))()
	};
	mt.l.stringify = function() {
		function a(a) {
			/["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function(a) {
				var b = f[a];
				if (b) return b;
				b = a.charCodeAt();
				return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
			}));
			return '"' + a + '"'
		}

		function b(a) {
			return 10 > a ? "0" + a : a
		}
		var f = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		};
		return function(d) {
			switch (typeof d) {
				case "undefined":
					return "undefined";
				case "number":
					return isFinite(d) ? String(d) : "null";
				case "string":
					return a(d);
				case "boolean":
					return String(d);
				default:
					if (d === s) return "null";
					if (d instanceof Array) {
						var e = ["["],
							f = d.length,
							n, g, k;
						for (g = 0; g < f; g++) switch (k = d[g], typeof k) {
							case "undefined":
							case "function":
							case "unknown":
								break;
							default:
								n && e.push(","), e.push(mt.l.stringify(k)), n = 1
						}
						e.push("]");
						return e.join("")
					}
					if (d instanceof Date) return '"' + d.getFullYear() + "-" + b(d.getMonth() + 1) + "-" + b(d.getDate()) + "T" + b(d.getHours()) + ":" + b(d.getMinutes()) + ":" + b(d.getSeconds()) + '"';
					n = ["{"];
					g = mt.l.stringify;
					for (f in d)
						if (Object.prototype.hasOwnProperty.call(d, f)) switch (k =
							d[f], typeof k) {
							case "undefined":
							case "unknown":
							case "function":
								break;
							default:
								e && n.push(","), e = 1, n.push(g(f) + ":" + g(k))
						}
						n.push("}");
					return n.join("")
			}
		}
	}();
	mt.lang = {};
	mt.lang.e = function(a, b) {
		return "[object " + b + "]" === {}.toString.call(a)
	};
	mt.lang.Ta = function(a) {
		return mt.lang.e(a, "Number") && isFinite(a)
	};
	mt.lang.Va = function(a) {
		return mt.lang.e(a, "String")
	};
	mt.localStorage = {};
	mt.localStorage.C = function() {
		if (!mt.localStorage.g) try {
			mt.localStorage.g = document.createElement("input"), mt.localStorage.g.type = "hidden", mt.localStorage.g.style.display = "none", mt.localStorage.g.addBehavior("#default#userData"), document.getElementsByTagName("head")[0].appendChild(mt.localStorage.g)
		} catch (a) {
			return t
		}
		return r
	};
	mt.localStorage.set = function(a, b, f) {
		var d = new Date;
		d.setTime(d.getTime() + f || 31536E6);
		try {
			window.localStorage ? (b = d.getTime() + "|" + b, window.localStorage.setItem(a, b)) : mt.localStorage.C() && (mt.localStorage.g.expires = d.toUTCString(), mt.localStorage.g.load(document.location.hostname), mt.localStorage.g.setAttribute(a, b), mt.localStorage.g.save(document.location.hostname))
		} catch (e) {}
	};
	mt.localStorage.get = function(a) {
		if (window.localStorage) {
			if (a = window.localStorage.getItem(a)) {
				var b = a.indexOf("|"),
					f = a.substring(0, b) - 0;
				if (f && f > (new Date).getTime()) return a.substring(b + 1)
			}
		} else if (mt.localStorage.C()) try {
			return mt.localStorage.g.load(document.location.hostname), mt.localStorage.g.getAttribute(a)
		} catch (d) {}
		return s
	};
	mt.localStorage.remove = function(a) {
		if (window.localStorage) window.localStorage.removeItem(a);
		else if (mt.localStorage.C()) try {
			mt.localStorage.g.load(document.location.hostname), mt.localStorage.g.removeAttribute(a), mt.localStorage.g.save(document.location.hostname)
		} catch (b) {}
	};
	mt.sessionStorage = {};
	mt.sessionStorage.set = function(a, b) {
		if (window.sessionStorage) try {
			window.sessionStorage.setItem(a, b)
		} catch (f) {}
	};
	mt.sessionStorage.get = function(a) {
		return window.sessionStorage ? window.sessionStorage.getItem(a) : s
	};
	mt.sessionStorage.remove = function(a) {
		window.sessionStorage && window.sessionStorage.removeItem(a)
	};
	mt.N = {};
	mt.N.log = function(a, b) {
		var f = new Image,
			d = "mini_tangram_log_" + Math.floor(2147483648 * Math.random()).toString(36);
		window[d] = f;
		f.onload = f.onerror = f.onabort = function() {
			f.onload = f.onerror = f.onabort = s;
			f = window[d] = s;
			b && b(a)
		};
		f.src = a
	};
	mt.O = {};
	mt.O.ma = function() {
		var a = "";
		if (navigator.plugins && navigator.mimeTypes.length) {
			var b = navigator.plugins["Shockwave Flash"];
			b && b.description && (a = b.description.replace(/^.*\s+(\S+)\s+\S+$/, "$1"))
		} else if (window.ActiveXObject) try {
			if (b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))(a = b.GetVariable("$version")) && (a = a.replace(/^.*\s+(\d+),(\d+).*$/, "$1.$2"))
		} catch (f) {}
		return a
	};
	mt.O.Ma = function(a, b, f, d, e) {
		return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="' + a + '" width="' + f + '" height="' + d + '"><param name="movie" value="' + b + '" /><param name="flashvars" value="' + (e || "") + '" /><param name="allowscriptaccess" value="always" /><embed type="application/x-shockwave-flash" name="' + a + '" width="' + f + '" height="' + d + '" src="' + b + '" flashvars="' + (e || "") + '" allowscriptaccess="always" /></object>'
	};
	mt.url = {};
	mt.url.k = function(a, b) {
		var f = a.match(RegExp("(^|&|\\?|#)(" + b + ")=([^&#]*)(&|$|#)", ""));
		return f ? f[3] : s
	};
	mt.url.Ra = function(a) {
		return (a = a.match(/^(https?:)\/\//)) ? a[1] : s
	};
	mt.url.ha = function(a) {
		return (a = a.match(/^(https?:\/\/)?([^\/\?#]*)/)) ? a[2].replace(/.*@/, "") : s
	};
	mt.url.Q = function(a) {
		return (a = mt.url.ha(a)) ? a.replace(/:\d+$/, "") : a
	};
	mt.url.Qa = function(a) {
		return (a = a.match(/^(https?:\/\/)?[^\/]*(.*)/)) ? a[2].replace(/[\?#].*/, "").replace(/^$/, "/") : s
	};
	h.r = {
		Sa: "http://tongji.baidu.com/hm-web/welcome/ico",
		W: "hm.baidu.com/hm.gif",
		Z: "baidu.com",
		qa: "hmmd",
		ra: "hmpl",
		pa: "hmkw",
		na: "hmci",
		sa: "hmsr",
		oa: "hmcu",
		p: 0,
		m: Math.round(+new Date / 1E3),
		protocol: "https:" === document.location.protocol ? "https:" : "http:",
		Ua: 0,
		Ja: 6E5,
		Ka: 10,
		La: 1024,
		Ia: 1,
		K: 2147483647,
		X: "cc cf ci ck cl cm cp cu cw ds ep et fl ja ln lo lt nv rnd si st su v cv lv api tt u".split(" ")
	};
