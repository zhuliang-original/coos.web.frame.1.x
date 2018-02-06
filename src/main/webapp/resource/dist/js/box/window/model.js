(function() {
	var ModelWindow = function(config) {
		this.config = config;
		this.init();
		return this;
	}
	ModelWindow.prototype.init = function() {
		this.config.showLine = this.config.showLine || false;
		this.config.title = this.config.title;
		this.config.width = this.config.width || 700;
		this.config.data = this.config.data || {};
		this.openLine = this.config.openLine;
		// 标题
		this.title = this.config.title;
		this.data = this.config.data;
		this.url = this.config.url;
		this.isForm = this.config.isForm;
		this.callback = this.config.callback;
		// 模版类型
		this.model = this.config.model;
		// 视图初始化回调
		this.buildBeforeCallback = this.config.buildBeforeCallback;
		this.buildAfterCallback = this.config.buildAfterCallback;
		// 用户自定义宽高
		this.width = this.config.width;
		this.height = this.config.height;
		this.build();
	};

	ModelWindow.prototype.build = function() {
		var this_ = this;
		var isForm = this.isForm;
		var formWindow = null;
		var $model = $(this.model);
		if (co.isString(this.model)) {
			$model = $($('.' + this.model + '-model').html());
		}
		if (this.buildBeforeCallback) {
			this.buildBeforeCallback($model);
		}
		this.config.html = $model;
		var buttons = [];
		buttons[buttons.length] = {
			className : "core-bg-green core-white",
			label : isForm ? "保存" : "确认",
			bindEnterKey : true,
			callback : function() {
				if (isForm) {
					var data = co.form.validate($form);
					if (co.isEmpty(this_.url)) {
						this_.callback && this_.callback(data);
						formWindow.remove();
					} else {
						co.POST(this_.url, data, 'json', function(o) {
							var status = o.data;
							if (status.errcode == 0) {
								co.box.info('保存成功！');
								this_.callback && this_.callback(status.result);
								formWindow.remove();
							} else {
								co.box.info(status.errmsg);
							}
						}, false);
					}
				}
			}
		};
		this.config.buttons = buttons;
		this.config.cancelCallback = function() {
			formWindow.remove();
		};
		formWindow = co.box.window(this.config);

		if (this.openLine) {
			var width = formWindow.$model.width();
			var height = formWindow.$model.height();

		} else {
			formWindow.show();
		}
		if (this.buildAfterCallback) {
			this.buildAfterCallback(formWindow.$model);
		}
		if (isForm) {
			var $form = formWindow.$model;
			if (!co.isEmpty(this.config.form)) {
				$form = formWindow.$model.find(this.config.form);
			}
			co.form.clear($form);
			co.form.full($form, this.data);
		}
		this.modelWindow = formWindow;
	};
	co.box.window.model = function(config) {
		return new ModelWindow(config);
	}

})();