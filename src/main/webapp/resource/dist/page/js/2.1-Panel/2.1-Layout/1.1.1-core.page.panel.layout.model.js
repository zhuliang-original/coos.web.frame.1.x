(function(window, jQuery) {
	var LayoutModelMap = {};
	co.page.panel.layout.model = {};
	co.page.panel.layout.model.defind = function(type, config, constructor) {
		config = config || {};
		// if (LayoutModelMap[type] == null) {
		config.type = type;
		LayoutModelMap[type] = {};
		LayoutModelMap[type].config = config;
		LayoutModelMap[type].constructor = constructor;
		// }
	};

	co.page.panel.layout.model.setHtml = function(type, html) {
		if (LayoutModelMap[type] != null) {
			LayoutModelMap[type].constructor.prototype.modelHtml = html;
		}
	};
	co.page.panel.layout.model.get = function(type) {
		return LayoutModelMap[type];
	};

	co.page.panel.layout.model.list = function() {
		var list = [];
		for ( var type in LayoutModelMap) {
			list[list.length] = LayoutModelMap[type];
		}
		return list;
	};

	co.page.panel.layout.model.create = function(type, config) {
		var object = new LayoutModelMap[type].constructor(config);
		return object;
	};

	co.page.panel.layout.create = function(config) {
		var layout = config.layout;
		var type = layout.type;
		if (co.isEmpty(type)) {
			throw new Error("layout type is null");
		}
		if (co.page.panel.layout.model.get(type) == null) {
			throw new Error(type + " layout is not defined");
		}
		$(layout.elements).each(function(index, element) {

			var thisConfig = element.config;
			if (thisConfig != null) {
				if (co.isString(thisConfig)) {
					thisConfig = JSON.parse(thisConfig);
				}
			}
			element.config = thisConfig || {};
		});
		$(layout.buttons).each(function(index, button) {

			var thisConfig = button.config;
			if (thisConfig != null) {
				if (co.isString(thisConfig)) {
					thisConfig = JSON.parse(thisConfig);
				}
			}
			button.config = thisConfig || {};
		});
		return co.page.panel.layout.model.create(type, config);
	};
})(window, jQuery);