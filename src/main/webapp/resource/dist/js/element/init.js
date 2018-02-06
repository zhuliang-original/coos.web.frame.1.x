(function() {
	co.element.init = function(content) {

	}

	co.element.isInited = function(element, type) {
		element = $(element);
		var inited = element.data('coos-' + type + '-inited');
		if (inited) {
			return true;
		}
		if (element.closest('[coos-model]').length > 0) {
			return true;
		}
		if (element.closest('[coos-template]').length > 0) {

		}
		element.data('coos-' + type + '-inited', true);
		return false;

	};
})();