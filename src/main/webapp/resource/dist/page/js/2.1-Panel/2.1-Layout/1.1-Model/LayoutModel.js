(function(window, jQuery) {
	function ThisLayout(config) {
		co.page.panel.layout.Layout.call(this, config);
	}
	(function() {
		var Super = function() {
		};
		Super.prototype = co.page.panel.layout.Layout.prototype;
		ThisLayout.prototype = new Super();
	})();

	ThisLayout.prototype.initData = function() {
		this.model = this.layout.config.model || {};
		var modelConfig = {};
		if (!co.isEmpty(this.model.config)) {
			modelConfig = JSON.parse(this.model.config);
		}
		this.modelConfig = modelConfig;
	};

	ThisLayout.prototype.getNewOneContainerView = function() {
		if (this.$containers.length > 0) {
			return this.$containers[0];
		}
		return $('<div></div>');
	};

	ThisLayout.prototype.initContent = function() {
		var $style = $('<style></style>');
		$style.html(this.model.csscontent);
		var $html = $('<div></div>');
		$html.html(this.model.htmlcontent);
		var models = this.modelConfig.models || [];
		var $containers = [];
		var $singles = [];
		var elementmodels = [];
		$(models).each(function(index, one) {
			if (one.type == 'single-container-model') {
				var $model = $html.find('[model-name="' + one.name + '"]');
				$containers.push($model);
			} else if (one.type == 'single-model') {
				var $model = $html.find('[model-name="' + one.name + '"]');
				$singles.push($model);
			} else if (one.type == 'single-element-model') {
				elementmodels.push(one);
			}
		});
		$($containers).each(function(index, $container) {
			$($container).empty();
		});
		this.$containers = $containers;
		this.$singles = $singles;
		this.elementmodels = elementmodels;
		this.$content.append($style);
		this.$content.append($html);
	};

	ThisLayout.prototype.clear = function() {

	}

	ThisLayout.prototype.appendOneData = function(config) {
		config = config || {};
		var data = config.data || {};
		var index = config.index || 0;
		var elementmodels = this.elementmodels || [];
		var $containers = this.$containers || [];
		var $singles = this.$singles || [];
		if ($singles.length == 0) {
			return;
		}
		var layoutConfig = this.layout.config || {};
		$($containers).each(function(index, $container) {
			var $one = null;
			var index_ = index + 1;
			if (index_ <= $singles.length) {
				$one = $singles[index_ - 1];
			} else {
				$one = $singles[($singles.length) % (index_)];
			}
			$one = $one.clone();
			$(elementmodels).each(function(index, elementmodel) {
				var dataname = elementmodel.name;
				dataname = layoutConfig[dataname];
				var value = data[dataname];
				var $el = $one.find('[model-name="' + elementmodel.name + '"]');
				var setvalueway = elementmodel.setvalueway;
				if (co.isEmpty(elementmodel.setvalueway)) {
					setvalueway = "text";
				}
				setvalueway = setvalueway.toLocaleLowerCase();
				if (setvalueway == 'html') {
					$el.html(value);
				} else if (setvalueway == 'src') {
					$el.removeAttr('src');
					$el.attr('path', value);
					$el.addClass('element-rule-image');
					$el.attr('use-file-server-url', 'true');
					co.element.init($one);
				} else if (setvalueway == 'bg') {
					$el.attr('path', value);
					$el.css('background-image', "url()");
					$el.addClass('element-rule-image');
					$el.attr('use-file-server-url', 'true');
					co.element.init($one);
				} else {
					$el.text(value);
				}
			});
			$container.append($one);
		});

	};

	ThisLayout.prototype.initButton = function(config) {

	};

	ThisLayout.prototype.getData = function() {
		var data = {};
		if (this.clickData) {
			data = this.clickData;
		}
		return data;
	};
	var ThisLayoutConfig = {
		name : "布局模型",
		hasElement : false,
		hasButton : false,
		columns : [],
		getColumns : function(data) {
			data = data || {};
			var model = data.model || {};
			var columns = [];
			if (!co.isEmpty(model.config)) {
				var modelConfig = JSON.parse(model.config);

				var models = modelConfig.models || [];
				$(models).each(function(index, model) {
					if (model.type == 'single-element-model') {
						var column = {
							text : model.text,
							name : model.name,
							inputtype : "text"
						}
						columns.push(column);
					}
				});
			}
			return columns;
		}
	};
	co.page.panel.layout.model.defind("MODEL", ThisLayoutConfig, ThisLayout);
})(window, jQuery);