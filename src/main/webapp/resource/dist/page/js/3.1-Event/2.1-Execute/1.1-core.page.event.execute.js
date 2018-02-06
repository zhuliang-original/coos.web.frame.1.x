(function(window, jQuery, coos) {
	coos.page.event.execute = {};
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
			if (coos.isString(executeConfig)) {
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

		for ( var index = 0; index < this.execute.datas.length; index++) {
			var data = this.execute.datas[index];
			var setvaluename = data.setvaluename;
			var value = this.getDataValue(data);
			if (typeof (value) != "undefined") {
				if (coos.isObject(value)) {
					jQuery.extend(true, executeData, value);
				} else {
					executeData[setvaluename] = value;
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
		if (!coos.isEmpty(executeData.layoutid)) {
			var layoutObjects = getLayoutObject(executeData.layoutid);
			var layoutData = {};
			var executeData = {};
			$(layoutObjects).each(function(index, layoutObject) {
				layoutData = layoutObject.getData();
				if (layoutObject.getExecuteData) {
					executeData = layoutObject.getExecuteData();
				}
			});
			dataConfig.layoutData = layoutData;
			dataConfig.executeData = executeData;
			if (coos.isEmpty(value)) {
				return layoutData;
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
	Execute.prototype.run = function() {
		if (EXECUTE_STATUS_MAP[this.execute.executeid] != null && EXECUTE_STATUS_MAP[this.execute.executeid] == 1) {
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

		for ( var index = 0; index < this.config.event.executes.length; index++) {
			var execute = this.config.event.executes[index];
			if (!coos.isEmpty(execute.parentid) && execute.parentid == this.execute.executeid) {
				var config = this.config;
				config.execute = execute;
				var executeObject = coos.page.event.execute.create(config);
				executeObject.run();
			}
		}
	};

	coos.page.event.execute.Execute = Execute;
})(window, jQuery, coos);