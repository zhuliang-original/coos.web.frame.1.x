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
