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
		if (!coos.isEmpty(execute.config.panelids)) {
			var panelObjects = getPanelObject(execute.config.panelids);
			$(panelObjects).each(function(index, panelObject) {
				panelObject.hide && panelObject.hide();
			});
		}
		if (!coos.isEmpty(execute.config.layoutids)) {
			var objects = getLayoutObject(execute.config.layoutids);
			$(objects).each(function(index, object) {
				object.hide && object.hide();
			});
		}
		if (!coos.isEmpty(execute.config.elementids)) {
			$(execute.config.elementids.split()).each(function(index, elementid) {
				if (!coos.isEmpty(elementid)) {
					var $object = $('.coos-one-element[elementid="' + elementid + '"]');
					$object.hide();
				}
			});
		}
		if (!coos.isEmpty(execute.config.buttonids)) {
			$(execute.config.buttonids.split()).each(function(index, buttonid) {
				if (!coos.isEmpty(buttonid)) {
					var $object = $('.coos-one-button[buttonid="' + buttonid + '"]');
					$object.hide();
				}
			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "隐藏",
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
	coos.page.event.execute.model.defind("HIDE", ThisExecuteConfig, ThisExecute);
})(window, jQuery, coos);