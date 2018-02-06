(function() {
	co.element.initCodemirror = function(content) {
		content = content || $('body');
		var elements = $(content).find('.inputtype-codemirror');
		if (elements.length > 0) {
			co.plugins.load("codemirror", function() {
				co.plugins.load("emmet", function() {
					$(elements).each(function(index, element) {
						if (co.element.isInited(element, 'inputtype-codemirror')) {
							return;
						}
						element = $(element);
						var mode = element.attr('codemirror-mode');
						if (co.isEmpty(mode)) {
							mode = "text/html";
						}
						var editorchangeed = false;
						var editor = CodeMirror.fromTextArea(element[0], {
							mode : mode,
							lineNumbers : true,
							profile : 'xhtml'
						});
						editor.on("change", function() {
							editorchangeed = true;
							element.val(editor.getValue());
							element.change();
						});
						element.change(function() {
							if (!editorchangeed) {
								editor.setValue(element.val());
							}
							editorchangeed = false;
						})
						emmetCodeMirror(editor);

					});
				});
			});
		}
	};
})();