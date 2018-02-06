(function(window, jQuery) {
	var PageModelMap = {};
	co.page.model = {};
	co.page.model.defind = function(type, config, constructor) {
		config = config || {};
		if (PageModelMap[type] == null) {
			config.type = type;
			PageModelMap[type] = {};
			PageModelMap[type].config = config;
			PageModelMap[type].constructor = constructor;
		}
	};
	co.page.model.get = function(type) {
		return PageModelMap[type];
	};
	co.page.model.list = function() {
		var list = [];
		for ( var type in PageModelMap) {
			list[list.length] = PageModelMap[type];
		}
		return list;
	};
	co.page.model.create = function(type, config) {
		return new PageModelMap[type].constructor(config);
	};

	co.page.create = function(config) {

		var pageid = config.pageid;
		if (!co.isEmpty(pageid)) {
			var requestmap = config.requestmap || {};
			requestmap = jQuery.extend(true, {}, requestmap);
			config.page = loadEntityPage(pageid, requestmap, config.design);
		}
		var page = config.page;
		var type = page.type;
		if (co.isEmpty(type)) {
			type = "BASE";
		}
		page.type = type;
		if (co.page.model.get(type) == null) {
			throw new Error(type + " page is not defined");
		}
		return co.page.model.create(type, config);
	};
})(window, jQuery);