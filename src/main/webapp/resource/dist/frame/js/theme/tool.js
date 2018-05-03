(function() {
	co.frame.theme.getTheme = function(type, name, config) {
		var THIS_PROJECT = window.THIS_PROJECT || {};
		var defaultthemeconfig = {};
		if (!co.isEmpty(THIS_PROJECT.defaultthemeconfig)) {
			defaultthemeconfig = JSON.parse(THIS_PROJECT.defaultthemeconfig);
		}
		var defaultType = "MANAGER";
		var defaultName = "STYLE-2";
		if (!co.isEmpty(defaultthemeconfig.themetype)) {
			defaultType = defaultthemeconfig.themetype;
		}
		if (!co.isEmpty(defaultthemeconfig.styletype)) {
			defaultName = defaultthemeconfig.styletype;
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
			if (!co.isEmpty(defaultthemeconfig.colortype)) {
				var colorScheme = co.frame.theme.model.get(type).getColor(defaultthemeconfig.colortype);
				jQuery.extend(true, themeDemo, colorScheme);
			}
			if (!co.isEmpty(defaultthemeconfig.headercolortype)) {
				var colorScheme = co.frame.theme.model.get(type).getColor(defaultthemeconfig.headercolortype);
				jQuery.extend(true, themeDemo, {
					header : colorScheme.header
				});
			}
			if (!co.isEmpty(defaultthemeconfig.bodycolortype)) {
				var colorScheme = co.frame.theme.model.get(type).getColor(defaultthemeconfig.bodycolortype);
				jQuery.extend(true, themeDemo, {
					body : colorScheme.body
				});
			}
			if (!co.isEmpty(defaultthemeconfig.footercolortype)) {
				var colorScheme = co.frame.theme.model.get(type).getColor(defaultthemeconfig.footercolortype);
				jQuery.extend(true, themeDemo, {
					footer : colorScheme.footer
				});
			}
			if (!co.isEmpty(defaultthemeconfig.menuplace)) {
				jQuery.extend(true, themeDemo, {
					config : {
						menuplaces : defaultthemeconfig.menuplace
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
			jQuery.extend(true, themeDemo, {
				header : {
					config : {
						showcontrolbodyleft : co.isTrue(defaultthemeconfig.showcontrolbodyleft)
					}
				}
			});

			jQuery.extend(true, themeDemo, {
				header : {
					config : {
						showcontrolbodyright : co.isTrue(defaultthemeconfig.showcontrolbodyright)
					}
				}
			});
			jQuery.extend(true, themeDemo, {
				body : {
					config : {
						openfullnavigation : co.isTrue(defaultthemeconfig.openfullnavigation)
					}
				}
			});
		}
		themeDemo.themeid = co.getNumber();
		return themeDemo;
	};

})();