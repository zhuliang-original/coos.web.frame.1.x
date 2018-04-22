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
		$input.val(0);
	};

	var ThisElementConfig = {
		name : "进度条",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("SLIDER", ThisElementConfig, ThisElement);
})(window, jQuery);