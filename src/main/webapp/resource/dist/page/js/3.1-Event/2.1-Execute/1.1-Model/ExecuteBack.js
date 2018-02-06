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
		window.history.back();
		executeCallback && executeCallback();
		this.eventChildExecutes();
	};

	var ThisExecuteConfig = {
		name : "回退",
		columns : []
	};
	coos.page.event.execute.model.defind("BACK", ThisExecuteConfig, ThisExecute);
})(window, jQuery, coos);