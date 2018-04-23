(function(window, jQuery, co) {
co.frame = new Object();
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

		var header_buttons = config.header_buttons;
		if (header_buttons != null) {
			this.default_theme.header.config.buttons = header_buttons;
		}
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
		this.$bodyleft = $body.find('.coos-body-left');
		this.$bodyright = $body.find('.coos-body-right');
		this.$bodycenter = $body.find('.coos-body-center');
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

	Frame.prototype.initSize = function() {
		window.setTimeout(function() {
			co.frame.initSize();
		}, 10);
		var windowHeight = $(window).height();
		var headerHeight = this.this_theme_object ? this.this_theme_object.getHeaderHeight() : 0;
		var footerHeight = this.this_theme_object ? this.this_theme_object.getFooterHeight() : 0;
		var bodyMarginTop = this.this_theme_object ? this.this_theme_object.getBodyMarginTop() : 0;
		var bodyMarginBottom = this.this_theme_object ? this.this_theme_object.getBodyMarginBottom() : 0;
		var menu_height = this.this_theme_object ? this.this_theme_object.getBodyMenuHeight() : 0;
		var body_height = windowHeight - headerHeight - footerHeight - bodyMarginTop - bodyMarginBottom;
		var min_height = (menu_height > body_height) ? menu_height : body_height;
		this.$body.css('min-height', min_height);
		if (this.$frame.hasClass('coos-body-fixed-left')) {
			this.$bodyleft.css('top', this.$body.offset().top);
		}
		if (this.$frame.hasClass('coos-body-fixed-center')) {
			this.$bodycenter.css('top', this.$body.offset().top);
		}
		if (this.$frame.hasClass('coos-body-fixed-right')) {
			this.$bodyright.css('top', this.$body.offset().top);
		}
		co.frame.checkBackTop();
	};

	co.frame.init = function(config) {
		co.frame.frame = co.frame.create(config);
		return co.frame.frame;
	};

	co.frame.create = function(config) {
		return new Frame(config);
	};

})();

co.frame.menu = new Object();

(function() {
	var Menu = function(config) {
		config = config || {};
		this.menus = config.menus || [];

	};

	Menu.prototype.openOrCloseLi = function($li, animation) {
		var this_ = this;
		var menu = $($li).find('a:first').data('menu');
		if ($li.closest('.coos-body-menu-open').length > 0) {
			return;
		}
		if ($li.hasClass('coos-open')) {
			this_.removeCheckedParentMenuid(menu.menuid);

			var ul_lis = $li.find('>ul>li');
			$(ul_lis).each(function(index, ul_li) {
				ul_li = $(ul_li);
				if (ul_li.hasClass('coos-open')) {
					this_.openOrCloseLi(ul_li, animation);
				}
			});
			$li.find('.arrow:first').removeClass('rotate-90');

			if (animation) {
				$li.find('.coos-child-menu:first').slideUp(function() {
					$li.removeClass('coos-open');
					coos.frame.initSize();
				});
			} else {
				$li.find('.coos-child-menu:first').show();
				$li.removeClass('coos-open');
				coos.frame.initSize();
			}
		} else {
			this_.setCheckedParentMenuid(menu.menuid);
			$li.addClass('coos-open');

			// 移除选中的同级菜单
			var ul = $li.closest('ul');
			var ul_lis = ul.find('>li');
			$(ul_lis).each(function(index, ul_li) {
				ul_li = $(ul_li);
				if (ul_li.hasClass('coos-open') && ul_li[0] != $li[0]) {
					this_.openOrCloseLi(ul_li, animation);
				}
			});
			$li.find('.arrow:first').addClass('rotate-90');
			if (animation) {
				$li.find('.coos-child-menu:first').slideDown(function() {
					coos.frame.initSize();
				});
			} else {
				$li.find('.coos-child-menu:first').show();
				coos.frame.initSize();
			}
		}
	};

	Menu.prototype.initChildMenu = function($parentmenu, parentmenu, arrow_icon) {
		var this_ = this;
		var childmenus = this.getChildMenus(parentmenu);
		var $content = $('<ul class="coos-child-menu"></ul>');
		if (childmenus.length > 0) {
			$parentmenu.find('a').append('<i class="arrow fa fa-caret-' + arrow_icon + '"></i>');
			$content.appendTo($parentmenu);
		}
		$(childmenus).each(function(index, childmenu) {
			var $menu = this_.getMenuLi(childmenu);
			this_.initChildMenu($menu, childmenu, "right");
			$content.append($menu);
		});
	};

	Menu.prototype.getMenuLi = function(menu) {
		var name = menu.name;
		var menus = this.menus;
		var $menu = $('<li><a ></a></li>');
		if (!coos.isEmpty(menu.fonticon)) {
			$menu.find('a').append('<i class="icon fa ' + menu.fonticon + '"></i>');
		}
		if (!coos.isEmpty(menu.target)) {
			$menu.find('a').attr('target', menu.target);
		}
		if (!coos.isEmpty(menu.opennewwindow)) {
			$menu.find('a').attr('opennewwindow', menu.opennewwindow);
		}
		if (!coos.isEmpty(menu.href)) {
			$menu.find('a').attr('href', menu.href);
		}
		if (!coos.isEmpty(menu.servletpath) && this.getChildMenus(menu).length == 0) {
			if(menu.notonline){
				$menu.find('a').click(function() {
					coos.box.info('功能暂未上线，敬请期待！');
				});
			}else{
				$menu.find('a').addClass('coosToActionBtn');
				$menu.find('a').attr('toAction', menu.servletpath);
				var checkedmenuid = this.getCheckedMenuid();
				if (!coos.isEmpty(checkedmenuid) && checkedmenuid == menu.menuid) {
					if (menu.mustcheckedthismenu || (coos.url.getCurrentAction() == menu.servletpath || ("/" + coos.url.getCurrentAction()) == menu.servletpath)) {
						$menu.addClass('active');
					}
				}
				$menu.find('a').attr("coos-menu-servletpath", menu.servletpath.replace(/\/+/g, "/"));
				$menu.find('a').click(function() {
					$(menus).each(function(index, menu) {
						delete menu.mustcheckedthismenu;
					});
					menu.mustcheckedthismenu = true;
					$('[coos-menu-servletpath]').closest('li').removeClass('active');
					var li = $(this).closest('li');
					li.addClass('active');
				});
			}
			
		}

		$menu.find('a').append('' + name + '');
		$menu.find('a').data("menu", menu);
		if (menu.onClick) {
			$menu.find('a').click(function() {
				return menu.onClick();
			});
		}
		return $menu;
	};

	Menu.prototype.setCheckedParentMenuid = function(menuid) {
		var menuids = this.getCheckedParentMenuids();
		menuids = menuids || [];
		menuids[menuids.length] = menuid;
		coos.localData.set("coos.theme.checkedparentmenuids", JSON.stringify(menuids));
	};
	Menu.prototype.removeCheckedParentMenuid = function(menuid) {
		var menuids = this.getCheckedParentMenuids();
		menuids = menuids || [];
		var newmenuids = [];
		for (var i = 0; i < menuids.length; i++) {
			if (menuids[i] != menuid) {
				newmenuids[newmenuids.length] = menuids[i];
			}
		}
		coos.localData.set("coos.theme.checkedparentmenuids", JSON.stringify(newmenuids));
	};
	Menu.prototype.hasCheckedParentMenuid = function(menuid) {
		var menuids = this.getCheckedParentMenuids();
		menuids = menuids || [];
		for (var i = 0; i < menuids.length; i++) {
			if (menuids[i] == menuid) {
				return true;
			}
		}
		return false;
	};
	Menu.prototype.getCheckedParentMenuids = function() {
		var menuidsstr = coos.localData.get("coos.theme.checkedparentmenuids");
		if (coos.isEmpty(menuidsstr)) {
			return [];
		}
		return $.parseJSON(menuidsstr);
	};
	Menu.prototype.setCheckedMenuid = function(menuid) {
		coos.localData.set("coos.theme.checkedmenuid", menuid);
	};
	Menu.prototype.getCheckedMenuid = function() {
		return coos.localData.get("coos.theme.checkedmenuid");
	};
	Menu.prototype.getTopMenus = function() {
		var this_ = this;
		var menus = this.menus;
		var topmenus = [];
		$(menus).each(function(index, menu) {
			var parentid = menu.parentid;
			if (!this_.hasParentMenu(menu)) {
				topmenus[topmenus.length] = menu;
			}
		});
		return topmenus;
	};
	Menu.prototype.getChildMenus = function(parentmenu) {
		var menus = this.menus;
		var childmenus = [];
		$(menus).each(function(index, menu) {
			var parentid = menu.parentid;
			if (!coos.isEmpty(parentid) && parentid == parentmenu.menuid) {
				childmenus[childmenus.length] = menu;
			} else {
			}
		});
		return childmenus;
	};
	Menu.prototype.hasParentMenu = function(thismenu) {
		var menus = this.menus;
		var thismenuid = thismenu.menuid;
		var thisparentid = thismenu.parentid;
		var has = false;
		if (!coos.isEmpty(thisparentid)) {
			$(menus).each(function(index, menu) {
				if (menu.menuid != thismenuid) {
					if (menu.menuid == thisparentid) {
						has = true;
						return false;
					}
				}
			});
		}
		return has;
	};

	co.frame.menu.create = function(config) {
		return new Menu(config);
	};
})();

