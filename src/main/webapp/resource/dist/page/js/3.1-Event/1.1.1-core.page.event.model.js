(function(window, jQuery) {
	var EventModelMap = {};
	co.page.event.model = {};
	co.page.event.model.defind = function(type, config, constructor) {
		config = config || {};
		if (EventModelMap[type] == null) {
			config.type = type;
			EventModelMap[type] = {};
			EventModelMap[type].config = config;
			EventModelMap[type].constructor = constructor;
		}
	};

	co.page.event.model.get = function(type) {
		return EventModelMap[type];
	};

	co.page.event.model.list = function() {
		var list = [];
		for ( var type in EventModelMap) {
			list[list.length] = EventModelMap[type];
		}
		return list;
	};

	co.page.event.model.create = function(type, config) {
		return new EventModelMap[type].constructor(config);
	};

	co.page.event.create = function(config) {
		var event = config.event;
		var type = event.type;
		if (co.isEmpty(type)) {
			throw new Error("event type is null");
		}
		if (co.page.event.model.get(type) == null) {
			throw new Error(type + " event is not defined");
		}
		return co.page.event.model.create(type, config);
	};
})(window, jQuery);