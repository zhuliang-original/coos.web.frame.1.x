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