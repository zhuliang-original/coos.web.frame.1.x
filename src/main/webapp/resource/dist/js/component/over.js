(function() {

	var OverTool = function(config) {
		this.config = config || {};
		this.init();
		return this;
	};

	OverTool.prototype.init = function() {
		this.overid = co.getNumber();
		this.$element = $(this.config.element);
		this.$content = $(this.config.content);
		this.width = this.config.width;
		this.height = this.config.height;
		this.initView();
		this.initEvent();
	};
	OverTool.prototype.initView = function() {
		this.$view = $('<div class="coos-over-tool-window"><div class="coos-over-tool-window-container"><div class="coos-over-tool-window-content"></div></div></div>');
		this.$view.find('.coos-over-tool-window-content').append(this.$content);
		$('body').append(this.$view);
	};
	OverTool.prototype.initPlace = function() {
		if (this.initPlaceed) {
			return;
		}
		var elementPlace = {};
		this.initPlaceed = true;
		var this_ = this;
		this.elementX = $(this.$element).offset().left;
		this.elementY = $(this.$element).offset().top;
		this.elementW = $(this.$element).width();
		this.elementH = $(this.$element).height();
		this.initLine();

		this_.$view.css('width', this_.width);
		this_.$view.css('height', this_.hegiht);
	};
	OverTool.prototype.initLine = function() {
		var lines = [];
		var width = Number(this.width);
		var height = Number(this.height);
		var line1 = {};
		line1.start = {
			x : Number(this.elementX) + Number(this.elementW),
			y : Number(this.elementY) + Number(this.elementH)
		};
		line1.end = {
			x : Number(line1.start.x) + 10,
			y : Number(line1.start.y) + 50
		};
		lines[lines.length] = line1;

		var line2 = {};
		line2.start = {
			x : line1.end.x,
			y : line1.end.y
		};
		line2.end = {
			x : Number(line2.start.x) + 50,
			y : Number(line2.start.y) + 10
		};
		lines[lines.length] = line2;

		var line3 = {};
		line3.time = 300;
		line3.start = {
			x : line2.end.x,
			y : line2.end.y
		};
		line3.end = {
			x : Number(line3.start.x) + width,
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
			y : Number(line4.start.y) + height
		};

		var line5 = {};
		line5.time = 300;
		line5.start = {
			x : line4.end.x,
			y : line4.end.y
		};
		line5.end = {
			x : line5.start.x - width,
			y : line5.start.y
		};

		var line6 = {};
		line6.time = 300;
		line6.start = {
			x : line5.end.x,
			y : line5.end.y
		};
		line6.end = {
			x : line6.start.x,
			y : line6.start.y - height
		};
		lines[lines.length] = [ line3, line4, line5, line6 ];

		var this_ = this;
		this_.$view.css('left', line2.end.x);
		this_.$view.css('top', line2.end.y);
		this.line = co.component.line({
			lines : lines,
			showEnd : function() {
				if (this_.showed) {
					this_.$view.addClass('coos-show');
				} else {
					this_.$view.removeClass('coos-show');
				}
			},
			hideEnd : function() {
				if (this_.showed) {
					this_.$view.addClass('coos-show');
				} else {
					this_.$view.removeClass('coos-show');
				}
			}
		});
	};
	OverTool.prototype.show = function() {
		if (this.showed) {
			return;
		}
		this.showed = true;
		this.line.show();
	};
	OverTool.prototype.hide = function() {
		if (!this.showed) {
			return;
		}
		this.showed = false;
		this.line.hide();
		this.$view.removeClass('coos-show');
	};
	OverTool.prototype.initEvent = function() {
		var this_ = this;
		$(this.$element).attr('coos-over-id', this.overid);
		$(this.$element).mouseenter(function() {
			this_.initPlace();
			this_.show();
		});
		$(this.$element).mouseleave(function(e) {
			this_.hide();
		});
	};

	co.component.over = function(config) {
		var t = new OverTool(config);
		return t;
	};

})();