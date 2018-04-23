(function(window, jQuery) {
if (typeof jQuery === 'undefined') {
	throw new Error('COOS需要依赖jQuery');
}

if (window["COOS is loadded"]) {
	console.log("COOS is loadded");
	return;
}
window["COOS is loadded"] = true;
var co = window.coos || new Object();
window.coos = co;
// 获取当前工程项目路径
co.getRootPath = function() {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPaht = curWwwPath.substring(0, pos);
	if (pathName != null) {
		pathName = pathName.replace(/\/+/g, "/");
	}
	if (typeof (basePath) != 'undefined' && basePath != null && (basePath == '' || basePath == '/')) {
		var httpName = curWwwPath.split('://')[0];
		var httpPath = curWwwPath.split('://')[1];
		localhostPaht = httpName + '://' + (httpPath.substring(0, httpPath.indexOf("/")));
		return (localhostPaht) + "/";
	} else {
		var projectName = pathName.substring(0, pathName.substr(1).indexOf("/") + 1);
		return (localhostPaht + projectName) + "/";
	}
};
// 当前项目路径
window.basePath = co.basePath = co.getRootPath();
// 设置websocket路径
window.webSocketPath = co.webSocketPath = basePath.replace('http://', 'ws://').replace('https://', 'ws://');
// 设置配置项
// 加入方法
co.define = function(arg1, arg2) {
	var names = [ arg1 ];
	if (co.isArray(arg1)) {
		names = arg1;
	}
	var fns = [ arg2 ];
	if (co.isArray(arg2)) {
		fns = arg2;
	}
	$(names).each(function(index, name) {
		var arr = name.split('.');
		var context = coos;
		for (var i = 0; i < arr.length - 1; i++) {
			var str = arr[i];
			if (!context[str]) {
				context[str] = {};
			}
			context = context[str];
		}
		;
		context[arr[arr.length - 1]] = fns[index];
	});
	return this;
};
co.resource = new Object();
co.resource.images = {
	loading : basePath + "/resource/coos/images/image/loading.gif",
	noimg : basePath + "/resource/coos/images/image/noimage.png",
	notfindimg : basePath + "/resource/coos/images/image/notfindimage.png",
	clickupload : basePath + "/resource/coos/images/image/clickupload.png"
};
(function() {
	co.getBrowser = function() {
		var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
		var isOpera = userAgent.indexOf("Opera") > -1;
		// 判断是否Opera浏览器
		if (isOpera) {
			return "Opera"
		}
		// 判断是否Firefox浏览器
		if (userAgent.indexOf("Firefox") > -1) {
			return "FF";
		}
		// 判断是否Chrome浏览器
		if (userAgent.indexOf("Chrome") > -1) {
			return "Chrome";
		}
		// 判断是否Safari浏览器
		if (userAgent.indexOf("Safari") > -1) {
			return "Safari";
		}
		if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
			return "IE";
		}
		// 判断是否IE浏览器
	};

	var browserInfo = co.getBrowser();
	co.isIE = function() {
		if (browserInfo == 'IE') {
			return true;
		}
		return false;
	};
	co.getWidth = function(arg1) {
		arg1 = arg1 || window;
		return $(arg1).width();
	};

	co.getHeight = function(arg1) {
		arg1 = arg1 || window;
		return $(arg1).height();
	};

	co.setTitle = function(title) {
		if (title) {
			if (document.title) {
				document.title = title;
			} else {
				$('head title').html(title);
			}
		}
	};

	co.getTitle = function() {
		if (document.title) {
			return document.title;
		} else {
			return $('head title').html();
		}
	};

	co.error = function(code, message, object) {
		var result = {};
		result.code = code;
		result.message = message;
		result.object = object;
		return result;
	};

	// 是否为空
	co.isTrue = function(arg) {
		var flag = false;
		if (arg != null) {
			if (co.isBoolean(arg)) {
				flag = arg;
			} else {
				if (arg == 'true' || arg == '1' || arg == 1) {
					flag = true;
				}
			}
		}
		return flag;
	};
	// 是否为空
	co.isEmpty = function(arg) {
		return typeof (arg) == "undefined" || arg == null || arg.length == 0;
	};
	// 是否包含字符串
	co.has = function(arg1, arg2) {
		if (co.isEmpty(arg1) || co.isEmpty(arg2)) {
			return false;
		}
		if (arg1.indexOf(arg2) != -1) {
			return true;
		}
		return false;
	};
	co.isPC = function() {
		var userAgentInfo = navigator.userAgent;
		var agents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod" ];
		var flag = true;
		for (var v = 0; v < agents.length; v++) {
			if (userAgentInfo.indexOf(agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	};

	co.isArray = function(arg) {
		return jQuery.isArray(arg);
	};

	co.isString = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return typeof (arg) === "string";
	};
	co.isObject = function(arg) {
		return typeof (arg) === "object";
	};
	co.isFunction = function(arg) {
		return typeof (arg) === "function";
	};
	co.isNumber = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (/^[-]?[0-9]+\.?[0-9]*$/.test(arg));
	};
	co.isBoolean = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return typeof (arg) === "boolean";
	};
	co.isInteger = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (/^-?[0-9]*$/.test(arg));
	};
	co.isPhone = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.phone.test(arg));
	};
	co.isTel = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.tel.test(arg));
	};
	co.isIDCard = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.idcard.test(arg));
	};
	co.isUrl = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.url.test(arg));
	};
	co.isChinese = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.chinese.test(arg));
	};
	co.isChineseOrEnglish = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.chinese_or_english.test(arg));
	};
	co.isEnglish = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.english.test(arg));
	};
	co.isEnglishOrNumber = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.english_or_number.test(arg));
	};
	co.isEnglishOrNumberOrUnderline = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.english_or_number_or_underline.test(arg));
	};
	co.isEnglishOrNumberOrUnderlineOrSlash = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.english_or_number_or_underline_or_slash.test(arg));
	};
	co.isEnglishOrNumberOrUnderlineOrPoint = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.english_or_number_or_underline_or_point.test(arg));
	};

	co.hasSymbol = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.has_symbol.test(arg));
	};
	co.isMailbox = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.mailbox.test(arg));
	};
	co.getStyle = function(obj, attr) {
		obj = $(obj)[0];
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else if (document.defaultView && document.defaultView.getComputedStyle) {
			var value = document.defaultView.getComputedStyle(obj, null);
			if (value) {
				return value[attr];
			}
			return null;
		} else {
			return null;
		}
	};
	co.isDate = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.date.test(arg));
	};
	co.isDatetime = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.datetime.test(arg));
	};
	co.isTime = function(arg) {
		if (this.isEmpty(arg)) {
			return false;
		}
		return (co.config.rules.time.test(arg));
	};
	co.getNowDate = function() {
		return co.date.format(new Date(), "yyyy-MM-dd");
	};
	co.getNowDatetime = function() {
		return co.date.format(new Date(), "yyyy-MM-dd hh:mm");
	};
	co.getNowTime = function() {
		return co.date.format(new Date(), "hh:mm");
	};
	co.isVisible = function(arg) {
		return !($(window).scrollTop() > ($(arg).offset().top + $(arg).outerHeight())) || (($(window).scrollTop() + $(window).height()) < $(arg).offset().top)
	};
	co.isOtherFile = function(arg1, arg2) {
		if (arg2.indexOf('.') < 0) {
			arg2 = "." + arg2;
		}
		var ext = arg1.substring(arg1.lastIndexOf("."), arg1.length).toUpperCase();
		if (ext != arg2.toUpperCase()) {
			return false;
		}
		return true;
	};
	co.isImage = function(arg) {
		var ext = arg.substring(arg.lastIndexOf("."), arg.length).toUpperCase();
		if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
			return false;
		}
		return true;
	};
	co.isVideo = function(arg) {
		var ext = arg.substring(arg.lastIndexOf("."), arg.length).toUpperCase();
		if (ext != ".AIFF" && ext != ".AVI" && ext != ".MOV" && ext != ".MPEG" && ext != ".QT" && ext != ".RAM" && ext != ".VIV" && ext != ".MP4") {
			return false;
		}
		return true;
	};
	co.isAudio = function(arg) {
		var ext = arg.substring(arg.lastIndexOf("."), arg.length).toUpperCase();
		if (ext != ".WMA" && ext != ".MP3" && ext != ".WAV" && ext != ".MP1" && ext != ".MP2" && ext != ".MIDI") {
			return false;
		}
		return true;
	};
	var numberindex = 0;
	co.getNumber = function() {
		numberindex++;
		var thisid = null;
		return new Date().getTime() - 1200000000000 + "" + Math.floor(Math.random() * 9 + 1) + "" + Math.floor(Math.random() * 9 + 1) + "" + numberindex;
	};

	co.clientid = co.getNumber();

	co.getRandomNumber = function() {
		var thisid = null;
		co.POST('core/data/getRandomNumber.data', {}, 'json', function(o) {
			thisid = o.data;
		}, false, {
			showLoading : false
		});
		return thisid;
	};

	co.formatHTML = function(arg) {
		if (co.isEmpty(arg)) {
			return arg;
		}
		arg = arg.replaceAll('\<', '&lt;');
		arg = arg.replaceAll('\>', '&gt;');
		arg = arg.replaceAll('\"', '&quot;');
		return arg;
	};

	co.getWeekDate = function(type, dates, now) {
		var now = now || new Date();
		var nowTime = now.getTime();
		var day = now.getDay();
		var longTime = 24 * 60 * 60 * 1000;
		var n = longTime * 7 * (dates || 0);
		if (type == "s") {
			var dd = nowTime - (day - 1) * longTime + n;
		}
		if (type == "e") {
			var dd = nowTime + (7 - day) * longTime + n;
		}
		return new Date(dd);
	};

	co.getWeekStartDate = function(arg1, arg2) {
		arg1 = arg1 || 0;
		return co.getWeekDate('s', arg1, arg2);
	};

	co.getWeekEndDate = function(arg1, arg2) {
		arg1 = arg1 || 0;
		return co.getWeekDate('e', arg1, arg2);
	};

	co.getMonthDate = function(type, dates, now) {
		var now = now || new Date();
		var nowTime = now.getTime();
		var day = now.getDate();
		var days = co.getMonthDays(now.getMonth());
		var longTime = 24 * 60 * 60 * 1000;
		var n = longTime * days * (dates || 0);
		if (type == "s") {
			var dd = nowTime - (day - 1) * longTime + n;
		}
		if (type == "e") {
			var dd = nowTime + (days - day) * longTime + n;
		}
		return new Date(dd);
	};
	co.getMonthStartDate = function(arg1, arg2) {
		arg1 = arg1 || 0;
		return co.getMonthDate('s', arg1, arg2);
	};

	co.getMonthEndDate = function(arg1, arg2) {
		arg1 = arg1 || 0;
		return co.getMonthDate('e', arg1, arg2);
	};

	co.getMonthDays = function(month, now) {
		var now = now || new Date()
		var year = now.getYear(); // 当前年
		year += (year < 2000) ? 1900 : 0; //
		var monthStartDate = new Date(year, month, 1).getTime();
		var monthEndDate = new Date(year, month + 1, 1).getTime();
		var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
		return days;
	};

	co.getLastYear = function() {
		var lastMonthDate = new Date(); // 上月日期
		lastMonthDate.setDate(1);
		lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
		var lastYear = lastMonthDate.getYear();
		var lastMonth = lastMonthDate.getMonth();
		return lastYear;
	};

	co.getLastMonth = function() {
		var lastMonthDate = new Date(); // 上月日期
		lastMonthDate.setDate(1);
		lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
		var lastYear = lastMonthDate.getYear();
		var lastMonth = lastMonthDate.getMonth();
		return lastMonth;
	};
})();
(function() {
	co.window = {};
	var BINDBODYSIZECHANGES = [];
	co.window.bindBodySizeChange = function(callback) {
		BINDBODYSIZECHANGES[BINDBODYSIZECHANGES.length] = callback;
	};
	co.window.bodySizeChange = function() {
		$(BINDBODYSIZECHANGES).each(function(index, BINDBODYSIZECHANGE) {
			BINDBODYSIZECHANGE && BINDBODYSIZECHANGE();
		});
	};
	co.window.initSize = function() {
		var width = $('body').outerWidth();
		if (co.isEmpty(width)) {
			width = $(window).width();
		}
		co.window.width = width;
		co.window.isxs = false;
		co.window.issm = false;
		co.window.ismd = false;
		co.window.islg = false;
		var sizestr = ",";
		if (width < 768) {
			$("html").addClass('coos-xs');
			co.window.isxs = true;
			sizestr += "xs,";
		} else {
			$("html").removeClass('coos-xs')
		}
		if (width >= 768) {
			$("html").addClass('coos-sm');
			co.window.issm = true;
			sizestr += "sm,";
		} else {
			$("html").removeClass('coos-sm')
		}
		if (width >= 992) {
			$("html").addClass('coos-md');
			co.window.ismd = true;
			sizestr += "md,";
		} else {
			$("html").removeClass('coos-md')
		}
		if (width >= 1200) {
			$("html").addClass('coos-lg');
			co.window.islg = true;
			sizestr += "lg,";
		} else {
			$("html").removeClass('coos-lg')
		}
		if (co.isEmpty(this.oldsizestr) || this.oldsizestr != sizestr) {
			this.oldsizestr = sizestr;
			co.window.bodySizeChange();
		}
	};
	co.window.initSize();
	$(window).on("resize", function() {
		co.window.initSize();
	});
})();
(function() {
	var initBindFunctions = [];
	co.init = function() {
		co.initConfig(config);

		if (co.inited) {
			return;
		}
		co.inited = true;

		$(initBindFunctions).each(function(index, initBindFunction) {
			initBindFunction && initBindFunction();
		});

	};
	co.option = function() {
	};
	co.initConfig = function(config) {
		co.config = jQuery.extend(true, {}, co.config, config);
		loadResource();
	};
	co.init.bind = function(fun) {
		initBindFunctions[initBindFunctions.length] = fun;
	}

	co.init.bind(function() {

		if (!co.isEmpty(config.resourcePath)) {
			// 加载资源
			loadResource();
		}
	});
	var loadResource = function() {
		if (co.isEmpty(co.config.resourcePath)) {
			return;
		}
		window.setTimeout(function() {
			coos.cover.showLoading();
		}, 1);
		var action = co.config.resourcePath;
		var data = {};
		co.POST(action, data, 'json', function(data) {
			var file = data.file;
			var jsfiles = file.js;
			var cssfiles = file.css;
			cssfiles = cssfiles == null ? [] : cssfiles;
			for (var i = 0; i < cssfiles.length; i++) {
				var cssfile = cssfiles[i];
				var src = cssfile.src;
				if (!src || src == '')
					continue;
				if (src.indexOf('http') != 0)
					src = basePath + src;
				document.write("<link href='" + src + "' rev='stylesheet' media ='screen' rel='stylesheet' type='text/css'>");
			}
			jsfiles = jsfiles == null ? [] : jsfiles;
			for (var i = 0; i < jsfiles.length; i++) {
				var jsfile = jsfiles[i];
				var src = jsfile.src;
				if (!src || src == '')
					continue;
				if (src.indexOf('http') != 0)
					src = basePath + src;
				document.write("<script type='text/javascript' src='" + src + "'></script>");
			}
			coos.cover.hideLoading();
		}, false);
	}
})();
(function() {
	co.handleError = function(s, xhr, status, e) {
		// If a local callback was specified, fire it
		if (s.error) {
			s.error.call(s.context || s, xhr, status, e);
		}

		// Fire the global callback
		if (s.global) {
			(s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [ xhr, s, e ]);
		}
	};
	co.ajaxFileUpload = function(s) {
		s = jQuery.extend(true, {}, jQuery.ajaxSettings, s); // 此时的s对象是由jQuery.ajaxSettings和原s对象扩展后的对象
		var id = new Date().getTime(); // 取当前系统时间，目的是得到一个独一无二的数字
		var form = createUploadForm(id, s.fileElementId, (typeof (s.data) == 'undefined' ? false : s.data)); // 创建动态form
		var io = createUploadIframe(id, s.secureuri); // 创建动态iframe
		var frameId = 'jUploadFrame' + id; // 动态iframe的id
		var formId = 'jUploadForm' + id; // 动态form的id
		// Watch for a new set of requests
		if (s.global && !jQuery.active++) {// 当jQuery开始一个ajax请求时发生
			jQuery.event.trigger("ajaxStart"); // 触发ajaxStart方法
		}
		var requestDone = false; // 请求完成标志
		// Create the request object
		var xml = {};
		if (s.global)
			jQuery.event.trigger("ajaxSend", [ xml, s ]); // 触发ajaxSend方法
		// Wait for a response to come back
		var uploadCallback = function(isTimeout) {// 回调函数
			var io = document.getElementById(frameId); // 得到iframe对象
			try {
				if (io.contentWindow) {// 动态iframe所在窗口对象是否存在
					xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
					xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;
				} else if (io.contentDocument) {// 动态iframe的文档对象是否存在
					xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
					xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
				}
			} catch (e) {
				co.handleError(s, xml, null, e);
			}
			if (xml || isTimeout == "timeout") {// xml变量被赋值或者isTimeout ==
				// "timeout"都表示请求发出，并且有响应
				requestDone = true; // 请求完成
				var status;
				try {
					status = isTimeout != "timeout" ? "success" : "error"; // 如果不是“超时”，表示请求成功
					// Make sure that the request was successful or notmodified
					if (status != "error") { // process the data (runs the
						// xml through httpData
						// regardless of callback)
						var data = uploadHttpData(xml, s.dataType); // 根据传送的type类型，返回json对象，此时返回的data就是后台操作后的返回结果
						// If a local callback was specified, fire it and pass
						// it the data
						if (s.success)
							s.success(data, status); // 执行上传成功的操作
						// Fire the global callback
						if (s.global)
							jQuery.event.trigger("ajaxSuccess", [ xml, s ]);
					} else
						co.handleError(s, xml, status);
				} catch (e) {
					status = "error";
					co.handleError(s, xml, status, e);
				} // The request was completed
				if (s.global)
					jQuery.event.trigger("ajaxComplete", [ xml, s ]); // Handle
				// the
				// global
				// AJAX
				// counter
				if (s.global && !--jQuery.active)
					jQuery.event.trigger("ajaxStop"); // Process result
				if (s.complete)
					s.complete(xml, status);
				jQuery(io).unbind();// 移除iframe的事件处理程序
				setTimeout(function() {// 设置超时时间
					try {
						jQuery(io).remove();// 移除动态iframe
						jQuery(form).remove();// 移除动态form
					} catch (e) {
						co.handleError(s, xml, null, e);
					}
				}, 100)
				xml = null
			}
		} // Timeout checker
		if (s.timeout > 0) {// 超时检测
			setTimeout(function() { // Check to see if the request is still
				// happening
				if (!requestDone)
					uploadCallback("timeout");// 如果请求仍未完成，就发送超时信号
			}, s.timeout);
		}
		try {
			var form = jQuery('#' + formId);
			jQuery(form).attr('action', s.url);// 传入的ajax页面导向url
			jQuery(form).attr('method', 'POST');// 设置提交表单方式
			jQuery(form).attr('target', frameId);// 返回的目标iframe，就是创建的动态iframe
			if (form.encoding) {// 选择编码方式
				jQuery(form).attr('encoding', 'multipart/form-data');
			} else {
				jQuery(form).attr('enctype', 'multipart/form-data');
			}
			jQuery(form).submit();// 提交form表单
		} catch (e) {
			co.handleError(s, xml, null, e);
		}
		jQuery('#' + frameId).load(uploadCallback); // ajax 请求从服务器加载数据，同时传入回调函数
		var result = {};
		result.abort = function() {
		};
		return result;
	};

	var createUploadIframe = function(id, uri) {// id为当前系统时间字符串，uri是外部传入的json对象的一个参数
		// create frame
		var frameId = 'jUploadFrame' + id; // 给iframe添加一个独一无二的id
		var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px;"'; // 创建iframe元素
		if (window.ActiveXObject) {// 判断浏览器是否支持ActiveX控件
			if (typeof uri == 'boolean') {
				iframeHtml += ' src="' + 'javascript:false' + '"';
			} else if (typeof uri == 'string') {
				iframeHtml += ' src="' + uri + '"';
			}
		}
		iframeHtml += ' />';
		jQuery(iframeHtml).appendTo(document.body); // 将动态iframe追加到body中
		return jQuery('#' + frameId).get(0); // 返回iframe对象
	};
	var createUploadForm = function(id, fileElementId, data) {
		var formId = 'jUploadForm' + id; // 给form添加一个独一无二的id
		var fileId = 'jUploadFile' + id; // 给<input type='file' />添加一个独一无二的id
		var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data" ></form>'); // 创建form元素
		if (data) {// 通常为false
			for ( var i in data) {
				jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form); // 根据data的内容，创建隐藏域，这部分我还不知道是什么时候用到。估计是传入json的时候，如果默认传一些参数的话要用到。
			}
		}
		var oldElement = jQuery('#' + fileElementId); // 得到页面中的<input
		// type='file' />对象
		var newElement = jQuery(oldElement).clone(); // 克隆页面中的<input
		// type='file' />对象
		jQuery(oldElement).attr('id', fileId); // 修改原对象的id
		jQuery(oldElement).before(newElement); // 在原对象前插入克隆对象
		jQuery(oldElement).appendTo(form); // 把原对象插入到动态form的结尾处
		// set attributes
		jQuery(form).css('position', 'absolute'); // 给动态form添加样式，使其浮动起来，
		jQuery(form).css('top', '-9999999px');
		jQuery(form).css('left', '-9999999px');
		jQuery(form).appendTo('body'); // 把动态form插入到body中
		return form;
	};
	var uploadHttpData = function(r, type) {
		var data = !type;
		data = type == "xml" || data ? r.responseXML : r.responseText;
		if (type == "script")
			jQuery.globalEval(data);
		if (type == "json")
			eval("data = " + data);
		if (type == "html")
			jQuery("<div>").html(data).evalScripts();
		return data;
	};
})();
(function(jQuery) {

	if (jQuery.browser)
		return;

	jQuery.browser = {};
	jQuery.browser.mozilla = false;
	jQuery.browser.webkit = false;
	jQuery.browser.opera = false;
	jQuery.browser.msie = false;

	var nAgt = navigator.userAgent;
	jQuery.browser.name = navigator.appName;
	jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
	jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
	var nameOffset, verOffset, ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset = nAgt.indexOf("Opera")) != -1) {
		jQuery.browser.opera = true;
		jQuery.browser.name = "Opera";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 6);
		if ((verOffset = nAgt.indexOf("Version")) != -1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
		jQuery.browser.msie = true;
		jQuery.browser.name = "Microsoft Internet Explorer";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
		jQuery.browser.webkit = true;
		jQuery.browser.name = "Chrome";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
		jQuery.browser.webkit = true;
		jQuery.browser.name = "Safari";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
		if ((verOffset = nAgt.indexOf("Version")) != -1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
		jQuery.browser.mozilla = true;
		jQuery.browser.name = "Firefox";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
		jQuery.browser.name = nAgt.substring(nameOffset, verOffset);
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 1);
		if (jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase()) {
			jQuery.browser.name = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix = jQuery.browser.fullVersion.indexOf(";")) != -1)
		jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix);
	if ((ix = jQuery.browser.fullVersion.indexOf(" ")) != -1)
		jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix);

	jQuery.browser.majorVersion = parseInt('' + jQuery.browser.fullVersion, 10);
	if (isNaN(jQuery.browser.majorVersion)) {
		jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
		jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
	}
	jQuery.browser.version = jQuery.browser.majorVersion;
})(jQuery);
(function() {
	co.localData = {
		hname : location.hostname ? location.hostname : 'localStatus',
		isLocalStorage : window.localStorage ? true : false,
		dataDom : null,

		initDom : function() { // 初始化userData
			if (!this.dataDom) {
				try {
					this.dataDom = document.createElement('input');// 这里使用hidden的input元素
					this.dataDom.type = 'hidden';
					this.dataDom.style.display = "none";
					this.dataDom.addBehavior('#default#userData');// 这是userData的语法
					document.body.appendChild(this.dataDom);
					var exDate = new Date();
					exDate = exDate.getDate() + 30;
					this.dataDom.expires = exDate.toUTCString();// 设定过期时间
				} catch (ex) {
					return false;
				}
			}
			return true;
		},
		set : function(key, value) {
			key = basePath + key;
			if (this.isLocalStorage) {
				window.localStorage.setItem(key, value);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					this.dataDom.setAttribute(key, value);
					this.dataDom.save(this.hname)
				}
			}
		},
		get : function(key) {
			key = basePath + key;
			if (this.isLocalStorage) {
				return window.localStorage.getItem(key);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					return this.dataDom.getAttribute(key);
				}
			}
		},
		remove : function(key) {
			key = basePath + key;
			if (this.isLocalStorage) {
				localStorage.removeItem(key);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					this.dataDom.removeAttribute(key);
					this.dataDom.save(this.hname)
				}
			}
		}
	};
})();
(function() {
	co.color = co.color || new Object();

	co.color.getReverse = function(color) {
		color = co.color.getHex(color);
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		if (reg.test(color)) {
			var h = color.replace('#', '').split("");
			var r = 0, g = 0, b = 0;
			r = 255 - parseInt(h[0], 16) * 16 - parseInt(h[1], 16);
			g = 255 - parseInt(h[2], 16) * 16 - parseInt(h[3], 16);
			b = 255 - parseInt(h[4], 16) * 16 - parseInt(h[5], 16);
			return "#" + (r < 16 ? "0" + r.toString(16).toUpperCase() : r.toString(16).toUpperCase()) + (g < 16 ? "0" + g.toString(16).toUpperCase() : g.toString(16).toUpperCase())
					+ (b < 16 ? "0" + b.toString(16).toUpperCase() : b.toString(16).toUpperCase());

		}
		return color;
	};
	co.color.getSimilar = function(color, offset) {
		color = co.color.getRgb(color);
		if (/^(rgb|RGB)/.test(color)) {
			var h = color.replace('rgb(', '').replace('RGB(', '').replace(')', '').split(",");
			var r = Number(h[0]);
			var g = Number(h[1]);
			var b = Number(h[2]);
			var newR = Number(r + offset);
			newR = newR > 255 ? (255) : newR;
			newR = newR < 0 ? (0) : newR;
			var newG = Number(g + offset);
			newG = newG > 255 ? (255) : newG;
			newG = newG < 0 ? (0) : newG;
			var newB = Number(b + offset);
			newB = newB > 255 ? (255) : newB;
			newB = newB < 0 ? (0) : newB;
			var newColor = "rgb(" + newR + "," + newG + "," + newB + ")";
			return co.color.getHex(newColor);
		}
		return color;
	};
	/* RGB颜色转换为16进制 */
	co.color.getHex = function(color) {
		if (co.isEmpty(color)) {
			return null;
		}
		color = co.color.getRgb(color);
		if (/^(rgb|RGB)/.test(color)) {
			var aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
			var strHex = "#";
			for (var i = 0; i < aColor.length; i++) {
				var hex = Number(aColor[i]).toString(16);
				if (hex === "0") {
					hex += hex;
				}
				strHex += hex;
			}
			if (strHex.length !== 7) {
				strHex = color;
			}
			return strHex;
		} else {
			return color;
		}
	};
	/* 16进制颜色转为RGB格式 */
	co.color.getRgb = function(color) {
		if (co.isEmpty(color)) {
			return null;
		}
		if (/^(rgb|RGB)/.test(color)) {
			return color;
		} else {
			var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
			if (reg.test(color)) {
				if (color.length === 4) {
					var sColorNew = "#";
					for (var i = 1; i < 4; i += 1) {
						sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
					}
					color = sColorNew;
				}
				// 处理六位的颜色值
				var sColorChange = [];
				for (var i = 1; i < 7; i += 2) {
					sColorChange.push(parseInt("0x" + color.slice(i, i + 2)));
				}
				return "RGB(" + sColorChange.join(",") + ")";
			} else {
				return color;
			}
		}
	};
})();
(function() {
	co.config = new Object();
	co.config = {};

	co.config.result = {
		errcode : "data.errcode",
		errmsg : "data.errmsg",
		result : "data.result",
		successcode : 0
	};
	co.config.action = {
		toIndex : "index/toIndex.do",
		toLogin : "login/toLogin.do",
		doLogin : "login/doLogin.do",
		doUpload : "core/file/file.upload",
		uploadProgress : "core/file/file.progress",
		error : {
			404 : "error/404.do",
			500 : "error/500.do",
			toNoAccess : "error/toNoAccess.do",
			toNotOnline : "error/toNotOnline.do"
		}
	};
	co.config.label = {
		define : "确定",
		cancel : "取消",
		title : "标题",
		alertBoxTitle : "提示信息",
		confirmBoxTitle : "确认信息",
		search : "搜索",
		searchInputPlaceholder : "请输入搜索内容",
		confirmChecked : "是否选中",
		noMatchingData : "暂无匹配数据"
	};
	co.config.error = {
		// 全局错误
		connectionTimedOut : {
			code : 10001,
			info : "链接超时",
			show : "链接超时，请检查网络环境！"
		},
		noNetwork : {
			code : 10002,
			info : "无网络",
			show : "无法连接服务器，请检查网络环境！"
		},

		// 表单元素验证错误
		isNull : {
			code : 30001,
			info : "输入值为空",
			show : "$label值不能为空！"
		},
		patternMismatch : {
			code : 30002,
			info : "输入值格式不匹配",
			show : "请输入正确$label格式！"
		},
		isLong : {
			code : 30003,
			info : "输入值太长",
			show : "$label的字符数不能超过$maxlength个字符！"
		},
		isShort : {
			code : 30004,
			info : "输入值太短",
			show : "$label的字符数不能少于$minlength个字符！"
		},
		isMin : {
			code : 30005,
			info : "输入值太小",
			show : "$label不能小于$min！"
		},
		isMax : {
			code : 30006,
			info : "输入值太大",
			show : "$label不能大于$max！"
		},
		isNotUrl : {
			code : 30007,
			info : "输入值不是有效的链接",
			show : "$label请输入正确的链接！"
		},
		isNotMail : {
			code : 30008,
			info : "输入值不是有效的邮箱",
			show : "$label请输入正确的邮箱！"
		},
		isNotNumber : {
			code : 30009,
			info : "输入值不是有效的数字",
			show : "$label请输入正确的数字！"
		},
		isNotInteger : {
			code : 30010,
			info : "输入值不是有效的整数",
			show : "$label请输入正确的整数！"
		},
		isNotDate : {
			code : 30011,
			info : "输入值不是有效的日期",
			show : "$label请输入正确的日期！"
		},
		isNotDatetime : {
			code : 30012,
			info : "输入值不是有效的日期时间",
			show : "$label请输入正确的日期时间！"
		},
		isNotPhone : {
			code : 30013,
			info : "输入值不是有效的手机号",
			show : "$label请输入正确的手机号码！"
		},
		isNotIDCard : {
			code : 30014,
			info : "输入值不是有效的身份证",
			show : "$label请输入正确的身份证！"
		},
		isNotTel : {
			code : 30015,
			info : "输入值不是有效的座机",
			show : "$label请输入正确的座机号码！"
		},
		isNotTime : {
			code : 30016,
			info : "输入值不是有效的时间",
			show : "$label请输入正确的时间！"
		},
		isNotImageFile : {
			code : 30017,
			info : "无效的图片文件",
			show : "$label请上传正确的图片文件！"
		},
		isNotAudioFile : {
			code : 30018,
			info : "无效的音频文件",
			show : "$label请上传正确的音频文件！"
		},
		isNotVideoFile : {
			code : 30019,
			info : "无效的视频文件",
			show : "$label请上传正确的视频文件！"
		},
		isNotOtherFile : {
			code : 30020,
			info : "请上传格式为$filetype类型的文件",
			show : "$label请上传正确的视频文件！"
		},
		isToLongFile : {
			code : 30021,
			info : "文件不能大于$maxfilelengthM",
			show : "$label文件不能大于$maxfilelengthM"
		},
		notEq : {
			code : 300022,
			info : "输入值不等于$eq",
			show : "$label必须等于$eq！"
		},
		notGt : {
			code : 300023,
			info : "输入值必须大于$gt",
			show : "$label不能小于等于$gt！"
		},
		notGte : {
			code : 300023,
			info : "输入值必须大于等于$gte",
			show : "$label不能小于$gte！"
		},
		notLt : {
			code : 300023,
			info : "输入值必须小于$lt",
			show : "$label不能大于等于$lt！"
		},
		notLte : {
			code : 300023,
			info : "输入值必须小于等于$lte",
			show : "$label不能大于$lte！"
		},
		isNotChinese : {
			code : 300026,
			info : "输入值只能包含中文",
			show : "$label只能输入中文！"
		},
		isNotChineseOrEnglish : {
			code : 300026,
			info : "输入值只能包含中文或英文",
			show : "$label只能输入中文或英文！"
		},
		isNotEnglish : {
			code : 300024,
			info : "输入值只能包含英文",
			show : "$label只能输入英文！"
		},
		isNotEnglishOrNumber : {
			code : 300024,
			info : "输入值只能包含英文或数字",
			show : "$label只能输入英文或数字！"
		},
		isNotEnglishOrNumberOrUnderline : {
			code : 300025,
			info : "输入值只能包含英文、数字或下划线",
			show : "$label只能输入英文、数字或下划线！"
		},
		isNotEnglishOrNumberOrUnderlineOrSlash : {
			code : 300025,
			info : "输入值只能包含英文、数字、下划线或斜杠",
			show : "$label只能输入英文、数字、下划线或斜杠！"
		},
		isNotEnglishOrNumberOrUnderlineOrPoint : {
			code : 300025,
			info : "输入值只能包含英文、数字、下划线或点",
			show : "$label只能输入英文、数字、下划线或点！"
		},
		isNotEnglishOrNumberOrSymbol : {
			code : 300025,
			info : "输入值只能包含英文、数字或特殊符号",
			show : "$label只能输入英文、数字或特殊符号！"
		},
		isNotNoSymbol : {
			code : 300025,
			info : "输入值不能包含特殊符号",
			show : "$label不能包含特殊符号！"
		}
	};

	co.config.server = {
		fileServerUrl : basePath + "upload/file"
	};

	co.config.rules = {
		time : /^(\d{2})[:时 ]?(\d{2})[:分 ]?$/,
		date : /^(\d{4})[-\/年 ]?(\d{2})[-\/月 ]?(\d{2})[日]?$/,
		datetime : /^(\d{4})[-\/年 ]?(\d{2})[-\/月 ]?(\d{2})[ |日]?(\d{2})[:时 ]?(\d{2})[:分 ]?$/,
		mailbox : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		url : /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=% :\/~+#]*[\w\-\@?^=% \/~+#])?$/,
		idcard : /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/,
		phone : /^1[3|4|5|7|8|9]\d{9}$/,
		tel : /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
		chinese : /^[\u4e00-\u9fa5]+$/,
		chinese_or_english : /^[\u4e00-\u9fa5a-zA-Z]+$/,
		english : /^[a-zA-Z]+$/,
		english_or_number : /^[\a-zA-Z0-9]+$/,
		english_or_number_or_underline : /^[_a-zA-Z0-9]+$/,
		english_or_number_or_underline_or_slash : /^[_a-zA-Z0-9/]+$/,
		english_or_number_or_underline_or_point : /^[_a-zA-Z0-9.]+$/,
		has_symbol : /[)(?=.*~!@#$%^&*'"}{\]\[\\]+/
	};
})();
(function() {
	co.init.bind(function() {
		co.cover.init();
	});
	co.cover = new Object();
	co.cover.config = {
		model : {
			cover : " <div class='coos-cover-window' ></div>",
			loading : "  <div class='coos-cover-loading-window'  ><div class='coos-cover-mask' >" +

			"<div class='coos-cover-loading-image'></div><div class='coos-cover-mask-font'>Loading</div>"

			+ "</div></div>",
			uploading : "  <div class='coos-cover-uploading-window'  ><div class='coos-cover-mask' >" +

			"<div class='coos-cover-uploading-image'></div><div class='coos-cover-mask-font'>Uploading</div>"

			+ "</div></div>"
		}
	};

	co.cover.model = {};

	co.cover.option = function(config) {

	};

	co.cover.init = function() {
		if (co.cover.model.cover == null) {
			co.cover.model.cover = $(co.cover.config.model.cover);
			co.cover.model.cover.hide();
			co.cover.model.loading = $(co.cover.config.model.loading);

			co.cover.model.loading.hide();
			co.cover.model.uploading = $(co.cover.config.model.uploading);

			co.cover.model.uploading.hide();

			var $head = $($('head').get(0));

			$head.before(co.cover.model.cover);
			$head.before(co.cover.model.loading);
			$head.before(co.cover.model.uploading);
		}

	}

	co.cover.showLoadingIndex = 0;
	co.cover.showUploadingIndex = 0;
	co.cover.showCoverIndex = 0;
	co.cover.show = function(config) {
		co.cover.init();
		co.cover.showCoverIndex++;
		window.setTimeout(function() {
			co.cover.model.cover.css('display', 'block');
		}, 0);
	};

	co.cover.hide = function(place) {
		co.cover.init();
		co.cover.showCoverIndex--;
		if (co.cover.showCoverIndex == 0) {
			window.setTimeout(function() {
				co.cover.model.cover.css('display', 'none');
			}, 0);
		}
	};

	co.cover.showLoading = function(config) {
		config = config || {};
		co.cover.show(config);
		co.cover.showLoadingIndex++;
		co.cover.model.loading.css('display', 'block');
	};

	co.cover.hideLoading = function(config) {
		co.cover.showLoadingIndex--;
		if (co.cover.showLoadingIndex == 0) {
			window.setTimeout(function() {
				co.cover.hide(config);
				co.cover.model.loading.css('display', 'none');
			}, 200);
		} else {
			co.cover.hide(config);
		}
	};

	co.cover.showUploading = function(config) {
		co.cover.show(config);
		co.cover.showUploadingIndex++;
		co.cover.model.uploading.css('display', 'block');
	};

	co.cover.hideUploading = function(config) {
		co.cover.showUploadingIndex--;
		if (co.cover.showUploadingIndex == 0) {
			window.setTimeout(function() {
				co.cover.hide(config);
				co.cover.model.uploading.css('display', 'none');
			}, 200);
		} else {
			co.cover.hide(config);
		}
	};
})();
(function() {
	co.date = new Object();
	co.date.trim = function(datetime) {
		var value = datetime || "";
		if (!co.isEmpty(value)) {
			value = value.replace(/-/g, '');
			value = value.replace(/:/g, '');
			value = value.replace(/ /g, '');
			value = value.replace(/\//g, '');
			if (value.length == 4) {
				value = value.substring(0, 2) + ':' + value.substring(2, 4);
			} else if (value.length == 8) {
				value = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
			} else if (value.length >= 12) {
				value = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8) + ' ' + value.substring(8, 10) + ':' + value.substring(10, 12);
			}
		}
		return value;
	};
	co.date.format = function(date, format) {
		format = format || "yyyy-MM-dd hh:mm:ss";
		var o = {
			"M+" : date.getMonth() + 1, // month
			"d+" : date.getDate(), // day
			"h+" : date.getHours(), // hour
			"m+" : date.getMinutes(), // minute
			"s+" : date.getSeconds(), // second
			"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
			"S" : date.getMilliseconds()
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	};

	co.date.formatDatetime = function(datetime) {
		var value = datetime || "";
		if (!co.isEmpty(value)) {
			value = value.replace(/-/g, '');
			value = value.replace(/:/g, '');
			value = value.replace(/ /g, '');
			value = value.replace(/\//g, '');
			if (value.length == 4) {
				value = value.substring(0, 2) + ':' + value.substring(2, 4);
			} else if (value.length == 8) {
				value = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
			} else if (value.length >= 12) {
				value = value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8) + ' ' + value.substring(8, 10) + ':' + value.substring(10, 12);
			}
		}
		return value;
	}
})();
(function() {
	co.plugin = new Object();

	co.init.bind(function() {
		if (!co.isEmpty(config.pluginsPath)) {
			var pluginsPath = config.pluginsPath;
			for ( var name in co.plugin.plugins) {
				var data = co.plugin.plugins[name];
				var css = data.css;
				var js = data.js;
				$(css).each(function(index, path) {
					css[index] = pluginsPath + "/" + path;
				});
				$(js).each(function(index, path) {
					js[index] = pluginsPath + "/" + path;
				});
				if (!co.isEmpty(data.themesPath)) {
					data.themesPath = pluginsPath + "/" + data.themesPath;
				}
			}
		}
	});

	co.plugin.plugins = {
		bootstrap_slider : {
			js : [ "resource/plugins/bootstrap/slider/bootstrap-slider.js" ],
			css : [ "resource/plugins/bootstrap/slider/bootstrap-slider.css" ]
		},
		bootstrap_switch : {
			js : [ "resource/plugins/bootstrap/switch/bootstrap-switch.min.js" ],
			css : [ "resource/plugins/bootstrap/switch/bootstrap-switch.css" ]
		},
		data_tables : {
			js : [ "resource/plugins/jquery/datatables/jquery.datatables.min.js", "resource/plugins/jquery/datatables/datatables.bootstrap.js" ],
			css : [ "resource/plugins/jquery/datatables/css/datatables.bootstrap.css", "resource/plugins/jquery/datatables/css/jquery.datatables.css" ]
		},
		tags_input : {
			js : [ "resource/plugins/jquery/tagsinput/jquery.tagsinput.min.js" ],
			css : [ "resource/plugins/jquery/tagsinput/jquery.tagsinput.css" ]
		},
		colorpicker : {
			js : [ "resource/plugins/colorpicker/js/colorpicker.js" ],
			css : [ "resource/plugins/colorpicker/css/colorpicker.css" ]
		},
		mobiscroll : {
			js : [ "resource/plugins/mobiscroll/js/mobiscroll.custom-2.5.2.min.js" ],
			css : [ "resource/plugins/mobiscroll/css/mobiscroll.custom-2.5.2.min.css" ]
		},
		jquery_datetimepicker : {
			js : [ "resource/plugins/jquery/datetimepicker/jquery.datetimepicker.js" ],
			css : [ "resource/plugins/jquery/datetimepicker/jquery.datetimepicker.css" ]
		},
		jquery_ui_effects : {
			js : [ "resource/plugins/jquery/ui/effects/jquery-ui.min.js" ],
			css : [ "resource/plugins/jquery/ui/effects/jquery-ui.min.css", "resource/plugins/jquery/ui/widgets/jquery-ui.theme.min.css" ]
		},
		jquery_ui_interactions : {
			js : [ "resource/plugins/jquery/ui/interactions/jquery-ui.min.js" ],
			css : [ "resource/plugins/jquery/ui/interactions/jquery-ui.min.css", "resource/plugins/jquery/ui/widgets/jquery-ui.theme.min.css" ]
		},
		jquery_sortable : {
			js : [ "resource/plugins/jquery/ui/interactions/jquery-ui.min.js" ],
			css : [ "resource/plugins/jquery/ui/interactions/jquery-ui.min.css", "resource/plugins/jquery/ui/widgets/jquery-ui.theme.min.css" ]
		},
		draggabilly : {
			js : [ "resource/plugins/draggabilly/draggabilly.pkgd.js" ],
			css : []
		},
		jquery_ui_widgets : {
			js : [ "resource/plugins/jquery/ui/widgets/jquery-ui.min.js" ],
			css : [ "resource/plugins/jquery/ui/widgets/jquery-ui.min.css", "resource/plugins/jquery/ui/widgets/jquery-ui.theme.min.css" ]
		},
		kindeditor : {
			js : [ "resource/plugins/kindeditor/kindeditor.js", "resource/plugins/kindeditor/lang/zh_CN.js", "resource/plugins/kindeditor/plugins/code/prettify.js" ],
			css : [ "resource/plugins/kindeditor/themes/default/default.css", "resource/plugins/kindeditor/plugins/code/prettify.css" ],
			themesPath : "resource/plugins/kindeditor/themes/"
		},
		codemirror : {
			js : [ "resource/plugins/codemirror/codemirror.js", "resource/plugins/codemirror/mode/css/css.js", "resource/plugins/codemirror/mode/xml/xml.js",
					"resource/plugins/codemirror/mode/javascript/javascript.js", "resource/plugins/codemirror/mode/htmlmixed/htmlmixed.js" ],
			css : [ "resource/plugins/codemirror/codemirror.css", "resource/plugins/codemirror/theme/zenburn.css" ]
		},
		emmet : {
			js : [ "resource/plugins/emmet/emmet.js" ],
			css : []
		},
		vue : {
			js : [ "resource/plugins/vue/2.4.2/vue.min.js" ],
			css : []
		},
		chartist : {
			js : [ "resource/plugins/chartist/chartist.min.js" ],
			css : [ "resource/plugins/chartist/chartist.min.css" ]
		},
		loaders : {
			js : [],
			css : [ "resource/plugins/loaders/loaders.min.css" ]
		},
		flot : {
			js : [ "resource/plugins/flot/jquery.flot.js" ],
			css : []
		},
		flot_pie : {
			js : [ "resource/plugins/flot/jquery.flot.js", "resource/plugins/flot/jquery.flot.pie.js" ],
			css : []
		}
	};

	co.plugin.add = function(plugin) {
		if (!co.isObject(plugin)) {
			throw new Error("插件格式为{plugin_name: {css: [], js: []}}");
		}
		for ( var name in plugin) {
			co.plugin.plugins[name] = plugin[name];
		}
	};

	co.plugin.loadedPlugins = {};
	co.plugin.loadingPlugins = {};
	co.plugin.loadingPluginsCallbacks = {};
	var loadedPlugins = {};
	var loadingPlugins = {};
	var loadingPluginsCallbacks = {};
	var loadCSSS = {};
	co.plugin.load_ = function(pluginname, callback) {
		if (co.plugin.loadedPlugins[pluginname]) {
			callback && callback();
			return;
		}
		var plugin = co.plugin.plugins[pluginname]; // 获取对应的json
		if (plugin == null) {
			throw new Error(pluginname + ' is not defined');
		}
		var callbacks = co.plugin.loadingPluginsCallbacks[pluginname];
		callbacks = callbacks || [];
		callbacks[callbacks.length] = callback;
		if (co.plugin.loadingPlugins[pluginname]) {
			return;
		}
		co.plugin.loadingPlugins[pluginname] = true;
		co.plugin.loadingPluginsCallbacks[pluginname] = callbacks;
		var jss = plugin.js; // 获取js
		var csss = plugin.css; // 获取css
		var head = document.getElementsByTagName('head')[0];
		// 加载csss数组
		$.each(csss, function(index, css) {
			// 如果此css已加载，创建下个css
			if (loadCSSS[css] == true) {
				return true;
			}
			var link = document.createElement('link');
			head.appendChild(link);
			loadCSSS[css] = true;
			link.type = 'text/css';
			link.rel = 'styleSheet';
			if (css.indexOf("http") == 0) {
				link.href = css;
			} else {
				link.href = basePath + css;
			}

		}); // csss each

		// 加载jss数组
		var jsloadsucessindex = 0; // js坐标
		co.resource.load.js(jss, function() {
			co.plugin.loadedPlugins[pluginname] = true;
			co.plugin.loadingPlugins[pluginname] = false;
			var callbacks = co.plugin.loadingPluginsCallbacks[pluginname];
			co.plugin.loadingPluginsCallbacks[pluginname] = [];
			$.each(callbacks, function(callbackindex, plugincallback) {
				plugincallback && plugincallback(); // 调用回调
			});
		});
	};

	co.plugin.load = function(pluginname, callback) {
		var names = [ pluginname ];
		if (co.isArray(pluginname)) {
			names = pluginname;
		}
		// 遍历插件数组
		var count = names.length;
		var loadedcount = 0;
		function loadCallback() {
			loadedcount++;
			if (loadedcount >= count) {
				callback && callback();
			}
		}
		$.each(names, function(index, name) {
			// 首先判断是否已经加载过
			co.plugin.load_(name, loadCallback);
		})
	};
})();
(function() {
	co.POST = function(action, data, type, callback, arg1, arg2) {
		var async = arg1;
		var config = arg2;
		if (arg1 != null) {
			if (!coos.isString(arg1) && !coos.isBoolean(arg1)) {
				async = null;
				config = arg1;
			}
		}
		config = config || {};
		var showLoading = co.isEmpty(config.showLoading) ? true : config.showLoading;
		if (showLoading) {
			co.cover.showLoading();
		}
		var url = co.url.format(action);
		var data = data || {};
		var type = type || "json";
		if (typeof (async) == 'undefinde' || async == null) {
			async = true;
		} else {
			if (!co.isBoolean(async)) {
				if (async == 'true') {
					async = true;
				} else {
					async = false;
				}
			}
		}
		var headers = null;
		if (co.isString(data)) {
			headers = {
				'Content-Type' : 'application/json'
			};
		}
		$.ajax({
			url : url,
			data : data,
			type : 'post',
			dataType : type,
			async : async,// 异步请求
			headers : headers,
			beforeSend : function() {
			},
			success : function(o) {
				// 可添加完成后处理
				if (showLoading) {
					co.cover.hideLoading();
				}
				var html = o;
				if (!co.page.validate(html, url)) {
					return;
				}
				if (async) {
					if (callback && $.isFunction(callback)) {
						callback(o);
						co.element.init();
					}
				} else {

					if (callback && $.isFunction(callback)) {
						callback(o);
						co.element.init();
					}
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if (config.error) {
					config.error(XMLHttpRequest, textStatus, errorThrown);
				} else {
					if (showLoading) {
						co.cover.hideLoading();
					}
					var status = XMLHttpRequest.status;
					if (!co.isEmpty(status)) {
						if (status >= 500) {
							co.box.alert(url + " " + status + " Error!");
							return;
						}
						if (status >= 400) {
							co.box.alert(url + " " + status + " Error!");
							return;
						}
					}
					if (!co.page.validate(XMLHttpRequest.responseText, url)) {
						return;
					}
				}
			}
		});
	};
	/** url跳转 */
	co.toUrl = function(action, data) {
		var action = co.url.getFullData(action, data);// 组合参数
		var url = co.url.format(action);
		window.location.href = url;
	};
	/** url跳转 */
	co.openUrl = function(action, data) {
		var action = co.url.getFullData(action, data);// 组合参数
		var url = co.url.format(action);
		window.open(url);
	};

	co.doAction = function(config) {
		var action = config.action;
		var data = config.data;
		var callback = config.callback;
		co.POST(action, data, 'json', function(o) {
			if (callback) {
				callback(o);
			}
		});
	}

	/** get提交 */
	co.toAction = function(config) {
		var action = config.action;
		var data = config.data;
		if (config.opennewwindow) {
			co.openUrl(action, data);
			return;
		}
		if ((data && data.$outFile) || action.indexOf('$outFile=true') > 0) {
			data = data || {};
			co.toUrl(action, data);
			return;
		}
		if (action.indexOf('http') != -1) {
			co.toUrl(action, data);
			return;
		} else {

		}
		var toLoginAction = co.config.action['toLogin'];
		if (toLoginAction.indexOf('/') != 0) {
			toLoginAction = "/" + toLoginAction;
		}
		if (action.indexOf('/') != 0) {
			action = "/" + action;
		}
		if (action == toLoginAction) {
			co.toUrl(action, data);
			return;
		}
		var action = co.url.getFullData(action, data);// 组合参数
		if (action.indexOf(co.config.action.toLogin.replace(/^\//g, "")) < 0) {
			window['istoaction'] = true;
			if (config.callback) {
				co.page.load(config);
			} else {
				if (co.isFunction(window.history.pushState) && co.page.config.single) {

					var url = coos.url.format(action);
					var state = {
					// title: "title",
					// url: url,
					// otherkey: othervalue
					};
					window.history.pushState(state, document.title, url);
					co.page.toSinglePage(action);
				} else {
					co.toUrl(action, data);
				}
			}
		} else {
			window['istoaction'] = true;
			co.page.load(config);
		}
	};

	co.reload = function() {
		if (co.page.config.single) {
			var action = co.url.getCurrentAction();
			var data = co.url.getData();
			var config = {};
			config.action = action;
			config.data = data;
			co.toAction(config);
		} else {
			window.location.reload();
		}
	};
})();
// 是否包含字符串
String.prototype.has = function(arg1) {
	var value = this.valueOf();
	if (co.isEmpty(value) || co.isEmpty(arg1)) {
		return false;
	}
	if (value.indexOf(arg1) != -1) {
		return true;
	}
	return false;
};

String.prototype.replaceAll = function(arg1, arg2) {
	var value = this.valueOf();
	if (co.isEmpty(value) || co.isEmpty(arg1)) {
		return value;
	}
	return ("" + value).replace(eval(arg1 + "g"), arg2);
};

(function() {
	co.resource.load = new Object();
	co.resource.load.loaded = {};
	co.resource.load.js = function(path, callback) {
		var paths = [ path ];
		if (co.isArray(path)) {
			paths = path;
		}
		var allLoad = true;
		$(paths).each(function(index, path) {
			if (co.resource.load.loaded[path]) {
			} else {
				allLoad = false;
			}
		})
		if (allLoad) {
			if (callback) {
				callback();
			}
			return;
		}
		function load(index) {
			if (index >= (paths.length)) {
				if (callback) {
					callback();
				}
				return;
			}
			var path = paths[index];
			var url = co.url.format(path);
			if (co.resource.load.loaded[path]) {
				load(index + 1);
				return;
			}
			var head = document.getElementsByTagName('head')[0], script = document.createElement('script');
			head.appendChild(script);
			script.src = url;
			script.charset = 'utf-8';
			script.onload = script.onreadystatechange = function() {
				if (!this.readyState || this.readyState === 'loaded') {
					script.onload = script.onreadystatechange = null;
					if ($('[src="' + url + '"]').length > 1) {
						head.removeChild(script);
					}
					co.resource.load.loaded[path] = true;
					load(index + 1);
				}
			};
		}
		load(0);
	};
	co.resource.load.css = function(path, callback) {
		var paths = [ path ];
		if (coos.isArray(path)) {
			paths = path;
		}
		var allLoad = true;
		$(paths).each(function(index, path) {
			if (co.resource.load.loaded[path]) {
			} else {
				allLoad = false;
			}
		})
		if (allLoad) {
			if (callback) {
				callback();
			}
			return;
		}
		var length = 0;
		$(paths).each(function(index, path) {
			co.resource.load.loaded[path] = true;
			var url = co.url.format(path);
			$('[coos-main]').before("<link href='" + url + "' rel='stylesheet' type='text/css'>");
			length++;
			if (length == paths.length) {
				if (callback) {
					callback();
				}
			}
		});
	};
	
})();
(function() {
	co.executeService = function(config) {

		var name = config.name;
		var id = config.id;
		var data = config.data;
		var async = config.async;
		data = data == null ? {} : data;
		var callback = config.callback;
		co.cover.showLoading();

		var headers = null;
		if (co.isString(data)) {
			headers = {
				'Content-Type' : 'application/json'
			};
		}
		var url = null;
		if (!co.isEmpty(id)) {
			url = "/core/service/ID-" + id + ".service";
		}
		if (!co.isEmpty(name)) {
			url = "/core/service/" + name + ".service";
		}
		$.ajax({
			url : co.url.format(url),
			data : data,
			type : 'post',
			dataType : 'json',
			async : async, // 取消异步请求
			headers : headers,
			beforeSend : function() {
			},
			success : function(o) {
				// 可添加完成后处理
				co.cover.hideLoading();
				if (callback && $.isFunction(callback)) {
					callback(o);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				co.cover.hideLoading();
				callback(XMLHttpRequest.responseText);
			}

		});
	};
})();
(function() {
	var uploadBindIndex = 0;
	co.upload = new Object();
	co.upload.bind = function(config) {
		var button = $(config.button);
		var callback = config.callback;
		var url = config.url || co.config.action.doUpload;
		var progressUrl = config.progressUrl || co.config.action.uploadProgress;
		url = co.url.format(url);
		button.find('.coos-button-upload-form-div').remove();
		uploadBindIndex++;
		var maxfilelength = config.maxfilelength || button.attr('maxfilelength');
		var inputid = "coos-file-upload-input-" + uploadBindIndex;

		var formDiv = $('<span class="coos-button-upload-form-div" style="position: absolute;left: 0px;top: 0px;width: 100%;height: 100%;padding: 0px;margin: 0px;overflow: hidden;"/>');

		button.prepend(formDiv);

		button.css('position', 'relative');
		var filename = "";
		var filetype = button.attr('file-type');
		function refreshUpload() {
			bindFileInput();
		}
		var uploadid = co.getNumber();
		var fileUploaded = false;
		var fileuploadaction = "";
		function bindFileInput() {
			fileUploaded = false;
			uploadid = co.getNumber();
			var action = url;
			if (!action.has("?")) {
				action += "?";
			}
			action += "&uploadid=" + uploadid;
			if (maxfilelength) {
				action += "&maxfilelength=" + maxfilelength;
			}
			fileuploadaction = action;
			var input = $('<input id="'
					+ inputid
					+ '" style="position: absolute;z-index: 1;left: 0px;width: 100%;height: 100%;padding: 0px;margin: 0px;font-size: 100000px;opacity: 0.0;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);cursor: pointer;" class="coos-file-upload-input" name="file"  type="file" />');
			if (!co.isIE()) {
				input.css('border', '1000px solid gray');
			}
			formDiv.empty();
			formDiv.append(input);
			input.change(function() {
				var filePath = this.value;
				if(co.isEmpty(filePath)){
					return;
				}
				var fileSize = null;
				if (this.files && this.files.length > 0) {
					var f = this.files[0];
					if (f.size) {
						fileSize = f.size;
					} else if (f.fileSize) {
						fileSize = f.fileSize;
					}
				}
				if (filetype != null && filetype != '') {
					if (filetype == 'image') {
						if (!co.isImage(filePath)) {
							co.box.info(co.config.error.isNotImageFile.info);
							refreshUpload();
							return;
						}
					} else if (filetype == 'audio') {
						if (!co.isAudio(filePath)) {
							co.box.info(co.config.error.isNotAudioFile.info);
							refreshUpload();
							return;
						}
					} else if (filetype == 'video') {
						if (!co.isVideo(filePath)) {
							co.box.info(co.config.error.isNotVideoFile.info);
							refreshUpload();
							return;
						}
					} else {

						var filetypes = filetype.split(',');
						var success = false;
						for (var m = 0; m < filetypes.length; m++) {
							if (co.isOtherFile(filePath, filetypes[m])) {
								success = true;
								break;
							}
						}
						if (!success) {
							var infoStr = co.config.error.isNotOtherFile.info;
							infoStr = infoStr.replace(/\$filetype/g, filetype)
							co.box.info(infoStr);
							refreshUpload();
							return;
						}
					}
				}
				if (fileSize != null && fileSize > (maxfilelength * 1024 * 1024)) {
					var infoStr = co.config.error.isToLongFile.info;
					infoStr = infoStr.replace(/\$maxfilelength/g, maxfilelength)
					co.box.info(infoStr);
					refreshUpload();
					return;
				}
				coos.cover.showUploading();
				co.ajaxFileUpload({
					url : fileuploadaction, // 用于文件上传的服务器端请求地址
					secureuri : false, // 一般设置为false
					fileElementId : inputid, // 文件上传控件的id属性 <input
					// type="file" id="file"
					// name="file" /> 注意，这里一定要有name值
					// $("form").serialize(),表单序列化。指把所有元素的ID，NAME 等全部发过去
					dataType : 'json',// 返回值类型 一般设置为json
					complete : function() {// 只要完成即执行，最后执行
					},
					success : function(data, status) // 服务器成功响应处理函数
					{
						if (data.code == 0) {
							var files = data.value;
							if (callback != null) {
								callback(files, data);
							}
						} else {
							if (data.code == co.config.error.isToLongFile.code) {

								var infoStr = co.config.error.isToLongFile.info;
								infoStr = infoStr.replace(/\$maxfilelength/g, maxfilelength);
								co.box.info(infoStr);
							} else {
								co.box.info(data.message);
								refreshUpload();
							}
						}

						if (co.config.openUploadProgress) {
							fileUploaded = true;
						} else {

							co.cover.hideUploading({
								place : 'file upload'
							});
							refreshUpload();
						}
					},
					error : function(data, status, e)// 服务器响应失败处理函数
					{
						co.cover.hideUploading({
							place : 'file upload'
						});
						co.box.info("upload file " + status);
						fileUploaded = true;
						throw e;
					}
				});
				if (co.config.openUploadProgress) {
					uploadProgress();
					co.cover.model.uploading.find('.coos-upload-progress-div').show();
					co.cover.model.uploading.find('.coos-upload-text').css('margin-top', '20px');
				} else {

					co.cover.model.uploading.find('.coos-upload-progress-div').hide();
					co.cover.model.uploading.find('.coos-upload-text').css('margin-top', '0px');
				}

			});
		}
		var uploadProgress = function() {
			var data = {};
			data.uploadid = uploadid;
			co.POST(progressUrl, data, 'json', function(o) {
				co.cover.model.uploading.find('.coos-upload-progress').css('width', (o * 100) + '%');
				if (fileUploaded) {
					refreshUpload();
					co.cover.model.uploading.find('.coos-upload-progress').css('width', '100%');
					co.cover.hideUploading({
						place : 'file upload'
					});
				} else {
					window.setTimeout(function() {
						uploadProgress();
					}, 50);
				}
			}, true, {
				showLoading : false
			});
		};
		bindFileInput();

	};
})();
(function() {
	co.url = new Object();
	co.url.formatImageUrls = function(path) {
		var urls = [];
		if (co.isEmpty(path)) {
			urls[urls.length] = co.resource.images.noimg;
		} else {
			var paths = [ path ];
			if (path.indexOf(co.input.file.divider) > 0) {
				paths = path.split(co.input.file.divider);
			}
			$(paths).each(function(index, p) {
				if (!co.isEmpty(p)) {
					if (p.indexOf('http:') == 0 || p.indexOf('https:') == 0 || p.indexOf('ftp:') == 0 || p.indexOf('file:') == 0) {
					} else {
						p = co.config.server.fileServerUrl + p;
					}
					urls[urls.length] = p;
				}
			});
		}
		return urls;
	};

	co.url.format = function(path) {
		if (co.isEmpty(path)) {
			return;
		}
		if (path.indexOf('http') >= 0) {
			return path;
		}

		path = path.replace(/^\/+/g, "/");
		if (path.indexOf('/') == 0) {
			if (basePath.lastIndexOf('/') == basePath.length - 1) {
				path = path.replace(/^\/+/g, "");
			}
		} else {
			if (basePath.lastIndexOf('/') == basePath.length - 1) {
			} else {
				path = "/" + path;
			}
		}
		var url = basePath + path;
		return url;
	};
	co.url.getCurrentUrl = function() {
		var action = '';
		var hash = '' + window.location.hash;
		hash = decodeURIComponent(hash);

		var url = window.location.href;
		var port = window.location.port;
		var hostname = window.location.hostname;
		if (basePath.indexOf('http') >= 0) {
			action = url.split(basePath)[1];
		} else {
			if (port && port != null && port > 0) {
				action = url.split(hostname + ':' + port + basePath)[1];
			} else {
				action = url.split(hostname + basePath)[1];
			}
		}
		if (action == null || action.length < 1 || action == '/') {
			action = co.config.action.toIndex;
		}
		return co.url.format(action);
	};
	co.url.getCurrentAction = function() {
		var action = '';
		var hash = '' + window.location.hash;
		hash = decodeURIComponent(hash);
		var url = window.location.href;
		var port = window.location.port;
		var hostname = window.location.hostname;
		if (basePath.indexOf('http') >= 0) {
			action = url.split(basePath)[1];
		} else {
			if (port && port != null && port > 0) {
				action = url.split(hostname + ':' + port + basePath)[1];
			} else {
				action = url.split(hostname + basePath)[1];
			}
		}
		if (action == null || action.length < 1 || action == '/') {
			action = co.config.action.toIndex;
		}
		if (action.indexOf('?') > 0) {
			action = action.split("?")[0];
		}
		if (action.indexOf('/') != 0) {
			action = "/" + action;
		}
		action = action.replace(/\/+/g, "/");
		if (action.indexOf('#') >= 0) {
			action = action.split('#')[0];
		}
		return (action);
	};

	co.url.getData = function(url) {
		var data = {};
		url = url || co.url.getCurrentUrl();
		if (url.indexOf('?') > 0) {
			var toActions = url.split('?');
			var datastr = toActions[1];
			if (!co.isEmpty(datastr)) {
				var datas = datastr.split('&');
				for (var i = 0; i < datas.length; i++) {
					if (!co.isEmpty(datas[i])) {
						if (datas[i].indexOf('=') > 0) {
							var n = datas[i].split('=')[0];
							var v = datas[i].split('=')[1];
							v = v == null ? "" : v;
							if (data[n] == null) {
								data[n] = v;
							}
						} else {

							data[datas[i]] = "";
						}
					}
				}
			}
		}
		return data;
	};
	co.url.getFullData = function(action, data) {
		action = action.replace(/^\/+/g, "/");
		if (data) {
			for ( var n in data) {
				if (action.indexOf('?') < 0) {
					action = action + '?';
				}
				action += '&' + n + '=' + data[n];
			}
		}
		return action;
	};
})();
(function() {

	co.box = co.box || {};

	co.box.error = function(arg1) {

	};
	co.box.html = {};
	co.box.html.info = "<div class='coos-box coos-box-info text-center'>" + "	<div class='coos-box-content'>" + "		<div class='coos-box-cover'></div>" + "		<div class='coos-box-center'>"
			+ "			<div class='coos-box-info'></div>" + "		</div>" + "	</div>" + "</div>";
	co.box.html.alert = "<div class='coos-box text-center'>" + "	<div class='coos-box-content'>" + "		<div class='coos-box-cover'></div>" + "		<div class='coos-box-header'>"
			+ "			<div class='coos-box-close coos-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"coos-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='coos-box-center'>"
			+ "			<div class='coos-box-info'></div>" + "		</div>" + "		<div class='coos-box-footer'>" + "			<a type=\"button\" class=\" coos-btn coos-box-button coos-box-define\">确定</a>" + "		</div>"
			+ "	</div>" + "</div>";
	co.box.html.confirm = "<div class='coos-box text-center'>" + "	<div class='coos-box-content'>" + "		<div class='coos-box-cover'></div>" + "		<div class='coos-box-header'>"
			+ "			<div class='coos-box-close coos-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"coos-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='coos-box-center'>"
			+ "			<div class='coos-box-info'></div>" + "		</div>" + "		<div class='coos-box-footer'>" + "			<a type=\"button\" class=\"coos-btn coos-box-button coos-box-define\">确定</a>"
			+ "			<a type=\"button\" class=\"coos-btn coos-box-button coos-box-cancel\">取消</a>" + "		</div>" + "	</div>" + "</div>";
	co.box.html.other = "<div class='coos-box'>" + "	<div class='coos-box-content'>" + "		<div class='coos-box-cover'></div>" + "		<div class='coos-box-header'>"
			+ "			<div class='coos-box-close coos-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"coos-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='coos-box-center'>"
			+ "			<div class='coos-box-info'></div>" + "		</div>" + "		<div class='coos-box-footer'>" + "			<a type=\"button\" class=\"coos-btn coos-box-button coos-box-cancel\">取消</a>" + "		</div>"
			+ "	</div>" + "</div>";
	co.box.html.window = "<div class='coos-box coos-box-window '>" + "	<div class='coos-box-content'>" + "		<div class='coos-box-cover'></div>" + "		<div class='coos-box-header'>"
			+ "			<div class='coos-box-close coos-box-cancel'><div class='fa fa-remove'></div></div>" + "			<h4 class=\"coos-box-title\" >提示信息</h4>" + "		</div>" + "		<div class='coos-box-center'>"
			+ "		</div>" + "		<div class='coos-box-footer'>" + "			<a type=\"button\" class=\"coos-btn coos-box-button coos-box-cancel\">取消</a>" + "		</div>" + "	</div>" + "</div>";
	co.box.info = function(arg1) {
		var w = co.getWidth();
		var h = co.getHeight();
		var $model = $(co.box.html.info);
		$('body').append($model);
		var t = (h - 50) / 2 - 50;
		$model.find('.coos-box-content').css("top", t);
		$model.find('.coos-box-info').html(arg1);
		$model.fadeIn();
		window.setTimeout(function() {
			$model.fadeOut();
			window.setTimeout(function() {
				$model.remove();
			}, 100);
		}, 800);
	};
	co.box.alert = function(arg1, arg2, arg3) {
		var w = co.getWidth();
		var h = co.getHeight();
		var $model = $(co.box.html.alert);
		$model.find('.coos-box-title').text(co.config.label.alertBoxTitle);
		$model.find('.coos-box-footer .coos-box-define').text(co.config.label.define);
		$model.find('.coos-box-footer .coos-box-cancel').text(co.config.label.cancel);
		$('body').append($model);
		var t = (h - 50) / 2 - 120;
		$model.find('.coos-box-content').css("top", t);
		$model.find('.coos-box-info').html(arg1);
		if (arg3) {
			$model.find('.coos-box-title').html(arg3);
		}
		$model.fadeIn();
		$model.find('.coos-box-define').click(function() {
			$model.remove();
			arg2 && arg2();
		});
		$model.find('.coos-box-cancel').click(function() {
			$model.remove();
			arg2 && arg2();
		});
	};
	co.box.confirm = function(arg1, arg2, arg3, arg4) {
		var w = co.getWidth();
		var h = co.getHeight();
		var $model = $(co.box.html.confirm);
		$('body').append($model);
		var t = (h - 50) / 2 - 120;
		$model.find('.coos-box-title').text(co.config.label.confirmBoxTitle);
		$model.find('.coos-box-footer .coos-box-define').text(co.config.label.define);
		$model.find('.coos-box-footer .coos-box-cancel').text(co.config.label.cancel);
		$model.find('.coos-box-content').css("top", t);
		$model.find('.coos-box-info').html(arg1);
		if (arg4) {
			$model.find('.coos-box-title').html(arg4);
		}
		$model.fadeIn();
		$model.find('.coos-box-define').click(function() {
			$model.remove();
			arg2 && arg2();
		});
		$model.find('.coos-box-cancel').click(function() {
			$model.remove();
			arg3 && arg3();
		});
	};
	co.box.other = function(arg1, arg2, arg3, arg4) {
		var w = co.getWidth();
		var h = co.getHeight();
		var $model = $(co.box.html.other);
		$('body').append($model);
		var t = (h - 50) / 2 - 120;
		$model.find('.coos-box-title').text(co.config.label.title);
		$model.find('.coos-box-footer .coos-box-define').text(co.config.label.define);
		$model.find('.coos-box-footer .coos-box-cancel').text(co.config.label.cancel);
		$model.find('.coos-box-content').css("top", t);
		$model.find('.coos-box-info').html(arg1);
		if (arg4) {
			$model.find('.coos-box-title').html(arg4);
		}
		$model.fadeIn();
		$model.find('.coos-box-cancel').click(function() {
			$model.remove();
			arg2 && arg2();
		});
		$(arg3).each(function(index, button) {
			var $button = $("<button type=\"button\" class=\"coos-btn coos-box-button \">" + button.label + "</button>");
			$button.attr('style', button.style);
			$model.find('.coos-box-footer .coos-box-cancel').before($button);
			$button.click(function() {
				$model.remove();
				button.callback && button.callback();
			});
		});
	};

})();
(function() {
	var BaseWindow = function(config) {
		this.config = config;
		this.init();
		return this;
	}
	BaseWindow.prototype.init = function() {
		// 标题
		this.title = this.config.title;
		// 内容代码
		this.html = this.config.html;
		// 按钮
		this.buttons = this.config.buttons;
		// 关闭回调
		this.cancelCallback = this.config.cancelCallback;
		// 用户自定义宽高
		this.width = this.config.width;
		this.height = this.config.height;
		this.build();
	};

	BaseWindow.prototype.build = function() {
		this.$model = $(co.box.html.window);
		this.$model.find('.coos-box-title').text(co.config.label.title);
		this.$model.find('.coos-box-footer .coos-box-define').text(co.config.label.define);
		this.$model.find('.coos-box-footer .coos-box-cancel').text(co.config.label.cancel);
		this.$content = $(this.html);
		this.$model.find('.coos-box-center').append(this.$content);
		if (this.title) {
			this.$model.find('.coos-box-title').text(this.title);
		}
		if (this.width) {
			this.$model.find('.coos-box-content').css("width", this.width);
		}
		if (this.height) {
			this.$model.find('.coos-box-content').css("height", this.height);
		}
		this.$model.hide();
		var this_ = this;
		var $keyDownButton = null;
		$(this.buttons).each(function(index, button) {
			var $button = $("<a type=\"button\" class=\"coos-btn coos-box-button \">" + button.label + "</a>");
			if (button.html) {
				$button = $(button.html);
				$button.addClass('coos-box-button');
			}
			if (!co.isEmpty(button.className)) {
				$button.addClass(button.className);
			}
			if (button.bindEnterKey) {
				$keyDownButton = $button;
			}
			$button.attr('style', button.style);
			this_.$model.find('.coos-box-footer .coos-box-cancel').before($button);
			$button.click(function() {
				button.callback && button.callback();
			});
		});

		this.$model.attr('tabindex', 1).on('keydown', function(event) {
			var target, code, tag;
			if (!event) {
				event = window.event;
				target = event.srcElement;
				code = event.keyCode;
			} else {
				target = event.target;
				code = event.keyCode;
			}
			if (code == 13) {
				tag = target.tagName;
				if (tag != "TEXTAREA") {
					if ($keyDownButton != null) {
						$keyDownButton.click();
						return false;
					}
				} else {
					return true;
				}
			}
		});
		$('body').append(this.$model);
	};
	BaseWindow.prototype.initLine = function() {
		if (this.config.showLine) {
			var width = this.$model.find('>.coos-box-content').width();
			var height = this.$model.find('>.coos-box-content').height();
			var startX = this.$model.find('>.coos-box-content').offset().left;
			var startY = this.$model.find('>.coos-box-content').offset().top;
			startX = startX - 2;
			startY = startY - 2;
			width = width + 4;
			height = height + 4;
			var lines = [];
			var line1 = {};
			line1.time = 300;
			line1.start = {
				x : startX,
				y : startY
			};
			line1.end = {
				x : line1.start.x + width,
				y : line1.start.y
			};

			var line2 = {};
			line2.time = 300;
			line2.start = {
				x : line1.end.x,
				y : line1.end.y
			};
			line2.end = {
				x : line2.start.x,
				y : line2.start.y + height
			};

			var line3 = {};
			line3.time = 300;
			line3.start = {
				x : line2.end.x,
				y : line2.end.y
			};
			line3.end = {
				x : line3.start.x - width,
				y : line3.start.y
			};

			var line4 = {};
			line4.time = 300;
			line4.start = {
				x : line3.end.x,
				y : line3.end.y
			};
			line4.end = {
				x : line4.start.x,
				y : line4.start.y - height
			};
			lines[lines.length] = [ line1, line2, line3, line4 ];

			var this_ = this;
			this.line = co.component.line({
				lines : lines,
				showEnd : function() {
					if (this_.showed) {
						this_.$model.find('.coos-box-center').scrollTop(0);
						$("body").addClass('coos-over-hidden');
						this_.$model.show();
					} else {
						$("body").removeClass('coos-over-hidden');
						this_.$model.hide();
					}
				},
				hideEnd : function() {
					if (this_.showed) {
						this_.$model.find('.coos-box-center').scrollTop(0);
						$("body").addClass('coos-over-hidden');
						this_.$model.show();
					} else {
						$("body").removeClass('coos-over-hidden');
						this_.$model.hide();
					}
				}
			});
		}
	};
	BaseWindow.prototype.hide = function() {
		this.hide_();
	};
	BaseWindow.prototype.hide_ = function() {
		if (!this.showed) {
			return;
		}
		this.showed = false;
		if (this.config.showLine) {
			this.line.hide();
		} else {
			$("body").removeClass('coos-over-hidden');
			this.$model.hide();
		}
	};
	BaseWindow.prototype.remove = function() {
		this.remove_();
	};
	BaseWindow.prototype.remove_ = function() {
		$("body").removeClass('coos-over-hidden');
		this.$model.remove();

		if (this.config.showLine) {
			this.line.remove();
		}
	};
	BaseWindow.prototype.show_ = function() {
		if (this.showed) {
			return;
		}
		this.showed = true;
		if (this.config.showLine) {
			this.initLine();
			this.$model.hide();
			this.line.show();
		} else {
			this.$model.find('.coos-box-center').scrollTop(0);
			$("body").addClass('coos-over-hidden');
			this.$model.show();
		}
	};
	BaseWindow.prototype.show = function() {
		$("body").addClass('coos-over-hidden');
		var this_ = this;
		this.$model.show();
		co.element.init(this.$model);
		var w = co.getWidth();
		var h = co.getHeight();
		var $content = this.$model.find('.coos-box-content');
		var $width = $content.outerWidth();
		var $height = $content.outerHeight();
		if (!co.isEmpty(this.config.height) && this.config.height == 'auto') {
			this.$model.find('.coos-box-content').css("top", 100);
		} else {

			this.$model.find('.coos-box-center').css('height', $height - 90);
			var $cenheight = this.$model.find('.coos-box-center').outerHeight();
			if (!co.isEmpty(this.config.height)) {
				if ($height > (h - 100)) {
					var model_center_height = $height - 90;
					this.$model.find('.coos-box-center').css('height', model_center_height);
					this.$model.find('.coos-box-content').css("top", 50);
				} else {
					if ($cenheight > $height) {
						var model_content_top = (h - $height) / 2 - 40;
						var model_content_height = $height - 90;
						this.$model.find('.coos-box-center').css('height', model_content_height);
						this.$model.find('.coos-box-content').css("top", model_content_top);
					} else {
						var model_content_top = (h - $height) / 2 - 40;
						this.$model.find('.coos-box-content').css("top", model_content_top);
					}
				}
			} else {
				if ($height > (h - 100)) {
					var model_center_height = h - 100 - 80;
					this.$model.find('.coos-box-center').css('height', model_center_height);
					this.$model.find('.coos-box-content').css("top", 50);
				} else if ($cenheight > $height) {
					var model_content_top = (h - $height) / 2 - 40;
					var model_content_height = $height - 90;
					this.$model.find('.coos-box-center').css('height', model_content_height);
					this.$model.find('.coos-box-content').css("top", model_content_top);
				} else {
					var model_content_top = (h - $height) / 2 - 40;
					this.$model.find('.coos-box-content').css("top", model_content_top);
				}
			}
		}

		this.$model.find('.coos-box-cancel').click(function() {
			if (co.isFunction(this_.cancelCallback)) {
				var result = this_.cancelCallback();
				if (!co.isBoolean(result) || result) {
					this_.hide();
				}
			} else {
				this_.hide();
			}
		});
		if (this.config.move) {
			if (!this.initmoveed) {
				this.initmoveed = true;
				var $model = this.$model;
				$model.find('.coos-box-cover').hide();
				var $content = $model.find('.coos-box-content');
				var contentTop = $content.offset().top;
				var contentLeft = $content.offset().left;
				$model.css('position', 'absolute').css('z-index', '0').css('top', contentTop).css('left', contentLeft);
				$model.css('right', 'auto').css('bottom', 'auto');
				$content.css('position', 'relative');
				$content.find('.coos-box-header').addClass('handle');
				$content.find('.coos-box-header').css('cursor', 'move');
				$model.addClass('coos-move-tool');
				co.element.initMoveTool();
			}
			$content.css('top', '0px');
		}
		this.show_();
	};
	co.box.window = function(config) {
		return new BaseWindow(config);
	}
})();
(function() {
	var ModelWindow = function(config) {
		this.config = config;
		this.init();
		return this;
	}
	ModelWindow.prototype.init = function() {
		this.config.showLine = this.config.showLine || false;
		this.config.title = this.config.title;
		this.config.width = this.config.width || 700;
		this.config.data = this.config.data || {};
		this.openLine = this.config.openLine;
		// 标题
		this.title = this.config.title;
		this.data = this.config.data;
		this.url = this.config.url;
		this.isForm = this.config.isForm;
		this.callback = this.config.callback;
		// 模版类型
		this.model = this.config.model;
		// 视图初始化回调
		this.buildBeforeCallback = this.config.buildBeforeCallback;
		this.buildAfterCallback = this.config.buildAfterCallback;
		// 用户自定义宽高
		this.width = this.config.width;
		this.height = this.config.height;
		this.build();
	};

	ModelWindow.prototype.build = function() {
		var this_ = this;
		var isForm = this.isForm;
		var formWindow = null;
		var $model = $(this.model);
		if (co.isString(this.model)) {
			$model = $($('.' + this.model + '-model').html());
		}
		if (this.buildBeforeCallback) {
			this.buildBeforeCallback($model);
		}
		this.config.html = $model;
		var buttons = [];
		buttons[buttons.length] = {
			className : "coos-bg-green coos-white",
			label : isForm ? "保存" : "确认",
			bindEnterKey : true,
			callback : function() {
				if (isForm) {
					var data = co.form.validate($form);
					if (co.isEmpty(this_.url)) {
						this_.callback && this_.callback(data);
						formWindow.remove();
					} else {
						co.POST(this_.url, data, 'json', function(o) {
							var status = o.data;
							if (status.errcode == 0) {
								co.box.info('保存成功！');
								this_.callback && this_.callback(status.result);
								formWindow.remove();
							} else {
								co.box.info(status.errmsg);
							}
						}, false);
					}
				}
			}
		};
		this.config.buttons = buttons;
		this.config.cancelCallback = function() {
			formWindow.remove();
		};
		formWindow = co.box.window(this.config);

		if (this.openLine) {
			var width = formWindow.$model.width();
			var height = formWindow.$model.height();

		} else {
			formWindow.show();
		}
		if (this.buildAfterCallback) {
			this.buildAfterCallback(formWindow.$model);
		}
		if (isForm) {
			var $form = formWindow.$model;
			if (!co.isEmpty(this.config.form)) {
				$form = formWindow.$model.find(this.config.form);
			}
			co.form.clear($form);
			co.form.full($form, this.data);
		}
		this.modelWindow = formWindow;
	};
	co.box.window.model = function(config) {
		return new ModelWindow(config);
	}

})();
(function() {
	co.box = co.box || {};

	co.box.html.select = '<div class="coos-select-content">' + '	<div class="coos-select-header">' + '	检索：<input class="coos-select-search-input" placeholder="请输入关键词检索"/>'
			+ '	<span class="coos-select-search-button">搜索</span>' + '</div>' + '<div class="coos-select-center">' + '	<div class="coos-one-option">'
			+ '		<input type="radio" class="coos-one-option-value" value=""/>' + '		<input type="checkbox" class="coos-one-option-value" value=""/>' + '		<div class="coos-one-option-detail">'
			+ '			<img alt="" class="coos-one-option-image" src="">' + '			<span class="coos-one-option-text"></span>' + '		</div>' + '	</div>' + '</div>';

	co.box.window.select = function(config) {
		var title = config.title;
		var values = config.values;
		var thisvalue = config.value;
		var datas = config.datas;
		var cancelCallback = config.cancelCallback;
		var mincheckedlength = config.mincheckedlength;
		var callback = config.callback;
		var isradio = config.isradio;
		if (typeof (isradio) == 'undefined') {
			isradio = true;
		}
		var optionname = co.getNumber();
		var $model = $(co.box.html.select);
		var $select_conter = $model.find('.coos-select-center');
		var $option_one_model = $model.find('.coos-one-option').clone();
		$model.find('.coos-one-option').remove();
		datas = datas || [];
		var hasNullOption = false;
		var hasImage = false;
		$(datas).each(function(index, data) {

			if (co.isEmpty(data.value)) {
				hasNullOption = true;
			}
			if (!co.isEmpty(data.image)) {
				hasImage = true;
			}

			var $option_one = getOptionOne(data);
			$select_conter.append($option_one);
		});

		if (isradio && !hasNullOption) {
			var $option_one = getOptionOne({
				text : '请选择',
				value : ''
			});
			if (hasImage) {
				$option_one = getOptionOne({
					text : '请选择',
					value : '',
					image : co.config.images.noimg
				});
			}
			$select_conter.prepend($option_one);
		}
		values = values || [ "" ];
		$(values).each(function(index, value) {
			setValue(value);
		});
		function setValue(value) {
			var $option = $model.find('.coos-one-option-value[value="' + value + '"]');
			if ($option.length > 0) {

				if (isradio) {
					$model.find('.coos-one-option-value').removeAttr('checked');
					$option[0].checked = true;
				} else {
					if ($option[0].checked) {
						$option[0].checked = false;
					} else {
						$option[0].checked = true;
					}
				}
			}
		}
		if (thisvalue) {
			setValue(thisvalue);
		}
		function getOptionOne(data) {
			var $option_one = $option_one_model.clone();
			$option_one.find('.coos-one-option-text').text(data.text);
			$option_one.find('.coos-one-option-value').attr("value", data.value);

			$option_one.find('input').attr('name', optionname);

			if (isradio) {
				$option_one.find('[type=checkbox]').remove();
			} else {
				$option_one.find('[type=radio]').remove();
			}
			if (data.image) {
				$option_one.find('img').attr('path', data.image);
				$option_one.find('img').addClass('element-rule-image');
				$select_conter.addClass('coos-has-image')
			} else {
				$option_one.find('img').remove();
			}
			$option_one.find('.coos-one-option-detail').click(function() {
				setValue(data.value);
			});

			return $option_one;
		}
		co.element.init($model);

		var windowconfig = {};
		windowconfig.title = title;
		windowconfig.cancelCallback = function() {
			//
			cancelCallback && cancelCallback();

		};
		$model.find('.coos-select-search-button').click(function() {
			$model.find('.coos-one-option').show();
			var searchInfo = $model.find('.coos-select-search-input').val();
			$($model.find('.coos-one-option-text')).each(function(index, v) {
				var inputInfo = $(this).text();
				if (inputInfo.indexOf(searchInfo) == -1) {
					$(this).closest('.coos-one-option').hide();
				}
			});
		});
		function getCheckedInputs() {
			var $checkedInputs = [];
			var $inputs = $model.find('.coos-one-option-value');

			$($inputs).each(function(index, input) {

				if (input.checked) {
					$checkedInputs[$checkedInputs.length] = $(input);
				}
			});
			return $checkedInputs;
		}
		var buttons = [ {
			label : '确定',
			style : "",
			className : "coos-box-define",
			before : function() {
				var $checkedInputs = getCheckedInputs();

				if (isradio && $checkedInputs.length <= 0) {

					co.box.alert('请选择一项！');
					return false;
				} else {
					return true;
				}

				return true;
			},
			callback : function() {
				// 找出所有选中的选项
				var $checkedInputs = getCheckedInputs();

				var values = [];
				var texts = [];
				$($checkedInputs).each(function(index, checkedInput) {
					values[values.length] = $(checkedInput).attr('value');
					texts[texts.length] = $(checkedInput).parent().find('.coos-one-option-text').text();
				});
				w.remove();
				callback && callback(values, texts);
			}
		} ];
		windowconfig.buttons = buttons;
		windowconfig.html = $model;
		var w = co.box.window(windowconfig);
		w.show();
	};
})();
(function() {
	co.button = {};

	var bindFunctionMap = {};
	co.button.init = function($container) {
		$container = $container || $('body');
		$container = $($container);
		for (type in bindFunctionMap) {
			co.button.init_(type, $container);
		}
	};

	co.button.init_ = function(type, $container) {
		var config = bindFunctionMap[type];
		if (config && config.bind) {
			var $selectors = $container.find('.button-rule-' + type);
			var bind = config.bind;
			$($selectors).each(function(index, $selector) {
				$selector = $($selector);
				if (!co.button.isBinded($selector, type)) {
					bind($selector);
				}
			});
		}
	};

	co.button.bind = function(type, bindFunction) {
		var config = {
			type : type,
			bind : bindFunction
		};
		bindFunctionMap[type] = config;
	};

	co.button.isBinded = function($selector, type) {
		$selector = $($selector);
		var inited = $selector.data('coos-button-rule-' + type + '-binded');
		if (inited) {
			return true;
		}
		if ($selector.closest('[coos-model]').length > 0) {
			return true;
		}
		// if ($selector.closest('[coos-template]').length > 0) {
		//
		// }
		$selector.data('coos-button-rule-' + type + '-binded', true);
		return false;
	};
	$(function() {
		co.button.init();
	});
})();
(function() {
	var getButtonConfig = function(button) {
		var config = {};
		button = $(button);
		var successalert = button.attr('successalert');
		var erroralert = button.attr('erroralert');
		var successtodo = button.attr('successtodo');
		var confirm = button.attr('confirm');
		var toAction = button.attr('toAction');
		var showtype = button.attr('showtype');
		var before = button.attr('before');
		var after = button.attr('after');
		var opennewwindow = button.attr('opennewwindow');
		if (before) {
			before = eval('(' + before + ')');
			config.before = before;
		}
		if (after) {
			after = eval('(' + after + ')');
			config.after = after;
		}
		var data = co.button.getData(button);
		if (!data) {
			return false;
		}
		config.data = data;
		if (!co.isEmpty(confirm)) {
			config.confirm = confirm;
		}
		if (!co.isEmpty(successalert)) {
			config.successalert = successalert;
		}
		if (!co.isEmpty(erroralert)) {
			config.erroralert = erroralert;
		}
		if (!co.isEmpty(successtodo)) {
			config.successtodo = successtodo;
		}
		if (!co.isEmpty(toAction)) {
			config.toAction = toAction;
		}
		if (!co.isEmpty(showtype)) {
			config.showtype = showtype;
		}
		if (!co.isEmpty(opennewwindow)) {
			config.opennewwindow = opennewwindow;
		}

		return config;
	};
	var buttonExecuteBefore = function(config) {
		if (!config) {
			return false;
		}
		if (config.before && !config.before(config)) {
			return false;
		}
		return true;
	};
	var buttonExecuteAfter = function(config) {
		if (config.after) {
			config.after(config);
		} else {
			var successtodo = config.successtodo;

			var errcode = eval('(' + "function(){return config.result." + co.config.post.errcode + ";}" + ')')();
			var errmsg = eval('(' + "function(){return config.result." + co.config.post.errmsg + ";}" + ')')();

			if (config.result && errcode == co.config.post.successcode) {
				if (!co.isEmpty(config.successalert)) {
					co.box.alert(config.successalert);
				}
				if (!co.isEmpty(successtodo)) {
					// 刷新
					if (successtodo == '1') {
						co.reload();
					}
					// 回退
					else if (successtodo == '2') {
						window.history.back();
					}
					// 整个页面刷新
					else if (successtodo == '3') {
						window.location.reload();
					}
				}
			} else {
				if (!co.isEmpty(config.erroralert)) {
					co.box.alert(config.erroralert);
				} else if (!co.isEmpty(errmsg)) {
					co.box.alert(errmsg);
				}
			}
		}
	};
	co.button.getData = function(button) {
		button = $(button);
		var data = {};
		if (button.length > 0) {
			var forms = [];
			var form = button.attr('form');
			if (!co.isEmpty(form)) {
				if (form.indexOf('p:') == 0) {
					form = button.closest(form.replace('p:', ''));
				} else if (form == 'this') {
					form = button.closest('form');
				} else {
					form = $(form);
				}
				if (form != null && form.size() > 0) {
					forms[forms.length] = form;
				}
			}
			for (var i = 0; i < forms.length; i++) {
				var form = $(forms[i]);
				try {
					var formdatas = co.form.validate(form);
					for ( var name in formdatas) {
						var value = formdatas[name];
						if (value != null && data[name] == null) {
							data[name] = value;
						}
					}
				} catch (e) {
					return false;
				}
			}
			;
		}
		return data;
	};
	co.button.toAction = function(button) {
		button = $(button);
		var config = getButtonConfig(button);
		if (!buttonExecuteBefore(config)) {
			return false;
		}
		var config_ = config;
		function execute() {
			var toAction = config_.toAction;
			var data = config_.data;
			if (toAction != null && toAction != '') {
				var config = {
					action : toAction,
					opennewwindow : config_.opennewwindow,
					data : data,
					showtype : config_.showtype
				};
				co.toAction(config);
			}
		}
		if (config.confirm) {
			co.box.confirm(config.confirm, function() {
				execute();
			});
		} else {
			execute();
		}
	};
	co.button.doAction = function(button) {
		button = $(button);
		var config = getButtonConfig(button);
		if (!buttonExecuteBefore(config)) {
			return false;
		}
		var config_ = config;

		function execute() {
			var toAction = config_.toAction;
			var data = config_.data;
			if (toAction != null && toAction != '') {
				co.POST(toAction, data, 'json', function(result) {
					config_.result = result;
					buttonExecuteAfter(config_);
				});
			}
		}
		if (config.confirm) {
			co.box.confirm(config.confirm, function() {
				execute();
			});
		} else {
			execute();
		}
	};
	co.button.reload = function(button) {
		co.reload();
	};
	co.button.back = function(button) {
		button = $(button);
		if (button.closest('.page-window').length > 0) {
			button.closest('.page-window').hide();
		} else {
			window.history.back();
		}
	};

	co.button.doHelp = function(button) {
		button = $(button);
		console.log('帮助按钮')
	};

	$(function() {
		// 跳转页面
		$('html').on('click', '.toActionBtn,.coosToActionBtn', function() {
			co.button.toAction(this);
		});
		$('html').on('click', '.toIndexBtn,.coosToIndexBtn', function() {
			var action = co.config.action.toIndex;
			co.toAction({
				action : action,
				data : {}
			});
		});
		// 提交表单
		$('html').on('click', '.doActionBtn,.coosDoActionBtn', function() {
			co.button.doAction(this);
		});
		// 重新加载
		$('html').on('click', '.doReloadBtn,.coosDoReloadBtn', function() {
			co.button.reload(this);
		});
		$('html').on('click', '.doHelpBtn,.coosDoHelpBtn', function() {
			co.button.doHelp(this);
		});
		$('html').on('click', '.doBackBtn,.coosDoBackBtn', function() {
			co.button.back(this);
		});

	});
})();
(function() {
	co.button.bind('upload', function($selector) {
		co.button.bind.upload($selector, {
			input : $selector.attr("input"),
			image : $selector.attr("image"),
		})
	});

	co.button.bind.upload = function($selector, config) {
		config = config || {};
		$selector = $($selector);
		var input = $(config.input);
		var image = $(config.image);
		var callback = config.callback;
		co.upload.bind({
			button : $selector,
			callback : function(files) {
				var path = files[files.length - 1].path;
				var url = files[files.length - 1].url;
				if (input && input.length > 0) {
					input.val(path);
					input.change();
				}
				if (image && image.length > 0) {
					if (image[0].tagName == 'IMG') {
						image[0].src = url;
					} else {
						$(image).css('background-image', 'url("' + url + '")');
					}
				}
				callback && callback(files);
			}
		});
	};

})();
(function() {
	co.component = new Object();

	var bindFunctionMap = {};
	co.component.init = function($container) {
		$container = $container || $('body');
		$container = $($container);
		for (type in bindFunctionMap) {
			co.component.init_(type, $container);
		}
	};

	co.component.init_ = function(type, $container) {
		var config = bindFunctionMap[type];
		if (config && config.bind) {
			var $selectors = $container.find('.component-rule-' + type);
			var bind = config.bind;
			$($selectors).each(function(index, $selector) {
				$selector = $($selector);
				if (!co.component.isBinded($selector, type)) {
					bind($selector);
				}
			});
		}
	};

	co.component.bind = function(type, bindFunction) {
		var config = {
			type : type,
			bind : bindFunction
		};
		bindFunctionMap[type] = config;
	};

	co.component.isBinded = function($selector, type) {
		$selector = $($selector);
		var inited = $selector.data('coos-component-rule-' + type + '-binded');
		if (inited) {
			return true;
		}
		if ($selector.closest('[coos-model]').length > 0) {
			return true;
		}
		// if ($selector.closest('[coos-template]').length > 0) {
		//
		// }
		$selector.data('coos-component-rule-' + type + '-binded', true);
		return false;
	};
	$(function() {
		co.component.init();
	});

})();
(function() {
	var options = {
		fadeSpeed : 100,
		filter : function($obj) {
			// Modify $obj, Do not return
		},
		above : 'auto',
		preventDoubleContext : true,
		compress : false
	};

	var Context = function(opts) {
		this.initialize(opts);
		var selector = this.options.selector;
		var menus = this.options.menus;
		this.addContext(selector, menus);
		return this;
	};

	Context.prototype.initialize = function(opts) {
		var options = this.options = $.extend({}, options, opts);
		$(document).on('click', 'html', function() {
			$('.coos-dropdown-context').fadeOut(options.fadeSpeed, function() {
				$('.coos-dropdown-context').css({
					display : ''
				}).find('.drop-left').removeClass('drop-left');
			});
		});
		if (options.preventDoubleContext) {
			$(document).on('contextmenu', '.coos-dropdown-context', function(e) {
				e.preventDefault();
			});
		}
		$(document).on('mouseenter', '.coos-dropdown-submenu', function() {
			var $sub = $(this).find('.coos-dropdown-context-sub:first'), subWidth = $sub.width(), subLeft = $sub.offset().left, collision = (subWidth + subLeft) > window.innerWidth;
			if (collision) {
				$sub.addClass('drop-left');
			}
		});
	};

	Context.prototype.updateOptions = function(opts) {
		this.options = $.extend({}, this.options, opts);
	};
	Context.prototype.buildMenu = function(data, id, subMenu) {
		var subClass = (subMenu) ? ' coos-dropdown-context-sub' : '', compressed = options.compress ? ' coos-compressed-context' : '', $menu = $('<ul class="coos-dropdown-menu coos-dropdown-context'
				+ subClass + compressed + '" id="dropdown-' + id + '"></ul>');
		var i = 0, linkTarget = '';
		for (i; i < data.length; i++) {
			if (typeof data[i].divider !== 'undefined') {
				$menu.append('<li class="divider"></li>');
			} else if (typeof data[i].header !== 'undefined') {
				$menu.append('<li class="coos-nav-header">' + data[i].header + '</li>');
			} else {
				if (typeof data[i].target !== 'undefined') {
					linkTarget = ' target="' + data[i].target + '"';
				}
				if (typeof data[i].subMenu !== 'undefined') {

					if (typeof data[i].href == 'undefined') {
						$sub = ('<li class="coos-dropdown-submenu"><a tabindex="-1" >' + data[i].text + '</a></li>');
					} else {
						$sub = ('<li class="coos-dropdown-submenu"><a tabindex="-1" href="' + data[i].href + '">' + data[i].text + '</a></li>');

					}

				} else {

					if (typeof data[i].href == 'undefined') {
						$sub = $('<li><a tabindex="-1" >' + data[i].text + '</a></li>');

					} else {
						$sub = $('<li><a tabindex="-1" href="' + data[i].href + '"' + linkTarget + '>' + data[i].text + '</a></li>');

					}
				}
				if (typeof data[i].action !== 'undefined') {
					var actiond = new Date(), actionID = 'event-' + actiond.getTime() * Math.floor(Math.random() * 100000), eventAction = data[i].action;
					$sub.find('a').attr('id', actionID);
					$('#' + actionID).addClass('coos-context-event');
					$(document).on('click', '#' + actionID, eventAction);
				}
				$menu.append($sub);
				if (typeof data[i].subMenu != 'undefined') {
					var subMenuData = this.buildMenu(data[i].subMenu, id, true);
					$menu.find('li:last').append(subMenuData);
				}
			}
			if (typeof options.filter == 'function') {
				options.filter($menu.find('li:last'));
			}
		}
		return $menu;
	};
	Context.prototype.updateOptions = function(selector, data) {

		var d = new Date(), id = d.getTime(), $menu = buildMenu(data, id);

		$('body').append($menu);

		$(document).on('contextmenu', selector, function(e) {
			e.preventDefault();
			e.stopPropagation();

			$('.coos-dropdown-context:not(.coos-dropdown-context-sub)').hide();

			$dd = $('#dropdown-' + id);
			if (typeof options.above == 'boolean' && options.above) {
				$dd.addClass('coos-dropdown-context-up').css({
					top : e.pageY - 20 - $('#dropdown-' + id).height(),
					left : e.pageX - 13
				}).fadeIn(options.fadeSpeed);
			} else if (typeof options.above == 'string' && options.above == 'auto') {
				$dd.removeClass('coos-dropdown-context-up');
				var autoH = $dd.height() + 12;
				if ((e.pageY + autoH) > $('html').height()) {
					$dd.addClass('coos-dropdown-context-up').css({
						top : e.pageY - 20 - autoH,
						left : e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				} else {
					$dd.css({
						top : e.pageY + 10,
						left : e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				}
			}
		});
	};

	Context.prototype.destroyContext = function(selector) {
		$(document).off('contextmenu', selector).off('click', '.coos-context-event');
	};
	Context.prototype.addContext = function(selector, data) {

		var d = new Date(), id = d.getTime(), $menu = this.buildMenu(data, id);

		$('body').append($menu);
		$(selector).on('contextmenu', function(e) {
			e.preventDefault();
			e.stopPropagation();

			$('.coos-dropdown-context:not(.coos-dropdown-context-sub)').hide();

			$dd = $('#dropdown-' + id);
			if (typeof options.above == 'boolean' && options.above) {
				$dd.addClass('coos-dropdown-context-up').css({
					top : e.pageY - 20 - $('#dropdown-' + id).height(),
					left : e.pageX - 13
				}).fadeIn(options.fadeSpeed);
			} else if (typeof options.above == 'string' && options.above == 'auto') {
				$dd.removeClass('coos-dropdown-context-up');
				var autoH = $dd.height() + 12;
				if ((e.pageY + autoH) > $('html').height()) {
					$dd.addClass('coos-dropdown-context-up').css({
						top : e.pageY - 20 - autoH,
						left : e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				} else {
					$dd.css({
						top : e.pageY + 10,
						left : e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				}
			}
		})
	};

	co.component.context = function(config) {
		var t = new Context(config);
		return t;
	};

})();
(function() {
	$(function() {
		$('html').on('click', '.coos-dropdown-toggle', function(e) {
			var $parent = $(this).parent();
			if ($parent.hasClass('open')) {
				$parent.removeClass('open');
			} else {
				$parent.removeClass('open');
				$parent.addClass('open');
			}
		});
		$('html').on('click', '.coos-dropdown-menu', function(e) {
			$(this).parent().removeClass('open');
		});
		$(window.document).on('click', function(e) {
			e = window.event || e;
			var obj = $(e.srcElement || e.target);
			var $obj = null;
			var $toggle = obj.closest('.coos-dropdown-toggle');
			if ($toggle.length > 0) {
				$obj = $toggle.parent();
			}
			var $menu = obj.closest('.coos-dropdown-menu');
			if ($menu.length > 0) {
				$obj = $menu.parent();
			}
			if ($obj == null) {
				$('.coos-dropdown-toggle').parent().removeClass('open');
				return;
			}
			var $dropdowntoggles = $('.coos-dropdown-toggle');
			$($dropdowntoggles).each(function(index, $dropdowntoggle) {
				var $parent = $($dropdowntoggle).parent();
				if ($parent.hasClass('open')) {
					if ($obj[0] == $parent[0]) {
					} else {
						$parent.removeClass('open');
					}
				}
			});
		});

	});
})();
(function() {

	var Line = function(config) {
		this.config = config || {};
		this.init();
		return this;
	};

	Line.prototype.init = function() {
		this.lines = this.config.lines || [];
		this.zIndex = this.config.zIndex || 100;
		this.initView();
	};
	function createLineGroup(line) {
		if (line == null) {
			return null;
		}
		var start = line.start;
		var end = line.end;
		var $start = $('<div class="coos-component-line-point"></div>');
		var $line = $('<div class="coos-component-line"></div>');
		var $end = $('<div class="coos-component-line-point"></div>');
		$start.css('left', start.x);
		$start.css('top', start.y);
		$line.css('left', start.x);
		$line.css('top', start.y);
		$end.css('left', end.x);
		$end.css('top', end.y);

		var a = end.y - start.y;
		var b = end.x - start.x;
		var width = 0;
		var angle = 0;
		if (a == 0 && b == 0) {
			width = 0;
			angle = 0;
		} else if (a == 0 && b > 0) {
			width = b;
			angle = 0;
		} else if (a == 0 && b < 0) {
			width = -b;
			angle = 180;
		} else if (b == 0 && a > 0) {
			width = a;
			angle = 90;
		} else if (b == 0 && a < 0) {
			width = -a;
			angle = 270;
		} else {
			var c = Math.sqrt(a * a + b * b);
			var round = {};
			round.r = c / 2;
			round.x = b / 2;
			round.y = a / 2;
			width = c;
			if (a < 0 && b < 0) {
				angle = 270 - 90 + (Math.asin(-a / c) * 360 / (2 * Math.PI));
			} else if (a < 0 && b > 0) {
				angle = 360 - 90 + (Math.asin(-a / c) * 360 / (2 * Math.PI));
			} else if (a > 0 && b < 0) {
				angle = 90 + (Math.asin(a / c) * 360 / (2 * Math.PI));

			} else if (a > 0 && b > 0) {
				angle = (Math.asin(a / c) * 360 / (2 * Math.PI));
			}
		}
		$line.attr('coos-width', width);
		$line.css("transform-origin", "0 0");
		$line.css("transform", "rotate(" + angle + "deg)");
		$line.css("-ms-transform", "rotate(" + angle + "deg)");
		$line.css("-moz-transform", "rotate(" + angle + "deg)");
		$line.css("-webkit-transform", "rotate(" + angle + "deg)");
		$line.css("-o-transform", "rotate(" + angle + "deg)");

		var $body = $('body');
		var lineGroup = {};
		lineGroup.$start = $start;
		lineGroup.$end = $end;
		lineGroup.$line = $line;
		lineGroup.time = line.time;
		$body.append($start);
		$body.append($line);
		$body.append($end);
		return lineGroup;
	}
	Line.prototype.initView = function() {
		var lineGroups = [];
		$(this.lines).each(function(index, line) {
			if (line != null) {
				if (co.isArray(line)) {
					var gs = [];
					$(line).each(function(index, one) {
						var lineGroup = createLineGroup(one);
						gs[gs.length] = lineGroup;
					});
					lineGroups[lineGroups.length] = gs;
				} else {
					var lineGroup = createLineGroup(line);
					lineGroups[lineGroups.length] = lineGroup;
				}
			}
		});
		this.lineGroups = lineGroups;
	};

	Line.prototype.showLineGroup = function(lineGroup, callback) {
		var this_ = this;
		if (lineGroup != null) {
			if (co.isArray(lineGroup)) {
				$(lineGroup).each(function(index, one) {
					if (index == (lineGroup.length - 1)) {
						this_.showLineGroup(one, callback);
					} else {
						this_.showLineGroup(one);
					}
				});
			} else {
				var time = lineGroup.time || 100;
				var $start = lineGroup.$start;
				var $end = lineGroup.$end;
				var $line = lineGroup.$line;
				if (this_.showed) {
					$start.addClass('coos-show');
					$line.addClass('coos-show');
				} else {
					$start.removeClass('coos-show');
					$line.removeClass('coos-show');
				}
				var width = $line.attr('coos-width');
				if (!this_.showed) {
					width = 0;
				}
				$line.animate({
					width : width + "px"
				}, time, function() {
					if (this_.showed) {
						$end.addClass('coos-show');
					} else {
						$end.removeClass('coos-show');
					}
					callback && callback();
				});
			}
		}
	};

	Line.prototype.hideLineGroup = function(lineGroup, callback) {
		var this_ = this;
		if (lineGroup != null) {
			if (co.isArray(lineGroup)) {
				$(lineGroup).each(function(index, one) {
					if (index == (lineGroup.length - 1)) {
						this_.hideLineGroup(one, callback);
					} else {
						this_.hideLineGroup(one);
					}
				});
			} else {
				var time = lineGroup.time || 100;
				var $start = lineGroup.$start;
				var $end = lineGroup.$end;
				var $line = lineGroup.$line;
				if (this_.showed) {
					$end.addClass('coos-show');
					$line.addClass('coos-show');
				} else {
					$end.removeClass('coos-show');
					$line.removeClass('coos-show');
				}
				var width = $line.attr('coos-width');
				if (!this_.showed) {
					width = 0;
				}
				$line.animate({
					width : width + "px"
				}, time, function() {
					if (this_.showed) {
						$start.addClass('coos-show');
					} else {
						$start.removeClass('coos-show');
					}
					callback && callback();
				});
			}
		}
	};

	Line.prototype.show = function() {
		if (this.showed) {
			return;
		}
		this.showed = true;
		var this_ = this;
		var callback = this.config.showEnd;
		var lineGroups = this.lineGroups;
		function showLine(index) {
			if (index < 0 || index >= lineGroups.length) {
				callback && callback();
				return;
			}
			var lineGroup = lineGroups[index];
			this_.showLineGroup(lineGroup, function() {
				index = index + 1;
				showLine(index);
			});
		}
		showLine(0);
	};
	Line.prototype.hide = function() {
		if (!this.showed) {
			return;
		}
		this.showed = false;
		var this_ = this;
		var callback = this.config.hideEnd;

		var lineGroups = this.lineGroups;
		function hideLine(index) {

			if (index < 0 || index >= lineGroups.length) {
				callback && callback();
				return;
			}
			var lineGroup = lineGroups[index];

			this_.hideLineGroup(lineGroup, function() {
				index = index - 1;
				hideLine(index);
			});
		}
		hideLine(lineGroups.length - 1);
	};
	Line.prototype.remove = function() {

	};
	co.component.line = function(config) {
		var t = new Line(config);
		return t;
	};

})();
(function() {

	var Loader = function(config) {
		this.config = config || {};
		this.models = config.models || [];
		this.init();
		return this;
	};

	Loader.prototype.init = function() {
	};
	Loader.prototype.createLoaderIcon = function() {
		var $loader = $('<div class="loader"></div>');
		$loader.append('<div class="loader-inner ball-clip-rotate-multiple"><div></div><div></div></div>');
		return $loader;
	};
	Loader.prototype.initView = function() {
		var $loadView = $('<div class="coos-component-loader"></div>');
		$loadView.hide();
		var title = this.config.title || '加载数据';
		$loadView.append('<div class="text-center coos-green pd-30 hread">' + title + '</div>');
		$loadView.appendTo('body');
		var $list = $('<div class="loader-data-list"></div>');
		$loadView.append($list);
		$(this.models).each(function(index, model) {
			var $one = $('<div class="loader-data-one"></div>');
			$one.attr('load-index', index);
			$one.append('<div class="icon coos-blue"><span class="fa fa-circle-o"></span></div>');
			$one.append('<div class="title">' + model.title + '</div>');
			$one.append('<div class="status"><span class="coos-blue">等待中</span></div>');
			$list.append($one);
		});
		this.$loadView = $loadView;
	};
	Loader.prototype.start = function() {
		this.initView();
		var this_ = this;
		co.plugin.load('loaders', function() {
			this_.$loadView.show();
			$('body').addClass('coos-component-loader-start');
			this_.load(0);
		});
	};
	Loader.prototype.load = function(index) {
		index = index || 0;
		if (index >= this.models.length) {
			this.end();
		} else {
			var model = this.models[index];
			var $one = this.$loadView.find('[load-index="' + index + '"]')
			$one.find('.status').empty().append('<span class="coos-blue">加载中</span>');
			$one.append(this.createLoaderIcon());
			var this_ = this;
			var callback = function() {
				$one.find('.icon').empty().append('<span class="fa fa-check-circle-o"></span>');
				$one.find('.icon').removeClass('coos-blue');
				$one.find('.icon').addClass('coos-green');
				$one.find('.status').empty().append('<span class="coos-green">加载成功</span>');
				$one.find('.loader').remove();
				this_.load(index + 1);
			};
			if (model.load) {
				model.load(callback);
			}else{
				callback();
			}
		}
	};
	Loader.prototype.end = function() {
		var callback = this.config.success;
		var this_ = this;
		window.setTimeout(function() {
			this_.endView();
			window.setTimeout(function() {
				// this_.$loadView.hide(200);
				this_.$loadView.remove()
				$('body').removeClass('coos-component-loader-start');
				callback && callback();
			}, 500);
		}, 300);
	};
	Loader.prototype.endView = function() {
		this.$loadView.empty().append('<div class="coos-component-end-view">加载完成</div>');
	};
	Loader.prototype.destroy = function() {
	};

	co.component.loader = function(config) {
		var t = new Loader(config);
		return t;
	};

})();
(function() {

	var Loading = function(config) {
		this.config = config || {};
		this.init();
		return this;
	};

	Loading.prototype.init = function() {
		this.initView();
	};
	Loading.prototype.initView = function() {
		this.$loading = $('<div class="coos-component-loading"><div class="coos-component-loading-content"></div></div>');
		this.$text = $('<div class="text-center coos-green"><span class="coos-progress-text"></span><span class="coos-progress-percentage"></span></div>');
		this.$progress = $('<div class="coos-progress "><div class="coos-progress-bar " style="width: 0%;"></div></div>');

		this.$loading.find('.coos-component-loading-content').append(this.$text);
		this.$loading.find('.coos-component-loading-content').append(this.$progress);
		this.$loading.appendTo('body');
	};
	Loading.prototype.load = function(callback) {

		var models = this.config.models || [];
		var setloadpercentage = 0;
		var nopercentagecount = 0;
		$(models).each(function(index, model) {
			if (co.isNumber(model.percentage)) {
				setloadpercentage += model.percentage;
			} else {
				nopercentagecount++;
			}
		});
		var overpercentage = 100 - setloadpercentage;
		$(models).each(function(index, model) {
			if (!co.isNumber(model.percentage)) {
				if (overpercentage > 0) {
					model.percentage = parseInt(overpercentage / nopercentagecount);
				} else {
					model.percentage = 0;
				}
			}
			var predictTime = model.predictTime || 500;
			var predictLoadIntervalTime = model.predictLoadIntervalTime || 100;
			var predictLoadCount = parseInt(predictTime / predictLoadIntervalTime);

			var eachLoadPercentage = model.percentage * 80 / predictLoadCount / 100;
			model.predictTime = predictTime;
			model.predictLoadIntervalTime = predictLoadIntervalTime;
			model.predictLoadCount = predictLoadCount;
			model.eachLoadPercentage = eachLoadPercentage;
			model.index = index;
		});

		this.load_(0);
	};
	Loading.prototype.load_ = function(index) {
		this.loadIndex = index;
		var models = this.config.models || [];
		var this_ = this;
		if (index >= models.length) {
			this.loadSuccess();
		} else {
			var model = models[index];
			var percentage = model.percentage;
			var nowpercentage = this.percentage || 0;
			nowpercentage = nowpercentage + percentage;
			var execute = model.execute;
			this.predictLoad(model, 0);
			var index_ = index + 1;
			if (execute) {
				execute && execute(function() {
					this_.loadOverallProgress(model, model.percentage);
					this_.load_(index_);
				});
			} else {
				this_.loadOverallProgress(model, model.percentage);
				this_.load_(index_);
			}
		}
	};
	Loading.prototype.predictLoad = function(model, index) {
		if (this.loadIndex != model.index) {
			return;
		}
		if (index >= model.predictLoadCount) {
			return;
		}
		if ((index + 1) * model.eachLoadPercentage >= model.percentage * 80 / 100) {
			return;
		}
		this.loadProgress(model, model.eachLoadPercentage);
		var this_ = this;
		window.setTimeout(function() {
			var index_ = index + 1;
			this_.predictLoad(model, index_);
		}, model.predictLoadIntervalTime);

	};
	Loading.prototype.loadProgress = function(model, percentage) {
		var loadedPercentage = this.loadedPercentage || 0;
		loadedPercentage = loadedPercentage + percentage;
		this.loadedPercentage = loadedPercentage;
		this.setInfo(model.text, loadedPercentage);
	};
	Loading.prototype.loadOverallProgress = function(model, percentage) {
		var loadedPercentage = this.loadedPercentage || 0;
		if (percentage < loadedPercentage) {
			return;
		}
		this.loadedPercentage = percentage;
		this.setInfo(model.text, percentage);
	};
	Loading.prototype.loadSuccess = function() {
		this.setInfo('加载完成', 100);
	};
	Loading.prototype.setInfo = function(text, percentage) {
		if (percentage < 0) {
			percentage = 0;
		}
		if (percentage > 100) {
			percentage = 100;
		}
		var percentageText = percentage;
		if (("" + percentageText).indexOf('.') >= 0) {
			percentageText = Number(percentageText).toFixed(1)
		}
		this.$text.find('.coos-progress-text').text(text);
		this.$text.find('.coos-progress-percentage').text(percentageText + "%");
		this.$progress.find('.coos-progress-bar').css('width', percentage + "%");
	};
	Loading.prototype.destroy = function() {
		this.$loading.remove();
	};

	co.component.loading = function(config) {
		var t = new Loading(config);
		return t;
	};

})();
(function() {

	var OverTool = function(config) {
		this.config = config || {};
		this.init();
		return this;
	};

	OverTool.prototype.init = function() {
		this.overid = co.getNumber();
		this.$element = $(this.config.element);
		this.$content = $(this.config.content);
		this.width = this.config.width;
		this.height = this.config.height;
		this.initView();
		this.initEvent();
	};
	OverTool.prototype.initView = function() {
		this.$view = $('<div class="coos-over-tool-window"><div class="coos-over-tool-window-container"><div class="coos-over-tool-window-content"></div></div></div>');
		this.$view.find('.coos-over-tool-window-content').append(this.$content);
		$('body').append(this.$view);
	};
	OverTool.prototype.initPlace = function() {
		if (this.initPlaceed) {
			return;
		}
		var elementPlace = {};
		this.initPlaceed = true;
		var this_ = this;
		this.elementX = $(this.$element).offset().left;
		this.elementY = $(this.$element).offset().top;
		this.elementW = $(this.$element).width();
		this.elementH = $(this.$element).height();
		this.initLine();

		this_.$view.css('width', this_.width);
		this_.$view.css('height', this_.hegiht);
	};
	OverTool.prototype.initLine = function() {
		var lines = [];
		var width = Number(this.width);
		var height = Number(this.height);
		var line1 = {};
		line1.start = {
			x : Number(this.elementX) + Number(this.elementW),
			y : Number(this.elementY) + Number(this.elementH)
		};
		line1.end = {
			x : Number(line1.start.x) + 10,
			y : Number(line1.start.y) + 50
		};
		lines[lines.length] = line1;

		var line2 = {};
		line2.start = {
			x : line1.end.x,
			y : line1.end.y
		};
		line2.end = {
			x : Number(line2.start.x) + 50,
			y : Number(line2.start.y) + 10
		};
		lines[lines.length] = line2;

		var line3 = {};
		line3.time = 300;
		line3.start = {
			x : line2.end.x,
			y : line2.end.y
		};
		line3.end = {
			x : Number(line3.start.x) + width,
			y : line3.start.y
		};

		var line4 = {};
		line4.time = 300;
		line4.start = {
			x : line3.end.x,
			y : line3.end.y
		};
		line4.end = {
			x : line4.start.x,
			y : Number(line4.start.y) + height
		};

		var line5 = {};
		line5.time = 300;
		line5.start = {
			x : line4.end.x,
			y : line4.end.y
		};
		line5.end = {
			x : line5.start.x - width,
			y : line5.start.y
		};

		var line6 = {};
		line6.time = 300;
		line6.start = {
			x : line5.end.x,
			y : line5.end.y
		};
		line6.end = {
			x : line6.start.x,
			y : line6.start.y - height
		};
		lines[lines.length] = [ line3, line4, line5, line6 ];

		var this_ = this;
		this_.$view.css('left', line2.end.x);
		this_.$view.css('top', line2.end.y);
		this.line = co.component.line({
			lines : lines,
			showEnd : function() {
				if (this_.showed) {
					this_.$view.addClass('coos-show');
				} else {
					this_.$view.removeClass('coos-show');
				}
			},
			hideEnd : function() {
				if (this_.showed) {
					this_.$view.addClass('coos-show');
				} else {
					this_.$view.removeClass('coos-show');
				}
			}
		});
	};
	OverTool.prototype.show = function() {
		if (this.showed) {
			return;
		}
		this.showed = true;
		this.line.show();
	};
	OverTool.prototype.hide = function() {
		if (!this.showed) {
			return;
		}
		this.showed = false;
		this.line.hide();
		this.$view.removeClass('coos-show');
	};
	OverTool.prototype.initEvent = function() {
		var this_ = this;
		$(this.$element).attr('coos-over-id', this.overid);
		$(this.$element).mouseenter(function() {
			this_.initPlace();
			this_.show();
		});
		$(this.$element).mouseleave(function(e) {
			this_.hide();
		});
	};

	co.component.over = function(config) {
		var t = new OverTool(config);
		return t;
	};

})();
(function() {

	co.component.getPaginationUl = function(model, callback) {
		var currentpage = model.currentpage;
		currentpage = currentpage == null ? 1 : currentpage;
		var totalpages = model.totalpages;
		totalpages = totalpages == null ? 0 : totalpages;
		var totalcount = model.totalcount;
		totalcount = totalcount == null ? 0 : totalcount;
		var pagesize = model.pagesize;
		pagesize = pagesize == null ? 0 : pagesize;
		var uppage = model.uppage;
		if (!uppage) {
			uppage = currentpage - 1;
			if (uppage < 1) {
				uppage = 1;
			}
		}
		var nextpage = model.nextpage;
		if (!nextpage) {
			nextpage = currentpage + 1;
			if (nextpage > totalpages) {
				nextpage = totalpages;
			}
		}
		nextpage = nextpage == null ? 0 : nextpage;
		var ul = $("<ul class=\"pagination pagination-sm\" ></ul>");
		var li = $("<li ><a href=\"javascript:;\" >|&lt;</a></li>");
		ul.append(li);
		if (currentpage <= 1) {
			li.addClass('disabled');
		}
		if (currentpage > 1) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('pagesize', 1);
			li.find('a').attr('currentpage', 1);
		}
		li = $("<li ><a href=\"javascript:;\" >&lt;</a></li>");
		ul.append(li);
		if (currentpage <= 1) {
			li.addClass('disabled');
		}
		if (currentpage > 1) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('currentpage', uppage);
		}
		if (totalpages > 6) {
			if (currentpage <= 3) {
				var pageIndex = 1;
				for (var i = 1; i <= 6; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
			}
			if (currentpage > 3 && currentpage < (totalpages - 3)) {
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
				var pageIndex = currentpage - 2;
				for (var i = 1; i <= 6; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
			}
			if (currentpage >= (totalpages - 3)) {
				li = $("<li ><a href=\"javascript:;\" >...</a></li>");
				ul.append(li);
				var pageIndex = totalpages - 5;
				for (var i = 1; i <= 6; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
			}
		} else {
			if (totalpages <= 6) {
				var pageIndex = 1;
				for (var i = 1; i <= totalpages; i++) {
					li = $("<li ><a href=\"javascript:;\" >" + pageIndex + "</a></li>");
					ul.append(li);
					if (pageIndex == currentpage) {
						li.addClass('active');
					} else {
						li.find('a').addClass('pageSearchBtn');
					}
					li.find('a').attr('currentpage', pageIndex);
					pageIndex++;
				}
			}
		}
		li = $("<li ><a href=\"javascript:;\" >&gt;</a></li>");
		ul.append(li);
		if (currentpage >= totalpages) {
			li.addClass('disabled');
		}
		if (currentpage < totalpages) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('currentpage', nextpage);
		}
		li = $("<li ><a href=\"javascript:;\" >&gt;|</a></li>");
		ul.append(li);
		if (currentpage >= totalpages) {
			li.addClass('disabled');
		}
		if (currentpage < totalpages) {
			li.find('a').addClass('pageSearchBtn');
			li.find('a').attr('currentpage', totalpages);
		}
		li = ("<li class=\"disabled\"><a href=\"javascript:;\" >" + currentpage + "/" + totalpages + "</a></li>");
		ul.append(li);
		li = ("<li class=\"disabled\"><a href=\"javascript:;\" >" + pagesize + "条/页</a></li>");
		ul.append(li);
		li = ("<li class=\"disabled\"><a href=\"javascript:;\" >共" + totalcount + "条</a></li>");
		ul.append(li);
		ul.find('.pageSearchBtn').click(function() {
			var currentpage = $(this).attr('currentpage');
			if (callback) {
				callback(currentpage);
			}
		});
		return ul;
	};
})();
(function() {
	var options = {};

	var PathResolve = function(opts) {
		this.initialize(opts);
		return this;
	};

	PathResolve.prototype.initialize = function(opts) {
		var options = this.options = $.extend({}, options, opts);
		this.initFolder();
	};

	PathResolve.prototype.initFolder = function(opts) {
		var datas = this.options.datas;

		var level_folders = {};
		var rootFolder = {};
		rootFolder.id = 0;
		rootFolder.text = "/";
		rootFolder.name = "ROOT";
		rootFolder.path = "/";
		$(datas).each(function(index, data) {
			var path = data.path;
			if (!coos.isEmpty(path)) {
				path = path.replace(/^\/+/g, "/");
				if (path.indexOf('/') == 0) {
					path = path.substring(1);
				}
				if (path.lastIndexOf('/') == path.length - 1) {
					path = path.substring(0, path.length - 1);
				}
				var names = path.split('/');
				var lastFolder = rootFolder;
				var lastPath = "/";
				$(names).each(function(level, name) {
					var isLast = level + 1 == names.length;
					if (isLast) {
						var file = {};
						file.id = co.getNumber();
						file.text = name;
						file.name = name;
						file.data = data;
						file.parentid = lastFolder.id;
						file.isfile = true;
						var fs = lastFolder.files || [];
						fs.push(file);
						lastFolder.files = fs;
					} else {
						var fs = level_folders[level] || [];
						var folder = null;
						$(fs).each(function(i, f) {
							if (f.name == name && f.isfolder) {
								folder = f;
							}
						});
						if (folder == null) {
							folder = {};
							folder.id = co.getNumber();
							folder.text = name;
							folder.name = name;
							folder.path = lastPath + name + "/";

							folder.isfolder = true;
							folder.parentid = lastFolder.id;
							fs.push(folder);
							level_folders[level] = fs;
						}
						lastFolder = folder;
						lastPath = folder.path;

					}
				});
			}
		});

		var folders = [];
		folders.push(rootFolder);
		$(rootFolder.files).each(function(index, f) {
			f.level = 0;
			folders.push(f);
		});
		for ( var level in level_folders) {
			var fs = level_folders[level];
			$(fs).each(function(index, f) {
				f.level = level;
				folders.push(f);
				$(f.files).each(function(index, f) {
					f.level = level + 1;
					folders.push(f);
				});
			});
		}

		this.folders = folders;
	};

	co.component.pathresolve = function(config) {
		var t = new PathResolve(config);
		return t;
	};

})();
(function() {
	co.wizard = co.wizard || {};
	var defaultConfig = {};
	defaultConfig.selector = {};
	defaultConfig.selector.pills = ".coos-wizard-pills>li";
	defaultConfig.selector.spans = ".coos-wizard-spans>.coos-wizard-span";
	defaultConfig.selector.prev = ".coos-wizard-button-prev";
	defaultConfig.selector.next = ".coos-wizard-button-next";
	defaultConfig.selector.finish = ".coos-wizard-button-finish";
	defaultConfig.selector.bar = ".coos-progress-bar";

	var Wizard = function(config) {
		config = jQuery.extend(true, {}, config, defaultConfig);

		this.$wizard = $(config.wizard);
		this.$next = this.$wizard.find(config.selector.next);
		this.$prev = this.$wizard.find(config.selector.prev);
		this.$finish = this.$wizard.find(config.selector.finish);
		this.$pills = this.$wizard.find(config.selector.pills);
		this.$spans = this.$wizard.find(config.selector.spans);
		this.$bar = this.$wizard.find(config.selector.bar);
		var activeindex = 0;
		this.$pills.each(function(index, $pill) {
			if ($($pill).hasClass('active')) {
				activeindex = index;
			}
		});
		this.bindClick();
		this.beforeChange = function(activeindex, $pills, $spans) {
			if (co.isFunction(config.beforeChange)) {
				var v = config.beforeChange(activeindex, $pills, $spans);
				if (co.isBoolean(v)) {
					return v;
				}
			}
			return true;
		}
		this.afterChange = function(activeindex, $pills, $spans) {

			if (co.isFunction(config.afterChange)) {
				var v = config.afterChange(activeindex, $pills, $spans);
				if (co.isBoolean(v)) {
					return v;
				}
			}
			return true;
		}
		this.onFinish = function() {

			if (co.isFunction(config.onFinish)) {
				config.onFinish();
			}
		}
		this.setActive(activeindex);
		return this;
	}
	Wizard.prototype.setActive = function(activeindex) {
		if (activeindex < 0) {
			return;
		}
		if (activeindex >= this.$pills.length) {
			return;
		}
		if (!this.beforeChange(activeindex, this.$pills, this.$spans)) {
			return;
		}
		this.$pills.each(function(index, $pill) {
			$pill = $($pill);
			if (index <= activeindex) {
				$pill.addClass('active');
			} else {

				$pill.removeClass('active');
			}
		});

		this.$spans.each(function(index, $span) {
			$span = $($span);
			if (index == activeindex) {
				$span.addClass('active');
			} else {
				$span.removeClass('active');
			}
		});
		this.$bar.css('width', (100 * (activeindex + 1) / this.$pills.length) + '%');
		this.activeindex = activeindex;

		this.initButton();
		if (!this.afterChange(activeindex, this.$pills, this.$spans)) {
			return;
		}
	}

	Wizard.prototype.bindClick = function() {
		if (this.binded) {
			return;
		}
		this.binded = true;
		var this_ = this;
		this.$prev.click(function() {
			if ($(this).hasClass('disabled')) {
				return;
			}
			var activeindex = this_.activeindex;
			this_.setActive(activeindex - 1);
		});
		this.$next.click(function() {
			if ($(this).hasClass('disabled')) {
				return;
			}
			var activeindex = this_.activeindex;
			this_.setActive(activeindex + 1);
		});
		this.$finish.click(function() {
			if ($(this).hasClass('disabled')) {
				return;
			}
			this_.onFinish();
		});
	}
	Wizard.prototype.initButton = function() {
		if (this.hasPrev()) {
			this.$prev.removeClass('disabled');
		} else {
			this.$prev.addClass('disabled');
		}
		this.$finish.addClass('disabled');
		if (this.hasNext()) {
			this.$next.removeClass('disabled');
		} else {
			this.$next.addClass('disabled');
			this.$finish.removeClass('disabled');

		}
	}
	Wizard.prototype.hasPrev = function() {
		if (this.activeindex > 0) {
			return true;
		}
		return false;
	}
	Wizard.prototype.hasNext = function() {
		if (this.activeindex < (this.$pills.length - 1)) {
			return true;
		}
		return false;
	};
	co.component.wizard = {};
	co.component.wizard.create = function(config) {
		return new Wizard(config);
	}

})();
(function() {
	co.element = {};

	var bindFunctionMap = {};
	var bindFunctionList = [];
	co.element.init = function($container) {
		co.input.init();
		co.template.load($container);
		$container = $container || $('body');
		$container = $($container);
		for (type in bindFunctionMap) {
			co.element.init_(type, $container);
		}
		$(bindFunctionList).each(function(index, bindFunction) {
			bindFunction && bindFunction($container);
		});
		co.button.init();
	};

	co.element.init_ = function(type, $container) {
		var config = bindFunctionMap[type];
		if (config && config.bind) {
			var $selectors = $container.find('.element-rule-' + type);
			var bind = config.bind;
			$($selectors).each(function(index, $selector) {
				$selector = $($selector);
				if (!co.element.isBinded($selector, type)) {
					bind($selector);
				}
			});
		}
	};

	co.element.bind = function(arg1, arg2) {
		if (co.isFunction(arg1)) {
			bindFunctionList.push(arg1);
		} else {
			var config = {
				type : arg1,
				bind : arg2
			};
			bindFunctionMap[arg1] = config;
		}
	};

	co.element.isBinded = function($selector, type) {
		$selector = $($selector);
		var must_init = co.isTrue($selector.attr('must-rule-init'));
		var inited = $selector.data('coos-element-rule-' + type + '-binded');
		if (!must_init && inited) {
			return true;
		}
		if ($selector.closest('[coos-model]').length > 0) {
			return true;
		}
		// if ($selector.closest('[coos-template]').length > 0) {
		//
		// }
		$selector.data('coos-element-rule-' + type + '-binded', true);
		return false;
	};
	$(function() {
		co.element.init();
	});
})();
(function() {
	co.element.bind(function(content) {
		content = content || $('body');
		content.find('input:not([autocomplete]),textarea:not([autocomplete]),select:not([autocomplete])').each(function(index, input) {
			var $input = $(input);
			input.setAttribute('autocomplete', 'off');
		});
	});
})();
(function() {

	co.element.bind(function(content) {
		content = content || $('body');
		var elements = $(content).find('.coos-form-add-child-button');

		$(elements).each(function(index, element) {
			element = $(element);
			if (element.data('inited')) {
				return;
			}
			var canbind = false;
			var coreChildForm = element.closest('.coos-child-form');
			var coreChildFormParentContent = coreChildForm.closest('.coos-form-content');
			var mustinit = element.data('mustinit');
			if (mustinit) {
				canbind = true;
			} else if (coreChildFormParentContent.length == 0) {
				canbind = true;
			} else if (coreChildFormParentContent.length > 0) {

			}

			if (canbind) {
				element.data('inited', true);
				bindAddButton(element);
			} else {
			}
		});

		function bindAddButton(element) {
			element = $(element);
			var coreChildForm = element.closest('.coos-child-form');

			var $coreChildFormModel = coreChildForm.find('.coos-form-model:first');
			$coreChildFormModel.remove();
			var coreChildFormModel = $coreChildFormModel.clone();
			var modelName = coreChildFormModel.attr('model-name');
			if (coreChildForm.find('.coos-child-form').length > 0) {

			} else {
				coreChildForm.data('init', function() {
					var forms = coreChildForm.find('[model-name="' + modelName + '"]');
					$(forms).each(function(index, form) {
						form = $(form);
						var sequence = index + 1;
						var data = {};
						form.find('.coos-form-sequence:first').text(sequence);

						var sequence = form.find('[for-sequence]:first');
						if (sequence.length > 0) {
							var sequenceName = sequence.attr('name');
							data[sequenceName] = sequence;
							co.form.full(form, data);
						}
					});
				});
				coreChildForm.data('append', function() {
					var coreFormAddBefore = coreChildForm.attr('coos-form-add-before');
					var coreFormAddAfter = coreChildForm.attr('coos-form-add-after');
					var model = coreChildFormModel.clone();
					var aids = model.find('.coos-need-init-group-aid');
					var modelName = model.attr('model-name');
					$(aids).each(function(index, aid) {
						aid = $(aid);
						var aidModelName = aid.closest('[model-name]').attr('model-name');
						if (aidModelName == modelName) {
							aid.removeClass('coos-need-init-group-aid').addClass('coos-need-init-group');
							aid.removeClass('inputtype-select-aid').addClass('inputtype-select');
						}
					});
					model.removeAttr('coos-model')
					element.closest('.coos-child-form-footer').before(model);
					co.element.init(model);
					if (!co.isEmpty(coreFormAddBefore)) {
						eval('(' + coreFormAddBefore + ')')(model);
					}
					if (coreChildForm.data('coos-form-add-before')) {
						coreChildForm.data('coos-form-add-before')(model);
					}
					model.find('.coos-form-add-child-button').data('mustinit', true);
					co.element.init(coreChildForm);

					model.find('.coos-form-delete-button:first').click(function() {
						var button = $(this);
						var form = button.closest('.coos-form');
						co.box.confirm("确定要删除该表单？", function() {
							var coreFormDeleteBeforeFun = button.attr('coos-form-delete-before');
							var coreFormDeleteAfterFun = button.attr('coos-form-delete-after');
							var coreFormDeleteBefore = button.data('coos-form-delete-before');
							var coreFormDeleteAfter = button.data('coos-form-delete-after');
							if (!co.isEmpty(coreFormDeleteBeforeFun)) {
								var result = eval('(' + coreFormDeleteBeforeFun + ')')(form);
								if (co.isBoolean(result) && !result) {
									return;
								}
							}
							if (coreFormDeleteBefore) {
								var result = coreFormDeleteBefore(form);
								if (co.isBoolean(result) && !result) {
									return;
								}
							}
							model.remove();
							coreChildForm.data('init')();
							if (!co.isEmpty(coreFormDeleteAfterFun)) {
								var result = eval('(' + coreFormDeleteAfterFun + ')')(form);
								if (co.isBoolean(result) && !result) {
									return;
								}
							}
							if (coreFormDeleteAfter) {
								var result = coreFormDeleteAfter(form);
								if (co.isBoolean(result) && !result) {
									return;
								}
							}

						}, function() {
						})
					});
					model.find('.coos-form-minus-button:first').click(function() {
						if ($(this).data('minus-status') == 1) {
							$(this).data('minus-status', 0);
							model.find('.coos-form-content:first').show();
						} else {
							$(this).data('minus-status', 1);
							model.find('.coos-form-content:first').hide();

						}
					});

					coreChildForm.data('init')();
					if (coreChildForm.data('coos-form-add-after')) {
						coreChildForm.data('coos-form-add-after')(model);
					}
					if (!co.isEmpty(coreFormAddAfter)) {
						eval('(' + coreFormAddAfter + ')')(model);
					}
				});
				element.click(function() {
					coreChildForm.data('append')();

				});
				if (coreChildForm.find('.coos-form:first').length > 0) {

				} else {
					if (!co.isEmpty(element.attr('need-init-one'))) {
						element.click();
					}
				}
			}
		}
	});
})();
(function() {

	co.element.bind('image', function($selector) {
		$selector = $($selector);
		var path = $selector.attr('coos-path') || $selector.attr('path');
		var tagName = $selector[0].tagName;
		var noimg = co.resource.images.noimg;
		var notfindimg = co.resource.images.notfindimg;
		if (!co.isEmpty($selector.attr('no-path'))) {
			noimg = $selector.attr('no-path');
			noimg = co.url.format(noimg);
		}
		if (!co.isEmpty($selector.attr('not-find-path'))) {
			notfindimg = $selector.attr('not-find-path');
			notfindimg = co.url.format(notfindimg);
		}
		if (co.isEmpty(path)) {
			if (tagName == 'IMG') {
				$selector.attr('src', noimg);
			} else {
				$selector.css('background-image', 'url("' + noimg + '")');
			}
			return;
		}
		if (path.indexOf(co.input.file.divider) > 0) {
			path = path.split(co.input.file.divider)[0];
		}
		if (path.indexOf('http') < 0) {
			if ($selector.attr('use-file-server-url')) {
				path = co.config.server.fileServerUrl + path;
			} else {
				path = basePath + path;
			}
		}
		var img = new Image();
		img.onerror = function() {
			if (tagName == 'IMG') {
				$selector.attr('src', notfindimg);
			} else {
				$selector.css('background-image', 'url("' + notfindimg + '")');
			}
		};
		img.onload = function() {
			if (tagName == 'IMG') {
				$selector.attr('src', this.src);
			} else {
				$selector.css('background-image', 'url("' + this.src + '")');
			}
		};
		img.src = path;
	});

})();
(function() {
	co.element.bind('move', function($selector) {
		co.plugin.load("draggabilly", function() {
			$selector.draggabilly({
				handle : '.handle'
			});
		});
	});
})();
(function() {
	var html = '<div class="coos-col-12 coos-panel" >' + '<div class="coos-panel-header bordered">' + '<h3 class="coos-panel-title"> </h3>' + '<div class="coos-panel-menu">'
			+ '<div class=" coos-menu baseMinimizeBtn"> ' + '<i class="fa fa-minus"></i> ' + '</div>	' + '<div class=" coos-menu removePanelBtn"> ' + '<i class="fa fa-remove"></i> ' + '</div>'
			+ '</div>' + '</div>' + '' + '<div class="coos-panel-body">' + '</div>' + '' + '</div>';
	co.element.bind('panel', function($selector) {
		var type = $selector.attr('panel-type');
		// 列尺寸
		var columnsize = $selector.attr('column-size');
		var panelheight = $selector.attr('panel-height');
		var panelwidth = $selector.attr('panel-width');

		columnsize = columnsize || 12;
		columnsize = columnsize > 12 ? 12 : columnsize;
		var title = $selector.attr('coos-title');
		var panelClass = $selector.attr('coos-panel-class');
		var panelHeaderClass = $selector.attr('coos-panel-header-class');
		var panelBodyClass = $selector.attr('coos-panel-body-class');
		if (co.isEmpty(type)) {
			type = 1;
		}
		var panel = $(html);
		var content = panel.find('.coos-panel-body');
		if (!co.isEmpty(panelheight)) {
			content.css("height", panelheight);
			panel.addClass("fixed-height");
		}
		if (!co.isEmpty(panelwidth)) {
			panel.css("width", panelwidth);
			panel.addClass("fixed-width");
		}
		panel.find('.coos-panel-title').text(title);
		if (type == 1) {
			panel.addClass('coos-panel-light coos-panel-bd-top');
		} else if (type == 2) {
			panel.addClass('coos-panel-light ');
		} else if (type == 3) {
			panel.find('.coos-panel-header ').hide();
		} else if (type == 4) {
			panel.addClass('coos-panel-light ');
			panel.find('.coos-panel-header ').removeClass('bordered');
			panel.find('.coos-panel-title').html('&nbsp;');
		}
		panel.addClass('coos-col-' + columnsize);
		if (!co.isEmpty(panelClass)) {
			panel.addClass(panelClass);
		}
		if (!co.isEmpty(panelHeaderClass)) {
			panel.find('.coos-panel-header ').addClass(panelHeaderClass);
		}
		if (!co.isEmpty(panelBodyClass)) {
			panel.find('.coos-panel-body ').addClass(panelBodyClass);
		}
		$selector.before(panel);
		$selector.appendTo(content);

	});

	$(function() {
		$('html').on('click', '.coos-panel .removePanelBtn', function(e) {
			$(this).closest('.coos-panel').remove();
		});
		$('html').on('click', '.baseSetPanelColorBtn', function(e) {
			var $panel = $(this).closest('.coos-panel');
			var place = $(this).attr('coos-place');
			var color = $(this).attr('coos-color');
			place = co.isEmpty(place) ? '' : place;
			var places = place.split(',');
			var hasBody = false;
			$(places).each(function(index, place) {
				var $content = null;
				if (place == 'header') {
					$content = $panel.find('.coos-panel-header:first');
				} else if (place == 'body') {
					$content = $panel.find('.coos-panel-body:first');
					hasBody = true;
				} else {
					$content = $panel;
				}
				$content.removeClass('coos-bg-red coos-bg-green coos-bg-grey coos-bg-blue coos-bg-yellow  ');
				$content.addClass(color);
			});
			if (hasBody) {
				$panel.addClass('coos-panel-dark').removeClass('coos-panel-light');
			}
		});

		$('html').on('click', '.coos-panel .baseMinimizeBtn', function(e) {
			var content = $(this).closest('.coos-panel').find('.coos-panel-body');
			var $panel = $(this).closest('.coos-panel');
			if ((content).is(":hidden")) {
				content.slideDown('fast');
			} else {
				content.slideUp('fast');
			}
		});
	});

})();
(function() {
	co.element.bind(function(content) {
		content = content || $('body');
		var elements = $(content).find('.coos-need-init-scroll');
		if (elements.length > 0) {
			co.plugin.load("mCustomScrollbar", function() {
				$(elements).each(function(index, element) {
					if (co.element.isInited(element, 'coos-need-init-scroll')) {
						return;
					}
					element = $(element);
					element.mCustomScrollbar({
						set_height : function() {
							$(this).css('max-height', $(this).data('scroll-height'));
							return $(this).data('scroll-height');
						},
						mouseWheel : "auto",
						autoDraggerLength : true,
						autoHideScrollbar : true,
						advanced : {
							updateOnBrowserResize : true,
							updateOnContentResize : true
						}
					});
				});
			});
		}
	});
})();
(function() {

	var sortableindex = 1;
	co.element.bind(function(content) {
		content = content || $('body');

		var sortables = $(content).find('.coos-need-init-sortable');
		if (sortables.length > 0) {
			co.plugin.load("jquery_sortable", function() {

				$(sortables).each(function(index, sortable) {
					sortable = $(sortable);
					sortableindex++;
					var thisindex = sortableindex;
					var sortable_one = sortable.attr('sortable-one');
					var ones = sortable.find(sortable_one);
					if (ones.length < 0) {
						return;
					}
					sortable.attr('sortableindex', thisindex);
					sortable.sortable({
						opacity : 0.35,
						update : function(e, t) {
							var tablename = sortable.attr('tablename');
							var tableid = sortable.attr('tableid');
							var sequencecolumnname = sortable.attr('sequencecolumnname');
							var primarykeycolumnname = sortable.attr('primarykeycolumnname');
							sequencecolumnname = sequencecolumnname || 'sequence';
							var idstr = '';
							ones = $("[sortableindex=" + thisindex + "]").find(sortable_one);
							ones.each(function(index, one) {
								idstr += $(one).attr('coos-recordid') + ",";
								$(one).find('[name="' + sequencecolumnname + '"]').val(index + 1);
							});
							if (((tablename != null && tablename != '') || (tableid != null && tableid != '')) && idstr != null && idstr != '') {
								var data = {};
								if (tablename != null && tablename != '') {
									data.tablename = tablename;
								}
								if (tableid != null && tableid != '') {
									data.tableid = tableid;
								}
								data.primarykeycolumnname = primarykeycolumnname;
								data.sequencecolumnname = sequencecolumnname;
								data.idstr = idstr;
								var action = "core/data/sortable.data";
								co.POST(action, data, 'json', function(o) {
									if (sortable.data('sortableChange')) {
										sortable.data('sortableChange')(e, t);
									}
								});
							} else {
								if (sortable.data('sortableChange')) {
									sortable.data('sortableChange')(e, t);
								}
							}
						}
					});

				});

			});
		}
	});
})();
(function() {
	co.element.bind(function($selector) {
		// 下拉框
		var actives = $selector.find('.coos-tab-buttons>[coos-target].active,.coos-tab-one>[coos-target].active');

		$(actives).each(function(index, active) {
			chooseOne($(active));
		});
	});
	function chooseOne($li) {
		var $li = $($li);
		var $tag = $li.closest('.coos-tab');
		var $tag_ones = $tag.find('>.coos-tab-one');
		var $spans = $tag.find('>.coos-tab-spans>.coos-tab-span,>.coos-tab-one>.coos-tab-span');
		var $lis = $tag.find('>.coos-tab-buttons>[coos-target],>.coos-tab-one>[coos-target]');
		var $target = $tag.find($li.attr('coos-target'));
		if ($li.length == 0 || $target.length == 0) {
			return;
		}
		$lis.each(function(index, li) {
			if (li == $li[0]) {
				$li.addClass('active');
			} else {
				$(li).removeClass('active');
			}
		});
		$spans.each(function(index, span) {
			if (span == $target[0]) {
				$target.addClass('active');
				// if ($(span).parent().hasClass('coos-tab-one')) {
				// $(span).slideDown();
				// }
			} else {
				$(span).removeClass('active');
				// if ($(span).parent().hasClass('coos-tab-one')) {
				// $(span).slideUp();
				// }
			}
		});
	}
	$(function() {
		$('html').on('click', '.coos-tab-buttons>[coos-target]', function() {
			var $this = $(this);
			chooseOne($this);
		});
		$('html').on('click', '.coos-tab-one>[coos-target]', function() {
			var $this = $(this);
			chooseOne($this);
		});
	})
})();
(function() {
	co.element.bind("data-tables", function($selector) {
		co.plugin.load("data_tables", function() {
			var pagesize = 10;
			var viewrowindex = $selector.attr('viewrowindex');
			var viewpageindex = $selector.attr('viewpageindex') || 1;
			var datatable = $selector.dataTable({
				bSort : false
			});
			if (viewrowindex) {
				var pageindex = viewrowindex % pagesize == 0 ? viewrowindex / pagesize : Math.ceil(viewrowindex / pagesize);

			}
			if (viewpageindex) {
				pageindex = viewpageindex;
			}
			if (pageindex < 1) {
				pageindex = 1;
			} else if (pageindex > datatable.fnPagingInfo().iTotalPages) {
				pageindex = datatable.fnPagingInfo().iTotalPages;
			}
			datatable.fnPageChange(pageindex - 1);
		});
	});
})();
(function() {
	co.form = {};

	co.form.clear = function(form) {
		var form = $(form);
		var parameters = form.find('.elementparameter,.parameter');
		$(parameters).each(function(index, parameter) {
			parameter = $(parameter);
			if (parameter.attr('not-clear')) {
				return;
			}
			var name = parameter.attr('name');
			var value = parameter.attr('defaultvalue');
			var eles = form.find('[name=' + name + ']');
			if (eles.size() > 0 && eles.get(0).type == 'radio') {
				if (value == true) {
					value = '1';
				}
				if (value == null || value == '' || value == false) {
					value = '0';
				}
				for (var m = 0; m < eles.length; m++) {
					if (eles[m].value == value) {
						eles[m].checked = 'checked';
					}
				}
			} else {
				if (parameter.data('bootstrapSwitch')) {
					var v = false;
					if (co.isBoolean(value)) {
						v = value;
					} else {
						if (co.isEmpty(value) || value == '0') {
							v = false;
						} else {
							v = true;
						}
					}
					parameter.get(0).checked = v;
					parameter.change();
				} else {
					form.find('[name=' + name + ']').val(value).change();
				}
			}
		});
	};
	co.form.full = function(form, data) {
		data = data || {};
		form = $(form);
		var modelName = form.attr('model-name');
		modelName = modelName || '';

		var elements = form.find('[name].parameter');
		for ( var name in data) {
			var $addModelButton = form.find('[add-model-button="' + name + '"]:first');
			if ($addModelButton.length > 0) {
				var value = data[name];
				if (value != null) {
					var object = value;
					if (co.isString(value)) {
						if (co.isEmpty(value)) {
							continue;
						}
						object = JSON.parse(value);
					}
					var list = [ object ];
					if (co.isArray(object)) {
						list = object;
					}
					$(object).each(function(index, one) {
						$addModelButton.click();
						var $form_ = form.find('[model-name="' + name + '"]').get(index);
						$form_ = $($form_);
						co.form.full($form_, one);
					});

				}
			}

		}
		$(elements).each(function(index, element) {

			element = $(element);
			if (element.closest('[model-name]').length > 0 && element.closest('[model-name]').attr('model-name') != modelName) {
				return;
			}
			var name = element.attr('name');
			var needchange = false;
			var relationelements = form.find('[rule-relation=' + name + ']');
			if (relationelements.length > 0) {
				needchange = true;
			}
			if (element.attr('need-full-change') == 'true') {
				needchange = true;
			}
			var value = data[name];
			if (element.get(0).type == 'radio') {
				if (value != null) {
					if (typeof (value) == 'boolean') {
						if (value) {
							value = 1;
						} else {
							value = 0;
						}
					}
					var radios = form.find('[name=' + name + ']');
					$(radios).each(function(radioindex, radio) {

						if ($(radio).closest('[model-name]').length > 0 && $(radio).closest('[model-name]').attr('model-name') != modelName) {
							return;
						}
						if (radio.value == value) {
							radio.checked = 'checked';
						} else {
							$(radio).removeAttr('checked');
						}
					})
				}
			} else if (element.get(0).type == 'checkbox') {
				var elements = form.find('[name=' + name + ']');
				$(elements).removeAttr('checked');
				if (value != null) {
					if (element.data('bootstrapSwitch') || element.attr('isswitch')) {
						var v = false;
						if (co.isBoolean(value)) {
							v = value;
						} else {
							if (co.isEmpty(value) || value == '0') {
								v = false;
							} else {
								v = true;
							}
						}
						element.get(0).checked = v;
						element.change();
					} else {
						var values = [];
						if (!co.isEmpty(value)) {
							if (co.isBoolean(value)) {
								values = [ value ];
							} else {
								values = value.split(',');
							}
						}
						$(elements).each(function(index, element) {

							if ($(element).closest('[model-name]').length > 0 && $(element).closest('[model-name]').attr('model-name') != modelName) {
								return;
							}
							var has = false;
							$(values).each(function(index, v) {
								if (co.isEmpty(v)) {
									return;
								}
								if (element.value == v) {
									has = true;
								}
							});
							if (has) {
								element.checked = 'checked';
							} else {
								$(element).removeAttr('checked');
							}
						});
					}

				}
			} else {
				if (value != null) {
					element.val(value);
					if (needchange) {
						element.change();
					}
				} else {
					if (typeof (value) != 'undefined') {
						if (element.get(0).type != 'radio') {
							element.val('');
							if (needchange) {
								element.change();
							}
						}
					}
				}
			}
		});
	}

	function validateFormData(form, showerror) {
		if (co.isEmpty(showerror)) {
			showerror = true;
		}
		form = $(form);
		var data = {};
		var parameters = form.find('.elementparameter,.parameter').removeClass('coos-validate-error');
		for (var i = 0; i < parameters.length; i++) {
			var element = $(parameters[i]);
			if (element.data('not-get-date')) {
				continue;
			}
			var result = co.form.input.validate(form, element);
			if (!result.valid) {
				// 验证表单错误显示错误信息
				var code = result.error.code;
				var message = result.error.show;

				(element).addClass('coos-validate-error');

				var ishidden = element.is(":hidden");
				if (ishidden) {
					if (!co.isVisible(element.parent())) {
						$("body").animate({
							scrollTop : element.parent().offset().top - 100
						}, 200);
					}
				} else {
					if (!co.isVisible(element)) {
						$("body").animate({
							scrollTop : element.offset().top - 100
						}, 200);
					}
				}
				if (showerror) {
					if (co.isPC()) {
						co.box.info(message);
					} else {
						co.box.info(message);
					}
				}
				// 处理验证错误的字符串
				throw co.error(code, message, element);
			} else {
				$(element).removeClass('coos-validate-error');
				data[result.name] = result.value;
			}
		}
		return data;
	}
	/**
	 * 验证表单
	 * 
	 * @param form
	 * @returns {Boolean} 验证失败会抛出异常 可以使用e.message e.description
	 */
	co.form.validate = function(form, showerror) {
		if (co.isEmpty(showerror)) {
			showerror = true;
		}
		form = $(form);

		form.find('.elementparameter,.parameter').data('not-get-date', false);
		var models = form.find('[model-name]');
		models.find('.elementparameter,.parameter').data('not-get-date', true);
		var data = validateFormData(form, showerror);
		var models = form.find('[model-name]');
		var modelMap = {};
		$(models).each(function(index, model) {
			model = $(model);
			var modelName = model.attr('model-name');
			modelMap[modelName] = modelName;
		});

		var m = {};
		for ( var modelName in modelMap) {
			var modelForms = form.find('[model-name="' + modelName + '"]');
			var hasParentModel = false;
			for ( var modelName_ in modelMap) {
				if (modelName_ != modelName) {
					var fs = modelForms.closest('[model-name="' + modelName_ + '"]');
					if (fs.length > 0) {
						hasParentModel = true;
					}
				}
			}
			if (!hasParentModel) {
				m[modelName] = modelName;
			}
		}
		for ( var modelName in m) {
			var modelForms = form.find('[model-name="' + modelName + '"]');

			var modelDatas = [];
			var datatype = "ONE";
			var setname = "";
			$(modelForms).each(function(index, modelForm) {
				modelForm = $(modelForm);
				datatype = modelForm.attr('coos-data-type') || 'ONE';
				setname = modelForm.attr('model-set-name') || '';
				var modelData = co.form.validate(modelForm, showerror);
				modelDatas[modelDatas.length] = modelData;
			});
			if (datatype == 'ONE') {
				// data['model_' + modelName] = modelDatas[0];
				if (co.isEmpty(setname)) {
					var modelData = modelDatas[0];
					for ( var n in modelData) {
						data[n] = modelData[n];
					}
				} else {
					data[setname] = JSON.stringify(modelDatas[0]);
				}
			} else {

				var $childForm = form.find('[model-name="' + modelName + '"]').closest('.coos-child-form');
				var deleteDatas = $childForm.data('delete-datas');
				if (co.isEmpty(setname)) {
					setname = modelName + '_datas';
				}
				// data['model_' + modelName] = modelDatas;
				data[setname] = JSON.stringify(modelDatas);
				if (deleteDatas && deleteDatas.length > 0) {
					data[modelName + '_for_delete_jsonarray'] = JSON.stringify(deleteDatas);
				}
			}
		}

		return data;
	}
})();
(function() {
	co.form.input = {};
})();
(function() {
	co.form.input.getForm = function(element) {
		return $(element).closest('form');
	}
	co.form.input.validate = function(form, element) {
		var data = {};
		data.valid = true;
		var $form = $(form);
		var $element = $(element);
		var name = $element.attr('name');
		data.name = name;
		var pattern = $element.attr('pattern') || false;

		var label = $element.attr('label');
		var re = new RegExp(pattern);
		var $radioGroup = null;
		var $checkboxGroup = null;
		var value = null;
		if ($element.is('[type=checkbox]')) {
			if ($element.data('bootstrapSwitch')) {
				if ($element.val() == 'true' || $element.val() == '1' || $element[0].checked) {
					value = 1;
				} else {
					value = 0;
				}
			} else {

				$checkboxGroup = $form.find('input[name="' + name + '"]');
				$element = $checkboxGroup.first();
				var thisvalue = "";
				$form.find("input[name='" + name + "']:checked").each(function() {
					thisvalue += $(this).val() + ',';
				});
				if (thisvalue.length > 0) {
					thisvalue = thisvalue.substring(0, thisvalue.length - 1);
					value = thisvalue;
				}
				if ($element.attr('isswitch')) {
					if (co.isEmpty(value)) {
						value = 0;
					} else {
						value = 1;
					}
				}
			}
		} else if ($element.is('[type=radio]')) {
			$radioGroup = $form.find('input[name="' + name + '"]');
			$element = $radioGroup.first();
			value = $form.find("input[name='" + name + "']:checked").val();
		} else {
			value = $element.val();
		}
		var filterMode = $element.attr('filterMode');
		if (co.isEmpty(filterMode)) {
			filterMode = false;
		}
		if (co.isString(filterMode)) {
			if (filterMode == 'true' || filterMode == '1') {
				filterMode = true;
			} else {
				filterMode = false;
			}
		}
		if (filterMode) {
			value = co.filterMode(value);
		} else {
		}
		data.value = value;
		var cannull = element.attr('cannull');
		cannull = cannull == null || cannull == 'true' || cannull == '1' ? true : false;
		var ishidden = $element.is(":hidden");
		var mustvalidate = $element.attr('mustvalidate') != null;
		var isreadonly = $element.attr('readonly') != null;
		var ismailbox = $element.attr('ismailbox') != null;
		var isnumber = $element.attr('isnumber') != null;
		var isphone = $element.attr('isphone') != null;
		var istel = $element.attr('istel') != null;
		var isurl = $element.attr('isurl') != null;
		var isdate = $element.attr('isdate') != null;
		var istime = $element.attr('istime') != null;
		var isdatetime = $element.attr('isdatetime') != null;
		var isinteger = $element.attr('isinteger') != null;
		var isidcard = $element.attr('isidcard') != null;
		var ischinese = $element.attr('iscn') != null;

		var isenglish = $element.attr('isen') != null;
		var ischinese_or_english = $element.attr('iscn-or-en') != null;
		var isenglish_or_number = $element.attr('isen-or-num') != null;
		var isenglish_or_number_or_underline = $element.attr('isen-or-num-or-ul') != null;
		var isenglish_or_number_or_underline_or_slash = $element.attr('isen-or-num-or-ul-or-sl') != null;
		var isenglish_or_number_or_underline_or_point = $element.attr('isen-or-num-or-ul-or-po') != null;
		var isno_symbol = $element.attr('isnosymbol') != null;

		var validate = $element.attr('coos-validate');
		var minlength = parseInt($element.attr('minlength'), 10);
		var maxlength = parseInt($element.attr('maxlength'), 10);
		var eq = $element.attr('eq');
		var gt = $element.attr('gt');
		var gte = $element.attr('gte');
		var lt = $element.attr('lt');
		var lte = $element.attr('lte');
		var eqTo = $element.data('eqTo');
		var gtTo = $element.attr('gtTo');
		var gteTo = $element.attr('gteTo');
		var ltTo = $element.attr('ltTo');
		var lteTo = $element.attr('lteTo');
		if (eqTo) {
			eq = $(eqTo).val();
		}
		if (gtTo) {
			gt = $(gtTo).val();
		}
		if (gteTo) {
			gte = $(gteTo).val();
		}
		if (ltTo) {
			lt = $(ltTo).val();
		}
		if (lteTo) {
			lte = $(lteTo).val();
		}

		if (eq || gt || gte || lt || lte) {
			var v = co.getNowDate();
			if (isdate) {
				v = co.getNowDate();
			} else if (isdatetime) {
				v = co.getNowDatetime();
			} else if (istime) {
				v = co.getNowTime();
			}
			if (co.has(eq, '$now')) {
				eq = v;
			}
			if (co.has(gt, '$now')) {
				gt = v;
			}
			if (co.has(gte, '$now')) {
				gte = v;
			}
			if (co.has(lt, '$now')) {
				lt = v;
			}
			if (co.has(lte, '$now')) {
				lte = v;
			}
		}
		// 隐藏和不是必须验证的直接返回
		if ((ishidden || isreadonly) && !mustvalidate) {
			data.valid = true;
		} else {
			if (!cannull && co.isEmpty(value)) {
				data.valid = false;
				data.error = co.config.error.isNull;
			} else if (!co.isEmpty(value)) {
				if (pattern && !re.test(value)) {
					data.valid = false;
					data.error = co.config.error.patternMismatch;
				}
				if (value.length > maxlength) {
					data.valid = false;
					data.error = co.config.error.isLong;
				}
				if (value.length < minlength) {
					data.valid = false;
					data.error = co.config.error.isShort;
				}
				if (isurl && !co.isUrl(value)) {
					data.valid = false;
					data.error = co.config.error.isNotUrl;
				}
				if (isphone && !co.isPhone(value)) {
					data.valid = false;
					data.error = co.config.error.isNotPhone;
				}
				if (istel && !co.isTel(value)) {
					data.valid = false;
					data.error = co.config.error.isNotTel;
				}
				if (ismailbox && !co.isMailbox(value)) {
					data.valid = false;
					data.error = co.config.error.isNotMail;
				}
				if (isidcard && !co.isIDCard(value)) {
					data.valid = false;
					data.error = co.config.error.isNotIDCard;
				}
				if (isnumber && !co.isNumber(value)) {
					data.valid = false;
					data.error = co.config.error.isNotNumber;
				}
				if (isinteger && !co.isInteger(value)) {
					data.valid = false;
					data.error = co.config.error.isNotInteger;
				}
				if (isdate && !co.isDate(value)) {
					data.valid = false;
					data.error = co.config.error.isNotDate;
				}
				if (isdatetime && !co.isDatetime(value)) {
					data.valid = false;
					data.error = co.config.error.isNotDatetime;
				}
				if (istime && !co.isTime(value)) {
					data.valid = false;
					data.error = co.config.error.isNotTime;
				}
				if (ischinese && !co.isChinese(value)) {
					data.valid = false;
					data.error = co.config.error.isNotChinese;
				}
				if (isenglish && !co.isEnglish(value)) {
					data.valid = false;
					data.error = co.config.error.isNotEnglish;
				}
				if (ischinese_or_english && !co.isChineseOrEnglish(value)) {
					data.valid = false;
					data.error = co.config.error.isNotChineseOrEnglish;
				}
				if (isenglish_or_number && !co.isEnglishOrNumber(value)) {
					data.valid = false;
					data.error = co.config.error.isNotEnglishOrNumber;
				}
				if (isenglish_or_number_or_underline && !co.isEnglishOrNumberOrUnderline(value)) {
					data.valid = false;
					data.error = co.config.error.isNotEnglishOrNumberOrUnderline;
				}
				if (isenglish_or_number_or_underline_or_slash && !co.isEnglishOrNumberOrUnderlineOrSlash(value)) {
					data.valid = false;
					data.error = co.config.error.isNotEnglishOrNumberOrUnderlineOrSlash;
				}
				if (isenglish_or_number_or_underline_or_point && !co.isEnglishOrNumberOrUnderlineOrPoint(value)) {
					data.valid = false;
					data.error = co.config.error.isNotEnglishOrNumberOrUnderlineOrPoint;
				}
				
				if (isno_symbol && co.hasSymbol(value)) {
					data.valid = false;
					data.error = co.config.error.isNotNoSymbol;
				}

				var value_ = value;

				var eq_ = eq;
				var gt_ = gt;
				var gte_ = gte;
				var lt_ = lt;
				var lte_ = lte;
				if (isdate || isdatetime || istime) {
					value_ = value.replace(/\D/g, "");
					if (eq_) {
						eq_ = eq_.replace(/\D/g, "");
					}
					if (gt_) {
						gt_ = gt_.replace(/\D/g, "");
					}
					if (gte_) {
						gte_ = gte_.replace(/\D/g, "");
					}
					if (lt_) {
						lt_ = lt_.replace(/\D/g, "");
					}
					if (lte_) {
						lte_ = lte_.replace(/\D/g, "");
					}
				}
				if (eq_ && value_ != eq_) {
					data.valid = false;
					data.error = co.config.error.notEq;
				}
				if (gt_ && Number(value_) <= Number(gt_)) {
					data.valid = false;
					data.error = co.config.error.notGt;
				}
				if (gte_ && Number(value_) < Number(gte_)) {
					data.valid = false;
					data.error = co.config.error.notGte;
				}
				if (lt_ && Number(value_) >= Number(lt_)) {
					data.valid = false;
					data.error = co.config.error.notLt;
				}
				if (lte_ && Number(value_) > Number(lte_)) {
					data.valid = false;
					data.error = co.config.error.notLte;
				}
			}
		}

		if (validate) {
			validate = eval('(' + validate + ')');
			validate(data, $element, $form);
		}

		if (data.error) {
			var error = jQuery.extend(true, {}, {}, data.error);
			var show = error.show;
			show = show.replace(/\$label/g, label).replace(/\$minlength/g, minlength).replace(/\$maxlength/g, maxlength).replace(/\$eq/g, eq).replace(/\$gte/g, gte).replace(/\$gt/g, gt).replace(
					/\$lte/g, lte).replace(/\$lt/g, lt);

			error.show = show;
			data.error = error;
		}

		return data;
	};
})();
(function() {
	co.input = new Object();

	var bindFunctionMap = {};
	co.input.init = function($container) {
		$container = $container || $('body');
		$container = $($container);
		co.input.init_('group', $container);
		for (type in bindFunctionMap) {
			if (type != 'group') {
				co.input.init_(type, $container);
			}
		}
	};

	co.input.init_ = function(type, $container) {
		var config = bindFunctionMap[type];
		if (config && config.bind) {
			var $selectors = $container.find('.input-rule-' + type);
			var bind = config.bind;
			$($selectors).each(function(index, $selector) {
				$selector = $($selector);
				if (!co.input.isBinded($selector, type)) {
					bind($selector);
				}
			});
		}
	};

	co.input.bind = function(type, bindFunction) {
		var config = {
			type : type,
			bind : bindFunction
		};
		bindFunctionMap[type] = config;
	};

	co.input.isBinded = function($selector, type) {
		$selector = $($selector);
		var inited = $selector.data('coos-input-rule-' + type + '-binded');
		if (inited) {
			return true;
		}
		if ($selector.closest('[coos-model]').length > 0) {
			return true;
		}
		// if ($selector.closest('[coos-template]').length > 0) {
		//
		// }
		$selector.data('coos-input-rule-' + type + '-binded', true);
		return false;
	};
	$(function() {
		co.input.init();
	});
})();
(function() {

	co.input.bind('checkbox-tag', function($selector) {
		var optionGroup = $('<div class="coos-text-tag-group"></div>');
		var name = $selector.attr('name');
		$selector.before(optionGroup);
		$selector.hide();
		var options = $selector.parent().find('select.option-select').find('option');
		options.each(function(index, option) {
			option = $(option);
			var value = option.attr('value');
			var text = option.text();
			var $tag = $('<div class="coos-text-tag"></div>');
			$tag.attr('value', value);
			$tag.attr('text', text);
			$tag.append('<span class="text">' + text + '</span>')
			optionGroup.append($tag);
		});
		optionGroup.find('.coos-text-tag').click(function() {
			var value = '';
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');

			}
			$(optionGroup.find('.coos-text-tag.active')).each(function(index, one) {
				value += $(one).attr('value') + ',';
			});
			$selector.val(value);
			if (co.isEmpty(value)) {
				$(optionGroup.find('.coos-text-tag')).each(function(index, one) {
					if (co.isEmpty($(one).attr('value'))) {
						$(one).addClass('active');
					}
				});
			}
			isFullChange = false;
			$selector.change();
			isFullChange = true;
		});
		var isFullChange = true;
		$selector.change(function() {
			var value = this.value;
			if (isFullChange) {
				var $tags = optionGroup.find('.coos-text-tag');
				$tags.removeClass('active');
				if (!co.isEmpty(value)) {
					var vs = value.split(',');
					$(vs).each(function(index, v) {
						optionGroup.find('[value="' + v + '"].coos-text-tag').addClass('active');
					});
				}
			}
		});
	});

	$(function() {

	});
})();
(function() {

	co.input.bind('checkbox', function($selector) {
		var optionGroup = $('<div class="coos-checkbox-group"></div>');
		var name = $selector.attr('name');
		$selector.before(optionGroup);
		$selector.hide();
		$selector.removeAttr('name');
		if (co.isEmpty(name)) {
			name = "checkbox_" + co.getNumber();
		}
		var options = $selector.parent().find('select.option-select').find('option');
		options.each(function(index, option) {
			option = $(option);
			var value = option.attr('value');
			var text = option.text();
			var $input = $('<input class="parameter " name="' + name + '" value="' + value + '" type="checkbox" />');
			var $span = $('<span class="label">' + text + '</span>');
			optionGroup.append($input);
			optionGroup.append($span);
		});
		optionGroup.find('[name="' + name + '"]').change(function() {
			var value = '';
			$(optionGroup.find('[name="' + name + '"]')).each(function(index, one) {
				if (one.checked) {
					value += one.value + ',';
				}
			});
			$selector.val(value);
			$selector.change();
		});
	});

	$(function() {

		$('html').on('click', '.coos-checkbox-group .label', function() {
			var $label = $(this);
			var $input = $label.prev();
			if ($input.length > 0 && $input[0].type == 'checkbox') {
				$input.click();
			}
		});

	});
})();
(function() {
	var alleditors = {};
	co.input.bind('codemirror', function($selector) {
		co.plugin.load("codemirror", function() {
			co.plugin.load("emmet", function() {
				$selector = $($selector);
				var mode = $selector.attr('codemirror-mode');
				if (co.isEmpty(mode)) {
					mode = "text/html";
				}
				var editorchangeed = false;
				var editor = CodeMirror.fromTextArea($selector[0], {
					mode : mode,
					lineNumbers : true,
					profile : 'xhtml',
					theme : 'zenburn'
				});
				editor.on("change", function() {
					editorchangeed = true;
					$selector.val(editor.getValue());
					$selector.change();
				});
				$selector.change(function() {
					if (!editorchangeed) {
						editor.setValue($selector.val());
					}
					editorchangeed = false;
				});
				emmetCodeMirror(editor);

			});
		});
	});

})();
(function() {
	co.input.bind('color', function($selector) {
		co.plugin.load("colorpicker", function() {
			var isreadonly = $selector.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
			if (isreadonly) {
				return;
			}

			var afterIcon = $('<span class="coos-input-addon coos-input-addon-after coos-pointer" ></span>');
			$selector.after(afterIcon);
			afterIcon.click(function() {
				$selector.ColorPickerShow();
			});
			$selector.change(function() {
				setCss();
			});
			var setCss = function() {
				var value = $selector.val();
				if (!co.isEmpty(value)) {

					$(afterIcon).css({
						'background-color' : value
					});
				} else {
					$(afterIcon).css({
						'background-color' : 'transparent'
					});
				}

			}
			setCss();
			var colorPicker = $selector.ColorPicker({
				color : '#ff00ff',
				onSubmit : function(hsb, hex, rgb, el) {
					$selector.val('#' + hex);
					$selector.ColorPickerHide();
					$selector.change();
				},
				onBeforeShow : function() {
					$selector.ColorPickerSetColor(this.value);
				},
				onChange : function(hsb, hex, rgb) {
					$selector.val('#' + hex);
					$selector.change();
				}
			}).bind('keyup', function() {
				$(this).ColorPickerSetColor(this.value);
			});
		});
	});

})();
(function() {
	co.input.bind('time', function($selector) {
		loadDatetimepicker(function() {
			initDatetimepicker($selector, "time");
		});
	});
	co.input.bind('date', function($selector) {
		loadDatetimepicker(function() {
			initDatetimepicker($selector, "date");
		});
	});
	co.input.bind('datetime', function($selector) {
		loadDatetimepicker(function() {
			initDatetimepicker($selector, "datetime");
		});
	});

	function loadDatetimepicker(callback) {
		if (co.isPC()) {
			co.plugin.load("jquery_datetimepicker", callback);
		} else {
			co.plugin.load("mobiscroll", callback);
		}

	}

	function bindDatetimepicker(element, type) {
		var minTo = element.attr('minTo');
		var maxTo = element.attr('maxTo');
		if (minTo) {
			$(minTo).change(function() {
				var minDate = $(this).val();
				minDate = getDateByStr(minDate);
				var minTime = $(this).val();
				minTime = getTimeByStr(minTime);

				if (co.isPC()) {
					if (type == 'date') {
						element.data("xdsoft_datetimepicker").setOptions({
							minDate : minDate
						})
					} else if (type == 'time') {
						element.data("xdsoft_datetimepicker").setOptions({
							minTime : minTime
						})
					} else {
						element.data("xdsoft_datetimepicker").setOptions({
							minDate : minDate
						})
					}
				} else {
					var mobiscrollOption = element.data('mobiscrollOption');

					if (type == 'date') {
						mobiscrollOption.minDate = new Date(minDate);
					} else if (type == 'datetime') {
						mobiscrollOption.minDate = new Date(minDate);
					}
					element.mobiscroll(mobiscrollOption);
				}
			});
		}
		if (maxTo) {
			$(maxTo).change(function() {
				var maxDate = $(this).val();
				maxDate = getDateByStr(maxDate);
				var maxTime = $(this).val();
				maxTime = getTimeByStr(maxTime);

				if (co.isPC()) {

					if (type == 'date') {
						element.data("xdsoft_datetimepicker").setOptions({
							maxDate : maxDate
						})
					} else if (type == 'time') {
						element.data("xdsoft_datetimepicker").setOptions({
							maxTime : maxTime
						})
					} else {
						element.data("xdsoft_datetimepicker").setOptions({
							maxDate : maxDate
						})
					}

				} else {
					var mobiscrollOption = element.data('mobiscrollOption');

					if (type == 'date') {
						mobiscrollOption.maxDate = new Date(maxDate);
					} else if (type == 'datetime') {
						mobiscrollOption.maxDate = new Date(maxDate);
					}
					element.mobiscroll(mobiscrollOption);
				}
			});
		}
	}
	function getDateByStr(arg1) {
		arg1 = arg1.replace(/\D/g, '');

		if (arg1.length >= 8) {
			return arg1.substring(0, 4) + "/" + arg1.substring(4, 6) + "/" + arg1.substring(6, 8);
		}
		return "";
	}
	function getTimeByStr(arg1) {
		arg1 = arg1.replace(/\D/g, '');
		if (arg1.length >= 12) {
			return arg1.substring(8, 10) + ":" + arg1.substring(10, 12);
		} else if (arg1.length == 4) {
			return arg1.substring(0, 2) + ":" + arg1.substring(2, 4);
		}
	}

	function initDatetimepicker(element, type) {
		element = $(element);
		var isreadonly = element.attr('isreadonly');
		isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
		if (isreadonly) {
			return;
		}
		bindDatetimepicker(element, type);
		var format = element.attr('format');
		var min = element.attr('min');
		var max = element.attr('max');
		var minTime = false;
		var minDate = false;
		var maxTime = false;
		var maxDate = false;
		var datetimepickerOption = {
			lang : 'ch',
			format : format,
			minDate : minDate,
			scrollMonth : true,
			scrollTime : true,
			scrollInput : false,
			maxDate : maxDate,
			validateOnBlur : false,
			onChangeDateTime : function() {
				element.change();
			}
		};
		// minTo和maxTo值改变的情况下
		var mobiscrollOption = {
			theme : 'android-ics light', // 皮肤样式 //皮肤其他参数【android-ics
			// light】【android-ics】【ios】【jqm】【sense-ui】
			display : 'modal', // 显示方式 【modal】【inline】【bubble】【top】【bottom】
			mode : 'scroller', // 操作方式【scroller】【clickpick】【mixed】
			dateFormat : 'yy-mm-dd',
			timeFormat : 'HH:ii',
			lang : 'zh',
			showNow : true,
			nowText : "现在",
			preset : 'date', // date time datetime
			setText : '确定', // 确认按钮名称
			cancelText : '取消',// 取消按钮名称
			dateOrder : 'yymmdd', // 面板中日期排列格式
			dayText : '日',
			monthText : '月',
			yearText : '年', // 面板中年月日文字
			hourText : '时',
			minuteText : '分' // 面板中年月日文字
		};
		if (!co.isPC()) {
			element.focus(function() {
				element.blur();
				return false;
			});
		}
		if (type == 'datetime') {
			mobiscrollOption.preset = 'datetime';
			if (co.isEmpty(format)) {
				format = "Y-m-d H:i";
			}
			if (min) {
				minDate = getDateByStr(min);
			}
			if (max) {
				maxDate = getDateByStr(max);
			}
			if (minDate) {
				mobiscrollOption.minDate = new Date(minDate);
			}
			if (maxDate) {
				mobiscrollOption.maxDate = new Date(maxDate);
			}
			var value = element.val();
			value = co.date.trim(value);
			element.val(value);
			datetimepickerOption.minDate = minDate;
			datetimepickerOption.maxDate = maxDate;
			datetimepickerOption.format = format;
		} else if (type == 'time') {
			mobiscrollOption.preset = 'time';
			if (co.isEmpty(format)) {
				format = "H:i";
			}
			if (min) {
				minTime = getTimeByStr(min);
			}
			if (max) {
				maxTime = getTimeByStr(max);
			}
			var value = element.val();
			value = co.date.trim(value);
			element.val(value);
			datetimepickerOption.format = format;
			datetimepickerOption.minTime = minTime;
			datetimepickerOption.maxTime = maxTime;
			datetimepickerOption.showMeridian = false;
			datetimepickerOption.showSeconds = true;
			datetimepickerOption.datepicker = false;
		} else if (type == 'date') {
			var value = element.val();
			value = co.date.trim(value);
			element.val(value);
			mobiscrollOption.date = 'date';
			var format = element.attr('format');
			if (co.isEmpty(format)) {
				format = "Y-m-d";
			}
			if (min) {
				minDate = getDateByStr(min);
			}
			if (max) {
				maxDate = getDateByStr(max);
			}
			if (minDate) {
				mobiscrollOption.minDate = new Date(minDate);
			}
			if (maxDate) {
				mobiscrollOption.maxDate = new Date(maxDate);
			}

			datetimepickerOption.format = format;
			datetimepickerOption.minDate = minDate;
			datetimepickerOption.maxDate = maxDate;
			datetimepickerOption.timepicker = false;
			datetimepickerOption.showMeridian = false;
			datetimepickerOption.showSeconds = false;
		}
		if (co.isPC()) {
			element.datetimepicker(datetimepickerOption);
			element.change(function() {
				var value = $(this).val();
				value = co.date.trim(value);
				$(this).val(value);

			});
		} else {
			element.mobiscroll(mobiscrollOption);
			element.data('mobiscrollOption', mobiscrollOption);
		}

	}

})();
(function() {
	var alleditors = {};
	co.input.bind('editor', function($selector) {
		var thisvalue = $selector.val();
		var id = $selector.attr('elementid') || $selector.attr('id');
		if (id == null || id == '') {
			id = co.getNumber();
		}
		$selector.attr('id', id);
		var editor = null;
		var inited = false;
		$selector.change(function() {
			if (inited) {
				editor.html($selector.val());
				return;
			}
			thisvalue = $selector.val();
		});
		co.plugin.load("kindeditor", function() {
			var design = $selector.attr('design');
			design = design == null || design == 'false' || design == '0' ? false : true;
			var isreadonly = $selector.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
			if (isreadonly) {
				return;
			}
			if (design) {
				return;
			}
			if (alleditors[id] != null) {
				try {
					KindEditor.remove(id);
					// delete alleditors[id];
				} catch (e) {
					console.log(e.message)
				}
			}
			var uploadUrl = basePath + co.config.action.doUpload;
			if (uploadUrl.indexOf('?') < 1) {
				uploadUrl += "?kindeditor=true"
			} else {
				uploadUrl += "&kindeditor=true"
			}
			var _config = {
				themesPath : basePath + co.plugin.plugins.kindeditor.themesPath,
				resizeType : 1,
				minWidth : '250px',
				width : '100%',
				height : "300px",
				allowPreviewEmoticons : false,
				uploadJson : uploadUrl,
				filterMode : true,
				allowImageUpload : true,
				allowFileManager : true,
				// items: [
				// 'fontname', 'fontsize', '|', 'forecolor',
				// 'hilitecolor',
				// 'bold', 'italic', 'underline',
				// 'removeformat', '|', 'justifyleft', 'justifycenter',
				// 'justifyright', 'insertorderedlist',
				// 'insertunorderedlist', '|', 'emoticons', 'image',
				// 'link'],
				afterCreate : function() {
				},
				afterChange : function() {
					$selector.val(this.html());
					// $selector.html(this.html());
				}
			};
			// try{
			editor = KindEditor.create("#" + id, _config);
			editor.html(thisvalue);
			alleditors[id] = editor;
			inited = true;
			// }catch(e){
			//					
			// }
		});
	});

})();
(function() {
	var groupModel = {
		1 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-$label-size coos-label'>$label</label>" +

			"	<div class='coos-col-$input-size coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"</div>"
		},
		2 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-$label-size coos-label'>$label</label>" +

			"	<div class='coos-col-$input-size coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"	<div class='coos-offset-$label-size coos-input-help'>$help-info</div>" +

			"</div>"
		},
		3 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-$label-size coos-label'>$label</label>" +

			"	<div class='coos-col-$input-size/2 coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"	<div class='coos-input-help coos-col-$input-size/2'>$help-info</div>" +

			"</div>"
		},
		4 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-12 coos-label text-left'>$label</label>" +

			"	<div class='coos-col-12 coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"</div>"
		},
		5 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-12 coos-label text-left'>$label</label>" +

			"	<div class='coos-col-12 coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"	<div class='coos-input-help'>$help-info</div>" +

			"</div>"
		},
		6 : {
			html : "" +

			"<div class='coos-input-group coos-col-$column-size'>" +

			"	<label class='coos-col-12 coos-label text-left'>$label</label>" +

			"	<div class='coos-col-8 coos-input'>" +

			"		<div class='input-place'></div>" +

			"	</div>" +

			"	<div class='coos-col-4 coos-input-help'>$help-info</div>" +

			"</div>"
		}
	}
	co.input.bind('group', function($selector) {

		var value = $selector.attr('value');
		if (co.isEmpty(value)) {
			value = $selector.val();
		}

		var addClass = $selector.attr('addClass');

		var display = $selector.attr('display');
		display = display == null || display == 'true' || display == '1' ? true : false;

		var isreadonly = $selector.attr('isreadonly');
		isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;

		var cannull = $selector.attr('cannull');
		cannull = cannull == null || cannull == 'true' || cannull == '1' ? true : false;

		var design = $selector.attr('design');
		design = design != null && design == 'true' || design == '1' ? true : false;

		// 标签
		var label = $selector.attr('label') || "";
		// 标签长度
		var labelsize = $selector.attr('label-size') || 2;
		labelsize = labelsize > 12 ? 12 : labelsize;

		if (co.isEmpty(label)) {
			// labelsize = 0;
		}

		var inputsize = 12 - labelsize;

		var beforeaddon = $selector.attr('before-addon') || "";
		var afteraddon = $selector.attr('after-addon') || "";
		// 提示信息
		var helpinfo = $selector.attr('help-info') || label;

		if (co.isEmpty($selector.attr('placeholder'))) {
			$selector.attr('placeholder', helpinfo);
		}

		var inputgrouptype = $selector.attr('group-type') || 1;
		// 列尺寸
		var columnsize = $selector.attr('column-size') || 12;
		columnsize = columnsize > 12 ? 12 : columnsize;

		var html = groupModel[inputgrouptype].html;
		if (("" + columnsize).has(".")) {
			html = html.replaceAll(/\$column-size/, ("" + columnsize).replace(".", "-"));
		} else {
			html = html.replaceAll(/\$column-size/, columnsize);
		}
		if (("" + labelsize).has(".")) {
			html = html.replaceAll(/\$label-size/, ("" + labelsize).replace(".", "-"));
		} else {
			html = html.replaceAll(/\$label-size/, labelsize);
		}
		if (("" + inputsize).has(".")) {
			html = html.replaceAll(/\$input-size\/2/, ("" + inputsize / 2).replace(".", "-"));
			html = html.replaceAll(/\$input-size/, ("" + inputsize).replace(".", "-"));
		} else {
			html = html.replaceAll(/\$input-size\/2/, ("" + inputsize / 2).replace(".", "-"));
			html = html.replaceAll(/\$input-size/, ("" + inputsize).replace(".", "-"));
		}
		html = html.replaceAll(/\$help-info/, helpinfo);
		html = html.replaceAll(/\$label/, label);

		// 元素组合组
		var $group = $(html);
		if (labelsize <= 0) {
			$group.find('.coos-label').remove();
		}
		if (addClass) {
			$group.addClass(addClass);
		}

		if (!display) {
			$group.hide();
			if (("" + columnsize).has(".")) {
				$group.removeClass('coos-col-' + (("" + columnsize).replace(".", "-")));
			} else {
				$group.removeClass('coos-col-' + columnsize);
			}
			$group.addClass('coos-col-3');
			$group.addClass('display-hidden');
		}

		$selector.before($group);
		$selector.data('hideGroup', function() {
			$group.hide();
		});
		$selector.data('showGroup', function() {
			$group.show();
		});

		// 选项
		var $optionselect = null;
		if ($selector.next().length > 0 && $selector.next().hasClass('option-select')) {
			$optionselect = $selector.next();
		}

		var $groupElement = $group.find('.input-place');
		$groupElement.before($selector);
		$groupElement.remove();

		$selector.before($optionselect);

		if (!co.isEmpty(beforeaddon)) {
			var beforeIcon = $('<span class="coos-input-addon coos-input-addon-before " ></span>');
			if (beforeaddon.indexOf('icon') != -1) {
				beforeIcon.addClass(beforeaddon);
			} else {
				beforeIcon.append(beforeaddon);
			}
			if ($selector.attr('before-addon-no-bg')) {
				beforeIcon.addClass('coos-no-bg');
			}
			$selector.before(beforeIcon);
		}
		if (afteraddon) {

			var afterIcon = $('<span class="coos-input-addon coos-input-addon-after " ></span>');

			if (afteraddon.indexOf('icon') != -1) {
				afterIcon.addClass(afteraddon);
			} else {
				afterIcon.append(afteraddon);
			}
			if ($selector.attr('after-addon-no-bg')) {
				afterIcon.addClass('coos-no-bg');
			}
			$selector.after(afterIcon);
		}

		var $label = $group.find('.coos-label');
		// 必须的
		if (isreadonly) {
			$selector.attr('readonly', "readonly");
		} else {
		}
		$selector.attr('cannull', cannull);
		// 是必填项
		if (!cannull) {
			if (!isreadonly) {
				$label.append("<span class=\"coos-red\">*</span>");
			} else {
				$label.append("<span class=\"color-transparent \">*</span>");
			}
		} else {
			$label.append("<span class=\"color-transparent\">*</span>");
		}
		var $options = null;
		if ($optionselect) {
			var $options = $optionselect.find('option');
			$options.each(function(index, $option) {
				$option = $($option);
				if ($option.text() == null || $option.text() == '') {
					$option.text($option.attr('text'));
				}
			});
		}
		var type = 'text';
		if ($selector.get(0).tagName == "TEXTAREA") {
			type = "TEXTAREA";
		}
		if ($selector.hasClass('input-rule-switch')) {
			type = "switch";
		} else if ($selector.hasClass('input-rule-select')) {
			type = "select";
		} else if ($selector.hasClass('input-rule-editor')) {
			type = "editor";
		} else if ($selector.hasClass('input-rule-file')) {
			if ($selector.attr('file-type') == 'image') {
				type = "image";
			} else {
				type = "file";
			}
		}

		if (type == "text") {

		} else if (type == "switch") {
			if (value != null && (value == 'true' || value == '1')) {
				$selector.attr('checked', 'checked');
			}
			$selector.attr('isswitch', true);
			$selector.attr('data-size', 'mini');
			$selector.attr('data-wrapper-class', 'yellow');
			$selector.attr('type', 'checkbox');
		} else if (type == "select") {

			if ($selector.get(0).tagName == "SELECT") {
				var hasNullOption = false;
				$selector.find('option').each(function(index, $option) {
					$option = $($option);
					if (co.isEmpty($option.attr('value'))) {
						hasNullOption = true;
					}
				});
				if (!hasNullOption) {
					if ($selector.find('option').length > 0) {
						$selector.find('option:first').before("<option value=''>请选择</option>");
					} else {
						$selector.append("<option value=''>请选择</option>");
					}
				}
			}
			if ($selector[0].tagName == 'SELECT' && $options) {
				$options.each(function(index, $option) {
					$option = $($option);
					$selector.append($option);
				});
			}
		} else if (type == "textarea") {
			$selector.css('height', '160px');
		} else if (type == "editor") {
			$selector.css('height', '370px');
			$selector.css('width', '100%');

		} else if (type == "file") {

		}
		if (type != "textarea" && type != "editor") {

			$selector.val(value);
		}
		if (isreadonly) {
			$selector.css('background-color', 'white');
			$selector.attr('disabled', true);
			var showvalue = $selector.attr('showvalue');

			if (co.isEmpty(showvalue)) {
				if (!co.isEmpty($selector.data('text-value'))) {
					showvalue = $selector.data('text-value');
				} else if (!co.isEmpty(value)) {
					showvalue = value;
				}
			}
			if ($selector.closest('.table-content').length < 1) {
				if ((type == 'text' || type == "image" || type == "images" || type == "file")) {
					// console.log(showvalue)
					// element.val(showvalue);
				} else if (type == 'select') {
					showvalue = showvalue == null || showvalue == '' || showvalue == 'null' ? '空' : showvalue;
					var showInput = $('<input class=" " readonly="readonly" />');
					showInput.css('background-color', 'white')
					showInput.val(showvalue);
					$selector.before(showInput);
					$selector.hide();
				} else {
					showvalue = showvalue == null || showvalue == '' || showvalue == 'null' ? '空' : showvalue;
					var showDiv = $('<div class=" " style="height: auto;overflow: hidden;border: 1px solid #ddd;padding: 7px 10px 6px;"></div>');
					showDiv.html(showvalue);
					$selector.before(showDiv);
					$selector.hide();
				}
			} else {
				showvalue = showvalue == null || showvalue == '' || showvalue == 'null' ? '空' : showvalue;
				var showDiv = $('<div class=" " style="height: auto;overflow: hidden;border: 1px solid #ddd;padding: 7px 10px 6px;"></div>');
				showDiv.html(showvalue);
				$selector.before(showDiv);
				$selector.hide();
			}

		}
	});
})();
(function() {

	co.input.bind('radio-tag', function($selector) {
		var optionGroup = $('<div class="coos-text-tag-group"></div>');
		var name = $selector.attr('name');
		$selector.before(optionGroup);
		$selector.hide();
		var options = $selector.parent().find('select.option-select').find('option');
		options.each(function(index, option) {
			option = $(option);
			var value = option.attr('value');
			var text = option.text();
			var $tag = $('<div class="coos-text-tag"></div>');
			$tag.attr('value', value);
			$tag.attr('text', text);
			$tag.append('<span class="text">' + text + '</span>')
			optionGroup.append($tag);
		});
		optionGroup.find('.coos-text-tag').click(function() {
			var value = '';
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				optionGroup.find('.coos-text-tag').removeClass('active');
			} else {
				optionGroup.find('.coos-text-tag').removeClass('active');
				$(this).addClass('active');

			}
			$(optionGroup.find('.coos-text-tag.active')).each(function(index, one) {
				value += $(one).attr('value');
			});
			$selector.val(value);
			if (co.isEmpty(value)) {
				$(optionGroup.find('.coos-text-tag')).each(function(index, one) {
					if (co.isEmpty($(one).attr('value'))) {
						$(one).addClass('active');
					}
				});
			}
			isFullChange = false;
			$selector.change();
			isFullChange = true;
		});
		var isFullChange = true;
		$selector.change(function() {
			var value = this.value;
			if (isFullChange) {
				var $tags = optionGroup.find('.coos-text-tag');
				$tags.removeClass('active');
				if (!co.isEmpty(value)) {
					optionGroup.find('[value="' + value + '"].coos-text-tag').addClass('active');
				} else {
					optionGroup.find('[value=""].coos-text-tag').addClass('active');
				}
			}
		});
	});

	$(function() {

	});
})();
(function() {
	co.input.bind('radio', function($selector) {
		var optionGroup = $('<div class="coos-radio-group"></div>');
		var name = $selector.attr('name');
		if (co.isEmpty(name)) {
			name = "radio_" + co.getNumber();
		}
		$selector.before(optionGroup);
		$selector.hide();
		$selector.removeAttr('name');
		var options = $selector.parent().find('select.option-select').find('option');
		options.each(function(index, option) {
			option = $(option);
			var value = option.attr('value');
			var text = option.text();
			var $input = $('<input class="parameter " name="' + name + '" value="' + value + '" type="radio" />');
			var $span = $('<span class="label">' + text + '</span>');
			optionGroup.append($input);
			optionGroup.append($span);
		});
		optionGroup.find('[name="' + name + '"]').change(function() {
			$selector.val(this.value);
			$selector.change();
		});
	});

	$(function() {

		$('html').on('click', '.coos-radio-group .label', function() {
			var $label = $(this);
			var $input = $label.prev();
			if ($input.length > 0 && $input[0].type == 'radio') {
				$input.click();
			}
		});
	});
})();
(function() {
	var RelationBind = function($selector) {
		$selector = $($selector);
		this.$selector = $selector;
		this.tagName = $selector[0].tagName;
		this.isSelectTag = (this.tagName === 'SELECT');
		this.isInputTag = (this.tagName === 'INPUT');
		this.rulerelation = $selector.attr('rule-relation');
		this.init();
	};

	RelationBind.prototype.init = function() {
		var rulerelationRule = this.rulerelation;
		if (coos.isEmpty(rulerelationRule)) {
			return;
		}
		if (rulerelationRule.indexOf('[') == 0 || rulerelationRule.indexOf('.') == 0 || rulerelationRule.indexOf('#') == 0) {

		} else {
			rulerelationRule = '[name="' + rulerelationRule + '"]';
		}
		if (this.$selector.closest('.coos-form').length < 1) {
			this.$relation = $(rulerelationRule);
		} else {
			this.$relation = this.$selector.closest('.coos-form').find(rulerelationRule);
		}
		this.$select = null;
		this.$options = null;
		if (this.isInputTag) {
			this.$select = this.$selector.parent().find('select.option-select');
		}
		if (this.isSelectTag) {
			this.$select = this.$selector;
		}

		this.$options = this.$select.find('option');

		this.valueChange();
		var this_ = this;
		this.$relation.change(function() {
			this_.valueChange();
		});
	};

	RelationBind.prototype.valueChange = function() {
		var this_ = this;
		var newoptions = this.$select.find('option');
		if (newoptions.length > 0) {
			$(newoptions).each(function(index, newoption) {
				var has = false;
				$(this_.$options).each(function(index, $option) {
					if ($($option).attr('value') == $(newoption).attr('value')) {
						has = true;
						return false;
					}
				});
				if (!has) {
					this_.$options.push($(newoption));
				}
			});
		}

		var value = this.$selector.val();
		var relationvalue = this.$relation.val();
		this.$select.html('<option value="">请选择</option>');
		var have = false;
		for (var i = 0; i < this.$options.length; i++) {
			var $option = $(this.$options[i]);
			if (!co.isEmpty($option.attr('value'))) {
				if ($option.attr('relationvalue') == relationvalue) {
					this.$select.append($option);
					if ($option.attr('value') == value) {
						have = true;
					}
				}
			}
		}
		if (have) {
			this.$selector.val(value);
		} else {
			if (this.$options.length > 0) {
				$(this.$select.find('option')[0]).attr('selected', 'selected');
			}
		}
		this.$selector.data('select-option-change') && this.$selector.data('select-option-change')();
		this.$selector.change();
	};

	co.input.relation = new Object();
	co.input.relation.bind = function($selector, config) {
		return new RelationBind($selector, config)
	}
})();
(function() {
	co.input.bind('slider', function($selector) {
		
		var min = $selector.attr('data-slider-min') || 0;
		var max = $selector.attr('data-slider-max') || 100;
		$selector.attr('data-slider-min', min);
		$selector.attr('data-slider-max', max);
		var isinterval = co.isTrue($selector.attr('coos-is-interval-search'));
		if (isinterval) {
			$selector.attr('data-slider-value', '[' + min + ',' + max + ']');
		} else {
			$selector.attr('data-slider-value', min);
		}
		var name = $selector.attr('name');
		var thisvalue = $selector.val();
		var inited = false;
		var slider = null;
		var changeinited = false;
		$selector.change(function() {
			if (inited) {
				if (!changeinited) {
					changeinited = true;
					var value = $selector.val();
					if (value.indexOf(",") > 0) {
						var vs = value.split(",");
						$(vs).each(function(index, v) {
							vs[index] = Number(v);
						});
						slider.data('bootstrapSlider').setValue(vs);
					} else {
						slider.data('bootstrapSlider').setValue(Number(value));
					}
				}
				var value = slider.data('bootstrapSlider').getValue();
				var setvalue = null;
				if (co.isNumber(value)) {
					setvalue = value;
				} else {
					setvalue = value[0] + value[1];
					$selector.closest('.coos-form').find('[name="' + name + '_start"]').val(value[0]);
					$selector.closest('.coos-form').find('[name="' + name + '_end"]').val(value[1]);
				}
				slider.data('bootstrapSlider').setValue(value);
				$selector.val(setvalue);
				return;
			}
			thisvalue = $selector.val();
			if (co.isEmpty(thisvalue)) {
				thisvalue = 0;
				if (isinterval) {
					thisvalue = "0,100";
				}
			}
		});
		co.plugin.load("bootstrap_slider", function() {
			slider = $selector.bootstrapSlider({
				formatter : function(value) {
					return '' + value;
				}
			});
			thisvalue = "" + thisvalue;
			if (thisvalue.indexOf(",") > 0) {
				var vs = thisvalue.split(",");
				$(vs).each(function(index, v) {
					vs[index] = Number(v);
				});
				slider.data('bootstrapSlider').setValue(vs);
			} else {
				if (!co.isEmpty(thisvalue)) {
					slider.data('bootstrapSlider').setValue(Number(thisvalue));
				}
			}

			inited = true;
		});
	});

})();
(function() {
	co.input.bind('switch', function($selector) {
		co.plugin.load("bootstrap_switch", function() {
			var isreadonly = $selector.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
			if (isreadonly) {
				return;
			}
			// var height = element.parent().height();
			// element.parent().css('min-height', height);
			// element.parent().css('min-height', 53);
			$selector.hide();
			var value = $selector.attr("value");
			if (co.isEmpty($selector.attr("data-size"))) {
				// $selector.attr('data-size', 'mini');

			}
			// if(co.isEmpty(element.attr("data-on-color"))){
			// element.attr('data-on-color', 'warning');
			// }
			// if(co.isEmpty(element.attr("data-off-color"))){
			// element.attr('data-off-color', 'danger');
			// }
			// if(co.isEmpty(element.attr("data-off-color"))){
			// element.attr('data-off-color', 'danger');
			// }
			if (co.isEmpty($selector.attr("data-label-text"))) {
				// element.attr('data-label-text', '&nbsp;');
			}
			$selector.attr('data-wrapper-class', 'yellow');
			if (value != null && (value == 'true' || value == '1')) {
				$selector.attr("checked", "checked");
			}
			$selector.attr('isswitch', true);
			$selector.attr('type', 'checkbox');
			var bootstrapSwitch = $selector.bootstrapSwitch();
			$selector.data('bootstrapSwitch', bootstrapSwitch);
			$selector.on('switchChange.bootstrapSwitch', function(e, state) {
				$selector.val(state);
				$selector.change();
			});
		});
	});
})();
(function() {
	co.input.bind('tag', function($selector) {
		co.plugin.load("tags_input", function() {
			var isreadonly = $selector.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
			if (isreadonly) {
				return;
			}
			$selector.tagsInput({
				width : 'auto',
				onAddTag : function(tag) {
					$(this).val(this.value);
					$(this).change();
				},
				onRemoveTag : function(tag) {
					$(this).val(this.value);
					$(this).change();
				}
			});
		});
	});

})();
(function() {
	co.input.bind('upload', function($selector) {
		
	});
})();
(function() {

	co.input.file = new Object();
	co.input.file.divider = " ";
	var FileBind = function($selector, config) {
		config = config || {};
		this.type = config.type || '';
		this.$selector = $selector;

		this.init();
	};

	FileBind.prototype.init = function() {
		var isreadonly = this.$selector.attr('isreadonly');
		isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
		this.isreadonly = isreadonly;

		this.maxfilelength = this.$selector.attr('max-file-length');

		var filecount = this.$selector.attr('file-count');
		filecount = filecount == null || filecount == '' ? 1 : filecount;
		this.filecount = filecount;

		this.initView();
		this.bindEvent();
		this.$selector.change();
	};

	FileBind.prototype.initView = function() {
		this.$upload = $('<span class=\"coos-input-addon coos-input-addon-after coos-pointer \"><i class=\"fa fa-upload\"></i></span>');

		if (!this.isreadonly) {
			this.$selector.after(this.$upload);
		} else {
		}

		this.bindUpdate(this.$upload);
		this.$filegroup = $("<div class=\"coos-file-group\">" + "</div>");
		this.$filegroupupload = $("<div class=\"coos-file coos-file-for-upload\"><i class=\"mgl-5 fa fa-upload\"></i></div>");

		this.$filegroup.append(this.$filegroupupload);
		this.$selector.before(this.$filegroup);

		if (this.isreadonly) {
			this.$filegroupupload.hide();
		}
		if (this.type == 'image') {
			this.$filegroup.addClass('coos-image-group ');
			this.$filegroupupload.empty();
			this.$filegroupupload.append("	<img class='coos-pointer' src='" + co.resource.images.clickupload + "'>");

			this.$filegroupupload.attr('file-type', 'image');
		} else {

		}

		if (!this.isreadonly) {
			this.bindUpdate(this.$filegroupupload);
		}

	};

	FileBind.prototype.bindUpdate = function($btn, $file) {
		var this_ = this;

		$btn.attr('file-type', this.type);
		if (!co.isEmpty(this.$selector.attr('file-type'))) {
			$btn.attr('file-type', this.$selector.attr('file-type'));
		}
		co.button.bind.upload($btn, {
			callback : function(files) {
				this_.addFiles(files, $file);
			}
		});
	};

	FileBind.prototype.addFiles = function(files, $file) {
		var this_ = this;
		if (files && files.length > 0) {
			var oldurl = this.$selector.val();
			var oldpath = '';
			if ($file) {
				oldpath = $file.attr('path');
			}
			var urls = [];
			if (oldurl != null && oldurl != '') {
				urls = oldurl.split(co.input.file.divider);
			}
			var us = [];
			$(urls).each(function(index, url) {
				if (!co.isEmpty(url)) {
					us.push(url);
				}
			});
			urls = us;
			var replaced = false;
			$(urls).each(function(index, url) {
				if (url == oldpath) {
					urls[index] = files[0].path;
					replaced = true;
				}
			});

			var count = urls.length;
			var overfiles = [];
			$(files).each(function(index, file) {
				var has = false;
				$(urls).each(function(index, url) {
					if (url == file.path) {
						has = true;
					}
				});
				if (!has) {
					if (count < this_.filecount) {
						urls.push(file.path);
						count++;
					} else {
						overfiles.push(file);
					}
				}
			});
			if (!replaced && overfiles.length > 0) {
				urls[urls.length - 1] = overfiles[0].path;
			}
			urls.push("");
			var value = urls.join(co.input.file.divider);
			this.$selector.val(value);
			this.$selector.change();
		}
	};
	FileBind.prototype.removeFile = function(path) {
		var this_ = this;
		if (!co.isEmpty(path)) {
			var oldurl = this.$selector.val();
			var urls = [];
			if (oldurl != null && oldurl != '') {
				urls = oldurl.split(co.input.file.divider);
			}
			var us = [];
			$(urls).each(function(index, url) {
				if (!co.isEmpty(url)) {
					if (url != path) {
						us.push(url);
					}
				}
			});
			us.push("");
			var value = us.join(co.input.file.divider);
			this.$selector.val(value);
			this.$selector.change();
		}
	};
	FileBind.prototype.fullFileInfo = function($file, data) {
		if (co.isString(data)) {
			var url = data;
			var infos = url.split('/');
			var name = infos[infos.length - 1];// 获取最后一部分，即文件名
			data = {};
			data.name = name;
			data.length = 0;
		}
		$file.find('.file-name').text(data.name);
		var length = data.length || 0;
		if (length < 1024) {
			length = length + "B";
		} else if (length >= 1024 && length < 1024 * 1024) {
			length = length / 1024;
			length = length.toFixed(2);
			length = length + "KB";
		} else {
			length = length / 1024 / 1024;
			length = length.toFixed(2);
			length = length + "MB";
		}
		$file.find('.file-length').text(length);
	};

	FileBind.prototype.addFileGroupFile = function(url) {
		var this_ = this;
		var $file = $('<div class="coos-file one"></div>');
		$file.attr('path', url);
		var useFileServer = false;
		var path = url;
		if (url.indexOf('http:') == 0 || url.indexOf('https:') == 0 || url.indexOf('ftp:') == 0 || url.indexOf('file:') == 0) {
		} else {
			useFileServer = true;
			url = co.config.server.fileServerUrl + url;
		}
		if (this.type == 'image') {
			$file.append('<img class="element-rule-image" />');
		} else {
			$file.append('<div class="file-info" ><a class="file-name" target="_blank" ></a><div class="file-length"></div></div>');
			$file.find('a').attr('href', url);
			this.fullFileInfo($file, url);
			if (useFileServer) {
				var action = 'core/file/file.info';
				var data = {};
				data.path = path;
				data.url = url;
				var this_ = this;
				co.POST(action, data, 'json', function(data) {
					if (data != null && !co.isEmpty(data.name)) {
						this_.fullFileInfo($file, data);
					}
				}, true, {
					showLoading : false
				});
			} else {
			}

		}
		var $remove = $('<div class="coos-file-remove"><i class="fa fa-remove"></i></div>');
		if (!this.isreadonly) {
			$file.append($remove);
		}
		if (this.type == 'image') {
			$file.find('img').attr('path', url);
		}
		this.$filegroupupload.before($file);
		co.element.init($file);
		$remove.click(function() {
			var path = $(this).parent().attr('path');
			this_.removeFile(path);
			$(this).parent().remove();
		});
		if (this.type == 'image') {
			if (!this.isreadonly) {
				this.bindUpdate($file, $file);
			}
		}
	};

	FileBind.prototype.bindEvent = function() {
		var this_ = this;
		this.$selector.change(function() {
			var value = $(this).val();
			if (this_.$filegroup) {
				this_.$filegroup.find('.one').remove();
			}
			var urls = [];
			if (value != null && value != '') {
				urls = value.split(co.input.file.divider);
			}

			var count = 0;
			$(urls).each(function(index, url) {
				if (!co.isEmpty(url)) {
					count++;
					if (count <= this_.filecount) {
						this_.addFileGroupFile(url);
					}
				}
			});
			if (this_.$filegroupupload) {
				if (this_.filecount <= count) {
					this_.$filegroupupload.hide();
				} else {

					this_.$filegroupupload.show();
				}
			}
			if (this_.isreadonly) {
				this_.$filegroupupload.hide();
			}
		});
	};

	co.input.file.bind = function($selector, config) {
		return new FileBind($selector, config);
	}

})();
(function() {
	co.input.bind('file', function($selector) {
		co.input.file.bind($selector);
	});

	co.input.bind('file-annex', function($selector) {
		co.input.file.bind($selector, {
			type : "annex"
		});
	});

	co.input.bind('file-image', function($selector) {
		co.input.file.bind($selector, {
			type : "image"
		});
	});

	co.input.bind('file-video', function($selector) {
		co.input.file.bind($selector, {
			type : "video"
		});
	});

	co.input.bind('file-audio', function($selector) {
		co.input.file.bind($selector, {
			type : "audio"
		});
	});
})();
(function() {

	var SelectBind = function($selector, config) {
		config = config || {};
		this.$selector = $selector;
		this.tagName = $selector[0].tagName;
		this.config = config;
		var ismulti = config.ismulti;
		this.ismulti = ismulti;
		this.isSelectTag = (this.tagName === 'SELECT');
		this.isInputTag = (this.tagName === 'INPUT');
		this.init();

	};
	SelectBind.prototype.init = function() {
		this.rulerelation = this.$selector.attr('rule-relation');

		var isreadonly = this.$selector.attr('isreadonly');
		isreadonly = co.isTrue(isreadonly);
		this.isreadonly = isreadonly;
		var needaddon = this.$selector.attr('need-addon');
		needaddon = co.isTrue(needaddon);
		this.needaddon = needaddon;
		this.initView();
		this.initDatas();
		this.bindWindowEvent();
		this.binValueEvent();
		this.binTextEvent();

		// 组合级联菜单
		if (this.rulerelation != null) {
			co.input.relation.bind(this.$selector);
		}
	};

	SelectBind.prototype.initView = function() {
		this.$viewBtn = null;
		if (this.needaddon) {
			this.$viewBtn = $('<span class="coos-input-addon coos-input-addon-after coos-pointer" ><i class="fa fa-circle-o"></i></span>');
			this.$selector.after(this.$viewBtn);
		}
		this._need_create_text_input = false;
		this._need_create_value_input = false;
		if (this.ismulti) {
			this._need_create_text_input = true;
		}
		this.$select = null;
		if (this.isSelectTag) {
			if (this.ismulti) {
				this._need_create_text_input = true;
				this._need_create_value_input = true;
			}
			this.$select = this.$selector;
		} else if (this.isInputTag) {
			this._need_create_text_input = true;
			this.$select = this.$selector.parent().find('select.option-select');
		}
		this.$text = null;
		this.$value = this.$selector;
		if (this._need_create_text_input) {
			if (this.isInputTag) {
				this.$text = this.$selector.clone();
			} else {
				this.$text = $('<input/>');
				this.$text.addClass(this.$selector.attr('class'));
				this.$text.attr('placeholder', this.$selector.attr('placeholder'));
			}
			this.$text.removeClass('input-rule-select input-rule-multi-select input-rule-group parameter');
			this.$text.removeAttr('name');
			this.$selector.after(this.$text);
			this.$selector.hide();
		}
		if (this._need_create_value_input) {
			if (this.isInputTag) {
				this.$value = this.$selector;
			} else if (this.isSelectTag) {
				if (this.ismulti) {
					this.$value = $('<input/>');
					this.$selector.after(this.$value);
					this.$value.hide();
				} else {
					this.$value = this.$selector;
				}
			}
		}

		var value = this.$value.val();
		this.setValue(value, false);
	};

	SelectBind.prototype.bindWindowEvent = function() {
		var this_ = this;
		if (this.$viewBtn) {
			var $select = this.$select;
			var $value = this.$value;
			var ismulti = this.ismulti;
			this.$viewBtn.click(function() {
				var value = $value.val();
				viewSelectWindow({
					$select : $select,
					ismulti : ismulti,
					value : value,
					callback : function(value) {
						this_.setValue(value, true);
					}
				});
			});
		}
	};

	SelectBind.prototype.binValueEvent = function() {
		var this_ = this;
		if (this.$value && this.$text) {
			var selecting = false;
			this.$value.change(function() {
				var value = $(this).val();
				this_.setValue(value);
			});
		}
	};
	SelectBind.prototype.binTextEvent = function() {
		var this_ = this;
		if (this.$text) {
			var selecting = false;
			this.$text.change(function() {

				// 去除不完整的TEXT
				var text = $(this).val();
				var value = getValueByText(text, this_.$select, this_.ismulti);
				this_.setValue(value);
			});
			co.plugin.load("jquery_ui_widgets", function() {

				this_.$text.on("keydown", function(event) {
					if (event.keyCode === $.ui.keyCode.TAB && $(this).autocomplete("instance").menu.active) {
						event.preventDefault();
					}
				});
				var autoc = this_.$text.autocomplete({
					minLength : 0,
					source : function(request, response) {
						response($.ui.autocomplete.filter(this_.datas, extractLast(request.term)));
					},
					focus : function() {
						return false;
					},
					select : function(event, ui) {
						if (co.isEmpty(ui.item.value)) {
							return false;
						}
						var value = ui.item.value || "";
						if (this_.ismulti) {
							var text = ui.item.text || "";
							text = this_.$text.val() + "," + text;
							value = getValueByText(text, this_.$select, this_.ismulti);
						} else {
						}
						this_.setValue(value, true);
						return false;
					}
				});
				// var uiAutocomplete = autoc.data('uiAutocomplete');
				// this_.$text.on('mouseup', function() {
				// var data = this_.$text.filter(datas, "");
				// console.log(uiAutocomplete);
				// });
			});
		}
	};
	SelectBind.prototype.initDatas = function() {
		this.datas = getSelectOptionDatas(this.$select);
		var this_ = this;
		this.$selector.data('select-option-change', function() {
			this_.optionChange();
		});
	};
	SelectBind.prototype.optionChange = function() {
		this.initDatas();
		if (this.$text) {
			// 去除不完整的TEXT
			var text = this.$text.val();
			var value = getValueByText(text, this.$select, this.ismulti);

			this.setValue(value);
		}
	};

	SelectBind.prototype.setValue = function(value, needEvent) {
		value = trimValue(value, this.ismulti);
		if (this.$text) {
			var showText = getShowText(value, this.$select, this.ismulti);
			this.$text.val(showText);
			this.$text.data('bind-value', value);
		}
		if (this.$value) {
			this.$value.val(value);
			if (needEvent) {
				this.$value.change();
			}
		}
	};
	function trimValue(value, ismulti) {
		value = value || "";
		var values = [ value ];
		if (ismulti) {
			values = split(value);
		}
		var joinValueMap = {};
		var vs = [];
		$(values).each(function(index, v) {
			if (v == null || v == '') {
				return;
			}
			if (joinValueMap[v] == null) {
				vs.push(v);
			}
			joinValueMap[v] = v;
		});
		vs.push("");
		var v = vs.join("");
		if (ismulti) {
			v = vs.join(",");
		}
		return v;

	}

	function split(val) {
		return val.split(/,\s*/);
	}
	function extractLast(term) {
		return split(term).pop();
	}
	function getSelectOptionDatas($select) {
		var $options = $select.find('option');
		var datas = [];
		$($options).each(function(index, $option) {
			$option = $($option);
			var text = $option.text();
			var value = $option.attr('value');
			var image = $option.attr('image');
			var parent = $option.attr('parent');
			var data = {};
			data.text = text;
			data.label = text;
			data.value = value;
			data.image = image;
			data.parent = parent;
			datas[datas.length] = data;
		});
		return datas;
	}
	function getValueByText(text, $select, ismulti) {
		var valueterms = [];
		if (!co.isEmpty(text)) {
			var texts = [ text ];
			if (ismulti) {
				texts = split(text);
			}
			var textmap = {};
			var $options = $select.find('option');
			$options.each(function(index, one) {
				one = $(one);
				textmap[one.text()] = one.attr('value');
			});

			$(texts).each(function(index, one) {
				if (!co.isEmpty(one) && textmap[one]) {
					valueterms.push(textmap[one]);
				}
			});
		}
		valueterms.push("");
		var value = valueterms.join("");
		if (ismulti) {
			value = valueterms.join(",");
		}
		return value;
	}

	function getShowText(value, $select, ismulti) {
		var textterms = [];
		if (!co.isEmpty(value)) {
			var values = [ value ];
			if (ismulti) {
				values = split(value);
			}
			var valuemap = {};
			var $options = $select.find('option');
			$options.each(function(index, one) {
				one = $(one);
				valuemap[one.attr('value')] = one.text();
			});

			$(values).each(function(index, one) {
				if (!co.isEmpty(one) && valuemap[one]) {
					textterms.push(valuemap[one]);
				}
			});
		}
		textterms.push("");
		var text = textterms.join("");
		if (ismulti) {
			text = textterms.join(", ");
		}
		return text;
	}

	function viewSelectWindow(config) {
		var label = config.label;
		var callback = config.callback;
		var ismulti = config.ismulti;
		var value = config.value;
		var $options = config.$select.find('option');
		var datas = [];
		$($options).each(function(index, $option) {
			$option = $($option);
			var text = $option.text();
			var value = $option.attr('value');
			if (ismulti && co.isEmpty(value)) {
				return;
			}
			var image = $option.attr('image');
			var parent = $option.attr('parent');
			var data = {};
			data.text = text;
			data.value = value;
			data.image = image;
			data.parent = parent;
			datas[datas.length] = data;
		});
		var windowConfig = {};
		windowConfig.title = "选择" + label;
		windowConfig.datas = datas;
		if (ismulti) {
			if (!co.isEmpty(value)) {
				windowConfig.values = split(value);
			} else {
				windowConfig.values = [];
			}
			windowConfig.isradio = false;
		} else {
			windowConfig.value = value;
		}
		windowConfig.callback = function(values, texts) {
			var textterms = [];
			var valueterms = [];
			for (var i = 0; i < values.length; i++) {
				valueterms.push(values[i]);
			}
			valueterms.push("");
			for (var i = 0; i < texts.length; i++) {
				textterms.push(texts[i]);
			}
			textterms.push("");
			var value = valueterms.join("");
			var text = textterms.join("");
			if (ismulti) {
				value = valueterms.join(",");
				text = textterms.join(", ");
			}
			callback && callback(value, text);
		};
		co.box.window.select(windowConfig);
	}

	co.input.select = new Object();
	co.input.select.bind = function($selector, config) {
		return new SelectBind($selector, config)
	}
})();
(function() {
	co.input.bind('select', function($selector) {
		co.input.select.bind($selector, {
			ismulti : false
		});
	});

	co.input.bind('multi-select', function($selector) {
		co.input.select.bind($selector, {
			ismulti : true
		});
	});

})();
co.page = new Object();
(function() {
	co.page.config = {
		single : true,
		animation : false,
		frame : {
			content : "#page-body-content",
			oldcontent : "#page-body-content-old"
		},
	};
	var loadCallbacks = [];
	co.page.pushLoadCallback = function(callback) {
		loadCallbacks.push(callback);
	};
	co.page.loaded = function() {
		co.element.init();

		$(loadCallbacks).each(function(index, loadCallback) {
			if (co.isFunction(loadCallback)) {
				loadCallback();
			}
		});
	};

	co.page.init = function() {
		// onpopstate
		// 监听浏览器地址
		if (co.isObject(window.onpopstate) && co.page.config.single) {
			$(window).on('popstate', function() {
				co.page.toSinglePage();
			});
		}
		co.page.loaded();
	};

	$(function() {
		co.page.init();
	});
	var lastAccessPageUrl = co.url.getCurrentUrl();
	co.page.pushLoadCallback(function() {
		lastAccessPageUrl = co.url.getCurrentUrl();
	});
	co.page.toSinglePage = function(url) {
		var url = url || co.url.getCurrentUrl();

		if (url.has("#")) {
			url = url.split('#')[0];
		}
		var lastUrl = lastAccessPageUrl;
		if (lastUrl.has("#")) {
			lastUrl = lastUrl.split('#')[0];
		}
		if (lastUrl == url || url.indexOf('$outFile') > 0) {

		} else {
			var config = {};
			config.action = url;
			co.page.load(config);
		}
	};

})();
(function() {
	co.page.config.event = {
		loadSuccess : function(config) {
			var html = config.html;
			var animation = config.animation;
			var showtype = config.showtype;

			var pageContent = $(co.page.config.frame.content);
			var pageWindow = null;
			var oldContent = $(co.page.config.frame.oldcontent);
			oldContent.empty();
			if (co.page.config.animation) {
				pageContent.children().appendTo(oldContent);
			}
			pageContent.empty();
			var $page = $(html);
			$page.appendTo(pageContent);

			co.frame && co.frame.changeFull($('#coos-need-full-page').length > 0 && $('#coos-need-full-page').closest('.coos-box-window').length == 0);

			if (co.page.config.animation) {
				if (window['istoaction']) {
					animation = 1;
				} else {
					animation = null;
				}
				window['istoaction'] = false;
				if (animation) {
					// 需要执行动画设置统一高度
					var oldHeight = oldContent.height();
					var pageHeight = pageContent.height();
					oldContent.css('height', pageHeight + 'px');

					$('body').removeClass('page-animation-1 page-animation-2');
					window.setTimeout(function() {
						$('body').addClass('page-animation-' + animation);
					}, 100);
				}
			}
			var hash = '' + window.location.hash;
			hash = decodeURIComponent(hash);
			if (!co.isEmpty(hash)) {
				var $element = pageContent.find(hash);
				if ($element.length > 0) {
					var top = $element.offset().top;
					$("html").animate({
						scrollTop : top
					}, 300);
				}
			} else {
				$("html").animate({
					scrollTop : 0
				}, 300);
			}
		}
	};
	(function() {
		var PageLoad = function(config) {
			this.config = config;
			this.action = config.action;
			this.toPage = config.toPage;
			this.callback = config.callback;
			this.data = config.data;
			this.url = co.url.format(config.action);
			return this;
		};
		PageLoad.prototype.load = function() {
			var this_ = this;
			this.start();
			if (this.toPage) {
				window.location.href = url;
				return;
			}
			$.ajax({
				url : this.url,
				data : this.data || {},
				type : 'post',
				dataType : 'html',
				async : true, // 异步请求
				beforeSend : function() {
					this_.beforeSend();
				},
				success : function(html) {
					this_.end(html);
				},
				complete : function(request, status) {
					this_.complete(request, status);
				},
				error : function(request, status, thrown) {
					this_.error(request, status, thrown);
				}
			});
		};
		PageLoad.prototype.beforeSend = function() {
		};
		PageLoad.prototype.complete = function(request, status) {
		};
		PageLoad.prototype.start = function() {
			co.cover.showLoading();
			$('.coos-box-window').remove();
		};

		PageLoad.prototype.end = function(html) {
			co.cover.hideLoading();
			var config_ = this.config || {};
			var $page = $(html);
			if ($page.length > 0 && !$page[0].tagName) {
				$page = $('<div></div>');
				$page.append(html);
			}
			var content = $page.find(co.page.config.frame.content);
			if (content.length > 0) {
				html = content.html();
			}
			if (this.callback != null) {
				if (!co.page.validate($page, url)) {
					return;
				}
				this.callback(html);
			} else {
				config_.html = html;
				config_.url = this.url;
				co.page.config.event.loadSuccess(config_);
			}
			co.page.loaded();
		};

		PageLoad.prototype.error = function(request, status, error) {
			co.cover.hideLoading();
			if (request.status == 500) {
				var erroraction = co.config.action.error['500'];
				if (this.action.indexOf(erroraction) < 0) {
					window['istoaction'] = true;
					this.config.action = erroraction;
					co.page.load(this.config);
				}
			} else if (request.status == 404) {
				var erroraction = co.config.action.error['404'];
				if (this.action.indexOf(erroraction) < 0) {
					window['istoaction'] = true;
					this.config.action = erroraction;
					co.page.load(this.config);
				}
			}
		};
		co.page.load = function(config) {
			var pageLoad = new PageLoad(config);
			return pageLoad.load();
		};
	})();

	co.page.validate = function(html, url) {
		var $page = null;
		try {
			$page = $(html);
		} catch (e) {
			return true;
		}
		var error = 0;
		$page.each(function(index, element) {
			var $element = $(element);
			if ($element.find('#coos-is-login-page').length > 0) {
				error = 1;
				return false;
			} else if ($element.find('#coos-is-404-page').length > 0) {
				error = 2;
				return false;
			} else if ($element.find('#coos-is-500-page').length > 0) {
				error = 3;
				return false;
			} else if ($element.find('#coos-is-not-online-page').length > 0) {
				error = 4;
				return false;
			} else if ($element.find('#coos-is-no-access-page').length > 0) {
				error = 5;
				return false;
			}
		});
		if (error > 0) {
			var config = {};
			config.toPage = true;
			if (error == 1) {
				config.action = (coos.config.action.toLogin);
			} else if (error == 2) {
				config.action = (coos.config.action.error['404']);
				coos.box.alert(url + " 404 Error!");
				return false;
			} else if (error == 3) {
				config.action = (coos.config.action.error['500']);
				coos.box.alert(url + " 500 Error!");
				return false;
			} else if (error == 4) {
				config.action = (coos.config.action.error.toNotOnline);
			} else if (error == 5) {
				config.action = (coos.config.action.error.toNoAccess);
			}
			co.page.load(config);
			return false;
		}
		return true;
	};

	co.page.reload = function() {
		if (co.page.config.openSinglePage) {
			var action = co.url.getCurrentUrl();
			var config = {};
			config.action = action;
			co.page.load(config);
		} else {
			window.location.reload();
		}
	};
})();
(function() {
	var TemplateMap = {};
	co.template = co.template || {};
	co.template.load = function(content) {
		content = content || $('body');
		var $elements = $(content).find('[coos-template]');
		$elements.each(function(index, element) {
			var $element = $(element);
			if ($element.find('[coos-template]').length > 0) {
				co.template.load($element);
			}
			var name = $element.attr('coos-template');
			if (!co.isEmpty(name)) {
				if (TemplateMap[name] != null) {
					console.log(name + "模版已经存在");
				}
				$element.removeAttr('coos-template');
				TemplateMap[name] = element;
			} else {
			}
			$element.remove();
		});
	};
	co.template.get = function(name) {
		if (co.isEmpty(name)) {
			throw new Error('请传入模版名称');
		}
		var element = TemplateMap[name];
		if (element == null) {
			throw new Error(name + '模版不存在');
		}
		return $(element).clone();
	};
	co.template.create = function(config, callback) {
		config = config || {};
		if (!co.isEmpty(config.name)) {
			var name = config.name;
			var element = co.template.get(name);
			if (element == null) {
				throw new Error(name + '模版不存在');
			}
			config.$template = element;
		}
		if (config.$template == null) {
			throw new Error('$template未设置');
		}
		return new Template(config, callback);
	};
	var Template = function(config, callback) {
		config = config || {};
		this.config = config;
		var methods = config.methods || {};
		var watch = config.watch || {};
		var this_ = this;
		co.plugin.load("vue", function() {
			this_.data = new Vue({
				el : config.$template[0],
				data : config.data || {},
				methods : methods,
				watch : watch
			});
			callback && callback(this_);
		});
	}
	
	$(function(){
		co.template.load();
	});
})();
(function() {
	var defaultConfig = {
		property : {
			id : "id",
			parentid : "parentid",
			text : "text",
			icon : "icon",
			image : "image",
			title : "title",
			haschild : "haschild"
		},
		topid : null,
		content : null,
		$content : null,
		showWindow : false,
		hasCheckbox : false,
		hasRadio : false,
		hasSearch : false,
		hasLoadChild : false,
		showLevel : true,
		treeUlHeight : 400,
		clickLineSelect : true,
		showLevelLine : false,
		checkboxDisabled : false, // 复选框禁用,
		radioDisabled : false, // 单选框禁用
		openSingleLevel : false,
		openHalfCheck : false,
		openSearchPrompt : false,
		openLazyRendering : false,
		openLazyLoadChildData : false,
		// 子项全部选中时候 自动选中父级是否需要确认
		findParentCheckNeedConfirm : false,
		// 搜索时候选中父级 当子项不匹配时候 自动选择之前需要确认 如果取消 则父级不能选中
		findMismatchChildNeedConfirm : false,
		size : 15,
		needSortable : false,
		noChildTextIcon : "",
		tablename : '',
		tableid : '',
		openLevel : '',
		buttons : [],
		checkedIds : [],
		openIds : [],
		checkedDeleteIds : [],
		checkedDeleteDatas : [],
		onClick : function() {

		},
		onLoadChild : function() {

		}
	};
	var TreeDataModel = function(topid, datas, property, treeConfig) {
		this.beanstartindex = 1000;
		this.topid = topid;
		this.datas = datas;
		this.property = property;
		this.treeConfig = treeConfig;
		this.init();
		return this;
	};
	TreeDataModel.prototype.init = function() {
		this.initBeans();
		this.initTopBeans();
		this.initChildBeans();
	};
	TreeDataModel.prototype.initBeans = function() {
		var topid = this.topid;
		var hasTopid = !co.isEmpty(topid);
		var datas = this.datas;
		var property = this.property;
		var beans = [];
		var cacheBeans = [];
		var topBean = null;
		this.idBeanMap = {};
		this.dataidBeanMap = {};
		var parentidBeansMap = {};
		var haschildname = property.haschild || "haschild";
		var parentidname = property.parentid || "parentid";
		for (var i = 0; i < datas.length; i++) {
			var data = datas[i];
			var bean = this.initBean(data);
			if (bean == null) {
				continue;
			}
			var id = bean.id;
			var parentid = bean.parentid;
			beans[beans.length] = bean;
			if (!co.isEmpty(parentid) && id != parentid) {
				var parentidBeans = parentidBeansMap[parentid];
				parentidBeans = parentidBeans || [];
				parentidBeans[parentidBeans.length] = bean;
				parentidBeansMap[parentid] = parentidBeans;
			}
			if (hasTopid && id == topid) {
				topBean = bean;
				continue;
			} else {
				cacheBeans[cacheBeans.length] = bean;
			}
		}
		this.topBean = topBean;
		this.beans = beans;
		this.cacheBeans = cacheBeans;
		this.parentidBeansMap = parentidBeansMap;
	};

	TreeDataModel.prototype.initBean = function(data, liConfig) {
		var thistreebeanid = this.beanstartindex;
		this.beanstartindex++;
		var property = this.property;
		var haschildname = property.haschild || "haschild";
		var parentidname = property.parentid || "parentid";
		var parentid = data[parentidname];
		var haschild = data[haschildname];

		if (data == null) {
			return null;
		}
		var id = data[property.id];

		if (co.isEmpty(id)) {
			return null;
		}
		data.thistreebeanid = thistreebeanid;
		var bean = {};
		bean.data = data;
		bean.id = id;
		bean.thistreebeanid = thistreebeanid;
		bean.parentid = parentid;
		if (typeof (haschild) == "undefined") {
			haschild = false;
		} else {
			if (!co.isBoolean(haschild)) {
				if (haschild == 'true' || haschild == '1') {
					haschild = true;
				} else {
					haschild = false;
				}
			}

		}
		bean.haschild = haschild;
		this.idBeanMap[thistreebeanid] = bean;
		this.initLiHtml(bean, liConfig);
		this.dataidBeanMap[id] = bean;
		return bean;
	};

	TreeDataModel.prototype.initLiHtml = function(bean, liConfig) {
		if (!this.treeConfigInited) {
			this.addClass_ = this.treeConfig.addClass;
			this.hasCheckbox_ = this.treeConfig.hasCheckbox;
			this.hasRadio_ = this.treeConfig.hasRadio;
			this.radioName_ = this.treeConfig.radioName;
			this.buttons_ = this.treeConfig.buttons;
			this.idName_ = this.treeConfig.property.id;
			this.textName_ = this.treeConfig.property.text;
			this.parentidName_ = this.treeConfig.property.parentid;
			this.iconName_ = this.treeConfig.property.icon;
			this.titleName_ = this.treeConfig.property.title;
			this.imageName_ = this.treeConfig.property.image;
			this.treeConfigInited = true;
		}
		var hasCheckbox = liConfig ? liConfig.hasCheckbox : this.hasCheckbox_;
		var hasRadio = liConfig ? liConfig.hasRadio : this.hasRadio_;
		var radioName = liConfig ? liConfig.radioName : this.radioName_;
		var buttons = liConfig ? liConfig.buttons : this.buttons_;
		var textName = liConfig ? liConfig.property.text : this.textName_;
		var parentidName = liConfig ? liConfig.property.parentid : this.parentidName_;
		var idName = liConfig ? liConfig.property.id : this.idName_;
		var iconName = liConfig ? liConfig.property.icon : this.iconName_;
		var imageName = liConfig ? liConfig.property.image : this.imageName_;
		var titleName = liConfig ? liConfig.property.title : this.titleName_;
		var addClass = liConfig ? liConfig.addClass : this.addClass_;
		var buttons = liConfig ? liConfig.buttons : this.buttons_;

		var data = bean.data;
		var text = data[textName];
		var id = data[idName];
		var parentid = data[parentidName];
		var image = data[imageName];
		var title = data[titleName];
		var icon = data[iconName];
		if (!co.isBoolean(hasCheckbox)) {
			hasCheckbox = false;
		}
		if (!co.isBoolean(hasRadio)) {
			hasRadio = false;
		}
		if (hasRadio && co.isEmpty(radioName)) {
			radioName = co.getNumber();
		}
		var liclass = '';
		if (!co.isEmpty(addClass)) {
			liclass = addClass;
		}
		var liattr = '';
		liattr += ' coos-recordid="' + id + '" ';
		liattr += ' coos-thistreebeanid="' + bean.thistreebeanid + '" ';

		if (!co.isEmpty(parentid)) {
			liattr += ' coos-recordparentid="' + parentid + '" ';
		}
		if (!co.isEmpty(title)) {
			liattr += ' title="' + title + '" ';
		}
		var leftinput = '';

		if (hasCheckbox) {
			liattr += ' has-checkbox="1" ';
			leftinput += '<input type="checkbox"/>';
		}
		if (hasRadio) {
			liattr += ' has-radio="1" ';
			leftinput += '<input type="radio" name="' + radioName + '"/>';
		}
		var dataicon = '';
		if (!co.isEmpty(icon)) {
			dataicon += '<i class="fa data-icon ' + icon + '"></i>';
		}
		if (!co.isEmpty(image)) {
			dataicon += '<img class="element-rule-image data-image" path="' + image + '"/>';
		}
		var datatext = '';
		datatext = text;
		var rightbutton = '';
		$(buttons).each(function(index, button) {
			if (!co.isEmpty(button.showrule)) {
				var showrule = button.showrule;

				var functionstr = 'function(){return ' + showrule + ';}';
				var one = data;
				var f = eval("(" + functionstr + ")")();
				if (!f) {
					return;
				}
			}
			if (co.isEmpty(button.outhtml)) {

				var html = button.html;
				if (co.isEmpty(html)) {
					var label = '';
					if (!co.isEmpty(button.label)) {
						label = button.label;
					}
					html = '<a class="tree-button  ">' + label + '</a>';
				}
				var $button = $(html);
				$button.attr('button-index', index);
				$button.addClass('tree-button');
				button.outhtml = $button.prop("outerHTML");
			}
			rightbutton += button.outhtml;

		});

		var li_html = '<li ' + liattr + ' li-level="#lilevel" class=" ' + liclass + ' ">';
		li_html += '<div class="coos-row coos-tree-row"><div class="tree-row-content">';
		li_html += '<div class="tree-row-left"><i class="fa icon li-icon"></i>' + leftinput + '</div>';
		li_html += '<div class="tree-row-center">' + dataicon + '<span class="data-text">' + datatext + '</span></div>';
		li_html += '<div class="tree-row-right"><div class="tree-button-group">' + rightbutton + '</div></div>';
		li_html += '</div></div></li>';
		bean.li_html = li_html;

	};

	TreeDataModel.prototype.initTopBeans = function() {
		var beans = this.beans;
		var cacheBeans = this.cacheBeans;
		var topBean = this.topBean;
		var dataidBeanMap = this.dataidBeanMap;
		var parentidBeansMap = this.parentidBeanMap;
		var topBeans = [];
		var cacheBeans_ = [];
		if (topBean != null) {
			for (var i = 0; i < cacheBeans.length; i++) {
				var bean = cacheBeans[i];
				var id = bean.id;
				var parentid = bean.parentid;
				// 父ID为空 或者父不存在 或者 父编号和编号相同
				if (co.isEmpty(parentid) || dataidBeanMap[parentid] == null || id == parentid || parentid == topBean.id) {
					topBeans[topBeans.length] = bean;
				} else {
					cacheBeans_[cacheBeans_.length] = bean;
				}
			}
		} else {
			for (var i = 0; i < cacheBeans.length; i++) {
				var bean = cacheBeans[i];
				var id = bean.id;
				var parentid = bean.parentid;
				if (co.isEmpty(parentid) || dataidBeanMap[parentid] == null || id == parentid) {
					topBeans[topBeans.length] = bean;
				} else {
					cacheBeans_[cacheBeans_.length] = bean;
				}
			}
		}
		this.topBeans = topBeans;
		this.cacheBeans = cacheBeans_;
	};

	TreeDataModel.prototype.initChildBeans = function() {
		var topBeans = this.topBeans;
		var topBean = this.topBean;
		for (var i = 0; i < topBeans.length; i++) {
			var bean = topBeans[i];
			if (topBean != null) {
				bean.parent = topBean;
			}
			this.initChildBean(bean);

		}
	};
	TreeDataModel.prototype.initChildBean = function(bean) {
		if (bean == null) {
			return;
		}
		var cacheBeans = this.cacheBeans;
		var parentidBeansMap = this.parentidBeansMap;
		var cacheBeans_ = [];
		var id = bean.id;
		var parentidBeans = parentidBeansMap[id];
		if (parentidBeans != null) {
			bean.childBeans = parentidBeans;
			for (var i = 0; i < bean.childBeans.length; i++) {
				var childBean = bean.childBeans[i];
				childBean.parent = bean;
				this.initChildBean(childBean);
			}
		}

	};
	TreeDataModel.prototype.appendChildDatas = function(bean, childDatas, liConfig) {
		if (bean) {
			bean.childBeans = bean.childBeans || [];
			var childBeans = [];
			var this_ = this;
			$(childDatas).each(function(index, childData) {
				this_.datas[this_.datas.length] = childData;
				var childBean = this_.initBean(childData, liConfig);
				if (childBean != null) {
					childBean.parent = bean;
					childBeans[childBeans.length] = childBean;
					bean.childBeans[bean.childBeans.length] = childBean;
				}
			});
			return childBeans;
		}
		return [];
	};
	TreeDataModel.prototype.getBeanById = function(thistreebeanid) {

		if (thistreebeanid) {
			var bean = this.idBeanMap[thistreebeanid];
			if (!co.isEmpty(this.topid) && this.topid == bean.id) {
				bean.childBeans = this.topBeans;
			}
			return bean;
		}
		return null;
	};
	TreeDataModel.prototype.getBean = function(data) {

		if (data) {
			var bean = this.idBeanMap[data.thistreebeanid];
			if (!co.isEmpty(this.topid) && this.topid == bean.id) {
				bean.childBeans = this.topBeans;
			}
			return bean;
		}
		return null;
	};
	TreeDataModel.prototype.getData = function(beans) {
		if (co.isArray(beans)) {
			var datas = [];
			for (var i = 0; i < beans.length; i++) {
				datas[datas.length] = beans[i].data;
			}
			return datas;
		} else {
			return beans.data;
		}
	}
	var Tree = function(config) {
		config.tree = this;
		defaultConfig.radioName = co.getNumber();
		this.config = jQuery.extend(true, {}, defaultConfig, config);
		var config = this.config;
		this.init();
		this.onClick = function($li) {
			if (config.onClick) {
				var data = $li.data('data');
				var hasChild = $li.find('ul').length > 0;
				config.onClick($li, data, hasChild);
			}
		}
		var this_ = this;
		this.onSearch = function(searchText, $content) {
			if (config.onSearch) {
				config.onSearch(searchText, $content);
			} else {
				return this_.searchContent(searchText, $content);
			}
		}
		return this;
	};
	/**
	 * TODO 创建UL
	 */
	function createUl(level) {
		level = level || 1;
		var $ul = $('<ul ul-level="' + level + '"></ul>');
		return $ul;
	}

	/**
	 * TODO 创建LI
	 */
	function createLi(bean, liConfig, level) {
		var data = bean.data;
		bean.viewed = true;

		var lilevel = '';
		if (level) {
			lilevel = level;
			// liattr += ' li-level="' + level + '" ';
		}
		bean.li_html = bean.li_html.replace('#lilevel', lilevel);
		var $li = $(bean.li_html);

		var $button_group = $li.find('.tree-button-group:first');
		$(liConfig.buttons).each(function(index, button) {
			$($button_group.find('[button-index="' + index + '"]')).click(function() {
				if (button.onClick) {
					button.onClick(data, $li);
				}
			});
		});

		$li.data('config', liConfig);
		$li.data('data', data);
		$li.data('bean', bean);
		$li.data('checked', false);
		return $li;
	}

	/**
	 * TODO 创建顶级项
	 */
	function createTopLi($ul, topBeans, liConfig) {
		$(topBeans).each(function(index, topBean) {
			var $li = createLi(topBean, liConfig);
			$ul.append($li);
		});

	}

	/**
	 * TODO 显示搜索到的子项
	 */
	function displayParentForSearch($li) {
		var $parentli = $li.closest('ul').closest('li');
		if ($parentli.length > 0) {
			$parentli.removeClass('tree-search-not-find');
			displayParentForSearch($parentli);
		}
	}

	// /**
	// * 复选框值改变
	// */
	// function liCheckboxChange($li, findParentCheckNeedConfirm,
	// findMismatchChildNeedConfirm, openHalfCheck) {
	//				
	//
	// }
	function getSearchFindLis($li) {
		return $li.find('ul li.tree-search-find');
	}
	Tree.prototype.createWindow = function() {
		var this_ = this;
		var windowConfig = {};
		if (this.config && this.config.window) {
			windowConfig = this.config.window;
		}
		windowConfig.html = "<div></div>";
		var buttons = windowConfig.buttons || [];
		if (windowConfig.defineCallback) {
			var button = {};
			button.label = co.config.label.define;
			button.className = "coos-box-define coos-button";
			button.callback = function() {
				var result = this_.getCheckedDatas();
				var result = windowConfig.defineCallback(result);
				if (!co.isBoolean(result) || result) {
					this_.hide();
				}
			}
			buttons[buttons.length] = button;
		}
		windowConfig.buttons = buttons;
		var boxWindow = co.box.window(windowConfig);
		return boxWindow;
	}

	Tree.prototype.show = function() {

		if (this.config.showWindow) {
			this.window.show();
		}
	};
	Tree.prototype.hide = function() {
		if (this.config.showWindow) {
			this.window.hide();
		}
	};
	Tree.prototype.remove = function() {
		if (this.config.showWindow) {
			this.window.remove();
		}
	};
	Tree.prototype.empty = function() {
		this.$content.empty();
	};
	Tree.prototype.destroy = function() {
		this.empty();
		this.remove();
	};
	Tree.prototype.refresh = function(datas) {
		if (datas) {
			this.config.datas = datas;
		}
		this.init();
	};
	/**
	 * TODO 初始化
	 */
	Tree.prototype.init = function() {
		if (this.$content == null) {
			if (this.config.showWindow) {
				this.window = this.createWindow(this.config);
				this.$content = this.window.$content;
			} else {
				this.$content = $(this.config.content);
			}
		} else {
			this.$content.empty();
		}
		var datas = this.config.datas;
		if (!co.isArray(datas)) {
			return;
		}

		this.dataModel = new TreeDataModel(this.config.topid, datas, this.config.property, this.config);
		// this.topData = getTopData(datas, this.config.topid,
		// this.config.property);
		// this.topDatas = getTopDatas(datas, this.topData,
		// this.config.property);
		this.checkedIds = this.config.checkedIds;
		var checkedIdMap = {};
		$(this.checkedIds).each(function(index, checkedId) {
			checkedIdMap[checkedId] = true;
		});
		this.checkedIdMap = checkedIdMap;
		this.checkedBeanMap = {};
		this.build();
		this.initLevel();
	};
	Tree.prototype.openLiByIds = function(ids) {
		var this_ = this;
		var dataModel = this.dataModel
		$(ids).each(function(index, id) {
			if (!co.isEmpty(id)) {
				var data = dataModel.dataidBeanMap[id];
				this_.openLiByData(data);
			}
		});
	};
	Tree.prototype.openLiByData = function(data) {
		if (data) {
			var bean = this.dataModel.getBean(data);
			this.openParentLiByBean(bean);
		}

	};
	Tree.prototype.openParentLiByBean = function(bean) {
		if (bean == null) {
			return;
		}
		if (bean.parent != null) {
			this.openParentLiByBean(bean.parent);
		}
		var thistreebeanid = bean.thistreebeanid;
		var $li = this.$tree.find('[coos-thistreebeanid="' + thistreebeanid + '"]');
		if ($li.length > 0) {
			$li.find('>.coos-tree-row .li-icon.fa-chevron-right').click();
		}
	};
	Tree.prototype.getScrollObject = function($object) {
		$object = $($object);
		if ($object[0].scrollHeight > $object[0].offsetHeight) {
			return $object;
		}
		var $parent = $($object.parent());

		if ($parent == null || $parent.length == 0 || $parent == $object || $parent[0].tagName == "BODY") {
			return $object;
		}
		return this.getScrollObject($parent);
	};
	Tree.prototype.showAndMoveToLiByData = function(data) {
		var bean = this.dataModel.getBean(data);
		this.openParentLiByBean(bean.parent);
		var thistreebeanid = bean.thistreebeanid;
		var $li = this.$tree.find('[coos-thistreebeanid="' + thistreebeanid + '"]');
		if ($li.length > 0) {
			$li.addClass('coos-tree-search-for-high-light');
			var $scrollObject = this.$scrollObject;
			var scrollTop = $li.offset().top - $scrollObject.offset().top - 60;
			$scrollObject.animate({
				scrollTop : scrollTop
			}, 300);
		}
		this.$searchPrompt.hide();
	};
	Tree.prototype.initSearchPrompt = function(searchDatas) {
		var $searchContainer = this.$searchContainer;
		var $searchPrompt = this.$searchPrompt;
		if ($searchPrompt == null) {
			this.$searchPrompt = $('<div class="coos-tree-search-prompt"><ul class=""></ul></div>');
			$searchPrompt = this.$searchPrompt;
			$searchContainer.append($searchPrompt);
		}
		var $ul = $searchPrompt.find('ul');
		$ul.empty();
		var $tree = this.$tree;
		var this_ = this;
		var $modelLi = $('<li></li>');
		$modelLi.append('<div class="coos-row coos-tree-row"></div>');
		$modelLi.find('.coos-tree-row').append('<div class="tree-row-content"></div>');
		$modelLi.find('.tree-row-content').append('<div class="tree-row-center"><span class="data-text"></span</div>');
		$modelLi.find('.tree-row-content').append('<div class="tree-row-right"></div>');
		var textname = this.config.property.text;
		var idname = this.config.property.id;
		var parentidname = this.config.property.parentid;
		if (searchDatas.length == 0) {
			var $li = $modelLi.clone();
			var $noDataLi = $('<li><div class="coos-no-matching-data">' + co.config.label.noMatchingData + '</div></li>');
			$ul.append($noDataLi);
		} else {
			$(searchDatas).each(function(index, searchData) {
				var $li = $modelLi.clone();
				$ul.append($li);
				var text = searchData[textname];
				$li.find('.data-text').append(text);
				$li.click(function() {
					var data = searchData;
					this_.showAndMoveToLiByData(data);
				});
			});
		}
		this.$searchPrompt.show();
	};
	Tree.prototype.searchLi = function(searchText, $content) {

		if (co.isEmpty(searchText)) {
			return [];
		}
		var $lis = [];
		var $texts = $content.find('li .data-text');
		$($texts).each(function(index, $text) {
			$text = $($text);
			var $li = $text.closest('li');
			var text = $text.text();
			if (co.has(text, searchText)) {
				$lis[$lis.length] = $li;
			}
		});
		return $lis;
	};
	Tree.prototype.searchData_ = function(searchText, $content, onlyData) {
		if (onlyData) {

		} else {
			$content.find('li').removeClass('tree-search-not-find tree-search-find');
			$content.find('li.coos-tree-has-child').addClass('open');
		}
		if (co.isEmpty(searchText)) {
			return [];
		}
		var datas = [];
		var $texts = $content.find('li .data-text');
		$($texts).each(function(index, $text) {
			$text = $($text);
			var $li = $text.closest('li');
			var text = $text.text();
			if (co.has(text, searchText)) {
				datas[datas.length] = $li.data('data');

				if (!onlyData) {
					$li.addClass('tree-search-find');
				}
			} else {
				if (!onlyData) {
					$li.addClass('tree-search-not-find');
				}
			}
		});
		if (!onlyData) {
			var $finds = $content.find('.tree-search-find');
			$($finds).each(function(index, $find) {
				$find = $($find);
				displayParentForSearch($find);
			});
		}
		return datas;
	};
	Tree.prototype.searchData = function(searchText) {
		if (co.isEmpty(searchText)) {
			return [];
		}
		var datas = this.dataModel.datas;
		var searchDatas = [];
		var idname = this.config.property.id;
		var textname = this.config.property.text;
		var parentidname = this.config.property.parentid;
		$(datas).each(function(index, data) {
			var text = data[textname];
			if (co.has(text, searchText)) {
				searchDatas[searchDatas.length] = data;
			}
		});
		return searchDatas;
	};
	Tree.prototype.searchContent = function(searchText, $content) {
		$content = $content || this.$tree;
		var searchDatas = this.searchData(searchText);
		$content.find('.coos-tree-search-for-high-light').removeClass('coos-tree-search-for-high-light');
		this.initSearchPrompt(searchDatas);
		if (co.isEmpty(searchText)) {
			this.$searchPrompt.hide();
		}
		return;
		if (this.config.openSearchPrompt) {
			var $lis = this.searchLi(searchText, $content);
			this.initSearchPrompt($lis);
			if ($lis.length == 0) {
				this.$searchPrompt.hide();
			}
		} else {
			var datas = this.searchData(searchText, $content);
			if (co.isEmpty(searchText)) {
				// this.$searchInput.val("");
			} else {
				// this.$searchInput.val(searchText);
			}
		}
		return datas;
	};
	Tree.prototype.search = function(searchText, $content) {
		$content = $content || this.$tree;
		var datas = this.onSearch(searchText, $content);
		return datas;
	};

	Tree.prototype.initLevel = function() {
		var $content = this.$tree;
		var this_ = this;
		if (co.isEmpty(this.closeLevelInited)) {
			this.closeLevelInited = true;
			if (!this.config.openSingleLevel) {

				var count = this.maxLevel || 1;
				if (!co.isEmpty(this.config.openLevel) && this.config.openLevel > 0) {
					count = this.config.openLevel;
				} else {
					count = 0;
				}

				if (count > 0) {
					for (var i = 1; i <= count; i++) {
						$($content.find('[li-level=' + i + '].coos-tree-has-child')).each(function(index, $li) {
							this_.opendOrCloseLi($($li), true);
						});
						// $content.find('[li-level=' + i +
						// '].coos-tree-has-child').addClass('open');
					}
				} else {
					$($content.find('li.coos-tree-has-child')).each(function(index, $li) {
						this_.opendOrCloseLi($($li), true);
					});
					// $content.find('li.coos-tree-has-child').addClass('open');
				}
				this.openLiByIds(this.config.openIds);
			} else {
				var $li = $content.find('li:first');
				$li.removeClass('open');
				// $li.find('.li-icon:first').addClass('fa fa-chevron-down');
				this.initSingleLevel($li);
			}

		}
		// if (!this.config.showLevelLine) {
		// setLiPadding($content, 0);
		// }

	};
	// function setLiPadding($ul, level) {
	// var $lis = $ul.find('>li');
	// $lis.each(function(index, $li) {
	// $li = $($li);
	// $li.find('.tree-row-content').css('margin-left', level * 25);
	// setLiPadding($li.find('ul:first'), level + 1);
	// });
	// }
	Tree.prototype.initLiLeftDistance = function($li) {
		if (!this.config.showLevelLine) {
			$li = $($li);
			var level = Number($li.attr('li-level'));
			$li.find('>.coos-row .tree-row-content').css('margin-left', (Number(level) - 1) * 25);
		}
	};

	Tree.prototype.initIcon = function($content) {
		$content = $content || this.$tree;

	};
	/**
	 * TODO 选中一个选项
	 */
	Tree.prototype.checkLi = function($li, checked) {
		if (!co.isBoolean(checked)) {
			checked = false;
		}
		$li = $($li);
		if ($li.length > 0) {
			var $input = $li.find('>.coos-row').find('input[type="checkbox"]:first');
			if ($input.length > 0) {
				$input[0].checked = checked;
			}
			var $input = $li.find('>.coos-row').find('input[type="radio"]:first');
			if ($input.length > 0) {
				$input[0].checked = checked;
			}
		}
		$li.data('checked', checked);
		var bean = this.getBean($li);
		if (bean) {
			if (checked) {
				this.checkedBeanMap[bean.id] = bean;
				if (this.checkedIdMap[bean.id]) {
					$li.removeAttr('delete-for-checkedid');
				}
			} else {
				if (this.checkedIdMap[bean.id]) {
					$li.attr('delete-for-checkedid', bean.id);
				}
				delete this.checkedBeanMap[bean.id];
			}
		}
	};
	/**
	 * TODO 选中父级
	 */
	Tree.prototype.checkParent = function($li) {
		$li = $($li);
		var checked = $li.data(checked);
		var $parentLi = $li.closest('ul').closest('li');
		if ($parentLi.length > 0) {
			//
			this.checkLi($parentLi, checked);
			this.checkedParent($parentLi);
		}
	};
	/**
	 * TODO 选中子集
	 */
	Tree.prototype.checkAllChild = function($li) {
		$li = $($li);
		var checked = $li.data('checked');

		var $childLis = $li.find('ul li');
		if ($childLis.length > 0) {
			var this_ = this;
			$childLis.each(function(index, $childLi) {
				$childLi = $($childLi);
				var bean = $childLi.data('bean');
				bean.mustcheckedchild = checked;
				this_.checkLi($childLi, checked);
			});
		}
	};
	Tree.prototype.validateForCheckParent = function($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck) {
		var $ul = $li.closest('ul');
		// 判断当前同级是否全部选中
		var $childlis = $ul.find('>li');
		var allChecked = true;
		var hasChecked = false;
		$childlis.each(function(index, $childli) {
			$childli = $($childli);
			if (!$childli.data('checked')) {
				allChecked = false;
			} else {
				hasChecked = true;
			}
		});
		var $parentLi = $ul.closest('li');
		if ($parentLi.length > 0) {
			if (allChecked) {
				if (!$parentLi.find('[type="checkbox"]:first')[0].checked) {
					if (findParentCheckNeedConfirm) {
						var this_ = this;
						co.box.confirm(co.config.label.confirmChecked + $parentLi.find('.data-text:first').text(), function() {
							this_.checkLi($parentLi, true);
							this_.validateForCheckParent($parentLi, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
						});
					} else {
						this.checkLi($parentLi, true);
						this.validateForCheckParent($parentLi, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
					}
				}
			} else {
				if (openHalfCheck && hasChecked) {
					this.checkLi($parentLi, true);
				} else {
					this.checkLi($parentLi, false);
				}
				this.validateForCheckParent($parentLi, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
			}
		}
	};
	Tree.prototype.liCheckboxChange = function($li) {
		var findParentCheckNeedConfirm = this.config.findParentCheckNeedConfirm;
		var findMismatchChildNeedConfirm = this.config.findMismatchChildNeedConfirm;
		var openHalfCheck = this.config.openHalfCheck;
		$li = $($li);
		var $input = $li.find('input[type="checkbox"]:first');
		if ($input.length == 0) {
			return;
		}
		var checked = $input[0].checked;
		var bean = this.getBean($li);
		if (checked) {
			bean.mustcheckedchild = true;
		} else {
			bean.mustcheckedchild = false;
		}
		this.checkLi($li, checked);
		if (checked) {
			var searchLis = getSearchFindLis($li);
			if (findMismatchChildNeedConfirm && searchLis.length > 0) {
				var this_ = this;
				co.box.confirm("选中该选项，会自动选中该项下的所有未展示子项", function() {
					this_.checkAllChild($li);
					this_.validateForCheckParent($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
				}, function() {
					this_.checkLi($li, false);
				});
			} else {
				this.checkAllChild($li);
				this.validateForCheckParent($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
			}
		} else {
			this.checkAllChild($li);
			this.validateForCheckParent($li, findParentCheckNeedConfirm, findMismatchChildNeedConfirm, openHalfCheck);
		}
	}
	Tree.prototype.initOpenOrCloseEvent = function($li) {

		$li.find('.tree-row-content .fa-circle-o-notch').unbind('click').on('click', function(e) {
		});
		$li.find('.tree-row-content .li-icon').unbind('click');
		var this_ = this;
		$li.find('.tree-row-content').find('.fa-chevron-down,.fa-chevron-right').on('click', function(e) {
			var $li = $(this).closest('li');
			this_.opendOrCloseLi($li);
			e.stopPropagation();
		});

	};
	Tree.prototype.initInputEvent = function($li) {
		var this_ = this;
		$li.find('.tree-row-content').unbind('click').on(
				'click',
				function(e) {
					var $target = $(e.target);
					if ($target.closest('.tree-row-right').length > 0) {
						return;
					}
					if ($target.closest('[type="checkbox"]').length > 0 || $target.closest('[type="radio"]').length > 0 || $target.closest('.icon').length > 0
							|| $target.closest('.tree-button-group').length > 0) {
						if ($target.closest('[type="radio"]').length > 0) {

						}
					} else {
						if (this_.config.clickLineSelect) {
							if ($(this).find('[type="radio"]').length > 0) {
								var $radio = $(this).find('[type="radio"]');
								if ($radio[0].checked) {
									$radio[0].checked = false;
								} else {
									$radio[0].checked = true;
								}
							}
							if ($(this).find('[type="checkbox"]').length > 0) {
								var $checkbox = $(this).find('[type="checkbox"]');
								$checkbox.click();
							}
						}
						this_.onClick($(this).closest('li'));
					}
				});
		$li.find('.tree-row-content input[type="checkbox"]').unbind('change').on('change', function() {
			this_.liCheckboxChange($(this).closest('li'));
			var checkedDeleteIds = [];
			var checkedDeleteDatas = [];
			$(this_.checkedIds).each(function(index, checkedId) {
				var $li = this_.$tree.find('li[coos-recordid="' + checkedId + '"]');
				if ($li.length > 0 && !$li.data('checked')) {
					checkedDeleteIds[checkedDeleteIds.length] = checkedId;
					checkedDeleteDatas[checkedDeleteDatas.length] = $li.data('data');
				}
			});
			this_.checkedDeleteIds = checkedDeleteIds;
			this_.checkedDeleteDatas = checkedDeleteDatas;
		});
		$li.find('.tree-row-content input[type="radio"]').unbind('click').on('click', function() {
			var $input = $(this);
		});
		if (this.config.checkboxDisabled) {
			$li.find('.tree-row-content input[type="checkbox"]').attr('disabled', 'disabled');
		}
		if (this.config.radioDisabled) {
			$li.find('.tree-row-content input[type="radio"]').attr('disabled', 'disabled');
		}
	};
	// Tree.prototype.initEvent = function($content) {
	//
	// var noChildTextIcon = this_.config.noChildTextIcon;
	// var $icons = $content.find('.li-icon ');
	// $icons.removeClass('fa-leaf fa-chevron-down fa-chevron-right
	// fa-circle-o-notch');
	// if (!co.isEmpty(noChildTextIcon)) {
	// $icons.removeClass(noChildTextIcon);
	// }
	// $content.find('.coos-tree-has-not-child
	// ').find('.li-icon:first').addClass(noChildTextIcon);
	// $content.find('.coos-tree-has-not-child
	// ').find('.li-icon:first').removeClass('coos-cursor-auto');
	// if (co.isEmpty(noChildTextIcon)) {
	// $content.find('.coos-tree-has-not-child
	// ').find('.li-icon:first').addClass('coos-cursor-auto');
	// }
	// $content.find('.coos-tree-has-child:not(.open)
	// ').find('.li-icon:first').addClass('fa fa-chevron-right');
	// if (!this_.config.openSingleLevel) {
	// $content.find('.coos-tree-has-child.open ').find('
	// .li-icon:first').addClass('fa fa-chevron-down');
	// } else {
	// $content.find('.coos-tree-has-child.open ').find('
	// .li-icon:first').addClass('fa fa-chevron-right');
	// }
	// $($childuls).each(function(liindex, $childul) {
	// $childul = $($childul);
	// var $icon = $childul.closest('li').find('.li-icon:first');
	// if ($childul.find('>li').length ==
	// $childul.find('>li.tree-search-not-find').length) {
	// $icon.removeClass('fa-leaf fa-chevron-down fa-chevron-right
	// fa-circle-o-notch');
	// if (!co.isEmpty(noChildTextIcon)) {
	// $icon.addClass(noChildTextIcon);
	// }
	// }
	// });
	// $content = $content || this.$tree;
	//
	// var $childuls = $content.find('.coos-tree-child');
	// var this_ = this;
	// $content.find('li .tree-row-content').unbind('click').on('click',
	// function(e) {
	// var $target = $(e.target);
	// if ($target.closest('.tree-row-right').length > 0) {
	// return;
	// }
	// if ($target.closest('[type="checkbox"]').length > 0 ||
	// $target.closest('[type="radio"]').length > 0 ||
	// $target.closest('.icon').length > 0 ||
	// $target.closest('.tree-button-group').length > 0) {
	// if ($target.closest('[type="radio"]').length > 0) {
	//
	// }
	// } else {
	// if (this_.config.clickLineSelect) {
	// if ($(this).find('[type="radio"]').length > 0) {
	// var $radio = $(this).find('[type="radio"]');
	// if ($radio[0].checked) {
	// $radio[0].checked = false;
	// } else {
	// $radio[0].checked = true;
	// }
	// }
	// if ($(this).find('[type="checkbox"]').length > 0) {
	// var $checkbox = $(this).find('[type="checkbox"]');
	// $checkbox.click();
	// }
	// }
	// this_.onClick($(this).closest('li'));
	// }
	// });
	//
	// }

	Tree.prototype.getData = function($li) {
		return this.getBean($li).data;
	};
	Tree.prototype.getBean = function($li) {
		var thistreebeanid = $li.attr('coos-thistreebeanid');
		var bean = this.dataModel.getBeanById(thistreebeanid);
		return bean;
	};
	Tree.prototype.getChildDatas = function($li) {
		var thisData = this.getData($li);
		var dataBean = this.dataModel.getBean(thisData);
		var childDatas = [];
		if (dataBean.childBeans) {
			$(dataBean.childBeans).each(function(index, childBean) {
				childDatas[childDatas.length] = childBean.data;
			});
		}
		return childDatas;
	};
	Tree.prototype.getChildBeans = function($li) {
		var thisData = this.getData($li);
		var dataBean = this.dataModel.getBean(thisData);
		var childBeans = dataBean.childBeans;
		return childBeans;
	};
	Tree.prototype.getNotViewChildBeans = function($li) {
		var thisData = this.getData($li);
		var dataBean = this.dataModel.getBean(thisData);
		var childBeans = [];
		$(dataBean.childBeans).each(function(index, childBean) {
			if (!childBean.viewed) {
				childBeans[childBeans.length] = childBean;
			}
		});
		return childBeans;
	};
	Tree.prototype.loadChildData = function($li, callback) {
		var bean = this.getBean($li);
		var this_ = this;
		var loadChildDataCallback = function(childDatas) {
			var childBeans = this_.dataModel.appendChildDatas(bean, childDatas);
			callback && callback(childBeans);
		};
		if (this.config.loadChildData) {
			this.config.loadChildData($li, bean.data, loadChildDataCallback);
		} else {
			loadChildDataCallback();
		}
	};
	Tree.prototype.appendChildBeansToLi = function($li, childBeans) {
		var property = this.config.property;
		var liConfig = {};
		liConfig.hasCheckbox = this.config.hasCheckbox;
		liConfig.hasRadio = this.config.hasRadio;
		liConfig.buttons = this.config.buttons;
		liConfig.radioName = this.config.radioName;
		liConfig.property = this.config.property;
		var openLazyRendering = this.config.openLazyRendering;

		var $lis = this.createChildUl($li, childBeans, {
			property : property,
			liConfig : liConfig,
			appendFront : false,
			openLazyRendering : openLazyRendering,
			isLazyRendering : true
		});
		var checkedIdMap = this.checkedIdMap;
		var this_ = this;
		var bean = this.getBean($li);
		if (bean.mustcheckedchild) {
			$($lis).each(function(index, $li_) {
				$li_ = $($li_);
				var recordid = $li_.attr('coos-recordid');
				var bean_ = $li_.data('bean');
				bean_.mustcheckedchild = true;
				this_.checkLi($li_, true);
			});
		} else {
			$($lis).each(function(index, $li_) {
				$li_ = $($li_);
				var recordid = $li_.attr('coos-recordid');
				if (checkedIdMap[recordid]) {
					if ($li_.closest('[delete-for-checkedid]').length < 1) {
						this_.checkLi($li_, true);
					}
				}
			});
		}
	}
	Tree.prototype.beforeOpen = function($li, callback) {
		var bean = this.getBean($li);
		var this_ = this;
		var beforeCallback = function() {
			if (this_.config.beforeOpen) {
				var thisData = this_.getData($li);
				var childDatas = this_.getChildDatas($li);
				this_.config.beforeOpen($li, thisData, childDatas);
			}
			callback && callback();
		};
		var needexecutecallback = true;
		if (this.config.openLazyLoadChildData) {
			if (!bean.lazyloadchilded) {
				bean.lazyloadchilded = true;
				if (bean.haschild) {
					needexecutecallback = false;
					var this_ = this;
					this.loadChildData($li, function(childBeans) {
						this_.appendChildBeansToLi($li, childBeans);
						beforeCallback();
					});
				}
			}
		}
		if (this.config.openLazyRendering) {
			if (!bean.lazyrenderinged) {
				bean.lazyrenderinged = true;
				this.appendChildBeansToLi($li, this.getNotViewChildBeans($li));
			}
		}
		if (needexecutecallback) {
			beforeCallback();
		}

	};
	Tree.prototype.afterOpen = function($li) {
		if (this.config.afterOpen) {
			var thisData = this.getData($li);
			var childDatas = this.getChildDatas($li);
			this.config.afterOpen($li, thisData, childDatas);
		}
	};
	Tree.prototype.beforeClose = function($li) {
	};
	Tree.prototype.afterClose = function($li) {
	};
	Tree.prototype.opendOrCloseLi = function($li, open) {
		if (!this.config.openSingleLevel) {

			if (!$li.hasClass('open') || open) {
				this.opendLi($li);
			} else {
				this.closeLi($li);
			}
		} else {
			this.opendLi($li);
		}
	};

	Tree.prototype.opendLi = function($li) {
		if (!$li.attr('coos-recordid')) {
			return;
		}
		if (!this.config.openSingleLevel) {
			if (!$li.hasClass('open')) {
				var this_ = this;
				this.beforeOpen($li, function() {
					var $icon = $li.find('>.coos-row .fa-chevron-down:first,>.coos-row .fa-chevron-right:first');
					$icon.removeClass('fa-chevron-down fa-chevron-right');
					$li.addClass('open');
					$icon.addClass('fa fa-chevron-down');
					var $parentli = $li.closest('ul').closest('li');
					if ($parentli.length > 0) {
						this_.opendLi($parentli);
					}
					this_.afterOpen($li);
				});

			}
		} else {
			$li.removeClass('open');

			this.initSingleLevel($li);
		}
		this.initOpenOrCloseEvent($li);
	};
	Tree.prototype.closeLi = function($li) {

		this.beforeClose($li);
		var $icon = $li.find('>.coos-row .fa-chevron-down:first,>.coos-row .fa-chevron-right:first');
		$icon.removeClass('fa-chevron-down fa-chevron-right');

		$li.removeClass('open');
		$icon.addClass('fa fa-chevron-right');
		this.afterClose($li);
		this.initOpenOrCloseEvent($li);
	};

	Tree.prototype.initParentSingleLevel = function($li) {
		// 打开单层
		if (this.config.openSingleLevel) {
			var parentid = $li.attr('coos-recordparentid');
			if (co.isEmpty(parentid)) {
				return;
			}
			var $parentli = $li.closest('ul').closest('[coos-recordid="' + parentid + '"]');
			if ($parentli.length > 0) {
				this.initSingleLevel($parentli);
			}
		}
	};
	Tree.prototype.initSingleLevel = function($li) {
		// 打开单层
		if (this.config.openSingleLevel) {
			this.initParentSingleLevel($li);
			if ($li.hasClass('open')) {

			} else {
				var this_ = this;
				this.beforeOpen($li, function() {
					var level = getLiLevel($li);
					$li.closest('ul').find('.coos-tree-has-child').css('margin-top', '0px');
					$li.closest('ul').find('li.open').removeClass('open');
					// this.$tree.find('li.open').removeClass('open');
					$li.addClass('open').css('margin-top', '0px');
					var $ul = $li.find('ul:first');
					var liHeight = $ul.find('>li:first').height();
					if (this_.liHeight == null) {
						this_.liHeight = 30;
					}
					$li.closest('ul').find('li').hide();
					$li.show();
					$ul.find('>li').show();
					$li.css('margin-top', -this_.liHeight * (1) + (1));

					this_.$onLineTree.empty();
					this_.$tree.find('li').removeClass('single-level-select');
					$li.addClass('single-level-select');
					appendOnLineTree(this_.$onLineTree, $li);
					this_.afterOpen($li);
				});

			}
		}
	};
	function appendOnLineTree($onLineTree, $handleLi, flag) {
		if ($handleLi.length < 1) {
			return;
		}
		var data = $handleLi.data('data');
		var bean = $handleLi.data('bean');
		var config = $handleLi.data('config');
		var $handleUl = $handleLi.closest('ul');
		config.hasCheckbox = false;
		config.hasRadio = false;
		var $li = createLi(bean, config);
		$li.find('.tree-row-right').remove();
		$li.find('.tree-row-left').remove();
		if (flag) {
			$li.addClass('can-point');
			$li.click(function() {
				$handleLi.find('.icon:first').click();
			});
		}
		$onLineTree.prepend($li);

		if (!$handleUl.hasClass('coos-tree')) {
			var $icon = $('<i class="right-icon fa fa-angle-right"></i>');
			$li.find('.tree-row-center').before($icon);
			appendOnLineTree($onLineTree, $handleUl.closest('li'), true);
		} else {
			var $lis = $onLineTree.find('>li');
			var width = 0;
			var lastLeft = 0;
			$($lis).each(function(index, $li) {
				$li = $($li);
				width += $li.width();
				if (index == ($lis.length - 1)) {
					lastLeft = width;
				}
			});
			$onLineTree.css('min-width', width + 20);
			var $lastLi = $onLineTree.find('>li:last');

			$onLineTree.parent().scrollLeft(lastLeft);
		}
	}
	function getLiLevel($li, level) {
		level = level || 1;
		var $ul = $li.closest('ul');
		if ($ul.hasClass('coos-tree')) {
			return level;
		} else {
			return getLiLevel($ul.closest('li'), level + 1);
		}
	}
	Tree.prototype.build = function() {
		var $ul = createUl();
		// if (this.config.openLazyLoadChildData ||
		// this.config.openLazyRendering) {
		// this.config.openSearchPrompt = true;
		// }
		this.$content.append($ul);
		$ul.addClass('coos-tree ');
		this.$scrollObject = this.config.$scrollObject;
		if (!co.isEmpty(this.config.treeUlHeight)) {
			$ul.css('height', this.config.treeUlHeight);
			this.$scrollObject = $ul;
		}
		if (this.$scrollObject == null) {
			this.$scrollObject = $('html,body');
		}
		if (!this.config.showLevelLine) {
			$ul.addClass('coos-tree-no-level-line');
		}
		if (!this.config.showLevel) {
			$ul.addClass('coos-tree-no-level');
		}

		if (this.config.hasSearch) {
			var $searchContainer = this.$searchContainer = $('<div class="coos-tree-search-container"></div>');
			this.$searchInput = $('<input class="coos-tree-search-input" />');
			this.$searchInput.attr('placeholder', this.config.searchInputPlaceholder || co.config.label.searchInputPlaceholder);
			this.$searchButton = $('<a class="coos-tree-search-button">' + co.config.label.search + '</a>');
			if (!co.isEmpty(this.config.searchButtonText)) {
				this.$searchButton.text(this.config.searchButtonText);
			} else {
				this.$searchButton.html("<i class='fa fa-search'></i>");
			}
			var $onLineTreeContent = $('<div class="coos-on-line-container"></div>');
			$searchContainer.append(this.$searchInput);
			$searchContainer.append(this.$searchButton);
			$ul.before($searchContainer);

			var this_ = this;
			this.$searchButton.click(function() {
				var searchText = this_.$searchInput.val();
				this_.search(searchText, this_.$tree);
			});
			if (this.config.openSearchPrompt) {
				var searchInputE = this.$searchInput[0];
				if (searchInputE.attachEvent) {
					searchInputE.attachEvent('onpropertychange', function() {
						var searchText = this_.$searchInput.val();
						this_.search(searchText, this_.$tree);
					});
				} else {
					var cpLock = false;
					searchInputE.addEventListener('compositionstart', function() {
						cpLock = true;
					})
					searchInputE.addEventListener('compositionend', function() {
						cpLock = false;
						if (!cpLock) {
							var searchText = this_.$searchInput.val();
							this_.search(searchText, this_.$tree);
						}
					})
					searchInputE.addEventListener('input', function() {
						if (!cpLock) {
							var searchText = this_.$searchInput.val();
							this_.search(searchText, this_.$tree);
						}
					});
				}

				// this.$searchInput.on('input', function(e) {
				// var searchText = this_.$searchInput.val();
				// this_.search(searchText, this_.$tree);
				// });
			}
			this.$searchInput.on('keydown', function(e) {
				var target, code, tag;
				if (!event) {
					event = window.event;
					target = event.srcElement;
					code = event.keyCode;
				} else {
					target = event.target;
					code = event.keyCode;
				}
				if (code == 13) {
					var searchText = this_.$searchInput.val();
					this_.search(searchText, this_.$tree);
				}

			});

		}
		if (this.config.openSingleLevel) {
			$ul.addClass('coos-tree-open-single-level');
			this.$onLineTree = $('<ul class="coos-on-line-tree"></ul>');
			var $onLineTreeContent = $('<div class="coos-on-line-container"></div>');
			$onLineTreeContent.append(this.$onLineTree);
			$ul.before($onLineTreeContent);
		}
		this.$tree = $ul;
		var datas = this.config.datas;
		if (datas.length > 0) {

			var liConfig = {};
			liConfig.hasCheckbox = this.config.hasCheckbox;
			liConfig.hasRadio = this.config.hasRadio;
			liConfig.buttons = this.config.buttons;
			liConfig.radioName = this.config.radioName;
			liConfig.property = this.config.property;
			var openLazyRendering = this.config.openLazyRendering;
			var dataModel = this.dataModel;
			var topBean = dataModel.topBean;
			var this_ = this;
			if (topBean != null) {
				var $li = createLi(topBean, liConfig, 1);
				$ul.append($li);
				this.createChildUl($li, dataModel.topBeans, {
					liConfig : liConfig,
					appendFront : false,
					openLazyRendering : openLazyRendering
				});
			} else {
				$(dataModel.topBeans).each(function(index, topBean) {
					var $li = createLi(topBean, liConfig, 1);
					$ul.append($li);
					this_.createChildUl($li, topBean.childBeans, {
						liConfig : liConfig,
						appendFront : false,
						openLazyRendering : openLazyRendering
					});
				});
			}
			co.element.init(this.$tree);
			this.initCheckeds();
		} else {
			var $noDataLi = $('<li><div class="coos-no-matching-data">' + co.config.label.noMatchingData + '</div></li>');
			$ul.append($noDataLi);
		}

	};
	/**
	 * TODO 创建子列表
	 */
	Tree.prototype.createChildUl = function($li, childBeans, config) {
		this.initInputEvent($li);
		this.initLiLeftDistance($li);
		var bean = this.getBean($li);
		config = config || {};
		var property = config.property || this.config.property;
		var haschild = bean.haschild;
		var liConfig = config.liConfig;
		var appendFront = config.appendFront;
		var openLazyRendering = config.openLazyRendering;
		var isLazyRendering = config.isLazyRendering;
		appendFront = appendFront || false;
		if (childBeans == null || childBeans.length == 0) {
			if (!this.config.openLazyLoadChildData || !haschild) {
				$li.addClass('coos-tree-has-not-child');
				return null;
			}
		}
		var level = $li.attr('li-level');
		level = level || 1;
		level++;
		this.maxLevel = this.maxLevel || level;
		if (level > this.maxLevel) {
			this.maxLevel = level;
		}
		var $ul = $li.find('>ul:first');
		var $firstli = null;
		if ($ul.length < 1) {
			$ul = createUl(level);
			$ul.addClass('coos-tree-child');
			$li.append($ul);
		} else {
			$firstli = $ul.find('>li:first');
			$firstli = $firstli.length < 1 ? null : $firstli;
		}
		var $lis = [];
		$li.addClass('coos-tree-has-child');
		$li.find('>.coos-tree-row .li-icon').addClass('fa-chevron-right');
		if (!openLazyRendering || isLazyRendering) {
			var this_ = this;
			bean.childLoaded = true;
			$(childBeans).each(function(index, childBean) {
				var $li = createLi(childBean, liConfig, level);
				$lis[$lis.length] = $li;
				if (!appendFront) {
					$ul.append($li);
				} else {
					if ($firstli == null) {
						$ul.append($li);
					} else {
						$firstli.before($li);
					}
				}
				this_.createChildUl($li, childBean.childBeans, {
					property : property,
					liConfig : liConfig,
					openLazyRendering : openLazyRendering
				});
			});
		}
		this.initOpenOrCloseEvent($li);
		return $lis;
	};
	Tree.prototype.initCheckeds = function() {
		var $tree = this.$tree;
		var checkedIds = this.config.checkedIds;
		var this_ = this;
		$(checkedIds).each(function(index, checkedId) {
			var $li = $tree.find('li[coos-recordid="' + checkedId + '"]');
			this_.checkLi($li, true);
		});
	};
	// 打开选中的节点
	Tree.prototype.openCheckedNode = function() {
		var $checkboxs = this.$tree.find('input[type="checkbox"]');
		var this_ = this;
		$checkboxs.each(function(index, $checkbox) {
			$checkbox = $($checkbox);
			if ($checkbox[0].checked) {
				var $li = $checkbox.closest('li');
				var $parentli = $li.closest('ul').closest('li');
				if ($parentli.length > 0) {
					this_.opendLi($parentli);
				}
			}
		});
	};
	Tree.prototype.append = function($li, datas, config, appendFront) {
		if (!datas || datas.length < 1) {
			return;
		}
		var bean = this.getBean($li);
		config = config || this.config;
		var property = config.property || this.config.property;
		var liConfig = {};
		liConfig.hasCheckbox = config.hasCheckbox;
		liConfig.addClass = config.addClass;
		liConfig.hasRadio = config.hasRadio;
		liConfig.buttons = config.buttons || this.config.buttons;
		liConfig.radioName = config.radioName || this.config.radioName;
		liConfig.property = property;
		var openLazyRendering = this.config.openLazyRendering;
		var childBeans = this.dataModel.appendChildDatas(bean, datas, liConfig);
		var $lis = this.createChildUl($li, childBeans, {
			property : property,
			liConfig : liConfig,
			appendFront : appendFront,
			openLazyRendering : false,
			isLazyRendering : true
		});
		this.initLevel();
		co.element.init($li);
		this.initSingleLevel($li);
		if ($li.hasClass('open')) {

		} else {
			$li.find('.li-icon:first').click();
		}
		return $lis;
	};
	Tree.prototype.appendChildLiEndInfos = function($li, infos) {
		var $lis = $li.find('>ul>li');
		if ($lis.length == infos.length) {
			var this_ = this;
			$($lis).each(function(index, $li) {
				this_.appendLiEndInfo($($li), infos[index]);
			});
		}
	};
	Tree.prototype.appendLiEndInfo = function($li, info) {
		var $row = $li.find('>.coos-row');
		var $rowright = $row.find('.tree-row-right');
		var hasButton = $row.find('.tree-button').length > 0;
		$rowright.removeClass('has-end-info');
		$rowright.removeClass('has-end-button');
		if (hasButton) {
			$rowright.addClass('has-end-button');
		}
		$rowright.find('.data-end-info').remove();
		if (!co.isEmpty(info)) {
			$rowright.addClass('has-end-info');
			var $info = $('<span class="data-end-info"></span>');
			$rowright.append($info);
			$info.append(info);
		}
	};
	Tree.prototype.getBeanChildDatas = function(bean) {

	};
	Tree.prototype.getAllChildDatas = function(bean) {
		var datas = [];
		var this_ = this;
		$(bean.childBeans).each(function(index, childBean) {
			datas[datas.length] = childBean.data;
			var childDatas = this_.getAllChildDatas(childBean);
			$(childDatas).each(function(index, childData) {
				datas[datas.length] = childData;
			});
		});
		return datas;
	};
	Tree.prototype.getCheckedDatas = function(needchilddata) {
		if (typeof (needchilddata) == "undefined") {
			needchilddata = true;
		}
		var result = {};

		var $lis = this.$tree.find('li');
		var datas = [];
		for ( var id in this.checkedBeanMap) {
			var bean = this.checkedBeanMap[id];
			var parentid = bean.parentid;
			var data = bean.data;
			datas[datas.length] = data;
			// 判断当前Bean子数据有没有被渲染
			if (bean.childLoaded) {

			} else {
				if (bean.mustcheckedchild) {
					var childDatas = this.getAllChildDatas(bean);
					$(childDatas).each(function(index, childData) {
						datas[datas.length] = childData;
					});
				}
			}
		}
		// var $checkboxs = this.$tree.find('input[type="checkbox"]');
		// $checkboxs.each(function(index, $checkbox) {
		// $checkbox = $($checkbox);
		// if ($checkbox[0].checked) {
		// var $li = $checkbox.closest('li');
		// var data = $li.data('data');
		// datas[datas.length] = data;
		// }
		// });
		var $radios = this.$tree.find('input[type="radio"]');
		var checkedData = {};
		$($radios).each(function(index, $radio) {
			$radio = $($radio);
			if ($radio[0].checked) {
				var $li = $radio.closest('li');
				var name = $radio.attr('name');
				checkedData[name] = $li.data('data');
			}
		});
		result.checkedDeleteIds = this.checkedDeleteIds || [];
		result.checkedDeleteDatas = this.checkedDeleteDatas || [];
		result.checkedDatas = datas;
		result.checkedData = checkedData;
		return result;
	};

	co.tree = function(config) {
		var start = new Date().getTime();
		var t = new Tree(config);
		var end = new Date().getTime();
		return t;
	};

})();

})(window, jQuery);