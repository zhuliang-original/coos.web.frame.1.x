coos.theme = coos.theme || {};

window.THIS_THEME = null;
window.THEMES = [];
window.MENUS = [];
window.PROJECT = [];
window.PROJECT_CONFIG = [];
window.THEMEID_THEMEOBJECT = {};
window.DEFAULT_THEME = {};
var USER_INFO = window.USER_INFO = null;
var $frame = null;
var $pageBox = null;
coos.frame.init1 = function(config) {
	config = config || {};
	$frame = config.frame || '.coos-frame';
	$frame = $($frame);
	$pageBox = config.pagebox || '.coos-page-box';
	$pageBox = $($pageBox);
	USER_INFO = window.USER_INFO = config.user || null;
	PROJECT = config.project || {};
	PROJECT_CONFIG = PROJECT.config || {};
	THEMES = PROJECT.themes || [];
	MENUS = config.menus || [];
	DEFAULT_THEME = coos.frame.getDefaultTheme();
	coos.frame.initThemeObject();
	coos.frame.initThisTheme();
};
coos.frame.getUsingTheme = function() {
	return window.THIS_THEME;
};
coos.frame.getUsingThemeObject = function() {
	var ThemeObject = THEMEID_THEMEOBJECT[THIS_THEME.themeid];
	return ThemeObject;
};
coos.addLoadCallback(function() {
	return;
	if (!coos.frame.initfirstview) {
		coos.frame.initfirstview = true;
		coos.frame.initView();
	}
	coos.frame.initHeight();
	if ($frame.hasClass('coos-default-hide-body-left')) {
		$frame.removeClass('coos-open-body-left');
	}
	if ($frame.hasClass('coos-default-hide-body-right')) {
		$frame.removeClass('coos-open-body-right');
	}
});

$(window).on("resize", function() {
	coos.frame.initHeight();
});

if (!coos.frame.bindedbodysizechange) {
	coos.window.bindBodySizeChange(function() {
		coos.frame.initThisTheme();
		coos.frame.initView();
	});
}

coos.frame.bindedbodysizechange = true;

$(function() {

	/* 返回顶部 */
	$('html').on('click', '.coos-back-top', function(e) {
		e.preventDefault();
		$('body,html').animate({
			scrollTop : 0
		}, 800);
		window.setTimeout(function() {
			checkBackTop();
		}, 800);
	});
	$(window).on("scroll", function() {
		checkBackTop();
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