var AfterHeaderMenuBuildCallbacks = [];
coos.frame.addAfterHeaderMenuBuild = function(callback) {
	AfterHeaderMenuBuildCallbacks[AfterHeaderMenuBuildCallbacks.length] = callback;
};
coos.frame.afterHeaderMenuBuild = function() {
	$(AfterHeaderMenuBuildCallbacks).each(function(index, callback) {
		callback && callback();
	});
};
var AfterBodyMenuBuildCallbacks = [];
coos.frame.addAfterBodyMenuBuild = function(callback) {
	AfterBodyMenuBuildCallbacks[AfterBodyMenuBuildCallbacks.length] = callback;
};
coos.frame.afterBodyMenuBuild = function() {
	$(AfterBodyMenuBuildCallbacks).each(function(index, callback) {
		callback && callback();
	});
};
co.frame.changeFull = function(status) {
	if (co.frame.frame) {
		co.frame.frame.changeFull(status);
	}
};

co.frame.checkBackTop = function() {
	if ($(window).scrollTop() > 80) {
		$('.coos-back-top').addClass('visible');
	} else if ($(window).scrollTop() <= 0) {
		$('.coos-back-top').removeClass('visible');
	}
};

co.frame.setTitle = function(title) {
	if (co.frame.frame) {
		co.frame.frame.setTitle(title);
	}
};

