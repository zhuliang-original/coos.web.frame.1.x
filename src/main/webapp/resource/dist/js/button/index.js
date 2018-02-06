(function() {
	co.button = {};

	var bindFunctionMap = {};
	co.button.init = function($container) {
		$container = $container || $('body');
		$container = $($container);
		for (type in bindFunctionMap) {
			co.button.init_(type, $container);
		}
	};

	co.button.init_ = function(type, $container) {
		var config = bindFunctionMap[type];
		if (config && config.bind) {
			var $selectors = $container.find('.button-rule-' + type);
			var bind = config.bind;
			$($selectors).each(function(index, $selector) {
				$selector = $($selector);
				if (!co.button.isBinded($selector, type)) {
					bind($selector);
				}
			});
		}
	};

	co.button.bind = function(type, bindFunction) {
		var config = {
			type : type,
			bind : bindFunction
		};
		bindFunctionMap[type] = config;
	};

	co.button.isBinded = function($selector, type) {
		$selector = $($selector);
		var inited = $selector.data('coos-button-rule-' + type + '-binded');
		if (inited) {
			return true;
		}
		if ($selector.closest('[coos-model]').length > 0) {
			return true;
		}
		// if ($selector.closest('[coos-template]').length > 0) {
		//
		// }
		$selector.data('coos-button-rule-' + type + '-binded', true);
		return false;
	};
	$(function() {
		co.button.init();
	});
})();