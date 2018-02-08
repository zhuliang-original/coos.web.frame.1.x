(function() {
	co.plugin = new Object();

	co.init.bind(function() {
		if (!co.isEmpty(config.pluginsPath)) {
			var pluginsPath = config.pluginsPath;
			for ( var name in co.plugin.plugins) {
				var data = co.plugin.plugins[name];
				var css = data.css;
				var js = data.js;
				$(css).each(function(index, path) {
					css[index] = pluginsPath + "/" + path;
				});
				$(js).each(function(index, path) {
					js[index] = pluginsPath + "/" + path;
				});
				if (!co.isEmpty(data.themesPath)) {
					data.themesPath = pluginsPath + "/" + data.themesPath;
				}
			}
		}
	});

	co.plugin.plugins = {
		bootstrap_slider : {
			js : [ "resource/plugins/bootstrap/slider/bootstrap-slider.js" ],
			css : [ "resource/plugins/bootstrap/slider/bootstrap-slider.css" ]
		},
		bootstrap_switch : {
			js : [ "resource/plugins/bootstrap/switch/bootstrap-switch.min.js" ],
			css : [ "resource/plugins/bootstrap/switch/bootstrap-switch.css" ]
		},
		data_tables :
		{
			js : [ "resource/plugins/jquery/datatables/jquery.datatables.min.js", "resource/plugins/jquery/datatables/datatables.bootstrap.js" ],
			css : [ "resource/plugins/jquery/datatables/css/datatables.bootstrap.css", "resource/plugins/jquery/datatables/css/jquery.datatables.css" ]
		},
		tags_input : {
			js : [ "resource/plugins/jquery/tagsinput/jquery.tagsinput.min.js" ],
			css : [ "resource/plugins/jquery/tagsinput/jquery.tagsinput.css" ]
		},
		colorpicker : {
			js : [ "resource/plugins/colorpicker/js/colorpicker.js" ],
			css : [ "resource/plugins/colorpicker/css/colorpicker.css" ]
		},
		mobiscroll : {
			js : [ "resource/plugins/mobiscroll/js/mobiscroll.custom-2.5.2.min.js" ],
			css : [ "resource/plugins/mobiscroll/css/mobiscroll.custom-2.5.2.min.css" ]
		},
		jquery_datetimepicker : {
			js : [ "resource/plugins/jquery/datetimepicker/jquery.datetimepicker.js" ],
			css : [ "resource/plugins/jquery/datetimepicker/jquery.datetimepicker.css" ]
		},
		jquery_ui_effects : {
			js : [ "resource/plugins/jquery/ui/effects/jquery-ui.min.js" ],
			css : [ "resource/plugins/jquery/ui/effects/jquery-ui.min.css", "resource/plugins/jquery/ui/widgets/jquery-ui.theme.min.css" ]
		},
		jquery_ui_interactions : {
			js : [ "resource/plugins/jquery/ui/interactions/jquery-ui.min.js" ],
			css : [ "resource/plugins/jquery/ui/interactions/jquery-ui.min.css", "resource/plugins/jquery/ui/widgets/jquery-ui.theme.min.css" ]
		},
		jquery_sortable : {
			js : [ "resource/plugins/jquery/ui/interactions/jquery-ui.min.js" ],
			css : [ "resource/plugins/jquery/ui/interactions/jquery-ui.min.css", "resource/plugins/jquery/ui/widgets/jquery-ui.theme.min.css" ]
		},
		jquery_ui_widgets : {
			js : [ "resource/plugins/jquery/ui/widgets/jquery-ui.min.js" ],
			css : [ "resource/plugins/jquery/ui/widgets/jquery-ui.min.css", "resource/plugins/jquery/ui/widgets/jquery-ui.theme.min.css" ]
		},
		kindeditor : {
			js : [ "resource/plugins/kindeditor/kindeditor.js", "resource/plugins/kindeditor/lang/zh_CN.js", "resource/plugins/kindeditor/plugins/code/prettify.js" ],
			css : [ "resource/plugins/kindeditor/themes/default/default.css", "resource/plugins/kindeditor/plugins/code/prettify.css" ],
			themesPath : "resource/plugins/kindeditor/themes/"
		},
		codemirror : {
			js : [ "resource/plugins/codemirror/codemirror.js", "resource/plugins/codemirror/mode/css/css.js", "resource/plugins/codemirror/mode/xml/xml.js",
					"resource/plugins/codemirror/mode/javascript/javascript.js", "resource/plugins/codemirror/mode/htmlmixed/htmlmixed.js" ],
			css : [ "resource/plugins/codemirror/codemirror.css", "resource/plugins/codemirror/theme/zenburn.css" ]
		},
		emmet : {
			js : [ "resource/plugins/emmet/emmet.js" ],
			css : []
		},
		vue : {
			js : [ "resource/plugins/vue/2.4.2/vue.min.js" ],
			css : []
		}
	};

	co.plugin.add = function(plugin) {
		if (!co.isObject(plugin)) {
			throw new Error("插件格式为{plugin_name: {css: [], js: []}}");
		}
		for ( var name in plugin) {
			co.plugin.plugins[name] = plugin[name];
		}
	};

	co.plugin.loadedPlugins = {};
	co.plugin.loadingPlugins = {};
	co.plugin.loadingPluginsCallbacks = {};
	var loadedPlugins = {};
	var loadingPlugins = {};
	var loadingPluginsCallbacks = {};
	var loadCSSS = {};
	co.plugin.load_ = function(pluginname, callback) {
		if (co.plugin.loadedPlugins[pluginname]) {
			callback && callback();
			return;
		}
		var plugin = co.plugin.plugins[pluginname]; // 获取对应的json
		if (plugin == null) {
			throw new Error(pluginname + ' is not defined');
		}
		var callbacks = co.plugin.loadingPluginsCallbacks[pluginname];
		callbacks = callbacks || [];
		callbacks[callbacks.length] = callback;
		if (co.plugin.loadingPlugins[pluginname]) {
			return;
		}
		co.plugin.loadingPlugins[pluginname] = true;
		co.plugin.loadingPluginsCallbacks[pluginname] = callbacks;
		var jss = plugin.js; // 获取js
		var csss = plugin.css; // 获取css
		var head = document.getElementsByTagName('head')[0];
		// 加载csss数组
		$.each(csss, function(index, css) {
			// 如果此css已加载，创建下个css
			if (loadCSSS[css] == true) {
				return true;
			}
			var link = document.createElement('link');
			head.appendChild(link);
			loadCSSS[css] = true;
			link.type = 'text/css';
			link.rel = 'styleSheet';
			if (css.indexOf("http") == 0) {
				link.href = css;
			} else {
				link.href = basePath + css;
			}

		}); // csss each

		// 加载jss数组
		var jsloadsucessindex = 0; // js坐标
		co.resource.load.js(jss, function() {
			co.plugin.loadedPlugins[pluginname] = true;
			co.plugin.loadingPlugins[pluginname] = false;
			var callbacks = co.plugin.loadingPluginsCallbacks[pluginname];
			co.plugin.loadingPluginsCallbacks[pluginname] = [];
			$.each(callbacks, function(callbackindex, plugincallback) {
				plugincallback && plugincallback(); // 调用回调
			});
		});
	};

	co.plugin.load = function(pluginname, callback) {
		var names = [ pluginname ];
		if (co.isArray(pluginname)) {
			names = pluginname;
		}
		// 遍历插件数组
		var count = names.length;
		var loadedcount = 0;
		function loadCallback() {
			loadedcount++;
			if (loadedcount >= count) {
				callback && callback();
			}
		}
		$.each(names, function(index, name) {
			// 首先判断是否已经加载过
			co.plugin.load_(name, loadCallback);
		})
	};
})();