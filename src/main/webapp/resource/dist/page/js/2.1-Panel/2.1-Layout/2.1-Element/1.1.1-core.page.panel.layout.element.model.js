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
		$(baseColumns).each(function(index, column) {
			if (!hasColumn(config, column)) {
				config.columns[config.columns.length] = column;
			}
		});
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
		$(inputColumns).each(function(index, column) {
			if (!hasColumn(config, column)) {
				config.columns[config.columns.length] = column;
			}
		});
	};
	co.page.panel.layout.element.model.appendTagColumns = function(config) {
		$(tagColumns).each(function(index, column) {
			if (!hasColumn(config, column)) {
				config.columns[config.columns.length] = column;
			}
		});
	};
	co.page.panel.layout.element.model.appendValidateColumns = function(config) {
		$(validateColumns).each(function(index, column) {
			if (!hasColumn(config, column)) {
				config.columns[config.columns.length] = column;
			}
		});
	};
	var baseColumns = [ {
		text : "标签",
		name : "label"
	}, {
		text : "默认值",
		name : "defaultvalue"
	}, {
		text : "显示",
		name : "display",
		inputtype : "switch"
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
			value : "TEXT",
			text : "文本"
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