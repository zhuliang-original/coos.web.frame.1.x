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
	menu.name = "基础JS";
	menu.servletpath = "/js/index.html";
	// menu.onClick = function() {
	// coos.box.info('功能暂未上线，敬请期待！');
	// return false;
	// }
	menus[menus.length] = menu;

	var menu = {};
	menu.menuid = 21;
	menu.name = "表单组件";
	menu.servletpath = "/component/form.html";
	menus[menus.length] = menu;

	var menu = {};
	menu.menuid = 21;
	menu.name = "其它组件";
	menu.servletpath = "/component/other.html";
	// menu.onClick = function() {
	// coos.box.info('功能暂未上线，敬请期待！');
	// return;
	// }
	menus[menus.length] = menu;

	var menu = {};
	menu.menuid = 21;
	menu.name = "JS组件";
	menu.servletpath = "/component/js.html";
	// menu.onClick = function() {
	// coos.box.info('功能暂未上线，敬请期待！');
	// return false;
	// }
	menus[menus.length] = menu;

	coos.setTitle('COOS Frame');

	var thisTheme = coos.frame.theme.getTheme('MANAGER', 'STYLE-2', {
		config : {
			menuplaces : 'HEADER'

		},
		header : {
			fixed : true,
			style : "border-bottom:3px solid #da7e2b;",
			config : {
				title : 'COOS Frame'
			}
		},
		body : {
			width : null,
			maxwidth : null,
			margin : "",
			config : {}
		}

	});
	thisTheme.header.config.buttons = [];

	coos.page.config.single = true;
	coos.config.server.fileServerUrl = fileServerUrl;
	coos.frame.init({
		project : {
			title : "COOS Frame",
			themes : [ thisTheme ],
			header_buttons : []
		},
		menus : menus
	});

})();