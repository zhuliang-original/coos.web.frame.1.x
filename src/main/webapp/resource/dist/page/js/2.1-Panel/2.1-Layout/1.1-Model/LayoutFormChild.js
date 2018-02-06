(function(window, jQuery, coos) {
	var html = '<div class=" coos-child-form-list pdlr-5"><div class="coos-child-form "><div class="coos-form coos-form-model">';
	html += '<div class=" coos-form-header"><h3 class="coos-form-title"></h3><div class="coos-form-button-group"><div class=" coos-form-button coos-form-minus-button"><i class="fa fa-minus"></i></div><div class=" coos-form-button coos-form-delete-button"><i class="fa fa-remove"></i></div></div></div>';
	html += '<div class="coos-form-content coos-row"><form class=" "><div class="coos-hide-element coos-element-container"></div><div class="coos-show-element coos-element-container"></div><div class="coos-layout-container "></div></form></div>';
	html += '</div><div class="coos-child-form-footer"><div class="coos-form-add-child-button" need-init-one="true">添加</div></div>';
	html += '</div></div>';
	function ThisLayout(config) {
		coos.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = coos.page.panel.layout.Layout.prototype;
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
			var models = coos.page.panel.layout.element.model.list();
			$(models).each(function(index, model) {
				coos.page.panel.layout.element.model.appendBaseColumns(model.config);
				coos.page.panel.layout.element.model.appendInputColumns(model.config);
				coos.page.panel.layout.element.model.appendTagColumns(model.config);
				coos.page.panel.layout.element.model.appendValidateColumns(model.config);
			});
			return models;
		}
	};
	coos.page.panel.layout.model.defind("FORM_CHILD", ThisLayoutConfig, ThisLayout);
})(window, jQuery, coos);