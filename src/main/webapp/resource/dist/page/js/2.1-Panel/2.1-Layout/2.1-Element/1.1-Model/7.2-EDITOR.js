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

	ThisElement.prototype.getInput = function() {
		return $("<textarea ></textarea>");
	};

	ThisElement.prototype.initContent = function() {
	};

	var ThisElementConfig = {
		name : "编辑器",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("EDITOR", ThisElementConfig, ThisElement);
})(window, jQuery, coos);