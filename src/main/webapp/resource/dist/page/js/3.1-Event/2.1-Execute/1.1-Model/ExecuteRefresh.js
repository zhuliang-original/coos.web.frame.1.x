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
				panelObject.loadData();
			});
		}
		if (!co.isEmpty(execute.config.layoutids)) {
			var objects = getLayoutObject(execute.config.layoutids);
			$(objects).each(function(index, object) {
				object.loadData();
			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "刷新",
		columns : [ {
			text : "当前页面",
			name : "currentpage",
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
		} ]
	};
	co.page.event.execute.model.defind("REFRESH", ThisExecuteConfig, ThisExecute);
})(window, jQuery);