(function(window, jQuery, coos) {
	var ExecuteModelMap = {};
	coos.page.event.execute.model = {};
	coos.page.event.execute.model.defind = function(type, config, constructor) {
		config = config || {};
		if (ExecuteModelMap[type] == null) {
			config.type = type;
			ExecuteModelMap[type] = {};
			ExecuteModelMap[type].config = config;
			ExecuteModelMap[type].constructor = constructor;
		}
	};

	coos.page.event.execute.model.get = function(type) {
		return ExecuteModelMap[type];
	};

	coos.page.event.execute.model.list = function() {
		var list = [];
		for ( var type in ExecuteModelMap) {
			list[list.length] = ExecuteModelMap[type];
		}
		return list;
	};

	coos.page.event.execute.model.create = function(type, config) {
		return new ExecuteModelMap[type].constructor(config);
	};

	coos.page.event.execute.create = function(config) {
		var execute = config.execute;
		var type = execute.type;
		if (coos.isEmpty(type)) {
			throw new Error("execute type is null");
		}
		if (coos.page.event.execute.model.get(type) == null) {
			throw new Error(type + " execute is not defined");
		}
		return coos.page.event.execute.model.create(type, config);
	};
})(window, jQuery, coos);