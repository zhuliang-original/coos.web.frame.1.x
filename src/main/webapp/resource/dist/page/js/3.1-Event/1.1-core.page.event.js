(function(window, jQuery) {
	var Event = function(config) {
		this.config = config;
		this.event = config.event;
		this.design = config.design;
		this.init(config);
		jQuery.extend(true, config.event, this.event);
	};
	Event.prototype.init = function(config) {
		var event = config.event;
		var eventConfig = event.config;
		if (eventConfig != null) {
			if (co.isString(eventConfig)) {
				eventConfig = JSON.parse(eventConfig);
			}
		}
		event.config = eventConfig || {};
		this.initEvent();
	};

	Event.prototype.initEvent = function() {
		this.$view = this.config.$view;
		this.$input = this.config.$input;
		this.bindEvent();
	};

	Event.prototype.bindEvent = function() {
	};

	Event.prototype.eventExecutes = function(value) {
		this.event.executes = this.event.executes || [];

		for (var index = 0; index < this.event.executes.length; index++) {
			var execute = this.event.executes[index];
			if (co.isEmpty(execute.parentid)) {
				this.eventExecute(execute, value);
			}
		}
	};

	Event.prototype.eventExecute = function(execute, value) {
		var config = this.config;
		config.execute = execute;
		config.value = value;
		var executeObject = co.page.event.execute.create(config);
		executeObject.run();
	};
	co.page.event.Event = Event;
})(window, jQuery);