(function(window, jQuery) {
	co.page.panel = co.page.panel || {};
	var html = '<div class="coos-panel-one"><div class="coos-panel-one-content"></div></div>';

	var Panel = function(config) {
		this.config = config;
		this.panel = config.panel;
		this.init();
		jQuery.extend(true, config.panel, this.panel);
		putPanelObject(this);
		return this;
	};

	Panel.prototype.init = function() {
		this.isshow = true;
		var config = this.config;
		var panel = config.panel;
		var panelConfig = panel.config;
		if (panelConfig != null) {
			if (co.isString(panelConfig)) {
				panelConfig = JSON.parse(panelConfig);
			}
		}
		panel.config = panelConfig || {};
		this.initView();
	};

	Panel.prototype.loadDataBefore = function() {
		var config = this.config;
		var panel = config.panel;
		if (!co.isEmpty(panel.beforedataloadexecute)) {
			try {
				eval('(' + panel.beforedataloadexecute + ')')(this);
			} catch (e) {
				console.log(e);
			}
		}
	};

	Panel.prototype.loadDataAfter = function(result) {
		co.element.init(this.$view);
		
		var config = this.config;
		var panel = config.panel;
		if (!co.isEmpty(panel.afterdataloadexecute)) {
			try {
				eval('(' + panel.afterdataloadexecute + ')')(this, result);
			} catch (e) {
				console.log(e);
			}
		}
	};

	Panel.prototype.initViewBefore = function() {
		var config = this.config;
		var panel = config.panel;
		if (!co.isEmpty(panel.beforeviewloadexecute)) {
			try {
				eval('(' + panel.beforeviewloadexecute + ')')(this);
			} catch (e) {
				console.log(e);
			}
		}
	};

	Panel.prototype.initViewAfter = function() {
		co.element.init(this.$view);
		
		var config = this.config;
		var panel = config.panel;
		if (!co.isEmpty(panel.afterviewloadexecute)) {
			try {
				eval('(' + panel.afterviewloadexecute + ')')(this);
			} catch (e) {
				console.log(e);
			}
		}
	};

	Panel.prototype.initView = function() {
		this.initViewBefore();
		var panel = this.panel;
		this.$view = $(html);
		this.config.$container && (this.config.$container.append(this.$view));
		this.$content = this.$view.find('.coos-panel-one-content');
		this.$view.attr('panelid', panel.panelid);
		this.$view.attr('type', panel.type);

		var columnsize = panel.columnsize;
		if (co.isEmpty(columnsize)) {
			columnsize = 12;
		}
		if (columnsize == "0" || columnsize == 0) {
			columnsize = 12;
		}

		this.$view.addClass('coos-column-' + columnsize);
		panel.columnsize = columnsize;
		this.initContent();
		this.initPanelLayoutView();
		this.initViewAfter();
	};

	Panel.prototype.getLayoutContainer = function() {
		return this.$view.find('.coos-layout-container:first');
	};

	Panel.prototype.initPanelLayoutView = function() {
		var panel = this.panel;
		panel.layouts = panel.layouts || [];
		var layoutObjects = [];
		var layouts = panel.layouts;
		for (var i = 0; i < layouts.length; i++) {
			var layout = layouts[i];
			if (!co.isEmpty(layout.parentid)) {
				continue;
			}
			var name = layout.name;
			var layoutObject = co.page.panel.layout.create({
				layout : layout,
				design : this.config.design,
				page : this.config.page,
				pageObject : this.config.pageObject,
				panel : this.panel,
				panelObject : this,
				$container : this.getLayoutContainer()
			});
			layoutObjects[layoutObjects.length] = layoutObject;
		}
		this.layoutObjects = layoutObjects;
	};

	Panel.prototype.getNeedLoadDataObjects = function(layoutid) {
		var objects = [];
		for (var i = 0; i < this.config.page.panels.length; i++) {
			var panel = this.config.page.panels[i];
			var bindlayoutforsearch = panel.bindlayoutforsearch;
			if (!co.isEmpty(bindlayoutforsearch)) {
				$(bindlayoutforsearch.split(',')).each(function(index, bindlayoutforsearchid) {
					if (bindlayoutforsearchid == layoutid) {
						objects[objects.length] = getPanelObject(panel.panelid);
					}
				});
			}
		}
		for (var i = 0; i < this.panel.layouts.length; i++) {
			var layout = this.panel.layouts[i];
			var bindlayoutforsearch = layout.bindlayoutforsearch;
			if (!co.isEmpty(bindlayoutforsearch)) {
				$(bindlayoutforsearch.split(',')).each(function(index, bindlayoutforsearchid) {
					if (bindlayoutforsearchid == layoutid) {
						objects[objects.length] = getLayoutObject(layout.layoutid);
					}
				});
			}
		}
		for (var i = 0; i < this.panel.layouts.length; i++) {
			var layout = this.panel.layouts[i];
			var relationlayoutid = layout.relationlayoutid;
			if (!co.isEmpty(relationlayoutid)) {
				$(relationlayoutid.split(',')).each(function(index, id) {
					if (id == layoutid) {
						objects[objects.length] = getLayoutObject(layout.layoutid);
					}
				});
			}
		}
		return objects;
	};

	Panel.prototype.getSearchLayouts = function(searchlayoutname) {
		var forSearchLayouts = [];
		if (!co.isEmpty(searchlayoutname)) {
			var names = [ searchlayoutname ];
			if (co.has(searchlayoutname, ",")) {
				names = searchlayoutname.split(",");
			}
			$(names).each(function(index, name) {
				$(getLayoutObject(name)).each(function(index, one) {
					forSearchLayouts[forSearchLayouts.length] = one;
				});
			});
		}
		return forSearchLayouts;
	};

	Panel.prototype.getSearchData = function(searchlayoutname) {
		var requestmap = this.config.pageObject.config.requestmap || {};
		requestmap = jQuery.extend(true, {}, requestmap);
		var searchData = requestmap || {};
		var forSearchLayouts = this.getSearchLayouts(searchlayoutname);

		if (forSearchLayouts.length == 0) {
		} else {
			for (var i = 0; i < forSearchLayouts.length; i++) {
				var layoutObject = forSearchLayouts[i];
				var data = layoutObject.getSearchData();
				if (data) {
					for ( var n in data) {
						if (data[n] != null) {
							searchData[n] = data[n];
						}
					}
				}
			}
		}
		return searchData;
	};

	Panel.prototype.switchVisibility = function() {
		if (this.$view.is(":visible")) {// 是否可见
			this.hide();
		} else {
			this.show();
		}
	};

	Panel.prototype.show = function() {
		this.$view.show();
	};

	Panel.prototype.hide = function() {
		this.$view.hide();
	};

	Panel.prototype.loadData = function(config) {
		config = config || {};
		var searchData = this.getSearchData(this.panel.bindlayoutforsearch);
		if (config) {
			if (config.data) {
				for ( var n in config.data) {
					if (config.data[n] != null) {
						searchData[n] = config.data[n];
					}
				}
			}
			if (config.jumppage) {
				var config = {};
				config.action = co.url.getCurrentUrl().split('?')[0];
				config.data = searchData;
				co.toAction(config);
				return;
			}
		}
		this.loadDataBefore();
		if (!co.isEmpty(this.panel.serviceid)) {
			var this_ = this;
			loadServiceData(this.panel.serviceid, searchData, function(resultMap) {
				this_.appendResult(resultMap);
				this_.loadDataAfter(resultMap);
				this_.loadLayoutData(config.callback);
			});
		} else {
			this.loadLayoutData(config.callback);
			this.loadDataAfter({});
		}

	};

	Panel.prototype.loadLayoutData = function(callback) {
		var layoutObjects = this.layoutObjects;
		var index = 0;
		function execute() {
			if (index >= layoutObjects.length) {
				callback && callback();
				return;
			}
			var layoutObject = layoutObjects[index];
			index++;
			var config = {};
			config.callback = execute;
			layoutObject.loadData(config);
		}
		execute();
	};

	Panel.prototype.appendResult = function(resultMap) {
		for ( var modelname in resultMap) {
			$(this.layoutObjects).each(function(index, layoutObject) {
				if (!co.isEmpty(layoutObject.layout.servicemodelname) && layoutObject.layout.servicemodelname == modelname) {
					layoutObject.processResult({
						resultMap : resultMap,
						result : resultMap[name],
						isTop : true,
						formLoadObject : this
					});
				}
			});
		}
	};
	co.page.panel.Panel = Panel;

})(window, jQuery);