(function(window, jQuery) {
	function ThisExecute(config) {
		co.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		var this_ = this;
		if (!co.isEmpty(execute.config.elementids)) {
			$(execute.config.elementids.split(',')).each(function(index, elementid) {
				if (!co.isEmpty(elementid)) {
					this_.changeElementAttribute(elementid, execute.config);
				}
			});
		}
		if (!co.isEmpty(execute.config.buttonids)) {
			$(execute.config.buttonids.split(',')).each(function(index, buttonid) {
				if (!co.isEmpty(buttonid)) {

					this_.changeButtonAttribute(buttonid, execute.config);
				}
			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	ThisExecute.prototype.changeElementAttribute = function(elementid, configData) {
		var $object = $('[elementid="' + elementid + '"]');

	};

	ThisExecute.prototype.changeButtonAttribute = function(buttonid, configData) {
		var $object = $('[buttonid="' + buttonid + '"]');

		if ($object && configData) {
			if (!coos.isEmpty(configData.label)) {
				$object.html(configData.label);
			}
		}
	};

	var ThisExecuteConfig = {
		name : "修改属性",
		columns : [ {
			text : "元素",
			name : "elementids",
			inputtype : "selects",
			useelement : true
		}, {
			text : "按钮",
			name : "buttonids",
			inputtype : "selects",
			usebutton : true
		}, {
			text : "还原设置",
			name : "revert",
			inputtype : "switch"
		}, {
			text : "设置标签",
			name : "label"
		}, {
			text : "是否只读",
			name : "readonly",
			inputtype : "switch"
		}, {
			text : "是否可空",
			name : "cannull",
			inputtype : "switch"
		} ]
	};
	co.page.event.execute.model.defind("CHANGE-ATTRIBUTE-EVENT", ThisExecuteConfig, ThisExecute);
})(window, jQuery);