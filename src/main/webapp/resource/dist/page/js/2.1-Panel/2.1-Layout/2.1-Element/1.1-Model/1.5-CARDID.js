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
		this.$input.attr('iscardid', true);
	};

	var ThisElementConfig = {
		name : "身份证",
		columns : []
	};
	co.page.panel.layout.element.model.defind("CARDID", ThisElementConfig, ThisElement);
})(window, jQuery);