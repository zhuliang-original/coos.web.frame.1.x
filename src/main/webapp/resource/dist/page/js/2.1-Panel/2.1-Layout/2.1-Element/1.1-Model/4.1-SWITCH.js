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

	ThisElement.prototype.getInput = function() {
		if (this.forsearch) {
			return $("<select ></select>");
		}
		return $("<input type=\"checkbox\" />");
	};
	ThisElement.prototype.getSelectDatas = function() {
		return [ {
			text : '是',
			value : '1'
		}, {
			text : '否',
			value : '0'
		} ];
	};

	ThisElement.prototype.textUseSelectData = function() {
		return true;
	};

	ThisElement.prototype.initContent = function() {
	};

	var ThisElementConfig = {
		name : "开关",
		columns : []
	};
	coos.page.panel.layout.element.model.defind("SWITCH", ThisElementConfig, ThisElement);
})(window, jQuery, coos);