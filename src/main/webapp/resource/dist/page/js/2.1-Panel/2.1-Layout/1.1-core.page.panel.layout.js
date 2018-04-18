(function(window, jQuery) {
	co.page.panel.layout = {};
	var html = '<div class=" coos-layout-one "><div class="coos-layout-one-content mgtb-5 "></div></div>';
	var Layout = function(config) {
		this.config = config;
		this.layout = config.layout;
		this.design = config.design;
		this.init(config);
		jQuery.extend(true, config.layout, this.layout);
		putLayoutObject(this);
	};

	Layout.prototype.init = function(config) {
		var layout = config.layout;
		var layoutConfig = layout.config;
		if (layoutConfig != null) {
			if (co.isString(layoutConfig)) {
				layoutConfig = JSON.parse(layoutConfig);
			}
		}
		layout.config = layoutConfig || {};
		this.initData();
		this.initView();
		this.initChildLayoutView();
	};

	Layout.prototype.loadDataBefore = function() {
		var config = this.config;
		var layout = config.layout;
		if (!co.isEmpty(layout.beforedataloadexecute)) {
			try {
				eval('(' + layout.beforedataloadexecute + ')')(this);
			} catch (e) {
				console.log(e);
			}

		}
	};

	Layout.prototype.loadDataAfter = function(result) {
		co.element.init(this.$view);

		var config = this.config;
		var layout = config.layout;
		if (!co.isEmpty(layout.afterdataloadexecute)) {
			try {
				eval('(' + layout.afterdataloadexecute + ')')(this, result);
			} catch (e) {
				console.log(e);
			}
		}
	};

	Layout.prototype.initViewBefore = function() {
		var config = this.config;
		var layout = config.layout;
		if (!co.isEmpty(layout.beforeviewloadexecute)) {
			try {
				eval('(' + layout.beforeviewloadexecute + ')')(this);
			} catch (e) {
				console.log(e);
			}
		}
	};

	Layout.prototype.initViewAfter = function() {
		co.element.init(this.$view);

		var config = this.config;
		var layout = config.layout;
		if (!co.isEmpty(layout.afterviewloadexecute)) {
			try {
				eval('(' + layout.afterviewloadexecute + ')')(this);
			} catch (e) {
				console.log(e);
			}

		}
	};

	Layout.prototype.initView = function() {
		this.initViewBefore();
		var layout = this.layout;
		this.$view = $(html);
		if (!co.isEmpty(layout.styleconfig)) {
			this.$view.attr('style', layout.styleconfig);
		}
		this.config.$container && this.config.$container.append(this.$view);
		this.$view.attr('layoutid', layout.layoutid);
		this.$view.attr('type', layout.type);

		var columnsize = layout.columnsize;
		if (co.isEmpty(columnsize)) {
			columnsize = 12;
		}
		if (columnsize == "0" || columnsize == 0) {
			columnsize = 12;
		}
		layout.columnsize = columnsize;
		if (layout.showtitle) {
			if (!co.isEmpty(layout.title)) {
				this.$view.find('.coos-layout-one-content').append('<h3 class="pdtb-5">' + layout.title + '</h3>');
			}
		}
		this.$view.addClass('coos-col-' + columnsize);
		this.$content = this.$view.find('.coos-layout-one-content');
		this.initElementObject();
		this.initButtonObject();
		this.initContent();

		this.$oneContainerView = this.getOneContainerView();
		this.initDemoView();
		// this.initElement();
		// this.initButton();

		this.initViewSuccess();
		this.initViewAfter();
	};

	Layout.prototype.initContent = function() {
	};

	Layout.prototype.initDemoView = function() {
		this.appendData([ {} ]);
	};

	Layout.prototype.initViewSuccess = function() {
	};

	Layout.prototype.getOneView = function(config) {
	};

	Layout.prototype.getOneContainerView = function(config) {
		return this.$view.find('.coos-layout-one-content:first');
	};

	Layout.prototype.getLayoutContainer = function(layout) {
		return this.$view.find('.coos-layout-container:first');
	};

	Layout.prototype.getElementContainer = function($container, element) {
		var $elementcontainer = null;
		if (element.config.display) {
			$elementcontainer = $container.find('.coos-show-element');
		} else {
			$elementcontainer = $container.find('.coos-hide-element');
		}
		if ($elementcontainer.length > 0) {
			return $elementcontainer;
		}
		return $container;
	};

	Layout.prototype.getButtonContainer = function($container, button) {
		var $buttoncontainer = $container.find('.coos-button-container');
		if ($buttoncontainer.length > 0) {
			return $buttoncontainer;
		}
		return $container;
	};

	Layout.prototype.getElementObject = function(element) {
		var elementObject = co.page.panel.layout.element.create({
			layout : this.layout,
			design : this.config.design,
			page : this.config.page,
			pageObject : this.config.pageObject,
			panel : this.config.panel,
			panelObject : this.config.panelObject,
			layoutObject : this,
			element : element
		});
		return elementObject;
	};

	Layout.prototype.getButtonObject = function(button) {
		var buttonObject = co.page.panel.layout.button.create({
			layout : this.layout,
			design : this.config.design,
			page : this.config.page,
			pageObject : this.config.pageObject,
			panel : this.config.panel,
			panelObject : this.config.panelObject,
			layoutObject : this,
			button : button
		});
		return buttonObject;
	};

	Layout.prototype.initElementObject = function() {
		var layout = this.layout;
		layout.elements = layout.elements || [];
		var elements = layout.elements;
		this.elementObjects = [];
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			this.elementObjects[this.elementObjects.length] = this.getElementObject(element);
		}
	};

	Layout.prototype.initButtonObject = function() {
		var layout = this.layout;
		layout.buttons = layout.buttons || [];
		var buttons = layout.buttons;
		this.buttonObjects = [];
		for (var i = 0; i < buttons.length; i++) {
			var button = buttons[i];
			this.buttonObjects[this.buttonObjects.length] = this.getButtonObject(button);
		}
	};

	Layout.prototype.initData = function() {
	};

	Layout.prototype.appendResult = function(config) {
		config = config || {};
		var resultMap = config.resultMap || {};
		var isTop = config.isTop;
		var result = config.result;
		var list = result;
		if (isTop) {
			list = result.value;
		}
		this.appendData(list, config);
	};
	Layout.prototype.clear = function() {
		co.form.clear(this.$view);
	};

	Layout.prototype.appendData = function(list, config) {
		this.appendDataBefore(config);
		this.$oneViews = [];
		if (this.getNewOneContainerView) {
			this.$oneContainerView = this.getNewOneContainerView();
		}
		this.$oneContainerView.empty();
		if (list != null) {
			if (!co.isArray(list)) {
				list = [ list ];
			}
		}
		if (list == null || list.length == 0) {
			this.initNoDataView();
		} else {
			for (var index = 0; index < list.length; index++) {
				var data = list[index];
				var config_ = {};
				config_.index = index;
				config_.data = data;
				config_.list = list;
				this.appendOneData(config_);
			}
		}
		this.appendDataAfter(config);
	};
	Layout.prototype.removeRow = function($row) {
		$row.remove();
	};
	Layout.prototype.initNoDataView = function() {
	};
	Layout.prototype.appendDataBefore = function(config) {
	};
	Layout.prototype.appendDataAfter = function(config) {
	};

	Layout.prototype.appendOneData = function(config) {
		var $oneView = this.getOneView(config);
		if (!$oneView) {
			return;
		}
		this.$oneContainerView.append($oneView);
		this.$oneViews[this.$oneViews.length] = $oneView;

		for (var i = 0; i < this.elementObjects.length; i++) {
			var elementObject = this.elementObjects[i];
			var $container = this.getElementContainer($oneView, elementObject.element);
			config.$row = $oneView;
			var $inputView = elementObject.getView(this.getElementPlace(elementObject), config);
			$container.append($inputView);
			elementObject.appendValue(config);
		}

		var $container = this.getButtonContainer($oneView);
		for (var i = 0; i < this.buttonObjects.length; i++) {
			var buttonObject = this.buttonObjects[i];
			config.$row = $oneView;
			if (buttonObject.canView(config)) {
				if($container.closest('.coos-box-window').length > 0){
					if($container.closest('.coos-box-window').find('[buttonid="'+buttonObject.button.buttonid+'"]').length > 0){
						continue;
					}
				}
				
				var $button = buttonObject.getView(this.getButtonPlace(buttonObject), config);
				if ($button && buttonObject.button.config.bindenter) {
					$oneView.on("keydown", function(e) {
						var target, code, tag;
						if (!event) {
							event = window.event;
							target = event.srcElement;
							code = event.keyCode;
						} else {
							target = event.target;
							code = event.keyCode;
						}
						if (code == 13) {
							tag = target.tagName;
							if (tag != "TEXTAREA") {
								if ($button != null) {
									$button.click();
									return false;
								}
							} else {
								return true;
							}
						}
					});
				}
				$container.append($button);
			}

		}
		if (!this.config.design) {
			this.bindEvent($oneView, config);
		}
		co.element.init(this.$view);
	};

	Layout.prototype.bindEvent = function($oneView, dataConfig) {
		var this_ = this;
		dataConfig.$row = $oneView;
		$(this.layout.events).each(function(index, event) {
			co.page.event.bind({
				event : event,
				$view : $oneView,
				$row : $oneView,
				design : this_.config.design,
				layout : this_.layout,
				layoutObject : this_,
				page : this_.config.page,
				pageObject : this_.config.pageObject,
				panel : this_.config.panel,
				panelObject : this_.config.panelObject,
				dataConfig : dataConfig
			});
		});
	};
	Layout.prototype.getElementPlace = function(elementObject) {
		return "FORM";
	};

	Layout.prototype.getButtonPlace = function(buttonObject) {
		return "FORM";
	};

	Layout.prototype.appendSearchData = function() {
	};

	Layout.prototype.getLayoutData = function() {
		return this.clickData || {};
	};

	Layout.prototype.search = function() {
		var this_ = this;
		if (this._search_ing) {
			return;
		}
		this._search_ing = true;
		var loadDataConfig = {};
		loadDataConfig.callback = function() {
			this_._search_ing = false;
		};

		var layout = this.layout;

		if (layout.config.jumppagesearch) {
			loadDataConfig.jumppage = true;
		}
		var objects = this.config.panelObject.getNeedLoadDataObjects(layout.layoutid);
		$(objects).each(function(index, object) {
			object.loadData(loadDataConfig);
		});
	};

	Layout.prototype.getSearchData = function() {
		return this.clickData || {};
	};

	Layout.prototype.loadData = function(config) {
		this.clickData = null;
		this.clear();
		config = config || {};
		var searchData = this.config.panelObject.getSearchData(this.layout.bindlayoutforsearch);
		var $sortnames = this.$view.find('.coos-sort-both');
		if ($sortnames.length > 0) {
			if ($sortnames.length == 1) {
				var sortname = $sortnames.attr('rule-sort-name');
				var sorttype = $sortnames.attr('rule-sort-type');
				if (!coos.isEmpty(sortname) && !coos.isEmpty(sorttype)) {
					searchData[sortname + '-for-sort'] = sorttype;
				}
			} else {
				$($sortnames).each(function(index, $sortname) {
					var $sortname = $($sortname);
					var sortname = $sortname.attr('rule-sort-name');
					var sorttype = $sortname.attr('rule-sort-type');
					if (!coos.isEmpty(sortname) && !coos.isEmpty(sorttype)) {
						searchData[sortname + '-for-sort'] = sorttype;
					}
				});
			}
		}
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

		if (!co.isEmpty(this.layout.serviceid)) {
			if (!co.isEmpty(this.layout.relationlayoutid)) {
				var object = getLayoutObject(this.layout.relationlayoutid);
				if (object != null && object.clickData != null) {
					for ( var n in object.clickData) {
						var v = object.clickData[n];
						if (v != null) {
							searchData[n] = v;
						}
					}
				} else {
					return;
				}
			}
			var this_ = this;
			loadServiceData(this.layout.serviceid, searchData, function(resultMap) {
				var servicemodelname = this_.layout.servicemodelname;
				if (co.isEmpty(this_.layout.servicemodelname)) {
					for ( var name in resultMap) {
						servicemodelname = name;
						break;
					}
				}
				var result = resultMap[servicemodelname];
				this_.processResult({
					resultMap : resultMap,
					result : result,
					isTop : true,
					formLoadObject : this_
				});
				this_.loadDataAfter(resultMap);
				this_.loadChildLayoutData(config.callback);
			});
		} else {
			this.loadChildLayoutData(config.callback);
			this.loadDataAfter({});
		}

	};

	Layout.prototype.loadChildLayoutData = function(callback) {
		var childLayoutObjects = this.childLayoutObjects;
		var index = 0;
		function execute() {
			if (index >= childLayoutObjects.length) {
				callback && callback();
				return;
			}
			var childLayoutObject = childLayoutObjects[index];
			index++;
			var config = {};
			config.callback = execute;
			childLayoutObject.loadData(config);
		}
		execute();
	};

	Layout.prototype.getExecuteData = function(callback) {
		var executeData = this.executeData || {};
		return executeData;
	};

	Layout.prototype.bindChildLayout = function($one, data) {
		var this_ = this;
		if (this.config.design) {
			return;
		}
		var objects = this.config.panelObject.getNeedLoadDataObjects(this.layout.layoutid);

		if (objects.length > 0) {
			$one.addClass('coos-pointer');
			$one.click(function(e) {
				if ($(e.target).closest('.coos-button').length > 0) {
					return;
				}
				$one.closest('.coos-layout-one').find('.coos-checked-one').removeClass('coos-checked-one');
				$one.addClass('coos-checked-one');
				this_.clickData = data;

				$(objects).each(function(index, object) {
					object.loadData({
						data : data,
						fromrelationlayout : true
					});
				});
			});
			if (!this.firstclicked) {
				this.firstclicked = true;
				$one.addClass('coos-checked-one');
				this.clickData = data;
				$(objects).each(function(index, object) {
					object.loadData({
						data : data
					});
				});
			}
		}
	};

	Layout.prototype.getContent = function() {
		return this.$content;
	};

	Layout.prototype.initChildLayoutView = function() {
		var childLayoutObjects = [];
		if (this.config.panel != null) {
			var layouts = this.config.panel.layouts;
			for (var i = 0; i < layouts.length; i++) {
				var layout = layouts[i];
				if (co.isEmpty(layout.parentid)) {
					continue;
				}
				if (layout.layoutid == this.layout.layoutid) {
					continue;
				}
				if (layout.parentid != this.layout.layoutid) {
					continue;
				}
				var name = layout.name;
				var layoutObject = co.page.panel.layout.create({
					layout : layout,
					design : this.design,
					pageObject : this.config.pageObject,
					panel : this.config.panel,
					panelObject : this.config.panelObject,
					parentLayout : this.layout,
					parentLayoutObject : this,
					$container : this.getLayoutContainer()
				});
				childLayoutObjects[childLayoutObjects.length] = layoutObject;
			}
		}
		this.childLayoutObjects = childLayoutObjects;
	};

	Layout.prototype.processResult = function(config) {
		config = config || {};
		this.formLoadObject = config.formLoadObject;
		this.appendResult(config);
	};

	Layout.prototype.reloadResult = function(config) {
		this.formLoadObject && this.formLoadObject.loadData(config);
	};

	co.page.panel.layout.Layout = Layout;
})(window, jQuery);