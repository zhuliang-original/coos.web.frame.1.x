(function() {
	co.component = co.component || new Object();

	var Line = function(config) {
		this.config = config || {};
		this.init();
		return this;
	};

	Line.prototype.init = function() {
		this.lines = this.config.lines || [];
		this.zIndex = this.config.zIndex || 100;
		this.initView();
	};
	function createLineGroup(line) {
		if (line == null) {
			return null;
		}
		var start = line.start;
		var end = line.end;
		var $start = $('<div class="core-component-line-point"></div>');
		var $line = $('<div class="core-component-line"></div>');
		var $end = $('<div class="core-component-line-point"></div>');
		$start.css('left', start.x);
		$start.css('top', start.y);
		$line.css('left', start.x);
		$line.css('top', start.y);
		$end.css('left', end.x);
		$end.css('top', end.y);

		var a = end.y - start.y;
		var b = end.x - start.x;
		var width = 0;
		var angle = 0;
		if (a == 0 && b == 0) {
			width = 0;
			angle = 0;
		} else if (a == 0 && b > 0) {
			width = b;
			angle = 0;
		} else if (a == 0 && b < 0) {
			width = -b;
			angle = 180;
		} else if (b == 0 && a > 0) {
			width = a;
			angle = 90;
		} else if (b == 0 && a < 0) {
			width = -a;
			angle = 270;
		} else {
			var c = Math.sqrt(a * a + b * b);
			var round = {};
			round.r = c / 2;
			round.x = b / 2;
			round.y = a / 2;
			width = c;
			if (a < 0 && b < 0) {
				angle = 270 - 90 + (Math.asin(-a / c) * 360 / (2 * Math.PI));
			} else if (a < 0 && b > 0) {
				angle = 360 - 90 + (Math.asin(-a / c) * 360 / (2 * Math.PI));
			} else if (a > 0 && b < 0) {
				angle = 90 + (Math.asin(a / c) * 360 / (2 * Math.PI));

			} else if (a > 0 && b > 0) {
				angle = (Math.asin(a / c) * 360 / (2 * Math.PI));
			}
		}
		$line.attr('core-width', width);
		$line.css("transform-origin", "0 0");
		$line.css("transform", "rotate(" + angle + "deg)");
		$line.css("-ms-transform", "rotate(" + angle + "deg)");
		$line.css("-moz-transform", "rotate(" + angle + "deg)");
		$line.css("-webkit-transform", "rotate(" + angle + "deg)");
		$line.css("-o-transform", "rotate(" + angle + "deg)");

		var $body = $('body');
		var lineGroup = {};
		lineGroup.$start = $start;
		lineGroup.$end = $end;
		lineGroup.$line = $line;
		lineGroup.time = line.time;
		$body.append($start);
		$body.append($line);
		$body.append($end);
		return lineGroup;
	}
	Line.prototype.initView = function() {
		var lineGroups = [];
		$(this.lines).each(function(index, line) {
			if (line != null) {
				if (co.isArray(line)) {
					var gs = [];
					$(line).each(function(index, one) {
						var lineGroup = createLineGroup(one);
						gs[gs.length] = lineGroup;
					});
					lineGroups[lineGroups.length] = gs;
				} else {
					var lineGroup = createLineGroup(line);
					lineGroups[lineGroups.length] = lineGroup;
				}
			}
		});
		this.lineGroups = lineGroups;
	};

	Line.prototype.showLineGroup = function(lineGroup, callback) {
		var this_ = this;
		if (lineGroup != null) {
			if (co.isArray(lineGroup)) {
				$(lineGroup).each(function(index, one) {
					if (index == (lineGroup.length - 1)) {
						this_.showLineGroup(one, callback);
					} else {
						this_.showLineGroup(one);
					}
				});
			} else {
				var time = lineGroup.time || 100;
				var $start = lineGroup.$start;
				var $end = lineGroup.$end;
				var $line = lineGroup.$line;
				if (this_.showed) {
					$start.addClass('core-show');
					$line.addClass('core-show');
				} else {
					$start.removeClass('core-show');
					$line.removeClass('core-show');
				}
				var width = $line.attr('core-width');
				if (!this_.showed) {
					width = 0;
				}
				$line.animate({
					width : width + "px"
				}, time, function() {
					if (this_.showed) {
						$end.addClass('core-show');
					} else {
						$end.removeClass('core-show');
					}
					callback && callback();
				});
			}
		}
	};

	Line.prototype.hideLineGroup = function(lineGroup, callback) {
		var this_ = this;
		if (lineGroup != null) {
			if (co.isArray(lineGroup)) {
				$(lineGroup).each(function(index, one) {
					if (index == (lineGroup.length - 1)) {
						this_.hideLineGroup(one, callback);
					} else {
						this_.hideLineGroup(one);
					}
				});
			} else {
				var time = lineGroup.time || 100;
				var $start = lineGroup.$start;
				var $end = lineGroup.$end;
				var $line = lineGroup.$line;
				if (this_.showed) {
					$end.addClass('core-show');
					$line.addClass('core-show');
				} else {
					$end.removeClass('core-show');
					$line.removeClass('core-show');
				}
				var width = $line.attr('core-width');
				if (!this_.showed) {
					width = 0;
				}
				$line.animate({
					width : width + "px"
				}, time, function() {
					if (this_.showed) {
						$start.addClass('core-show');
					} else {
						$start.removeClass('core-show');
					}
					callback && callback();
				});
			}
		}
	};

	Line.prototype.show = function() {
		if (this.showed) {
			return;
		}
		this.showed = true;
		var this_ = this;
		var callback = this.config.showEnd;
		var lineGroups = this.lineGroups;
		function showLine(index) {
			if (index < 0 || index >= lineGroups.length) {
				callback && callback();
				return;
			}
			var lineGroup = lineGroups[index];
			this_.showLineGroup(lineGroup, function() {
				index = index + 1;
				showLine(index);
			});
		}
		showLine(0);
	};
	Line.prototype.hide = function() {
		if (!this.showed) {
			return;
		}
		this.showed = false;
		var this_ = this;
		var callback = this.config.hideEnd;

		var lineGroups = this.lineGroups;
		function hideLine(index) {

			if (index < 0 || index >= lineGroups.length) {
				callback && callback();
				return;
			}
			var lineGroup = lineGroups[index];

			this_.hideLineGroup(lineGroup, function() {
				index = index - 1;
				hideLine(index);
			});
		}
		hideLine(lineGroups.length - 1);
	};
	Line.prototype.remove = function() {

	};
	co.component.line = function(config) {
		var t = new Line(config);
		return t;
	};

})();