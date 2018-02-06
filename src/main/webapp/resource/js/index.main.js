(function() {
	"use strict";

	var menus = [];

	var menu = {};
	menu.menuid = 11;
	menu.name = "使用";
	menu.servletpath = "/index/index.html";
	menu.parentid = 1;
	menus[menus.length] = menu;

	var menu = {};
	menu.menuid = 21;
	menu.name = "基础CSS";
	menu.servletpath = "/css/index.html";
	menus[menus.length] = menu;

	var menu = {};
	menu.menuid = 21;
	menu.name = "CSS组件";
	menu.servletpath = "/css/component.html";
	menus[menus.length] = menu;

	var menu = {};
	menu.menuid = 21;
	menu.name = "JS组件";
	menu.servletpath = "/js/component.html";
	menus[menus.length] = menu;

	coos.setTitle('COOS Frame');

	var thisTheme = coos.frame.theme.getTheme('STYLE-2', {
		config : {
			menuplaces : 'HEADER'

		},
		header : {
			fixed : true,
			style : "border-bottom:3px solid #3a0133;",
			config : {
				title : 'COOS Frame'
			}
		},
		body : {
			width : null,
			maxwidth : null,
			config : {}
		}

	});

	coos.page.config.single = true;
	coos.config.server.fileServerUrl = fileServerUrl;
	coos.frame.init({
		project : {
			title : "COOS Frame",
			themes : [ thisTheme ]
		},
		menus : menus
	});

})();