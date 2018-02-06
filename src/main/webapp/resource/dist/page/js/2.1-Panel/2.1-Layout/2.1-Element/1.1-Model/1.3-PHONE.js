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
		this.$input.attr('isphone', true);
	};

	var ThisElementConfig = {
		name : "手机号",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("PHONE", ThisElementConfig, ThisElement);
})(window, jQuery, coos);