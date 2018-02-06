co.frame = new Object();
var user_info = null;
var project = null;
var project_config = null;
var themes = null;
(function() {
	var Frame = function(config) {
		config = config || {};
		this.container = config.container || 'body';

		this.user_info = config.user || null;
		this.project = config.project || {};
		this.project_config = this.project.config || {};
		this.themes = config.themes || this.project.themes || [];
		this.menus = config.menus || [];
		this.default_theme = co.frame.theme.getTheme();
		this.init();
	};

	Frame.prototype.init = function() {
		this.initView();
		this.initTheme();
		this.initThisTheme();
	};

	Frame.prototype.initView = function() {
		var $frame = $('<div class="coos-frame"></div>');

		var $headerbox = $('<div class="coos-header-box"></div>');
		var $header = $('<div class="coos-header"><div class="coos-header-left"></div><div class="coos-header-center"></div><div class="coos-header-right"></div></div>');

		$headerbox.append($header);
		$frame.append($headerbox);

		var $bodybox = $('<div class="coos-body-box"></div>');
		var $body = $('<div class="coos-body"><div class="coos-body-left"></div><div class="coos-body-center"></div><div class="coos-body-right"></div></div>');
		var $pagebox = $('<div class="coos-page-box"></div>');
		$bodybox.append($body);
		$body.find('.coos-body-center').append($pagebox);
		$frame.append($bodybox);

		var $footerbox = $('<div class="coos-footer-box"></div>');
		var $footer = $('<div class="coos-footer"></div>');
		$footerbox.append($footer);
		$frame.append($footerbox);

		this.$frame = $frame;
		this.$headerbox = $headerbox;
		this.$header = $header;
		this.$bodybox = $bodybox;
		this.$body = $body;
		this.$pagebox = $pagebox;
		this.$footerbox = $footerbox;
		this.$footer = $footer;

	};

	Frame.prototype.initTheme = function() {
		var config = {
			theme : null,
			menus : this.menus,
			$pagebox : this.$pagebox,
			$frame : this.$frame
		};
		var theme_map = {};
		$(this.themes).each(function(index, theme) {
			config.theme = theme;
			var themeObject = co.frame.theme.create(config);
			theme_map[config.theme.themeid] = themeObject;

		});

		config.theme = this.default_theme;
		var themeObject = co.frame.theme.create(config);
		theme_map[config.theme.themeid] = themeObject;

		this.theme_map = theme_map;
	};

	Frame.prototype.view = function() {
		if (!this.appended) {
			this.appended = true;
			this.$pagebox.append($(this.container).children());
			$(this.container).append(this.$frame);
			this.initThisThemeView();
		}
	};

	Frame.prototype.changeFull = function(status) {
		if (status) {
			this.$frame.addClass('coos-full-page');
		} else {
			this.$frame.removeClass('coos-full-page');
		}
	};

	Frame.prototype.initThisTheme = function() {
		var islg = this.islg || co.window.islg;
		var ismd = this.ismd || co.window.ismd;
		var issm = this.issm || co.window.issm;
		var isxs = this.isxs || co.window.isxs;
		var this_theme = null;
		var for_default_theme = null;
		var for_all_theme = null;

		$(this.themes).each(function(index, theme) {
			if (this_theme != null) {
				return;
			}
			if (theme.open == 1 || theme.open == true) {
				var forsizes = theme.forsizes;
				if (!coos.isEmpty(theme.forsizes)) {
					forsizes = forsizes.toLocaleLowerCase();
					if (islg && forsizes.indexOf('lg') >= 0) {
						this_theme = theme;
					} else if (ismd && forsizes.indexOf('md') >= 0) {
						this_theme = theme;
					} else if (issm && forsizes.indexOf('sm') >= 0) {
						this_theme = theme;
					} else if (isxs && forsizes.indexOf('xs') >= 0) {
						this_theme = theme;
					}
					if (forsizes.indexOf('all') >= 0) {
						for_all_theme = theme;
					}
				}
				if (theme.fordefault == 1 || theme.fordefault == true) {
					for_default_theme = theme;
				}

			}
		});
		if (this_theme == null) {
			if (for_all_theme != null) {
				this_theme = for_all_theme;
			} else {
				this_theme = for_default_theme;
			}
		}

		if (this_theme == null) {
			this_theme = this.default_theme;
		}
		this_theme.config = this_theme.config || {};
		if (co.isString(this_theme.config)) {
			this_theme.config = eval('(' + this_theme.config + ')');
		}
		this.this_theme = this_theme;
	};

	Frame.prototype.initThisThemeView = function() {
		if (this.lastinitviewtheme != null && this.lastinitviewtheme == this.this_theme) {
			return;
		}
		this.lastinitviewtheme = this.this_theme;
		var ThemeObject = this.theme_map[this.this_theme.themeid];
		if (ThemeObject) {
			this.this_theme_object = ThemeObject;
			ThemeObject.initView();
		}
	};

	co.frame.init = function(config) {
		co.frame.frame = co.frame.create(config);
		return co.frame.frame;
	};

	co.frame.create = function(config) {
		return new Frame(config);
	};

})();

co.page.pushLoadCallback(function() {
	if (co.frame.frame) {
		if (!co.frame.firstFrameViewed) {
			co.frame.firstFrameViewed = true;
			co.frame.frame.view();
		}
	}
});
$(function() {
	co.frame.changeFull($('#coos-need-full-page').length > 0 && $('#coos-need-full-page').closest('.coos-box-window').length == 0);
});