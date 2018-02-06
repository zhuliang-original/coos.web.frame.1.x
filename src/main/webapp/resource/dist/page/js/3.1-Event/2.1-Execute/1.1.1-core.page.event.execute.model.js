(function(window, jQuery) {
	var ExecuteModelMap = {};
	co.page.event.execute.model = {};
	co.page.event.execute.model.defind = function(type, config, constructor) {
		config = config || {};
		if (ExecuteModelMap[type] == null) {
			config.type = type;
			ExecuteModelMap[type] = {};
			ExecuteModelMap[type].config = config;
			ExecuteModelMap[type].constructor = constructor;
		}
	};

	co.page.event.execute.model.get = function(type) {
		return ExecuteModelMap[type];
	};

	co.page.event.execute.model.list = function() {
		var list = [];
		for ( var type in ExecuteModelMap) {
			list[list.length] = ExecuteModelMap[type];
		}
		return list;
	};

	co.page.event.execute.model.create = function(type, config) {
		return new ExecuteModelMap[type].constructor(config);
	};

	co.page.event.execute.create = function(config) {
		var execute = config.execute;
		var type = execute.type;
		if (co.isEmpty(type)) {
			throw new Error("execute type is null");
		}
		if (co.page.event.execute.model.get(type) == null) {
			throw new Error(type + " execute is not defined");
		}
		return co.page.event.execute.model.create(type, config);
	};
})(window, jQuery);