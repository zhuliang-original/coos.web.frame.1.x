(function() {
	co.element = {};

	var bindFunctionMap = {};
	var bindFunctionList = [];
	co.element.init = function($container) {
		co.input.init();
		$container = $container || $('body');
		$container = $($container);
		for (type in bindFunctionMap) {
			co.element.init_(type, $container);
		}
		$(bindFunctionList).each(function(index, bindFunction) {
			bindFunction && bindFunction($container);
		});
		co.button.init();
	};

	co.element.init_ = function(type, $container) {
		var config = bindFunctionMap[type];
		if (config && config.bind) {
			var $selectors = $container.find('.element-rule-' + type);
			var bind = config.bind;
			$($selectors).each(function(index, $selector) {
				$selector = $($selector);
				if (!co.element.isBinded($selector, type)) {
					bind($selector);
				}
			});
		}
	};

	co.element.bind = function(arg1, arg2) {
		if (co.isFunction(arg1)) {
			bindFunctionList.push(arg1);
		} else {
			var config = {
				type : arg1,
				bind : arg2
			};
			bindFunctionMap[arg1] = config;
		}
	};

	co.element.isBinded = function($selector, type) {
		$selector = $($selector);
		var inited = $selector.data('coos-element-rule-' + type + '-binded');
		if (inited) {
			return true;
		}
		if ($selector.closest('[coos-model]').length > 0) {
			return true;
		}
		// if ($selector.closest('[coos-template]').length > 0) {
		//
		// }
		$selector.data('coos-element-rule-' + type + '-binded', true);
		return false;
	};
	$(function() {
		co.element.init();
	});
})();