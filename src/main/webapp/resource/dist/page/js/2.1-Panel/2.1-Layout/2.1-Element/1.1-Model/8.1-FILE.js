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
		this.$input.addClass('inputtype-file');
		this.$input.attr('coos-file-type', 'file');
	};

	var ThisElementConfig = {
		name : "文件",
		columns : []
	};
	co.page.panel.layout.element.model.defind("FILE", ThisElementConfig, ThisElement);
})(window, jQuery);