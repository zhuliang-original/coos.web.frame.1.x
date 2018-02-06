(function() {
	co.input.bind('switch', function($selector) {
		co.plugin.load("bootstrap_switch", function() {
			var isreadonly = $selector.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
			if (isreadonly) {
				return;
			}
			// var height = element.parent().height();
			// element.parent().css('min-height', height);
			// element.parent().css('min-height', 53);
			$selector.hide();
			var value = $selector.attr("value");
			if (co.isEmpty($selector.attr("data-size"))) {
				// $selector.attr('data-size', 'mini');

			}
			// if(co.isEmpty(element.attr("data-on-color"))){
			// element.attr('data-on-color', 'warning');
			// }
			// if(co.isEmpty(element.attr("data-off-color"))){
			// element.attr('data-off-color', 'danger');
			// }
			// if(co.isEmpty(element.attr("data-off-color"))){
			// element.attr('data-off-color', 'danger');
			// }
			if (co.isEmpty($selector.attr("data-label-text"))) {
				// element.attr('data-label-text', '&nbsp;');
			}
			$selector.attr('data-wrapper-class', 'yellow');
			if (value != null && (value == 'true' || value == '1')) {
				$selector.attr("checked", "checked");
			}
			$selector.attr('isswitch', true);
			$selector.attr('type', 'checkbox');
			var bootstrapSwitch = $selector.bootstrapSwitch();
			$selector.data('bootstrapSwitch', bootstrapSwitch);
			$selector.on('switchChange.bootstrapSwitch', function(e, state) {
				$selector.val(state);
				$selector.change();
			});
		});
	});
})();