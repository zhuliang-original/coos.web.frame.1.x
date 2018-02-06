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
	};

	ThisElement.prototype.appendTdValue = function(value) {
		this.$input.empty();
		var $img = $("<img class='coos-need-init-image' style=\"width: 40px;\" />");
		var urls = coos.getImageFullUrls(value);
		$img.attr('coos-path', urls[0]);
		this.$input.append($img);
		this.$input.css('line-height', 0);
	};

	var ThisElementConfig = {
		name : "图片",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("IMAGE", ThisElementConfig, ThisElement);
})(window, jQuery, coos);