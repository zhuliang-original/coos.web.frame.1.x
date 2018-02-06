(function(window, jQuery, coos) {
	function ThisElement(config) {
		coos.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = coos.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.getValue = function(value) {
		return coos.formatDatetime(value);
	};

	ThisElement.prototype.initContent = function() {
	};
	coos.formatDatetime
	var ThisElementConfig = {
		name : "日期时间",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("DATETIME", ThisElementConfig, ThisElement);
})(window, jQuery, coos);