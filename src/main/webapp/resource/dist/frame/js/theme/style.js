var DEFAULT_THEME_COLOR_SCHEME_MAP = {};
var DEFAULT_THEME_LAYOUT_SCHEME_MAP = {};
(function() {
	// 0 0 0
	// 255 0 0
	// 255 255 0
	// 0 255 0
	// 0 255 255
	// 255 255 255
	// 255 0 255
	// 0 0 255

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
		var b2 = coos.color.getSimilar(b1, 30);

		var b3 = b1;
		var b4 = coos.color.getSimilar(b1, -10);
		var b5 = coos.color.getSimilar(b4, -30);
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
		DEFAULT_THEME_COLOR_SCHEME_MAP[colorScheme.colorSchemeType] = colorScheme;
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
		var b7 = coos.color.getSimilar(b5, -30);
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
		DEFAULT_THEME_COLOR_SCHEME_MAP[colorScheme.colorSchemeType] = colorScheme;
	}
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
	DEFAULT_THEME_LAYOUT_SCHEME_MAP[layoutScheme.layoutSchemeType] = layoutScheme;
})();
