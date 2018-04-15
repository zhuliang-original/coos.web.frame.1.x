(function() {
	var options = {};

	var PathResolve = function(opts) {
		this.initialize(opts);
		return this;
	};

	PathResolve.prototype.initialize = function(opts) {
		var options = this.options = $.extend({}, options, opts);
		this.initFolder();
	};

	PathResolve.prototype.initFolder = function(opts) {
		var datas = this.options.datas;

		var level_folders = {};
		var rootFolder = {};
		rootFolder.id = 0;
		rootFolder.text = "/";
		rootFolder.name = "ROOT";
		rootFolder.path = "/";
		$(datas).each(function(index, data) {
			var path = data.path;
			if (!coos.isEmpty(path)) {
				path = path.replace(/^\/+/g, "/");
				if (path.indexOf('/') == 0) {
					path = path.substring(1);
				}
				if (path.lastIndexOf('/') == path.length - 1) {
					path = path.substring(0, path.length - 1);
				}
				var names = path.split('/');
				var lastFolder = rootFolder;
				var lastPath = "/";
				$(names).each(function(level, name) {
					var isLast = level + 1 == names.length;
					if (isLast) {
						var file = {};
						file.id = co.getNumber();
						file.text = name;
						file.name = name;
						file.data = data;
						file.parentid = lastFolder.id;
						file.isfile = true;
						var fs = lastFolder.files || [];
						fs.push(file);
						lastFolder.files = fs;
					} else {
						var fs = level_folders[level] || [];
						var folder = null;
						$(fs).each(function(i, f) {
							if (f.name == name && f.isfolder) {
								folder = f;
							}
						});
						if (folder == null) {
							folder = {};
							folder.id = co.getNumber();
							folder.text = name;
							folder.name = name;
							folder.path = lastPath + name + "/";

							folder.isfolder = true;
							folder.parentid = lastFolder.id;
							fs.push(folder);
							level_folders[level] = fs;
						}
						lastFolder = folder;
						lastPath = folder.path;

					}
				});
			}
		});

		var folders = [];
		folders.push(rootFolder);
		for ( var level in level_folders) {
			var fs = level_folders[level];
			$(fs).each(function(index, f) {
				f.level = level;
				folders.push(f);
				$(f.files).each(function(index, f) {
					f.level = level + 1;
					folders.push(f);
				});
			});
		}

		this.folders = folders;
	};

	co.component.pathresolve = function(config) {
		var t = new PathResolve(config);
		return t;
	};

})();