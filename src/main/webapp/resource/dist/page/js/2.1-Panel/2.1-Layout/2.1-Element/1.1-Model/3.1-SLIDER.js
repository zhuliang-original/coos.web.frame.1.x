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
		$input.attr('data-slider-step', this.element.config.sliderstep);
		$input.attr('data-slider-label-step', this.element.config.sliderlabelstep);

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
		}, {
			text : "进度条梯级",
			name : "sliderstep"
		}, {
			text : "进度条标签梯级",
			name : "sliderlabelstep"
		} ]
	};
	co.page.panel.layout.element.model.defind("SLIDER", ThisElementConfig, ThisElement);
})(window, jQuery);