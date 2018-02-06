(function() {
	var TemplateMap = {};
	co.template = co.template || {};
	co.template.load = function(content) {
		content = content || $('body');
		var $elements = $(content).find('[coos-template]');
		$elements.each(function(index, element) {
			var $element = $(element);
			if ($element.find('[coos-template]').length > 0) {
				co.template.load($element);
			}
			var name = $element.attr('coos-template');
			if (!co.isEmpty(name)) {
				if (TemplateMap[name] != null) {
					console.log(name + "模版已经存在");
				}
				$element.removeAttr('coos-template');
				TemplateMap[name] = element;
			} else {
			}
			$element.remove();
		});
	};
	co.template.get = function(name) {
		if (co.isEmpty(name)) {
			throw new Error('请传入模版名称');
		}
		var element = TemplateMap[name];
		if (element == null) {
			throw new Error(name + '模版不存在');
		}
		return $(element).clone();
	};
	co.template.create = function(config, callback) {
		config = config || {};
		if (!co.isEmpty(config.name)) {
			var name = config.name;
			var element = co.template.get(name);
			if (element == null) {
				throw new Error(name + '模版不存在');
			}
			config.$template = element;
		}
		if (config.$template == null) {
			throw new Error('$template未设置');
		}
		return new Template(config, callback);
	};
	var Template = function(config, callback) {
		config = config || {};
		this.config = config;
		var methods = config.methods || {};
		var watch = config.watch || {};
		var this_ = this;
		co.plugins.load("vue", function() {
			this_.data = new Vue({
				el : config.$template[0],
				data : config.data || {},
				methods : methods,
				watch : watch
			});
			callback && callback(this_);
		});
	}
})();