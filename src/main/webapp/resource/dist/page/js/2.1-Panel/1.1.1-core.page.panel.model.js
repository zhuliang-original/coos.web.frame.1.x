(function(window, jQuery) {
	var PanelModelMap = {};
	co.page.panel.model = {};
	co.page.panel.model.defind = function(type, config, constructor) {
		config = config || {};
		if (PanelModelMap[type] == null) {
			config.type = type;
			PanelModelMap[type] = {};
			PanelModelMap[type].config = config;
			PanelModelMap[type].constructor = constructor;
		}
	};
	co.page.panel.model.get = function(type) {
		return PanelModelMap[type];
	};
	co.page.panel.model.list = function() {
		var list = [];
		for ( var type in PanelModelMap) {
			list[list.length] = PanelModelMap[type];
		}
		return list;
	};
	co.page.panel.model.create = function(type, config) {
		return new PanelModelMap[type].constructor(config);
	};

	co.page.panel.create = function(config) {
		var panel = config.panel;
		var type = panel.type;
		if (co.isEmpty(type)) {
			throw new Error("panel type is null");
		}
		if (co.page.panel.model.get(type) == null) {
			throw new Error(type + " panel is not defined");
		}
		return co.page.panel.model.create(type, config);
	};
})(window, jQuery);