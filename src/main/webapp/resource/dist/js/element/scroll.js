(function() {
	co.element.initScroll = function(content) {
		content = content || $('body');
		var elements = $(content).find('.core-need-init-scroll');
		if (elements.length > 0) {
			co.plugins.load("mCustomScrollbar", function() {
				$(elements).each(function(index, element) {
					if (co.element.isInited(element, 'core-need-init-scroll')) {
						return;
					}
					element = $(element);
					element.mCustomScrollbar({
						set_height : function() {
							$(this).css('max-height', $(this).data('scroll-height'));
							return $(this).data('scroll-height');
						},
						mouseWheel : "auto",
						autoDraggerLength : true,
						autoHideScrollbar : true,
						advanced : {
							updateOnBrowserResize : true,
							updateOnContentResize : true
						}
					});
				});
			});
		}
	};
})();