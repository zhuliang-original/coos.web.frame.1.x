(function() {
	co.url = new Object();
	co.url.formatImageUrls = function(path) {
		var urls = [];
		if (co.isEmpty(path)) {
			urls[urls.length] = co.resource.images.noimg;
		} else {
			var paths = [ path ];
			if (path.indexOf(co.input.file.divider) > 0) {
				paths = path.split(co.input.file.divider);
			}
			$(paths).each(function(index, p) {
				if (!co.isEmpty(p)) {
					if (p.indexOf('http:') == 0 || p.indexOf('https:') == 0 || p.indexOf('ftp:') == 0 || p.indexOf('file:') == 0) {
					} else {
						p = co.config.server.fileServerUrl + p;
					}
					urls[urls.length] = p;
				}
			});
		}
		return urls;
	};

	co.url.format = function(path) {
		if (co.isEmpty(path)) {
			return;
		}
		if (path.indexOf('http') >= 0) {
			return path;
		}

		path = path.replace(/^\/+/g, "/");
		if (path.indexOf('/') == 0) {
			if (basePath.lastIndexOf('/') == basePath.length - 1) {
				path = path.replace(/^\/+/g, "");
			}
		} else {
			if (basePath.lastIndexOf('/') == basePath.length - 1) {
			} else {
				path = "/" + path;
			}
		}
		var url = basePath + path;
		return url;
	};
	co.url.getCurrentUrl = function() {
		var action = '';
		var hash = '' + window.location.hash;
		hash = decodeURIComponent(hash);

		var url = window.location.href;
		var port = window.location.port;
		var hostname = window.location.hostname;
		if (basePath.indexOf('http') >= 0) {
			action = url.split(basePath)[1];
		} else {
			if (port && port != null && port > 0) {
				action = url.split(hostname + ':' + port + basePath)[1];
			} else {
				action = url.split(hostname + basePath)[1];
			}
		}
		if (action == null || action.length < 1 || action == '/') {
			action = co.config.action.toIndex;
		}
		return co.url.format(action);
	};
	co.url.getCurrentAction = function() {
		var action = '';
		var hash = '' + window.location.hash;
		hash = decodeURIComponent(hash);
		var url = window.location.href;
		var port = window.location.port;
		var hostname = window.location.hostname;
		if (basePath.indexOf('http') >= 0) {
			action = url.split(basePath)[1];
		} else {
			if (port && port != null && port > 0) {
				action = url.split(hostname + ':' + port + basePath)[1];
			} else {
				action = url.split(hostname + basePath)[1];
			}
		}
		if (action == null || action.length < 1 || action == '/') {
			action = co.config.action.toIndex;
		}
		if (action.indexOf('?') > 0) {
			action = action.split("?")[0];
		}
		if (action.indexOf('/') != 0) {
			action = "/" + action;
		}
		action = action.replace(/\/+/g, "/");
		if (action.indexOf('#') >= 0) {
			action = action.split('#')[0];
		}
		return (action);
	};

	co.url.getData = function(url) {
		var data = {};
		url = url || co.url.getCurrentUrl();
		if (url.indexOf('?') > 0) {
			var toActions = url.split('?');
			var datastr = toActions[1];
			if (!co.isEmpty(datastr)) {
				var datas = datastr.split('&');
				for (var i = 0; i < datas.length; i++) {
					if (!co.isEmpty(datas[i])) {
						if (datas[i].indexOf('=') > 0) {
							var n = datas[i].split('=')[0];
							var v = datas[i].split('=')[1];
							v = v == null ? "" : v;
							if (data[n] == null) {
								data[n] = v;
							}
						} else {

							data[datas[i]] = "";
						}
					}
				}
			}
		}
		return data;
	};
	co.url.getFullData = function(action, data) {
		action = action.replace(/^\/+/g, "/");
		if (data) {
			for ( var n in data) {
				if (action.indexOf('?') < 0) {
					action = action + '?';
				}
				action += '&' + n + '=' + data[n];
			}
		}
		return action;
	};
})();