(function(window, jQuery) {
	function ThisEvent(config) {
		co.page.event.Event.call(this, config);
	}

	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.event.Event.prototype;
		ThisEvent.prototype = new Super();
	})();

	ThisEvent.prototype.bindEvent = function() {
		var $input = this.$input || this.$view;
		var this_ = this;
		if ($input) {
			$input.on('change', function() {
				this_.eventExecutes(this.value);
			});
		}
	};

	var ThisEventConfig = {
		name : "值变更",
		columns : []
	};
	co.page.event.model.defind("CHANGE", ThisEventConfig, ThisEvent);
})(window, jQuery);