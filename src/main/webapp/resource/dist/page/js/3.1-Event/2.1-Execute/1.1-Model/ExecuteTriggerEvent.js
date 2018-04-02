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
		if (execute.config.eventtype) {
			if (execute.config.eventtype == 'search') {
				if (!co.isEmpty(execute.config.layoutids)) {
					var objects = getLayoutObject(execute.config.layoutids);
					$(objects).each(function(index, object) {
						object.search();
					});
				}
			}
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "触发事件",
		columns : [ {
			text : "事件类型",
			name : "eventtype",
			inputtype : "select",
			cannull : false,
			datas : [ {
				value : 'click',
				text : '点击'
			}, {
				value : 'search',
				text : '搜索'
			} ]
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
	co.page.event.execute.model.defind("TRIGGER-EVENT", ThisExecuteConfig, ThisExecute);
})(window, jQuery);