(function(window, jQuery, coos) {
	var PanelModelMap = {};
	coos.page.panel.model = {};
	coos.page.panel.model.defind = function(type, config, constructor) {
		config = config || {};
		if (PanelModelMap[type] == null) {
			config.type = type;
			PanelModelMap[type] = {};
			PanelModelMap[type].config = config;
			PanelModelMap[type].constructor = constructor;
		}
	};
	coos.page.panel.model.get = function(type) {
		return PanelModelMap[type];
	};
	coos.page.panel.model.list = function() {
		var list = [];
		for ( var type in PanelModelMap) {
			list[list.length] = PanelModelMap[type];
		}
		return list;
	};
	coos.page.panel.model.create = function(type, config) {
		return new PanelModelMap[type].constructor(config);
	};

	coos.page.panel.create = function(config) {
		var panel = config.panel;
		var type = panel.type;
		if (coos.isEmpty(type)) {
			throw new Error("panel type is null");
		}
		if (coos.page.panel.model.get(type) == null) {
			throw new Error(type + " panel is not defined");
		}
		return coos.page.panel.model.create(type, config);
	};
})(window, jQuery, coos);