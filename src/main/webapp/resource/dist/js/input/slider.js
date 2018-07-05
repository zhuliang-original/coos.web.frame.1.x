(function() {
	co.input.bind('slider', function($selector) {

		var min = $selector.attr('data-slider-min') || 0;
		var max = $selector.attr('data-slider-max') || 100;
		var step = $selector.attr('data-slider-step') || 1;
		var labelstep = $selector.attr('data-slider-label-step') || 10;
		var warnValue = $selector.attr('data-slider-warn');

		var isinterval = co.isTrue($selector.attr('coos-is-interval-search'));
		var name = $selector.attr('name');
		var thisvalue = $selector.val();
		var slider = null;
		var issliderchange = false;
		$selector.change(function() {
			var value = $selector.val();
			if (issliderchange) {
				issliderchange = false;
			} else {
				if (slider) {
					setHandleText(formatValue(value));
					if (formatValue(value).length == 2) {
						slider.slider('values', formatValue(value)[0]);
					} else {
						slider.slider('value', formatValue(value));
					}
				}
			}
		});

		function formatValue(value) {
			value = value || "0";
			value = "" + value;
			var vs = [];
			if (value.indexOf(",") > 0) {
				var vs = value.split(",");
				$(vs).each(function(index, v) {
					vs[index] = Number(v);
				});
			} else {
				vs = [ Number(value) ];
			}
			return vs;
		}
		$selector.hide();
		var $slider = $('<div/>');
		$selector.before($slider);
		function setHandleText(values) {
			if (slider) {
				var $handle = slider.data('uiSlider').handle;
				if (warnValue && values[0] >= warnValue) {
					$handle.addClass("bg-red bd-red coos-white");
				} else {
					$handle.removeClass("bg-red bd-red coos-white");
				}
				$handle.text(values[0]);
			}
			// if (values.length == 2) {
			// $handle2.text(values[1]);
			// }
		}
		co.plugin.load("jquery_ui_slider", function() {
			var vs = formatValue(thisvalue);
			slider = $slider.slider({
				range : vs == 2,
				range : "max",
				min : Number(min),
				max : Number(max),
				step : step,
				value : vs.length == 2 ? null : vs[0],
				values : vs.length == 2 ? vs : null,
				create : function() {
				},
				slide : function(event, ui) {
					var vs = ui.values ? ui.values : [ ui.value ];
					setHandleText(vs);
					issliderchange = true;
					var value = vs[0];
					if (vs.length == 2) {
						value = "," + vs[1];
					}
					$selector.val(value);
					$selector.change();
				}
			}).slider("pips", {
				rest : "label",
				prefix : "",
				suffix : "",
				step : Number(labelstep)
			});

			setHandleText(vs);

			return;

		});
	});

})();