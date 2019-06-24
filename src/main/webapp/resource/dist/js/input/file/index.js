(function() {

	co.input.file = new Object();
	co.input.file.divider = " ";
	var FileBind = function($selector, config) {
		config = config || {};
		this.type = config.type || '';
		this.$selector = $selector;

		this.init();
	};

	FileBind.prototype.init = function() {
		var isreadonly = this.$selector.attr('isreadonly');
		isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
		this.isreadonly = isreadonly;

		this.maxfilelength = this.$selector.attr('max-file-length');

		var filecount = this.$selector.attr('file-count');
		filecount = filecount == null || filecount == '' ? 1 : filecount;
		this.filecount = filecount;

		this.initView();
		this.bindEvent();
		this.$selector.change();
	};

	FileBind.prototype.initView = function() {
		this.$upload = $('<span class=\"coos-input-addon coos-input-addon-after coos-pointer \"><i class=\"fa fa-upload\"></i></span>');

		if (!this.isreadonly) {
			this.$selector.after(this.$upload);
		} else {
		}

		this.bindUpdate(this.$upload);
		this.$filegroup = $("<div class=\"coos-file-group\">" + "</div>");
		this.$filegroupupload = $("<div class=\"coos-file coos-file-for-upload\"><i class=\"mgl-5 fa fa-upload\"></i></div>");

		this.$filegroup.append(this.$filegroupupload);
		this.$selector.before(this.$filegroup);

		if (this.isreadonly) {
			this.$filegroupupload.hide();
		}
		if (this.type == 'image') {
			this.$filegroup.addClass('coos-image-group ');
			this.$filegroupupload.empty();
			this.$filegroupupload.append("	<img class='coos-pointer' src='" + co.resource.images.clickupload + "'>");

			this.$filegroupupload.attr('file-type', 'image');
		} else {

		}

		if (!this.isreadonly) {
			this.bindUpdate(this.$filegroupupload);
		}

	};

	FileBind.prototype.bindUpdate = function($btn, $file) {
		var this_ = this;

		$btn.attr('file-type', this.type);
		if (!co.isEmpty(this.$selector.attr('file-type'))) {
			$btn.attr('file-type', this.$selector.attr('file-type'));
		}
		co.button.bind.upload($btn, {
			callback : function(files) {
				this_.addFiles(files, $file);
			}
		});
	};

	FileBind.prototype.addFiles = function(files, $file) {
		var this_ = this;
		if (files && files.length > 0) {
			var oldurl = this.$selector.val();
			var oldpath = '';
			if ($file) {
				oldpath = $file.attr('path');
			}
			var urls = [];
			if (oldurl != null && oldurl != '') {
				urls = oldurl.split(co.input.file.divider);
			}
			var us = [];
			$(urls).each(function(index, url) {
				if (!co.isEmpty(url)) {
					us.push(url);
				}
			});
			urls = us;
			var replaced = false;
			$(urls).each(function(index, url) {
				if (url == oldpath) {
					urls[index] = files[0].path;
					replaced = true;
				}
			});

			var count = urls.length;
			var overfiles = [];
			$(files).each(function(index, file) {
				var has = false;
				$(urls).each(function(index, url) {
					if (url == file.path) {
						has = true;
					}
				});
				if (!has) {
					if (count < this_.filecount) {
						urls.push(file.path);
						count++;
					} else {
						overfiles.push(file);
					}
				}
			});
			if (!replaced && overfiles.length > 0) {
				urls[urls.length - 1] = overfiles[0].path;
			}
			urls.push("");
			var value = urls.join(co.input.file.divider);
			this.$selector.val(value);
			this.$selector.change();
		}
	};
	FileBind.prototype.removeFile = function(path) {
		var this_ = this;
		if (!co.isEmpty(path)) {
			var oldurl = this.$selector.val();
			var urls = [];
			if (oldurl != null && oldurl != '') {
				urls = oldurl.split(co.input.file.divider);
			}
			var us = [];
			$(urls).each(function(index, url) {
				if (!co.isEmpty(url)) {
					if (url != path) {
						us.push(url);
					}
				}
			});
			us.push("");
			var value = us.join(co.input.file.divider);
			this.$selector.val(value);
			this.$selector.change();
		}
	};
	FileBind.prototype.fullFileInfo = function($file, data) {
		if (co.isString(data)) {
			var url = data;
			var infos = url.split('/');
			var name = infos[infos.length - 1]; // 获取最后一部分，即文件名
			data = {};
			data.name = name;
			data.length = 0;
		}
		$file.find('.file-name').text(data.name);
		var length = data.length || 0;
		if (length < 1024) {
			length = length + "B";
		} else if (length >= 1024 && length < 1024 * 1024) {
			length = length / 1024;
			length = length.toFixed(2);
			length = length + "KB";
		} else {
			length = length / 1024 / 1024;
			length = length.toFixed(2);
			length = length + "MB";
		}
		$file.find('.file-length').text(length);
	};

	FileBind.prototype.addFileGroupFile = function(url) {
		var this_ = this;
		var $file = $('<div class="coos-file one"></div>');
		$file.attr('path', url);
		var useFileServer = false;
		var path = url;
		if (url.indexOf('http:') == 0 || url.indexOf('https:') == 0 || url.indexOf('ftp:') == 0 || url.indexOf('file:') == 0) {
		} else {
			useFileServer = true;
			url = co.config.server.fileServerUrl + url;
		}
		if (this.type == 'image') {
			this.$filegroup.css('height', '135px');
			$file.append('<img class="element-rule-image" style="display:block" />');
			$file.append('<a href="' + url + '" class="coos-btn coos-btn-link coos-green pdlr-0 pdtb-2" target="_blank">查看图片</a>');

		} else {
			$file.append('<div class="file-info" ><a class="file-name" target="_blank" ></a><div class="file-length"></div></div>');
			$file.find('a').attr('href', url);
			this.fullFileInfo($file, url);
			if (useFileServer) {
				var action = 'core/file/file.info';
				var data = {};
				data.path = path;
				data.url = url;
				var this_ = this;
				co.POST(action, data, 'json', function(data) {
					if (data != null && !co.isEmpty(data.name)) {
						this_.fullFileInfo($file, data);
					}
				}, true, {
					showLoading : false
				});
			} else {
			}

		}
		var $remove = $('<div class="coos-file-remove"><i class="fa fa-remove"></i></div>');
		if (!this.isreadonly) {
			$file.append($remove);
		}
		if (this.type == 'image') {
			$file.find('img').attr('path', url);
		}
		this.$filegroupupload.before($file);
		co.element.init($file);
		$remove.click(function() {
			var path = $(this).parent().attr('path');
			this_.removeFile(path);
			$(this).parent().remove();
		});
		if (this.type == 'image') {
			if (!this.isreadonly) {
				//this.bindUpdate($file, $file);
			}
		}
	};

	FileBind.prototype.bindEvent = function() {
		var this_ = this;
		this.$selector.change(function() {
			var value = $(this).val();
			if (this_.$filegroup) {
				this_.$filegroup.find('.one').remove();
			}
			var urls = [];
			if (value != null && value != '') {
				urls = value.split(co.input.file.divider);
			}

			var count = 0;
			$(urls).each(function(index, url) {
				if (!co.isEmpty(url)) {
					count++;
					if (count <= this_.filecount) {
						this_.addFileGroupFile(url);
					}
				}
			});
			if (this_.$filegroupupload) {
				if (this_.filecount <= count) {
					this_.$filegroupupload.hide();
				} else {

					this_.$filegroupupload.show();
				}
			}
			if (this_.isreadonly) {
				this_.$filegroupupload.hide();
			}
		});
	};

	co.input.file.bind = function($selector, config) {
		return new FileBind($selector, config);
	}

})();