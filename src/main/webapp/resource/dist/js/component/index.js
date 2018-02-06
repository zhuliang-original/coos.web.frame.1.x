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