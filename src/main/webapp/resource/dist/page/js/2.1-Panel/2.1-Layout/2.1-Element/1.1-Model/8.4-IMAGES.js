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
		this.$input.addClass('inputtype-file');
		this.$input.attr('coos-file-type', 'image');
		this.$input.attr('file-count', '5');
	};

	var ThisElementConfig = {
		name : "多图片",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("IMAGES", ThisElementConfig, ThisElement);
})(window, jQuery, coos);