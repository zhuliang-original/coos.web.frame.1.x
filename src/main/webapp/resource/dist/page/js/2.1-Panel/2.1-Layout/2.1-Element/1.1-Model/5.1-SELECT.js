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

	ThisElement.prototype.getInput = function() {
		return $("<select ></select>");
	};
	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initContent = function() {
	};

	var ThisElementConfig = {
		name : "下拉框",
		columns : [ {
			text : "级联元素",
			name : "relationname"
		} ]
	};
	co.page.panel.layout.element.model.defind("SELECT", ThisElementConfig, ThisElement);
})(window, jQuery);