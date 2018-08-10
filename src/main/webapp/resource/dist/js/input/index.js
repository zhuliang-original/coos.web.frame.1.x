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

	var SELECT_DATA_CACHE_LOADING = {};
	var SELECT_DATA_CACHE_LOADED = {};

	co.input.getSelectOptionsUrl = function($selector) {
		$selector = $($selector);
		var url = '/core/common/getSelectOptions.data?';
		if (!co.isEmpty($selector.attr('option-load-url'))) {
			url = $selector.attr('option-load-url');
		} else if (!co.isEmpty($selector.attr('option-load-dictionaryname'))) {
			url += '&dictionaryname=' + $selector.attr('option-load-dictionaryname');
		} else if (!co.isEmpty($selector.attr('option-load-selectid'))) {
			url += '&selectid=' + $selector.attr('option-load-selectid');
		}
		return url;
	};

	co.input.initLoadSelectOptions = function($select, callback) {
		var url = co.input.getSelectOptionsUrl($select);
		co.input.loadSelectOptions(url, function(result) {
			co.input.appendSelectOptions($select, result);
			callback && callback(result);
		});
	};
	co.input.appendSelectOptions = function($select, result) {
		if ($select.data('select-option-appended')) {
			return;
		} else {
			var options = result.options;
			$(options).each(function(index, option) {
				var $option = $('<option/>');
				for ( var key in option) {
					$option.attr(key, option[key]);
				}
				$option.html(option.text);
				$select.append($option);
			});
		}
	};

	co.input.loadSelectOptions = function(url, callback) {
		if (coos.isEmpty(url)) {
			return;
		}
		if (SELECT_DATA_CACHE_LOADED[url]) {
			callback && callback(SELECT_DATA_CACHE_LOADED[url]);
		} else {
			var callbacks = SELECT_DATA_CACHE_LOADING[url] || [];
			callbacks.push(callback);
			SELECT_DATA_CACHE_LOADING[url] = callbacks;
			if (SELECT_DATA_CACHE_LOADING[url].length > 1) {
				return;
			}
			var data = {};
			var requestUrl = coos.url.format(url);
			$.get(requestUrl, function(o) {
				var status = o.data;
				var result = status.result || [];
				SELECT_DATA_CACHE_LOADED[url] = result;
				var callbacks = SELECT_DATA_CACHE_LOADING[url];
				$(callbacks).each(function(index, callback) {
					callback && callback(result);
				});
			});
		}
	};
	$(function() {
		co.input.init();
	});
})();