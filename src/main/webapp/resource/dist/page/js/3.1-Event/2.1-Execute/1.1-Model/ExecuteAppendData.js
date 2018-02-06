(function(window, jQuery, coos) {
	function ThisExecute(config) {
		coos.page.event.execute.Execute.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = coos.page.event.execute.Execute.prototype;
		ThisExecute.prototype = new Super();
	})();

	ThisExecute.prototype.eventExecute = function(executeCallback) {
		var execute = this.execute;
		var data = this.getData();
		if (!coos.isEmpty(execute.config.layoutids)) {
			var layoutObjects = getLayoutObject(execute.config.layoutids);
			$(layoutObjects).each(function(index, layoutObject) {
				layoutObject.executeData = data;
				layoutObject.appendData(data, {});

			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "填充数据",
		columns : [ {
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
	coos.page.event.execute.model.defind("APPEND-DATA", ThisExecuteConfig, ThisExecute);
})(window, jQuery, coos);