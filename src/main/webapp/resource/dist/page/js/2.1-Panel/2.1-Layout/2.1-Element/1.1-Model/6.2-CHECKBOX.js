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
	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initContent = function() {
	};

	var ThisElementConfig = {
		name : "复选框",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("CHECKBOX", ThisElementConfig, ThisElement);
})(window, jQuery, coos);