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
		if (!coos.isEmpty(execute.config.label)) {

		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
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
			text : "标签",
			name : "label"
		} ]
	};
	co.page.event.execute.model.defind("CHANGE-ATTRIBUTE-EVENT", ThisExecuteConfig, ThisExecute);
})(window, jQuery);