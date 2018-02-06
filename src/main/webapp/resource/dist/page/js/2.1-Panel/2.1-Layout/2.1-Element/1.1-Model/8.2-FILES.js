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
		this.$input.attr('coos-file-type', 'file');
		this.$input.attr('file-count', '5');
	};

	var ThisElementConfig = {
		name : "多文件",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("FILES", ThisElementConfig, ThisElement);
})(window, jQuery, coos);