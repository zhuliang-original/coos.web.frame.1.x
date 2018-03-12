(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.getInput = function() {
		var $view = $('<h1 class="coos-col-12">h1文案区域</h1>');
		if (!coos.isEmpty(this.element.config.addclass)) {
			$view.addClass(this.element.config.addclass);
		}
		if (!coos.isEmpty(this.element.config.content)) {
			$view.html(this.element.config.content);
		}
		this.$h_view = $view;
		return $view;
	};

	ThisElement.prototype.appendFormValue = function(value) {
		if (coos.isTrue(this.element.config.displayvalue)) {
			this.$h_view.html(this.getTextValue(value) || "");
		}
	};

	var ThisElementConfig = {
		name : "h1~h6",
		columns : [ {
			text : "显示值信息",
			name : "displayvalue",
			inputtype : "switch"
		}, {
			text : "添加类样式",
			name : "addclass"
		}, {
			text : "样式",
			name : "style"
		}, {
			text : "内容",
			name : "content",
			inputtype : "textarea"
		} ]
	};
	co.page.panel.layout.element.model.defind("ELEMENT-H", ThisElementConfig, ThisElement);
})(window, jQuery);