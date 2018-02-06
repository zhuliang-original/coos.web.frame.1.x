(function(window, jQuery, coos) {
	coos.page.event = {};
	coos.page.event.bind = function(config) {
		config = config || {};
		var dataConfig = config.dataConfig || {};
		dataConfig.request = config.pageObject.config.requestmap;
		coos.page.event.create(config);
	};
})(window, jQuery, coos);