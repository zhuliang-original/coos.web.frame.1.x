if (typeof jQuery === 'undefined') {
	throw new Error('COOS需要依赖jQuery');
}

if (window["COOS is loadded"]) {
	console.log("COOS is loadded");
	return;
}
window["COOS is loadded"] = true;
var co = window.coos || new Object();
window.coos = co;
// 获取当前工程项目路径
co.getRootPath = function() {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPaht = curWwwPath.substring(0, pos);
	if (pathName != null) {
		pathName = pathName.replace(/\/+/g, "/");
	}
	if (typeof (basePath) != 'undefined' && basePath != null && (basePath == '' || basePath == '/')) {
		var httpName = curWwwPath.split('://')[0];
		var httpPath = curWwwPath.split('://')[1];
		localhostPaht = httpName + '://' + (httpPath.substring(0, httpPath.indexOf("/")));
		return (localhostPaht) + "/";
	} else {
		var projectName = pathName.substring(0, pathName.substr(1).indexOf("/") + 1);
		return (localhostPaht + projectName) + "/";
	}
};
// 当前项目路径
window.basePath = co.basePath = co.getRootPath();
// 设置websocket路径
window.webSocketPath = co.webSocketPath = basePath.replace('http://', 'ws://').replace('https://', 'ws://');
// 设置配置项
// 加入方法
co.define = function(arg1, arg2) {
	var names = [ arg1 ];
	if (co.isArray(arg1)) {
		names = arg1;
	}
	var fns = [ arg2 ];
	if (co.isArray(arg2)) {
		fns = arg2;
	}
	$(names).each(function(index, name) {
		var arr = name.split('.');
		var context = coos;
		for (var i = 0; i < arr.length - 1; i++) {
			var str = arr[i];
			if (!context[str]) {
				context[str] = {};
			}
			context = context[str];
		}
		;
		context[arr[arr.length - 1]] = fns[index];
	});
	return this;
};
co.resource = new Object();
co.resource.images = {
	loading : basePath + "/resource/coos/images/image/loading.gif",
	noimg : basePath + "/resource/coos/images/image/noimage.png",
	notfindimg : basePath + "/resource/coos/images/image/notfindimage.png",
	clickupload : basePath + "/resource/coos/images/image/clickupload.png"
};