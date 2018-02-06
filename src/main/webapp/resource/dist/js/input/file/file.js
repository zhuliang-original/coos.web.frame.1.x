(function() {
	co.input.bind('file', function($selector) {
		co.input.file.bind($selector);
	});

	co.input.bind('file-annex', function($selector) {
		co.input.file.bind($selector, {
			type : "annex"
		});
	});

	co.input.bind('file-image', function($selector) {
		co.input.file.bind($selector, {
			type : "image"
		});
	});

	co.input.bind('file-video', function($selector) {
		co.input.file.bind($selector, {
			type : "video"
		});
	});

	co.input.bind('file-audio', function($selector) {
		co.input.file.bind($selector, {
			type : "audio"
		});
	});
})();