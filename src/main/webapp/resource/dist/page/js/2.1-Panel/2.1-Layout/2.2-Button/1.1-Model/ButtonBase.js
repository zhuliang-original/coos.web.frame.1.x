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