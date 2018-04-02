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
			var last_value = $input.val();
			$input.on('change', function() {
				var this_value = this.value;
				if (last_value == this_value) {

				} else {
					this_.eventExecutes(this_value);
				}
				last_value = this_value;
			});
		}
	};

	var ThisEventConfig = {
		name : "值变更",
		columns : []
	};
	co.page.event.model.defind("CHANGE", ThisEventConfig, ThisEvent);
})(window, jQuery);