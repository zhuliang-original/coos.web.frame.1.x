(function(window, jQuery) {
	co.page.event = {};
	co.page.event.bind = function(config) {
		config = config || {};
		var dataConfig = config.dataConfig || {};
		var requestmap = config.pageObject.config.requestmap || {};
		requestmap = jQuery.extend(true, {}, requestmap);
		dataConfig.request = requestmap;
		co.page.event.create(config);
	};
})(window, jQuery);