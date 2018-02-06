(function(window, jQuery, coos) {
	var ButtonModelMap = {};
	coos.page.panel.layout.button.model = {};
	coos.page.panel.layout.button.model.defind = function(type, config, constructor) {
		config = config || {};

		if (ButtonModelMap[type] == null) {
			config.type = type;
			ButtonModelMap[type] = {};
			ButtonModelMap[type].config = config;
			ButtonModelMap[type].constructor = constructor;
		}
	};
	coos.page.panel.layout.button.model.get = function(type) {
		return ButtonModelMap[type];
	};
	coos.page.panel.layout.button.model.list = function() {
		var list = [];
		for ( var type in ButtonModelMap) {
			list[list.length] = ButtonModelMap[type];
		}
		return list;
	};
	coos.page.panel.layout.button.model.create = function(type, config) {
		return new ButtonModelMap[type].constructor(config);
	};

	coos.page.panel.layout.button.create = function(config) {
		var button = config.button;
		var type = button.type;
		if (coos.isEmpty(type)) {
			throw new Error("button type is null");
		}
		if (coos.page.panel.layout.button.model.get(type) == null) {
			throw new Error(type + " button is not defined");
		}
		return coos.page.panel.layout.button.model.create(type, config);
	};
})(window, jQuery, coos);