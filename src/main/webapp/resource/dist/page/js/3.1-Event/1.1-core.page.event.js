(function(window, jQuery, coos) {
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
			if (coos.isString(eventConfig)) {
				eventConfig = JSON.parse(eventConfig);
			}
		}
		event.config = eventConfig || {};
		this.initEvent();
	};

	Event.prototype.initEvent = function() {
		this.$view = this.config.$view;
		this.bindEvent();
	};

	Event.prototype.bindEvent = function() {
	};

	Event.prototype.eventExecutes = function() {
		this.event.executes = this.event.executes || [];

		for ( var index = 0; index < this.event.executes.length; index++) {
			var execute = this.event.executes[index];
			if (coos.isEmpty(execute.parentid)) {
				this.eventExecute(execute);
			}
		}
	};

	Event.prototype.eventExecute = function(execute) {
		var config = this.config;
		config.execute = execute;
		var executeObject = coos.page.event.execute.create(config);
		executeObject.run();
	};
	coos.page.event.Event = Event;
})(window, jQuery, coos);