(function() {
	co.wizard = co.wizard || {};
	var defaultConfig = {};
	defaultConfig.selector = {};
	defaultConfig.selector.pills = ".coos-wizard-pills>li";
	defaultConfig.selector.spans = ".coos-wizard-spans>.coos-wizard-span";
	defaultConfig.selector.prev = ".coos-wizard-button-prev";
	defaultConfig.selector.next = ".coos-wizard-button-next";
	defaultConfig.selector.finish = ".coos-wizard-button-finish";
	defaultConfig.selector.bar = ".coos-progress-bar";

	var Wizard = function(config) {
		config = jQuery.extend(true, {}, config, defaultConfig);

		this.$wizard = $(config.wizard);
		this.$next = this.$wizard.find(config.selector.next);
		this.$prev = this.$wizard.find(config.selector.prev);
		this.$finish = this.$wizard.find(config.selector.finish);
		this.$pills = this.$wizard.find(config.selector.pills);
		this.$spans = this.$wizard.find(config.selector.spans);
		this.$bar = this.$wizard.find(config.selector.bar);
		var activeindex = 0;
		this.$pills.each(function(index, $pill) {
			if ($($pill).hasClass('active')) {
				activeindex = index;
			}
		});
		this.bindClick();
		this.beforeChange = function(activeindex, $pills, $spans) {
			if (co.isFunction(config.beforeChange)) {
				var v = config.beforeChange(activeindex, $pills, $spans);
				if (co.isBoolean(v)) {
					return v;
				}
			}
			return true;
		}
		this.afterChange = function(activeindex, $pills, $spans) {

			if (co.isFunction(config.afterChange)) {
				var v = config.afterChange(activeindex, $pills, $spans);
				if (co.isBoolean(v)) {
					return v;
				}
			}
			return true;
		}
		this.onFinish = function() {

			if (co.isFunction(config.onFinish)) {
				config.onFinish();
			}
		}
		this.setActive(activeindex);
		return this;
	}
	Wizard.prototype.setActive = function(activeindex) {
		if (activeindex < 0) {
			return;
		}
		if (activeindex >= this.$pills.length) {
			return;
		}
		if (!this.beforeChange(activeindex, this.$pills, this.$spans)) {
			return;
		}
		this.$pills.each(function(index, $pill) {
			$pill = $($pill);
			if (index <= activeindex) {
				$pill.addClass('active');
			} else {

				$pill.removeClass('active');
			}
		});

		this.$spans.each(function(index, $span) {
			$span = $($span);
			if (index == activeindex) {
				$span.addClass('active');
			} else {
				$span.removeClass('active');
			}
		});
		this.$bar.css('width', (100 * (activeindex + 1) / this.$pills.length) + '%');
		this.activeindex = activeindex;

		this.initButton();
		if (!this.afterChange(activeindex, this.$pills, this.$spans)) {
			return;
		}
	}

	Wizard.prototype.bindClick = function() {
		if (this.binded) {
			return;
		}
		this.binded = true;
		var this_ = this;
		this.$prev.click(function() {
			if ($(this).hasClass('disabled')) {
				return;
			}
			var activeindex = this_.activeindex;
			this_.setActive(activeindex - 1);
		});
		this.$next.click(function() {
			if ($(this).hasClass('disabled')) {
				return;
			}
			var activeindex = this_.activeindex;
			this_.setActive(activeindex + 1);
		});
		this.$finish.click(function() {
			if ($(this).hasClass('disabled')) {
				return;
			}
			this_.onFinish();
		});
	}
	Wizard.prototype.initButton = function() {
		if (this.hasPrev()) {
			this.$prev.removeClass('disabled');
		} else {
			this.$prev.addClass('disabled');
		}
		this.$finish.addClass('disabled');
		if (this.hasNext()) {
			this.$next.removeClass('disabled');
		} else {
			this.$next.addClass('disabled');
			this.$finish.removeClass('disabled');

		}
	}
	Wizard.prototype.hasPrev = function() {
		if (this.activeindex > 0) {
			return true;
		}
		return false;
	}
	Wizard.prototype.hasNext = function() {
		if (this.activeindex < (this.$pills.length - 1)) {
			return true;
		}
		return false;
	};
	co.component.wizard = {};
	co.component.wizard.create = function(config) {
		return new Wizard(config);
	}

})();