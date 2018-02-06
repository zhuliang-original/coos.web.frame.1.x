(function() {
	co.frame.theme.getTheme = function(name, config) {
		var defaultName = "STYLE-2";
		if (window.THIS_PROJECT && !window.THIS_PROJECT.design && !coos.isEmpty(window.THIS_PROJECT.defaultstyletype)) {
			defaultName = window.THIS_PROJECT.defaultstyletype;
		}
		name = coos.isEmpty(name) ? defaultName : name;
		config = config || {};
		var theme = DEFAULT_THEME_MAP[name] || {};
		var themeDemo = jQuery.extend(true, {}, theme);
		themeDemo = jQuery.extend(true, {}, themeDemo, config);
		if (window.THIS_PROJECT && !window.THIS_PROJECT.design) {
			if (!coos.isEmpty(window.THIS_PROJECT.name)) {
				if (themeDemo.header && themeDemo.header.config && coos.isEmpty(themeDemo.header.config.title)) {
					themeDemo.header.config.title = window.THIS_PROJECT.name;
				}
			}
			if (!coos.isEmpty(window.THIS_PROJECT.defaultcolortype)) {
				var colorScheme = coos.frame.getDefaultThemeColorScheme(window.THIS_PROJECT.defaultcolortype);
				jQuery.extend(true, themeDemo, colorScheme);
			}
			if (!coos.isEmpty(window.THIS_PROJECT.defaultheadercolortype)) {
				var colorScheme = coos.frame.getDefaultThemeColorScheme(window.THIS_PROJECT.defaultheadercolortype);
				jQuery.extend(true, themeDemo, {
					header : colorScheme.header
				});
			}
			if (!coos.isEmpty(window.THIS_PROJECT.defaultbodycolortype)) {
				var colorScheme = coos.frame.getDefaultThemeColorScheme(window.THIS_PROJECT.defaultbodycolortype);
				jQuery.extend(true, themeDemo, {
					body : colorScheme.body
				});
			}
		}
		themeDemo.themeid = coos.getNumber();
		return themeDemo;
	};

	co.frame.theme.getColorScheme = function(name, config) {
		name = coos.isEmpty(name) ? "COLOR-SCHEME-1" : name;
		config = config || {};
		var data = DEFAULT_THEME_COLOR_SCHEME_MAP[name] || {};
		var demo = jQuery.extend(true, {}, data);
		demo = jQuery.extend(true, {}, demo, config);
		return demo;
	};

	co.frame.theme.initColorScheme = function(name, config) {
		var colorScheme = coos.frame.getDefaultThemeColorScheme(name, config);
		var usingTheme = coos.frame.getUsingTheme();
		var usingThemeObject = coos.frame.getUsingThemeObject();
		jQuery.extend(true, usingTheme, colorScheme);
		usingThemeObject.writeStyle();
	};
	co.frame.theme.getColorSchemeMap = function() {
		return DEFAULT_THEME_COLOR_SCHEME_MAP;
	};

	co.frame.theme.getLayoutScheme = function(name, config) {
		name = coos.isEmpty(name) ? "LAYOUT-SCHEME-1" : name;
		config = config || {};
		var data = DEFAULT_THEME_LAYOUT_SCHEME_MAP[name] || {};
		var demo = jQuery.extend(true, {}, data);
		demo = jQuery.extend(true, {}, demo, config);
		return demo;
	};

	co.frame.theme.initLayoutScheme = function(name, config) {
		var scheme = coos.frame.getDefaultThemeLayoutScheme(name, config);
		var usingTheme = coos.frame.getUsingTheme();
		var usingThemeObject = coos.frame.getUsingThemeObject();
		jQuery.extend(true, usingTheme, scheme);
		usingThemeObject.writeStyle();
	};
	co.frame.theme.getLayoutSchemeMap = function() {
		return DEFAULT_THEME_LAYOUT_SCHEME_MAP;
	};
})();