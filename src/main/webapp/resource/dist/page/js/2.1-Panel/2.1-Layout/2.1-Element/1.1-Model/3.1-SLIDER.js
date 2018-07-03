(function(window, jQuery) {
	function ThisElement(config) {
		co.page.panel.layout.element.Element.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.element.Element.prototype;
		ThisElement.prototype = new Super();
	})();

	ThisElement.prototype.initInput = function($input) {
		$input.attr('data-slider-min', this.element.config.sliderminvalue || 0);
		$input.attr('data-slider-max', this.element.config.slidermaxvalue || 100);
	};

	var ThisElementConfig = {
		name : "进度条",
		forInput : true,
		columns : [ {
			text : "进度条最小值",
			name : "sliderminvalue"
		}, {
			text : "进度条最大值",
			name : "slidermaxvalue"
		} ]
	};
	co.page.panel.layout.element.model.defind("SLIDER", ThisElementConfig, ThisElement);
})(window, jQuery);