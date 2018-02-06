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
		this.$input.attr('iscardid', true);
	};

	var ThisElementConfig = {
		name : "身份证",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("CARDID", ThisElementConfig, ThisElement);
})(window, jQuery, coos);