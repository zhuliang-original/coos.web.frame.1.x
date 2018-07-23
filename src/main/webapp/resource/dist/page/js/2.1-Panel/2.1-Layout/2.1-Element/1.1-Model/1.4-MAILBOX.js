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
		$input.attr('value-type', "mailbox");
	};

	var ThisElementConfig = {
		name : "邮箱",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("MAILBOX", ThisElementConfig, ThisElement);
})(window, jQuery);