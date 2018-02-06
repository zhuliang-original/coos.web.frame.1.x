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
		this.doExecute(executeCallback, {});
	};

	ThisExecute.prototype.doExecute = function(executeCallback, paramData) {
		var execute = this.execute;
		if (execute.operate) {
			var operate = execute.operate;
			var servletpath = operate.servletpath;
			var data = this.getData();
			jQuery.extend(true, data, paramData);
			var this_ = this;
			if (operate.type == 'TO_PAGE') {
				coos.toAction({
					data : data,
					operate : servletpath
				});
				executeCallback && executeCallback();
				this_.eventChildExecutes();
			} else if (operate.type == 'DO_POST') {
				coos.POST(servletpath, data, 'json', function(o) {
					var status = o.data;
					var promptmessage = "";
					if (status.errcode == 0) {
						promptmessage = execute.config.successprompt;
						if (coos.isEmpty(promptmessage)) {
							promptmessage = "操作成功！";
						}

						if (!execute.config.successneedprompt) {
							promptmessage = null;
						}
					} else {
						if (status.errcode == 20001) {
							coos.box.confirm(status.errmsg + "<br/>点击确认，强制删除！", function() {
								this_.doExecute(executeCallback, {
									forciblyremove : true
								});
							}, function() {
								executeCallback && executeCallback();
							});
							return;
						}
						promptmessage = execute.config.errorprompt;
						if (coos.isEmpty(promptmessage)) {
							promptmessage = status.errmsg;
						}
						if (!execute.config.errorneedprompt) {
							promptmessage = null;
						}
					}
					if (!coos.isEmpty(promptmessage)) {
						if (coos.isEmpty(execute.config.boxtype) || execute.config.boxtype == "alert") {
							coos.box.alert(promptmessage, function() {
								executeCallback && executeCallback();
								this_.eventChildExecutes();
							});
						} else if (execute.config.boxtype == "info") {
							coos.box.info(promptmessage);
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
	coos.page.event.execute.model.defind("ACTION", ThisExecuteConfig, ThisExecute);
})(window, jQuery, coos);