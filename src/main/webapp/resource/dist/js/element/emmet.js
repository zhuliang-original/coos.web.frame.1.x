(function() {
	co.element.initEmmet = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-emmet');
		if (elements.length > 0) {
			co.plugins.load("emmet", function() {
				$(elements).each(function(index, element) {
					if (co.element.isInited(element, 'inputtype-emmet')) {
						return;
					}
					element = $(element);

				});
			});
		}
	};
})();