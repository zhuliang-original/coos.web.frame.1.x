co.frame.changeFull = function(status) {
	if (co.frame.frame) {
		co.frame.frame.changeFull(status);
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
co.page.pushLoadCallback(function() {
	if (co.frame.frame) {
		if (!co.frame.firstFrameViewed) {
			co.frame.firstFrameViewed = true;
			co.frame.frame.view();
		}
	}
	co.frame.initSize();
});
$(function() {
	co.frame.changeFull($('#coos-need-full-page').length > 0 && $('#coos-need-full-page').closest('.coos-box-window').length == 0);

	/* 返回顶部 */
	$('html').on('click', '.coos-back-top', function(e) {
		e.preventDefault();
		$('body,html').animate({
			scrollTop : 0
		}, 800);
		window.setTimeout(function() {
			co.frame.checkBackTop();
		}, 800);
	});
	$(window).on("scroll", function() {
		co.frame.checkBackTop();
	});
	$('html').on('click', '[coos-action="full-or-empty-horizontal"]', function(e) {
		lastThemeObject.fullOrEmptyHorizontal();
	});
	$('html').on('click', '[coos-action="full-or-empty-vertical"]', function(e) {
		lastThemeObject.fullOrEmptyVertical();
	});
	$('html').on('click', '[coos-action="full-or-empty-screen"]', function(e) {
		lastThemeObject.fullOrEmptyScreen();
	});
	$('html').on('click', '.coos-control-body-left', function(e) {
		var $frame = $('.coos-frame')
		if ($frame.hasClass('coos-open-body-left')) {
			$frame.removeClass('coos-open-body-left');
			$(this).removeClass('active');
		} else {
			$frame.addClass('coos-open-body-left');
			$(this).addClass('active');
		}
	});
	$('html').on('click', '.coos-control-body-right', function(e) {
		var $frame = $('.coos-frame');
		if ($frame.hasClass('coos-open-body-right')) {
			$frame.removeClass('coos-open-body-right');
			$(this).removeClass('active');
		} else {
			$frame.addClass('coos-open-body-right');
			$(this).addClass('active');
		}
	});
});