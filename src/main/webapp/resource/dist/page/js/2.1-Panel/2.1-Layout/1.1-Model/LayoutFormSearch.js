(function(window, jQuery) {
	var html = '<form class="coos-form "><div class="coos-hide-element coos-element-container"></div><div class="coos-show-element coos-element-container"></div><div class="coos-button-container pdt-10 pdlr-10 text-right coos-search-form-button-container"></div></form>';

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
		this.$content.addClass('mglr--10');
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