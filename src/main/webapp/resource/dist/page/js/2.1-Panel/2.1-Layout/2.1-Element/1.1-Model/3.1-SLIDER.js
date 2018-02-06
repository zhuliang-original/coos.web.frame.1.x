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

	ThisElement.prototype.initContent = function() {
		this.$input.val(0);
	};

	var ThisElementConfig = {
		name : "进度条",
		columns : []
	};
	co.page.panel.layout.element.model.defind("SLIDER", ThisElementConfig, ThisElement);
})(window, jQuery);