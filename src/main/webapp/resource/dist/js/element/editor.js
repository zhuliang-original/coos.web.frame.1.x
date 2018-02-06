(function() {
	var alleditors = {};
	co.element.initEditor = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-editor');
		if (elements == null || elements.length < 1) {
			return;
		}
		$(elements).each(function(index, element) {

			if (co.element.isInited(element, 'inputtype-editor')) {
				return;
			}
			element = $(element);
			var thisvalue = element.val();
			var id = element.attr('elementid') || element.attr('id');
			if (id == null || id == '') {
				id = co.getNumber();
			}
			element.attr('id', id);
			var editor = null;
			var inited = false;
			element.change(function() {
				if (inited) {
					editor.html(element.val());
					return;
				}
				thisvalue = element.val();
			});
			co.plugins.load("kindeditor", function() {
				var design = element.attr('design');
				design = design == null || design == 'false' || design == '0' ? false : true;
				var isreadonly = element.attr('isreadonly');
				isreadonly = isreadonly == null || isreadonly == 'false' || isreadonly == '0' ? false : true;
				if (isreadonly) {
					return;
				}
				if (design) {
					return;
				}
				if (alleditors[id] != null) {
					try {
						KindEditor.remove(id);
						// delete alleditors[id];
					} catch (e) {
						console.log(e.message)
					}
				}
				var uploadUrl = basePath + co.config.action.doUpload;
				if (uploadUrl.indexOf('?') < 1) {
					uploadUrl += "?kindeditor=true"
				} else {
					uploadUrl += "&kindeditor=true"
				}
				var _config = {
					themesPath : basePath + co.config.plugins.kindeditor.themesPath,
					resizeType : 1,
					minWidth : '250px',
					width : '100%',
					height : "300px",
					allowPreviewEmoticons : false,
					uploadJson : uploadUrl,
					filterMode : true,
					allowImageUpload : true,
					allowFileManager : true,
					// items: [
					// 'fontname', 'fontsize', '|', 'forecolor',
					// 'hilitecolor',
					// 'bold', 'italic', 'underline',
					// 'removeformat', '|', 'justifyleft', 'justifycenter',
					// 'justifyright', 'insertorderedlist',
					// 'insertunorderedlist', '|', 'emoticons', 'image',
					// 'link'],
					afterCreate : function() {
					},
					afterChange : function() {
						element.val(this.html());
						// element.html(this.html());
					}
				};
				// try{
				editor = KindEditor.create("#" + id, _config);
				editor.html(thisvalue);
				alleditors[id] = editor;
				inited = true;
				// }catch(e){
				//					
				// }
			});
		});

	};
})();