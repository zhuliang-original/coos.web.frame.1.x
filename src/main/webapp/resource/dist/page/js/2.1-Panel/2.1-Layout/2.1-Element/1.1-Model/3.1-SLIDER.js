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

	ThisElement.prototype.initContent = function() {
		this.$input.val(0);
	};

	var ThisElementConfig = {
		name : "进度条",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("SLIDER", ThisElementConfig, ThisElement);
})(window, jQuery, coos);