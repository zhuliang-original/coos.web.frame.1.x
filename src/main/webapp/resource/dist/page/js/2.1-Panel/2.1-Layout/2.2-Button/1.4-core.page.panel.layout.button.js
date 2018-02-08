(function(window, jQuery) {
	var Button = function(config) {
		this.config = config;
		this.button = config.button;
		this.design = config.design;
		this.init(config);
		jQuery.extend(true, config.button, this.button);
	};
	Button.prototype.init = function(config) {
		var button = config.button;
		var buttonConfig = button.config;
		if (buttonConfig != null) {
			if (co.isString(buttonConfig)) {
				buttonConfig = JSON.parse(buttonConfig);
			}
		}
		button.config = buttonConfig || {};
		this.initView();
	};
	Button.prototype.getButton = function() {
		return $('<a class="coos-btn "></a>');
	};
	Button.prototype.initView = function() {
		this.$view = this.getButton();
		this.initContent();
	};
	Button.prototype.canView = function(dataConfig) {
		if (this.config.design) {
			return true;
		}
		var button = this.button;
		var viewrule = button.config.viewrule;
		if (!co.isEmpty(viewrule)) {
			return this.executeViewRule(viewrule, dataConfig);
		}
		return true;
	};

	Button.prototype.executeViewRule = function(viewrule, dataConfig) {
		if (!co.isEmpty(viewrule)) {
			var dataMapStr = "";
			for ( var name in dataConfig) {
				dataMapStr += 'var ' + name + ' = dataConfig.' + name + ' || {};';
				// console.log(dataMapStr)
			}
			var funstr = "function(){" + dataMapStr + " return " + viewrule + "; }";
			return eval('(0,' + funstr + ')')();
		}
		return true;
	};
	Button.prototype.getView = function(place, dataConfig) {
		this.place = place;
		this.dataConfig = dataConfig;
		this.initView();
		if (!this.config.design) {
			this.bindEvent(dataConfig);
		}
		return this.$view;
	};
	Button.prototype.bindEvent = function(dataConfig) {
		var this_ = this;
		$(this.button.events).each(function(index, event) {
			co.page.event.bind({
				event : event,
				$view : this_.$view,
				$row : this_.dataConfig.$row,
				design : this_.config.design,
				layout : this_.config.layout,
				layoutObject : this_.config.layoutObject,
				page : this_.config.page,
				pageObject : this_.config.pageObject,
				panel : this_.config.panel,
				panelObject : this_.config.panelObject,
				dataConfig : dataConfig
			});
		});
	};
	co.page.panel.layout.button = {};
	co.page.panel.layout.button.Button = Button;
})(window, jQuery);