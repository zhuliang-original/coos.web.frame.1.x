(function() {
	co.component = co.component || new Object();

	var Loading = function(config) {
		this.config = config || {};
		this.init();
		return this;
	};

	Loading.prototype.init = function() {
		this.initView();
	};
	Loading.prototype.initView = function() {
		this.$loading = $('<div class="core-component-loading"><div class="core-component-loading-content"></div></div>');
		this.$text = $('<div class="text-center core-green"><span class="core-progress-text"></span><span class="core-progress-percentage"></span></div>');
		this.$progress = $('<div class="core-progress "><div class="core-progress-bar " style="width: 0%;"></div></div>');

		this.$loading.find('.core-component-loading-content').append(this.$text);
		this.$loading.find('.core-component-loading-content').append(this.$progress);
		this.$loading.appendTo('body');
	};
	Loading.prototype.load = function(callback) {

		var models = this.config.models || [];
		var setloadpercentage = 0;
		var nopercentagecount = 0;
		$(models).each(function(index, model) {
			if (co.isNumber(model.percentage)) {
				setloadpercentage += model.percentage;
			} else {
				nopercentagecount++;
			}
		});
		var overpercentage = 100 - setloadpercentage;
		$(models).each(function(index, model) {
			if (!co.isNumber(model.percentage)) {
				if (overpercentage > 0) {
					model.percentage = parseInt(overpercentage / nopercentagecount);
				} else {
					model.percentage = 0;
				}
			}
			var predictTime = model.predictTime || 500;
			var predictLoadIntervalTime = model.predictLoadIntervalTime || 100;
			var predictLoadCount = parseInt(predictTime / predictLoadIntervalTime);

			var eachLoadPercentage = model.percentage * 80 / predictLoadCount / 100;
			model.predictTime = predictTime;
			model.predictLoadIntervalTime = predictLoadIntervalTime;
			model.predictLoadCount = predictLoadCount;
			model.eachLoadPercentage = eachLoadPercentage;
			model.index = index;
		});

		this.load_(0);
	};
	Loading.prototype.load_ = function(index) {
		this.loadIndex = index;
		var models = this.config.models || [];
		var this_ = this;
		if (index >= models.length) {
			this.loadSuccess();
		} else {
			var model = models[index];
			var percentage = model.percentage;
			var nowpercentage = this.percentage || 0;
			nowpercentage = nowpercentage + percentage;
			var execute = model.execute;
			this.predictLoad(model, 0);
			var index_ = index + 1;
			if (execute) {
				execute && execute(function() {
					this_.loadOverallProgress(model, model.percentage);
					this_.load_(index_);
				});
			} else {
				this_.loadOverallProgress(model, model.percentage);
				this_.load_(index_);
			}
		}
	};
	Loading.prototype.predictLoad = function(model, index) {
		if (this.loadIndex != model.index) {
			return;
		}
		if (index >= model.predictLoadCount) {
			return;
		}
		if ((index + 1) * model.eachLoadPercentage >= model.percentage * 80 / 100) {
			return;
		}
		this.loadProgress(model, model.eachLoadPercentage);
		var this_ = this;
		window.setTimeout(function() {
			var index_ = index + 1;
			this_.predictLoad(model, index_);
		}, model.predictLoadIntervalTime);

	};
	Loading.prototype.loadProgress = function(model, percentage) {
		var loadedPercentage = this.loadedPercentage || 0;
		loadedPercentage = loadedPercentage + percentage;
		this.loadedPercentage = loadedPercentage;
		this.setInfo(model.text, loadedPercentage);
	};
	Loading.prototype.loadOverallProgress = function(model, percentage) {
		var loadedPercentage = this.loadedPercentage || 0;
		if (percentage < loadedPercentage) {
			return;
		}
		this.loadedPercentage = percentage;
		this.setInfo(model.text, percentage);
	};
	Loading.prototype.loadSuccess = function() {
		this.setInfo('加载完成', 100);
	};
	Loading.prototype.setInfo = function(text, percentage) {
		if (percentage < 0) {
			percentage = 0;
		}
		if (percentage > 100) {
			percentage = 100;
		}
		var percentageText = percentage;
		if (("" + percentageText).indexOf('.') >= 0) {
			percentageText = Number(percentageText).toFixed(1)
		}
		this.$text.find('.core-progress-text').text(text);
		this.$text.find('.core-progress-percentage').text(percentageText + "%");
		this.$progress.find('.core-progress-bar').css('width', percentage + "%");
	};
	Loading.prototype.destroy = function() {
		this.$loading.remove();
	};

	co.component.loading = function(config) {
		var t = new Loading(config);
		return t;
	};

})();