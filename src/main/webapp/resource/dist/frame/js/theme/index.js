co.frame.theme = new Object();
(function() {
	var Theme = function(config) {
		config = config || {};
		this.config = config;
		var $frame = config.$frame || $('.coos-frame');
		this.$framebox = config.$framebox || $('body');
		this.$frame = $frame;
		this.$headerbox = config.$headerbox || $frame.find('.coos-header-box');
		this.$header = config.$header || $frame.find('.coos-header');
		this.$bodybox = config.$bodybox || $frame.find('.coos-body-box');
		this.$body = config.$body || $frame.find('.coos-body');
		this.$pagebox = config.$pagebox || $frame.find('.coos-page-box');
		this.$footerbox = config.$footerbox || $frame.find('.coos-footer-box');
		this.$footer = config.$footer || $frame.find('.coos-footer');
		this.theme = config.theme;
		this.menus = config.menus || [];
		this.menu_object = co.frame.menu.create({
			menus : this.menus
		});
		this.init();
		jQuery.extend(true, config.theme, this.theme);
		this.initData();
		return this;
	};

	Theme.prototype.init = function() {
		var config = this.config;
		var theme = config.theme;
		theme.header = theme.header || {};
		theme.body = theme.body || {};
		theme.footer = theme.footer || {};
		if (theme.config != null && coos.isString(theme.config)) {
			theme.config = JSON.parse(theme.config);
		}
		theme.config = theme.config || {};
		if (theme.header.config != null && coos.isString(theme.header.config)) {
			theme.header.config = JSON.parse(theme.header.config);
		}
		theme.header.config = theme.header.config || {};
		if (theme.body.config != null && coos.isString(theme.body.config)) {
			theme.body.config = JSON.parse(theme.body.config);
		}
		theme.body.config = theme.body.config || {};
		if (theme.footer.config != null && coos.isString(theme.footer.config)) {
			theme.footer.config = JSON.parse(theme.footer.config);
		}
		theme.footer.config = theme.footer.config || {};
	};

	Theme.prototype.initData = function() {

	};

	Theme.prototype.getStyle = function() {
		return "";
	};

	Theme.prototype.getHeaderHeight = function() {
		var theme = this.theme;
		var headerconfig = theme.header.config;
		var headerheight = headerconfig.height;
		if (!this.$headerbox.is(':visible')) {
			return 0;
		}
		if (this.$frame.hasClass('coos-full-vertical') || this.$frame.hasClass('coos-full-page')) {
			return 0;
		}
		return this.$headerbox.outerHeight();
	};
	Theme.prototype.getFooterHeight = function() {
		var theme = this.theme;
		var footerconfig = theme.footer.config;
		var footerheight = footerconfig.height;
		if (!this.$footerbox.is(':visible')) {
			return 0;
		}
		if (this.$frame.hasClass('coos-full-vertical')) {
			return 0;
		}
		var h = this.$footerbox.outerHeight();
		if (theme.footer.fixed) {
			var $frame = this.$frame;
			var number = coos.getStyle($frame, 'padding-bottom');
			if (!coos.isEmpty(number)) {
				if (("" + number).indexOf('px') >= 0) {
					number = Number(("" + number).replace('px', ''));
				}
				if (("" + number).indexOf('PX') >= 0) {
					number = Number(("" + number).replace('PX', ''));
				}
				return number;
			}
		}
		return h;
	};
	Theme.prototype.getBodyMenuHeight = function() {
		var fixedleft = this.theme.body.fixedleft;
		var fixedright = this.theme.body.fixedright;
		if (fixedleft) {
			if (this.$body.find('.coos-body-left .coos-body-menu').length > 0) {
				return 0;
			}
		}
		if (fixedright) {
			if (this.$body.find('.coos-body-right .coos-body-menu').length > 0) {
				return 0;
			}
		}
		var menu_height = this.$body.find('.coos-body-menu-top').outerHeight() + this.$body.find('.coos-body-menu-center').outerHeight() + this.$body.find('.coos-body-menu-bottom').outerHeight();

		return menu_height;
	};
	Theme.prototype.getBodyMarginTop = function() {
		if (this.$frame.hasClass('coos-full-vertical') || this.$frame.hasClass('coos-full-page')) {
			return 0;
		}
		var $bodybox = this.$bodybox;
		var number = coos.getStyle($bodybox, 'margin-top');
		if (!coos.isEmpty(number)) {
			if (("" + number).indexOf('px') >= 0) {
				number = Number(("" + number).replace('px', ''));
			}
			if (("" + number).indexOf('PX') >= 0) {
				number = Number(("" + number).replace('PX', ''));
			}
			return number;
		}
		return 0;

	};
	Theme.prototype.getBodyMarginBottom = function() {
		if (this.$frame.hasClass('coos-full-vertical') || this.$frame.hasClass('coos-full-page')) {
			return 0;
		}
		var $bodybox = this.$bodybox;
		var number = coos.getStyle($bodybox, 'margin-bottom');
		if (!coos.isEmpty(number)) {
			if (("" + number).indexOf('px') >= 0) {
				number = Number(("" + number).replace('px', ''));
			}
			if (("" + number).indexOf('PX') >= 0) {
				number = Number(("" + number).replace('PX', ''));
			}
			return number;
		}
		return 0;

	};
	Theme.prototype.getObjectConfigData = function(place, name) {
		var theme = this.theme;
		var config = theme[place].config;
		var value = config[name];
		if (coos.isEmpty(value)) {
			return null;
		}
		return "" + value;
	};

	Theme.prototype.getObjectStyle = function(place) {

		var overcolor = this.getObjectConfigData(place, "overcolor");
		var fixed = this.theme[place].fixed;
		var fixedleft = this.theme[place].fixedleft;
		var fixedcenter = this.theme[place].fixedcenter;
		var fixedright = this.theme[place].fixedright;
		var overbackgroundcolor = this.getObjectConfigData(place, "overbackgroundcolor");
		var overacolor = this.getObjectConfigData(place, "overacolor");
		var overabackgroundcolor = this.getObjectConfigData(place, "overabackgroundcolor");
		var menuopencolor = this.getObjectConfigData(place, "menuopencolor");
		var menuopenbackgroundcolor = this.getObjectConfigData(place, "menuopenbackgroundcolor");
		var menuopenacolor = this.getObjectConfigData(place, "menuopenacolor");
		var menuopenabackgroundcolor = this.getObjectConfigData(place, "menuopenabackgroundcolor");
		var activecolor = this.getObjectConfigData(place, "activecolor");
		var activebackgroundcolor = this.getObjectConfigData(place, "activebackgroundcolor");
		var activeacolor = this.getObjectConfigData(place, "activeacolor");
		var activeabackgroundcolor = this.getObjectConfigData(place, "activeabackgroundcolor");

		var color = "" + (this.theme[place].color || "");
		var backgroundcolor = "" + (this.theme[place].backgroundcolor || "");
		var contentcolor = "" + (this.theme[place].contentcolor || "");
		var contentbackgroundcolor = "" + (this.theme[place].contentbackgroundcolor || "");
		var leftcolor = "" + (this.theme[place].leftcolor || "");
		var leftbackgroundcolor = "" + (this.theme[place].leftbackgroundcolor || "");
		var rightcolor = "" + (this.theme[place].rightcolor || "");
		var rightbackgroundcolor = "" + (this.theme[place].rightbackgroundcolor || "");

		var width = "" + (this.theme[place].width || "");
		var minwidth = "" + (this.theme[place].minwidth || "");
		var maxwidth = "" + (this.theme[place].maxwidth || "");
		var leftwidth = "" + (this.theme[place].leftwidth || "");
		var rightwidth = "" + (this.theme[place].rightwidth || "");
		var height = "" + (this.theme[place].height || "");
		var contentwidth = "" + (this.theme[place].contentwidth || "");
		var contentminwidth = "" + (this.theme[place].contentminwidth || "");
		var contentmaxwidth = "" + (this.theme[place].contentmaxwidth || "");
		var contentheight = "" + (this.theme[place].contentheight || "");
		var style_ = "" + (this.theme[place].style || "");
		var contentstyle = "" + (this.theme[place].contentstyle || "");
		var margin = "" + (this.theme[place].margin || "");
		var contentmargin = "" + (this.theme[place].contentmargin || "");
		var style = "";
		!coos.isEmpty(width) && width.indexOf('%') < 0 && width.indexOf('px') < 0 && (width += "px");
		!coos.isEmpty(minwidth) && minwidth.indexOf('%') < 0 && minwidth.indexOf('px') < 0 && (minwidth += "px");
		!coos.isEmpty(maxwidth) && maxwidth.indexOf('%') < 0 && maxwidth.indexOf('px') < 0 && (maxwidth += "px");
		!coos.isEmpty(leftwidth) && leftwidth.indexOf('%') < 0 && leftwidth.indexOf('px') < 0 && (leftwidth += "px");
		!coos.isEmpty(rightwidth) && rightwidth.indexOf('%') < 0 && rightwidth.indexOf('px') < 0 && (rightwidth += "px");
		!coos.isEmpty(height) && height.indexOf('%') < 0 && height.indexOf('px') < 0 && (height += "px");

		!coos.isEmpty(contentwidth) && contentwidth.indexOf('%') < 0 && contentwidth.indexOf('px') < 0 && (contentwidth += "px");
		!coos.isEmpty(contentminwidth) && contentminwidth.indexOf('%') < 0 && contentminwidth.indexOf('px') < 0 && (contentminwidth += "px");
		!coos.isEmpty(contentmaxwidth) && contentmaxwidth.indexOf('%') < 0 && contentmaxwidth.indexOf('px') < 0 && (contentmaxwidth += "px");
		!coos.isEmpty(contentheight) && contentheight.indexOf('%') < 0 && contentheight.indexOf('px') < 0 && (contentheight += "px");

		!coos.isEmpty(color) && (style += ".coos-" + place + "{color:" + color + ";}");
		!coos.isEmpty(backgroundcolor) && (style += ".coos-" + place + "{background-color:" + backgroundcolor + ";}");

		!coos.isEmpty(contentcolor) && (style += ".coos-" + place + "-box .coos-" + place + "{color:" + contentcolor + ";}");
		!coos.isEmpty(contentbackgroundcolor) && (style += ".coos-" + place + "-box .coos-" + place + "{background-color:" + contentbackgroundcolor + ";}");
		!coos.isEmpty(width) && (style += ".coos-" + place + "-box{width:" + width + ";margin: auto auto;}");
		!coos.isEmpty(minwidth) && (style += ".coos-" + place + "-box{min-width:" + minwidth + ";margin: auto auto;}");
		!coos.isEmpty(maxwidth) && (style += ".coos-" + place + "-box{max-width:" + maxwidth + ";margin: auto auto;}");
		!coos.isEmpty(leftwidth) && (style += ".coos-" + place + " .coos-" + place + "-left{width:" + leftwidth + ";}");
		!coos.isEmpty(rightwidth) && (style += ".coos-" + place + " .coos-" + place + "-right{width:" + rightwidth + ";}");
		!coos.isEmpty(height) && (style += ".coos-" + place + "-box{height:" + height + ";}");

		!coos.isEmpty(contentwidth) && (style += ".coos-" + place + "-box .coos-" + place + "{width:" + contentwidth + ";margin: auto auto;}");
		!coos.isEmpty(contentminwidth) && (style += ".coos-" + place + "-box .coos-" + place + "{min-width:" + contentminwidth + ";margin: auto auto;}");
		!coos.isEmpty(contentmaxwidth) && (style += ".coos-" + place + "-box .coos-" + place + "{max-width:" + contentmaxwidth + ";margin: auto auto;}");
		!coos.isEmpty(contentheight) && (style += ".coos-" + place + "-box .coos-" + place + "{height:" + contentheight + ";}");

		!coos.isEmpty(style_) && (style += ".coos-" + place + "-box{" + style_ + "}");
		!coos.isEmpty(contentstyle) && (style += ".coos-" + place + "-box .coos-" + place + "{" + contentstyle + "}");

		!coos.isEmpty(margin) && (style += ".coos-" + place + "-box {margin:" + margin + ";}");
		!coos.isEmpty(contentmargin) && (style += ".coos-" + place + "-box .coos-" + place + "{margin:" + contentmargin + ";}");

		!coos.isEmpty(leftcolor) && (style += ".coos-" + place + " .coos-" + place + "-left{color:" + leftcolor + ";}");
		!coos.isEmpty(leftbackgroundcolor) && (style += ".coos-" + place + " .coos-" + place + "-left{background-color:" + leftbackgroundcolor + ";}");

		!coos.isEmpty(rightcolor) && (style += ".coos-" + place + " .coos-" + place + "-right{color:" + rightcolor + ";}");
		!coos.isEmpty(rightbackgroundcolor) && (style += ".coos-" + place + " .coos-" + place + "-right{background-color:" + rightbackgroundcolor + ";}");

		if (place == 'header') {
			var framepaddingtop = height;
			if (!coos.isEmpty(height) || !coos.isEmpty(contentheight)) {
				var fh = 30;
				var lh = 30;
				framepaddingtop = Number((height.replace('px', ''))) + 0;
				if (!coos.isEmpty(height)) {
					fh = (height.replace('px', '')) - 20;
					lh = (height.replace('px', '')) - 10;
				} else {
					fh = (contentheight.replace('px', '')) - 20;
					lh = (contentheight.replace('px', '')) - 10;
				}
				style += ".coos-header .coos-logo-icon{height:" + lh + "px;}";
				style += ".coos-header .coos-logo-title{line-height:" + lh + "px;}";
				style += ".coos-header ul a{height:" + fh + "px;line-height:" + fh + "px;}";
				style += ".coos-header .coos-header-title{height:" + fh + "px;line-height:" + fh + "px;}";
			}
			if (fixed) {
				!coos.isEmpty(framepaddingtop) && (style += ".coos-frame {padding-top:" + framepaddingtop + "px !important;}");
				!coos.isEmpty(framepaddingtop) && (style += ".coos-full-vertical.coos-frame{padding-top:0px !important;}");
			} else {
			}
			!coos.isEmpty(height) && (style += ".coos-full-vertical .coos-header-box{margin-top:-" + height + " !important;}");
		} else if (place == 'body') {
			!coos.isEmpty(leftwidth) && (style += ".coos-body-left{margin-left:-" + leftwidth + ";}");
			!coos.isEmpty(rightwidth) && (style += ".coos-body-right{margin-right:-" + rightwidth + ";}");
			!coos.isEmpty(leftwidth) && (style += ".coos-full-horizontal .coos-body-left{margin-left:-" + leftwidth + " !important;}");
			!coos.isEmpty(rightwidth) && (style += ".coos-full-horizontal .coos-body-right{margin-right:-" + rightwidth + " !important;}");

			if (fixedleft && this.theme.body.config.defaulthideleft) {

			} else {
				!coos.isEmpty(leftwidth) && (style += ".coos-open-body-left .coos-body-center{margin-left:" + leftwidth + ";}");
				!coos.isEmpty(leftwidth) && (style += ".coos-open-body-left.coos-default-hide-body-left .coos-body-center{margin-right:-" + leftwidth + ";}");
				// !coos.isEmpty(leftwidth) && (style +=
				// ".coos-open-body-left.coos-default-hide-body-left.coos-body-fixed-left
				// .coos-body-center{margin-right:0px;margin-left:0px;}");

			}
			if (fixedright && this.theme.body.config.defaulthideright) {

			} else {
				!coos.isEmpty(rightwidth) && (style += ".coos-open-body-right .coos-body-center{margin-right:" + rightwidth + ";}");
				!coos.isEmpty(rightwidth) && (style += ".coos-open-body-right.coos-default-hide-body-right .coos-body-center{margin-left:-" + rightwidth + ";}");
				// !coos.isEmpty(rightwidth) && (style +=
				// ".coos-open-body-right.coos-default-hide-body-right.coos-body-fixed-right
				// .coos-body-center{margin-right:0px;margin-left:0px;}");

			}

		} else if (place == 'footer') {
			var framepaddingtop = height;
			if (!coos.isEmpty(height) || !coos.isEmpty(contentheight)) {

				var iconh = 22;
				var texth = 18;
				var allheight = 40;
				framepaddingtop = Number((height.replace('px', ''))) + 0;
				if (!coos.isEmpty(height)) {
					allheight = (height.replace('px', '')) - 10;
				} else {
					allheight = (contentheight.replace('px', '')) - 10;
				}
				iconh = (allheight) * (26 / 40);
				texth = (allheight) * (14 / 40);
				var iconfontsize = (allheight) * (25 / 40);
				var textfontsize = (allheight) * (12 / 40);
				style += ".coos-footer-button>ul>li .coos-icon{font-size:" + iconfontsize + "px;line-height:" + iconh + "px;}";
				style += ".coos-footer-button>ul>li .coos-text{font-size:" + textfontsize + "px;line-height:" + texth + "px;}";
			}
			!coos.isEmpty(height) && (style += ".coos-full-vertical .coos-footer-box{margin-bottom:-" + height + " !important;}");
			if (fixed && this.theme.footer.open) {
				!coos.isEmpty(framepaddingtop) && (style += ".coos-frame {padding-bottom:" + framepaddingtop + "px !important;}");
				!coos.isEmpty(framepaddingtop) && (style += ".coos-frame.coos-body-fixed-left .coos-body-left{bottom:" + height + " !important;}");
				!coos.isEmpty(framepaddingtop) && (style += ".coos-frame.coos-body-fixed-center .coos-body-center{bottom:" + height + " !important;}");
				!coos.isEmpty(framepaddingtop) && (style += ".coos-frame.coos-body-fixed-right .coos-body-right{bottom:" + height + " !important;}");
				!coos.isEmpty(framepaddingtop) && (style += ".coos-full-vertical.coos-frame{padding-bottom:0px !important;}");
			} else {
			}
		}
		!coos.isEmpty(overacolor) && (style += ".coos-" + place + " .coos-menu-navigation a:hover{color:" + overacolor + ";}");
		!coos.isEmpty(overabackgroundcolor) && (style += ".coos-" + place + " .coos-menu-navigation a:hover{background-color:" + overabackgroundcolor + ";}");

		!coos.isEmpty(menuopencolor) && (style += ".coos-" + place + " .coos-menu-navigation .coos-open{color:" + menuopencolor + ";}");
		!coos.isEmpty(menuopenbackgroundcolor) && (style += ".coos-" + place + " .coos-menu-navigation .coos-open{background-color:" + menuopenbackgroundcolor + ";}");

		!coos.isEmpty(menuopenacolor) && (style += ".coos-" + place + " .coos-menu-navigation .coos-open>a{color:" + menuopenacolor + ";}");
		!coos.isEmpty(menuopenabackgroundcolor) && (style += ".coos-" + place + " .coos-menu-navigation .coos-open>a{background-color:" + menuopenabackgroundcolor + ";}");

		!coos.isEmpty(menuopenacolor) && (style += ".coos-" + place + " .coos-menu-navigation .coos-open>a:hover{color:" + menuopenacolor + ";}");
		!coos.isEmpty(menuopenabackgroundcolor) && (style += ".coos-" + place + " .coos-menu-navigation .coos-open>a:hover{background-color:" + menuopenabackgroundcolor + ";}");

		!coos.isEmpty(activecolor) && (style += ".coos-" + place + " .coos-menu-navigation .active{color:" + activecolor + ";}");
		!coos.isEmpty(activebackgroundcolor) && (style += ".coos-" + place + " .coos-menu-navigation .active{background-color:" + activebackgroundcolor + ";}");

		!coos.isEmpty(activeacolor) && (style += ".coos-" + place + " .coos-menu-navigation .active>a{color:" + activeacolor + ";}");
		!coos.isEmpty(activeabackgroundcolor) && (style += ".coos-" + place + " .coos-menu-navigation .active>a{background-color:" + activeabackgroundcolor + ";}");

		return style;

	}
	Theme.prototype.getBaseStyle = function() {
		var style = this.getObjectStyle('header') + this.getObjectStyle('body') + this.getObjectStyle('footer');
		return style;
	};
	Theme.prototype.writeStyle = function() {
		var style = this.getBaseStyle();
		var style_ = this.getStyle();
		if (!coos.isEmpty(style_)) {
			style = style + style_;
		}
		if ($('#COOS-THEME-STYLE').length > 0) {
			$('#COOS-THEME-STYLE').html(style);
		} else {
			var $childrens = $('head').children();
			$($childrens[$childrens.length - 1]).before('<style id="COOS-THEME-STYLE" type="text/css">' + style + '</style>');
		}
	};

	Theme.prototype.fullOrEmptyScreen = function() {
		if (this.$frame.hasClass('coos-full-vertical') && this.$frame.hasClass('coos-full-horizontal')) {
			this.emptyScreen();
		} else {
			this.fullScreen();
		}
	};

	Theme.prototype.fullOrEmptyVertical = function() {
		if (this.$frame.hasClass('coos-full-vertical')) {
			this.emptyVertical();
		} else {
			this.fullVertical();
		}
	};

	Theme.prototype.fullOrEmptyHorizontal = function() {
		if (this.$frame.hasClass('coos-full-horizontal')) {
			this.emptyHorizontal();
		} else {
			this.fullHorizontal();
		}
	};

	Theme.prototype.fullScreen = function() {
		this.fullVertical();
		this.fullHorizontal();
	};

	Theme.prototype.emptyScreen = function() {
		this.emptyVertical();
		this.emptyHorizontal();
	};

	Theme.prototype.fullVertical = function() {
		this.$frame.addClass('coos-full-vertical');
		this.$framebox.addClass('coos-over-hidden');
		coos.frame.initHeight();
		window.setTimeout(function() {
			this.$framebox.removeClass('coos-over-hidden');
		}, 300);
	};

	Theme.prototype.fullHorizontal = function() {
		this.$frame.addClass('coos-full-horizontal');
		this.$framebox.addClass('coos-over-hidden');
		coos.frame.initHeight();
		window.setTimeout(function() {
			this.$framebox.removeClass('coos-over-hidden');
		}, 300);
	};
	Theme.prototype.emptyVertical = function() {
		this.$frame.removeClass('coos-full-vertical');
		this.$framebox.addClass('coos-over-hidden');
		window.setTimeout(function() {
			coos.frame.initHeight();
			this.$framebox.removeClass('coos-over-hidden');
		}, 300);
	};

	Theme.prototype.emptyHorizontal = function() {
		this.$frame.removeClass('coos-full-horizontal');
		this.$framebox.addClass('coos-over-hidden');
		coos.frame.initHeight();
		window.setTimeout(function() {
			this.$framebox.removeClass('coos-over-hidden');
		}, 300);
	};

	Theme.prototype.initView = function() {
		this.writeStyle();
		var theme = this.theme;
		this.$frame.css('margin', "0px auto");
		var width = "" + theme.width;
		!coos.isEmpty(width) && width.indexOf('%') < 0 && width.indexOf('px') < 0 && (width += "px");
		if (!coos.isEmpty(width)) {
			this.$frame.css('width', width);
		} else {
			this.$frame.css('width', 'auto');
		}
		var minwidth = "" + theme.minwidth;
		!coos.isEmpty(minwidth) && minwidth.indexOf('%') < 0 && minwidth.indexOf('px') < 0 && (minwidth += "px");
		if (!coos.isEmpty(minwidth)) {
			this.$frame.css('min-width', minwidth);
		} else {
			this.$frame.css('min-width', 'auto');
		}
		var maxwidth = "" + theme.maxwidth;
		!coos.isEmpty(maxwidth) && maxwidth.indexOf('%') < 0 && maxwidth.indexOf('px') < 0 && (maxwidth += "px");
		if (!coos.isEmpty(maxwidth)) {
			this.$frame.css('max-width', maxwidth);
		} else {
			this.$frame.css('max-width', 'auto');
		}
		if (theme.backgroundcolor) {
			this.$framebox.css('background-color', theme.backgroundcolor);
		} else {
			this.$framebox.css('background-color', 'auto');
		}
		if (theme.color) {
			this.$framebox.css('color', theme.color);
		} else {
			this.$framebox.css('color', 'auto');
		}
		this.$frame.removeClass('coos-header-fixed');
		this.$frame.removeClass('coos-footer-fixed');
		this.$frame.removeClass('coos-body-fixed-left');
		this.$frame.removeClass('coos-body-fixed-center');
		this.$frame.removeClass('coos-body-fixed-right');
		this.$body.find(".coos-body-left").removeClass('scrollbar-sm');
		this.$body.find(".coos-body-center").removeClass('scrollbar-sm');
		this.$body.find(".coos-body-right").removeClass('scrollbar-sm');

		if (theme.header.open) {
			this.$headerbox.show();
			if (theme.header.fixed) {
				this.$frame.addClass('coos-header-fixed');
			}
		} else {
			this.$headerbox.hide();
		}
		if (theme.body.fixedleft) {
			this.$frame.addClass('coos-body-fixed-left');
			this.$body.find(".coos-body-left").addClass('scrollbar-sm');
		}
		if (theme.body.fixedcenter) {
			this.$frame.addClass('coos-body-fixed-center');
			this.$body.find(".coos-body-center").addClass('scrollbar-sm');
		}
		if (theme.body.fixedright) {
			this.$frame.addClass('coos-body-fixed-right');
			this.$body.find(".coos-body-right").addClass('scrollbar-sm');
		}
		if (theme.footer.open) {
			this.$footerbox.show();
			if (theme.footer.fixed) {
				this.$frame.addClass('coos-footer-fixed');
			}
		} else {
			this.$footerbox.hide();
		}

		this.$frame.removeClass('coos-hide-back-top');
		if (theme.hidebacktop) {
			this.$frame.addClass('coos-hide-back-top');
		}

		this.initHeader();
		this.initBody();
		this.initFooter();
		this.initMenu();
		this.initButton();
	};
	Theme.prototype.initButton = function() {
		this.initButtonView();
	};

	Theme.prototype.initButtonView = function() {
		this.initHeaderButtonView();
		this.initBodyButtonView();
		this.initFooterButtonView();
	};

	Theme.prototype.setTitle = function(title) {
		var $header = this.$header;
		$header.find('.coos-header-title').remove();
		var $headertitle = $('<div class="coos-header-title"></div>');
		$header.append($headertitle);
		$headertitle.html(title);
	};
	Theme.prototype.initHeaderButtonView = function() {
		var $header = this.$header;
		$header.find('.coos-header-button').remove();
		var theme = this.theme;
		if (theme.header.open) {
			var buttons = theme.header.config.buttons || [];
			var $buttoncontainer = $('<div class="coos-header-button"></div>');
			$header.find('.coos-header-right').append($buttoncontainer);
			var $ul = $("<ul class='coos-menu-navigation'></ul>");
			$(buttons).each(function(index, button) {
				var type = button.type;
				var $li = co.frame.theme.getButton(button);
				$ul.append($li);
			});
			$buttoncontainer.append($ul);
		}
	};

	Theme.prototype.initBodyButtonView = function() {
		var $body = this.$body;
		$body.find('.coos-body-menu-top .coos-body-button').remove();
		var theme = this.theme;
		if (this.hasBodyMenu) {
			var buttons = theme.body.config.buttons || [];
			var $buttoncontainer = $('<div class="coos-body-button"></div>');
			$body.find('.coos-body-menu-top').append($buttoncontainer);
			var $ul = $("<ul class='coos-button-navigation'></ul>");
			$(buttons).each(function(index, button) {
				var type = button.type;
				if (coos.isEmpty(button.icon)) {
					button.icon = 'fa fa-navicon';
				}
				var $li = co.frame.theme.getButton(button);
				var $a = $li.find('a:first');
				if (!coos.isEmpty(button.color)) {
					$a.find('.coos-icon').css('color', button.color);
				}
				if (!coos.isEmpty(button.backgroundcolor)) {
					$a.find('.coos-icon').css('background-color', button.backgroundcolor);
				}
				$ul.append($li);
			});
			$buttoncontainer.append($ul);
			if (theme.body.config.menuplace == 'LEFT') {
				$buttoncontainer.find('.coos-dropdown-menu-right').removeClass('coos-dropdown-menu-right').addClass('coos-dropdown-menu-left');
			}
		}
	};

	Theme.prototype.initFooterButtonView = function() {
		var $footer = this.$footer;
		$footer.find('.coos-footer-button').remove();
		var theme = this.theme;
		var buttons = theme.footer.config.buttons || [];
		if (theme.footer.open && buttons.length > 0) {
			var $buttoncontainer = $('<div class="coos-footer-button"></div>');
			$footer.append($buttoncontainer);
			var $ul = $("<ul class='coos-menu-navigation'></ul>");
			$(buttons).each(function(index, button) {
				var type = button.type;
				var $li = co.frame.theme.getButton(button);
				$ul.append($li);
			});
			$buttoncontainer.append($ul);
		}
	};

	Theme.prototype.initHeader = function() {
	};

	Theme.prototype.initBody = function() {

	};

	Theme.prototype.initFooter = function() {

	};

	Theme.prototype.initMenu = function() {

	};

	Theme.prototype.initContent = function() {
	};

	co.frame.theme.Theme = Theme;

})();