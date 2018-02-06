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

	ThisElement.prototype.getInput = function() {
		if (this.forsearch) {
			return $("<select ></select>");
		}
		return $('<input type="text"/>');
	};

	ThisElement.prototype.initContent = function() {
	};

	var ThisElementConfig = {
		name : "单选框",
		columns : []
	};
	co.page.panel.layout.element.model.defind("RADIO", ThisElementConfig, ThisElement);
})(window, jQuery);