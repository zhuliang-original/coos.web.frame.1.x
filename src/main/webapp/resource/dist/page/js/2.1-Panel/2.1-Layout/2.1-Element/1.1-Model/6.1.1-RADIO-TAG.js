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

	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initContent = function() {
	};

	var ThisElementConfig = {
		name : "单选标签",
		forInput : true,
		columns : [ {
			text : "级联元素",
			name : "relationname"
		} ]
	};
	co.page.panel.layout.element.model.defind("RADIO-TAG", ThisElementConfig, ThisElement);
})(window, jQuery);