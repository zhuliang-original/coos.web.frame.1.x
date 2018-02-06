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

})();