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
})();