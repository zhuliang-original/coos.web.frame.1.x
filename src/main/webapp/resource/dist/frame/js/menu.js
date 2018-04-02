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