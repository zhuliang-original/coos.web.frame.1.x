(function() {
	co.executeService = function(config) {

		var name = config.name;
		var id = config.id;
		var data = config.data;
		var async = config.async;
		data = data == null ? {} : data;
		var callback = config.callback;
		co.cover.showLoading();

		var headers = null;
		if (co.isString(data)) {
			headers = {
				'Content-Type' : 'application/json'
			};
		}
		var url = null;
		if (!co.isEmpty(id)) {
			url = "/core/service/ID-" + id + ".service";
		}
		if (!co.isEmpty(name)) {
			url = "/core/service/" + name + ".service";
		}
		$.ajax({
			url : co.url.format(url),
			data : data,
			type : 'post',
			dataType : 'json',
			async : async, // 取消异步请求
			headers : headers,
			beforeSend : function() {
			},
			success : function(o) {
				// 可添加完成后处理
				co.cover.hideLoading();
				if (callback && $.isFunction(callback)) {
					callback(o);
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				co.cover.hideLoading();
				callback(XMLHttpRequest.responseText);
			}

		});
	};
})();