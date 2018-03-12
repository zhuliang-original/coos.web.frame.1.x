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