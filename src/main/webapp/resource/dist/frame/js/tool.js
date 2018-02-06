co.frame.changeFull = function(status) {
	if (co.frame.frame) {
		co.frame.frame.changeFull();
	}
};

co.frame.checkBackTop = function() {
	if ($(window).scrollTop() > 80) {
		$('.coos-back-top').addClass('visible');
	} else if ($(window).scrollTop() <= 0) {
		$('.coos-back-top').removeClass('visible');
	}
};

co.frame.setTitle = function(title) {
	if (co.frame.frame) {
		co.frame.frame.setTitle(title);
	}
};

co.frame.initSize = function() {
	if (co.frame.frame) {
		co.frame.frame.initSize();
	}
};