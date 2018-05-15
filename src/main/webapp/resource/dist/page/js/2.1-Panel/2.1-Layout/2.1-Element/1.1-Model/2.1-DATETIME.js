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

	ThisElement.prototype.getValue = function(value) {
		return co.date.formatDatetime(this.getFormatValue(value));
	};

	ThisElement.prototype.getTextValue = function(value) {
		return co.date.formatDatetime(this.getFormatValue(value));
	};

	ThisElement.prototype.initInput = function() {
	};
	var ThisElementConfig = {
		name : "日期时间",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("DATETIME", ThisElementConfig, ThisElement);
})(window, jQuery);