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
		this.$input.attr('ismailbox', true);
	};

	var ThisElementConfig = {
		name : "邮箱",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("MAILBOX", ThisElementConfig, ThisElement);
})(window, jQuery, coos);