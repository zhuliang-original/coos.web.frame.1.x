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
		$input.attr('isphone', true);
	};

	var ThisElementConfig = {
		name : "手机号",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("PHONE", ThisElementConfig, ThisElement);
})(window, jQuery);