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
		this.$input.addClass('input-rule-file');
		this.$input.attr('file-type', 'audio');
	};

	var ThisElementConfig = {
		name : "音频",
		columns : []
	};
	co.page.panel.layout.element.model.defind("AUDIO", ThisElementConfig, ThisElement);
})(window, jQuery);