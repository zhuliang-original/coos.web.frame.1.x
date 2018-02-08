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