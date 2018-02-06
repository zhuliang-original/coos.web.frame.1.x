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

});