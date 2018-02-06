(function() {
	co.button.bind('upload', function($selector) {
		co.button.bind.upload($selector, {
			input : $selector.attr("input"),
			image : $selector.attr("image"),
		})
	});

	co.button.bind.upload = function($selector, config) {
		config = config || {};
		$selector = $($selector);
		var input = $(config.input);
		var image = $(config.image);
		var callback = config.callback;
		co.upload.bind({
			button : $selector,
			callback : function(files) {
				var path = files[files.length - 1].path;
				var url = files[files.length - 1].url;
				if (input && input.length > 0) {
					input.val(path);
					input.change();
				}
				if (image && image.length > 0) {
					if (image[0].tagName == 'IMG') {
						image[0].src = url;
					} else {
						$(image).css('background-image', 'url("' + url + '")');
					}
				}
				callback && callback(files);
			}
		});
	};

})();