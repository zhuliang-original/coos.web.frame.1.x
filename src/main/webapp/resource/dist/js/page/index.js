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