(function() {
	co.window = {};
	var BINDBODYSIZECHANGES = [];
	co.window.bindBodySizeChange = function(callback) {
		BINDBODYSIZECHANGES[BINDBODYSIZECHANGES.length] = callback;
	};
	co.window.bodySizeChange = function() {
		$(BINDBODYSIZECHANGES).each(function(index, BINDBODYSIZECHANGE) {
			BINDBODYSIZECHANGE && BINDBODYSIZECHANGE();
		});
	};
	co.window.initSize = function() {
		var width = $('body').outerWidth();
		if (co.isEmpty(width)) {
			width = $(window).width();
		}
		co.window.width = width;
		co.window.isxs = false;
		co.window.issm = false;
		co.window.ismd = false;
		co.window.islg = false;
		var sizestr = ",";
		if (width < 768) {
			$("html").addClass('coos-xs');
			co.window.isxs = true;
			sizestr += "xs,";
		} else {
			$("html").removeClass('coos-xs')
		}
		if (width >= 768) {
			$("html").addClass('coos-sm');
			co.window.issm = true;
			sizestr += "sm,";
		} else {
			$("html").removeClass('coos-sm')
		}
		if (width >= 992) {
			$("html").addClass('coos-md');
			co.window.ismd = true;
			sizestr += "md,";
		} else {
			$("html").removeClass('coos-md')
		}
		if (width >= 1200) {
			$("html").addClass('coos-lg');
			co.window.islg = true;
			sizestr += "lg,";
		} else {
			$("html").removeClass('coos-lg')
		}
		if (co.isEmpty(this.oldsizestr) || this.oldsizestr != sizestr) {
			this.oldsizestr = sizestr;
			co.window.bodySizeChange();
		}
	};
	co.window.initSize();
	$(window).on("resize", function() {
		co.window.initSize();
	});
})();