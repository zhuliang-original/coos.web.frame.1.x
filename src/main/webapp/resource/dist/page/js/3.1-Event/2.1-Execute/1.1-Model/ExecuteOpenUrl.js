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
		var url = execute.config.url;
		var data = this.getData();
		if (!co.isEmpty(url)) {
			var opentype = execute.config.opentype;
			opentype = opentype || "currentpage";
			if (opentype == 'currentpage') {
				co.toAction({
					data : data,
					action : url
				});
			} else if (opentype == 'openpage') {
				co.openUrl(url, data);
			}
		}
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "打开连接",
		columns : [ {
			text : "连接",
			name : "url"
		}, {
			text : "打开类型",
			name : "opentype",
			inputtype : "select",
			datas : [ {
				text : '当前页面',
				value : 'currentpage'
			}, {
				text : '新标签页',
				value : 'openpage'
			}, {
				text : '窗口',
				value : 'window'
			} ]
		}, ]
	};
	co.page.event.execute.model.defind("OPEN-URL", ThisExecuteConfig, ThisExecute);
})(window, jQuery);