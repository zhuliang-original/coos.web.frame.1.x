(function(window, jQuery, coos) {
	var PageModelMap = {};
	coos.page.model = {};
	coos.page.model.defind = function(type, config, constructor) {
		config = config || {};
		if (PageModelMap[type] == null) {
			config.type = type;
			PageModelMap[type] = {};
			PageModelMap[type].config = config;
			PageModelMap[type].constructor = constructor;
		}
	};
	coos.page.model.get = function(type) {
		return PageModelMap[type];
	};
	coos.page.model.list = function() {
		var list = [];
		for ( var type in PageModelMap) {
			list[list.length] = PageModelMap[type];
		}
		return list;
	};
	coos.page.model.create = function(type, config) {
		return new PageModelMap[type].constructor(config);
	};

	coos.page.create = function(config) {

		var pageid = config.pageid;
		if (!coos.isEmpty(pageid)) {
			config.page = loadEntityPage(pageid, config.requestmap, config.design);
		}
		var page = config.page;
		var type = page.type;
		if (coos.isEmpty(type)) {
			type = "BASE";
		}
		page.type = type;
		if (coos.page.model.get(type) == null) {
			throw new Error(type + " page is not defined");
		}
		return coos.page.model.create(type, config);
	};
})(window, jQuery, coos);