co.frame.initSize = function() {
	if (co.frame.frame) {
		co.frame.frame.initSize();
	}
};
co.page.pushLoadCallback(function() {
	if (co.frame.frame) {
		if (!co.frame.firstFrameViewed) {
			co.frame.firstFrameViewed = true;
			co.frame.frame.view();
		}
	}
	co.frame.initSize();
});
$(function() {
	co.frame.changeFull($('#coos-need-full-page').length > 0 && $('#coos-need-full-page').closest('.coos-box-window').length == 0);

	/* 返回顶部 */
	$('html').on('click', '.coos-back-top', function(e) {
		e.preventDefault();
		$('body,html').animate({
			scrollTop : 0
		}, 800);
		window.setTimeout(function() {
			co.frame.checkBackTop();
		}, 800);
	});
	$(window).on("scroll", function() {
		co.frame.checkBackTop();
	});
	$('html').on('click', '[coos-action="full-or-empty-horizontal"]', function(e) {
		lastThemeObject.fullOrEmptyHorizontal();
	});
	$('html').on('click', '[coos-action="full-or-empty-vertical"]', function(e) {
		lastThemeObject.fullOrEmptyVertical();
	});
	$('html').on('click', '[coos-action="full-or-empty-screen"]', function(e) {
		lastThemeObject.fullOrEmptyScreen();
	});
	$('html').on('click', '.coos-control-body-left', function(e) {
		var $frame = $('.coos-frame')
		if ($frame.hasClass('coos-open-body-left')) {
			$frame.removeClass('coos-open-body-left');
			$(this).removeClass('active');
		} else {
			$frame.addClass('coos-open-body-left');
			$(this).addClass('active');
		}
	});
	$('html').on('click', '.coos-control-body-right', function(e) {
		var $frame = $('.coos-frame');
		if ($frame.hasClass('coos-open-body-right')) {
			$frame.removeClass('coos-open-body-right');
			$(this).removeClass('active');
		} else {
			$frame.addClass('coos-open-body-right');
			$(this).addClass('active');
		}
	});
});
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
		var config = this.theme[place].config;
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

		!coos.isEmpty(color) && (style += ".coos-" + place + "-box{color:" + color + ";}");
		!coos.isEmpty(backgroundcolor) && (style += ".coos-" + place + "-box{background-color:" + backgroundcolor + ";}");

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
				var sh = 20;
				framepaddingtop = Number((height.replace('px', ''))) + 0;
				if (!coos.isEmpty(height)) {
					fh = (height.replace('px', '')) - 20;
					lh = (height.replace('px', '')) - 10;
					sh = (height.replace('px', '')) - 24;
				} else {
					fh = (contentheight.replace('px', '')) - 20;
					lh = (contentheight.replace('px', '')) - 10;
					sh = (contentheight.replace('px', '')) - 24;
				}
				style += ".coos-header .coos-logo-icon{height:" + lh + "px;}";
				style += ".coos-header .coos-header-search-input{height:" + sh + "px;line-height:" + sh + "px;}";
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
			!coos.isEmpty(config.iconstyle) && (style += ".coos-header .coos-logo-icon{" + config.iconstyle + "}");
			!coos.isEmpty(config.titlestyle) && (style += ".coos-header .coos-logo-title{" + config.titlestyle + "}");
			!coos.isEmpty(config.searchinputstyle) && (style += ".coos-header .coos-header-search-input{" + config.searchinputstyle + "}");
			
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
co.frame.theme.getButton = function(button, isChild) {
	var type = button.type;
	var $li = $('<li></li>');
	var $button = $('<a class="" ></a>');
	$li.append($button);
	var USER_INFO = null;
	if (coos.frame.frame) {
		USER_INFO = coos.frame.frame.user_info;
	}
	if (!coos.isEmpty(button.showrule)) {
		try {
			var showrule = button.showrule;
			var functionstr = 'function(){return ' + showrule + ';}()';
			var f = eval("(" + functionstr + ")");
			if (!f) {
				return;
			}
		} catch (e) {
			console.log(e);
			return;
		}
	}
	var hasIcon = false;
	var hasLabel = false;
	if (!coos.isEmpty(button.icon)) {
		var $icon = null;
		if (button.icon.has("<")) {
			var $icon = $(button.icon);
			$icon.addClass('fa coos-icon');
			$button.append($icon);
		} else {
			if (button.icon.has("fa") || button.icon.has("icon")) {
				var $icon = $('<i class="' + button.icon + '"> </i>');
				$icon.addClass('fa coos-icon');
				$button.append($icon);
			} else {
				$button.append(button.icon);

			}
		}
		hasIcon = true;
	}
	if (!coos.isEmpty(button.label)) {
		if (isChild) {
			$button.append(button.label);
		} else {
			var $label = $('<span class="coos-text"></span>');
			$label.append(button.label);
			$button.append($label);
		}
		hasLabel = true;
	}
	if (type == "LOGIN") {
		$button.addClass('coosToActionBtn');
		$button.attr('toAction', coos.config.action.toLogin);
	} else if (type == "LOGOUT") {
		$button.addClass('doLogoutBtn');
	} else if (type == "UPDATE-PASSWORD") {
		$button.addClass('toUpdatePasswordBtn');
	} else if (type == "USER") {

		if (!hasLabel && USER_INFO != null) {
			$button.append(USER_INFO.username);
		}
	}
	if (!coos.isEmpty(button.addClass)) {
		$button.addClass(button.addClass);
	}
	if (button.childbuttons != null && button.childbuttons.length > 0) {
		$button.addClass('coos-dropdown-toggle');
		$button.append('&nbsp;<span class="coos-caret"></span>');
		var $ul = $('<ul class="coos-dropdown-menu coos-dropdown-menu-right"></ul>');
		$li.append($ul);
		$(button.childbuttons).each(function(index, button) {
			var $li = coos.frame.theme.getButton(button, true);
			$ul.append($li);
		});

	}
	return $li;
};
(function() {
	var ThemeModelMap = {};
	co.frame.theme.model = {};
	co.frame.theme.model.defind = function(type, config, constructor) {
		config = config || {};
		if (ThemeModelMap[type] == null) {
			config.type = type;
			ThemeModelMap[type] = {};
			ThemeModelMap[type].config = config;
			ThemeModelMap[type].constructor = constructor;
		}
	};
	co.frame.theme.model.get = function(type) {
		return ThemeModelMap[type];
	};
	co.frame.theme.model.list = function() {
		var list = [];
		for ( var type in ThemeModelMap) {
			list[list.length] = ThemeModelMap[type];
		}
		return list;
	};
	co.frame.theme.model.create = function(type, config) {
		return new ThemeModelMap[type].constructor(config);
	};

	co.frame.theme.create = function(config) {

		var theme = config.theme;
		var type = theme.type;
		if (co.isEmpty(type)) {
			type = "MANAGER";
		}
		theme.type = type;
		if (co.frame.theme.model.get(type) == null) {
			throw new Error(type + " theme is not defined");
		}
		return co.frame.theme.model.create(type, config);
	};
})();
(function() {
	co.frame.theme.getTheme = function(type, name, config) {
		var THIS_PROJECT = window.THIS_PROJECT || {};
		var defaultType = "MANAGER";
		var defaultName = "STYLE-2";
		if (THIS_PROJECT && !co.isEmpty(THIS_PROJECT.defaultthemetype)) {
			defaultType = THIS_PROJECT.defaultthemetype;
		}
		if (THIS_PROJECT && !co.isEmpty(THIS_PROJECT.defaultstyletype)) {
			defaultName = THIS_PROJECT.defaultstyletype;
		}
		name = co.isEmpty(name) ? defaultName : name;
		type = co.isEmpty(type) ? defaultType : type;
		config = config || {};
		var theme = co.frame.theme.model.get(type).getStyle(name);
		var themeDemo = jQuery.extend(true, {}, theme);
		themeDemo = jQuery.extend(true, {}, themeDemo, config);
		if (THIS_PROJECT && !THIS_PROJECT.design) {
			if (!co.isEmpty(THIS_PROJECT.name)) {
				if (themeDemo.header && themeDemo.header.config) {
					themeDemo.header.config.title = THIS_PROJECT.name;
				}
			}
			if (!co.isEmpty(THIS_PROJECT.title)) {
				if (themeDemo.header && themeDemo.header.config) {
					themeDemo.header.config.title = THIS_PROJECT.title;
				}
			}
			if (!co.isEmpty(THIS_PROJECT.headertitle)) {
				if (themeDemo.header && themeDemo.header.config) {
					themeDemo.header.config.title = THIS_PROJECT.headertitle;
				}
			}
			if (!co.isEmpty(THIS_PROJECT.defaultcolortype)) {
				var colorScheme = co.frame.theme.model.get(type).getColor(THIS_PROJECT.defaultcolortype);
				jQuery.extend(true, themeDemo, colorScheme);
			}
			if (!co.isEmpty(THIS_PROJECT.defaultheadercolortype)) {
				var colorScheme = co.frame.theme.model.get(type).getColor(THIS_PROJECT.defaultheadercolortype);
				jQuery.extend(true, themeDemo, {
					header : colorScheme.header
				});
			}
			if (!co.isEmpty(THIS_PROJECT.defaultbodycolortype)) {
				var colorScheme = co.frame.theme.model.get(type).getColor(THIS_PROJECT.defaultbodycolortype);
				jQuery.extend(true, themeDemo, {
					body : colorScheme.body
				});
			}
			if (!co.isEmpty(THIS_PROJECT.defaultfootercolortype)) {
				var colorScheme = co.frame.theme.model.get(type).getColor(THIS_PROJECT.defaultfootercolortype);
				jQuery.extend(true, themeDemo, {
					footer : colorScheme.footer
				});
			}
			if (!co.isEmpty(THIS_PROJECT.defaultmenuplace)) {
				jQuery.extend(true, themeDemo, {
					config : {
						menuplaces : THIS_PROJECT.defaultmenuplace
					}
				});
			}

			if (!co.isEmpty(THIS_PROJECT.headericon)) {
				jQuery.extend(true, themeDemo, {
					header : {
						config : {
							icon : THIS_PROJECT.headericon
						}
					}
				});
			}
			if (!co.isEmpty(THIS_PROJECT.menutitle)) {
				jQuery.extend(true, themeDemo, {
					body : {
						config : {
							menutitle : THIS_PROJECT.menutitle
						}
					}
				});
			}

		}
		themeDemo.themeid = co.getNumber();
		return themeDemo;
	};

})();
(function(window, jQuery, coos) {
	var html = '';

	var ThisTheme = function(config) {
		co.frame.theme.Theme.call(this, config);
	};
	(function() {
		var Super = function() {
		};
		Super.prototype = co.frame.theme.Theme.prototype;
		ThisTheme.prototype = new Super();
	})();
	ThisTheme.prototype.getStyle = function() {
		var theme = this.theme;
		return "";
	};
	ThisTheme.prototype.initData = function() {
		var theme = this.theme;
		this.hasHeaderMenu = false;
		this.hasBodyMenu = false;
		this.hasFooterMenu = false;
		var menuplaces = (theme.config.menuplaces || "").toUpperCase().split(',');
		this.hasHeaderMenu = (jQuery.inArray("HEADER", menuplaces) >= 0);
		this.hasBodyMenu = (jQuery.inArray("BODY", menuplaces) >= 0);
		this.hasFooterMenu = (jQuery.inArray("FOOTER", menuplaces) >= 0);

	};

	ThisTheme.prototype.initHeader = function() {
		var theme = this.theme;

		var $header = this.$header;
		var $content = this.$header.find(".coos-header-left");
		$content.empty();
		if (theme.header.open) {
			var config = theme.header.config;
			this.$frame.addClass('coos-open-header');
			var $headerleft = $header.find(".coos-header-left");
			if (!coos.isEmpty(config.title) || !coos.isEmpty(config.icon)) {
				var icon = config.icon;
				if (!coos.isEmpty(icon)) {
					var $image = $('<img class="coos-logo-icon float-left element-rule-image coos-bd-no mgtb-5 mgl-20" use-file-server-url="true" path="' + icon + '"/>');
					$content.append($image);
					coos.element.init($content);
				}
				if (!coos.isEmpty(config.title)) {
					var $h3 = $('<h3 class="coos-logo-title float-right mgtb-5 mgr-20" >' + config.title + '</h3>');
					$content.append($h3);
				}
			}
			if (config.hassearchinput) {
				var $input = $('<input class="coos-header-search-input coos-bd-no mgl-20" placeholder="搜索"/>');
				$content.append($input);
			}
			var $leftUl = $('<ul class="float-left coos-header-left-button coos-menu-navigation "></ul>');
			var $rightUl = $('<ul class="float-right coos-header-right-button coos-menu-navigation "></ul>');
			$header.find('.coos-header-left-button').remove();
			$header.find('.coos-header-right-button').remove();

			if (config.showcontrolbodyleft) {
				$header.find('.coos-header-left').before($leftUl);
				var $button = $('<li class="coos-control-body-left"><a class="fa fa-navicon"></a></li>');
				$leftUl.append($button);
			}
			if (config.showcontrolbodyright) {
				$header.find('.coos-header-right').before($rightUl);
				var $button = $('<li class="coos-control-body-right"><a class="fa fa-navicon"></a></li>');
				$rightUl.append($button);
			}
		} else {
			this.hasHeaderMenu = false;
			$header.hide();
			this.$frame.removeClass('coos-open-header');
		}

	};
	ThisTheme.prototype.initBody = function() {
		var theme = this.theme;
		this.$menucontainer = null;
		if (this.hasBodyMenu) {
			var config = theme.body.config;
			if (config.menuplace == 'RIGHT') {
				this.$menucontainer = this.$body.find('.coos-body-right');
				if (!config.defaulthideright) {
					this.$frame.addClass('coos-open-body-right');
				} else {
					this.$frame.removeClass('coos-open-body-right');
				}
			} else {
				this.$menucontainer = this.$body.find('.coos-body-left');
				if (!config.defaulthideleft) {
					this.$frame.addClass('coos-open-body-left');
				} else {
					this.$frame.removeClass('coos-open-body-left');
				}

			}
			if (!config.defaulthideright) {
				this.$frame.removeClass('coos-default-hide-body-right');
			} else {
				this.$frame.addClass('coos-default-hide-body-right');
			}
			if (!config.defaulthideleft) {
				this.$frame.removeClass('coos-default-hide-body-left');
			} else {
				this.$frame.addClass('coos-default-hide-body-left');
			}
		} else {
			this.$frame.removeClass('coos-open-body-left coos-open-body-right');
		}
		this.$body.find('.coos-body-top').find('.coos-body-top-navigation').remove();
		if (theme.body.config.openfullnavigation) {
			var $navigation = $('<div class="coos-body-top-navigation"><ul></ul></div>');
			var $horizontal = $('<li coos-action="full-or-empty-horizontal" class="coos-control-horizontal"><i class="fa fa-arrows-h"></i></li>');
			var $vertical = $('<li coos-action="full-or-empty-vertical" class="coos-control-vertical"><i class="fa fa-arrows-v"></i></li>');
			var $screen = $('<li coos-action="full-or-empty-screen" class="coos-control-screen"><i class="fa fa-arrows"></i></i></li>');
			$navigation.find('ul').append($horizontal);
			$navigation.find('ul').append($vertical);
			$navigation.find('ul').append($screen);
			this.$body.find('.coos-body-top').append($navigation);
			this.$body.find('.coos-body-top').show();

		} else {
			this.$body.find('.coos-body-top').hide();
		}
	};

	ThisTheme.prototype.initFooter = function() {
		var theme = this.theme;
		if (theme.footer.open) {

		} else {
			this.hasFooterMenu = false;
		}
	};

	ThisTheme.prototype.initMenu = function() {
		this.initMenuView();
	};

	ThisTheme.prototype.initMenuView = function() {
		var topmenus = this.menu_object.getTopMenus();
		var $center = this.$header.find(".coos-header-center").empty();
		if (this.hasHeaderMenu) {
			this.initHeaderMenu(topmenus);
		} else {
			if (this.hasBodyMenu) {
				this.initBodyMenu(topmenus);
			}
		}
		var servletPath = coos.url.getCurrentAction();
		var $menu = $('[coos-menu-servletpath="' + servletPath + '"]');
		if ($menu.length > 0) {
			$menu = $($menu[0]);
			$('[coos-menu-servletpath]').closest('li').removeClass('active');
			$menu.closest('li').addClass('active');
			var $parentli = $menu.closest('ul').closest('li');
			if ($parentli.length > 0 && !$parentli.hasClass('coos-open')) {
				coos.frame.openOrCloseLi($parentli, true);
			}
		}
	};

	ThisTheme.prototype.initHeaderMenu = function(menus) {
		var theme = this.theme;
		var $center = this.$header.find(".coos-header-center").empty();
		var $headerMenu = $('<div class="coos-header-menu"></div>');
		$center.append($headerMenu);

		var $ul = $('<ul class="coos-menu-navigation"></ul>');
		$headerMenu.append($ul);
		var $firstChildMenu = null;
		var this_ = this;
		$(menus).each(function(index, menu) {
			var $menu = this_.menu_object.getMenuLi(menu);
			if (this_.hasBodyMenu) {
				var childmenus = this_.menu_object.getChildMenus(menu);
				if (childmenus.length > 0) {
					$menu.find('a').click(function() {
						var li = $(this).closest('li');
						if (!li.hasClass('coos-open')) {
							$ul.find('li').removeClass('coos-open');
							li.addClass('coos-open');
							$(menus).each(function(index, menu_) {
								this_.menu_object.removeCheckedParentMenuid(menu_.menuid);
							});
							this_.menu_object.setCheckedParentMenuid(menu.menuid);
							this_.initBodyMenu(childmenus);
						}
					});
					if (this_.menu_object.hasCheckedParentMenuid(menu.menuid)) {
						$firstChildMenu = $menu;
					}
					if ($firstChildMenu == null) {
						$firstChildMenu = $menu;
					}
				} else {
				}
			} else {
				this_.menu_object.initChildMenu($menu, menu, 'down');
			}
			$ul.append($menu);
		});
		coos.frame.afterHeaderMenuBuild();
		if (this.hasBodyMenu) {
			if ($firstChildMenu != null) {
				$firstChildMenu.find('a:first').click();
			}

		}
	};
	ThisTheme.prototype.initBodyMenu = function(menus) {
		var this_ = this;
		var bodycheckparentmenuid = coos.localData.get("co.frame.theme.bodycheckparentmenuid");

		var theme = this.theme;
		var $center = this.$menucontainer.empty();
		var $bodyMenu = $('<div class="coos-body-menu"><div class="coos-body-menu-top"></div><div class="coos-body-menu-center"><div class="coos-menu-title">菜单导航</div></div><div class="coos-body-menu-bottom pdtb-30"></div></div>');

		if (theme.body.config.menuopen) {
			$bodyMenu.addClass('coos-body-menu-open');
		} else {
			$bodyMenu.removeClass('coos-body-menu-open');
		}
		$center.append($bodyMenu);

		var $ul = $('<ul class="coos-menu-navigation"></ul>');
		$bodyMenu.find('.coos-body-menu-center').append($ul);
		var $firstChildMenu = null;
		$(menus).each(function(index, menu) {
			var $menu = this_.menu_object.getMenuLi(menu);
			this_.menu_object.initChildMenu($menu, menu, 'right');
			$ul.append($menu);
			var childmenus = this_.menu_object.getChildMenus(menu);
			if (childmenus.length > 0) {
			}
		});
		$ul.find('li a').click(function() {
			var li = $(this).closest('li');
			if (li.find('>.coos-child-menu').length > 0) {
				this_.menu_object.openOrCloseLi(li, true);
			} else {
				var menu = $(this).data('menu');
				this_.menu_object.setCheckedMenuid(menu.menuid);
				$ul.find('li').removeClass('active');
				li.addClass('active');
			}
		});
		var $lis = $ul.find('li');
		$($lis).each(function(index, $li) {
			$li = $($li);
			if ($li.find('>.coos-child-menu').length > 0) {
				var menu = $li.find('a:first').data('menu');
				if (this_.menu_object.hasCheckedParentMenuid(menu.menuid)) {
					this_.menu_object.openOrCloseLi($li, false);
				}
			}
		});
		if (theme.body.config.menuopen) {
			$bodyMenu.find('.coos-child-menu').closest('li').addClass('coos-open');
		}
		coos.frame.afterBodyMenuBuild();
	};

	ThisTheme.prototype.initMenuSize = function(menus) {
	};

	var ThisThemeConfig = {
		name : "管理后台主题",
		columns : [ {
			text : "菜单位置",
			name : "menuplaces",
			inputtype : "select",
			datas : [ {
				value : "HEADER,BODY",
				text : "头部和体部"
			}, {
				value : "HEADER",
				text : "头部"
			}, {
				value : "BODY",
				text : "体部"
			} ]
		} ],
		headercolumns : [ {
			text : "标题",
			name : "title"
		}, {
			text : "LOGO",
			name : "icon",
			inputtype : "image"
		}, {
			text : "显示左侧控制",
			name : "showcontrolbodyleft",
			inputtype : "switch"
		}, {
			text : "显示右侧控制",
			name : "showcontrolbodyright",
			inputtype : "switch"
		}, {
			text : "默认隐藏菜单",
			name : "defaulthidemenu",
			inputtype : "switch"
		}, {
			text : "悬浮颜色",
			name : "overcolor",
			inputtype : "color"
		}, {
			text : "悬浮背景",
			name : "overbackgroundcolor",
			inputtype : "color"
		}, {
			text : "悬浮按钮颜色",
			name : "overacolor",
			inputtype : "color"
		}, {
			text : "悬浮按钮背景",
			name : "overabackgroundcolor",
			inputtype : "color"
		}, {
			text : "菜单打开颜色",
			name : "menuopencolor",
			inputtype : "color"
		}, {
			text : "菜单打开背景",
			name : "menuopenbackgroundcolor",
			inputtype : "color"
		}, {
			text : "菜单打开按钮颜色",
			name : "menuopenacolor",
			inputtype : "color"
		}, {
			text : "菜单打开按钮背景",
			name : "menuopenabackgroundcolor",
			inputtype : "color"
		}, {
			text : "活动颜色",
			name : "activecolor",
			inputtype : "color"
		}, {
			text : "活动背景",
			name : "activebackgroundcolor",
			inputtype : "color"
		}, {
			text : "活动按钮颜色",
			name : "activeacolor",
			inputtype : "color"
		}, {
			text : "活动按钮背景",
			name : "activeabackgroundcolor",
			inputtype : "color"
		} ],
		bodycolumns : [ {
			text : "菜单位置",
			name : "menuplace",
			inputtype : "select",
			datas : [ {
				value : "LEFT",
				text : "左侧"
			}, {
				value : "RIGHT",
				text : "右侧"
			} ]
		}, {
			text : "默认隐藏左侧",
			name : "defaulthideleft",
			inputtype : "switch"
		}, {
			text : "默认隐藏菜单",
			name : "defaulthidemenu",
			inputtype : "switch"
		}, {
			text : "开启全屏导航",
			name : "openfullnavigation",
			inputtype : "switch"
		}, {
			text : "菜单全部展开",
			name : "menuopen",
			inputtype : "switch"
		}, {
			text : "悬浮颜色",
			name : "overcolor",
			inputtype : "color"
		}, {
			text : "悬浮背景",
			name : "overbackgroundcolor",
			inputtype : "color"
		}, {
			text : "悬浮按钮颜色",
			name : "overacolor",
			inputtype : "color"
		}, {
			text : "悬浮按钮背景",
			name : "overabackgroundcolor",
			inputtype : "color"
		}, {
			text : "菜单打开颜色",
			name : "menuopencolor",
			inputtype : "color"
		}, {
			text : "菜单打开背景",
			name : "menuopenbackgroundcolor",
			inputtype : "color"
		}, {
			text : "菜单打开按钮颜色",
			name : "menuopenacolor",
			inputtype : "color"
		}, {
			text : "菜单打开按钮背景",
			name : "menuopenabackgroundcolor",
			inputtype : "color"
		}, {
			text : "活动颜色",
			name : "activecolor",
			inputtype : "color"
		}, {
			text : "活动背景",
			name : "activebackgroundcolor",
			inputtype : "color"
		}, {
			text : "活动按钮颜色",
			name : "activeacolor",
			inputtype : "color"
		}, {
			text : "活动按钮背景",
			name : "activeabackgroundcolor",
			inputtype : "color"
		} ],
		footercolumns : [],
		element : {}
	};
	co.frame.theme.model.defind("MANAGER", ThisThemeConfig, ThisTheme);
})(window, jQuery, coos);
(function() {
	var color_map = {};

	co.frame.theme.model.get("MANAGER").getColor = function(name, config) {
		name = co.isEmpty(name) ? "COLOR-SCHEME-1" : name;
		config = config || {};
		var data = color_map[name] || {};
		var demo = jQuery.extend(true, {}, data);
		demo = jQuery.extend(true, {}, demo, config);
		return demo;
	};
	co.frame.theme.model.get("MANAGER").initColor = function(name, config) {
		var colorScheme = co.frame.theme.model.get("MANAGER").getColor(name, config);
		var usingTheme = co.frame.getUsingTheme();
		var usingThemeObject = co.frame.getUsingThemeObject();
		jQuery.extend(true, usingTheme, colorScheme);
		usingThemeObject.writeStyle();
	};
	co.frame.theme.model.get("MANAGER").getColorMap = function() {
		return color_map;
	};

	window.getPartRGB = function(index, part) {
		part = part || 5;
		// 第几组
		var groupIndex = Math.floor(index / part);
		var groupValueIndex = (index < part) ? index : index % part;
		var rs = [ 0, 255, 255, 0, 0, 255, 0 ];
		var gs = [ 0, 0, 255, 255, 255, 0, 0 ];
		var bs = [ 0, 0, 0, 0, 255, 255, 255 ];
		var r = getRGBOneValue(groupIndex, rs, part, groupValueIndex);
		var g = getRGBOneValue(groupIndex, gs, part, groupValueIndex);
		var b = getRGBOneValue(groupIndex, bs, part, groupValueIndex);
		var rgb = "rgb(" + r + "," + g + "," + b + ")";
		return rgb;
	}
	function getRGBOneValue(index, vs, part, a) {
		var startIndex = index >= vs.length ? index % vs.length : index;
		var vStart = vs[startIndex];
		var vEnd = vs[(startIndex + 1) >= vs.length ? 0 : (startIndex + 1)];
		var v = vStart;
		if (vStart != vEnd) {
			if (vStart < vEnd) {
				v = v + Math.floor((vEnd - vStart) / part * a);
			} else {
				v = v - Math.floor((vStart + vEnd) / part * a);
			}
		}
		return v;
	}

	var index = 3;
	// 暗色
	var lastB = '#4d575a';
	var count = index + 28;
	for (; index < (count); index++) {
		var c1 = "#ffffff";
		var c2 = "#ffffff";
		var c3 = "#ffffff";
		var c4 = "#ffffff";
		var b1 = getPartRGB(((index - 1)), 4);
		var b2 = co.color.getSimilar(b1, 30);

		var b3 = b1;
		var b4 = co.color.getSimilar(b1, -10);
		var b5 = co.color.getSimilar(b4, -30);
		var b6 = b5;
		var b7 = b5;
		var b8 = b1;
		var colorScheme = {
			header : {
				backgroundcolor : b1,
				color : c1,
				style : "",
				config : {
					/*
					 * overbackgroundcolor : "#3d4446", overcolor : "#ffffff",
					 */
					overabackgroundcolor : b2,
					overacolor : c2
				}
			},
			body : {
				backgroundcolor : b3,
				leftcolor : c3,
				leftbackgroundcolor : b4,
				/* color : "#ffffff", */
				/*
				 * rightcolor : "#ffffff", rightbackgroundcolor : "#4d575a",
				 */
				config : {
					/* overcolor : "#ffffff", */
					overbackgroundcolor : b5,
					/* overacolor : "#ffffff", */
					overabackgroundcolor : b6,
					/* activeacolor : "#ffffff", */
					activeabackgroundcolor : b7,
					menuopenacolor : c4,
					menuopenabackgroundcolor : b8
				}
			}
		};
		colorScheme.colorSchemeType = "COLOR-SCHEME-" + index;
		color_map[colorScheme.colorSchemeType] = colorScheme;
	}
	// 亮色
	var count = index + 28;
	for (; index < (count); index++) {
		var c1 = "#222222";
		var c2 = "#595959";
		var c2 = getPartRGB(((index - 1)), 4);
		var c3 = "#222222";
		var c4 = "#ffffff";
		var c5 = "#8d8d8d";

		var b1 = "#ffffff";
		var b2 = "#f9f9f9";
		var b2 = "#ffffff";

		var b3 = "#ffffff";
		var b4 = "#ffffff";
		var b5 = "#2bbdb1";
		var b5 = getPartRGB(((index - 1)), 4);
		var b6 = b5;
		var b7 = "#3ce0d3";
		var b7 = co.color.getSimilar(b5, -30);
		var b8 = "#ffffff";

		var colorScheme = {
			header : {
				backgroundcolor : b1,
				color : c1,
				style : "border-bottom: 3px solid " + b5 + ";",
				config : {
					/*
					 * overbackgroundcolor : "#3d4446", overcolor : "#ffffff",
					 */
					overabackgroundcolor : b2,
					overacolor : c2
				}
			},
			body : {
				backgroundcolor : b3,
				leftcolor : c3,
				leftbackgroundcolor : b4,
				/* color : "#ffffff", */
				/*
				 * rightcolor : "#ffffff", rightbackgroundcolor : "#4d575a",
				 */
				config : {
					/* overcolor : "#ffffff", */
					overbackgroundcolor : b5,
					/* overacolor : "#ffffff", */
					overabackgroundcolor : b6,
					activeacolor : c4,
					activeabackgroundcolor : b7,
					menuopenacolor : c5,
					menuopenabackgroundcolor : b8
				}
			}
		};
		colorScheme.colorSchemeType = "COLOR-SCHEME-" + index;
		color_map[colorScheme.colorSchemeType] = colorScheme;
	}
})();
(function() {
	var layout_map = {};
	co.frame.theme.model.get("MANAGER").getLayout = function(name, config) {
		name = co.isEmpty(name) ? "LAYOUT-SCHEME-1" : name;
		config = config || {};
		var data = layout_map[name] || {};
		var demo = jQuery.extend(true, {}, data);
		demo = jQuery.extend(true, {}, demo, config);
		return demo;
	};

	co.frame.theme.model.get("MANAGER").initLayout = function(name, config) {
		var scheme = co.frame.theme.model.get("MANAGER").getLayout(name, config);
		var usingTheme = co.frame.getUsingTheme();
		var usingThemeObject = co.frame.getUsingThemeObject();
		jQuery.extend(true, usingTheme, scheme);
		usingThemeObject.writeStyle();
	};
	co.frame.theme.model.get("MANAGER").getLayoutMap = function() {
		return layout_map;
	};

	var layoutScheme = {
		width : "",
		minwidth : "1024",
		header : {
			height : "",
			width : "",
			minwidth : "",
			maxwidth : "",
			contentwidth : "",
			contentmaxwidth : "",
			leftwidth : ""
		},
		body : {
			width : "",
			minwidth : "",
			maxwidth : "",
			leftwidth : "",
			rightwidth : "",
			margin : "20px auto 20px"
		}
	};
	layoutScheme.layoutSchemeType = "LAYOUT-SCHEME-1";
	layout_map[layoutScheme.layoutSchemeType] = layoutScheme;
})();

