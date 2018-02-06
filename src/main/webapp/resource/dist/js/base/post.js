(function() {
	co.POST = function(action, data, type, callback, async, config) {
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
})();