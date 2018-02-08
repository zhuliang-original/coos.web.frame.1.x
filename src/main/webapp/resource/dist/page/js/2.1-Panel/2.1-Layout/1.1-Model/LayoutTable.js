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
		if (this.layout.config.displayserialnumber) {
			$view.append('<td class="coos-table-index text-center">' + (config.index + 1) + '</td>');
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
			var $title = $('<div class="pdtb-5">' + this.layout.title + '</div>')
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

	ThisLayout.prototype.getData = function($button, button, data) {

		if (this.layout.config.isformtable) {

			var trData = co.form.validate($button.closest('tr'));
			if (trData) {
				for ( var n in data) {
					if (trData[n] == null) {
						trData[n] = data[n];
					}
				}
			}
			return trData;
		} else {
			return data;
		}
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