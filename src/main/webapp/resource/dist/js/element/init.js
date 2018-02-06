(function() {
	co.element.init = function(content) {

	}

	co.element.isInited = function(element, type) {
		element = $(element);
		var inited = element.data('core-' + type + '-inited');
		if (inited) {
			return true;
		}
		if (element.closest('[core-model]').length > 0) {
			return true;
		}
		if (element.closest('[core-template]').length > 0) {

		}
		element.data('core-' + type + '-inited', true);
		return false;

	};
})();