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
		this.$input.addClass('input-rule-file-video');
	};

	var ThisElementConfig = {
		name : "视频",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("VIDEO", ThisElementConfig, ThisElement);
})(window, jQuery);