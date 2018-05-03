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

			var $leftUl = $('<ul class="coos-header-left-button coos-menu-navigation "></ul>');
			$header.find('.coos-header-left-button').remove();

			if (config.showcontrolbodyleft) {
				$headerleft.append($leftUl);
				var $button = $('<li class="coos-control-body-left"><a class="fa fa-navicon"></a></li>');
				$leftUl.append($button);
			}
			
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
			var $rightUl = $('<ul class="coos-header-right-button coos-menu-navigation "></ul>');
			$header.find('.coos-header-right-button').remove();
			if (config.showcontrolbodyright) {
				$header.find('.coos-header-right').append($rightUl);
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
		var this_ = this;
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
				this_.menu_object.openOrCloseLi($parentli, true);
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