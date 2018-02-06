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