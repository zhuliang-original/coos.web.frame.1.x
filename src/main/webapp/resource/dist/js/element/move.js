(function() {
	co.element.bind('move', function($selector) {
		co.plugin.load("draggabilly", function() {
			$selector.draggabilly({
				handle : '.handle'
			});
		});
	});
})();