(function() {
	var style_map = {};
	co.frame.theme.model.get("MANAGER").getStyle = function(name) {
		name = name || "STYLE-2";
		return style_map[name] || {};
	};
	co.frame.theme.model.get("MANAGER").getStyleMap = function() {
		return style_map;
	};

	var title = co.getTitle();
	if (window.THIS_PROJECT) {
		title = window.THIS_PROJECT.title;
	}
	var theme = {
		themeid : co.getNumber(),
		type : "MANAGER",
		minwidth : 1024,
		config : {
			menuplaces : "HEADER,BODY"
		},
		header : {
			open : true,
			backgroundcolor : "#4d575a",
			color : "#ffffff",
			height : 50,
			leftwidth : 220,
			config : {
				overabackgroundcolor : "#3d4446",
				overacolor : "#ffffff",
				menuopenacolor : "#c1c1c1",
				activeabackgroundcolor : "#3d4446",
				activeacolor : "#ffffff",
				title : title,
				buttons : [ {
					icon : 'fa fa-power-off',
					label : "登录",
					type : "LOGIN",
					showrule : "USER_INFO == null"
				}, {
					icon : 'fa fa-user',
					type : "USER",
					showrule : "USER_INFO != null",
					childbuttons : [ {
						label : "修改密码",
						type : "UPDATE-PASSWORD"
					}, {
						label : "退出",
						type : "LOGOUT"
					} ]
				} ]
			}
		},
		body : {
			leftbackgroundcolor : "#4d575a",
			leftcolor : "#ffffff",
			rightbackgroundcolor : "#4d575a",
			rightcolor : "#ffffff",
			leftwidth : 220,
			rightwidth : 220,
			config : {
				overabackgroundcolor : "#3d4446",
				overacolor : "#ffffff",
				activeabackgroundcolor : "#3d4446",
				activeacolor : "#ffffff",
				menuopenacolor : "#c1c1c1",
				menuplace : "LEFT",
				openfullnavigation : true
			}
		},
		footer : {
			open : false,
			height : 50,
			config : {}
		}
	};

	var themeDemo = jQuery.extend(true, {}, {}, theme);
	themeDemo.themeid = co.getNumber();
	themeDemo.typeSchemeType = "STYLE-1";
	themeDemo.label = "后台管理样式";
	themeDemo.open = true;
	themeDemo.forsizes = "all";
	style_map[themeDemo.typeSchemeType] = themeDemo;

	var themeDemo = jQuery.extend(true, {}, {}, theme);
	themeDemo.themeid = co.getNumber();
	themeDemo.open = true;
	themeDemo.forsizes = "all";
	themeDemo.typeSchemeType = "STYLE-2";
	themeDemo.label = "平台样式";
	themeDemo.width = "";
	themeDemo.minwidth = "1024";
	themeDemo.backgroundcolor = "#e7e8eb";
	themeDemo.config.menuplaces = "HEADER,BODY";

	themeDemo.header.width = "";
	themeDemo.header.minwidth = "";
	themeDemo.header.maxwidth = "";
	themeDemo.header.contentwidth = "80%";
	themeDemo.header.contentmaxwidth = "1200";
	themeDemo.header.contentstyle = "font-family: \"Segoe UI\", \"Lucida Grande\", Helvetica, Arial, \"Microsoft YaHei\", FreeSans, Arimo, \"Droid Sans\", \"wenquanyi micro hei\", \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"FontAwesome\", sans-serif;";
	themeDemo.header.height = "50";
	themeDemo.header.style = "border-bottom: 3px solid #2bbdb1;";
	themeDemo.header.backgroundcolor = "#ffffff";
	themeDemo.header.leftwidth = "220";
	themeDemo.header.color = "#222222";
	themeDemo.header.config.title = "";
	themeDemo.header.config.overcolor = "";
	themeDemo.header.config.overbackgroundcolor = "";
	themeDemo.header.config.overacolor = "#44b549";
	themeDemo.header.config.overabackgroundcolor = "";
	themeDemo.header.config.activecolor = "#ffffff";
	themeDemo.header.config.activebackgroundcolor = "#3ce0d3";
	themeDemo.header.config.menuopencolor = "";
	themeDemo.header.config.menuopenbackgroundcolor = "";
	themeDemo.header.config.menuopenacolor = "#cacaca";
	themeDemo.header.config.menuopenabackgroundcolor = "#ffffff";

	themeDemo.body.width = "90%";
	themeDemo.body.maxwidth = "1300";
	themeDemo.body.minwidth = "1100";
	themeDemo.body.leftwidth = "220";
	themeDemo.body.leftcolor = "#595959";
	themeDemo.body.leftbackgroundcolor = "#ffffff";
	themeDemo.body.backgroundcolor = "#ffffff";
	themeDemo.body.contentstyle = "font-family: \"Segoe UI\", \"Lucida Grande\", Helvetica, Arial, \"Microsoft YaHei\", FreeSans, Arimo, \"Droid Sans\", \"wenquanyi micro hei\", \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"FontAwesome\", sans-serif;";

	themeDemo.body.contentbackgroundcolor = "#ffffff";
	themeDemo.body.margin = "20px auto 20px";
	themeDemo.body.config.menuplace = "LEFT";
	themeDemo.body.config.openfullnavigation = 0;
	themeDemo.body.config.menuopen = true;
	themeDemo.body.config.overcolor = "";
	themeDemo.body.config.overbackgroundcolor = "";
	themeDemo.body.config.overacolor = "#ffffff";
	themeDemo.body.config.overabackgroundcolor = "#2bbdb1";
	themeDemo.body.config.menuopencolor = "";
	themeDemo.body.config.menuopenbackgroundcolor = "";
	themeDemo.body.config.menuopenacolor = "#cacaca";
	themeDemo.body.config.menuopenabackgroundcolor = "#ffffff";
	themeDemo.body.config.activecolor = "#ffffff";
	themeDemo.body.config.activebackgroundcolor = "#3ce0d3";
	themeDemo.body.config.activeacolor = "";
	themeDemo.body.config.activeabackgroundcolor = "";
	themeDemo.footer.open = false;
	style_map[themeDemo.typeSchemeType] = themeDemo;

})();
(function(window, jQuery, coos) {
	var html = '';

	var ThisTheme = function(config) {
		co.frame.theme.Theme.call(this, config);
	};
	(function() {
		var Super = function() {
		};
		Super.prototype = co.frame.theme.Theme.prototype;
		ThisTheme.prototype = new Super();
	})();
	ThisTheme.prototype.getStyle = function() {
		var theme = this.theme;
		return "";
	};
	ThisTheme.prototype.initData = function() {
		var theme = this.theme;
		this.hasHeaderMenu = false;
		this.hasBodyMenu = false;
		this.hasFooterMenu = false;
		var menuplaces = (theme.config.menuplaces || "").toUpperCase().split(',');
		this.hasHeaderMenu = (jQuery.inArray("HEADER", menuplaces) >= 0);
		this.hasBodyMenu = (jQuery.inArray("BODY", menuplaces) >= 0);
		this.hasFooterMenu = (jQuery.inArray("FOOTER", menuplaces) >= 0);

	};

	ThisTheme.prototype.initHeader = function() {
		var theme = this.theme;

		var $header = this.$header;
		var $content = this.$header.find(".coos-header-left");
		$content.empty();
		if (theme.header.open) {
			var config = theme.header.config;
			this.$frame.addClass('coos-open-header');
			var $headerleft = $header.find(".coos-header-left");
			if (!coos.isEmpty(config.title) || !coos.isEmpty(config.icon)) {
				var icon = config.icon;
				if (!coos.isEmpty(icon)) {
					var $image = $('<img class="coos-logo-icon float-left element-rule-image coos-bd-no mgtb-5 mgl-20" use-file-server-url="true" coos-path="' + icon + '"/>');
					$content.append($image);
					coos.element.init($content);
				}
				if (!coos.isEmpty(config.title)) {
					var $h3 = $('<h3 class="coos-logo-title float-right mgtb-5 mgr-20" >' + config.title + '</h3>');
					$content.append($h3);
				}
			}
			var $leftUl = $('<ul class="float-left coos-header-left-button coos-menu-navigation "></ul>');
			var $rightUl = $('<ul class="float-right coos-header-right-button coos-menu-navigation "></ul>');
			$header.find('.coos-header-left-button').remove();
			$header.find('.coos-header-right-button').remove();

			if (config.showcontrolbodyleft) {
				$header.find('.coos-header-left').before($leftUl);
				var $button = $('<li class="coos-control-body-left"><a class="fa fa-navicon"></a></li>');
				$leftUl.append($button);
			}
			if (config.showcontrolbodyright) {
				$header.find('.coos-header-right').before($rightUl);
				var $button = $('<li class="coos-control-body-right"><a class="fa fa-navicon"></a></li>');
				$rightUl.append($button);
			}
		} else {
			this.hasHeaderMenu = false;
			$header.hide();
			this.$frame.removeClass('coos-open-header');
		}

	};
	ThisTheme.prototype.initBody = function() {
		var theme = this.theme;
		this.$menucontainer = null;
		if (this.hasBodyMenu) {
			var config = theme.body.config;
			if (config.menuplace == 'RIGHT') {
				this.$menucontainer = this.$body.find('.coos-body-right');
				if (!config.defaulthideright) {
					this.$frame.addClass('coos-open-body-right');
				} else {
					this.$frame.removeClass('coos-open-body-right');
				}
			} else {
				this.$menucontainer = this.$body.find('.coos-body-left');
				if (!config.defaulthideleft) {
					this.$frame.addClass('coos-open-body-left');
				} else {
					this.$frame.removeClass('coos-open-body-left');
				}

			}
			if (!config.defaulthideright) {
				this.$frame.removeClass('coos-default-hide-body-right');
			} else {
				this.$frame.addClass('coos-default-hide-body-right');
			}
			if (!config.defaulthideleft) {
				this.$frame.removeClass('coos-default-hide-body-left');
			} else {
				this.$frame.addClass('coos-default-hide-body-left');
			}
		} else {
			this.$frame.removeClass('coos-open-body-left coos-open-body-right');
		}
		this.$body.find('.coos-body-top').find('.coos-body-top-navigation').remove();
		if (theme.body.config.openfullnavigation) {
			var $navigation = $('<div class="coos-body-top-navigation"><ul></ul></div>');
			var $horizontal = $('<li coos-action="full-or-empty-horizontal" class="coos-control-horizontal"><i class="fa fa-arrows-h"></i></li>');
			var $vertical = $('<li coos-action="full-or-empty-vertical" class="coos-control-vertical"><i class="fa fa-arrows-v"></i></li>');
			var $screen = $('<li coos-action="full-or-empty-screen" class="coos-control-screen"><i class="fa fa-arrows"></i></i></li>');
			$navigation.find('ul').append($horizontal);
			$navigation.find('ul').append($vertical);
			$navigation.find('ul').append($screen);
			this.$body.find('.coos-body-top').append($navigation);
			this.$body.find('.coos-body-top').show();

		} else {
			this.$body.find('.coos-body-top').hide();
		}
	};

	ThisTheme.prototype.initFooter = function() {
		var theme = this.theme;
		if (theme.footer.open) {

		} else {
			this.hasFooterMenu = false;
		}
	};

	ThisTheme.prototype.initMenu = function() {
		this.initMenuView();
	};

	ThisTheme.prototype.initMenuView = function() {
		var topmenus = this.menu_object.getTopMenus();
		var $center = this.$header.find(".coos-header-center").empty();
		if (this.hasHeaderMenu) {
			this.initHeaderMenu(topmenus);
		} else {
			if (this.hasBodyMenu) {
				this.initBodyMenu(topmenus);
			}
		}
		var servletPath = coos.url.getCurrentAction();
		var $menu = $('[coos-menu-servletpath="' + servletPath + '"]');
		if ($menu.length > 0) {
			$menu = $($menu[0]);
			$('[coos-menu-servletpath]').closest('li').removeClass('active');
			$menu.closest('li').addClass('active');
			var $parentli = $menu.closest('ul').closest('li');
			if ($parentli.length > 0 && !$parentli.hasClass('coos-open')) {
				coos.frame.openOrCloseLi($parentli, true);
			}
		}
	};

	ThisTheme.prototype.initHeaderMenu = function(menus) {
		var theme = this.theme;
		var $center = this.$header.find(".coos-header-center").empty();
		var $headerMenu = $('<div class="coos-header-menu"></div>');
		$center.append($headerMenu);

		var $ul = $('<ul class="coos-menu-navigation"></ul>');
		$headerMenu.append($ul);
		var $firstChildMenu = null;
		var this_ = this;
		$(menus).each(function(index, menu) {
			var $menu = this_.menu_object.getMenuLi(menu);
			if (this_.hasBodyMenu) {
				var childmenus = this_.menu_object.getChildMenus(menu);
				if (childmenus.length > 0) {
					$menu.find('a').click(function() {
						var li = $(this).closest('li');
						if (!li.hasClass('coos-open')) {
							$ul.find('li').removeClass('coos-open');
							li.addClass('coos-open');
							$(menus).each(function(index, menu_) {
								this_.menu_object.removeCheckedParentMenuid(menu_.menuid);
							});
							this_.menu_object.setCheckedParentMenuid(menu.menuid);
							this_.initBodyMenu(childmenus);
						}
					});
					if (this_.menu_object.hasCheckedParentMenuid(menu.menuid)) {
						$firstChildMenu = $menu;
					}
					if ($firstChildMenu == null) {
						$firstChildMenu = $menu;
					}
				} else {
				}
			} else {
				this_.menu_object.initChildMenu($menu, menu, 'down');
			}
			$ul.append($menu);
		});
		coos.frame.afterHeaderMenuBuild();
		if (this.hasBodyMenu) {
			if ($firstChildMenu != null) {
				$firstChildMenu.find('a:first').click();
			}

		}
	};
	ThisTheme.prototype.initBodyMenu = function(menus) {
		var this_ = this;
		var bodycheckparentmenuid = coos.localData.get("co.frame.theme.bodycheckparentmenuid");

		var theme = this.theme;
		var $center = this.$menucontainer.empty();
		var $bodyMenu = $('<div class="coos-body-menu"><div class="coos-body-menu-top"></div><div class="coos-body-menu-center"><div class="coos-menu-title">菜单导航</div></div><div class="coos-body-menu-bottom pdtb-30"></div></div>');

		if (theme.body.config.menuopen) {
			$bodyMenu.addClass('coos-body-menu-open');
		} else {
			$bodyMenu.removeClass('coos-body-menu-open');
		}
		$center.append($bodyMenu);

		var $ul = $('<ul class="coos-menu-navigation"></ul>');
		$bodyMenu.find('.coos-body-menu-center').append($ul);
		var $firstChildMenu = null;
		$(menus).each(function(index, menu) {
			var $menu = this_.menu_object.getMenuLi(menu);
			this_.menu_object.initChildMenu($menu, menu, 'right');
			$ul.append($menu);
			var childmenus = this_.menu_object.getChildMenus(menu);
			if (childmenus.length > 0) {
			}
		});
		$ul.find('li a').click(function() {
			var li = $(this).closest('li');
			if (li.find('>.coos-child-menu').length > 0) {
				this_.menu_object.openOrCloseLi(li, true);
			} else {
				var menu = $(this).data('menu');
				this_.menu_object.setCheckedMenuid(menu.menuid);
				$ul.find('li').removeClass('active');
				li.addClass('active');
			}
		});
		var $lis = $ul.find('li');
		$($lis).each(function(index, $li) {
			$li = $($li);
			if ($li.find('>.coos-child-menu').length > 0) {
				var menu = $li.find('a:first').data('menu');
				if (this_.menu_object.hasCheckedParentMenuid(menu.menuid)) {
					this_.menu_object.openOrCloseLi($li, false);
				}
			}
		});
		if (theme.body.config.menuopen) {
			$bodyMenu.find('.coos-child-menu').closest('li').addClass('coos-open');
		}
		coos.frame.afterBodyMenuBuild();
	};

	ThisTheme.prototype.initMenuSize = function(menus) {
	};

	var ThisThemeConfig = {
		name : "管理后台主题",
		columns : [ {
			text : "菜单位置",
			name : "menuplaces",
			inputtype : "select",
			datas : [ {
				value : "HEADER,BODY",
				text : "头部和体部"
			}, {
				value : "HEADER",
				text : "头部"
			}, {
				value : "BODY",
				text : "体部"
			} ]
		} ],
		headercolumns : [ {
			text : "标题",
			name : "title"
		}, {
			text : "LOGO",
			name : "icon",
			inputtype : "image"
		}, {
			text : "显示左侧控制",
			name : "showcontrolbodyleft",
			inputtype : "switch"
		}, {
			text : "显示右侧控制",
			name : "showcontrolbodyright",
			inputtype : "switch"
		}, {
			text : "默认隐藏菜单",
			name : "defaulthidemenu",
			inputtype : "switch"
		}, {
			text : "悬浮颜色",
			name : "overcolor",
			inputtype : "color"
		}, {
			text : "悬浮背景",
			name : "overbackgroundcolor",
			inputtype : "color"
		}, {
			text : "悬浮按钮颜色",
			name : "overacolor",
			inputtype : "color"
		}, {
			text : "悬浮按钮背景",
			name : "overabackgroundcolor",
			inputtype : "color"
		}, {
			text : "菜单打开颜色",
			name : "menuopencolor",
			inputtype : "color"
		}, {
			text : "菜单打开背景",
			name : "menuopenbackgroundcolor",
			inputtype : "color"
		}, {
			text : "菜单打开按钮颜色",
			name : "menuopenacolor",
			inputtype : "color"
		}, {
			text : "菜单打开按钮背景",
			name : "menuopenabackgroundcolor",
			inputtype : "color"
		}, {
			text : "活动颜色",
			name : "activecolor",
			inputtype : "color"
		}, {
			text : "活动背景",
			name : "activebackgroundcolor",
			inputtype : "color"
		}, {
			text : "活动按钮颜色",
			name : "activeacolor",
			inputtype : "color"
		}, {
			text : "活动按钮背景",
			name : "activeabackgroundcolor",
			inputtype : "color"
		} ],
		bodycolumns : [ {
			text : "菜单位置",
			name : "menuplace",
			inputtype : "select",
			datas : [ {
				value : "LEFT",
				text : "左侧"
			}, {
				value : "RIGHT",
				text : "右侧"
			} ]
		}, {
			text : "默认隐藏左侧",
			name : "defaulthideleft",
			inputtype : "switch"
		}, {
			text : "默认隐藏菜单",
			name : "defaulthidemenu",
			inputtype : "switch"
		}, {
			text : "开启全屏导航",
			name : "openfullnavigation",
			inputtype : "switch"
		}, {
			text : "菜单全部展开",
			name : "menuopen",
			inputtype : "switch"
		}, {
			text : "悬浮颜色",
			name : "overcolor",
			inputtype : "color"
		}, {
			text : "悬浮背景",
			name : "overbackgroundcolor",
			inputtype : "color"
		}, {
			text : "悬浮按钮颜色",
			name : "overacolor",
			inputtype : "color"
		}, {
			text : "悬浮按钮背景",
			name : "overabackgroundcolor",
			inputtype : "color"
		}, {
			text : "菜单打开颜色",
			name : "menuopencolor",
			inputtype : "color"
		}, {
			text : "菜单打开背景",
			name : "menuopenbackgroundcolor",
			inputtype : "color"
		}, {
			text : "菜单打开按钮颜色",
			name : "menuopenacolor",
			inputtype : "color"
		}, {
			text : "菜单打开按钮背景",
			name : "menuopenabackgroundcolor",
			inputtype : "color"
		}, {
			text : "活动颜色",
			name : "activecolor",
			inputtype : "color"
		}, {
			text : "活动背景",
			name : "activebackgroundcolor",
			inputtype : "color"
		}, {
			text : "活动按钮颜色",
			name : "activeacolor",
			inputtype : "color"
		}, {
			text : "活动按钮背景",
			name : "activeabackgroundcolor",
			inputtype : "color"
		} ],
		footercolumns : [],
		element : {}
	};
	co.frame.theme.model.defind("MOBILE", ThisThemeConfig, ThisTheme);
})(window, jQuery, coos);
(function() {
	var color_map = {};

	co.frame.theme.model.get("MOBILE").getColor = function(name, config) {
		name = co.isEmpty(name) ? "COLOR-SCHEME-1" : name;
		config = config || {};
		var data = color_map[name] || {};
		var demo = jQuery.extend(true, {}, data);
		demo = jQuery.extend(true, {}, demo, config);
		return demo;
	};
	co.frame.theme.model.get("MOBILE").initColor = function(name, config) {
		var colorScheme = co.frame.theme.model.get("MOBILE").getColor(name, config);
		var usingTheme = co.frame.getUsingTheme();
		var usingThemeObject = co.frame.getUsingThemeObject();
		jQuery.extend(true, usingTheme, colorScheme);
		usingThemeObject.writeStyle();
	};
	co.frame.theme.model.get("MOBILE").getColorMap = function() {
		return color_map;
	};

	window.getPartRGB = function(index, part) {
		part = part || 5;
		// 第几组
		var groupIndex = Math.floor(index / part);
		var groupValueIndex = (index < part) ? index : index % part;
		var rs = [ 0, 255, 255, 0, 0, 255, 0 ];
		var gs = [ 0, 0, 255, 255, 255, 0, 0 ];
		var bs = [ 0, 0, 0, 0, 255, 255, 255 ];
		var r = getRGBOneValue(groupIndex, rs, part, groupValueIndex);
		var g = getRGBOneValue(groupIndex, gs, part, groupValueIndex);
		var b = getRGBOneValue(groupIndex, bs, part, groupValueIndex);
		var rgb = "rgb(" + r + "," + g + "," + b + ")";
		return rgb;
	}
	function getRGBOneValue(index, vs, part, a) {
		var startIndex = index >= vs.length ? index % vs.length : index;
		var vStart = vs[startIndex];
		var vEnd = vs[(startIndex + 1) >= vs.length ? 0 : (startIndex + 1)];
		var v = vStart;
		if (vStart != vEnd) {
			if (vStart < vEnd) {
				v = v + Math.floor((vEnd - vStart) / part * a);
			} else {
				v = v - Math.floor((vStart + vEnd) / part * a);
			}
		}
		return v;
	}

	var index = 3;
	// 暗色
	var lastB = '#4d575a';
	var count = index + 28;
	for (; index < (count); index++) {
		var c1 = "#ffffff";
		var c2 = "#ffffff";
		var c3 = "#ffffff";
		var c4 = "#ffffff";
		var b1 = getPartRGB(((index - 1)), 4);
		var b2 = co.color.getSimilar(b1, 30);

		var b3 = b1;
		var b4 = co.color.getSimilar(b1, -10);
		var b5 = co.color.getSimilar(b4, -30);
		var b6 = b5;
		var b7 = b5;
		var b8 = b1;
		var colorScheme = {
			header : {
				backgroundcolor : b1,
				color : c1,
				style : "",
				config : {
					/*
					 * overbackgroundcolor : "#3d4446", overcolor : "#ffffff",
					 */
					overabackgroundcolor : b2,
					overacolor : c2
				}
			},
			body : {
				backgroundcolor : b3,
				leftcolor : c3,
				leftbackgroundcolor : b4,
				/* color : "#ffffff", */
				/*
				 * rightcolor : "#ffffff", rightbackgroundcolor : "#4d575a",
				 */
				config : {
					/* overcolor : "#ffffff", */
					overbackgroundcolor : b5,
					/* overacolor : "#ffffff", */
					overabackgroundcolor : b6,
					/* activeacolor : "#ffffff", */
					activeabackgroundcolor : b7,
					menuopenacolor : c4,
					menuopenabackgroundcolor : b8
				}
			}
		};
		colorScheme.colorSchemeType = "COLOR-SCHEME-" + index;
		color_map[colorScheme.colorSchemeType] = colorScheme;
	}
	// 亮色
	var count = index + 28;
	for (; index < (count); index++) {
		var c1 = "#222222";
		var c2 = "#595959";
		var c2 = getPartRGB(((index - 1)), 4);
		var c3 = "#222222";
		var c4 = "#ffffff";
		var c5 = "#8d8d8d";

		var b1 = "#ffffff";
		var b2 = "#f9f9f9";
		var b2 = "#ffffff";

		var b3 = "#ffffff";
		var b4 = "#ffffff";
		var b5 = "#2bbdb1";
		var b5 = getPartRGB(((index - 1)), 4);
		var b6 = b5;
		var b7 = "#3ce0d3";
		var b7 = co.color.getSimilar(b5, -30);
		var b8 = "#ffffff";

		var colorScheme = {
			header : {
				backgroundcolor : b1,
				color : c1,
				style : "border-bottom: 3px solid " + b5 + ";",
				config : {
					/*
					 * overbackgroundcolor : "#3d4446", overcolor : "#ffffff",
					 */
					overabackgroundcolor : b2,
					overacolor : c2
				}
			},
			body : {
				backgroundcolor : b3,
				leftcolor : c3,
				leftbackgroundcolor : b4,
				/* color : "#ffffff", */
				/*
				 * rightcolor : "#ffffff", rightbackgroundcolor : "#4d575a",
				 */
				config : {
					/* overcolor : "#ffffff", */
					overbackgroundcolor : b5,
					/* overacolor : "#ffffff", */
					overabackgroundcolor : b6,
					activeacolor : c4,
					activeabackgroundcolor : b7,
					menuopenacolor : c5,
					menuopenabackgroundcolor : b8
				}
			}
		};
		colorScheme.colorSchemeType = "COLOR-SCHEME-" + index;
		color_map[colorScheme.colorSchemeType] = colorScheme;
	}
})();
(function() {
	var layout_map = {};
	co.frame.theme.model.get("MOBILE").getLayout = function(name, config) {
		name = co.isEmpty(name) ? "LAYOUT-SCHEME-1" : name;
		config = config || {};
		var data = layout_map[name] || {};
		var demo = jQuery.extend(true, {}, data);
		demo = jQuery.extend(true, {}, demo, config);
		return demo;
	};

	co.frame.theme.model.get("MOBILE").initLayout = function(name, config) {
		var scheme = co.frame.theme.model.get("MOBILE").getLayout(name, config);
		var usingTheme = co.frame.getUsingTheme();
		var usingThemeObject = co.frame.getUsingThemeObject();
		jQuery.extend(true, usingTheme, scheme);
		usingThemeObject.writeStyle();
	};
	co.frame.theme.model.get("MOBILE").getLayoutMap = function() {
		return layout_map;
	};

	var layoutScheme = {
		width : "",
		minwidth : "1024",
		header : {
			height : "",
			width : "",
			minwidth : "",
			maxwidth : "",
			contentwidth : "",
			contentmaxwidth : "",
			leftwidth : ""
		},
		body : {
			width : "",
			minwidth : "",
			maxwidth : "",
			leftwidth : "",
			rightwidth : "",
			margin : "20px auto 20px"
		}
	};
	layoutScheme.layoutSchemeType = "LAYOUT-SCHEME-1";
	layout_map[layoutScheme.layoutSchemeType] = layoutScheme;
})();

