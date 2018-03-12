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