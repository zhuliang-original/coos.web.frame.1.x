(function(window, jQuery, coos) {
	coos.page.panel = coos.page.panel || {};
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
			if (coos.isString(panelConfig)) {
				panelConfig = JSON.parse(panelConfig);
			}
		}
		panel.config = panelConfig || {};
		this.initView();
	};

	Panel.prototype.loadDataBefore = function() {
	};

	Panel.prototype.loadDataAfter = function() {
	};

	Panel.prototype.initViewBefore = function() {
	};

	Panel.prototype.initViewAfter = function() {
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
		if (coos.isEmpty(columnsize)) {
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
			if (!coos.isEmpty(layout.parentid)) {
				continue;
			}
			var name = layout.name;
			var layoutObject = coos.page.panel.layout.create({
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
			if (!coos.isEmpty(bindlayoutforsearch)) {
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
			if (!coos.isEmpty(bindlayoutforsearch)) {
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
			if (!coos.isEmpty(relationlayoutid)) {
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
		if (!coos.isEmpty(searchlayoutname)) {
			var names = [ searchlayoutname ];
			if (coos.has(searchlayoutname, ",")) {
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
		var searchData = this.config.pageObject.config.requestmap || {};
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
				config.action = coos.getThisAction().split('?')[0];
				config.data = searchData;
				coos.toAction(config);
				return;
			}
		}
		this.loadDataBefore();
		if (!coos.isEmpty(this.panel.serviceid)) {
			var this_ = this;
			loadServiceData(this.panel.serviceid, searchData, function(resultMap) {
				this_.appendResult(resultMap);
				this_.loadLayoutData(config.callback);
				this_.loadDataAfter();
			});
		} else {
			this.loadLayoutData(config.callback);
			this.loadDataAfter();
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
				if (!coos.isEmpty(layoutObject.layout.servicemodelname) && layoutObject.layout.servicemodelname == modelname) {
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
	coos.page.panel.Panel = Panel;

})(window, jQuery, coos);