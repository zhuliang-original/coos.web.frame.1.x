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
		text : "格式化值",
		name : "formatvalue"
	}, {
		text : "显示",
		name : "display",
		inputtype : "switch"
	}, {
		text : "点击排序",
		name : "clicktosort",
		inputtype : "switch"
	}, {
		text : "帮助信息",
		name : "helpinfo"
	} ];
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
		text : "验证规则",
		name : "validaterule",
		columnsize: 12,
		labelsize : 2
	}, {
		text : "验证错误信息",
		name : "validateruleerrmsg",
		columnsize: 12,
		labelsize : 2
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