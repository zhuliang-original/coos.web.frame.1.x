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
		if (!co.isEmpty(execute.config.panelids)) {
			var panelObjects = getPanelObject(execute.config.panelids);
			$(panelObjects).each(function(index, panelObject) {
				panelObject.switchVisibility();
			});
		}

		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "切换可见性",
		columns : [ {
			text : "当前",
			name : "current",
			inputtype : "switch"
		}, {
			text : "当前行",
			name : "currentrow",
			inputtype : "switch"
		}, {
			text : "当前面板",
			name : "currentpanel",
			inputtype : "switch"
		}, {
			text : "当前布局",
			name : "currentlayout",
			inputtype : "switch"
		}, {
			text : "面板",
			name : "panelids",
			inputtype : "selects",
			usepanel : true
		}, {
			text : "布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		}, {
			text : "元素",
			name : "elementids",
			inputtype : "selects",
			useelement : true
		}, {
			text : "按钮",
			name : "buttonids",
			inputtype : "selects",
			usebutton : true
		} ]
	};
	co.page.event.execute.model.defind("SWITCH-VISIBILITY", ThisExecuteConfig, ThisExecute);
})(window, jQuery);