(function(window, jQuery, coos) {
	var EventModelMap = {};
	coos.page.event.model = {};
	coos.page.event.model.defind = function(type, config, constructor) {
		config = config || {};
		if (EventModelMap[type] == null) {
			config.type = type;
			EventModelMap[type] = {};
			EventModelMap[type].config = config;
			EventModelMap[type].constructor = constructor;
		}
	};

	coos.page.event.model.get = function(type) {
		return EventModelMap[type];
	};

	coos.page.event.model.list = function() {
		var list = [];
		for ( var type in EventModelMap) {
			list[list.length] = EventModelMap[type];
		}
		return list;
	};

	coos.page.event.model.create = function(type, config) {
		return new EventModelMap[type].constructor(config);
	};

	coos.page.event.create = function(config) {
		var event = config.event;
		var type = event.type;
		if (coos.isEmpty(type)) {
			throw new Error("event type is null");
		}
		if (coos.page.event.model.get(type) == null) {
			throw new Error(type + " event is not defined");
		}
		return coos.page.event.model.create(type, config);
	};
})(window, jQuery, coos);