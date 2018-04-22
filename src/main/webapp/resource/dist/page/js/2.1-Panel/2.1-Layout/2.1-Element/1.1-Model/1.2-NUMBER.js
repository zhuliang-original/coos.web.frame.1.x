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

	ThisElement.prototype.initInput = function($input) {
		$input.attr('isinteger', true);
	};

	var ThisElementConfig = {
		name : "数字",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("NUMBER", ThisElementConfig, ThisElement);
})(window, jQuery);