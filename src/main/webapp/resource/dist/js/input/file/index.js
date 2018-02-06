(function() {

	co.input.file = new Object();

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
		this.$selector.after(this.$upload);

		this.bindUpdate(this.$upload);
		if (this.type == 'image') {
			this.$imagegroup = $("<div class=\"coos-image-group\">" + "</div>");
			this.$uploadimg = $("<div class=\"coos-image \">" + "	<img class='coos-pointer' src='" + co.resource.images.clickupload + "'>" + "</div>");

			this.$imagegroup.append(this.$uploadimg);
			this.$selector.before(this.$imagegroup);
			if (this.isreadonly) {
				this.$uploadimg.hide();
			}
			this.$uploadimg.attr('file-type', 'image');
			if (this.maxfilelength) {
				this.$uploadimg.attr('maxfilelength', this.maxfilelength);
			}
			this.bindUpdate(this.$uploadimg);
		}

	};

	FileBind.prototype.bindUpdate = function($btn, $image) {
		var this_ = this;

		$btn.attr('file-type', this.type);
		co.button.bind.upload($btn, {
			callback : function(files) {
				this_.addFiles(files, $image);
			}
		});
	};

	FileBind.prototype.addFiles = function(files, $image) {
		var this_ = this;
		if (files && files.length > 0) {
			var oldurl = this.$selector.val();
			var oldpath = '';
			if ($image) {
				oldpath = $image.find('img').attr('path');
			}
			var urls = [];
			if (oldurl != null && oldurl != '') {
				urls = oldurl.split(',');
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
			var value = urls.join(",");
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
				urls = oldurl.split(',');
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
			var value = us.join(",");
			this.$selector.val(value);
			this.$selector.change();
		}
	};

	FileBind.prototype.addImage = function(url) {
		if (!this.$uploadimg) {
			return;
		}
		var this_ = this;
		var $image = $('<div class="coos-image one"><img class="init-rule-image" /></div>');
		var $remove = $('<div class="coos-image-remove"></div>');
		if (!this.isreadonly) {
			$image.find('img').before($remove);
		}
		$image.find('img').attr('path', url);
		if (url.indexOf('http') == 0) {
		} else {
			url = co.config.server.fileServerUrl + url;
		}
		$image.find('img').attr('coos-path', url);
		this.$uploadimg.before($image);
		co.initImage($image.find('img'));
		$remove.click(function() {
			var path = $(this).next('img').attr('path');
			this_.removeFile(path);
			$(this).parent().remove();
		});
		this.bindUpdate($image, $image);
	};

	FileBind.prototype.bindEvent = function() {
		var this_ = this;
		this.$selector.change(function() {
			var value = $(this).val();
			if (this_.$imagegroup) {
				this_.$imagegroup.find('.one').remove();
			}
			var urls = [];
			if (value != null && value != '') {
				urls = value.split(',');
			}

			var count = 0;
			$(urls).each(function(index, url) {
				if (!co.isEmpty(url)) {
					count++;
					if (count <= this_.filecount) {
						this_.addImage(url);
					}
				}
			});
			if (this_.$uploadimg) {
				if (this_.filecount <= count) {
					this_.$uploadimg.hide();
				} else {
					this_.$uploadimg.show();
				}
			}
		});
	};

	co.input.file.bind = function($selector, config) {
		return new FileBind($selector, config);
	}

})();