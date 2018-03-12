(function() {
	var BaseWindow = function(config) {
		this.config = config;
		this.init();
		return this;
	}
	BaseWindow.prototype.init = function() {
		// 标题
		this.title = this.config.title;
		// 内容代码
		this.html = this.config.html;
		// 按钮
		this.buttons = this.config.buttons;
		// 关闭回调
		this.cancelCallback = this.config.cancelCallback;
		// 用户自定义宽高
		this.width = this.config.width;
		this.height = this.config.height;
		this.build();
	};

	BaseWindow.prototype.build = function() {
		this.$model = $(co.box.html.window);
		this.$model.find('.coos-box-title').text(co.config.label.title);
		this.$model.find('.coos-box-footer .coos-box-define').text(co.config.label.define);
		this.$model.find('.coos-box-footer .coos-box-cancel').text(co.config.label.cancel);
		this.$content = $(this.html);
		this.$model.find('.coos-box-center').append(this.$content);
		if (this.title) {
			this.$model.find('.coos-box-title').text(this.title);
		}
		if (this.width) {
			this.$model.find('.coos-box-content').css("width", this.width);
		}
		if (this.height) {
			this.$model.find('.coos-box-content').css("height", this.height);
		}
		this.$model.hide();
		var this_ = this;
		var $keyDownButton = null;
		$(this.buttons).each(function(index, button) {
			var $button = $("<a type=\"button\" class=\"coos-btn coos-box-button \">" + button.label + "</a>");
			if (button.html) {
				$button = $(button.html);
				$button.addClass('coos-box-button');
			}
			if (!co.isEmpty(button.className)) {
				$button.addClass(button.className);
			}
			if (button.bindEnterKey) {
				$keyDownButton = $button;
			}
			$button.attr('style', button.style);
			this_.$model.find('.coos-box-footer .coos-box-cancel').before($button);
			$button.click(function() {
				button.callback && button.callback();
			});
		});

		this.$model.attr('tabindex', 1).on('keydown', function(event) {
			var target, code, tag;
			if (!event) {
				event = window.event;
				target = event.srcElement;
				code = event.keyCode;
			} else {
				target = event.target;
				code = event.keyCode;
			}
			if (code == 13) {
				tag = target.tagName;
				if (tag != "TEXTAREA") {
					if ($keyDownButton != null) {
						$keyDownButton.click();
						return false;
					}
				} else {
					return true;
				}
			}
		});
		$('body').append(this.$model);
	};
	BaseWindow.prototype.initLine = function() {
		if (this.config.showLine) {
			var width = this.$model.find('>.coos-box-content').width();
			var height = this.$model.find('>.coos-box-content').height();
			var startX = this.$model.find('>.coos-box-content').offset().left;
			var startY = this.$model.find('>.coos-box-content').offset().top;
			startX = startX - 2;
			startY = startY - 2;
			width = width + 4;
			height = height + 4;
			var lines = [];
			var line1 = {};
			line1.time = 300;
			line1.start = {
				x : startX,
				y : startY
			};
			line1.end = {
				x : line1.start.x + width,
				y : line1.start.y
			};

			var line2 = {};
			line2.time = 300;
			line2.start = {
				x : line1.end.x,
				y : line1.end.y
			};
			line2.end = {
				x : line2.start.x,
				y : line2.start.y + height
			};

			var line3 = {};
			line3.time = 300;
			line3.start = {
				x : line2.end.x,
				y : line2.end.y
			};
			line3.end = {
				x : line3.start.x - width,
				y : line3.start.y
			};

			var line4 = {};
			line4.time = 300;
			line4.start = {
				x : line3.end.x,
				y : line3.end.y
			};
			line4.end = {
				x : line4.start.x,
				y : line4.start.y - height
			};
			lines[lines.length] = [ line1, line2, line3, line4 ];

			var this_ = this;
			this.line = co.component.line({
				lines : lines,
				showEnd : function() {
					if (this_.showed) {
						this_.$model.find('.coos-box-center').scrollTop(0);
						$("body").addClass('coos-over-hidden');
						this_.$model.show();
					} else {
						$("body").removeClass('coos-over-hidden');
						this_.$model.hide();
					}
				},
				hideEnd : function() {
					if (this_.showed) {
						this_.$model.find('.coos-box-center').scrollTop(0);
						$("body").addClass('coos-over-hidden');
						this_.$model.show();
					} else {
						$("body").removeClass('coos-over-hidden');
						this_.$model.hide();
					}
				}
			});
		}
	};
	BaseWindow.prototype.hide = function() {
		this.hide_();
	};
	BaseWindow.prototype.hide_ = function() {
		if (!this.showed) {
			return;
		}
		this.showed = false;
		if (this.config.showLine) {
			this.line.hide();
		} else {
			$("body").removeClass('coos-over-hidden');
			this.$model.hide();
		}
	};
	BaseWindow.prototype.remove = function() {
		this.remove_();
	};
	BaseWindow.prototype.remove_ = function() {
		$("body").removeClass('coos-over-hidden');
		this.$model.remove();

		if (this.config.showLine) {
			this.line.remove();
		}
	};
	BaseWindow.prototype.show_ = function() {
		if (this.showed) {
			return;
		}
		this.showed = true;
		if (this.config.showLine) {
			this.initLine();
			this.$model.hide();
			this.line.show();
		} else {
			this.$model.find('.coos-box-center').scrollTop(0);
			$("body").addClass('coos-over-hidden');
			this.$model.show();
		}
	};
	BaseWindow.prototype.show = function() {
		$("body").addClass('coos-over-hidden');
		var this_ = this;
		this.$model.show();
		co.element.init(this.$model);
		var w = co.getWidth();
		var h = co.getHeight();
		var $content = this.$model.find('.coos-box-content');
		var $width = $content.outerWidth();
		var $height = $content.outerHeight();
		if (!co.isEmpty(this.config.height) && this.config.height == 'auto') {
			this.$model.find('.coos-box-content').css("top", 100);
		} else {

			this.$model.find('.coos-box-center').css('height', $height - 90);
			var $cenheight = this.$model.find('.coos-box-center').outerHeight();
			if (!co.isEmpty(this.config.height)) {
				if ($height > (h - 100)) {
					var model_center_height = $height - 90;
					this.$model.find('.coos-box-center').css('height', model_center_height);
					this.$model.find('.coos-box-content').css("top", 50);
				} else {
					if ($cenheight > $height) {
						var model_content_top = (h - $height) / 2 - 40;
						var model_content_height = $height - 90;
						this.$model.find('.coos-box-center').css('height', model_content_height);
						this.$model.find('.coos-box-content').css("top", model_content_top);
					} else {
						var model_content_top = (h - $height) / 2 - 40;
						this.$model.find('.coos-box-content').css("top", model_content_top);
					}
				}
			} else {
				if ($height > (h - 100)) {
					var model_center_height = h - 100 - 80;
					this.$model.find('.coos-box-center').css('height', model_center_height);
					this.$model.find('.coos-box-content').css("top", 50);
				} else if ($cenheight > $height) {
					var model_content_top = (h - $height) / 2 - 40;
					var model_content_height = $height - 90;
					this.$model.find('.coos-box-center').css('height', model_content_height);
					this.$model.find('.coos-box-content').css("top", model_content_top);
				} else {
					var model_content_top = (h - $height) / 2 - 40;
					this.$model.find('.coos-box-content').css("top", model_content_top);
				}
			}
		}

		this.$model.find('.coos-box-cancel').click(function() {
			if (co.isFunction(this_.cancelCallback)) {
				var result = this_.cancelCallback();
				if (!co.isBoolean(result) || result) {
					this_.hide();
				}
			} else {
				this_.hide();
			}
		});
		if (this.config.move) {
			if (!this.initmoveed) {
				this.initmoveed = true;
				var $model = this.$model;
				$model.find('.coos-box-cover').hide();
				var $content = $model.find('.coos-box-content');
				var contentTop = $content.offset().top;
				var contentLeft = $content.offset().left;
				$model.css('position', 'absolute').css('z-index', '0').css('top', contentTop).css('left', contentLeft);
				$model.css('right', 'auto').css('bottom', 'auto');
				$content.css('position', 'relative');
				$content.find('.coos-box-header').addClass('handle');
				$content.find('.coos-box-header').css('cursor', 'move');
				$model.addClass('coos-move-tool');
				co.element.initMoveTool();
			}
			$content.css('top', '0px');
		}
		this.show_();
	};
	co.box.window = function(config) {
		return new BaseWindow(config);
	}
})();