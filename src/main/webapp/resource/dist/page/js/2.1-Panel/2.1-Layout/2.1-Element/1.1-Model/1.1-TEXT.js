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

	ThisElement.prototype.initContent = function($input) {
	};

	var ThisElementConfig = {
		name : "文本",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("TEXT", ThisElementConfig, ThisElement);
})(window, jQuery);