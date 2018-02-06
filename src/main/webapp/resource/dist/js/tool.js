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
	co.isEmpty = function(arg) {
		return typeof (arg) == "undefined" || arg == null || arg.length == 0;
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

	co.initImage = function($selector) {
		$selector = $($selector);
		if ($selector.data('coos-image-inited')) {
			return;
		}
		$selector.data('coos-image-inited', true);
		var path = $selector.attr('coos-path') || $selector.attr('path');
		var tagName = $selector[0].tagName;
		var noimg = co.resource.images.noimg;
		var notfindimg = co.resource.images.notfindimg;
		if (co.isEmpty(path)) {
			if (tagName == 'IMG') {
				$selector.attr('src', noimg);
			} else {
				$selector.css('background-image', 'url("' + noimg + '")');
			}
			return;
		}
		if (path.indexOf(',') > 0) {
			path = path.split(',')[0];
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
	};
})();