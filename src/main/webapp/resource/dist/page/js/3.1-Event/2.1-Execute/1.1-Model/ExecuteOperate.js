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
		this.doExecute(executeCallback, {});
	};

	ThisExecute.prototype.doExecute = function(executeCallback, paramData) {
		var execute = this.execute;
		if (execute.operate) {
			var operate = execute.operate;
			var servletpath = operate.servletpath;
			var data = this.getData() || {};
			for ( var key in data) {
				if (coos.isObject(data[key])) {
					data[key] = JSON.stringify(data[key]);
				}
			}
			jQuery.extend(true, data, paramData);
			var this_ = this;
			if (operate.type == 'TO_PAGE') {
				co.toAction({
					data : data,
					action : servletpath
				});
				executeCallback && executeCallback();
				this_.eventChildExecutes();
			} else if (operate.type == 'DO_POST') {
				co.POST(servletpath, data, 'json', function(o) {
					var status = o.data;
					var promptmessage = "";
					if (status.errcode == 0) {
						promptmessage = execute.config.successprompt;
						if (co.isEmpty(promptmessage)) {
							promptmessage = "操作成功！";
						}

						if (!execute.config.successneedprompt) {
							promptmessage = null;
						}
					} else {
						if (status.errcode == 20001) {
							co.box.confirm(status.errmsg + "<br/>点击确认，强制删除！", function() {
								this_.doExecute(executeCallback, {
									forciblyremove : true
								});
							}, function() {
								executeCallback && executeCallback();
							});
							return;
						}
						promptmessage = execute.config.errorprompt;
						if (co.isEmpty(promptmessage)) {
							promptmessage = status.errmsg;
						}
						if (!execute.config.errorneedprompt) {
							promptmessage = null;
						}
					}
					if (!co.isEmpty(promptmessage)) {
						if (co.isEmpty(execute.config.boxtype) || execute.config.boxtype == "alert") {
							co.box.alert(promptmessage, function() {
								executeCallback && executeCallback();
								this_.eventChildExecutes();
							});
						} else if (execute.config.boxtype == "info") {
							co.box.info(promptmessage);
							executeCallback && executeCallback();
							this_.eventChildExecutes();
						}
					} else {
						executeCallback && executeCallback();
						this_.eventChildExecutes();
					}
				});
			}
		} else {
			executeCallback && executeCallback();
		}
	};

	var ThisExecuteConfig = {
		name : "执行操作",
		columns : [ {
			text : "操作",
			name : "operateid",
			useoperate : true
		}, {
			text : "成功提示",
			name : "successneedprompt",
			inputtype : "switch"
		}, {
			text : "错误提示",
			name : "errorneedprompt",
			inputtype : "switch"
		}, {
			text : "提示类型",
			name : "boxtype",
			inputtype : "select",
			datas : [ {
				text : '弹框',
				value : 'alert'
			}, {
				text : '提示',
				value : 'info'
			} ]
		}, {
			text : "成功提示",
			name : "successprompt"
		}, {
			text : "错误提示",
			name : "errorprompt"
		} ]
	};
	co.page.event.execute.model.defind("OPERATE", ThisExecuteConfig, ThisExecute);
})(window, jQuery);