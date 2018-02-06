(function() {
	var ThemeModelMap = {};
	co.frame.theme.model = {};
	co.frame.theme.model.defind = function(type, config, constructor) {
		config = config || {};
		if (ThemeModelMap[type] == null) {
			config.type = type;
			ThemeModelMap[type] = {};
			ThemeModelMap[type].config = config;
			ThemeModelMap[type].constructor = constructor;
		}
	};
	co.frame.theme.model.get = function(type) {
		return ThemeModelMap[type];
	};
	co.frame.theme.model.list = function() {
		var list = [];
		for ( var type in ThemeModelMap) {
			list[list.length] = ThemeModelMap[type];
		}
		return list;
	};
	co.frame.theme.model.create = function(type, config) {
		return new ThemeModelMap[type].constructor(config);
	};

	co.frame.theme.create = function(config) {

		var theme = config.theme;
		var type = theme.type;
		if (co.isEmpty(type)) {
			type = "MANAGER";
		}
		theme.type = type;
		if (co.frame.theme.model.get(type) == null) {
			throw new Error(type + " theme is not defined");
		}
		return co.frame.theme.model.create(type, config);
	};
})();