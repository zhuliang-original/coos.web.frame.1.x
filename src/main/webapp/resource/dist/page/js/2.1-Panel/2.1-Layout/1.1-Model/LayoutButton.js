(function(window, jQuery, coos) {
	var html = '<div class=" "><div class="coos-button-container  "></div></div>';

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
			$view.find('.coos-button-container').addClass('coos-button-group');
			if (this.layout.config.alignment) {
				$view.find('.coos-button-container').addClass('float-' + this.layout.config.alignment);
			}
		} else {
			if (this.layout.config.alignment) {
				$view.find('.coos-button-container').addClass('text-' + this.layout.config.alignment);
			}
			$view.find('.coos-button-container').addClass('coos-button-group-' + this.layout.config.alignment);
		}
		$view.find('.coos-button-container').addClass('coos-button-group-' + this.layout.config.size);

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
	coos.page.panel.layout.model.defind("BUTTON", ThisLayoutConfig, ThisLayout);
})(window, jQuery, coos);