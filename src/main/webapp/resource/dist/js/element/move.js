(function() {
	co.element.bind('move', function($selector) {
		co.plugins.load("draggabilly", function() {
			$selector.draggabilly({
				handle : '.handle'
			});
		});
	});
})();