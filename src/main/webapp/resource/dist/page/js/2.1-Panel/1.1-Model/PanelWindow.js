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