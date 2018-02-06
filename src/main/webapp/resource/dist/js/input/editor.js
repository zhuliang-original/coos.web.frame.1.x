(function() {
	var alleditors = {};
	co.input.bind('editor', function($selector) {
		var thisvalue = $selector.val();
		var id = $selector.attr('elementid') || $selector.attr('id');
		if (id == null || id == '') {
			id = co.getNumber();
		}
		$selector.attr('id', id);
		var editor = null;
		var inited = false;
		$selector.change(function() {
			if (inited) {
				editor.html($selector.val());
				return;
			}
			thisvalue = $selector.val();
		});
		co.plugin.load("kindeditor", function() {
			var design = $selector.attr('design');
			design = design == null || design == 'false' || design == '0' ? false : true;
			var isreadonly = $selector.attr('isreadonly');
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
				themesPath : basePath + co.plugin.plugins.kindeditor.themesPath,
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
					$selector.val(this.html());
					// $selector.html(this.html());
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

})();