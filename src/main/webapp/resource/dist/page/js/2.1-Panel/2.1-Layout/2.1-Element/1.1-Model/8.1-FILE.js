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

		if (this.$input[0].tagName == 'INPUT') {
			this.$input.addClass('input-rule-file');
			this.$input.attr('file-count', '1');
		}

	};

	var ThisElementConfig = {
		name : "文件",
		forInput : true,
		columns : []
	};
	co.page.panel.layout.element.model.defind("FILE", ThisElementConfig, ThisElement);
})(window, jQuery);