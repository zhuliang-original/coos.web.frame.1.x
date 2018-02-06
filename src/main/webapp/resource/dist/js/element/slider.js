(function() {
	co.element.initSlider = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-slider');
		elements.each(function(index, element) {
			if (co.element.isInited(element, 'inputtype-slider')) {
				return;
			}
			var $element = $(element);
			var min = $element.attr('data-slider-min') || 0;
			var max = $element.attr('data-slider-max') || 100;
			$element.attr('data-slider-min', min);
			$element.attr('data-slider-max', max);
			var isinterval = $element.attr('core-is-interval-search') ? true : false;
			if (isinterval) {
				$element.attr('data-slider-value', '[' + min + ',' + max + ']');
			} else {
				$element.attr('data-slider-value', min);
			}
			var name = $element.attr('name');
			var thisvalue = $element.val();
			var inited = false;
			var slider = null;
			var changeinited = false;
			$element.change(function() {
				if (inited) {
					if (!changeinited) {
						changeinited = true;
						var value = $element.val();
						if (value.indexOf(",") > 0) {
							var vs = value.split(",");
							$(vs).each(function(index, v) {
								vs[index] = Number(v);
							});
							slider.data('slider').setValue(vs);
						} else {
							slider.data('slider').setValue(Number(value));
						}
					}
					var value = slider.data('slider').getValue();
					var setvalue = null;
					if (co.isNumber(value)) {
						setvalue = value;
					} else {
						setvalue = value[0] + value[1];
						$element.closest('.core-form').find('[name="' + name + '_start"]').val(value[0]);
						$element.closest('.core-form').find('[name="' + name + '_end"]').val(value[1]);
					}
					slider.data('slider').setValue(value);
					$element.val(setvalue);
					return;
				}
				thisvalue = $element.val();
				if (co.isEmpty(thisvalue)) {
					thisvalue = 0;
					if (isinterval) {
						thisvalue = "0,100";
					}
				}
			});
			co.plugins.load("bootstrap_slider", function() {
				slider = $element.slider({
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
					slider.data('slider').setValue(vs);
				} else {
					if (!co.isEmpty(thisvalue)) {
						slider.data('slider').setValue(Number(thisvalue));
					}
				}

				inited = true;
			});
		});

	};
})();