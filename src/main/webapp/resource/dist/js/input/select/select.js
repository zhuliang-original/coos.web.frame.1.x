(function() {
	co.input.bind('select', function($selector) {
		co.input.select.bind($selector, {
			ismulti : false
		});
	});

	co.input.bind('multi-select', function($selector) {
		co.input.select.bind($selector, {
			ismulti : true
		});
	});

})();