(function(window, jQuery) {
	var html = '<div class=" coos-form "><div class="coos-hide-element coos-element-container"></div><div class="coos-show-element coos-element-container"></div><div class="coos-layout-container "></div><div class="coos-button-container pdt-10 pdlr-5 coos-form-button-container"></div></div>';

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
		this.$content.addClass('mglr--10');
	};

	ThisLayout.prototype.getOneView = function(config) {
		var $view = $(html);
		var $buttonContent = $view.find('.coos-button-container');
		if (this.layout.config.displayback) {
			var $backBtn = $('<div class="doBackBtn coos-btn coos-btn-sm coos-bg-grey mgr-5"> 取消</div>');
			$buttonContent.append($backBtn);
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