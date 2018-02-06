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