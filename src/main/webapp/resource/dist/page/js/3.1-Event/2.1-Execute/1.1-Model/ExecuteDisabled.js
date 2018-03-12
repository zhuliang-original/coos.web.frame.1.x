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
				panelObject.disabled && panelObject.disabled();
			});
		}
		if (!co.isEmpty(execute.config.layoutids)) {
			var objects = getLayoutObject(execute.config.layoutids);
			$(objects).each(function(index, object) {
				object.disabled && object.disabled();
			});
		}
		if (!co.isEmpty(execute.config.elementids)) {
			$(execute.config.elementids.split(',')).each(function(index, elementid) {
				if (!co.isEmpty(elementid)) {
					var $object = $('[elementid="' + elementid + '"]');
					$object.addClass('coos-disabled');
				}
			});
		}
		if (!co.isEmpty(execute.config.buttonids)) {
			$(execute.config.buttonids.split(',')).each(function(index, buttonid) {
				if (!co.isEmpty(buttonid)) {
					var $object = $('[buttonid="' + buttonid + '"]');
					$object.attr('disabled', 'disabled');
					$object.addClass('coos-disabled');
				}
			});
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "禁用",
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
	co.page.event.execute.model.defind("DISABLED", ThisExecuteConfig, ThisExecute);
})(window, jQuery);