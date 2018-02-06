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
			co.button.doBack(this);
		});

	});
})();