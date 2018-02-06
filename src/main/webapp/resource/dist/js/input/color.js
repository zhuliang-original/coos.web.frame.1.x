(function() {
	co.input.bind('color', function($selector) {
		co.plugin.load("colorpicker", function() {
			var isreadonly = $selector.attr('isreadonly');
			isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
			if (isreadonly) {
				return;
			}

			var afterIcon = $('<span class="coos-input-addon coos-input-addon-after coos-pointer" ></span>');
			$selector.after(afterIcon);
			afterIcon.click(function() {
				$selector.ColorPickerShow();
			});
			$selector.change(function() {
				setCss();
			});
			var setCss = function() {
				var value = $selector.val();
				if (!co.isEmpty(value)) {

					$(afterIcon).css({
						'background-color' : value
					});
				} else {
					$(afterIcon).css({
						'background-color' : 'transparent'
					});
				}

			}
			setCss();
			var colorPicker = $selector.ColorPicker({
				color : '#ff00ff',
				onSubmit : function(hsb, hex, rgb, el) {
					$selector.val('#' + hex);
					$selector.ColorPickerHide();
					$selector.change();
				},
				onBeforeShow : function() {
					$selector.ColorPickerSetColor(this.value);
				},
				onChange : function(hsb, hex, rgb) {
					$selector.val('#' + hex);
					$selector.change();
				}
			}).bind('keyup', function() {
				$(this).ColorPickerSetColor(this.value);
			});
		});
	});

})();