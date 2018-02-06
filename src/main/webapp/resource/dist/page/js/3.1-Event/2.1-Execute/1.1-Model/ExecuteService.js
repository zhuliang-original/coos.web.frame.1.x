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
		var serviceid = execute.config.serviceid;
		var this_ = this;
		if (!coos.isEmpty(serviceid)) {
			var data = this.getData();
			jQuery.extend(true, data, paramData);
			var config = {};
			config.id = serviceid;
			config.data = data || {};
			config.callback = function(status) {
				var promptmessage = "";
				var resultMap = {};
				if (status.errcode == 0) {
					resultMap = status.result;
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
				var callback = function() {
					executeCallback && executeCallback();
					if (status.errcode == 0) {

						if (!coos.isEmpty(execute.config.layoutids)) {
							var layoutObjects = getLayoutObject(execute.config.layoutids);
							$(layoutObjects).each(function(index, layoutObject) {
								layoutObject.executeData = data;
								var servicemodelname = layoutObject.layout.servicemodelname;
								if (coos.isEmpty(layoutObject.layout.servicemodelname)) {
									for ( var name in resultMap) {
										servicemodelname = name;
										break;
									}
								}
								var result = resultMap[servicemodelname];
								layoutObject.processResult({
									resultMap : resultMap,
									result : result,
									isTop : true
								});
							});
						}
						this_.eventChildExecutes();
					}
				};
				if (!coos.isEmpty(promptmessage)) {
					if (coos.isEmpty(execute.config.boxtype) || execute.config.boxtype == "alert") {
						coos.box.alert(promptmessage, function() {
							callback();
						});
					} else if (execute.config.boxtype == "info") {
						coos.box.info(promptmessage);
						callback();
					}
				} else {
					callback();

				}
			}
			coos.executeService(config);

		} else {
			executeCallback && executeCallback();
			this_.eventChildExecutes();
		}
	};

	var ThisExecuteConfig = {
		name : "执行服务",
		columns : [ {
			text : "服务",
			name : "serviceid",
			useservice : true
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
		}, {
			text : "填充布局",
			name : "layoutids",
			inputtype : "selects",
			uselayout : true
		} ]
	};
	coos.page.event.execute.model.defind("SERVICE", ThisExecuteConfig, ThisExecute);
})(window, jQuery, coos);