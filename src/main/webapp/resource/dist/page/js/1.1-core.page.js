(function(window, jQuery) {
	co.page = co.page || {};
	var Page = function(config) {
		this.config = config;
		this.page = config.page;
		this.init();
		jQuery.extend(true, config.page, this.page);
		putPageObject(this);
		return this;
	};

	Page.prototype.init = function() {
		var config = this.config;
		var page = config.page;
		var pageConfig = page.config;
		if (pageConfig != null) {
			if (co.isString(pageConfig)) {
				pageConfig = JSON.parse(pageConfig);
			}
		}
		page.config = pageConfig || {};
		this.initView();
	};

	Page.prototype.initView = function() {
		this.initViewBefore();
		this.initContent();
		this.initPanelView();
		this.initViewAfter();
	};

	Page.prototype.initContent = function() {
	};

	Page.prototype.loadDataBefore = function() {
	};

	Page.prototype.loadDataAfter = function() {
		co.element.init(this.$view);
	};

	Page.prototype.initViewBefore = function() {
	};

	Page.prototype.initViewAfter = function() {
		co.element.init(this.$view);
	};

	Page.prototype.bindEvents = function() {
	};

	Page.prototype.getPanelContainer = function() {
		return this.$view.find('.coos-panel-container');
	};

	Page.prototype.initPanelView = function() {
		var page = this.page;
		var panelObjects = [];
		page.panels = page.panels || [];
		var panels = page.panels;
		for (var i = 0; i < panels.length; i++) {
			var panel = panels[i];
			var name = panel.name;
			var panelObject = co.page.panel.create({
				panel : panel,
				page : this.page,
				pageObject : this,
				design : this.config.design,
				$container : this.getPanelContainer()
			});
			panelObjects[panelObjects.length] = panelObject;
		}
		this.panelObjects = panelObjects;
	};

	Page.prototype.loadData = function(config) {
		config = config || {};
		this.loadDataBefore();
		var this_ = this;
		this.loadPanelData(function() {
			this_.loadDataAfter();
			config.callback && config.callback();
		});
	};
	Page.prototype.loadPanelData = function(callback) {
		var panelObjects = this.panelObjects;
		var index = 0;
		function execute() {
			if (index >= panelObjects.length) {
				callback && callback();
				return;
			}
			var panelObject = panelObjects[index];
			index++;
			var config = {};
			config.callback = execute;
			panelObject.loadData(config);
		}
		execute();
	};
	co.page.Page = Page;
})(window, jQuery);