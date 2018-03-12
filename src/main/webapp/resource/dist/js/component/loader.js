(function() {

	var Loader = function(config) {
		this.config = config || {};
		this.models = config.models || [];
		this.init();
		return this;
	};

	Loader.prototype.init = function() {
	};
	Loader.prototype.createLoaderIcon = function() {
		var $loader = $('<div class="loader"></div>');
		$loader.append('<div class="loader-inner ball-clip-rotate-multiple"><div></div><div></div></div>');
		return $loader;
	};
	Loader.prototype.initView = function() {
		var $loadView = $('<div class="coos-component-loader"></div>');
		$loadView.hide();
		var title = this.config.title || '加载数据';
		$loadView.append('<div class="text-center coos-green pd-30 hread">' + title + '</div>');
		$loadView.appendTo('body');
		var $list = $('<div class="loader-data-list"></div>');
		$loadView.append($list);
		$(this.models).each(function(index, model) {
			var $one = $('<div class="loader-data-one"></div>');
			$one.attr('load-index', index);
			$one.append('<div class="icon coos-blue"><span class="fa fa-circle-o"></span></div>');
			$one.append('<div class="title">' + model.title + '</div>');
			$one.append('<div class="status"><span class="coos-blue">等待中</span></div>');
			$list.append($one);
		});
		this.$loadView = $loadView;
	};
	Loader.prototype.start = function() {
		this.initView();
		var this_ = this;
		co.plugin.load('loaders', function() {
			this_.$loadView.show();
			$('body').addClass('coos-component-loader-start');
			this_.load(0);
		});
	};
	Loader.prototype.load = function(index) {
		index = index || 0;
		if (index >= this.models.length) {
			this.end();
		} else {
			var model = this.models[index];
			var $one = this.$loadView.find('[load-index="' + index + '"]')
			$one.find('.status').empty().append('<span class="coos-blue">加载中</span>');
			$one.append(this.createLoaderIcon());
			var this_ = this;
			var callback = function() {
				$one.find('.icon').empty().append('<span class="fa fa-check-circle-o"></span>');
				$one.find('.icon').removeClass('coos-blue');
				$one.find('.icon').addClass('coos-green');
				$one.find('.status').empty().append('<span class="coos-green">加载成功</span>');
				$one.find('.loader').remove();
				this_.load(index + 1);
			};
			if (model.load) {
				model.load(callback);
			}else{
				callback();
			}
		}
	};
	Loader.prototype.end = function() {
		var callback = this.config.success;
		var this_ = this;
		window.setTimeout(function() {
			this_.endView();
			window.setTimeout(function() {
				// this_.$loadView.hide(200);
				this_.$loadView.remove()
				$('body').removeClass('coos-component-loader-start');
				callback && callback();
			}, 500);
		}, 300);
	};
	Loader.prototype.endView = function() {
		this.$loadView.empty().append('<div class="coos-component-end-view">加载完成</div>');
	};
	Loader.prototype.destroy = function() {
	};

	co.component.loader = function(config) {
		var t = new Loader(config);
		return t;
	};

})();