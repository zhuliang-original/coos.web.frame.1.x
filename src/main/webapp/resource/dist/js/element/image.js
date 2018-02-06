(function() {

	co.element.bind('image', function($selector) {
		$selector = $($selector);
		var path = $selector.attr('coos-path') || $selector.attr('path');
		var tagName = $selector[0].tagName;
		var noimg = co.resource.images.noimg;
		var notfindimg = co.resource.images.notfindimg;
		if (co.isEmpty(path)) {
			if (tagName == 'IMG') {
				$selector.attr('src', noimg);
			} else {
				$selector.css('background-image', 'url("' + noimg + '")');
			}
			return;
		}
		if (path.indexOf(',') > 0) {
			path = path.split(',')[0];
		}
		if (path.indexOf('http') < 0) {
			if ($selector.attr('use-file-server-url')) {
				path = co.config.server.fileServerUrl + path;
			} else {
				path = basePath + path;
			}
		}
		var img = new Image();
		img.onerror = function() {
			if (tagName == 'IMG') {
				$selector.attr('src', notfindimg);
			} else {
				$selector.css('background-image', 'url("' + notfindimg + '")');
			}
		};
		img.onload = function() {
			if (tagName == 'IMG') {
				$selector.attr('src', this.src);
			} else {
				$selector.css('background-image', 'url("' + this.src + '")');
			}
		};
		img.src = path;
	});

})();