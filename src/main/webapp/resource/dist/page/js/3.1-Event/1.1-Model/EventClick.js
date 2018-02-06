(function(window, jQuery, coos) {
	function ThisEvent(config) {
		coos.page.event.Event.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = coos.page.event.Event.prototype;
		ThisEvent.prototype = new Super();
	})();

	ThisEvent.prototype.bindEvent = function() {
		var this_ = this;
		if (this.$view) {
			this.$view.on('click', function() {
				if (this_.event.config.needconfirm) {
					var confirmmessage = this_.event.config.confirmmessage || "确认执行本次操作？";
					coos.box.confirm(confirmmessage, function() {
						this_.eventExecutes();
					});
				} else {
					this_.eventExecutes();
				}
			});
		}
	};

	var ThisEventConfig = {
		name : "点击",
		columns : [ {
			text : "需求确认",
			name : "needconfirm",
			inputtype : "switch"
		}, {
			text : "确认文案",
			name : "confirmmessage"
		} ]
	};
	coos.page.event.model.defind("CLICK", ThisEventConfig, ThisEvent);
})(window, jQuery, coos);