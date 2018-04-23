(function(window, jQuery, co) {
"use strict";
var PAGEID_PAGE_OBJECT_MAP = {};
var PANELID_PANEL_OBJECT_MAP = {};
var LAYOUTID_LAYOUT_OBJECT_MAP = {};
window.putPageObject = function(pageObject) {
	PAGEID_PAGE_OBJECT_MAP[pageObject.page.pageid] = pageObject;
};

window.getPageObject = function(pageid) {
	return PAGEID_PAGE_OBJECT_MAP[pageid];
};

window.putPanelObject = function(panelObject) {
	PANELID_PANEL_OBJECT_MAP[panelObject.panel.panelid] = panelObject;
};

window.getPanelObject = function(key) {
	if (PANELID_PANEL_OBJECT_MAP[key] != null) {
		return PANELID_PANEL_OBJECT_MAP[key];
	}
	var objects = [];
	var keys = [ key ];
	if (key.indexOf(',') >= 0) {
		keys = key.split(',');
	}
	var objects = [];
	var keys = [ key ];
	if (key.indexOf(',') >= 0) {
		keys = key.split(',');
	}
	$(keys).each(function(index, key) {
		if (!co.isEmpty(key) && PANELID_PANEL_OBJECT_MAP[key] != null) {
			objects[objects.length] = PANELID_PANEL_OBJECT_MAP[key];
		}
	});

	return objects;
};

window.putLayoutObject = function(layoutObject) {
	LAYOUTID_LAYOUT_OBJECT_MAP[layoutObject.layout.layoutid] = layoutObject;
};

window.getLayoutObject = function(key) {
	if (LAYOUTID_LAYOUT_OBJECT_MAP[key] != null) {
		return LAYOUTID_LAYOUT_OBJECT_MAP[key];
	}
	var objects = [];
	var keys = [ key ];
	if (key.indexOf(',') >= 0) {
		keys = key.split(',');
	}
	$(keys).each(function(index, key) {
		if (!co.isEmpty(key) && LAYOUTID_LAYOUT_OBJECT_MAP[key] != null) {
			objects[objects.length] = LAYOUTID_LAYOUT_OBJECT_MAP[key];
		}
	});

	return objects;
};

window.loadEntityPage = function(pageid, requestmap, design) {
	var action = "/core/common/getPage.data";
	var page = null;
	// var data = requestmap || {};
	var data = jQuery.extend(true, {}, requestmap);
	data.coreentitypageid = pageid;
	if (design) {
		data["coos-page-design"] = true;
	}
	co.POST(action, data, 'json', function(o) {
		var status = o.data;
		if (status.errcode != 0) {
			co.box.info(status.errmsg);
		} else {
			page = status.result;
		}
	}, false);
	return page;
};

window.loadServiceData = function(serviceid, searchData, callback) {
	var config = {};
	config.id = serviceid;
	config.data = searchData || {};
	config.callback = function(result) {
		var map = {};
		if (result.errcode == 0) {
			map = result.result;
		} else {
			co.box.info(result.errmsg);
		}
		callback && callback(map);
	}
	co.executeService(config);
};
// TODO 默认空为false
window.initDataDefaultFalse = function(data, name) {
	var value = data[name];
	if (co.isEmpty(value)) {
		value = false;
	} else {
		if (!co.isBoolean(value)) {
			if ((value == "false" || value == "0")) {
				value = false;
			} else {
				value = true;
			}
		}
	}

	data[name] = value;
};
// TODO 默认空位true
window.initDataDefaultTrue = function(data, name) {
	var value = data[name];
	if (co.isEmpty(value)) {
		value = true;
	} else {
		if (!co.isBoolean(value)) {
			if ((value == "false" || value == "0")) {
				value = false;
			} else {
				value = true;
			}
		}
	}
	data[name] = value;
};
window.initElementsData = function(layout) {
	$(layout.elements).each(function(index, element) {
		initDataDefaultTrue(element, "display");
		initDataDefaultFalse(element, "needwrap");
		initDataDefaultTrue(element, "cannull");
		initDataDefaultFalse(element, "readonly");
		if (element.inputtype == 'SWITCH') {
			var datas = [];
			var data = {};
			data.value = 0;
			data.text = "否";
			datas[datas.length] = data;
			var data = {};
			data.value = 1;
			data.text = "是";
			datas[datas.length] = data;
			element.selectdatas = datas;
		}
	});
};
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
(function(window, jQuery) {
	var PageModelMap = {};
	co.page.model = {};
	co.page.model.defind = function(type, config, constructor) {
		config = config || {};
		if (PageModelMap[type] == null) {
			config.type = type;
			PageModelMap[type] = {};
			PageModelMap[type].config = config;
			PageModelMap[type].constructor = constructor;
		}
	};
	co.page.model.get = function(type) {
		return PageModelMap[type];
	};
	co.page.model.list = function() {
		var list = [];
		for ( var type in PageModelMap) {
			list[list.length] = PageModelMap[type];
		}
		return list;
	};
	co.page.model.create = function(type, config) {
		return new PageModelMap[type].constructor(config);
	};

	co.page.create = function(config) {

		var pageid = config.pageid;
		if (!co.isEmpty(pageid)) {
			var requestmap = config.requestmap || {};
			requestmap = jQuery.extend(true, {}, requestmap);
			config.page = loadEntityPage(pageid, requestmap, config.design);
		}
		var page = config.page;
		var type = page.type;
		if (co.isEmpty(type)) {
			type = "BASE";
		}
		page.type = type;
		if (co.page.model.get(type) == null) {
			throw new Error(type + " page is not defined");
		}
		return co.page.model.create(type, config);
	};
})(window, jQuery);
(function(window, jQuery) {
	var html = '<div class=" coos-page"><div class="coos-page-header "><h1 class="coos-page-title"></h1><small class="coos-page-title-content"></small><div class="coos-panel-menu"></div></div><div class="coos-page-content coos-panel-container"></div></div>';

	var PageBase = function(config) {
		co.page.Page.call(this, config);
	};
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.Page.prototype;
		PageBase.prototype = new Super();
	})();

	PageBase.prototype.initContent = function() {
		var page = this.page;
		this.$view = $(html);
		$(this.config.container) && ($(this.config.container).append(this.$view));
		this.$content = this.$view.find('.coos-page-content');
		if (!co.isEmpty(page.title)) {
			this.$view.find('.coos-page-title').text(page.title);

			if (!co.isEmpty(page.config.titleplaces)) {
				$(page.config.titleplaces.split(',')).each(function(index, place) {
					if (!co.isEmpty(place)) {
						if (place == ('WINDOW')) {
							co.setTitle(page.title);
						} else if (place == ('HEADER')) {
							co.frame.setTitle(page.title);
						}
					}
				});
			}
		}
		if (!co.isEmpty(page.titlecontent)) {
			this.$view.find('.coos-page-title-content').text(page.titlecontent);
		}
		if (page.config.nopageheader) {
			this.$view.find('.coos-page-header:first').hide();
			this.$content.addClass('pdt-15');
		}
	};

	var PageBaseConfig = {
		name : "基础页面",
		hasElement : false,
		columns : [ {
			text : "无页面头部",
			name : "nopageheader",
			inputtype : "switch"
		}, {
			text : "标题位置",
			name : "titleplaces",
			inputtype : "select",
			datas : [ {
				value : "WINDOW,HEADER",
				text : "窗口和框架头部"
			}, {
				value : "WINDOW",
				text : "窗口"
			}, {
				value : "HEADER",
				text : "框架头部"
			} ]
		} ],
		element : {}
	};
	co.page.model.defind("BASE", PageBaseConfig, PageBase);
})(window, jQuery);
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
(function(window, jQuery) {
	var PanelModelMap = {};
	co.page.panel.model = {};
	co.page.panel.model.defind = function(type, config, constructor) {
		config = config || {};
		if (PanelModelMap[type] == null) {
			config.type = type;
			PanelModelMap[type] = {};
			PanelModelMap[type].config = config;
			PanelModelMap[type].constructor = constructor;
		}
	};
	co.page.panel.model.get = function(type) {
		return PanelModelMap[type];
	};
	co.page.panel.model.list = function() {
		var list = [];
		for ( var type in PanelModelMap) {
			list[list.length] = PanelModelMap[type];
		}
		return list;
	};
	co.page.panel.model.create = function(type, config) {
		return new PanelModelMap[type].constructor(config);
	};

	co.page.panel.create = function(config) {
		var panel = config.panel;
		var type = panel.type;
		if (co.isEmpty(type)) {
			throw new Error("panel type is null");
		}
		if (co.page.panel.model.get(type) == null) {
			throw new Error(type + " panel is not defined");
		}
		return co.page.panel.model.create(type, config);
	};
})(window, jQuery);
(function(window, jQuery) {
	var ThisPanel = function(config) {
		co.page.panel.Panel.call(this, config);
	};
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.Panel.prototype;
		ThisPanel.prototype = new Super();
	})();

	ThisPanel.prototype.initContent = function() {
		var $view = $(ThisPanelConfig.html);
		var $content = this.$content;
		$content.append($view);

		var panel = this.panel;
		if (panel) {
			var config = panel.config;
			var bodertopcolor = config.bodertopcolor;
			var boderleftcolor = config.boderleftcolor;
			var headerbackgroundcolor = config.headerbackgroundcolor;
			var bodybackgroundcolor = config.bodybackgroundcolor;
			var hasheaderborder = config.hasheaderborder;
			var notitle = config.notitle;
			var title = panel.title;
			var body = panel.body;
			if (co.isEmpty(config.blankpanel)) {
				config.blankpanel = false;
			}

			$content.find('.coos-panel').addClass('coos-panel-light');
			$content.find('.coos-panel').attr('panelid', panel.panelid);
			if (!config.blankpanel && hasheaderborder) {
				$content.find('.coos-panel-header').addClass('bordered');
			}
			if (!config.blankpanel && !co.isEmpty(headerbackgroundcolor)) {
				if (headerbackgroundcolor == 'white') {
				} else {
					$content.find('.coos-panel').removeClass('coos-panel-light').addClass('coos-panel-dark');
				}
				$content.find('.coos-panel-header').addClass('coos-bg-' + headerbackgroundcolor);
			}
			if (!co.isEmpty(bodybackgroundcolor)) {
				if (bodybackgroundcolor == 'white') {
				} else {
					$content.find('.coos-panel-body').addClass('coos-white');
				}
				$content.find('.coos-panel-body').addClass('coos-bg-' + bodybackgroundcolor);
			}
			if (!config.blankpanel && !co.isEmpty(bodertopcolor)) {
				$content.find('.coos-panel').addClass('coos-panel-bd-top coos-bdt-' + bodertopcolor);
			}
			if (!config.blankpanel && !co.isEmpty(boderleftcolor)) {
				$content.find('.coos-panel').addClass('coos-panel-bd-left coos-bdl-' + boderleftcolor);
			}
			if (!co.isEmpty(title)) {
				$content.find('.coos-panel-title').text(title);
			} else {
				$content.find('.coos-panel-title').html('&nbsp;');
			}
			if (notitle) {
				$content.find('.coos-panel-title').html('&nbsp;');
			}
			if (config.noheader) {
				$content.find('.coos-panel-header').hide();
			}
			if (!co.isEmpty(body)) {
				$content.find('.coos-panel-body').html(body);
			}
			if (config.blankpanel) {
				$content.find('.coos-panel-header').hide();
				$content.find('.coos-panel').css('border', '0px solid #ddd');
				$content.find('.coos-panel').css('border-radius', '0px');
				if (this.config.design) {
					$content.find('.coos-panel').css('border', '1px solid #ddd');
				}
			}
		}

	};

	var ThisPanelConfig = {
		html : '<div class="coos-panel ">' + '<div class="coos-panel-header ">' + '	<h3 class="coos-panel-title"></h3>' + '	<div class="coos-panel-menu">'
				+ '		<div class=" coos-menu baseMinimizeBtn">' + '			<i class="fa fa-minus"></i>' + '		</div>' + '		<div class=" coos-menu removePanelBtn">' + '			<i class="fa fa-remove"></i>'
				+ '		</div>' + '	</div>' + '</div>' + '<div class="coos-panel-body coos-layout-container"></div>' + '</div>',
		name : "基础面板",
		hasElement : false,
		columns : [ {
			text : "无头部",
			name : "noheader",
			inputtype : "switch"
		}, {
			text : "无标题",
			name : "notitle",
			inputtype : "switch"
		}, {
			text : "头部边框",
			name : "hasheaderborder",
			inputtype : "switch"
		}, {
			text : "空白面板",
			name : "blankpanel",
			inputtype : "switch"
		}, {
			text : "顶部边框",
			name : "bodertopcolor",
			inputtype : "select",
			usecolor : true
		}, {
			text : "左侧边框",
			name : "boderleftcolor",
			inputtype : "select",
			usecolor : true
		}, {
			text : "头部背景",
			name : "headerbackgroundcolor",
			inputtype : "select",
			usecolor : true
		}, {
			text : "内容背景",
			name : "bodybackgroundcolor",
			inputtype : "select",
			usecolor : true
		} ],
		element : {}
	};
	co.page.panel.model.defind("BASE", ThisPanelConfig, ThisPanel);
})(window, jQuery);
(function(window, jQuery) {
	var ThisPanel = function(config) {
		co.page.panel.Panel.call(this, config);
	};
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.Panel.prototype;
		ThisPanel.prototype = new Super();
	})();

	ThisPanel.prototype.show = function() {
		this.window.show();
		var $windowcancel = this.window.$model.find('.coos-box-footer:last .coos-box-cancel');
		var $showtowindowbuttons = this.$view.find('.coos-button-use-for-window').addClass('coos-box-button');
		if ($showtowindowbuttons.length > 0) {
			this.window.$model.find('.coos-box-footer:last .coos-button-use-for-window').remove();
			$windowcancel.before($showtowindowbuttons);
		}

	};

	ThisPanel.prototype.hide = function() {
		this.window.hide();
	};

	ThisPanel.prototype.initContent = function() {
		this.isshow = false;
		var panel = this.panel;
		var $view = $(ThisPanelConfig.html);
		var $content = this.$content;
		$content.append($view);
		if (this.config.$container) {
			var windowConfig = {};
			windowConfig.title = panel.title;
			windowConfig.html = this.$view;
			if (panel.config.width) {
				windowConfig.width = panel.config.width;
			}
			if (panel.config.height) {
				windowConfig.height = panel.config.height;
			}
			var this_ = this;
			windowConfig.cancelCallback = function() {
			};
			this.window = co.box.window(windowConfig);
		} else {
			$view.find('.coos-panel-body').append(panel.body);
		}

	};
	ThisPanel.prototype.initViewAfter = function() {
		if (this.config.design && this.config.$container) {
			this.show();
			var $window = this.window.$model;
			this.config.$container && (this.config.$container.append($window));
			$window.addClass('coos-column-12 mgb-20');
			$window.css('position', 'relative');
			$window.find('.coos-box-title').append("&nbsp;&nbsp;&nbsp;&nbsp;[窗口面板]");
			$window.find('.coos-box-cover').remove();
			$window.find('.coos-box-content').css('top', 'relative');
			$window.find('.coos-box-content').css('position', 'relative');
			$window.find('.coos-box-center').css('height', 'auto');
			$window.find('.coos-box-center').css('padding-top', '25px');
			$window.show();
			$("body").removeClass('coos-over-hidden');

		}
	};

	var ThisPanelConfig = {
		html : '<div class="coos-panel coos-panel-window">' + '<div class="coos-panel-body coos-layout-container"></div>' + '</div>',
		name : "窗口面板",
		hasElement : false,
		columns : [ {
			text : "显示取消",
			name : "displaycancel",
			inputtype : "switch"
		}, {
			text : "宽度",
			name : "width"
		}, {
			text : "高度",
			name : "height"
		} ],
		element : {}
	};
	co.page.panel.model.defind("WINDOW", ThisPanelConfig, ThisPanel);
})(window, jQuery);
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
(function(window, jQuery) {
	var html = '<div class=" "><div class="coos-button-container  "></div></div>';

	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();

	ThisLayout.prototype.initData = function() {
	};

	ThisLayout.prototype.getData = function() {
		return {};
	};

	ThisLayout.prototype.initContent = function() {
		// var $view = $(html);
		// this.$content.append($view);
		// this.initButton();
	};

	ThisLayout.prototype.getOneView = function(config) {
		var $view = $(html);

		var alignment = this.layout.config.alignment || "left";
		if (this.layout.config.isbuttongroup) {
			$view.find('.coos-button-container').addClass('coos-btn-group');
			if (this.layout.config.alignment) {
				$view.find('.coos-button-container').addClass('float-' + this.layout.config.alignment);
			}
		} else {
			if (this.layout.config.alignment) {
				$view.find('.coos-button-container').addClass('text-' + this.layout.config.alignment);
			}
			$view.find('.coos-button-container').addClass('coos-btn-group-' + this.layout.config.alignment);
		}
		$view.find('.coos-button-container').addClass('coos-btn-group-' + this.layout.config.size);

		return $view;
	};

	var ThisLayoutConfig = {
		name : "按钮",
		hasElement : false,
		hasButton : true,
		columns : [ {

			text : "是按钮组",
			name : "isbuttongroup",
			inputtype : "switch"
		}, {
			text : "对齐方式",
			name : "alignment",
			inputtype : "select",
			datas : [ {
				value : "left",
				text : "居左"
			}, {
				value : "center",
				text : "居中"
			}, {
				value : "right",
				text : "居右"
			} ]
		}, {
			text : "尺寸",
			name : "size",
			inputtype : "select",
			datas : [ {
				value : "xs",
				text : "小"
			}, {
				value : "sm",
				text : "中"
			}, {
				value : "lg",
				text : "大"
			} ]
		} ],
		element : {}
	};
	co.page.panel.layout.model.defind("BUTTON", ThisLayoutConfig, ThisLayout);
})(window, jQuery);
(function(window, jQuery) {
	var html = '<div class="coos-layout-content"><div class=" coos-layout-container "></div></div>';

	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();

	ThisLayout.prototype.initData = function() {
	}
	ThisLayout.prototype.getData = function() {
		return {};
	}

	ThisLayout.prototype.getOneContainerView = function(config) {
		if (this.layout.config.displaytitle) {
			var $title = $('<div class="pdtb-5">' + this.layout.title + '</div>')
			this.$view.find('.coos-layout-one-content:first').before($title);
		}
		return this.$view.find('.coos-layout-one-content:first');
	};

	ThisLayout.prototype.getOneView = function(config) {
		var $one = $(html);
		return $one;
	};

	ThisLayout.prototype.initContent = function() {
		var layout = this.layout;
		var layoutConfig = layout.config;
		if (!co.isEmpty(layoutConfig.width)) {
			this.$view.removeClass('coos-col-' + layout.columnsize);
			this.$content.css('width', layoutConfig.width);
		}
		if (!co.isEmpty(layoutConfig.height)) {
			this.$content.css('height', layoutConfig.height);
		}
		if (!co.isEmpty(layoutConfig.minheight)) {
			this.$content.css('min-height', layoutConfig.minheight);
		}
		if (!co.isEmpty(layoutConfig.maxheight)) {
			this.$content.css('max-height', layoutConfig.maxheight);
		}
		if (!co.isEmpty(layoutConfig["float"])) {
			this.$view.css('float', layoutConfig["float"]);
		}
		if (!co.isEmpty(layoutConfig.margin)) {
			if (co.isEmpty(layoutConfig.width)) {
				this.$content.css('margin', layoutConfig.margin);
			} else {
				this.$view.css('margin', layoutConfig.margin);
			}
		}
		if (!co.isEmpty(layoutConfig.border)) {
			this.$content.css('border', layoutConfig.border);
		} else {
			// this.$content.addClass('coos-bd');
		}
		if (!co.isEmpty(layoutConfig.padding)) {
			this.$content.css('padding', layoutConfig.padding);
		}
		if (this.design) {
			// this.$content.removeClass('coos-bd');
		}
	};

	var ThisLayoutConfig = {
		name : "容器",
		hasElement : false,
		hasButton : false,
		columns : [ {
			text : "显示标题",
			name : "displaytitle",
			inputtype : "switch"
		}, {
			text : "宽度",
			name : "width",
			inputtype : "number"
		}, {
			text : "高度",
			name : "height",
			inputtype : "number"
		}, {
			text : "最小高度",
			name : "minheight",
			inputtype : "number",
			defaultvalue : 50
		}, {
			text : "最大高度",
			name : "maxheight",
			inputtype : "number"
		}, {
			text : "外边据",
			name : "margin"
		}, {
			text : "内边距",
			name : "padding"
		}, {
			text : "边框",
			name : "border"
		}, {
			text : "浮动",
			name : "float",
			inputtype : "select",
			datas : [ {
				value : "left",
				text : "左浮动"
			}, {
				value : "right",
				text : "右浮动"
			}, {
				value : "none",
				text : "无"
			} ]
		} ],
		element : {}
	};
	co.page.panel.layout.model.defind("CONTAINER", ThisLayoutConfig, ThisLayout);
})(window, jQuery);
(function(window, jQuery) {
	var html = '<div class=" coos-form "><div class="coos-hide-element coos-element-container "></div><div class="coos-show-element coos-element-container mglr--10"></div><div class="coos-layout-container "></div><div class="coos-button-container pdt-10 coos-form-button-container "></div></div>';

	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};

		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();

	ThisLayout.prototype.initData = function() {
	};

	ThisLayout.prototype.initViewSuccess = function() {
		// this.$view.find('.coos-one-button').addClass('mgr-5');
	};

	ThisLayout.prototype.initContent = function() {
		// this.$content.addClass('');
	};

	ThisLayout.prototype.getOneView = function(config) {
		var $view = $(html);
		var $buttonContent = $view.find('.coos-button-container');
		if (this.layout.config.displayback) {
			var $backBtn = $('<div class="doBackBtn coos-btn coos-btn-sm coos-bd-grey coos-grey mgr-5"> 返回</div>');
			$buttonContent.append($backBtn);
		}

		if (this.layout.config.displaytitle) {
			var $title = $('<div class="pd-10 font-md">' + this.layout.title + '</div>')
			$view.find('.coos-hide-element:first').before($title);
		}
		return $view;
	};

	// ThisLayout.prototype.getSearchData = function() {
	// var requestmap = this.config.pageObject.config.requestmap || {};
	// requestmap = jQuery.extend(true, {}, requestmap);
	// return requestmap;
	// };

	ThisLayout.prototype.appendSearchData = function(searchData) {
		searchData = searchData || {};
		co.form.full(this.$view, searchData);

	};

	ThisLayout.prototype.getSearchData = function() {
		var data = co.form.validate(this.$view);
		return data;
	};

	ThisLayout.prototype.getData = function() {
		var data = co.form.validate(this.$view);
		return data;
	};

	var ThisLayoutConfig = {
		name : "表单",
		hasElement : true,
		hasButton : true,
		columns : [ {
			text : "显示标题",
			name : "displaytitle",
			inputtype : "switch"
		}, {
			text : "只读",
			name : "readonly",
			inputtype : "switch"
		}, {
			text : "显示返回",
			name : "displayback",
			inputtype : "switch"
		} ],
		getElementModelList : function() {
			var models = co.page.panel.layout.element.model.list();
			$(models).each(function(index, model) {
				co.page.panel.layout.element.model.appendBaseColumns(model.config);
				co.page.panel.layout.element.model.appendInputColumns(model.config);
				co.page.panel.layout.element.model.appendTagColumns(model.config);
				co.page.panel.layout.element.model.appendValidateColumns(model.config);
			});
			return models;
		}
	};
	co.page.panel.layout.model.defind("FORM", ThisLayoutConfig, ThisLayout);
})(window, jQuery);
(function(window, jQuery) {
	var html = '<div class=" coos-child-form-list pdlr-5"><div class="coos-child-form "><div class="coos-form coos-form-model">';
	html += '<div class=" coos-form-header"><h3 class="coos-form-title"></h3><div class="coos-form-button-group"><div class=" coos-form-button coos-form-minus-button"><i class="fa fa-minus"></i></div><div class=" coos-form-button coos-form-delete-button"><i class="fa fa-remove"></i></div></div></div>';
	html += '<div class="coos-form-content coos-row"><form class=" "><div class="coos-hide-element coos-element-container"></div><div class="coos-show-element coos-element-container"></div><div class="coos-layout-container "></div></form></div>';
	html += '</div><div class="coos-child-form-footer"><div class="coos-form-add-child-button" need-init-one="true">添加</div></div>';
	html += '</div></div>';
	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();

	ThisLayout.prototype.initData = function() {
	};

	ThisLayout.prototype.initContent = function() {
	};

	ThisLayout.prototype.getOneView = function() {
		var $view = $(html);
		// if (!this.config.design) {
		$view.find('.coos-form').attr('coos-model', 'true');
		// }
		$view.find('.coos-form-model').attr('coos-data-type', this.layout.config.modeldatatype);
		$view.find('.coos-form-title').text(this.layout.config.title);
		$view.find('.coos-form-model').attr('model-name', this.layout.config.modelname);
		$view.find('.coos-form-model').attr('model-set-name', this.layout.config.modelname);
		$view.find('.coos-form-add-child-button').attr('add-model-button', this.layout.config.modelname);
		return $view;
	};

	var ThisLayoutConfig = {
		name : "子表单",
		hasElement : true,
		hasButton : false,
		columns : [ {
			text : "标题",
			name : "title"
		}, {
			text : "只读",
			name : "readonly",
			inputtype : "switch"
		}, {
			text : "数据类型",
			name : "modeldatatype",
			inputtype : "select",
			cannull : false,
			datas : [ {
				value : "ONE",
				text : "单条"
			}, {
				value : "LIST",
				text : "列表"
			} ]
		}, {
			text : "模型名称",
			name : "modelname",
			cannull : false
		} ],
		getElementModelList : function() {
			var models = co.page.panel.layout.element.model.list();
			$(models).each(function(index, model) {
				co.page.panel.layout.element.model.appendBaseColumns(model.config);
				co.page.panel.layout.element.model.appendInputColumns(model.config);
				co.page.panel.layout.element.model.appendTagColumns(model.config);
				co.page.panel.layout.element.model.appendValidateColumns(model.config);
			});
			return models;
		}
	};
	co.page.panel.layout.model.defind("FORM-CHILD", ThisLayoutConfig, ThisLayout);
})(window, jQuery);
(function(window, jQuery) {
	var html = '<form class="coos-form "><div class="coos-hide-element coos-element-container"></div><div class="coos-show-element coos-element-container mglr--10"></div><div class="coos-button-container pdt-10 text-right coos-search-form-button-container"></div></form>';

	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();

	ThisLayout.prototype.initData = function() {
	};

	ThisLayout.prototype.initContent = function() {
		// this.$content.addClass('');
	};

	ThisLayout.prototype.getOneView = function() {
		var $view = $(html);
		var this_ = this;
		var $buttonContent = $view.find('.coos-button-container');
		var $resetBtn = $('<a class="coos-btn coos-btn-xs coos-bg-grey mgl-5"><i class="fa fa-times-circle"></i> 重置</a>');
		var $searchBtn = $('<a class="coos-btn coos-btn-xs coos-bg-green mgl-5"><i class="fa fa-check-circle"></i> 搜索</a>');
		$buttonContent.append($resetBtn);
		$buttonContent.append($searchBtn);
		$view.on("keydown", function(e) {
			e = e || window.event;
			if (event.keyCode == 13) {
				$searchBtn.click();
				return false;
			}
		});
		$searchBtn.click(function() {
			this_.search();
		});
		$resetBtn.click(function() {
			co.form.clear($view);
		});
		return $view;
	};
	ThisLayout.prototype.getElementPlace = function(elementObject) {
		return "FORM-SEARCH";
	};

	ThisLayout.prototype.initViewSuccess = function() {
		// this.$view.find('.coos-one-button').addClass('mgl-5');
		co.element.init(this.$view);
	};

	ThisLayout.prototype.appendSearchData = function(searchData) {
		searchData = searchData || {};
		co.form.full(this.$view, searchData);

	};

	ThisLayout.prototype.getSearchData = function() {
		var data = co.form.validate(this.$view);
		return data;
	};

	ThisLayout.prototype.getData = function() {
		var data = co.form.validate(this.$view);
		return data;
	};

	var ThisLayoutConfig = {
		name : "搜索表单",
		hasElement : true,
		hasButton : true,
		columns : [ {
			text : "跳页面搜索",
			name : "jumppagesearch",
			inputtype : "switch"
		} ],
		getElementModelList : function() {
			var models = co.page.panel.layout.element.model.list();
			$(models).each(function(index, model) {
				co.page.panel.layout.element.model.appendBaseColumns(model.config);
				co.page.panel.layout.element.model.appendInputColumns(model.config);
				co.page.panel.layout.element.model.appendTagColumns(model.config);
				co.page.panel.layout.element.model.appendValidateColumns(model.config);
			});
			return models;
		}
	};
	co.page.panel.layout.model.defind("FORM-SEARCH", ThisLayoutConfig, ThisLayout);
})(window, jQuery);
(function(window, jQuery) {
	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();

	ThisLayout.prototype.initData = function() {
		this.model = this.layout.config.model || {};
		var modelConfig = {};
		if (!co.isEmpty(this.model.config)) {
			modelConfig = JSON.parse(this.model.config);
		}
		this.modelConfig = modelConfig;
	};

	ThisLayout.prototype.getNewOneContainerView = function() {
		if (this.$containers.length > 0) {
			return this.$containers[0];
		}
		return $('<div></div>');
	};

	ThisLayout.prototype.initContent = function() {
		var $style = $('<style></style>');
		$style.html(this.model.csscontent);
		var $html = $('<div></div>');
		$html.html(this.model.htmlcontent);
		var models = this.modelConfig.models || [];
		var $containers = [];
		var $singles = [];
		var elementmodels = [];
		$(models).each(function(index, one) {
			if (one.type == 'single-container-model') {
				var $model = $html.find('[model-name="' + one.name + '"]');
				$containers.push($model);
			} else if (one.type == 'single-model') {
				var $model = $html.find('[model-name="' + one.name + '"]');
				$singles.push($model);
			} else if (one.type == 'single-element-model') {
				elementmodels.push(one);
			}
		});
		$($containers).each(function(index, $container) {
			$($container).empty();
		});
		this.$containers = $containers;
		this.$singles = $singles;
		this.elementmodels = elementmodels;
		this.$content.append($style);
		this.$content.append($html);
	};

	ThisLayout.prototype.clear = function() {

	}

	ThisLayout.prototype.appendOneData = function(config) {
		config = config || {};
		var data = config.data || {};
		var index = config.index || 0;
		var elementmodels = this.elementmodels || [];
		var $containers = this.$containers || [];
		var $singles = this.$singles || [];
		if ($singles.length == 0) {
			return;
		}
		var layoutConfig = this.layout.config || {};
		$($containers).each(function(index, $container) {
			var $one = null;
			var index_ = index + 1;
			if (index_ <= $singles.length) {
				$one = $singles[index_ - 1];
			} else {
				$one = $singles[($singles.length) % (index_)];
			}
			$one = $one.clone();
			$(elementmodels).each(function(index, elementmodel) {
				var dataname = elementmodel.name;
				dataname = layoutConfig[dataname];
				var value = data[dataname];
				var $el = $one.find('[model-name="' + elementmodel.name + '"]');
				var setvalueway = elementmodel.setvalueway;
				if (co.isEmpty(elementmodel.setvalueway)) {
					setvalueway = "text";
				}
				setvalueway = setvalueway.toLocaleLowerCase();
				if (setvalueway == 'html') {
					$el.html(value);
				} else if (setvalueway == 'src') {
					$el.removeAttr('src');
					$el.attr('path', value);
					$el.addClass('element-rule-image');
					$el.attr('use-file-server-url', 'true');
					co.element.init($one);
				} else if (setvalueway == 'bg') {
					$el.attr('path', value);
					$el.css('background-image', "url()");
					$el.addClass('element-rule-image');
					$el.attr('use-file-server-url', 'true');
					co.element.init($one);
				} else {
					$el.text(value);
				}
			});
			$container.append($one);
		});

	};

	ThisLayout.prototype.initButton = function(config) {

	};

	ThisLayout.prototype.getData = function() {
		var data = {};
		if (this.clickData) {
			data = this.clickData;
		}
		return data;
	};
	var ThisLayoutConfig = {
		name : "布局模型",
		hasElement : false,
		hasButton : false,
		columns : [],
		getColumns : function(data) {
			data = data || {};
			var model = data.model || {};
			var columns = [];
			if (!co.isEmpty(model.config)) {
				var modelConfig = JSON.parse(model.config);

				var models = modelConfig.models || [];
				$(models).each(function(index, model) {
					if (model.type == 'single-element-model') {
						var column = {
							text : model.text,
							name : model.name,
							inputtype : "text"
						}
						columns.push(column);
					}
				});
			}
			return columns;
		}
	};
	co.page.panel.layout.model.defind("MODEL", ThisLayoutConfig, ThisLayout);
})(window, jQuery);
(function(window, jQuery) {
	var html = '<div class="coos-col-12 table-responsive"><table class="coos-table"><thead><tr></tr></thead><tbody></tbody></table></div>';

	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();

	ThisLayout.prototype.initData = function() {
		initDataDefaultTrue(this.layout.config, "haspagesize");
		initDataDefaultFalse(this.layout.config, "isformtable");
		initDataDefaultFalse(this.layout.config, "isdatatable");
		initDataDefaultTrue(this.layout.config, "displayserialnumber");
		initDataDefaultTrue(this.layout.config, "displaybutton");
	};

	ThisLayout.prototype.getElementPlace = function(elementObject) {
		return "TABLE-TD";
	};

	ThisLayout.prototype.getOneView = function(config) {
		var $view = $("<tr></tr>");
		$view.data('data', config.data);
		if (this.layout.config.displayserialnumber) {
			$view.append('<td class="coos-table-index text-center">' + (config.index + 1) + '</td>');
		}
		if (this.layout.config.needradio || this.layout.config.needcheckbox) {
			var $td = $view.find('td:first');
			if ($td.length == 0) {
				$td = $('<td class="coos-table-index text-center"></td>');
				$view.append($td);
			}
			if (this.layout.config.needradio) {
				var radioname = this.radioname || "radio_" + coos.getNumber();
				this.radioname = radioname;
				$td.append('<input type="radio" name="' + radioname + '" class="coos-radio">');
			}
			if (this.layout.config.needcheckbox) {
				var checkboxname = this.checkboxname || "checkbox_" + coos.getNumber();
				this.checkboxname = checkboxname;
				$td.append('<input type="checkbox" name="' + checkboxname + '" class="coos-checkbox">');

			}
			$td.click(function(e) {
				if (e.target.tagName != 'INPUT') {
					$td.find('input').click();
				}
			});
			$td.addClass('coos-pointer');
		}
		return $view;
	};
	ThisLayout.prototype.getButtonContainer = function($container, button) {
		if (!this.layout.config.displaybutton) {
			return $('<div></div>');
		}
		var $buttoncontainer = $container.find('.coos-button-container');
		if ($buttoncontainer.length > 0) {
			return $buttoncontainer;
		}
		var $buttoncontainer = $('<td><div class="coos-button-container coos-td-button-container"></div></td>');
		$container.append($buttoncontainer);
		return $buttoncontainer.find('.coos-button-container');
	};

	ThisLayout.prototype.getOneContainerView = function(config) {
		var $view = $(html);
		if (this.layout.config.displaytitle) {
			var $title = $('<div class="pdtb-5 font-md">' + this.layout.title + '</div>')
			$view.find('table').before($title);
		}
		var $tbody = $view.find('tbody');
		if (this.layout.config.haspagesize) {
			var $ul = co.component.getPaginationUl({}, function() {
			});
			$ul.addClass('mgb-0');
			$view.append($ul);
		}
		this.rowsize = 0;

		if (this.layout.config.isdatatable) {
			$view.find('table').addClass('element-rule-data-tables');
		}
		if (this.layout.config.displayserialnumber) {
			$view.find('thead tr').append('<th width="80px" class="text-center">序号</th>');
			this.rowsize++;
		}
		for (var i = 0; i < this.elementObjects.length; i++) {
			var elementObject = this.elementObjects[i];
			$view.find('thead tr').append(elementObject.getView("TABLE-TH", config));
		}
		if (this.layout.config.displaybutton) {
			$view.find('thead tr').append('<th>操作</th>');
			this.rowsize++;
		}
		this.rowsize = this.rowsize + this.layout.elements.length;
		if (!this.design) {
			$tbody.empty().append('<tr><td colspan="' + this.rowsize + '" class="text-center">数据加载中...</td></tr>');
		} else {
		}
		this.$content.append($view);
		return $tbody;
	};
	ThisLayout.prototype.initNoDataView = function() {

		this.$view.find('tbody').empty().append('<tr><td colspan="' + this.rowsize + '" class="text-center">暂无数据</td></tr>');

	};

	ThisLayout.prototype.removeRow = function($row) {
		$row.remove();
		if (this.$view.find('tbody tr').length == 0) {
			this.initNoDataView();
		}
	};
	ThisLayout.prototype.initContent = function() {

	};
	ThisLayout.prototype.initViewSuccess = function(element) {
		// this.$view.find('.coos-one-button').addClass('mgr-5');
		// this.$tr = this.$content.find('tr:last').clone();
		// this.$theadtr = this.$content.find('thead tr');
	};
	ThisLayout.prototype.getExecuteData = function() {

	};
	ThisLayout.prototype.getData = function(dataConfig) {
		var result = {};
		var isformtable = this.layout.config.isformtable;
		if (this.layout.config.needradio) {
			var name = this.radioname;
			var $input = this.$view.find('[name="' + name + '"]');
			var radio_data = {};
			$($input).each(function(index, input) {
				if (input.checked) {
					radio_data = $(input).closest('tr').data("data");
					if (isformtable) {
						var data = co.form.validate($(input).closest('tr'));
						if (data) {
							for ( var n in data) {
								radio_data[n] = data[n];
							}
						}
					}
				}
			});
			result.radio_data = radio_data;
		}
		if (this.layout.config.needcheckbox) {
			var name = this.checkboxname;
			var $input = this.$view.find('[name="' + name + '"]');
			var checkbox_datas = [];
			$($input).each(function(index, input) {
				if (input.checked) {
					var checkbox_data = $(input).closest('tr').data("data");

					if (isformtable) {
						var data = co.form.validate($(input).closest('tr'));
						if (data) {
							for ( var n in data) {
								checkbox_data[n] = data[n];
							}
						}
					}
					checkbox_datas.push(checkbox_data);
				}
			});

			result.checkbox_datas = checkbox_datas;
		}
		var rowData = {};
		var formData = {};
		if (dataConfig && dataConfig.data) {
			rowData = dataConfig.data;
			formData = dataConfig.data;
		}
		if (this.layout.config.isformtable && dataConfig.$row) {

			var data = co.form.validate(dataConfig.$row);
			if (data) {
				for ( var n in data) {
					formData[n] = data[n];
				}
			}
		} else {
		}
		result.rowData = rowData;
		result.formData = formData;
		return result;
	};

	ThisLayout.prototype.appendDataBefore = function(config) {
		config = config || {};
		var result = config.result;
		if (this.layout.config.haspagesize) {
			result = result || {};
			var this_ = this;
			var $ul = co.component.getPaginationUl(result, function(currentpage) {
				var data = {};
				data.currentpage = currentpage;
				this_.reloadResult({
					jumppage : true,
					data : data
				});
			});
			$ul.addClass('mgb-0');
			var $oldul = this.$view.find('ul.pagination');
			$oldul.before($ul);
			$oldul.remove();
		}
	};

	var ThisLayoutConfig = {
		name : "表格",
		hasElement : true,
		hasButton : true,
		columns : [ {
			text : "显示标题",
			name : "displaytitle",
			inputtype : "switch"
		}, {
			text : "分页",
			name : "haspagesize",
			inputtype : "switch"
		}, {
			text : "拖动排序",
			name : "hassortable",
			inputtype : "switch"
		}, {
			text : "数据表格",
			name : "isdatatable",
			inputtype : "switch"
		}, {
			text : "是表单表格",
			name : "isformtable",
			inputtype : "switch"
		}, {
			text : "显示序号",
			name : "displayserialnumber",
			inputtype : "switch"
		}, {
			text : "显示按钮",
			name : "displaybutton",
			inputtype : "switch"
		}, {
			text : "需要单选框",
			name : "needradio",
			inputtype : "switch"
		}, {
			text : "需要多选框",
			name : "needcheckbox",
			inputtype : "switch"
		} ],
		getElementModelList : function() {
			var models = co.page.panel.layout.element.model.list();
			$(models).each(function(index, model) {
				co.page.panel.layout.element.model.appendBaseColumns(model.config);
			});
			return models;
		}

	};
	co.page.panel.layout.model.defind("TABLE", ThisLayoutConfig, ThisLayout);
})(window, jQuery);
(function(window, jQuery) {
	var html_map = {
		"1" : '<div class="coos-tab"><ul class="coos-tab-buttons"></ul><div class="coos-tab-spans"></div></div>'
	}

	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();

	ThisLayout.prototype.appendTabOneSpan = function(text) {
		if (!coos.isEmpty(text)) {
			var className = "tag-span-" + coos.getNumber();
			var $li = $('<li coos-target=".' + className + '" ><a>' + text + '</a></li>');
			this.$tag.find('.coos-tab-buttons:first').append($li);
			var $span = $('<div class=" coos-tab-span coos-layout-container ' + className + '"></div>');
			this.$tag.find('.coos-tab-spans:first').append($span);
		}

	};
	ThisLayout.prototype.initContent = function() {
		var type = this.layout.config.type || "1";
		var $tag = $(html_map[type]);
		this.$tag = $tag;
		var texts = this.layout.config.texts || "标签";
		var this_ = this;
		$(texts.split(',')).each(function(index, text) {
			this_.appendTabOneSpan(text);
		});
		this.$content.append($tag);
		$tag.find('li:first').addClass('active');
	};

	ThisLayout.prototype.getNewOneContainerView = function(config) {
		return this.$tag.find('.coos-tab-span:first');
	};

	// ThisLayout.prototype.getSearchData = function() {
	// var requestmap = this.config.pageObject.config.requestmap || {};
	// requestmap = jQuery.extend(true, {}, requestmap);
	// return requestmap;
	// };

	ThisLayout.prototype.getData = function() {
		var data = co.form.validate(this.$view);
		return data;
	};

	var ThisLayoutConfig = {
		name : "标签",
		columns : [ {
			text : "显示标题",
			name : "displaytitle",
			inputtype : "switch"
		}, {
			text : "只读",
			name : "readonly",
			inputtype : "switch"
		}, {
			text : "显示返回",
			name : "displayback",
			inputtype : "switch"
		} ]
	};
	co.page.panel.layout.model.defind("TAG", ThisLayoutConfig, ThisLayout);
})(window, jQuery);
(function(window, jQuery) {
	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();
	ThisLayout.prototype.initData = function() {
		this.layout.config.idname = this.layout.config.idname || "id";
		this.layout.config.textname = this.layout.config.textname || "text";
	};
	ThisLayout.prototype.initContent = function() {

	};

	ThisLayout.prototype.initDemoView = function() {
		var data = {};
		data[this.layout.config.idname] = 1;
		data[this.layout.config.textname] = "文案";
		if (this.config.design) {
			this.appendData([ data ]);
		} else {

			this.appendData([]);
		}
	};
	ThisLayout.prototype.clear = function() {
		if (!this.config.design) {
			this.$content.empty();
			this.appendData([]);
		}
	}

	ThisLayout.prototype.appendData = function(list, config) {
		config = config || {};
		var resultMap = config.resultMap || {};
		var layout = this.layout;
		var treeConfig = {};
		if (!co.isEmpty(layout.config.treeulheight) && layout.config.treeulheight > 0) {
			treeConfig.treeUlHeight = layout.config.treeulheight;
		} else {
			treeConfig.treeUlHeight = null;
		}
		if (!co.isEmpty(layout.config.topid)) {
			treeConfig.topid = layout.config.topid;
		}
		if (!co.isEmpty(layout.config.openLevel)) {
			treeConfig.openLevel = layout.config.openlevel;
		} else {
			treeConfig.openLevel = 2;
		}
		treeConfig.openHalfCheck = layout.config.openhalfcheck;
		treeConfig.hasSearch = layout.config.hassearch;
		treeConfig.openSearchPrompt = layout.config.opensearchprompt;
		treeConfig.openLazyRendering = layout.config.openlazyrendering;
		treeConfig.openSingleLevel = layout.config.opensinglelevel;
		treeConfig.property = {
			id : this.layout.config.idname,
			parentid : this.layout.config.parentidname,
			text : this.layout.config.textname
		};

		if (this.layout.config.hascheckbox) {
			treeConfig.hasCheckbox = true;
			var checkedservicemodel = this.layout.config.checkedservicemodel;
			var checkedfieldname = this.layout.config.checkedfieldname;
			if (!co.isEmpty(checkedservicemodel) && !co.isEmpty(checkedfieldname)) {
				var checkedresult = resultMap[checkedservicemodel] || {};
				var checkedvalue = checkedresult;
				if (checkedresult && checkedresult.value) {
					checkedvalue = checkedresult.value;
				}
				var checkedIds = [];
				$(checkedvalue).each(function(index, checkedone) {
					if (checkedone && !co.isEmpty(checkedone[checkedfieldname])) {
						checkedIds[checkedIds.length] = checkedone[checkedfieldname];
					}
				});
				treeConfig.checkedIds = checkedIds;
			}
		}

		treeConfig.datas = list;
		this.$content.empty();
		treeConfig.content = this.$content;
		this.tree = co.tree(treeConfig);
		if (co.isEmpty(layout.config.treeulheight) || layout.config.treeulheight <= 0) {
			this.tree.$tree.css('border-bottom', '0px');
		}
		this.firstclicked = false;
		var this_ = this;
		$(this.$content.find('li')).each(function(index, $li) {
			$li = $($li);
			var data = $li.data('data');
			if (data) {
				var $one = $li.find('.coos-row:first');
				this_.bindChildLayout($one, data);
			}
		});
		this.initButton(config);

	};

	ThisLayout.prototype.initButton = function(config) {
		var $view = this.$view;
		var layout = this.layout;
		layout.buttons = layout.buttons || [];
		var buttons = layout.buttons;
		$view.find('.tree-button-group').addClass('coos-button-container');
		if (buttons.length == 0 && this.config.design) {
			$view.find('.coos-button-container').append('按钮组');
		}
		if (this.config.design) {
			$view.find('.coos-button-container').css('min-height', '100px').css('min-width', '100px');
		}
		var $lis = $view.find('li');
		var this_ = this;
		$($lis).each(function(index, $li) {
			$li = $($li);
			var data = $li.data('data');
			var config_ = {};
			config_.index = index;
			config_.data = data;
			this_.appendLiButton($li, config_);
		});

	};

	ThisLayout.prototype.appendLiButton = function($li, config) {
		config.$row = $li;
		for (var i = 0; i < this.buttonObjects.length; i++) {
			var buttonObject = this.buttonObjects[i];
			var $button = buttonObject.getView(this.getButtonPlace(buttonObject), config);
			$button.addClass('tree-button');
			$li.find('.coos-button-container:first').append($button);
		}
	};

	ThisLayout.prototype.getData = function($button, button, data) {
		return data;
	};

	ThisLayout.prototype.getData = function() {
		var data = {};
		if (this.clickData) {
			data = this.clickData;
		}
		if (this.layout.config.hascheckbox) {
			var result = this.tree.getCheckedDatas();
			var checkedData = result.checkedData;
			var checkedDatas = result.checkedDatas;
			var checkedDeleteIds = result.checkedDeleteIds;
			var checkedDeleteDatas = result.checkedDeleteDatas;
			if (this.layout.config.hascheckbox) {
				data[this.layout.name + "_checkeddatastr"] = JSON.stringify(checkedDatas);
				data[this.layout.name + "_checkeddeletedatastr"] = JSON.stringify(checkedDeleteDatas);
			} else {
				if (this.clickData) {
					return this.clickData;
				}
			}
		}
		return data;
	};
	var ThisLayoutConfig = {
		name : "树",
		hasElement : false,
		hasButton : true,
		columns : [ {
			text : "拖动排序",
			name : "hassortable",
			inputtype : "switch"
		}, {
			text : "是否有复选框",
			name : "hascheckbox",
			inputtype : "switch"
		}, {
			text : "是否有搜索",
			name : "hassearch",
			inputtype : "switch"
		}, {
			text : "开启半选中",
			name : "openhalfcheck",
			inputtype : "switch"
		}, {
			text : "开启搜索提示",
			name : "opensearchprompt",
			inputtype : "switch"
		}, {
			text : "开启懒渲染",
			name : "openlazyrendering",
			inputtype : "switch"
		}, {
			text : "开启单级树",
			name : "openSingleLevel",
			inputtype : "switch"
		}, {
			text : "树高度",
			name : "treeulheight",
			inputtype : "switch"
		}, {
			text : "打开层级",
			name : "openlevel"
		}, {
			text : "选中值服务模型",
			name : "checkedservicemodel"
		}, {
			text : "选中值字段名",
			name : "checkedfieldname"
		}, {
			text : "编号名称",
			name : "idname",
			inputtype : "text",
			cannull : false
		}, {
			text : "文案名称",
			name : "textname",
			inputtype : "text",
			cannull : false
		}, {
			text : "父名称",
			name : "parentidname",
			inputtype : "text",
			cannull : false
		} ]
	};
	co.page.panel.layout.model.defind("TREE", ThisLayoutConfig, ThisLayout);
})(window, jQuery);
(function(window, jQuery) {
	var html = '<div class=" "></div>';
	var Element = function(config) {
		this.config = config;
		this.element = config.element;
		this.design = config.design;
		this.init(config);
		jQuery.extend(true, config.element, this.element);
	};

	Element.prototype.init = function(config) {
		var element = config.element;
		var elementConfig = element.config;
		if (elementConfig != null) {
			if (co.isString(elementConfig)) {
				elementConfig = JSON.parse(elementConfig);
			}
		}
		element.config = elementConfig || {};

		if (this.forsearch && this.element.type == 'SWITCH') {

			this.element.selectdatas = [ {
				text : '是',
				value : '1'
			}, {
				text : '否',
				value : '0'
			} ]
		}
		var selectdatamap = {};
		var selectdatas = this.getSelectDatas();
		$(selectdatas).each(function(index, selectdata) {
			selectdatamap["" + selectdata.value] = selectdata;
		});
		this.selectdatamap = selectdatamap;
	};

	Element.prototype.getSelectDatas = function() {
		return this.element.selectdatas;
	};
	Element.prototype.textUseSelectData = function() {
		return false;
	};

	Element.prototype.getSelectData = function(value) {
		if (!co.isEmpty(value)) {
			var selectdata = this.selectdatamap["" + value];
			if (selectdata == null) {
				if (("" + value) == ("true")) {
					selectdata = this.selectdatamap["1"];
				} else if (("" + value) == ("false")) {
					selectdata = this.selectdatamap["0"];
				}
			}
			return selectdata;
		}
		return null;
	};

	Element.prototype.getSelectDataText = function(value) {
		var text = "";
		if (!co.isEmpty(value)) {
			var vs = ("" + value).split(',');
			var this_ = this;
			$(vs).each(function(index, v) {
				var selectdata = this_.getSelectData(v);
				if (selectdata != null) {
					text += "," + selectdata.text;
				}
			});
		}
		if (!co.isEmpty(text)) {
			text = text.replace(',', '');
		} else {
			text = "";
		}
		return text;
	};

	Element.prototype.initAttribute = function($input) {

		var config = this.element.config;
		var helpinfo = config.helpinfo;
		var minlength = config.minlength;
		var maxlength = config.maxlength;
		var readonly = config.readonly;

		if (this.config.layout && this.config.layout.config) {
			if (coos.isTrue(this.config.layout.config.readonly)) {
				readonly = true;
			}
		}
		var display = config.display;
		var cannull = config.cannull;
		if (!readonly) {
			minlength = 0;
		}
		var linkagename = this.element.linkagename;
		var columnsize = this.element.columnsize;
		var inputgrouptype = config.inputgrouptype;
		var labelsize = config.labelsize;
		inputgrouptype = inputgrouptype || 4;
		labelsize = labelsize || 3;
		var helpinfo = config.helpinfo;
		// 隐藏
		if (!display) {
			this.element.type = "TEXT";
		}
		var name = this.element.name;
		var label = config.label;
		var inputtype = this.element.type;
		if (co.isEmpty(inputtype)) {
			inputtype = "TEXT";
		}
		if (this.forsearch && (inputtype == 'SWITCH')) {
			inputtype = "SELECT";
		}
		if (inputtype == 'IMAGE' || inputtype == 'IMAGES') {
		} else {
			$input.addClass('input-rule-' + inputtype.toLowerCase());
		}

		if (!co.isEmpty(config.pattern)) {
			$input.attr('pattern', config.pattern);
		}
		if (!co.isEmpty(config.eq)) {
			$input.attr('eq', config.eq);
		}
		if (!co.isEmpty(config.eqto)) {
			$input.attr('eqto', config.eqto);
		}
		if (!co.isEmpty(config.gt)) {
			$input.attr('gt', config.gt);
		}
		if (!co.isEmpty(config.gtto)) {
			$input.attr('gtto', config.gtto);
		}
		if (!co.isEmpty(config.gte)) {
			$input.attr('gte', config.gte);
		}
		if (!co.isEmpty(config.gteto)) {
			$input.attr('gteto', config.gteto);
		}
		if (!co.isEmpty(config.lt)) {
			$input.attr('lt', config.lt);
		}
		if (!co.isEmpty(config.ltto)) {
			$input.attr('ltto', config.ltto);
		}
		if (!co.isEmpty(config.beforeaddon)) {
			$input.attr('before-addon', config.beforeaddon);
		}
		if (!co.isEmpty(config.afteraddon)) {
			$input.attr('after-addon', config.afteraddon);
		}
		if (!co.isEmpty(config.beforeaddononclick)) {
			$input.attr('before-addon-click', config.beforeaddononclick);
		}
		if (!co.isEmpty(config.afteraddononclick)) {
			$input.attr('after-addon-click', config.afteraddononclick);
		}
		$input.attr('help-info', helpinfo);
		$input.attr('name', name);
		$input.attr('label', label);
		$input.attr('label-size', labelsize);
		$input.attr('filtermode', config.filtermode);
		$input.attr('linkagename', linkagename);
		$input.attr('placeholder', config.oldlabel);
		$input.attr('minlength', minlength);
		if (maxlength > 0) {
			$input.attr('maxlength', maxlength);
		}
		$input.attr('cannull', cannull);
		$input.attr('column-size', columnsize);
		$input.attr('group-type', inputgrouptype);
		$input.attr('isreadonly', readonly);
		$input.attr('display', display);
		$input.attr('coos-validate', config.jsvalidate);
		$input.attr('coos-click', config.onclick);
		$input.attr('need-full-change', "true");
		$input.attr('need-addon', true);
		$input.addClass('parameter');
		$input.addClass('input-rule-group');

		if (!co.isEmpty(this.element.config.defaultvalue)) {
			$input.attr("defaultvalue", this.element.config.defaultvalue);
		}
		if (!this.config.design && this.config.pageObject.config.requestmap) {
			if (co.isEmpty(this.element.config.userrequestmapfordefault) || this.element.config.userrequestmapfordefault) {

				if (this.config.pageObject.config.requestmap[name] != null) {
					$input.attr('defaultvalue', this.config.pageObject.config.requestmap[name]);
				}
			}
		}
		if (!co.isEmpty(this.element.thisvalue)) {
			$input.attr("defaultvalue", this.element.thisvalue);
		}
	};

	Element.prototype.getInput = function() {
		return $("<input type=\"text\" />");
	};

	Element.prototype.getTableThView = function() {
		var $input = $('<th></th>');
		$input.text(this.element.config.label);
		$input.addClass('coos-one-element');
		$input.attr('elementid', this.element.elementid);
		$input.data('element', this.element);
		$input.data('elementObject', this);
		var display = this.element.config.display;
		if (!display) {
			$input.addClass('display-none');
		}
		if (this.element.config.clicktosort) {
			$input.addClass('coos-sort-both');
			$input.attr('rule-sort-name', this.element.name);
			var type = "";
			var this_ = this;
			$input.click(function() {
				var type = $input.attr('rule-sort-type');
				if (coos.isEmpty(type)) {
					type = "asc";
				} else if (type == "asc" || type == "ASC") {
					type = "desc";
				} else {
					type = null;
				}
				$input.removeClass('coos-sort-asc coos-sort-desc');
				if (coos.isEmpty(type)) {
					$input.removeAttr('rule-sort-type');
				} else {
					if (type == "asc") {
						$input.addClass('coos-sort-asc');
					} else if (type == "desc") {
						$input.addClass('coos-sort-desc');
					}
					$input.attr('rule-sort-type', type);
				}
				this_.config.layoutObject.loadData();
			});
		}
		return $input;
	};

	Element.prototype.getTableTdView = function() {
		var $input = $('<td></td>');
		$input.text(this.element.config.label + "显示值");
		$input.addClass('coos-one-element');
		$input.attr('elementid', this.element.elementid);
		var display = this.element.config.display;
		if (!display) {
			$input.addClass('display-none');
		}
		return $input;
	};

	Element.prototype.getTableTdValue = function(value) {
		return value;
	};

	Element.prototype.initView = function() {
		this.initViewBefore();
		this.$view = $(html);
		var $input = null;
		var $td = null;
		var $th = null;
		if (this.place == ('TABLE-TH')) {
			$th = this.getTableThView();
		} else if (this.place == ('TABLE-TD')) {
			$td = this.getTableTdView();
			if (this.config.layoutObject.layout.config.isformtable) {
				$input = this.getInput();
			}
		} else {
			$input = this.getInput();
		}
		if ($th != null) {
			this.$view.append($th);
		}
		if ($td != null) {
			this.$view.append($td);
		}
		if ($input != null) {
			this.initInput($input);
			if ($td != null) {
				$td.empty().append($input);
			} else {
				this.$view.append($input);
			}
		}
		if ($input != null) {
			if ($td == null) {
				$input.attr('elementid', this.element.elementid);
				$input.attr('addClass', 'coos-one-element');

			}
			this.initAttribute($input);
			var datas = this.element.selectdatas;
			if (this.element.config.needwrap) {
				$input.before("<div class=\"coos-col-12\"></div>");
			}

			if (datas != null) {
				var $select = $('<select class="option-select display-none" />');
				if ($input[0].tagName == 'SELECT') {
					$select = $input;
					$select.append('<option value="">请选择</option>');
				} else {
					this.$view.append($select);
					var inputtype = this.element.type;
					if (inputtype.indexOf('RADIO') >= 0) {
						if (this.forsearch) {
							$select.append('<option value="">全部</option>');
						}
					}
				}
				$(datas).each(function(index, data) {
					var option = $('<option />');
					for ( var n in data) {
						option.attr(n, data[n]);
					}
					option.text(data.text);
					$select.append(option);
				});
				if (!co.isEmpty(this.element.config.relationname)) {
					$input.attr('rule-relation', this.element.config.relationname);
				} else if (!co.isEmpty(this.element.relationname)) {
					$input.attr('rule-relation', this.element.relationname);
				}
			}
			if (this.place == 'FORM-SEARCH') {
				if (this.element.type == 'SLIDER') {
					var name = this.element.name;
					var startname = name + "_start";
					var endname = name + "_end";
					var $start = $('<input class="parameter "  style="display:none;" name="' + startname + '" need-full-change="true" value="0"/>');
					var $end = $('<input class="parameter"  style="display:none;" name="' + endname + '" need-full-change="true" value="100"/>');
					this.$view.append($start);
					this.$view.append($end);
					$input.attr('coos-is-interval-search', "true");
					$end.change(function() {
						var startvalue = $start.val();
						var endvalue = $end.val();
						$input.val(startvalue + "," + endvalue);
						$input.change();
					});
					var thisvalue = $input.val();
					if (!co.isEmpty(thisvalue) && thisvalue.indexOf(',') > 0) {
						var start = thisvalue.split(',')[0];
						var end = thisvalue.split(',')[1];

						$start.attr('value', start);
						$input.attr('value', thisvalue);
					} else {
						$input.attr('value', '0,100');
					}
				}

			}
		}
		if ($td != null && $input != null) {
			$input.attr('label-size', 0);
			$input.attr('column-size', 12);
			$td.addClass('pd-0');
		}
		this.$input = $input;
		this.$th = $th;
		this.$td = $td;
		if (!this.config.design) {
			this.bindEvent();
		}
		this.$view = this.$view.children();
		this.initViewAfter();
	};

	Element.prototype.initViewBefore = function() {
	};

	Element.prototype.initViewAfter = function() {
	};

	Element.prototype.appendFormValue = function(value) {
		var $input = this.$input;
		if ($input != null) {
			$input.val(this.getValue(value));
			$input.data('text-value', this.getTextValue(value));
			$input.change();
		}
	};
	Element.prototype.appendTdValue = function(value) {
		var $td = this.$td;
		if ($td != null) {
			if (this.$input != null) {
				this.appendFormValue(value);
			} else {

				$td.empty();
				$td.append(this.getTextValue(value));
			}
		}
	};

	Element.prototype.appendValue = function(dataConfig) {
		dataConfig = dataConfig || {};
		dataConfig.data = dataConfig.data || {};
		this.dataConfig = dataConfig;
		var data = dataConfig.data;
		var name = this.element.name;
		var value = data[name];

		if (this.place == ('TABLE-TD')) {
			this.appendTdValue(value);
		} else {
			this.appendFormValue(value);
		}
	};

	Element.prototype.getTextValue = function(value) {
		if (this.textUseSelectData()) {
			return this.getSelectDataText(this.getValue(value));
		}
		return value;
	};

	Element.prototype.getValue = function(value) {
		return value;
	};

	Element.prototype.getView = function(place) {
		place = place || "FORM";
		this.place = place;
		if (this.place == 'FORM-SEARCH') {
			this.forsearch = true;
			this.element.config.userrequestmapfordefault = true;
			if (!this.design) {
			}
		}
		this.initView();
		return this.$view;
	};
	Element.prototype.bindEvent = function() {
		var this_ = this;
		$(this.element.events).each(function(index, event) {
			co.page.event.bind({
				event : event,
				$view : this_.$view,
				$input : this_.$input,
				$td : this_.$td,
				$th : this_.$th,
				design : this_.config.design,
				layout : this_.config.layout,
				layoutObject : this_.config.layoutObject,
				page : this_.config.page,
				pageObject : this_.config.pageObject,
				panel : this_.config.panel,
				panelObject : this_.config.panelObject
			});
		});
	};
	Element.prototype.initInput = function($input) {
	};

	co.page.panel.layout.element = {};
	co.page.panel.layout.element.Element = Element;
})(window, jQuery);
(function(window, jQuery) {
	var ElementModelMap = {};
	co.page.panel.layout.element.model = {};
	co.page.panel.layout.element.model.defind = function(type, config, constructor) {
		config = config || {};
		if (ElementModelMap[type] == null) {
			config.type = type;
			ElementModelMap[type] = {};
			ElementModelMap[type].config = config;
			ElementModelMap[type].constructor = constructor;
		}
	};
	co.page.panel.layout.element.model.appendInputColumns = function(config) {

	};

	co.page.panel.layout.element.model.get = function(type) {
		return ElementModelMap[type];
	};

	co.page.panel.layout.element.model.list = function() {
		var list = [];
		for ( var type in ElementModelMap) {
			list[list.length] = ElementModelMap[type];
		}
		return list;
	};
	co.page.panel.layout.element.model.create = function(type, config) {
		return new ElementModelMap[type].constructor(config);
	};

	co.page.panel.layout.element.create = function(config) {
		var element = config.element;
		var type = element.type;
		if (co.isEmpty(type)) {
			throw new Error("element type is null");
		}
		if (co.page.panel.layout.element.model.get(type) == null) {
			throw new Error(type + " element is not defined");
		}
		return co.page.panel.layout.element.model.create(type, config);
	};
	co.page.panel.layout.element.model.appendBaseColumns = function(config) {
		if (config.forInput) {
			$(baseColumns).each(function(index, column) {
				if (!hasColumn(config, column)) {
					config.columns[config.columns.length] = column;
				}
			});
		}
	};
	var hasColumn = function(config, column) {
		var has = false;
		$(config.columns).each(function(index, one) {
			if (one.name == column.name) {
				has = true;
			}
		});
		return has;
	};
	co.page.panel.layout.element.model.appendInputColumns = function(config) {
		if (config.forInput) {
			$(inputColumns).each(function(index, column) {
				if (!hasColumn(config, column)) {
					config.columns[config.columns.length] = column;
				}
			});
		}
	};
	co.page.panel.layout.element.model.appendTagColumns = function(config) {

		if (config.forInput) {
			$(tagColumns).each(function(index, column) {
				if (!hasColumn(config, column)) {
					config.columns[config.columns.length] = column;
				}
			});
		}
	};
	co.page.panel.layout.element.model.appendValidateColumns = function(config) {

		if (config.forInput) {
			$(validateColumns).each(function(index, column) {
				if (!hasColumn(config, column)) {
					config.columns[config.columns.length] = column;
				}
			});
		}
	};
	var baseColumns = [ {
		text : "标签",
		name : "label"
	}, {
		text : "标签占列",
		name : "labelsize"
	}, {
		text : "默认值",
		name : "defaultvalue"
	}, {
		text : "显示",
		name : "display",
		inputtype : "switch"
	}, {
		text : "点击排序",
		name : "clicktosort",
		inputtype : "switch"
	} , {
		text : "帮助信息",
		name : "helpinfo"
	}];
	var inputColumns = [ {
		text : "使用请求值",
		name : "userrequestmapfordefault",
		inputtype : "switch"
	}, {
		text : "输入框组类型",
		name : "inputgrouptype",
		inputtype : "select",
		datas : [ {
			value : "1",
			text : "单行两列"
		}, {
			value : "2",
			text : "两行两列（有帮助信息）"
		}, {
			value : "3",
			text : "单行三列（有帮助信息）"
		}, {
			value : "4",
			text : "两行一列"
		}, {
			value : "5",
			text : "三行一列（有帮助信息）"
		}, {
			value : "6",
			text : "两行两列（有帮助信息）"
		} ]
	}, {
		text : "可以为空",
		name : "cannull",
		inputtype : "switch"
	}, {
		text : "只读",
		name : "readonly",
		inputtype : "switch"
	} ];
	var validateColumns = [

	{
		text : "最小长度",
		name : "minlength",
		inputtype : "number"
	}, {
		text : "最大长度",
		name : "maxlength",
		inputtype : "number"
	}, {
		text : "JS验证",
		name : "jsvalidate"
	}, {
		text : "正则",
		name : "pattern"
	}, {
		text : "等于",
		name : "eq"
	}, {
		text : "等于元素",
		name : "eqto"
	}, {
		text : "大于",
		name : "gt"
	}, {
		text : "大于元素",
		name : "gtto"
	}, {
		text : "大于等于",
		name : "gte"
	}, {
		text : "大于等于元素",
		name : "gteto"
	}, {
		text : "小于",
		name : "lt"
	}, {
		text : "小于元素",
		name : "ltto"
	}, {
		text : "小于等于",
		name : "lte"
	}, {
		text : "小于等于元素",
		name : "lteto"
	} ];

	var tagColumns = [ {
		text : "前置标签",
		name : "beforeaddon"
	}, {
		text : "前置标签点击",
		name : "beforeaddononclick"
	}, {
		text : "后置标签",
		name : "afteraddon"
	}, {
		text : "后置标签点击",
		name : "afteraddononclick"
	} ];
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
	};

	var ThisElementConfig = {
		name : "文本",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("TEXT", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
	};

	var ThisElementConfig = {
		name : "颜色",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("COLOR", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
		$input.attr('isinteger', true);
	};

	var ThisElementConfig = {
		name : "数字",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("NUMBER", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
		$input.attr('isphone', true);
	};

	var ThisElementConfig = {
		name : "手机号",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("PHONE", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
		$input.attr('ismailbox', true);
	};

	var ThisElementConfig = {
		name : "邮箱",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("MAILBOX", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
		$input.attr('iscardid', true);
	};

	var ThisElementConfig = {
		name : "身份证",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("CARDID", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.getValue = function(value) {
		return co.date.formatDatetime(value);
	};

	ThisElement.prototype.getTextValue = function(value) {
		return co.date.formatDatetime(value);
	};

	ThisElement.prototype.initInput = function() {
	};
	var ThisElementConfig = {
		name : "日期时间",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("DATETIME", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.getValue = function(value) {
		return co.date.formatDatetime(value);
	};

	ThisElement.prototype.getTextValue = function(value) {
		return co.date.formatDatetime(value);
	};

	ThisElement.prototype.initInput = function() {
	};

	var ThisElementConfig = {
		name : "日期",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("DATE", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.getValue = function(value) {
		return co.date.formatDatetime(value);
	};

	ThisElement.prototype.getTextValue = function(value) {
		return co.date.formatDatetime(value);
	};

	ThisElement.prototype.initInput = function() {
	};

	var ThisElementConfig = {
		name : "时间",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("TIME", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
		$input.val(0);
	};

	var ThisElementConfig = {
		name : "进度条",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("SLIDER", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.getInput = function() {
		if (this.forsearch) {
			return $("<select ></select>");
		}
		return $("<input type=\"checkbox\" />");
	};
	ThisElement.prototype.getSelectDatas = function() {
		return [ {
			text : '是',
			value : '1'
		}, {
			text : '否',
			value : '0'
		} ];
	};

	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initInput = function($input) {
	};

	var ThisElementConfig = {
		name : "开关",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("SWITCH", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.getInput = function() {
		return $("<select ></select>");
	};
	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initInput = function($input) {
	};

	var ThisElementConfig = {
		name : "下拉框",
		forInput : true,
		columns : [ {
			text : "级联元素",
			name : "relationname"
		} ]
	};
	co.page.panel.layout.element.model.defind("SELECT", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initInput = function($input) {
		$input.addClass('input-rule-multi-select');

	};

	var ThisElementConfig = {
		name : "多选下拉框",
		forInput : true,
		columns : [ {
			text : "级联元素",
			name : "relationname"
		} ]
	};
	co.page.panel.layout.element.model.defind("SELECTS", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initInput = function($input) {
	};

	var ThisElementConfig = {
		name : "单选框",
		forInput : true,
		columns : [ {
			text : "级联元素",
			name : "relationname"
		} ]
	};
	co.page.panel.layout.element.model.defind("RADIO", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initInput = function($input) {
	};

	var ThisElementConfig = {
		name : "单选标签",
		forInput : true,
		columns : [ {
			text : "级联元素",
			name : "relationname"
		} ]
	};
	co.page.panel.layout.element.model.defind("RADIO-TAG", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();
	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initInput = function($input) {
	};

	var ThisElementConfig = {
		name : "复选框",
		forInput : true,
		columns : [ {
			text : "级联元素",
			name : "relationname"
		} ]
	};
	co.page.panel.layout.element.model.defind("CHECKBOX", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();
	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initInput = function($input) {
	};

	var ThisElementConfig = {
		name : "复选标签",
		forInput : true,
		columns : [ {
			text : "级联元素",
			name : "relationname"
		} ]
	};
	co.page.panel.layout.element.model.defind("CHECKBOX-TAG", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.getInput = function() {
		return $("<textarea ></textarea>");
	};

	ThisElement.prototype.initInput = function($input) {
	};

	var ThisElementConfig = {
		name : "文本域",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("TEXTAREA", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.getInput = function() {
		return $("<textarea ></textarea>");
	};

	ThisElement.prototype.initInput = function($input) {
	};

	var ThisElementConfig = {
		name : "编辑器",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("EDITOR", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {

		if ($input[0].tagName == 'INPUT') {
			$input.addClass('input-rule-file');
			$input.attr('file-count', '1');
		}

	};

	var ThisElementConfig = {
		name : "文件",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("FILE", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {

		if ($input[0].tagName == 'INPUT') {
			$input.addClass('input-rule-file');
			$input.attr('file-count', '5');
		}
	};

	var ThisElementConfig = {
		name : "多文件",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("FILES", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
		if ($input[0].tagName == 'INPUT') {
			$input.addClass('input-rule-file-image');
			$input.attr('file-count', '1');
		}
	};

	ThisElement.prototype.appendTdValue = function(value) {
		this.$td.empty();
		var $img = $("<img class='element-rule-image' style=\"width: 40px;\" />");
		var urls = co.url.formatImageUrls(value);
		$img.attr('path', urls[0]);
		this.$td.append($img);
		this.$td.css('line-height', 0);
	};

	var ThisElementConfig = {
		name : "图片",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("IMAGE", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {

		if ($input[0].tagName == 'INPUT') {
			$input.addClass('input-rule-file-image');
			$input.attr('file-count', '5');
		}
	};

	var ThisElementConfig = {
		name : "多图片",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("IMAGES", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
		$input.addClass('input-rule-file-audio');
	};

	var ThisElementConfig = {
		name : "音频",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("AUDIO", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
		$input.addClass('input-rule-file-video');
	};

	var ThisElementConfig = {
		name : "视频",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("VIDEO", ThisElementConfig, ThisElement);
})(window, jQuery);
(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.getInput = function() {
		var $view = $('<h1 class="coos-col-12">h1文案区域</h1>');
		if (!coos.isEmpty(this.element.config.addclass)) {
			$view.addClass(this.element.config.addclass);
		}
		if (!coos.isEmpty(this.element.config.content)) {
			$view.html(this.element.config.content);
		}
		this.$h_view = $view;
		return $view;
	};

	ThisElement.prototype.appendFormValue = function(value) {
		if (coos.isTrue(this.element.config.displayvalue)) {
			this.$h_view.html(this.getTextValue(value) || "");
		}
	};

	var ThisElementConfig = {
		name : "h1~h6",
		columns : [ {
			text : "显示值信息",
			name : "displayvalue",
			inputtype : "switch"
		}, {
			text : "添加类样式",
			name : "addclass"
		}, {
			text : "样式",
			name : "style"
		}, {
			text : "内容",
			name : "content",
			inputtype : "textarea"
		} ]
	};
	co.page.panel.layout.element.model.defind("ELEMENT-H", ThisElementConfig, ThisElement);
})(window, jQuery);
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
(function(window, jQuery) {
	var ButtonModelMap = {};
	co.page.panel.layout.button.model = {};
	co.page.panel.layout.button.model.defind = function(type, config, constructor) {
		config = config || {};

		if (ButtonModelMap[type] == null) {
			config.type = type;
			ButtonModelMap[type] = {};
			ButtonModelMap[type].config = config;
			ButtonModelMap[type].constructor = constructor;
		}
	};
	co.page.panel.layout.button.model.get = function(type) {
		return ButtonModelMap[type];
	};
	co.page.panel.layout.button.model.list = function() {
		var list = [];
		for ( var type in ButtonModelMap) {
			list[list.length] = ButtonModelMap[type];
		}
		return list;
	};
	co.page.panel.layout.button.model.create = function(type, config) {
		return new ButtonModelMap[type].constructor(config);
	};

	co.page.panel.layout.button.create = function(config) {
		var button = config.button;
		var type = button.type;
		if (co.isEmpty(type)) {
			throw new Error("button type is null");
		}
		if (co.page.panel.layout.button.model.get(type) == null) {
			throw new Error(type + " button is not defined");
		}
		return co.page.panel.layout.button.model.create(type, config);
	};
})(window, jQuery);
(function(window, jQuery) {
	function ButtonBase(config) {
		co.page.panel.layout.button.Button.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.button.Button.prototype;
		ButtonBase.prototype = new Super();
	})();

	ButtonBase.prototype.initData = function() {
	};

	ButtonBase.prototype.getButton = function() {
		var button = this.button;
		var config = button.config;
		var $button = $('<a class="coos-btn "></a>');
		if (!co.isEmpty(config.icon)) {
			$button.append('<i class="fa ' + config.icon + '"></i>');
		}
		if (!co.isEmpty(config.icon) && !co.isEmpty(config.label)) {
			$button.append(' ');
		}
		if (!co.isEmpty(config.label)) {
			$button.append(config.label);
		}
		$button.attr('buttonid', button.buttonid);
		var color = config.color;
		var size = config.size;
		var negatecolor = config.negatecolor;
		if (co.isEmpty(color)) {
			color = "green";
		}
		if (co.isEmpty(size)) {
			size = "xs";
		}
		if (negatecolor) {
			$button.addClass('coos-one-button coos-bg-' + color);
		} else {
			$button.addClass('coos-one-button coos-' + color + ' coos-bd-' + color);
		}
		$button.addClass('coos-btn-' + size);
		if (this.button.config.useforwindow) {
			$button.addClass('coos-button-use-for-window');
		}
		if (!this.config.design) {

			if (config.defaulthide) {
				$button.hide();
			}
			if (config.defaultdisabled) {
				$button.attr('disabled', 'disabled');
				$button.addClass('coos-disabled');
			}
		}
		return $button;
	};

	ButtonBase.prototype.initContent = function() {
	};

	var ButtonBaseConfig = {
		name : "基础按钮",
		hasElement : true,
		columns : [ {
			text : "标签",
			name : "label"
		}, {
			text : "渲染规则",
			name : "viewrule"
		}, {

			text : "默认隐藏",
			name : "defaulthide",
			inputtype : "switch"
		}, {

			text : "默认禁用",
			name : "defaultdisabled",
			inputtype : "switch"
		}, {

			text : "用于窗口",
			name : "useforwindow",
			inputtype : "switch"
		}, {

			text : "绑定回车",
			name : "bindenter",
			inputtype : "switch"
		}, {
			text : "取反色",
			name : "negatecolor",
			inputtype : "switch"
		}, {
			text : "颜色",
			name : "color",
			inputtype : "select",
			usecolor : true
		}, {
			text : "左边距",
			name : "marginleft"
		}, {
			text : "右边距",
			name : "marginright"
		}, {
			text : "尺寸",
			name : "size",
			inputtype : "select",
			datas : [ {
				value : "xs",
				text : "小"
			}, {
				value : "sm",
				text : "中"
			} ]
		} ],
		element : {}
	};
	co.page.panel.layout.button.model.defind("BASE", ButtonBaseConfig, ButtonBase);
})(window, jQuery);
(function(window, jQuery) {
	co.page.event = {};
	co.page.event.bind = function(config) {
		config = config || {};
		var dataConfig = config.dataConfig || {};
		var requestmap = config.pageObject.config.requestmap || {};
		requestmap = jQuery.extend(true, {}, requestmap);
		dataConfig.request = requestmap;
		co.page.event.create(config);
	};
})(window, jQuery);
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
(function(window, jQuery) {
	function ThisEvent(config) {
		co.page.event.Event.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.Event.prototype;
		ThisEvent.prototype = new Super();
	})();

	ThisEvent.prototype.bindEvent = function() {
		var $input = this.$input || this.$view;
		var this_ = this;
		if ($input) {
			var last_value = $input.val();
			$input.on('change', function() {
				var this_value = this.value;
				if (last_value == this_value) {

				} else {
					this_.eventExecutes(this_value);
				}
				last_value = this_value;
			});
		}
	};

	var ThisEventConfig = {
		name : "值变更",
		columns : []
	};
	co.page.event.model.defind("CHANGE", ThisEventConfig, ThisEvent);
})(window, jQuery);
(function(window, jQuery) {
	function ThisEvent(config) {
		co.page.event.Event.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.Event.prototype;
		ThisEvent.prototype = new Super();
	})();

	ThisEvent.prototype.bindEvent = function() {
		var this_ = this;
		if (this.$view) {
			this.$view.on('click', function() {
				if (this_.event.config.needconfirm) {
					var confirmmessage = this_.event.config.confirmmessage || "确认执行本次操作？";
					co.box.confirm(confirmmessage, function() {
						this_.eventExecutes();
					});
				} else {
					this_.eventExecutes();
				}
			});
		}
	};

	var ThisEventConfig = {
		name : "点击",
		columns : [ {
			text : "需求确认",
			name : "needconfirm",
			inputtype : "switch"
		}, {
			text : "确认文案",
			name : "confirmmessage"
		} ]
	};
	co.page.event.model.defind("CLICK", ThisEventConfig, ThisEvent);
})(window, jQuery);
(function(window, jQuery) {
	co.page.event.execute = {};
	var Execute = function(config) {
		this.config = config;
		this.execute = config.execute;
		this.design = config.design;
		this.init(config);
		jQuery.extend(true, config.execute, this.execute);
	};
	Execute.prototype.init = function(config) {
		var execute = config.execute;
		var executeConfig = execute.config;
		if (executeConfig != null) {
			if (co.isString(executeConfig)) {
				executeConfig = JSON.parse(executeConfig);
			}
		}
		execute.config = executeConfig || {};
		this.initExecute();
	};

	Execute.prototype.initExecute = function() {
	};

	Execute.prototype.getData = function() {
		var executeData = {};
		this.execute.datas = this.execute.datas || [];

		for (var index = 0; index < this.execute.datas.length; index++) {
			var data = this.execute.datas[index];
			var setvaluename = data.setvaluename;
			var value = this.getDataValue(data);
			if (typeof (value) != "undefined") {
				if (!coos.isEmpty(setvaluename)) {
					executeData[setvaluename] = value;
				} else {

					if (co.isObject(value)) {
						if (coos.isArray(value)) {
							coos.box.info('值类型为集合，请设置值名称');
							throw new Error('setvaluename is null');
						} else {
							jQuery.extend(true, executeData, value);
						}
					} else {
						coos.box.info('未设置存值名称');
						throw new Error('setvaluename is null');
					}
				}
			}

			if (!coos.isEmpty(data.validaterule)) {

				var dataConfig = executeData;
				var validateresult = executeFunction(dataConfig, data.validaterule);
				if (validateresult) {
					if (!coos.isEmpty(data.validatesuccessmessage)) {
						coos.box.info(data.validatesuccessmessage);
						throw new Error(data.validatesuccessmessage);
					}
				} else {
					if (!coos.isEmpty(data.validateerrormessage)) {
						coos.box.info(data.validateerrormessage);
						throw new Error(data.validateerrormessage);
					}
				}
			}
		}
		return executeData;
	};
	function executeFunction(dataConfig, value) {

		var dataMapStr = "";
		for ( var name in dataConfig) {
			dataMapStr += 'var ' + name + ' = dataConfig.' + name + ' || {};';
			// console.log(dataMapStr)
		}
		var funstr = "function(){" + dataMapStr + " return " + value + "; }";
		return eval('(0,' + funstr + ')')();
	}
	Execute.prototype.getDataValue = function(executeData) {
		var dataConfig = this.config.dataConfig;
		var value = executeData.value;
		if (!co.isEmpty(executeData.layoutid)) {
			var layoutObjects = getLayoutObject(executeData.layoutid);
			var layoutData = {};
			var executeData = {};
			$(layoutObjects).each(function(index, layoutObject) {
				layoutData = layoutObject.getData(dataConfig);
				if (layoutObject.getExecuteData) {
					executeData = layoutObject.getExecuteData(dataConfig);
				}
			});
			dataConfig.layoutData = layoutData;
			dataConfig.executeData = executeData;
			if (co.isEmpty(value)) {
				if (typeof (layoutData) != "undefined") {
					return layoutData;
				} else if (typeof (executeData) != "undefined") {
					return executeData;
				} else {
					return null;
				}
			}
		}

		return executeFunction(dataConfig, value);
	};
	var EXECUTE_STATUS_MAP = {};
	Execute.prototype.runBefore = function() {
		EXECUTE_STATUS_MAP[this.execute.executeid] = 1;
	};
	Execute.prototype.runAfter = function() {
		EXECUTE_STATUS_MAP[this.execute.executeid] = 0;
	};
	Execute.prototype.validateRule = function() {
		if (!coos.isEmpty(this.execute.validaterule)) {
			var dataConfig = {};
			dataConfig.value = this.config.value;
			return executeFunction(dataConfig, this.execute.validaterule);
		}
		return true;
	};
	Execute.prototype.run = function() {
		if (EXECUTE_STATUS_MAP[this.execute.executeid] != null && EXECUTE_STATUS_MAP[this.execute.executeid] == 1) {
			return;
		}
		if (!this.validateRule()) {
			return;
		}
		this.runBefore();
		var this_ = this;
		try {
			this.eventExecute(function() {
				this_.runAfter();
			});
		} catch (e) {
			this.runAfter();
			throw e;
		}
	};
	Execute.prototype.eventExecute = function(executeCallback) {
	};

	Execute.prototype.eventChildExecutes = function() {
		this.config.event.executes = this.config.event.executes || [];

		for (var index = 0; index < this.config.event.executes.length; index++) {
			var execute = this.config.event.executes[index];
			if (!co.isEmpty(execute.parentid) && execute.parentid == this.execute.executeid) {
				var config = this.config;
				config.execute = execute;
				var executeObject = co.page.event.execute.create(config);
				executeObject.run();
			}
		}
	};

	co.page.event.execute.Execute = Execute;
})(window, jQuery);
(function(window, jQuery) {
	var ExecuteModelMap = {};
	co.page.event.execute.model = {};
	co.page.event.execute.model.defind = function(type, config, constructor) {
		config = config || {};
		if (ExecuteModelMap[type] == null) {
			config.type = type;
			ExecuteModelMap[type] = {};
			ExecuteModelMap[type].config = config;
			ExecuteModelMap[type].constructor = constructor;
		}
	};

	co.page.event.execute.model.get = function(type) {
		return ExecuteModelMap[type];
	};

	co.page.event.execute.model.list = function() {
		var list = [];
		for ( var type in ExecuteModelMap) {
			list[list.length] = ExecuteModelMap[type];
		}
		return list;
	};

	co.page.event.execute.model.create = function(type, config) {
		return new ExecuteModelMap[type].constructor(config);
	};

	co.page.event.execute.create = function(config) {
		var execute = config.execute;
		var type = execute.type;
		if (co.isEmpty(type)) {
			throw new Error("execute type is null");
		}
		if (co.page.event.execute.model.get(type) == null) {
			throw new Error(type + " execute is not defined");
		}
		return co.page.event.execute.model.create(type, config);
	};
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		var data = this.getData();
		if (!co.isEmpty(execute.config.layoutids)) {
			var layoutObjects = getLayoutObject(execute.config.layoutids);
			$(layoutObjects).each(function(index, layoutObject) {
				layoutObject.executeData = data;
				layoutObject.appendData(data, {});

			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "填充数据",
		columns : [ {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		}, {
			text : "元素",
			name : "elementids",
			inputtype : "selects",
			useelement : true
		}, {
			text : "按钮",
			name : "buttonids",
			inputtype : "selects",
			usebutton : true
		} ]
	};
	co.page.event.execute.model.defind("APPEND-DATA", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		window.history.back();
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "回退",
		columns : []
	};
	co.page.event.execute.model.defind("BACK", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		if (!co.isEmpty(execute.config.panelids)) {
			var panelObjects = getPanelObject(execute.config.panelids);
			$(panelObjects).each(function(index, panelObject) {
				panelObject.clear && panelObject.clear();
			});
		}
		if (!co.isEmpty(execute.config.layoutids)) {
			var objects = getLayoutObject(execute.config.layoutids);
			$(objects).each(function(index, object) {
				object.clear && object.clear();
			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "清理数据",
		columns : [ {
			text : "当前面板",
			name : "currentpanel",
			inputtype : "switch"
		}, {
			text : "当前布局",
			name : "currentlayout",
			inputtype : "switch"
		}, {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		} ]
	};
	co.page.event.execute.model.defind("CLEAR-DATA", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		if (!co.isEmpty(execute.config.panelids)) {
			var panelObjects = getPanelObject(execute.config.panelids);
			$(panelObjects).each(function(index, panelObject) {
				panelObject.disabled && panelObject.disabled();
			});
		}
		if (!co.isEmpty(execute.config.layoutids)) {
			var objects = getLayoutObject(execute.config.layoutids);
			$(objects).each(function(index, object) {
				object.disabled && object.disabled();
			});
		}
		if (!co.isEmpty(execute.config.elementids)) {
			$(execute.config.elementids.split(',')).each(function(index, elementid) {
				if (!co.isEmpty(elementid)) {
					var $object = $('[elementid="' + elementid + '"]');
					$object.addClass('coos-disabled');
				}
			});
		}
		if (!co.isEmpty(execute.config.buttonids)) {
			$(execute.config.buttonids.split(',')).each(function(index, buttonid) {
				if (!co.isEmpty(buttonid)) {
					var $object = $('[buttonid="' + buttonid + '"]');
					$object.attr('disabled', 'disabled');
					$object.addClass('coos-disabled');
				}
			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "禁用",
		columns : [ {
			text : "当前",
			name : "current",
			inputtype : "switch"
		}, {
			text : "当前行",
			name : "currentrow",
			inputtype : "switch"
		}, {
			text : "当前面板",
			name : "currentpanel",
			inputtype : "switch"
		}, {
			text : "当前布局",
			name : "currentlayout",
			inputtype : "switch"
		}, {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		}, {
			text : "元素",
			name : "elementids",
			inputtype : "selects",
			useelement : true
		}, {
			text : "按钮",
			name : "buttonids",
			inputtype : "selects",
			usebutton : true
		} ]
	};
	co.page.event.execute.model.defind("DISABLED", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		if (!co.isEmpty(execute.config.panelids)) {
			var panelObjects = getPanelObject(execute.config.panelids);
			$(panelObjects).each(function(index, panelObject) {
				panelObject.enabled && panelObject.enabled();
			});
		}
		if (!co.isEmpty(execute.config.layoutids)) {
			var objects = getLayoutObject(execute.config.layoutids);
			$(objects).each(function(index, object) {
				object.enabled && object.enabled();
			});
		}
		if (!co.isEmpty(execute.config.elementids)) {
			$(execute.config.elementids.split(',')).each(function(index, elementid) {
				if (!co.isEmpty(elementid)) {
					var $object = $('[elementid="' + elementid + '"]');
					$object.removeClass('coos-disabled');
				}
			});
		}
		if (!co.isEmpty(execute.config.buttonids)) {
			$(execute.config.buttonids.split(',')).each(function(index, buttonid) {
				if (!co.isEmpty(buttonid)) {
					var $object = $('[buttonid="' + buttonid + '"]');
					$object.removeAttr('disabled');
					$object.removeClass('coos-disabled');
				}
			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "启用",
		columns : [ {
			text : "当前",
			name : "current",
			inputtype : "switch"
		}, {
			text : "当前行",
			name : "currentrow",
			inputtype : "switch"
		}, {
			text : "当前面板",
			name : "currentpanel",
			inputtype : "switch"
		}, {
			text : "当前布局",
			name : "currentlayout",
			inputtype : "switch"
		}, {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		}, {
			text : "元素",
			name : "elementids",
			inputtype : "selects",
			useelement : true
		}, {
			text : "按钮",
			name : "buttonids",
			inputtype : "selects",
			usebutton : true
		} ]
	};
	co.page.event.execute.model.defind("ENABLED", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		if (!co.isEmpty(execute.config.panelids)) {
			var panelObjects = getPanelObject(execute.config.panelids);
			$(panelObjects).each(function(index, panelObject) {
				panelObject.hide && panelObject.hide();
			});
		}
		if (!co.isEmpty(execute.config.layoutids)) {
			var objects = getLayoutObject(execute.config.layoutids);
			$(objects).each(function(index, object) {
				object.hide && object.hide();
			});
		}
		if (!co.isEmpty(execute.config.elementids)) {
			$(execute.config.elementids.split(',')).each(function(index, elementid) {
				if (!co.isEmpty(elementid)) {
					var $object = $('[elementid="' + elementid + '"]');
					if ($object.closest('.coos-input-group').length > 0) {
						$object.closest('.coos-input-group').hide();
					} else {
						$object.hide();
					}
				}
			});
		}
		if (!co.isEmpty(execute.config.buttonids)) {
			$(execute.config.buttonids.split(',')).each(function(index, buttonid) {
				if (!co.isEmpty(buttonid)) {
					var $object = $('[buttonid="' + buttonid + '"]');
					$object.hide();
				}
			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "隐藏",
		columns : [ {
			text : "当前",
			name : "current",
			inputtype : "switch"
		}, {
			text : "当前行",
			name : "currentrow",
			inputtype : "switch"
		}, {
			text : "当前面板",
			name : "currentpanel",
			inputtype : "switch"
		}, {
			text : "当前布局",
			name : "currentlayout",
			inputtype : "switch"
		}, {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		}, {
			text : "元素",
			name : "elementids",
			inputtype : "selects",
			useelement : true
		}, {
			text : "按钮",
			name : "buttonids",
			inputtype : "selects",
			usebutton : true
		} ]
	};
	co.page.event.execute.model.defind("HIDE", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		var url = execute.config.url;
		var data = this.getData();
		if (!co.isEmpty(url)) {
			var opentype = execute.config.opentype;
			opentype = opentype || "currentpage";
			if (opentype == 'currentpage') {
				co.toAction({
					data : data,
					action : url
				});
			} else if (opentype == 'openpage') {
				co.openUrl(url, data);
			}
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "打开连接",
		columns : [ {
			text : "连接",
			name : "url"
		}, {
			text : "打开类型",
			name : "opentype",
			inputtype : "select",
			datas : [ {
				text : '当前页面',
				value : 'currentpage'
			}, {
				text : '新标签页',
				value : 'openpage'
			}, {
				text : '窗口',
				value : 'window'
			} ]
		}, ]
	};
	co.page.event.execute.model.defind("OPEN-URL", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		this.doExecute(executeCallback, {});
	};

	ThisExecute.prototype.doExecute = function(executeCallback, paramData) {
		var execute = this.execute;
		if (execute.operate) {
			var operate = execute.operate;
			var servletpath = operate.servletpath;
			var data = this.getData() || {};
			for ( var key in data) {
				if (coos.isObject(data[key])) {
					data[key] = JSON.stringify(data[key]);
				}
			}
			jQuery.extend(true, data, paramData);
			var this_ = this;
			if (operate.type == 'TO_PAGE') {
				co.toAction({
					data : data,
					action : servletpath
				});
				executeCallback && executeCallback();
				this_.eventChildExecutes();
			} else if (operate.type == 'DO_POST') {
				co.POST(servletpath, data, 'json', function(o) {
					var status = o.data;
					var promptmessage = "";
					if (status.errcode == 0) {
						promptmessage = execute.config.successprompt;
						if (co.isEmpty(promptmessage)) {
							promptmessage = "操作成功！";
						}

						if (!execute.config.successneedprompt) {
							promptmessage = null;
						}
					} else {
						if (status.errcode == 20001) {
							co.box.confirm(status.errmsg + "<br/>点击确认，强制删除！", function() {
								this_.doExecute(executeCallback, {
									forciblyremove : true
								});
							}, function() {
								executeCallback && executeCallback();
							});
							return;
						}
						promptmessage = execute.config.errorprompt;
						if (co.isEmpty(promptmessage)) {
							promptmessage = status.errmsg;
						}
						if (!execute.config.errorneedprompt) {
							promptmessage = null;
						}
					}
					if (!co.isEmpty(promptmessage)) {
						if (co.isEmpty(execute.config.boxtype) || execute.config.boxtype == "alert") {
							co.box.alert(promptmessage, function() {
								executeCallback && executeCallback();
								this_.eventChildExecutes();
							});
						} else if (execute.config.boxtype == "info") {
							co.box.info(promptmessage);
							executeCallback && executeCallback();
							this_.eventChildExecutes();
						}
					} else {
						executeCallback && executeCallback();
						this_.eventChildExecutes();
					}
				});
			}
		} else {
			executeCallback && executeCallback();
		}
	};

	var ThisExecuteConfig = {
		name : "执行操作",
		columns : [ {
			text : "操作",
			name : "operateid",
			useoperate : true
		}, {
			text : "成功提示",
			name : "successneedprompt",
			inputtype : "switch"
		}, {
			text : "错误提示",
			name : "errorneedprompt",
			inputtype : "switch"
		}, {
			text : "提示类型",
			name : "boxtype",
			inputtype : "select",
			datas : [ {
				text : '弹框',
				value : 'alert'
			}, {
				text : '提示',
				value : 'info'
			} ]
		}, {
			text : "成功提示",
			name : "successprompt"
		}, {
			text : "错误提示",
			name : "errorprompt"
		} ]
	};
	co.page.event.execute.model.defind("OPERATE", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		if (!co.isEmpty(execute.config.panelids)) {
			var panelObjects = getPanelObject(execute.config.panelids);
			$(panelObjects).each(function(index, panelObject) {
				panelObject.loadData();
			});
		}
		if (!co.isEmpty(execute.config.layoutids)) {
			var objects = getLayoutObject(execute.config.layoutids);
			$(objects).each(function(index, object) {
				object.loadData();
			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "刷新",
		columns : [ {
			text : "当前页面",
			name : "currentpage",
			inputtype : "switch"
		}, {
			text : "当前面板",
			name : "currentpanel",
			inputtype : "switch"
		}, {
			text : "当前布局",
			name : "currentlayout",
			inputtype : "switch"
		}, {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		} ]
	};
	co.page.event.execute.model.defind("REFRESH", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		if (execute.config.currentrow) {
			if (this.config.$row) {
				if (this.config.layoutObject) {
					this.config.layoutObject.removeRow(this.config.$row);
				} else {

					this.config.$row.remove();
				}
			}
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "移除",
		columns : [ {
			text : "当前",
			name : "current",
			inputtype : "switch"
		}, {
			text : "当前行",
			name : "currentrow",
			inputtype : "switch"
		}, {
			text : "当前面板",
			name : "currentpanel",
			inputtype : "switch"
		}, {
			text : "当前布局",
			name : "currentlayout",
			inputtype : "switch"
		}, {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		}, {
			text : "元素",
			name : "elementids",
			inputtype : "selects",
			useelement : true
		}, {
			text : "按钮",
			name : "buttonids",
			inputtype : "selects",
			usebutton : true
		} ]
	};
	co.page.event.execute.model.defind("REMOVE", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		this.doExecute(executeCallback, {});
	};

	ThisExecute.prototype.doExecute = function(executeCallback, paramData) {
		var execute = this.execute;
		var serviceid = execute.config.serviceid;
		var this_ = this;
		if (!co.isEmpty(serviceid)) {
			var data = this.getData();
			for ( var key in data) {
				if (coos.isObject(data[key])) {
					data[key] = JSON.stringify(data[key]);
				}
			}
			jQuery.extend(true, data, paramData);
			var config = {};
			config.id = serviceid;
			config.data = data || {};
			config.callback = function(status) {
				var promptmessage = "";
				var resultMap = {};
				if (status.errcode == 0) {
					resultMap = status.result;
					promptmessage = execute.config.successprompt;
					if (co.isEmpty(promptmessage)) {
						promptmessage = "操作成功！";
					}
					if (!execute.config.successneedprompt) {
						promptmessage = null;
					}
				} else {
					if (status.errcode == 20001) {
						co.box.confirm(status.errmsg + "<br/>点击确认，强制删除！", function() {
							this_.doExecute(executeCallback, {
								forciblyremove : true
							});
						}, function() {
							executeCallback && executeCallback();
						});
						return;
					}
					promptmessage = execute.config.errorprompt;
					if (co.isEmpty(promptmessage)) {
						promptmessage = status.errmsg;
					}
					if (!execute.config.errorneedprompt) {
						promptmessage = null;
					}
				}
				var callback = function() {
					executeCallback && executeCallback();
					if (status.errcode == 0) {

						if (!co.isEmpty(execute.config.layoutids)) {
							var layoutObjects = getLayoutObject(execute.config.layoutids);
							$(layoutObjects).each(function(index, layoutObject) {
								layoutObject.executeData = data;
								var servicemodelname = layoutObject.layout.servicemodelname;
								if (co.isEmpty(layoutObject.layout.servicemodelname)) {
									for ( var name in resultMap) {
										servicemodelname = name;
										break;
									}
								}
								var result = resultMap[servicemodelname];
								layoutObject.processResult({
									resultMap : resultMap,
									result : result,
									isTop : true
								});
								layoutObject.loadDataAfter && layoutObject.loadDataAfter(layoutObject, resultMap);
							});
						}
						this_.eventChildExecutes();
					}
				};
				if (!co.isEmpty(promptmessage)) {
					if (co.isEmpty(execute.config.boxtype) || execute.config.boxtype == "alert") {
						co.box.alert(promptmessage, function() {
							callback();
						});
					} else if (execute.config.boxtype == "info") {
						co.box.info(promptmessage);
						callback();
					}
				} else {
					callback();

				}
			}
			co.executeService(config);

		} else {
			executeCallback && executeCallback();
			this_.eventChildExecutes();
		}
	};

	var ThisExecuteConfig = {
		name : "执行服务",
		columns : [ {
			text : "服务",
			name : "serviceid",
			useservice : true
		}, {
			text : "成功提示",
			name : "successneedprompt",
			inputtype : "switch"
		}, {
			text : "错误提示",
			name : "errorneedprompt",
			inputtype : "switch"
		}, {
			text : "提示类型",
			name : "boxtype",
			inputtype : "select",
			datas : [ {
				text : '弹框',
				value : 'alert'
			}, {
				text : '提示',
				value : 'info'
			} ]
		}, {
			text : "成功提示",
			name : "successprompt"
		}, {
			text : "错误提示",
			name : "errorprompt"
		}, {
			text : "填充布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		} ]
	};
	co.page.event.execute.model.defind("SERVICE", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		if (!co.isEmpty(execute.config.panelids)) {
			var panelObjects = getPanelObject(execute.config.panelids);
			$(panelObjects).each(function(index, panelObject) {
				panelObject.show && panelObject.show();
			});
		}
		if (!co.isEmpty(execute.config.layoutids)) {
			var objects = getLayoutObject(execute.config.layoutids);
			$(objects).each(function(index, object) {
				object.show && object.show();
			});
		}
		if (!co.isEmpty(execute.config.elementids)) {
			$(execute.config.elementids.split(',')).each(function(index, elementid) {
				if (!co.isEmpty(elementid)) {
					var $object = $('[elementid="' + elementid + '"]');
					if ($object.closest('.coos-input-group').length > 0) {
						$object.closest('.coos-input-group').show();
					} else {
						$object.show();
					}
				}
			});
		}
		if (!co.isEmpty(execute.config.buttonids)) {
			$(execute.config.buttonids.split(',')).each(function(index, buttonid) {
				if (!co.isEmpty(buttonid)) {
					var $object = $('[buttonid="' + buttonid + '"]');
					$object.show();
				}
			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "显示",
		columns : [ {
			text : "当前",
			name : "current",
			inputtype : "switch"
		}, {
			text : "当前行",
			name : "currentrow",
			inputtype : "switch"
		}, {
			text : "当前面板",
			name : "currentpanel",
			inputtype : "switch"
		}, {
			text : "当前布局",
			name : "currentlayout",
			inputtype : "switch"
		}, {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		}, {
			text : "元素",
			name : "elementids",
			inputtype : "selects",
			useelement : true
		}, {
			text : "按钮",
			name : "buttonids",
			inputtype : "selects",
			usebutton : true
		} ]
	};
	co.page.event.execute.model.defind("SHOW", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		if (!co.isEmpty(execute.config.panelids)) {
			var panelObjects = getPanelObject(execute.config.panelids);
			$(panelObjects).each(function(index, panelObject) {
				panelObject.switchVisibility();
			});
		}

		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "切换可见性",
		columns : [ {
			text : "当前",
			name : "current",
			inputtype : "switch"
		}, {
			text : "当前行",
			name : "currentrow",
			inputtype : "switch"
		}, {
			text : "当前面板",
			name : "currentpanel",
			inputtype : "switch"
		}, {
			text : "当前布局",
			name : "currentlayout",
			inputtype : "switch"
		}, {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		}, {
			text : "元素",
			name : "elementids",
			inputtype : "selects",
			useelement : true
		}, {
			text : "按钮",
			name : "buttonids",
			inputtype : "selects",
			usebutton : true
		} ]
	};
	co.page.event.execute.model.defind("SWITCH-VISIBILITY", ThisExecuteConfig, ThisExecute);
})(window, jQuery);
(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		if (execute.config.eventtype) {
			if (execute.config.eventtype == 'search') {
				if (!co.isEmpty(execute.config.layoutids)) {
					var objects = getLayoutObject(execute.config.layoutids);
					$(objects).each(function(index, object) {
						object.search();
					});
				}
			}
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "触发事件",
		columns : [ {
			text : "事件类型",
			name : "eventtype",
			inputtype : "select",
			cannull : false,
			datas : [ {
				value : 'click',
				text : '点击'
			}, {
				value : 'search',
				text : '搜索'
			} ]
		}, {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		}, {
			text : "元素",
			name : "elementids",
			inputtype : "selects",
			useelement : true
		}, {
			text : "按钮",
			name : "buttonids",
			inputtype : "selects",
			usebutton : true
		} ]
	};
	co.page.event.execute.model.defind("TRIGGER-EVENT", ThisExecuteConfig, ThisExecute);
})(window, jQuery);

})(window, jQuery, coos);