(function() {
	co.input.bind('slider', function($selector) {
		
		var min = $selector.attr('data-slider-min') || 0;
		var max = $selector.attr('data-slider-max') || 100;
		$selector.attr('data-slider-min', min);
		$selector.attr('data-slider-max', max);
		var isinterval = co.isTrue($selector.attr('coos-is-interval-search'));
		if (isinterval) {
			$selector.attr('data-slider-value', '[' + min + ',' + max + ']');
		} else {
			$selector.attr('data-slider-value', min);
		}
		var name = $selector.attr('name');
		var thisvalue = $selector.val();
		var inited = false;
		var slider = null;
		var changeinited = false;
		$selector.change(function() {
			if (inited) {
				if (!changeinited) {
					changeinited = true;
					var value = $selector.val();
					if (value.indexOf(",") > 0) {
						var vs = value.split(",");
						$(vs).each(function(index, v) {
							vs[index] = Number(v);
						});
						slider.data('bootstrapSlider').setValue(vs);
					} else {
						slider.data('bootstrapSlider').setValue(Number(value));
					}
				}
				var value = slider.data('bootstrapSlider').getValue();
				var setvalue = null;
				if (co.isNumber(value)) {
					setvalue = value;
				} else {
					setvalue = value[0] + value[1];
					$selector.closest('.coos-form').find('[name="' + name + '_start"]').val(value[0]);
					$selector.closest('.coos-form').find('[name="' + name + '_end"]').val(value[1]);
				}
				slider.data('bootstrapSlider').setValue(value);
				$selector.val(setvalue);
				return;
			}
			thisvalue = $selector.val();
			if (co.isEmpty(thisvalue)) {
				thisvalue = 0;
				if (isinterval) {
					thisvalue = "0,100";
				}
			}
		});
		co.plugin.load("bootstrap_slider", function() {
			slider = $selector.bootstrapSlider({
				formatter : function(value) {
					return '' + value;
				}
			});
			thisvalue = "" + thisvalue;
			if (thisvalue.indexOf(",") > 0) {
				var vs = thisvalue.split(",");
				$(vs).each(function(index, v) {
					vs[index] = Number(v);
				});
				slider.data('bootstrapSlider').setValue(vs);
			} else {
				if (!co.isEmpty(thisvalue)) {
					slider.data('bootstrapSlider').setValue(Number(thisvalue));
				}
			}

			inited = true;
		});
	});

})();