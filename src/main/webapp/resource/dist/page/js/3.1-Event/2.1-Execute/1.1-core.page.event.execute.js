(function(window, jQuery) {
	co.page.event.execute = {};
	var Execute = function(config) {
		this.config = config;
		this.execute = config.execute;
		this.design = config.design;
		this.init(config);
		jQuery.extend(true, config.execute, this.execute);
	};
	Execute.prototype.init = function(config) {
		var execute = config.execute;
		var executeConfig = execute.config;
		if (executeConfig != null) {
			if (co.isString(executeConfig)) {
				executeConfig = JSON.parse(executeConfig);
			}
		}
		execute.config = executeConfig || {};
		this.initExecute();
	};

	Execute.prototype.initExecute = function() {
	};

	Execute.prototype.getData = function() {
		var executeData = {};
		this.execute.datas = this.execute.datas || [];

		for (var index = 0; index < this.execute.datas.length; index++) {
			var data = this.execute.datas[index];
			var setvaluename = data.setvaluename;
			var value = this.getDataValue(data);
			if (typeof (value) != "undefined") {
				if (!coos.isEmpty(setvaluename)) {
					executeData[setvaluename] = value;
				} else {

					if (co.isObject(value)) {
						if (coos.isArray(value)) {
							coos.box.info('值类型为集合，请设置值名称');
							throw new Error('setvaluename is null');
						} else {
							jQuery.extend(true, executeData, value);
						}
					} else {
						coos.box.info('未设置存值名称');
						throw new Error('setvaluename is null');
					}
				}
			}

			if (!coos.isEmpty(data.validaterule)) {

				var dataConfig = executeData;
				var validateresult = executeFunction(dataConfig, data.validaterule);
				if (validateresult) {
					if (!coos.isEmpty(data.validatesuccessmessage)) {
						coos.box.info(data.validatesuccessmessage);
						throw new Error(data.validatesuccessmessage);
					}
				} else {
					if (!coos.isEmpty(data.validateerrormessage)) {
						coos.box.info(data.validateerrormessage);
						throw new Error(data.validateerrormessage);
					}
				}
			}
		}
		return executeData;
	};
	function executeFunction(dataConfig, value) {

		var dataMapStr = "";
		for ( var name in dataConfig) {
			dataMapStr += 'var ' + name + ' = dataConfig.' + name + ' || {};';
			// console.log(dataMapStr)
		}
		var funstr = "function(){" + dataMapStr + " return " + value + "; }";
		return eval('(0,' + funstr + ')')();
	}
	Execute.prototype.getDataValue = function(executeData) {
		var dataConfig = this.config.dataConfig;
		var value = executeData.value;
		if (!co.isEmpty(executeData.layoutid)) {
			var layoutObjects = getLayoutObject(executeData.layoutid);
			var layoutData = {};
			var executeData = {};
			$(layoutObjects).each(function(index, layoutObject) {
				layoutData = layoutObject.getData(dataConfig);
				if (layoutObject.getExecuteData) {
					executeData = layoutObject.getExecuteData(dataConfig);
				}
			});
			dataConfig.layoutData = layoutData;
			dataConfig.executeData = executeData;
			if (co.isEmpty(value)) {
				if (typeof (layoutData) != "undefined") {
					return layoutData;
				} else if (typeof (executeData) != "undefined") {
					return executeData;
				} else {
					return null;
				}
			}
		}

		return executeFunction(dataConfig, value);
	};
	var EXECUTE_STATUS_MAP = {};
	Execute.prototype.runBefore = function() {
		EXECUTE_STATUS_MAP[this.execute.executeid] = 1;
	};
	Execute.prototype.runAfter = function() {
		EXECUTE_STATUS_MAP[this.execute.executeid] = 0;
	};
	Execute.prototype.validateRule = function() {
		if (!coos.isEmpty(this.execute.validaterule)) {
			var dataConfig = {};
			dataConfig.value = this.config.value;
			return executeFunction(dataConfig, this.execute.validaterule);
		}
		return true;
	};
	Execute.prototype.run = function() {
		if (EXECUTE_STATUS_MAP[this.execute.executeid] != null && EXECUTE_STATUS_MAP[this.execute.executeid] == 1) {
			return;
		}
		if (!this.validateRule()) {
			return;
		}
		this.runBefore();
		var this_ = this;
		try {
			this.eventExecute(function() {
				this_.runAfter();
			});
		} catch (e) {
			this.runAfter();
			throw e;
		}
	};
	Execute.prototype.eventExecute = function(executeCallback) {
	};

	Execute.prototype.eventChildExecutes = function() {
		this.config.event.executes = this.config.event.executes || [];

		for (var index = 0; index < this.config.event.executes.length; index++) {
			var execute = this.config.event.executes[index];
			if (!co.isEmpty(execute.parentid) && execute.parentid == this.execute.executeid) {
				var config = this.config;
				config.execute = execute;
				var executeObject = co.page.event.execute.create(config);
				executeObject.run();
			}
		}
	};

	co.page.event.execute.Execute = Execute;
})(window, jQuery);