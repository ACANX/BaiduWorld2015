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
(function() {
		var a = {
			o: {},
			c: function(a, f) {
				this.o[a] = this.o[a] || [];
				this.o[a].push(f)
			},
			w: function(a, f) {
				this.o[a] = this.o[a] || [];
				for (var d = this.o[a].length, e = 0; e < d; e++) this.o[a][e](f)
			}
		};
		return h.F = a
	})();
	(function() {
		function a(a, d) {
			var e = document.createElement("script");
			e.charset = "utf-8";
			b.e(d, "Function") && (e.readyState ? e.onreadystatechange = function() {
				if ("loaded" === e.readyState || "complete" === e.readyState) e.onreadystatechange = s, d()
			} : e.onload = function() {
				d()
			});
			e.src = a;
			var m = document.getElementsByTagName("script")[0];
			m.parentNode.insertBefore(e, m)
		}
		var b = mt.lang;
		return h.load = a
	})();
	(function() {
		function a() {
			return function() {
				h.b.a.nv = 0;
				h.b.a.st = 4;
				h.b.a.et = 3;
				h.b.a.ep = h.D.ka() + "," + h.D.ga();
				h.b.j()
			}
		}

		function b() {
			clearTimeout(x);
			var a;
			w && (a = "visible" == document[w]);
			y && (a = !document[y]);
			g = "undefined" == typeof a ? r : a;
			if ((!n || !k) && g && l) u = r, p = +new Date;
			else if (n && k && (!g || !l)) u = t, q += +new Date - p;
			n = g;
			k = l;
			x = setTimeout(b, 100)
		}

		function f(a) {
			var p = document,
				k = "";
			if (a in p) k = a;
			else
				for (var b = ["webkit", "ms", "moz", "o"], q = 0; q < b.length; q++) {
					var e = b[q] + a.charAt(0).toUpperCase() + a.slice(1);
					if (e in p) {
						k =
							e;
						break
					}
				}
			return k
		}

		function d(a) {
			if (!("focus" == a.type || "blur" == a.type) || !(a.target && a.target != window)) l = "focus" == a.type || "focusin" == a.type ? r : t, b()
		}
		var e = mt.event,
			m = h.F,
			n = r,
			g = r,
			k = r,
			l = r,
			v = +new Date,
			p = v,
			q = 0,
			u = r,
			w = f("visibilityState"),
			y = f("hidden"),
			x;
		b();
		(function() {
			var a = w.replace(/[vV]isibilityState/, "visibilitychange");
			e.c(document, a, b);
			e.c(window, "pageshow", b);
			e.c(window, "pagehide", b);
			"object" == typeof document.onfocusin ? (e.c(document, "focusin", d), e.c(document, "focusout", d)) : (e.c(window, "focus", d),
				e.c(window, "blur", d))
		})();
		h.D = {
			ka: function() {
				return +new Date - v
			},
			ga: function() {
				return u ? +new Date - p + q : q
			}
		};
		m.c("pv-b", function() {
			e.c(window, "unload", a())
		});
		return h.D
	})();
	
	(function() {
		var a = mt.lang,
			b = h.r,
			f = h.load,
			d = {
				ua: function(e) {
					if ((void 0 === window._dxt || a.e(window._dxt, "Array")) && "undefined" !== typeof h.b) {
						var d = h.b.H();
						f([b.protocol, "//datax.baidu.com/x.js?si=", c.id, "&dm=", encodeURIComponent(d)].join(""), e)
					}
				},
				Ga: function(b) {
					if (a.e(b, "String") || a.e(b, "Number")) window._dxt = window._dxt || [], window._dxt.push(["_setUserId", b])
				}
			};
		return h.ba = d
	})();
	(function() {
		function a(k) {
			for (var b in k)
				if ({}.hasOwnProperty.call(k, b)) {
					var d = k[b];
					f.e(d, "Object") || f.e(d, "Array") ? a(d) : k[b] = String(d)
				}
		}

		function b(a) {
			return a.replace ? a.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2") : a
		}
		var f = mt.lang,
			d = mt.l,
			e = h.r,
			m = h.F,
			n = h.ba,
			g = {
				q: [],
				B: 0,
				U: t,
				init: function() {
					g.d = 0;
					m.c("pv-b", function() {
						g.ca();
						g.da()
					});
					m.c("pv-d", g.ea);
					m.c("stag-b", function() {
						h.b.a.api = g.d || g.B ? g.d + "_" + g.B : ""
					});
					m.c("stag-d", function() {
						h.b.a.api = 0;
						g.d = 0;
						g.B = 0
					})
				},
				ca: function() {
					var a = window._hmt ||
						[];
					if (!a || f.e(a, "Array")) window._hmt = {
						id: c.id,
						cmd: {},
						push: function() {
							for (var a = window._hmt, k = 0; k < arguments.length; k++) {
								var p = arguments[k];
								f.e(p, "Array") && (a.cmd[a.id].push(p), "_setAccount" === p[0] && (1 < p.length && /^[0-9a-f]{32}$/.test(p[1])) && (p = p[1], a.id = p, a.cmd[p] = a.cmd[p] || []))
							}
						}
					}, window._hmt.cmd[c.id] = [], window._hmt.push.apply(window._hmt, a)
				},
				da: function() {
					var a = window._hmt;
					if (a && a.cmd && a.cmd[c.id])
						for (var b = a.cmd[c.id], d = /^_track(Event|MobConv|Order|RTEvent)$/, p = 0, q = b.length; p < q; p++) {
							var e = b[p];
							d.test(e[0]) ? g.q.push(e) : g.L(e)
						}
					a.cmd[c.id] = {
						push: g.L
					}
				},
				ea: function() {
					if (0 < g.q.length)
						for (var a = 0, b = g.q.length; a < b; a++) g.L(g.q[a]);
					g.q = s
				},
				L: function(a) {
					var b = a[0];
					if (g.hasOwnProperty(b) && f.e(g[b], "Function")) g[b](a)
				},
				_setAccount: function(a) {
					1 < a.length && /^[0-9a-f]{32}$/.test(a[1]) && (g.d |= 1)
				},
				_setAutoPageview: function(a) {
					if (1 < a.length && (a = a[1], t === a || r === a)) g.d |= 2, h.b.R = a
				},
				_trackPageview: function(a) {
					if (1 < a.length && a[1].charAt && "/" === a[1].charAt(0)) {
						g.d |= 4;
						h.b.a.et = 0;
						h.b.a.ep = "";
						h.b.I ? (h.b.a.nv = 0, h.b.a.st =
							4) : h.b.I = r;
						var b = h.b.a.u,
							d = h.b.a.su;
						h.b.a.u = e.protocol + "//" + document.location.host + a[1];
						g.U || (h.b.a.su = document.location.href);
						h.b.j();
						h.b.a.u = b;
						h.b.a.su = d
					}
				},
				_trackEvent: function(a) {
					2 < a.length && (g.d |= 8, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 4, h.b.a.ep = b(a[1]) + "*" + b(a[2]) + (a[3] ? "*" + b(a[3]) : "") + (a[4] ? "*" + b(a[4]) : ""), h.b.j())
				},
				_setCustomVar: function(a) {
					if (!(4 > a.length)) {
						var d = a[1],
							e = a[4] || 3;
						if (0 < d && 6 > d && 0 < e && 4 > e) {
							g.B++;
							for (var p = (h.b.a.cv || "*").split("!"), q = p.length; q < d - 1; q++) p.push("*");
							p[d - 1] = e + "*" + b(a[2]) +
								"*" + b(a[3]);
							h.b.a.cv = p.join("!");
							a = h.b.a.cv.replace(/[^1](\*[^!]*){2}/g, "*").replace(/((^|!)\*)+$/g, "");
							"" !== a ? h.b.setData("Hm_cv_" + c.id, encodeURIComponent(a), c.age) : h.b.ya("Hm_cv_" + c.id)
						}
					}
				},
				_setReferrerOverride: function(a) {
					1 < a.length && (h.b.a.su = a[1].charAt && "/" === a[1].charAt(0) ? e.protocol + "//" + window.location.host + a[1] : a[1], g.U = r)
				},
				_trackOrder: function(b) {
					b = b[1];
					f.e(b, "Object") && (a(b), g.d |= 16, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 94, h.b.a.ep = d.stringify(b), h.b.j())
				},
				_trackMobConv: function(a) {
					if (a = {
							webim: 1,
							tel: 2,
							map: 3,
							sms: 4,
							callback: 5,
							share: 6
						}[a[1]]) g.d |= 32, h.b.a.et = 93, h.b.a.ep = a, h.b.j()
				},
				_trackRTPageview: function(b) {
					b = b[1];
					f.e(b, "Object") && (a(b), b = d.stringify(b), 512 >= encodeURIComponent(b).length && (g.d |= 64, h.b.a.rt = b))
				},
				_trackRTEvent: function(b) {
					b = b[1];
					if (f.e(b, "Object")) {
						a(b);
						b = encodeURIComponent(d.stringify(b));
						var l = function(a) {
								var b = h.b.a.rt;
								g.d |= 128;
								h.b.a.et = 90;
								h.b.a.rt = a;
								h.b.j();
								h.b.a.rt = b
							},
							m = b.length;
						if (900 >= m) l.call(this, b);
						else
							for (var m = Math.ceil(m / 900), p = "block|" + Math.round(Math.random() *
									e.K).toString(16) + "|" + m + "|", q = [], u = 0; u < m; u++) q.push(u), q.push(b.substring(900 * u, 900 * u + 900)), l.call(this, p + q.join("|")), q = []
					}
				},
				_setUserId: function(a) {
					a = a[1];
					n.ua();
					n.Ga(a)
				}
			};
		g.init();
		h.$ = g;
		return h.$
	})();
	
	
	
