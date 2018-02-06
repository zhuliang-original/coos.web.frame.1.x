(function(window, jQuery) {
	var ButtonModelMap = {};
	co.page.panel.layout.button.model = {};
	co.page.panel.layout.button.model.defind = function(type, config, constructor) {
		config = config || {};

		if (ButtonModelMap[type] == null) {
			config.type = type;
			ButtonModelMap[type] = {};
			ButtonModelMap[type].config = config;
			ButtonModelMap[type].constructor = constructor;
		}
	};
	co.page.panel.layout.button.model.get = function(type) {
		return ButtonModelMap[type];
	};
	co.page.panel.layout.button.model.list = function() {
		var list = [];
		for ( var type in ButtonModelMap) {
			list[list.length] = ButtonModelMap[type];
		}
		return list;
	};
	co.page.panel.layout.button.model.create = function(type, config) {
		return new ButtonModelMap[type].constructor(config);
	};

	co.page.panel.layout.button.create = function(config) {
		var button = config.button;
		var type = button.type;
		if (co.isEmpty(type)) {
			throw new Error("button type is null");
		}
		if (co.page.panel.layout.button.model.get(type) == null) {
			throw new Error(type + " button is not defined");
		}
		return co.page.panel.layout.button.model.create(type, config);
	};
})(window, jQuery);