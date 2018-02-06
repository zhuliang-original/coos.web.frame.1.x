(function() {
	var uploadBindIndex = 0;
	co.upload = new Object();
	co.upload.bind = function(config) {
		var button = $(config.button);
		var callback = config.callback;
		var url = config.url || co.config.action.doUpload;
		var progressUrl = config.progressUrl || co.config.action.uploadProgress;
		url = co.url.format(url);
		button.find('.coos-button-upload-form-div').remove();
		uploadBindIndex++;
		var maxfilelength = config.maxfilelength || button.attr('maxfilelength');
		var inputid = "coos-file-upload-input-" + uploadBindIndex;

		var formDiv = $('<span class="coos-button-upload-form-div" style="position: absolute;left: 0px;top: 0px;width: 100%;height: 100%;padding: 0px;margin: 0px;overflow: hidden;"/>');

		button.prepend(formDiv);

		button.css('position', 'relative');
		var filename = "";
		var filetype = button.attr('file-type');
		function refreshUpload() {
			bindFileInput();
		}
		var uploadid = co.getNumber();
		var fileUploaded = false;
		var fileuploadaction = "";
		function bindFileInput() {
			fileUploaded = false;
			uploadid = co.getNumber();
			var action = url;
			if (!action.has("?")) {
				action += "?";
			}
			action += "&uploadid=" + uploadid;
			if (maxfilelength) {
				action += "&maxfilelength=" + maxfilelength;
			}
			fileuploadaction = action;
			var input = $('<input id="'
					+ inputid
					+ '" style="position: absolute;z-index: 1;left: 0px;width: 100%;height: 100%;padding: 0px;margin: 0px;font-size: 100000px;opacity: 0.0;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);cursor: pointer;" class="coos-file-upload-input" name="file"  type="file" />');
			if (!co.isIE()) {
				input.css('border', '1000px solid gray');
			}
			formDiv.empty();
			formDiv.append(input);
			input.change(function() {
				var filePath = this.value;
				var fileSize = null;
				if (this.files && this.files.length > 0) {
					var f = this.files[0];
					if (f.size) {
						fileSize = f.size;
					} else if (f.fileSize) {
						fileSize = f.fileSize;
					}
				}
				if (filetype != null && filetype != '') {
					if (filetype == 'image') {
						if (!co.isImage(filePath)) {
							co.box.info(co.config.error.isNotImageFile.info);
							refreshUpload();
							return;
						}
					} else if (filetype == 'audio') {
						if (!co.isAudio(filePath)) {
							co.box.info(co.config.error.isNotAudioFile.info);
							refreshUpload();
							return;
						}
					} else if (filetype == 'video') {
						if (!co.isVideo(filePath)) {
							co.box.info(co.config.error.isNotVideoFile.info);
							refreshUpload();
							return;
						}
					} else {

						var filetypes = filetype.split(',');
						var success = false;
						for (var m = 0; m < filetypes.length; m++) {
							if (co.isOtherFile(filePath, filetypes[m])) {
								success = true;
								break;
							}
						}
						if (!success) {
							var infoStr = co.config.error.isNotOtherFile.info;
							infoStr = infoStr.replace(/\$filetype/g, filetype)
							co.box.info(infoStr);
							refreshUpload();
							return;
						}
					}
				}
				if (fileSize != null && fileSize > (maxfilelength * 1024 * 1024)) {
					var infoStr = co.config.error.isToLongFile.info;
					infoStr = infoStr.replace(/\$maxfilelength/g, maxfilelength)
					co.box.info(infoStr);
					refreshUpload();
					return;
				}
				coos.cover.showUploading();
				co.ajaxFileUpload({
					url : fileuploadaction, // 用于文件上传的服务器端请求地址
					secureuri : false, // 一般设置为false
					fileElementId : inputid, // 文件上传控件的id属性 <input
					// type="file" id="file"
					// name="file" /> 注意，这里一定要有name值
					// $("form").serialize(),表单序列化。指把所有元素的ID，NAME 等全部发过去
					dataType : 'json',// 返回值类型 一般设置为json
					complete : function() {// 只要完成即执行，最后执行
					},
					success : function(data, status) // 服务器成功响应处理函数
					{
						if (data.code == 0) {
							var files = data.value;
							if (callback != null) {
								callback(files, data);
							}
						} else {
							if (data.code == co.config.error.isToLongFile.code) {

								var infoStr = co.config.error.isToLongFile.info;
								infoStr = infoStr.replace(/\$maxfilelength/g, maxfilelength);
								co.box.info(infoStr);
							} else {
								co.box.info(data.message);
								refreshUpload();
							}
						}

						if (co.config.openUploadProgress) {
							fileUploaded = true;
						} else {

							co.cover.hideUploading({
								place : 'file upload'
							});
							refreshUpload();
						}
					},
					error : function(data, status, e)// 服务器响应失败处理函数
					{
						co.cover.hideUploading({
							place : 'file upload'
						});
						co.box.info("upload file " + status);
						fileUploaded = true;
						throw e;
					}
				});
				if (co.config.openUploadProgress) {
					uploadProgress();
					co.cover.model.uploading.find('.coos-upload-progress-div').show();
					co.cover.model.uploading.find('.coos-upload-text').css('margin-top', '20px');
				} else {

					co.cover.model.uploading.find('.coos-upload-progress-div').hide();
					co.cover.model.uploading.find('.coos-upload-text').css('margin-top', '0px');
				}

			});
		}
		var uploadProgress = function() {
			var data = {};
			data.uploadid = uploadid;
			co.POST(progressUrl, data, 'json', function(o) {
				co.cover.model.uploading.find('.coos-upload-progress').css('width', (o * 100) + '%');
				if (fileUploaded) {
					refreshUpload();
					co.cover.model.uploading.find('.coos-upload-progress').css('width', '100%');
					co.cover.hideUploading({
						place : 'file upload'
					});
				} else {
					window.setTimeout(function() {
						uploadProgress();
					}, 50);
				}
			}, true, {
				showLoading : false
			});
		};
		bindFileInput();

	};
})();