(function() {
	var style_map = {};
	co.frame.theme.model.get("MOBILE").getStyle = function(name) {
		name = name || "STYLE-2";
		return style_map[name] || {};
	};
	co.frame.theme.model.get("MOBILE").getStyleMap = function() {
		return style_map;
	};
	var title = co.getTitle();
	if (window.THIS_PROJECT) {
		title = window.THIS_PROJECT.title;
	}

	var theme = {
		themeid : co.getNumber(),
		type : "MOBILE",
		minwidth : 1024,
		config : {
			menuplaces : "HEADER,BODY"
		},
		header : {
			open : true,
			backgroundcolor : "#4d575a",
			color : "#ffffff",
			height : 50,
			leftwidth : 220,
			config : {
				overabackgroundcolor : "#3d4446",
				overacolor : "#ffffff",
				menuopenacolor : "#c1c1c1",
				activeabackgroundcolor : "#3d4446",
				activeacolor : "#ffffff",
				title : title,
				buttons : [ {
					icon : 'fa fa-power-off',
					label : "登录",
					type : "LOGIN",
					showrule : "USER_INFO == null"
				}, {
					icon : 'fa fa-user',
					type : "USER",
					showrule : "USER_INFO != null",
					childbuttons : [ {
						label : "修改密码",
						type : "UPDATE-PASSWORD"
					}, {
						label : "退出",
						type : "LOGOUT"
					} ]
				} ]
			}
		},
		body : {
			leftbackgroundcolor : "#4d575a",
			leftcolor : "#ffffff",
			rightbackgroundcolor : "#4d575a",
			rightcolor : "#ffffff",
			leftwidth : 220,
			rightwidth : 220,
			config : {
				overabackgroundcolor : "#3d4446",
				overacolor : "#ffffff",
				activeabackgroundcolor : "#3d4446",
				activeacolor : "#ffffff",
				menuopenacolor : "#c1c1c1",
				menuplace : "LEFT",
				openfullnavigation : true
			}
		},
		footer : {
			open : false,
			height : 50,
			config : {}
		}
	};

	var themeDemo = jQuery.extend(true, {}, {}, theme);
	themeDemo.themeid = co.getNumber();
	themeDemo.typeSchemeType = "STYLE-1";
	themeDemo.label = "后台管理样式";
	themeDemo.open = true;
	themeDemo.forsizes = "all";
	style_map[themeDemo.typeSchemeType] = themeDemo;

	var themeDemo = jQuery.extend(true, {}, {}, theme);
	themeDemo.themeid = co.getNumber();
	themeDemo.open = true;
	themeDemo.forsizes = "all";
	themeDemo.typeSchemeType = "STYLE-2";
	themeDemo.label = "平台样式";
	themeDemo.width = "";
	themeDemo.minwidth = "1024";
	themeDemo.backgroundcolor = "#e7e8eb";
	themeDemo.config.menuplaces = "HEADER,BODY";

	themeDemo.header.width = "";
	themeDemo.header.minwidth = "";
	themeDemo.header.maxwidth = "";
	themeDemo.header.contentwidth = "80%";
	themeDemo.header.contentmaxwidth = "1200";
	themeDemo.header.contentstyle = "font-family: \"Segoe UI\", \"Lucida Grande\", Helvetica, Arial, \"Microsoft YaHei\", FreeSans, Arimo, \"Droid Sans\", \"wenquanyi micro hei\", \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"FontAwesome\", sans-serif;";
	themeDemo.header.height = "50";
	themeDemo.header.style = "border-bottom: 3px solid #2bbdb1;";
	themeDemo.header.backgroundcolor = "#ffffff";
	themeDemo.header.leftwidth = "220";
	themeDemo.header.color = "#222222";
	themeDemo.header.config.title = "";
	themeDemo.header.config.overcolor = "";
	themeDemo.header.config.overbackgroundcolor = "";
	themeDemo.header.config.overacolor = "#44b549";
	themeDemo.header.config.overabackgroundcolor = "";
	themeDemo.header.config.activecolor = "#ffffff";
	themeDemo.header.config.activebackgroundcolor = "#3ce0d3";
	themeDemo.header.config.menuopencolor = "";
	themeDemo.header.config.menuopenbackgroundcolor = "";
	themeDemo.header.config.menuopenacolor = "#cacaca";
	themeDemo.header.config.menuopenabackgroundcolor = "#ffffff";

	themeDemo.body.width = "90%";
	themeDemo.body.maxwidth = "1300";
	themeDemo.body.minwidth = "1100";
	themeDemo.body.leftwidth = "220";
	themeDemo.body.leftcolor = "#595959";
	themeDemo.body.leftbackgroundcolor = "#ffffff";
	themeDemo.body.backgroundcolor = "#ffffff";
	themeDemo.body.contentstyle = "font-family: \"Segoe UI\", \"Lucida Grande\", Helvetica, Arial, \"Microsoft YaHei\", FreeSans, Arimo, \"Droid Sans\", \"wenquanyi micro hei\", \"Hiragino Sans GB\", \"Hiragino Sans GB W3\", \"FontAwesome\", sans-serif;";

	themeDemo.body.contentbackgroundcolor = "#ffffff";
	themeDemo.body.margin = "20px auto 20px";
	themeDemo.body.config.menuplace = "LEFT";
	themeDemo.body.config.openfullnavigation = 0;
	themeDemo.body.config.menuopen = true;
	themeDemo.body.config.overcolor = "";
	themeDemo.body.config.overbackgroundcolor = "";
	themeDemo.body.config.overacolor = "#ffffff";
	themeDemo.body.config.overabackgroundcolor = "#2bbdb1";
	themeDemo.body.config.menuopencolor = "";
	themeDemo.body.config.menuopenbackgroundcolor = "";
	themeDemo.body.config.menuopenacolor = "#cacaca";
	themeDemo.body.config.menuopenabackgroundcolor = "#ffffff";
	themeDemo.body.config.activecolor = "#ffffff";
	themeDemo.body.config.activebackgroundcolor = "#3ce0d3";
	themeDemo.body.config.activeacolor = "";
	themeDemo.body.config.activeabackgroundcolor = "";
	themeDemo.footer.open = false;
	style_map[themeDemo.typeSchemeType] = themeDemo;

})();

})(window, jQuery, coos);