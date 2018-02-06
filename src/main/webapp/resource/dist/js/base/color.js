(function() {
	co.color = co.color || new Object();

	co.color.getReverse = function(color) {
		color = co.color.getHex(color);
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		if (reg.test(color)) {
			var h = color.replace('#', '').split("");
			var r = 0, g = 0, b = 0;
			r = 255 - parseInt(h[0], 16) * 16 - parseInt(h[1], 16);
			g = 255 - parseInt(h[2], 16) * 16 - parseInt(h[3], 16);
			b = 255 - parseInt(h[4], 16) * 16 - parseInt(h[5], 16);
			return "#" + (r < 16 ? "0" + r.toString(16).toUpperCase() : r.toString(16).toUpperCase()) + (g < 16 ? "0" + g.toString(16).toUpperCase() : g.toString(16).toUpperCase())
					+ (b < 16 ? "0" + b.toString(16).toUpperCase() : b.toString(16).toUpperCase());

		}
		return color;
	};
	co.color.getSimilar = function(color, offset) {
		color = co.color.getRgb(color);
		if (/^(rgb|RGB)/.test(color)) {
			var h = color.replace('rgb(', '').replace('RGB(', '').replace(')', '').split(",");
			var r = Number(h[0]);
			var g = Number(h[1]);
			var b = Number(h[2]);
			var newR = Number(r + offset);
			newR = newR > 255 ? (255) : newR;
			newR = newR < 0 ? (0) : newR;
			var newG = Number(g + offset);
			newG = newG > 255 ? (255) : newG;
			newG = newG < 0 ? (0) : newG;
			var newB = Number(b + offset);
			newB = newB > 255 ? (255) : newB;
			newB = newB < 0 ? (0) : newB;
			var newColor = "rgb(" + newR + "," + newG + "," + newB + ")";
			return co.color.getHex(newColor);
		}
		return color;
	};
	/* RGB颜色转换为16进制 */
	co.color.getHex = function(color) {
		if (co.isEmpty(color)) {
			return null;
		}
		color = co.color.getRgb(color);
		if (/^(rgb|RGB)/.test(color)) {
			var aColor = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
			var strHex = "#";
			for (var i = 0; i < aColor.length; i++) {
				var hex = Number(aColor[i]).toString(16);
				if (hex === "0") {
					hex += hex;
				}
				strHex += hex;
			}
			if (strHex.length !== 7) {
				strHex = color;
			}
			return strHex;
		} else {
			return color;
		}
	};
	/* 16进制颜色转为RGB格式 */
	co.color.getRgb = function(color) {
		if (co.isEmpty(color)) {
			return null;
		}
		if (/^(rgb|RGB)/.test(color)) {
			return color;
		} else {
			var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
			if (reg.test(color)) {
				if (color.length === 4) {
					var sColorNew = "#";
					for (var i = 1; i < 4; i += 1) {
						sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
					}
					color = sColorNew;
				}
				// 处理六位的颜色值
				var sColorChange = [];
				for (var i = 1; i < 7; i += 2) {
					sColorChange.push(parseInt("0x" + color.slice(i, i + 2)));
				}
				return "RGB(" + sColorChange.join(",") + ")";
			} else {
				return color;
			}
		}
	};
})();