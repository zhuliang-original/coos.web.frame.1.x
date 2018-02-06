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
		return $("<textarea ></textarea>");
	};

	ThisElement.prototype.initContent = function() {
	};

	var ThisElementConfig = {
		name : "编辑器",
		columns : []
	};
	co.page.panel.layout.element.model.defind("EDITOR", ThisElementConfig, ThisElement);
})(window, jQuery);