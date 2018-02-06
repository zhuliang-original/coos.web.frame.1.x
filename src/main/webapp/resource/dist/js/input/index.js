(function() {
	co.input = new Object();

	var bindFunctionMap = {};
	co.input.init = function($container) {
		$container = $container || $('body');
		$container = $($container);
		co.input.init_('group', $container);
		for (type in bindFunctionMap) {
			if (type != 'group') {
				co.input.init_(type, $container);
			}
		}
	};

	co.input.init_ = function(type, $container) {
		var config = bindFunctionMap[type];
		if (config && config.bind) {
			var $selectors = $container.find('.input-rule-' + type);
			var bind = config.bind;
			$($selectors).each(function(index, $selector) {
				$selector = $($selector);
				if (!co.input.isBinded($selector, type)) {
					bind($selector);
				}
			});
		}
	};

	co.input.bind = function(type, bindFunction) {
		var config = {
			type : type,
			bind : bindFunction
		};
		bindFunctionMap[type] = config;
	};

	co.input.isBinded = function($selector, type) {
		$selector = $($selector);
		var inited = $selector.data('coos-input-rule-' + type + '-binded');
		if (inited) {
			return true;
		}
		if ($selector.closest('[coos-model]').length > 0) {
			return true;
		}
		// if ($selector.closest('[coos-template]').length > 0) {
		//
		// }
		$selector.data('coos-input-rule-' + type + '-binded', true);
		return false;
	};
	$(function() {
		co.input.init();
	});
})();