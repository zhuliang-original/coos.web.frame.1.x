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
		var coreid = element.attr('core-id');
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