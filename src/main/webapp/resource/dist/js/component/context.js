(function() {
	var options = {
		fadeSpeed : 100,
		filter : function($obj) {
			// Modify $obj, Do not return
		},
		above : 'auto',
		preventDoubleContext : true,
		compress : false
	};

	var Context = function(opts) {
		this.initialize(opts);
		var selector = this.options.selector;
		var menus = this.options.menus;
		this.addContext(selector, menus);
		return this;
	};

	Context.prototype.initialize = function(opts) {
		var options = this.options = $.extend({}, options, opts);
		$(document).on('click', 'html', function() {
			$('.core-dropdown-context').fadeOut(options.fadeSpeed, function() {
				$('.core-dropdown-context').css({
					display : ''
				}).find('.drop-left').removeClass('drop-left');
			});
		});
		if (options.preventDoubleContext) {
			$(document).on('contextmenu', '.core-dropdown-context', function(e) {
				e.preventDefault();
			});
		}
		$(document).on('mouseenter', '.core-dropdown-submenu', function() {
			var $sub = $(this).find('.core-dropdown-context-sub:first'), subWidth = $sub.width(), subLeft = $sub.offset().left, collision = (subWidth + subLeft) > window.innerWidth;
			if (collision) {
				$sub.addClass('drop-left');
			}
		});
	};

	Context.prototype.updateOptions = function(opts) {
		this.options = $.extend({}, this.options, opts);
	};
	Context.prototype.buildMenu = function(data, id, subMenu) {
		var subClass = (subMenu) ? ' core-dropdown-context-sub' : '', compressed = options.compress ? ' core-compressed-context' : '', $menu = $('<ul class="core-dropdown-menu core-dropdown-context'
				+ subClass + compressed + '" id="dropdown-' + id + '"></ul>');
		var i = 0, linkTarget = '';
		for (i; i < data.length; i++) {
			if (typeof data[i].divider !== 'undefined') {
				$menu.append('<li class="divider"></li>');
			} else if (typeof data[i].header !== 'undefined') {
				$menu.append('<li class="core-nav-header">' + data[i].header + '</li>');
			} else {
				if (typeof data[i].href == 'undefined') {
					data[i].href = '#';
				}
				if (typeof data[i].target !== 'undefined') {
					linkTarget = ' target="' + data[i].target + '"';
				}
				if (typeof data[i].subMenu !== 'undefined') {
					$sub = ('<li class="core-dropdown-submenu"><a tabindex="-1" href="' + data[i].href + '">' + data[i].text + '</a></li>');
				} else {
					$sub = $('<li><a tabindex="-1" href="' + data[i].href + '"' + linkTarget + '>' + data[i].text + '</a></li>');
				}
				if (typeof data[i].action !== 'undefined') {
					var actiond = new Date(), actionID = 'event-' + actiond.getTime() * Math.floor(Math.random() * 100000), eventAction = data[i].action;
					$sub.find('a').attr('id', actionID);
					$('#' + actionID).addClass('core-context-event');
					$(document).on('click', '#' + actionID, eventAction);
				}
				$menu.append($sub);
				if (typeof data[i].subMenu != 'undefined') {
					var subMenuData = this.buildMenu(data[i].subMenu, id, true);
					$menu.find('li:last').append(subMenuData);
				}
			}
			if (typeof options.filter == 'function') {
				options.filter($menu.find('li:last'));
			}
		}
		return $menu;
	};
	Context.prototype.updateOptions = function(selector, data) {

		var d = new Date(), id = d.getTime(), $menu = buildMenu(data, id);

		$('body').append($menu);

		$(document).on('contextmenu', selector, function(e) {
			e.preventDefault();
			e.stopPropagation();

			$('.core-dropdown-context:not(.core-dropdown-context-sub)').hide();

			$dd = $('#dropdown-' + id);
			if (typeof options.above == 'boolean' && options.above) {
				$dd.addClass('core-dropdown-context-up').css({
					top : e.pageY - 20 - $('#dropdown-' + id).height(),
					left : e.pageX - 13
				}).fadeIn(options.fadeSpeed);
			} else if (typeof options.above == 'string' && options.above == 'auto') {
				$dd.removeClass('core-dropdown-context-up');
				var autoH = $dd.height() + 12;
				if ((e.pageY + autoH) > $('html').height()) {
					$dd.addClass('core-dropdown-context-up').css({
						top : e.pageY - 20 - autoH,
						left : e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				} else {
					$dd.css({
						top : e.pageY + 10,
						left : e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				}
			}
		});
	};

	Context.prototype.destroyContext = function(selector) {
		$(document).off('contextmenu', selector).off('click', '.core-context-event');
	};
	Context.prototype.addContext = function(selector, data) {

		var d = new Date(), id = d.getTime(), $menu = this.buildMenu(data, id);

		$('body').append($menu);
		$(selector).on('contextmenu', function(e) {
			e.preventDefault();
			e.stopPropagation();

			$('.core-dropdown-context:not(.core-dropdown-context-sub)').hide();

			$dd = $('#dropdown-' + id);
			if (typeof options.above == 'boolean' && options.above) {
				$dd.addClass('core-dropdown-context-up').css({
					top : e.pageY - 20 - $('#dropdown-' + id).height(),
					left : e.pageX - 13
				}).fadeIn(options.fadeSpeed);
			} else if (typeof options.above == 'string' && options.above == 'auto') {
				$dd.removeClass('core-dropdown-context-up');
				var autoH = $dd.height() + 12;
				if ((e.pageY + autoH) > $('html').height()) {
					$dd.addClass('core-dropdown-context-up').css({
						top : e.pageY - 20 - autoH,
						left : e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				} else {
					$dd.css({
						top : e.pageY + 10,
						left : e.pageX - 13
					}).fadeIn(options.fadeSpeed);
				}
			}
		})
	};

	co.component.context = function(config) {
		var t = new Context(config);
		return t;
	};

})();